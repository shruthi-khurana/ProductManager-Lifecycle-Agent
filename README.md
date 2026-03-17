# 🤖 PM Lifecycle Agent

An end-to-end agentic workflow that automates the full product management lifecycle — from raw problem statement to GTM plan — using the Anthropic Claude API with human-in-the-loop checkpoints at every stage.

## What it does

Input a product problem statement. The agent walks you through 7 PM stages, generating professional artifacts at each step. You review, edit, or redirect at every checkpoint before the next stage runs.

```
Problem Statement
       ↓
Stage 1 → Discovery & Ideation        [✋ Checkpoint]
Stage 2 → Roadmapping & Prioritization [✋ Checkpoint]
Stage 3 → BRD / FRD Generation        [✋ Checkpoint]
Stage 4 → UI/UX & Design Brief        [✋ Checkpoint]
Stage 5 → UAT Planning & Test Cases   [✋ Checkpoint]
Stage 6 → Production Readiness        [✋ Checkpoint]
Stage 7 → GTM Planning                [✋ Checkpoint]
       ↓
8 Artifact Bundle (markdown)
```

## Why human-in-the-loop?

Each checkpoint gives you three options:
- **Approve** — proceed as-is
- **Edit** — paste your own version before proceeding
- **Regenerate** — provide feedback, re-run the stage

This mirrors how real PM work happens: AI accelerates the drafting, humans make the decisions.

## Stack

- Python 3.9+
- [Anthropic Claude API](https://docs.anthropic.com)
- Jupyter Notebook
- No external dependencies beyond `anthropic`

## Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/pm-lifecycle-agent
cd pm-lifecycle-agent

# Install dependency
pip install anthropic

# Set your API key
export ANTHROPIC_API_KEY='your-key-here'

# Launch notebook
jupyter notebook pm_lifecycle_agent.ipynb
```

## Output Artifacts

Each run produces a full artifact bundle in `/artifacts`:

| File | Contents |
|------|----------|
| `00_executive_summary.md` | One-page product brief |
| `01_discovery.md` | Market sizing, personas, opportunity statement |
| `02_roadmap.md` | RICE scores, MoSCoW, phased roadmap |
| `03_brd_frd.md` | Business & functional requirements, user stories |
| `04_ux_design_brief.md` | User flows, screen inventory, wireframe descriptions |
| `05_uat_plan.md` | Test case matrix, bug triage, sign-off template |
| `06_production_readiness.md` | Go/no-go checklist, rollback plan, launch runbook |
| `07_gtm_plan.md` | ICP, positioning, channel strategy, OKRs |

## Example

**Input:**
> "Small business owners struggle to track and reconcile invoices across multiple payment platforms, leading to cash flow blind spots and delayed collections."

**Output:** 8 professional PM artifacts covering the full lifecycle from discovery to launch.

## About

Built by [Shruthi Khurana](https://linkedin.com/in/yourprofile) — MSBA candidate at UC Davis, former PM at Citi Bank and Axis Bank.

This project demonstrates applied GenAI engineering: prompt engineering, agentic workflow design, human-in-the-loop patterns, and the Anthropic Claude API — applied to a real-world PM use case.

---

*Inspired by 5 years of building products in financial services — and the conviction that AI should augment PM judgment, not replace it.*
