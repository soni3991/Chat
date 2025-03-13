import { createClient } from "../../../supabase/server";
import { redirect } from "next/navigation";
import { InfoIcon, UserCircle, ClockIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function WaitingApproval() {
    const supabase = await createClient();

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

    // If user is already approved, redirect to dashboard
    if (userProfile && userProfile.approval_status === 'approved') {
        return redirect("/dashboard");
    }

    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden p-6">
                <div className="flex flex-col items-center text-center">
                    <div className="bg-blue-100 p-3 rounded-full mb-4">
                        <ClockIcon className="h-10 w-10 text-blue-600" />
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Account Pending Approval</h1>
                    <p className="text-gray-600 mb-6">
                        Thank you for registering! Your account is currently pending approval from our administrators.
                        You will receive an email notification once your account has been approved.
                    </p>

                    <div className="bg-blue-50 p-4 rounded-lg w-full mb-6">
                        <div className="flex items-center mb-2">
                            <UserCircle className="h-5 w-5 text-blue-600 mr-2" />
                            <p className="text-sm font-medium text-gray-900">{userProfile?.full_name || 'User'}</p>
                        </div>
                        <p className="text-sm text-gray-600">{user.email}</p>
                        <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            Pending Approval
                        </div>
                    </div>

                    <div className="flex flex-col w-full gap-2">
                        <Button variant="outline" asChild>
                            <Link href="/" className="w-full">
                                Return to Home
                            </Link>
                        </Button>
                        <p className="text-xs text-gray-500 mt-2">
                            If you have any questions, please contact our support team.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
} 