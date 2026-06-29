---
title: "Yumindo CRM - Curtain Production Operations"
description: "An operational web app for Yumindo's CS, production, warehouse, and field teams — from transactions to per-stage work queues with fast mobile updates."
image: "/img/showcase/yumindo-crm.png"
gif: "/img/showcase/yumindo-crm.gif"
technologies: ["Next.js 15", "TypeScript", "Supabase", "shadcn/ui", "Prisma", "Tailwind CSS"]
date: "2026-06-27"
url: ""
github: "https://github.com/Arsyadam/yumindo"
---

## Overview

Yumindo manufactures and installs custom curtains — a single order can have dozens of windows with different fabrics, models, and sizes per room. Production progress was hard to track in real time; coordinators had to ask each stage manually (cutting, sewing, finishing, QC), and field survey data often reached the system late.

I built **Yumindo CRM**, an Indonesian-language web dashboard that manages transactions end-to-end: fabric/model master data, field measurements (AI-integrated), payments, warehouse, and a **per-stage production board** optimized for coordinators updating status from their phones — with optimistic UI so taps reflect instantly without waiting on the server.

---

## My Role

- **Frontend / UX:** Built the mobile-first production page (Start button on the left for left-handed use, full-width Finish at the bottom), spotlight onboarding tutorials per deploy, queue search & filters, and per-tab caching so switching subtabs doesn't refetch everything.
- **Backend / Data:** Server actions for assign/start/finish production, schema migrations on `windows` (status, assignee, audit log via `window_production_logs`), and per-stage queue queries with FIFO queue position.
- **AI integration:** `/api/ai-extract` route calling Mastra's `survey-workflow` from the measurement page — Supabase auth plus transaction validation before extraction runs.
- **Operations modules:** Transactions, field ops (survey/installation), warehouse procurement/inventory, master data, and role-based dashboards for CEO/CS/production staff.

---

## Technical Highlights

### Production board with optimistic updates for floor coordinators

Production coordinators don't have time to wait on a spinner every time they tap Start or Finish — they're walking the shop floor one-handed on a phone.

I implemented **optimistic patches in per-tab client cache**: on button press, `windows` state updates immediately (or the item drops from the queue when it advances to the next stage) while `startWindowProduction` / `finishWindowProduction` server actions run in the background. On failure, a toast fires and data resyncs from Supabase. Tab counts refresh async without blocking the UI — cutting perceived latency from ~1–2 seconds per action to **instant**.

### Per-window production queue, not per order

One transaction can have many windows at different stages. I modeled the queue at **`windows.production_status`** (PENDING → CUTTING → SEWING → FINISHING → QC → READY) with `stage_entered_at` for FIFO ordering, per-window assignees, and `ASSIGN` / `START` / `FINISH` audit logs. Each card shows client name, room, and fabric + dimensions — without address or transaction codes cluttering a small screen.

---

## Impact & Results

- **6 production subtabs** (overview, fabric order, cutting, sewing, finishing, QC) with live queue count badges
- Coordinators can **assign staff, start, and finish** a stage from one card — layout tested for left-handed mobile use
- **Spotlight tutorials** auto-run for new users and on each deploy version bump (coach marks on real UI, not generic popups)
- Replaced manual/spreadsheet production tracking for Yumindo's internal operations (pilot)

---

## Stack & Architecture

| Layer | Tech | Why |
|---|---|---|
| Web app | Next.js 15 App Router | Server actions + RSC; one codebase for the ops dashboard |
| UI | shadcn/ui + Tailwind | Consistent components; dark-first internal design system |
| Auth & DB | Supabase (PostgreSQL + Auth + Storage) | RLS, survey photos in storage |
| ORM (read/admin) | Prisma | Type-safe queries for admin tooling |
| AI bridge | Mastra API (`MASTRA_API_URL`) | CRM doesn't embed models — calls the separate `yumindo-ai` workflow service |
| Notifications | Novu | In-app notifications for operational events |

---

## Lessons Learned

I initially refetched **all tab data + tab counts** on every subtab switch — on mobile that felt painfully slow. Per-tab caching plus background prefetch fixed it; prettier skeletons wouldn't have. For onboarding, dialog popups didn't stick; spotlight coach marks pointing at real page elements worked in one pass for coordinators.

---

## Links

- 🔗 **Live:** _(staging / internal)_
- 💻 **GitHub:** [github.com/Arsyadam/yumindo](https://github.com/Arsyadam/yumindo)
- 🎥 **Demo:** _(not published yet)_
