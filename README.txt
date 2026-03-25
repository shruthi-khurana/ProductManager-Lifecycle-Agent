# 🧠 PM Lifecycle Agent — powered by Sage

An end-to-end agentic workflow that automates the full product management lifecycle — from raw problem statement to GTM plan — using the Anthropic Claude API, ElevenLabs voice, and persistent cross-session memory. Human-in-the-loop checkpoints at every stage.

---

## Meet Sage

Sage is your AI product management partner. She's calm, structured, and conversational — she feels like pairing with a smart senior PM, not running a tool.

> *"Good product work isn't about moving fast. It's about never skipping the step that matters."* — Sage

**What makes Sage different:**
- 🎙️ **She speaks** — ElevenLabs voice narrates every stage intro and checkpoint reaction
- 🧠 **She remembers** — persistent cross-session memory tracks your past products, editing patterns, and feedback preferences
- ✋ **She waits for you** — human-in-the-loop checkpoints at every stage; nothing proceeds without your approval
- 📋 **She compounds context** — each stage builds on the last, so outputs get sharper as you progress

---

## What it does

Input a product problem statement. Sage walks you through 7 PM stages, generating professional artifacts at each step, speaking her reactions, and learning your preferences over time.

```
Problem Statement
       ↓
Stage 1 → Discovery & Ideation          [✋ Sage Checkpoint]
Stage 2 → Roadmapping & Prioritization  [✋ Sage Checkpoint]
Stage 3 → BRD / FRD Generation          [✋ Sage Checkpoint]
Stage 4 → UI/UX & Design Brief          [✋ Sage Checkpoint]
Stage 5 → UAT Planning & Test Cases     [✋ Sage Checkpoint]
Stage 6 → Production Readiness          [✋ Sage Checkpoint]
Stage 7 → GTM Planning                  [✋ Sage Checkpoint]
       ↓
8 Artifact Bundle (markdown) + sage_memory.json
```

---

## Why human-in-the-loop?

At each checkpoint you have three options:
- **[A] Approve** — Sage proceeds to the next stage
- **[E] Edit** — paste your own version before proceeding
- **[R] Regenerate** — give Sage feedback, she incorporates it and reruns

---

## Persistent Memory

Sage maintains a sage_memory.json file that persists between sessions tracking your past products, editing patterns, and feedback preferences. On session 1 she introduces herself. By session 4 she says: "Welcome back, Shruthi. Last time we worked on Video KYC onboarding. Session 4 — let's get into it."

---

## Stack

- Python 3.9+
- Anthropic Claude API — claude-sonnet-4-6
- ElevenLabs API — Rachel voice, eleven_turbo_v2
- Jupyter Notebook

---

## Setup

```bash
git clone https://github.com/yourusername/ProductManager-Lifecycle-Agent
cd ProductManager-Lifecycle-Agent
pip install -r requirements.txt
export ANTHROPIC_API_KEY='your-anthropic-key'
export ELEVENLABS_API_KEY='your-elevenlabs-key'
jupyter notebook pm_lifecycle_agent.ipynb
```

---

## Output Artifacts

| File | Contents |
|------|----------|
| 00_executive_summary.md | One-page product brief |
| 01_discovery.md | Market sizing, personas, opportunity statement |
| 02_roadmap.md | RICE scores, MoSCoW, phased roadmap |
| 03_brd_frd.md | Business & functional requirements, user stories |
| 04_ux_design_brief.md | User flows, screen inventory, wireframe descriptions |
| 05_uat_plan.md | Test case matrix, bug triage, sign-off template |
| 06_production_readiness.md | Go/no-go checklist, rollback plan, launch runbook |
| 07_gtm_plan.md | ICP, positioning, channel strategy, OKRs |

---

Built by Shruthi Khurana — MSBA candidate at UC Davis, former PM at Citi Bank and Axis Bank.

*AI should augment PM judgment, not replace it.*
