---
title: "Sure Finance"
description: "Self-hosted personal finance app with Gmail Bank Sync for 7 Indonesian banks, turning email notifications into categorized transactions in near real time."
image: "/img/showcase/sure-finance.png"
technologies:
  [
    "Ruby on Rails 7",
    "Hotwire (Turbo + Stimulus)",
    "PostgreSQL",
    "Redis / Sidekiq",
    "Gmail Pub/Sub",
    "OpenAI-compatible LLM",
    "Docker",
    "Dokploy",
  ]
date: "2026-06-01"
url: "https://sure.arsyadam.id"
github: "https://github.com/Arsyadam/sure"
---

## Overview

Most personal finance apps that work well in the US rely on Plaid or SimpleFIN — neither covers everyday banking in Indonesia. I self-host **Sure** (a community fork of the open-sourced Maybe Finance codebase) and extended it with **Bank Sync**: when BCA, Mandiri, or GoPay sends a transaction email to Gmail, the app parses it, categorizes it with an LLM, and posts it to the right account — without manual entry or a third-party aggregator.

The feature runs inside the Rails app on my own VPS (`sure.arsyadam.id`), using Gmail Push notifications instead of polling, with bank-specific HTML parsers and a deduplication layer so duplicate webhooks never create duplicate transactions.

---

## My Role

- **Backend / Mail Sync:** Designed and built the full `MailSync` pipeline in Rails — Gmail OAuth, Pub/Sub webhook handler, history-based incremental sync, atomic message claiming, and `TransactionCreator` integration with Sure's existing ledger model.
- **Parsing / Indonesia banks:** Implemented dedicated HTML parsers for **7 banks/wallets** (BCA, CIMB Niaga, Bank Jago, GoPay, Mandiri, Jenius credit, Bank Mega credit), plus an admin-editable regex pattern layer for when banks change email templates.
- **AI categorization:** Wired an OpenAI-compatible LLM classifier that maps parsed merchant + amount to the family's expense categories, with temperature 0 and strict JSON output.
- **DevOps / infra:** Containerized a custom Rails image, deployed on Dokploy (Oracle VPS) behind Cloudflare Tunnel, configured Gmail Pub/Sub topic + watch renewal cron, and wrote Node deploy scripts for repeatable git-pull → docker build → compose update.

---

## Technical Highlights

### Gmail Push sync without duplicate transactions

Bank emails arrive unpredictably, and Gmail Pub/Sub can deliver the same history ID twice if webhooks overlap. I process pushes inside a row-level lock on `MailSyncConnection`, skip stale history IDs, and use `claim_message!` (unique index on `gmail_message_id`) so only one Sidekiq worker ever imports a given email. Watches expire after **7 days**; a Sidekiq-cron job renews them daily at 4 AM so push delivery stays alive without manual intervention.

### Bank-specific parsers + LLM fallback for messy HTML

Each Indonesian bank formats notification emails differently — Jago uses labeled table rows, GoPay embeds amounts in nested tables, BCA mixes Rp formatting styles. I built one parser class per bank with IDR amount normalization (`parse_idr_amount`), then added a pattern-admin UI so I can adjust regex when a bank silently changes its template without redeploying Ruby code. After parsing, `LlmClassifier` sends merchant, amount, and date to a self-hosted LLM proxy and writes the result into Sure's native transaction + category model.

### From sidecar prototype to first-class Rails feature

I started with a standalone Node/Express `sure-bank-sync` sidecar mounted at `/mail-sync`, then migrated everything into Rails services under `app/services/mail_sync/` with `mail_sync_events` for observability (push received, parse failed, import skipped, etc.). That removed an extra container, let Bank Sync reuse Pundit authorization and family scoping, and made the Settings → Bank Sync wizard a native part of the app.

---

## Impact & Results

- **7** Indonesian bank/wallet email formats supported out of the box (BCA, CIMB, Jago, GoPay, Mandiri, Jenius CC, Mega CC)
- **Near real-time** imports via Gmail Push (seconds after email delivery, vs. manual entry or hourly polling)
- **Zero duplicate transactions** from concurrent Pub/Sub deliveries in production testing (atomic claim + history pointer)
- Deployed and used daily on self-hosted instance at **sure.arsyadam.id** (single-family deployment)
- Extended upstream Sure without forking the core ledger — mail sync writes through the same `Entry` / `Transaction` APIs as Plaid imports

---

## Stack & Architecture

| Layer | Tech | Why |
|---|---|---|
| App | Ruby on Rails 7.2 + Hotwire | Upstream Sure stack; server-rendered UI with Turbo frames for modals/wizards without a separate React SPA |
| Jobs | Sidekiq + Redis | Async Gmail push processing; `sidekiq-unique-jobs` prevents duplicate job runs per connection |
| Database | PostgreSQL 16 | Sure's multi-tenant family model, mail sync connections, bank links, processed message IDs |
| Ingestion | Gmail API + Google Pub/Sub | Push notifications to `/webhooks/gmail_mail_sync` instead of polling Gmail every N minutes |
| AI | OpenAI-compatible API (via self-hosted proxy) | Categorize parsed transactions into existing family categories with structured JSON |
| Deploy | Docker + Dokploy + Cloudflare Tunnel | HTTPS at the edge without exposing VPS ports; custom image built from `Arsyadam/sure` on push |
| Legacy prototype | Node/Express + SQLite (retired) | Validated Gmail OAuth flow before integrating into Rails |

```
Gmail inbox
    → Google Pub/Sub
    → POST /webhooks/gmail_mail_sync
    → MailSyncGmailPushJob (Sidekiq)
    → MailSync::Processor (history sync, per-connection lock)
    → BankEmailParser / PatternParser
    → AccountHintExtractor (last-4 routing)
    → LlmClassifier
    → TransactionCreator → Sure ledger
```

---

## Lessons Learned

I underestimated how often banks change HTML email layouts — BCA and GoPay needed different extraction strategies for the same field (amount). Next time I'd ship the regex pattern admin earlier instead of hardcoding every variant in Ruby first. I also learned to trace Gmail `message_id`s end-to-end (`mail_sync:trace_message` rake task) before assuming the parser failed — many early errors were emails deleted before the worker fetched them, not bad HTML.

---

## Links

- 🔗 **Live:** [https://sure.arsyadam.id](https://sure.arsyadam.id)
- 💻 **GitHub:** [https://github.com/Arsyadam/sure](https://github.com/Arsyadam/sure)
- 🎥 **Demo:** _(private instance — demo video can be added here)_
