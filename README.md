# Currency Exchange Platform

A responsive web application for currency exchange services (RMB to INR) with integrated secure chat functionality and social referral capabilities.

## Features

- User authentication with admin approval workflow
- Currency exchange rate display
- Secure chat communication
- Referral system
- Comprehensive backoffice administration

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure environment variables:
   - Copy `.env.local.example` to `.env.local`
   - Set `ADMIN_EMAIL` and `NEXT_PUBLIC_ADMIN_EMAIL` to your admin email
4. Run the development server:
   ```
   npm run dev
   ```

## Admin Approval Workflow

This application implements an admin approval workflow for new user registrations:

1. New users can sign up with email and password
2. Users receive an email verification link
3. After verifying their email, users are placed in a "pending approval" state
4. Administrators must approve user accounts before they can access the dashboard
5. Once approved, users receive an email notification and can access the full application

## Accessing Admin Dashboard

To access the admin dashboard:

1. Create an account with the email specified in your `.env.local` file
2. Verify your email and log in
3. You will automatically have access to the admin dashboard at `/admin/dashboard`
4. Use the admin dashboard to approve or reject pending user registrations

## Technology Stack

- Next.js
- React
- Supabase for authentication and database
- Tailwind CSS for styling
