import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminDashboard() {
    try {
        const supabase = await createClient();

        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return redirect("/sign-in");
        }

        // Check if the user is an admin
        const isAdmin = user.email === process.env.ADMIN_EMAIL;
        if (!isAdmin) {
            return redirect("/dashboard");
        }

        // Get all users with pending approval
        const { data: pendingUsers } = await supabase
            .from('users')
            .select('*')
            .eq('approval_status', 'pending');

        // Get all approved users
        const { data: approvedUsers } = await supabase
            .from('users')
            .select('*')
            .eq('approval_status', 'approved');

        return (
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                    <Link href="/dashboard" className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300">
                        Back to User Dashboard
                    </Link>
                </div>

                <p className="mb-8 text-gray-600">Manage user registrations and approvals</p>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Pending Approvals Section */}
                    <section className="bg-white p-6 rounded-lg border shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Pending Approvals ({pendingUsers?.length || 0})</h2>

                        {pendingUsers && pendingUsers.length > 0 ? (
                            <div className="space-y-4">
                                {pendingUsers.map((user) => (
                                    <div key={user.id} className="border rounded-lg p-4 bg-gray-50">
                                        <div className="flex justify-between items-start mb-2">
                                            <div>
                                                <h3 className="font-medium">{user.full_name}</h3>
                                                <p className="text-sm text-gray-600">{user.email}</p>
                                            </div>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Pending
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-3">
                                            Registered: {new Date(user.created_at).toLocaleDateString()}
                                        </p>
                                        <div className="flex gap-2">
                                            <form>
                                                <input type="hidden" name="userId" value={user.id} />
                                                <button
                                                    type="submit"
                                                    formAction={async (formData) => {
                                                        'use server'
                                                        const userId = formData.get("userId")?.toString();
                                                        if (userId) {
                                                            const { error } = await supabase
                                                                .from('users')
                                                                .update({
                                                                    approval_status: 'approved',
                                                                    updated_at: new Date().toISOString()
                                                                })
                                                                .eq('id', userId);
                                                        }
                                                    }}
                                                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                                                >
                                                    Approve
                                                </button>
                                            </form>
                                            <form>
                                                <input type="hidden" name="userId" value={user.id} />
                                                <button
                                                    type="submit"
                                                    formAction={async (formData) => {
                                                        'use server'
                                                        const userId = formData.get("userId")?.toString();
                                                        if (userId) {
                                                            const { error } = await supabase
                                                                .from('users')
                                                                .update({
                                                                    approval_status: 'rejected',
                                                                    updated_at: new Date().toISOString()
                                                                })
                                                                .eq('id', userId);
                                                        }
                                                    }}
                                                    className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                                                >
                                                    Reject
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">No pending approvals</p>
                        )}
                    </section>

                    {/* Approved Users Section */}
                    <section className="bg-white p-6 rounded-lg border shadow-sm">
                        <h2 className="text-xl font-semibold mb-4">Approved Users ({approvedUsers?.length || 0})</h2>

                        {approvedUsers && approvedUsers.length > 0 ? (
                            <div className="space-y-4 max-h-[500px] overflow-y-auto">
                                {approvedUsers.map((user) => (
                                    <div key={user.id} className="border rounded-lg p-4 bg-gray-50">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-medium">{user.full_name}</h3>
                                                <p className="text-sm text-gray-600">{user.email}</p>
                                            </div>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                Approved
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 mt-1">
                                            Approved on: {user.updated_at ? new Date(user.updated_at).toLocaleDateString() : 'N/A'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 text-center py-8">No approved users</p>
                        )}
                    </section>
                </div>
            </div>
        );
    } catch (error) {
        console.error("Error in AdminDashboard:", error);
        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Error loading admin dashboard</h1>
                <p className="mb-4">There was a problem loading the admin dashboard. Please try again later.</p>
                <Link href="/dashboard" className="text-blue-600 hover:underline">Return to Dashboard</Link>
            </div>
        );
    }
} 