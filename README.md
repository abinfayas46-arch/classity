# Classity: Your Centre's Operating System

Build a production-quality, modern, premium SaaS web application called:

CLASSITY

Tagline:

"Collect Fees. Remind Parents. Grow Your Coaching Centre."

Classity is a subscription-based SaaS platform for coaching centres, tuition centres, academies, training institutes and educational businesses.

The platform helps centres manage:

- Students

- Parents

- Batches

- Fee plans

- Recurring fees

- Fee collection

- Partial payments

- Online payments

- Digital receipts

- WhatsApp reminders

- Communication

- Staff

- Branches

- Expenses

- Reports

- Analytics

- Automation

- Subscription billing

IMPORTANT:

This must NOT look like a generic AI-generated admin dashboard.

It must feel like a real commercial SaaS product similar in quality to modern products such as Stripe, Linear, Notion, HubSpot and modern fintech SaaS applications.

The product must be:

- Extremely user friendly

- Fast

- Clean

- Premium

- Mobile responsive

- Desktop responsive

- Accessible

- Scalable

- Data-driven

- Subscription-ready

- Multi-tenant

- Role-based

- Designed for real-world daily usage

Use the uploaded Classity promotional image as the visual branding reference.

Do NOT copy the promotional image literally into the dashboard.

Use it only as inspiration for:

- Brand identity

- Deep purple primary colour

- Warm yellow/orange accent

- Typography direction

- Overall premium visual personality

The actual application should use a mostly light workspace with purple used strategically for branding, navigation, primary actions and important states.

==================================================

1. CORE PRODUCT POSITIONING

==================================================

Classity should NOT be positioned as merely a fee collection application.

Position it as:

"The Operating System for Coaching Centre Fee Management."

The initial product wedge is:

FEE MANAGEMENT + WHATSAPP PARENT COMMUNICATION

The architecture must allow future expansion into:

- Attendance

- Student performance

- Parent portal

- Student portal

- CRM

- Lead management

- Expenses

- Payroll

- Advanced analytics

- AI insights

- Multi-branch management

- White-label SaaS

==================================================

2. TECHNOLOGY

==================================================

Build this as a real SaaS application.

Preferred stack:

- React

- TypeScript

- Vite

- Tailwind CSS

- shadcn/ui

- Supabase for authentication/database/storage where appropriate

- Proper reusable component architecture

- Responsive layouts

- Form validation

- Secure data access

- Role-based permissions

Do not hard-code the application around mock screens.

Create a clean architecture that can later connect to:

- Payment gateways

- WhatsApp Business API

- Email

- SMS

- Subscription billing provider

- Webhooks

- External APIs

If a real third-party integration cannot be configured during this build, create a realistic integration abstraction/service layer and clearly mark the integration as "Demo/Not Connected".

Do NOT pretend that a payment or WhatsApp message was actually sent if no real integration exists.

==================================================

3. MULTI-TENANT SAAS ARCHITECTURE

==================================================

Classity is a MULTI-TENANT SaaS.

Each coaching centre is a separate tenant/organization.

Example:

Tenant A:

ABC Academy

Tenant B:

Bright Academy

Tenant C:

Future Learning Centre

Tenant data must be isolated.

One tenant must NEVER be able to access another tenant's:

- Students

- Parents

- Payments

- Fees

- Staff

- Reports

- Branches

- WhatsApp data

- Documents

Implement tenant-aware database design.

Use organization_id / tenant_id relationships throughout the data model.

Where Supabase is used, implement appropriate Row Level Security policies.

Do not rely only on frontend filtering for tenant isolation.

==================================================

4. USER ROLES

==================================================

Implement role-based access control.

Primary roles:

1. OWNER

2. ADMIN

3. MANAGER

4. ACCOUNTANT

5. STAFF

6. TEACHER

Permissions should include:

Students:

- View

- Create

- Edit

- Delete

Fees:

- View

- Create

- Edit

- Collect

- Refund

- Waive

Payments:

- View

- Record

- Refund

Reports:

- View

- Export

WhatsApp:

- View

- Send

- Bulk send

- Manage templates

Staff:

- View

- Create

- Edit

- Disable

Settings:

- View

- Edit

Subscription:

- View

- Manage

Owner must have full access.

Create a permissions system that can later support custom roles.

==================================================

5. AUTHENTICATION

==================================================

Create:

- Login

- Registration

- Forgot password

- Reset password

- Email verification

- OTP-ready architecture

- Logout

- Session handling

Registration fields:

Centre Name

Owner Name

Email

Mobile Number

Password

After registration:

Automatically create:

- Tenant

- Owner account

- Default settings

- Default subscription/trial

- Onboarding state

==================================================

6. ONBOARDING

==================================================

Create a beautiful onboarding wizard.

Step 1:

Create Centre Profile

Fields:

- Centre name

- Logo

- Address

- City

- State

- Country

- Phone

- Email

- Website

- GST information

Step 2:

Create First Batch

Fields:

- Batch name

- Course

- Subject

- Teacher

- Schedule

- Capacity

Step 3:

Create Fee Plan

Fields:

- Plan name

- Amount

- Frequency

- Due date

- Late fee

- Grace period

Step 4:

Add Students

Options:

- Add manually

- Import Excel/CSV

Step 5:

Payment Setup

Step 6:

WhatsApp Setup

Step 7:

Complete

Show onboarding progress.

Example:

Centre Profile ✓

First Batch ✓

Fee Plan ✓

Students ✓

Payments ○

WhatsApp ○

==================================================

7. APPLICATION SHELL

==================================================

Create a premium application layout.

Desktop:

Left sidebar navigation.

Top navigation:

- Global search

- Notifications

- Help

- Centre switcher

- User profile

Sidebar:

CLASSITY logo

Dashboard

Students

Fee Collection

Fee Plans

WhatsApp

Receipts

Batches

Expenses

Reports

Staff

Then separator.

Settings

Subscription

Support

Bottom:

User avatar

User name

Role

Centre name

Mobile:

Use a responsive bottom navigation:

Home

Students

Collect

Reminders

More

Use a slide-out navigation for additional modules.

==================================================

8. DASHBOARD

==================================================

Dashboard is the most important screen.

Header:

Good morning, [Owner Name] 👋

Here's your fee collection overview.

Primary actions:

+ Add Student

Collect Fee

Send Reminder

KPI cards:

Total Students

Active Students

Collected This Month

Pending Fees

Overdue Fees

Collection Rate

Example:

₹4,82,500

Collected this month

+12.4% vs last month

₹1,24,800

Pending

₹48,200

Overdue

79%

Collection rate

Do NOT overload the dashboard.

Include:

Collection Overview

Chart:

Expected vs Collected

Time filters:

7 Days

30 Days

3 Months

Custom

==================================================

9. NEEDS ATTENTION

==================================================

Create a highly useful "Needs Attention" section.

Example:

18 overdue payments

27 fees due today

42 fees due this week

5 failed payments

Each item must be clickable.

Example:

18 Overdue

[View Overdue]

Clicking should navigate to filtered Fee Collection.

==================================================

10. DASHBOARD INSIGHTS

==================================================

Add an "Insights" card.

Example:

"Collection is 8% lower than last month."

"23 students are overdue by more than 7 days."

"JEE Batch A has the highest outstanding balance."

Use realistic demo insights.

Clearly label AI insights as:

"Classity Insight"

Do not claim real AI processing unless an actual AI service is connected.

==================================================

11. STUDENT MANAGEMENT

==================================================

Create a complete student management module.

Student list must have:

Student ID

Student

Parent

Batch

Course

Fee Plan

Pending

Next Due

Status

Actions

Search:

- Student name

- Parent name

- Phone

- Student ID

Filters:

- Batch

- Course

- Fee status

- Active/inactive

- Due date

Actions:

View

Edit

Collect

Remind

Primary button:

+ Add Student

==================================================

12. ADD STUDENT

==================================================

Create a clean multi-section form.

Student Details:

- Full name

- Photo

- Date of birth

- Gender

- Student ID

- School

- Class

Parent Details:

- Parent name

- Relationship

- Mobile

- WhatsApp

- Email

- Address

Academic:

- Course

- Batch

- Joining date

Financial:

- Fee plan

- Fee amount

- Discount

- Due date

Buttons:

Cancel

Save Student

Validate all required fields.

==================================================

13. STUDENT PROFILE

==================================================

Create a detailed student profile.

Header:

Student photo

Student name

Student ID

Class

Batch

Status

Actions:

Call

WhatsApp

Collect Fee

Send Reminder

Edit

Financial summary:

Total Fee

Paid

Pending

Overdue

Next Due

Payment timeline:

September 12

₹2,000 payment received

September 10

Fee reminder sent

September 2

₹5,000 payment received

September 1

₹5,000 fee generated

Tabs:

Overview

Fees

Payments

Receipts

Communication

Activity

==================================================

14. FEE COLLECTION

==================================================

This is the primary operational screen.

Header:

Fee Collection

Search:

Search student, parent or phone

Filters:

All

Paid

Pending

Overdue

Due Today

Due This Week

Table:

Student

Batch

Total Fee

Paid

Pending

Due Date

Status

Actions

Statuses:

PAID

PARTIALLY PAID

PENDING

OVERDUE

Use clear visual badges.

Actions:

Collect

Remind

View

==================================================

15. COLLECT FEE FLOW

==================================================

This flow must be extremely fast.

When user clicks "Collect":

Open a side drawer/modal.

Show:

Student

Batch

Outstanding Amount

Payment Amount

Quick buttons:

₹500

₹1,000

₹2,000

Full Amount

Custom

Payment Method:

UPI

Cash

Card

Bank Transfer

Cheque

Other

Transaction ID

Notes

Buttons:

Record Payment

Record & Send Receipt

After payment:

Show a strong success state:

✓ Payment recorded successfully

₹2,000 received

Remaining balance:

₹3,000

Actions:

View Receipt

Send WhatsApp

Close

==================================================

16. PARTIAL PAYMENTS

==================================================

Support partial payment.

Example:

Outstanding:

₹5,000

Payment:

₹2,000

Remaining:

₹3,000

Automatically update:

- Student balance

- Fee status

- Dashboard

- Reports

- Payment history

==================================================

17. FEE PLANS

==================================================

Create Fee Plans module.

Plan types:

Monthly

Quarterly

Half-Yearly

Annual

One-Time

Custom

Fields:

Plan Name

Amount

Frequency

Due Day

Late Fee

Grace Period

Discount

Tax

Status

Allow assigning fee plans to batches and students.

==================================================

18. AUTOMATIC FEE GENERATION

==================================================

Design architecture for recurring fee generation.

Example:

Monthly Fee:

₹5,000

Due:

10th of every month

System generates:

September ₹5,000

October ₹5,000

November ₹5,000

Prevent duplicate fee generation.

Support:

- Upcoming

- Due

- Overdue

- Paid

- Partially paid

==================================================

19. PAYMENT LINKS

==================================================

Create:

Generate Payment Link

The payment page should show:

Centre logo

Centre name

Student name

Fee amount

Outstanding amount

Due date

CTA:

Pay ₹5,000

Design it as a standalone responsive payment page.

If no real gateway is connected, use demo payment state.

Do NOT claim a real payment was processed.

==================================================

20. DIGITAL RECEIPTS

==================================================

Create professional receipts.

Receipt:

CLASSITY

Centre Name

Centre Address

Fee Payment Receipt

Receipt Number

Invoice Number

Student

Parent

Batch

Amount Paid

Payment Method

Transaction ID

Payment Date

Remaining Balance

Actions:

Download PDF

Print

Send WhatsApp

Send Email

Create a polished receipt preview.

==================================================

21. INVOICES

==================================================

Create invoice management.

Statuses:

Draft

Issued

Partially Paid

Paid

Overdue

Cancelled

Allow:

- Generate

- View

- Download

- Send

- Cancel

==================================================

22. WHATSAPP REMINDERS

==================================================

This is one of the most important Classity features.

Create a dedicated WhatsApp Reminder Centre.

Top cards:

Overdue

Due Today

Due This Week

Recently Paid

Example:

18 Overdue

27 Due Today

42 Due This Week

Create reminder table:

Student

Parent

Amount

Due Date

Days Overdue

Last Reminder

Status

Action

Action:

Send WhatsApp

==================================================

23. BULK WHATSAPP

==================================================

Allow selecting multiple students.

Example:

18 overdue students selected.

Button:

Send WhatsApp Reminders

Before sending:

Show confirmation modal:

"You are about to send reminders to 18 parents."

Show estimated message count.

Buttons:

Cancel

Send Reminders

Never send bulk communication without confirmation.

==================================================

24. WHATSAPP TEMPLATES

==================================================

Create template management.

Templates:

Upcoming Fee

Due Today

Overdue

Payment Confirmation

Receipt

General Announcement

Variables:

{{parent_name}}

{{student_name}}

{{amount}}

{{due_date}}

{{centre_name}}

{{payment_link}}

{{receipt_link}}

Provide live preview.

==================================================

25. COMMUNICATION HISTORY

==================================================

Every communication should be logged.

Statuses:

Queued

Sent

Delivered

Read

Failed

Show:

Date

Recipient

Message Type

Channel

Status

==================================================

26. AUTOMATION ENGINE

==================================================

Create an automation-ready interface.

Example:

WHEN:

Fee becomes overdue

THEN:

Wait 1 day

THEN:

Send WhatsApp reminder

Another:

WHEN:

Payment received

THEN:

Generate receipt

THEN:

Send receipt

Another:

WHEN:

Fee due in 3 days

THEN:

Send reminder

Build the UI so customers can eventually create their own rules.

==================================================

27. BATCH MANAGEMENT

==================================================

Create Batches.

Batch card:

JEE 2027

54 Students

Fee:

₹5,000/month

Collected:

₹2,10,000

Pending:

₹42,000

Open batch.

Tabs:

Overview

Students

Fees

Collection

Schedule

==================================================

28. MULTI-BRANCH

==================================================

Create branch management architecture.

Example:

ABC Academy

Kochi

Trivandrum

Calicut

Owner can switch branch from the top navigation.

Branch-level data must remain properly associated.

Support:

All Branches

Specific Branch

Reports must support branch filtering.

==================================================

29. EXPENSE MANAGEMENT

==================================================

Create Expenses module.

Categories:

Rent

Salary

Marketing

Electricity

Internet

Supplies

Other

Fields:

Expense Name

Category

Amount

Date

Branch

Vendor

Attachment

Notes

Show expense summary.

==================================================

30. PROFIT & LOSS

==================================================

Create financial overview:

Revenue

Expenses

Net Profit

Filters:

Month

Quarter

Year

Branch

Use clean charts.

==================================================

31. REPORTS

==================================================

Create Reports centre.

Reports:

Daily Collection

Monthly Collection

Outstanding Fees

Overdue Fees

Batch Collection

Branch Collection

Payment Methods

Student Ledger

Discount Report

Refund Report

Revenue Report

Expense Report

Profit & Loss

Allow:

Filter

Search

Export Excel

Export CSV

Export PDF

Export should respect currently applied filters.

==================================================

32. OWNER ANALYTICS

==================================================

Create advanced analytics.

KPIs:

MRR

Revenue

Collection Rate

Outstanding

Average Revenue per Student

New Students

Churn

Branch Performance

Charts:

Revenue trend

Collection trend

Student growth

Outstanding trend

Batch revenue

==================================================

33. AI INSIGHTS

==================================================

Create a premium "Classity Insights" module.

Example insights:

"Collection rate decreased by 8% compared with last month."

"23 students are overdue by more than 7 days."

"JEE Batch A contributes 31% of outstanding fees."

"Your highest collection day is Monday."

Use realistic demo calculations based on available demo data.

Do not present predictions as guaranteed facts.

==================================================

34. STAFF MANAGEMENT

==================================================

Create Staff module.

Fields:

Name

Profile Photo

Email

Mobile

Role

Branch

Status

Last Active

Actions:

Invite

Edit

Disable

View Activity

==================================================

35. ROLE PERMISSIONS

==================================================

Create permission management.

Permission categories:

Students

Fees

Payments

Refunds

Reports

WhatsApp

Staff

Branches

Settings

Subscription

Owner:

Full access

Accountant:

Fees + Payments + Receipts

Staff:

Students + limited fees

Teacher:

Students + batches + future attendance

==================================================

36. AUDIT LOG

==================================================

Create Audit Logs.

Track:

Who

Action

Entity

Previous value

New value

Timestamp

Examples:

Admin changed fee amount.

Accountant recorded payment.

Manager issued refund.

Owner changed subscription.

Audit logs should not be editable by normal users.

==================================================

37. SUBSCRIPTION SAAS

==================================================

This is a CORE part of the product.

Create a complete SaaS subscription system.

Plans:

FREE/TRIAL

STARTER

GROWTH

PRO

ENTERPRISE

Do not hard-code prices or limits.

Create configurable plan data.

Example:

STARTER

₹499/month

GROWTH

₹999/month

PRO

₹1,999/month

ENTERPRISE

Custom

These are example values only and must be editable by Super Admin.

==================================================

38. SUBSCRIPTION LIMITS

==================================================

Plans can limit:

Students

Staff

Branches

Batches

WhatsApp messages

Storage

Reports

Automation

API access

AI Insights

Example:

Starter:

50 students

Growth:

200 students

Pro:

500+ students

Enterprise:

Custom

Show usage:

187 / 200 students

94% used

When near limit:

"You are approaching your student limit."

CTA:

Upgrade Plan

==================================================

39. BILLING

==================================================

Create Subscription page.

Show:

Current Plan

Price

Billing Cycle

Next Billing Date

Usage

Payment Method

Buttons:

Upgrade

Downgrade

Cancel Subscription

Renew

Billing history:

Invoice

Date

Amount

Tax

Status

Download

==================================================

40. FREE TRIAL

==================================================

Default trial architecture:

14-day trial.

Show:

"9 days left in your trial"

CTA:

Choose a Plan

Do not aggressively block the user during trial.

Create conversion-focused but non-annoying upgrade prompts.

==================================================

41. UPGRADE FLOW

==================================================

When user attempts to use a premium feature:

Show:

Unlock Advanced Analytics

Your current plan does not include this feature.

Show benefits.

Plans:

Starter

Growth

Pro

CTA:

Upgrade to Pro

==================================================

42. DOWNGRADE FLOW

==================================================

Before downgrade:

Check current usage.

Example:

Current:

250 students

Target plan:

200 students

Show:

"Your current usage exceeds the new plan limit."

Explain consequences.

Do not silently delete or disable data.

==================================================

43. PAYMENT FAILURE

==================================================

Create subscription payment failure states.

Flow:

Payment Failed

↓

Retry

↓

Grace Period

↓

Restricted

↓

Suspended

Preserve customer data.

Never immediately delete tenant data.

==================================================

44. SUPER ADMIN PANEL

==================================================

Create a separate Classity Super Admin interface.

This is NOT the same as the coaching-centre dashboard.

Super Admin sidebar:

Overview

Customers

Subscriptions

Plans

Revenue

Usage

Coupons

Referrals

Support

Feature Flags

System Settings

Audit Logs

==================================================

45. SUPER ADMIN DASHBOARD

==================================================

KPIs:

Total Centres

Active Centres

Trial Centres

Paid Centres

Cancelled Centres

MRR

ARR

New Subscriptions

Churn

Trial Conversion

ARPU

Charts:

MRR Growth

New Customers

Churn

Plan Distribution

Revenue by Plan

==================================================

46. CUSTOMER MANAGEMENT

==================================================

Super Admin can:

View tenants

Search tenants

Filter tenants

View subscription

View usage

Change plan

Extend trial

Suspend

Activate

Apply coupon

View billing

View support tickets

Any privileged access to tenant information must be auditable.

==================================================

47. PLAN MANAGEMENT

==================================================

Super Admin can create/edit plans.

Fields:

Plan Name

Price

Billing Cycle

Student Limit

Staff Limit

Branch Limit

WhatsApp Limit

Storage

Automation Limit

Feature Access

Feature toggles:

Fee Management

WhatsApp

Reports

Analytics

AI

Automation

Multi-Branch

API

White Label

==================================================

48. FEATURE FLAGS

==================================================

Implement feature flags.

Allow features to be enabled by:

Plan

Tenant

Environment

Example:

AI Insights:

Starter OFF

Growth OFF

Pro ON

Enterprise ON

==================================================

49. USAGE METERING

==================================================

Track:

Students

Staff

Branches

WhatsApp messages

Storage

API calls

Automation runs

Show usage bars.

==================================================

50. COUPONS

==================================================

Create SaaS coupon management.

Support:

Percentage discount

Fixed discount

First month free

Annual discount

Trial extension

Fields:

Code

Discount

Applicable plans

Start date

Expiry date

Usage limit

Status

==================================================

51. REFERRAL SYSTEM

==================================================

Create referral system.

Example:

"Refer a coaching centre and get 1 month free."

Track:

Referrer

Referral

Conversion

Reward

Status

==================================================

52. SUPPORT SYSTEM

==================================================

Create support centre.

Users can:

Create ticket

Select category

Set priority

Attach files

View responses

Close ticket

Statuses:

Open

In Progress

Waiting

Resolved

Closed

==================================================

53. HELP CENTRE

==================================================

Create searchable help centre.

Categories:

Getting Started

Students

Fees

Payments

WhatsApp

Reports

Billing

Subscription

==================================================

54. NOTIFICATION CENTRE

==================================================

Create notifications for:

Fee overdue

Payment received

Payment failed

New student

Subscription renewal

Subscription failure

WhatsApp failure

Usage limit

Support updates

==================================================

55. GLOBAL SEARCH

==================================================

Create global search.

Search across:

Students

Parents

Phone numbers

Student IDs

Invoices

Receipts

Payments

Batches

Results should be grouped by type.

==================================================

56. IMPORT / EXPORT

==================================================

Support:

CSV

Excel

Import flow:

Upload

↓

Map Columns

↓

Validate

↓

Preview

↓

Confirm

↓

Import

Example:

487 records found

472 valid

15 errors

Allow downloading error rows.

==================================================

57. MOBILE EXPERIENCE

==================================================

The application must be genuinely mobile responsive.

Do NOT simply shrink the desktop dashboard.

On mobile:

Use cards instead of wide tables.

Sticky actions.

Large touch targets.

Easy payment collection.

Easy WhatsApp reminders.

Bottom navigation:

Home

Students

Collect

Reminders

More

The centre owner should be able to run daily operations entirely from a phone.

==================================================

58. EMPTY STATES

==================================================

Create professional empty states.

Example:

"No students yet."

Add your first student to start tracking fees.

[Add Student]

Do not show blank screens.

==================================================

59. LOADING STATES

==================================================

Use skeleton loaders.

Avoid abrupt content shifts.

==================================================

60. ERROR STATES

==================================================

Use clear human-readable errors.

Bad:

"ERR_DB_492"

Good:

"We couldn't load the payment information. Please try again."

Actions:

Retry

==================================================

61. SUCCESS STATES

==================================================

Use polished confirmation states.

Example:

✓ Payment recorded

₹5,000 received from Aarav Menon.

Receipt generated successfully.

[View Receipt]

[Send WhatsApp]

==================================================

62. UX RULES

==================================================

Follow these rules throughout the application:

1. Minimum clicks.

2. Never hide critical financial information.

3. Primary action must be visually obvious.

4. Use consistent terminology.

5. Do not overwhelm users with charts.

6. Keep advanced features progressive.

7. Use contextual help.

8. Confirm destructive actions.

9. Confirm bulk communication.

10. Preserve user input when validation fails.

11. Use sensible defaults.

12. Make search fast and obvious.

13. Keep forms short.

14. Use side drawers where appropriate instead of unnecessary page navigation.

15. Maintain consistent spacing.

16. Use consistent button hierarchy.

==================================================

63. DESIGN SYSTEM

==================================================

Create a reusable design system.

Primary:

Deep purple

Accent:

Warm yellow/orange

Background:

Very light neutral

Cards:

White

Typography:

Modern sans-serif

Use:

- 8px spacing system

- Consistent border radius

- Subtle shadows

- Clean borders

- Clear typography hierarchy

- Professional tables

- Premium charts

- Responsive components

Do not use excessive gradients.

Do not use excessive glassmorphism.

Do not use excessive animations.

Avoid "AI dashboard" visual clichés.

==================================================

64. BRAND PERSONALITY

==================================================

Classity should feel:

Simple

Trustworthy

Modern

Efficient

Professional

Approachable

Not:

Corporate-heavy

Overly technical

Childish

Over-designed

==================================================

65. LANDING PAGE

==================================================

Create a polished SaaS marketing website.

Hero:

COLLECT FEES.

REMIND PARENTS.

GROW YOUR COACHING CENTRE.

Supporting text:

"Classity helps coaching centres manage fees, automate parent reminders and understand their business — all from one simple platform."

Buttons:

Start Free

Book a Demo

Hero visual:

Show a realistic Classity dashboard and mobile fee/payment interface.

Do not use generic stock images.

==================================================

66. LANDING PAGE SECTIONS

==================================================

Include:

Hero

Problem

Solution

Features

How It Works

Fee Collection

WhatsApp Automation

Digital Receipts

Analytics

Pricing

Testimonials

FAQ

Security

Final CTA

Footer

==================================================

67. PRICING PAGE

==================================================

Create:

Starter

Growth

Pro

Enterprise

Monthly / Annual toggle.

Show:

"Save up to X% with annual billing"

Highlight recommended plan.

Show feature comparison.

CTA:

Start Free

==================================================

68. TRUST & SECURITY

==================================================

Marketing page should communicate:

- Secure cloud platform

- Role-based access

- Tenant data isolation

- Secure payments

- Audit trails

- Data backups

Do not claim certifications that do not actually exist.

==================================================

69. DATABASE MODEL

==================================================

Create database architecture around:

tenants

users

roles

permissions

branches

students

parents

courses

batches

fee_plans

fees

invoices

payments

receipts

refunds

discounts

whatsapp_templates

messages

notifications

automations

expenses

subscriptions

subscription_plans

subscription_invoices

coupons

referrals

support_tickets

audit_logs

api_keys

webhooks

All tenant-specific entities must have proper tenant association.

==================================================

70. DEMO DATA

==================================================

Populate the application with realistic demo data.

Example centre:

"Bright Future Academy"

Students:

150+

Batches:

JEE 2027

NEET 2027

Class 10 Maths

Class 12 Physics

Use realistic Indian names and INR amounts.

Do not use lorem ipsum.

Do not make every number round.

Create realistic payment histories.

==================================================

71. IMPORTANT BUSINESS LOGIC

==================================================

Fee status must be calculated correctly.

Example:

Total fee:

₹5,000

Paid:

₹5,000

Status:

PAID

Total:

₹5,000

Paid:

₹2,000

Pending:

₹3,000

Status:

PARTIALLY PAID

Due date passed + balance > 0:

OVERDUE

Do not rely solely on manually entered status values.

==================================================

72. FINANCIAL SAFETY

==================================================

Never silently change financial records.

For important actions:

- Refund

- Delete payment

- Waive fee

- Change fee

- Change subscription

require confirmation and appropriate permissions.

Create audit records.

==================================================

73. RESPONSIVE REQUIREMENTS

==================================================

Test all major screens at:

Mobile:

375px

390px

430px

Tablet:

768px

1024px

Desktop:

1280px

1440px

1920px

No horizontal scrolling on normal screens.

Tables should become responsive cards or controlled horizontal containers on mobile.

==================================================

74. ACCESSIBILITY

==================================================

Implement:

- Semantic HTML

- Keyboard navigation

- Focus states

- Accessible labels

- Proper form errors

- Good colour contrast

- Screen-reader-friendly controls

- Touch-friendly buttons

==================================================

75. PERFORMANCE

==================================================

Optimize:

- Lazy loading

- Images

- Database queries

- Pagination

- Search

- Charts

- Large reports

Do not load thousands of records into the browser unnecessarily.

Use pagination and server-side filtering where appropriate.

==================================================

76. SECURITY

==================================================

Implement:

- Secure authentication

- RBAC

- Tenant isolation

- Row Level Security where supported

- Input validation

- Secure file upload handling

- Rate limiting architecture

- Secure API design

- Audit logs

- Session management

Never expose secret API keys in frontend code.

==================================================

77. FUTURE INTEGRATION ARCHITECTURE

==================================================

Prepare service interfaces for:

PaymentService

WhatsAppService

EmailService

SMSService

SubscriptionService

NotificationService

ReportService

AIInsightService

This allows integrations to be added without rewriting the UI.

==================================================

78. NO FAKE FUNCTIONALITY

==================================================

This is extremely important.

Do not create buttons that appear functional but do nothing.

If functionality cannot be implemented because an external integration is unavailable:

- Create the UI

- Create the correct service abstraction

- Show an appropriate "Not Connected" state

- Provide configuration instructions/placeholders

Do not falsely report:

"Payment successful"

"WhatsApp sent"

"Email delivered"

unless the system actually completed the operation.

==================================================

79. APPLICATION ROUTES

==================================================

Create appropriate routes such as:

/

/pricing

/login

/register

/onboarding

/app

/app/dashboard

/app/students

/app/students/:id

/app/fees

/app/fee-plans

/app/payments

/app/receipts

/app/whatsapp

/app/whatsapp/templates

/app/batches

/app/expenses

/app/reports

/app/staff

/app/settings

/app/subscription

/app/support

/admin

/admin/dashboard

/admin/tenants

/admin/plans

/admin/subscriptions

/admin/revenue

/admin/coupons

/admin/referrals

/admin/support

/admin/feature-flags

/admin/audit-logs

==================================================

80. FINAL QUALITY BAR

==================================================

Before considering the application complete, verify:

- Every navigation item works.

- Every primary CTA works.

- Forms validate correctly.

- Search works.

- Filters work.

- Student creation works.

- Fee creation works.

- Payment recording works.

- Partial payments work.

- Receipts work.

- Dashboard updates after transactions.

- WhatsApp UI works with demo/integration state.

- Subscription UI works.

- Upgrade/downgrade flows work.

- Permissions are enforced.

- Tenant isolation is implemented.

- Mobile layouts work.

- Empty states exist.

- Loading states exist.

- Error states exist.

- Success states exist.

- No dead buttons.

- No placeholder lorem ipsum.

- No fake integrations.

- No console errors.

- No broken routes.

- No horizontal overflow.

- No obviously duplicated components.

==================================================

81. BUILD PRIORITY

==================================================

Do NOT sacrifice core functionality just to create more screens.

Priority:

P0:

Authentication

Tenant

Dashboard

Students

Fees

Fee Plans

Payments

Receipts

Roles

P1:

WhatsApp

Reports

Batches

Subscription

Billing

Super Admin

P2:

Expenses

Multi-branch

Automation

Advanced Analytics

AI Insights

P3:

Parent Portal

Student Portal

API

White Label

Enterprise

Build the P0 experience deeply and correctly before adding unnecessary complexity.

==================================================

82. FINAL EXPERIENCE

==================================================

When a centre owner logs in, they should immediately understand:

How much was collected?

How much is pending?

Who is overdue?

What needs attention?

What action should I take?

The most important action should always be easy:

COLLECT FEE

The second most important:

SEND REMINDER

The application should feel like a product that a real coaching-centre owner would willingly pay for every month.

Build the application as a polished, production-ready SaaS foundation rather than a simple UI prototype.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
