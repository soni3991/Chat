import DashboardNavbar from "@/components/dashboard-navbar";
import { InfoIcon, UserCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "../../../supabase/server";
import Link from "next/link";

export default async function Dashboard() {
  const supabase = await createClient();

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return redirect("/sign-in");
    }

    // Get user profile including approval status
    const { data: userProfile } = await supabase
      .from('users')
      .select('*')
      .eq('id', user.id)
      .single();

    // If user exists but is not approved, redirect to waiting approval page
    if (userProfile && userProfile.approval_status !== 'approved') {
      return redirect("/waiting-approval");
    }

    // We'll handle admin redirects in a more controlled way
    // Instead of automatic redirect, we'll show a message and link
    const isAdmin = user.email === process.env.ADMIN_EMAIL;

    return (
      <>
        <DashboardNavbar />
        <main className="w-full">
          <div className="container mx-auto px-4 py-8 flex flex-col gap-8">
            {/* Admin Notice */}
            {isAdmin && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold text-blue-800">Admin Account Detected</h2>
                <p className="text-blue-700">
                  You are logged in with an admin account. You can access the admin dashboard to manage user approvals.
                </p>
                <Link
                  href="/admin/dashboard"
                  className="mt-2 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 w-fit"
                >
                  Go to Admin Dashboard
                </Link>
              </div>
            )}

            {/* Header Section */}
            <header className="flex flex-col gap-4">
              <h1 className="text-3xl font-bold">Dashboard</h1>
              <div className="bg-secondary/50 text-sm p-3 px-4 rounded-lg text-muted-foreground flex gap-2 items-center">
                <InfoIcon size="14" />
                <span>This is a protected page only visible to authenticated users</span>
              </div>
            </header>

            {/* User Profile Section */}
            <section className="bg-card rounded-xl p-6 border shadow-sm">
              <div className="flex items-center gap-4 mb-6">
                <UserCircle size={48} className="text-primary" />
                <div>
                  <h2 className="font-semibold text-xl">User Profile</h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <div className="bg-muted/50 rounded-lg p-4 overflow-hidden">
                <p className="mb-2"><strong>Name:</strong> {userProfile?.full_name}</p>
                <p className="mb-2"><strong>Email:</strong> {userProfile?.email}</p>
                <p className="mb-2"><strong>Status:</strong> <span className="text-green-600">Approved</span></p>
                <p><strong>Account Created:</strong> {new Date(userProfile?.created_at).toLocaleDateString()}</p>
              </div>
            </section>
          </div>
        </main>
      </>
    );
  } catch (error) {
    console.error("Error in Dashboard:", error);
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error loading dashboard</h1>
        <p className="mb-4">There was a problem loading your dashboard. Please try again later.</p>
        <a href="/" className="text-blue-600 hover:underline">Return to Home</a>
      </div>
    );
  }
}
