import { createClient } from "../../../../supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const redirect_to = requestUrl.searchParams.get("redirect_to");
  
  try {
    if (code) {
      const supabase = await createClient();
      await supabase.auth.exchangeCodeForSession(code);
      
      // Get the user to check approval status
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // Check if user is approved
        const { data: userProfile } = await supabase
          .from('users')
          .select('approval_status')
          .eq('id', user.id)
          .single();
        
        // If user exists but is not approved, redirect to waiting approval page
        if (userProfile && userProfile.approval_status !== 'approved') {
          return NextResponse.redirect(new URL('/waiting-approval', requestUrl.origin));
        }
      }
    }

    // URL to redirect to after sign in process completes
    // We'll always redirect to dashboard first, and let the dashboard handle admin detection
    const redirectTo = redirect_to || "/dashboard";
    return NextResponse.redirect(new URL(redirectTo, requestUrl.origin));
  } catch (error) {
    console.error("Error in auth callback:", error);
    return NextResponse.redirect(new URL('/?error=auth_callback_error', requestUrl.origin));
  }
} 