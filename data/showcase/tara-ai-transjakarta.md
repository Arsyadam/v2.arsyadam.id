---
title: "TARA — TransJakarta AI Customer Service Chatbot"
description: "An AI assistant that helps TransJakarta passengers get transit answers and submit complete complaints, live on WhatsApp, Instagram, and the TJ App."
image: "/img/showcase/tara.jpg"
technologies: ["Python", "FastAPI", "AI/LLM", "PostgreSQL", "Redis", "Next.js", "React"]
date: "2026-06-28"
url: "https://www.instagram.com/infotije"
github: ""
---


## Overview

TransJakarta serves millions of passengers every day, but many complaints still reach customer service incomplete: missing route numbers, card details, or a clear timeline of what happened. I built **TARA**, an AI customer service assistant that answers transit questions and guides passengers through official complaint reports across **WhatsApp, Instagram, Facebook, and the TJ App**.

Instead of one vague follow-up message, Tara walks users through a **numbered checklist** tailored to their complaint type, so reports reach the CS team with the information they actually need. You can try it today on **Instagram [@infotije](https://www.instagram.com/infotije)**, **WhatsApp Customer Care Tara AI**, or inside the **TJ:TransJakarta** app.

---

## What Tara Can Do

**Trips & routes**
- How to get from A to B, including fastest, cheapest, or fewest-transfer options
- Check whether TransJakarta serves a given destination
- Route info: which stops a corridor passes through
- Operating hours and service schedules

**Location & stops**
- Find the nearest bus stop from a place name or the user's location
- Coordinates for a location or stop
- Departure times at a specific stop (e.g. "What time does route 9 leave from Halte Pancoran Tugu?")

**Service information**
- FAQs on TransJakarta: payment (Flazz, e-Money, QRIS, etc.), tickets, policies, tips, accessibility
- Stop facilities: toilets, lifts, escalators, prayer rooms, charging, nursing rooms, bike parking, and more

**Official reports**
- Formal complaints and suggestions sent to the TransJakarta CS dashboard
- Automatic classification into **218 complaint subcategories**
- Numbered follow-up per complaint type: Tara only asks for what is still missing; users can answer all at once or step by step
- Confirmation before submit, with the option to correct data

**Track a report**
- Check report status with a ticket number (e.g. TJ-TIC05260004547)

**Natural conversation**
- Greetings, thank-yous, and ending the chat naturally
- Handoff to a human agent when the user asks to speak with CS
- Polite handling of questions outside TransJakarta topics

---

## Try It

| Channel | How to access |
|---|---|
| **Instagram** | DM [@infotije](https://www.instagram.com/infotije) |
| **WhatsApp** | Customer Care Tara AI (official TransJakarta number) |
| **TJ App** | Customer Care Tara AI inside **TJ:TransJakarta** |
| **Facebook** | TransJakarta Messenger (smaller volume) |
| **Web** | Guest chat without login |

---

## My Role

- **Conversation & product logic:** Built and extended the core chat flow for all intents above, including multi-turn conversations where Tara remembers what the user already said, across every channel.
- **Complaint reporting:** Designed how Tara classifies complaints, asks the right follow-up questions per category, and sends a complete report to the internal dashboard, linked back to the original chat so agents can trace the conversation.
- **AI & knowledge base:** Connected Tara to a searchable FAQ system so answers stay grounded in approved company content, and improved complaint classification so similar-sounding issues land in the right category.
- **CS team collaboration:** Built tooling to auto-generate review spreadsheets from the official complaint taxonomy so CS staff can validate follow-up questions across **200+ complaint types** without maintaining them by hand.
- **Admin dashboard:** Worked on the internal web dashboard for session monitoring, sentiment overview, chat history review, and FAQ content management.

---

## Technical Highlights

### Complaint intake that mirrors how CS agents work

Before this work, Tara could guess the complaint type but only asked one round of follow-up. Agents still had to chase missing details like chronology, card number, or bus code. I separated **"what type of complaint is this?"** from **"what do we need to ask for this type?"** so CS teams own the question list while the product team owns the category structure.

When information is still missing, Tara sends a **numbered list** (e.g. 1. Chronology, 2. Card number, 3. Route). Passengers can answer everything at once or step by step. Tara skips questions already answered in the opening message. Location details (route, bus code, stop) are only asked when relevant. App-related complaints do not trigger bus-location questions.

### Smart route help with two sources of truth

Passengers ask for directions in many ways: via Google Maps, "cheapest route," or simply "how do I get to Blok M?" I built logic that detects what the user wants and pulls from **real-time map data** when appropriate, or from an **in-house route engine** optimized for TransJakarta corridors when maps are not needed or not available. Responses clearly state which source was used so users are not confused when answers differ.

---

## Impact & Results
### The headline: fewer sessions, better outcomes

Overall volume went down, but quality went up. In **June 2026**, Tara handled about **21% fewer sessions** than May. Yet **deflection rate** (conversations resolved without a human agent) rose from **82.8% to 89.6%**. Tara needed human escalation less often, even with fewer total conversations.

### By channel (May to June)

| Channel | Volume change | Escalation rate |
|---|---|---|
| **WhatsApp** | Largest channel | **28.3% to 17.1%**. Biggest improvement and main driver of overall deflection gain |
| **Instagram** | Down ~29% | **12.2% to 8.3%** |
| **TJ App** | Down ~13% (stable) | **6.2% to 3.5%**. Best-performing channel overall |
| **Facebook** | Small volume | **12.6% to 6.1%** |
| **Guest (web)** | Up ~5x | **5.1% to 1.6%**. Low escalation, worth monitoring the traffic spike |

### Why escalation rates dropped

The most significant driver was the **introduction of the AI-handled Report feature**. Previously, any complaint submission required routing to a human agent — a reliable source of escalations across all channels. With Tara now able to handle reports end-to-end, a large category of sessions that would have automatically triggered escalation are now resolved by AI. This is most visible on **WhatsApp**, Tara's highest-volume channel, where escalation rate nearly halved from 28.3% to 17.1%.

### Other results

- **218 complaint subcategories** aligned with the official CS taxonomy
- **Numbered, multi-turn follow-up** replaces a single generic question
- **CS review workflow** with auto-generated spreadsheets for sign-off across all complaint types
- **Traceable reports** where each submission links back to the original chat session
- Deployed live across **5 channels**, serving tens of thousands of sessions per month

---

## Stack & Architecture

| Layer | Choice | Why |
|---|---|---|
| Backend API | Python + FastAPI | Real-time chat from mobile and social channels |
| AI model | DeepSeek V3 | Strong Indonesian language understanding at reasonable cost |
| Caching | Redis | Conversation state consistent across server instances |
| Database | PostgreSQL | Transit data, chat sessions, and analytics |
| Knowledge base | Vector search | Tara answers from approved FAQs instead of guessing |
| Route planning | Google Maps + in-house algorithm | Real-time directions when needed; TJ-optimized routing as fallback |
| Admin UI | Next.js + React | Internal dashboard for sessions, sentiment, and FAQ management |

---

## Lessons Learned

Early on, follow-up rules lived inside the main conversation logic. That worked for a handful of complaint types but broke down at scale. CS could not review or update questions without going through engineering. Giving CS a structured, reviewable checklist per complaint type was the real fix.

The June numbers confirmed the tradeoff was worth it: volume dropped, but quality rose. WhatsApp was the hardest channel in May (28% escalation) and saw the steepest drop. That showed better follow-up logic and classification matter more than raw session count.

I also learned that polishing AI responses for a friendlier tone can accidentally break app features. Confirmation buttons (Yes/No) disappeared when messages were rewritten. Formal report steps now keep a fixed format so the mobile UI always shows the right options.

---

## Links

- **Try on Instagram:** [@infotije](https://www.instagram.com/infotije)
- **WhatsApp:** Customer Care Tara AI
- **TJ App:** TJ:TransJakarta, Customer Care Tara AI
- **GitHub:** Private, TransJakarta engineering
- **Demo:** _[Screen recording of numbered follow-up and confirmation flow]_

---

