"use server";

import { createClient } from "../../../supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Action to approve a user
export async function approveUserAction(formData: FormData) {
  const userId = formData.get("userId")?.toString();
  const supabase = await createClient();

  // Check if the current user is an admin
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Simple admin check - in production, you'd want a more robust solution
  const { data: adminCheck } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .eq('email', process.env.ADMIN_EMAIL || '')
    .single();

  if (!adminCheck) {
    return redirect("/dashboard");
  }

  if (!userId) {
    return;
  }

  // Update user approval status
  const { error } = await supabase
    .from('users')
    .update({
      approval_status: 'approved',
      updated_at: new Date().toISOString()
    })
    .eq('id', userId);

  if (error) {
    console.error('Error approving user:', error);
  }

  // You may want to send an email notification to the user about their approval

  revalidatePath('/admin/dashboard');
  return redirect('/admin/dashboard');
}

// Action to reject a user
export async function rejectUserAction(formData: FormData) {
  const userId = formData.get("userId")?.toString();
  const supabase = await createClient();

  // Check if the current user is an admin
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  // Simple admin check
  const { data: adminCheck } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .eq('email', process.env.ADMIN_EMAIL || '')
    .single();

  if (!adminCheck) {
    return redirect("/dashboard");
  }

  if (!userId) {
    return;
  }

  // Update user approval status
  const { error } = await supabase
    .from('users')
    .update({
      approval_status: 'rejected',
      updated_at: new Date().toISOString()
    })
    .eq('id', userId);

  if (error) {
    console.error('Error rejecting user:', error);
  }

  // You may want to send an email notification to the user about their rejection

  revalidatePath('/admin/dashboard');
  return redirect('/admin/dashboard');
} 