import OpenAI from "openai";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function POST(req: Request) {

  try {

    const body = await req.json();
    const message = body.message;
    const history = body.history || [];
    const sessionId = body.sessionId;

    // 1. Get the assistant's reply
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content:
            `You are a helpful AI assistant for an international education and migration agency, helping students apply to study in Australia, the UK, Canada, the USA, or New Zealand.

Ask students about: their home country, which destination country they're interested in, their education background, desired course, and preferred intake.
If they haven't stated a destination yet, ask which of these five countries they're considering.

You CAN share general, publicly-available information to help students understand their options, such as:
- What a visa category is generally called and generally used for (e.g. "Australia's Subclass 500 is the general student visa category")
- Typical document checklists (e.g. proof of enrollment, financial evidence, English test scores, health insurance)
- Rough general processing timeframes, clearly framed as approximate and varying by case
- General differences between destination countries' student visa systems at a high level

You must NOT:
- Tell a student whether THEY specifically will qualify or be approved
- Recommend a specific visa subclass/category for their individual case
- Give legal interpretations, eligibility determinations, or strategy for their specific situation
- Comment on their individual likelihood of visa success

Whenever a student's question moves from general information into their specific case, respond with the general information available, then clearly say this needs a licensed migration agent for their specific situation, and encourage them to book a consultation with the agency.`
        },
        ...history,
        { role: "user", content: message }
      ]
    });

    const reply = completion.choices[0].message.content;

    // 2. Ask the AI to extract structured lead info from the conversation so far
    const extraction = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: `You extract lead details from a conversation.
Respond with ONLY a JSON object, nothing else. No explanation. No markdown. No code fences.
Use exactly these fields: name, country, destination, education, course, intake, contact, notes.
"country" is the student's home country. "destination" is which of Australia, United Kingdom, Canada, United States, or New Zealand they want to study in — use one of those exact five names, or "" if not yet mentioned.
If a field is unknown, use an empty string "".
Example output: {"name":"","country":"Nepal","destination":"Australia","education":"","course":"Master of IT","intake":"","contact":"","notes":""}`
        },
        ...history,
        { role: "user", content: message },
        { role: "assistant", content: reply }
      ]
    });

    let leadData: any = null;

    try {
      const raw = extraction.choices[0].message.content || "{}";

      // Extract just the JSON object in case there's any extra text around it
      const match = raw.match(/\{[\s\S]*\}/);
      const clean = match ? match[0] : raw;

      leadData = JSON.parse(clean);
    } catch (e) {
      console.log("LEAD EXTRACTION PARSE ERROR:", e);
      leadData = null;
    }

    // 3. Save/update lead in Supabase — one row per session
    if (leadData && (leadData.country || leadData.course || leadData.name || leadData.contact)) {

      const { error: upsertError } = await supabaseAdmin
        .from("leads")
        .upsert(
          [{ ...leadData, session_id: sessionId }],
          { onConflict: "session_id" }
        );

      if (upsertError) {
        console.log("SUPABASE UPSERT ERROR:", upsertError);
      } else {
        console.log("LEAD SAVED/UPDATED:", leadData);
      }

    } else {
      console.log("NO LEAD DATA YET:", leadData);
    }

    return NextResponse.json({ reply, lead: leadData });

  } catch (error) {

    console.log("ROUTE ERROR:", error);

    return NextResponse.json({
      reply: "Sorry, AI service error."
    });

  }

}