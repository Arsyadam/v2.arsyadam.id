---
title: "Yumindo AI - Field Survey Extraction"
description: "A multimodal AI service that turns handwritten surveyor notes into structured window records in Supabase for Yumindo's CS team."
image: "/img/showcase/yumindo-ai.png"
gif: "/img/showcase/yumindo-ai.gif"
technologies: ["Mastra", "TypeScript", "GPT-4o Vision", "9Router", "Supabase", "Zod"]
date: "2026-06-27"
url: ""
github: "https://github.com/Arsyadam/yumindo-ai"
---

## Overview

Yumindo's field surveyors still log curtain measurements, fabrics, and models in handwritten notebooks — then CS staff re-type every line into the system and manually match fabric codes and model names against the catalog. That workflow is slow and error-prone, especially when one page contains many windows with inconsistent formatting.

I built **Yumindo AI**, a [Mastra](https://mastra.ai)-based service that accepts survey photos plus optional text notes, extracts window items with a vision model, validates fabrics and models against Supabase deterministically, and writes `windows` rows directly onto an existing transaction. The CRM triggers this through `/api/ai-extract`, so surveyors keep writing in their notebooks.

---

## My Role

- **AI / Workflow:** Designed the 3-step `survey-workflow` (ingestion → catalog validation → persist), wrote extraction prompts and schemas for Indonesian handwritten curtain surveys, and integrated vision models via 9Router/OpenRouter.
- **Backend / Tools:** Built `catalog-match` (fabric & model lookup by code, name, catalog name, or motif) and `create-windows` (survey → `windows` column mapping, with `notes` for incomplete or unmatched items).
- **Infrastructure:** Set up self-hosted Mastra (Studio + API + LibSQL traces), `MASTRA_API_KEY` auth, and production deployment docs for the internal team.

---

## Technical Highlights

### Multimodal extraction from inconsistent handwritten notes

Surveyor notebooks often use inherited layout patterns — e.g. height (T) written once at the top, then multiple width (L) rows below. Generic OCR fails because room context, curtain type (gorden / vitrase / blind), and tier fabric codes (A–E) need to be interpreted together.

I shaped behavior through an **Ingestion Agent** with explicit rules: normalized room names (`Ruang Komandan`, `Kamar Anak Lt. 2 Pertama`), separation of accessories vs. site conditions, default quantity = 1, and a single JSON output with no markdown. Images and text notes can be combined — notes validate or fill gaps from the visual read.

### Deterministic catalog validation instead of LLM guessing

After extraction, I do **not** let the LLM pick `fabric_id` or `model_id`. The `catalog-validation` step calls tools that query PostgREST on `fabrics` and `models` with category filters (`Gorden` / `Vitrase`) and `ACTIVE` status, matching code, name, `catalog_name`, or motif. Per-field status: `valid` | `not_found` | `skipped` (for `NONE`/`MISSING`). Items missing width or height are skipped on persist; unmatched catalog entries are still saved with notes so CS can fix them manually.

---

## Impact & Results

- Replaced multi-window manual entry with **1 photo upload + 1 click** from the CRM measurement page
- Workflow writes directly to **`windows`** on an existing `transaction_id` — no new transactions created (clear scope, safer for production)
- **3 traced steps** in Mastra Studio (local `mastra.db`) for per-order extraction debugging
- In internal pilot use for Yumindo CRM ↔ Mastra API integration

---

## Stack & Architecture

| Layer | Tech | Why |
|---|---|---|
| Orchestration | Mastra (agents, workflows, tools) | Separated workflow steps, built-in tracing, TypeScript-first |
| Vision LLM | GPT-4o via 9Router / OpenRouter | Multimodal for survey photos; self-hosted 9Router gateway to swap models without code changes |
| Validation & persist | Supabase REST (PostgREST) | Same database as CRM; real-time catalog lookup |
| Schema | Zod | Typed workflow I/O; fast failure on invalid `transactionId` |
| Deploy | Node ≥ 22, `npm run build` + `start:prod` | Studio + API in one process; Bearer auth on all `/api/*` routes |

---

## Lessons Learned

I initially relied on LLM output for fabric matching — results were unstable when surveyors used legacy names or abbreviations. Splitting **extraction (LLM)** from **catalog validation (deterministic SQL)** was far more reliable. Next time, I'd collect more real field notebook photos earlier for prompt iteration instead of tuning on one or two samples.

---

## Links

- 🔗 **Live:** _(internal — self-hosted)_
- 💻 **GitHub:** [github.com/Arsyadam/yumindo-ai](https://github.com/Arsyadam/yumindo-ai)
- 🎥 **Demo:** _(not published yet)_
