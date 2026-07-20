import { supabaseAdmin } from "@/lib/supabaseAdmin";
import DashboardShell from "@/components/DashboardShell";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {

  const { data: leads, error } = await supabaseAdmin
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return <DashboardShell leads={leads || []} error={error?.message} />;

}