# Product Discovery: AI Skills Verification Layer

Let me work through this systematically. I want to make sure we're grounded in real market dynamics before we lock in direction.

---

## 1. Market Context

### Market Size Estimate

**TAM (Total Addressable Market):**
- ~4.5M professionals globally in AI-adjacent roles (data analysts, ML engineers, prompt engineers, AI trainers, etc.)
- Assume 35–40% are early-career or transitioning (1.6–1.8M)
- At $50–100/verification or $500–2K annual subscription per user → **~$800M–$3.6B TAM**

**SAM (Serviceable Addressable Market):**
- Focus on English-speaking markets with active tech hiring: US, UK, Canada, EU, parts of APAC
- ~800K professionals in this segment
- Realistic capture: $200M–$500M SAM

**SOM (Serviceable Obtainable Market):**
- Year 1–2 realistic: 5–10K active users paying verification fees
- Year 3–5: 50–100K users
- **Realistic Year 1 revenue: $250K–$1M; Year 3: $5M–$15M**

### Key Trends Driving This Problem

1. **Resume signal decay**: Traditional resumes can't capture iterative learning, project complexity, or tool proficiency — especially new ones
2. **Recruiter skepticism**: LLM claims are easy to fake ("I'm prompt-engineered 100 bots"). Without proof, hiring teams treat AI claims like 2008 resume fluff
3. **Speed-to-value pressure**: Professionals building with LLMs want to monetize skills *now*, not wait 6–12 months for role scarcity to resolve
4. **Fragmentation of "AI skills"**: Unlike traditional certs (AWS, GCP), there's no canonical AI skills framework. Verification needs to map to *real work*, not test scores
5. **Enterprise risk aversion**: Companies hiring for "AI roles" want liability protection — they need auditable proof someone knows what they're doing

### Competitive Landscape & Gaps

| Solution | Who Buys | What It Does | Gap |
|---|---|---|---|
| **LinkedIn Skills Endorsements** | Candidates (free) | Peer-to-peer skill validation | No signal to recruiters; gamified/worthless; no hands-on proof |
| **Coursera/DataCamp Certs** | Candidates pay ($30–500) | Course completion + final exam | Old-school; doesn't prove real-world work; 3–6 month lag |
| **HackerRank/LeetCode** | Candidates + some recruiters | Code challenge platform | Focused on algo/DSA; not AI-specific; no portfolio context |
| **Portfolio sites (GitHub + blog)** | Candidates (free) | Show real work | Requires self-curation; inconsistent quality; no third-party verification; recruiters don't have time to audit |
| **AI Bootcamps (Maven, Maven CLI, Replit)** | Candidates pay ($2–10K) | Instructor-led + capstone | Expensive; slow; doesn't unlock jobs faster; no recruiter integration |

**Key Gap We're Filling:**
- Recruiters need a *signal they can trust* (verified, auditable, current)
- Candidates need a *quick proof point* (not a 3-month course)
- There's no existing layer that connects verified AI skill proof → recruiter search/hiring workflow

---

## 2. User Personas

### Persona 1: The Pragmatic Upskiller (Primary)
**Name:** Maya, 28 | Data Analyst → AI Analyst  
**Context:** 5 years in data analytics at mid-market SaaS. Spent last 6 months building LLM-powered dashboards, embedding models in Tableau, automating ETL with GPT-4. No formal ML degree.

**Top 3 Pain Points:**
1. Resume says "proficient in Python" — doesn't capture that she's shipped 3 LLM integrations in production
2. Recruiters are skeptical: "Have you *actually* built with these tools, or just played around?" She has no way to prove depth
3. Wants a job faster (needs role within 2 months) — can't wait for a 6-month cert program

**Jobs-to-be-Done:**
- Prove to skeptical recruiters that I have *applied*, *production-grade* AI skills
- Differentiate myself from "prompt engineers" who only chatted with ChatGPT
- Get meetings with hiring managers who trust my capabilities

**Current Workarounds:**
- Overstuffs resume with technical detail; hopes interviewer notices
- Shares GitHub links in cover letter; most recruiters don't click
- Blogs sporadically; no built-in audience
- Leans on referrals (slow, limited)

---

### Persona 2: The Skeptical Recruiter (Primary)
**Name:** Jordan, 34 | Senior Technical Recruiter at Scaleup  
**Context:** Hiring for 2–3 "AI/ML roles" (mostly prompt engineers, AI product managers, data roles with AI). Gets 100+ applications/role. Most candidates exaggerate AI experience.

**Top 3 Pain Points:**
1. Can't vet AI claims without sitting down for a 1-hour screening call with every candidate
2. Resume keywords are worthless ("LLM," "prompt engineering") — everyone claims them
3. Wants a way to filter candidates *before* phone screen; needs confidence they're legit

**Jobs-to-be-Done:**
- Quickly filter candidates with *real* hands-on AI experience from noise
- Get auditable proof of capability (liability protection for hiring team)
- Reduce time-to-hire for AI-adjacent roles

**Current Workarounds:**
- Asks candidates to solve a "take-home" AI task (time-consuming, low response rate)
- Leans on hiring manager instinct during screening calls
- Only trusts candidates with obvious proxies: (a) shipped a startup, (b) published papers, (c) known bootcamp
- Filters for "completed Coursera AI cert" (imperfect but something)

---

### Persona 3: The Career Transitioner (Secondary)
**Name:** Alex, 35 | Software Engineer → AI Engineer  
**Context:** 10 years as full-stack engineer. Last 8 months: built RAG pipeline, fine-tuned open-source models, experimented with agents. Wants to pivot roles but worried that "PM/startup tech" background doesn't signal "serious ML person."

**Top 3 Pain Points:**
1. Has shipped multiple AI projects but no ML degree / Kaggle history / prior ML role
2. Worried that without formal credentials, hiring managers will code-interview him on math/theory (not his strength)
3. Wants to signal "I know how to ship AI systems," not "I'm an ML researcher"

**Jobs-to-be-Done:**
- Show that I can build production AI systems (same bar as my 10 years of software)
- Skip theory-focused interviews; go straight to applied conversations
- Prove depth in a way that's agnostic to academic background

**Current Workarounds:**
- Built a detailed GitHub portfolio (high effort, uncertain payoff)
- Shares blog posts about projects (slow content cycle)
- Uses referrals to get past initial resume filter
- Considers a part-time ML cert to "look more serious"

---

## 3. Problem Framing

### Refined Problem Statement (How Might We...)

**How might we create a credible, recruiter-trusted signal for professionals with real hands-on AI experience — so they can get discovered and hired faster, without requiring formal credentials or lengthy certifications?**

---

### Root Cause Analysis (5 Whys)

**Starting point:** Professionals with real AI experience can't prove it to recruiters.

1. **Why?** Traditional resume formats (bullets, dates, skills) don't capture applied learning or project complexity.
2. **Why?** Recruiters can't differentiate between real hands-on work and resume fluff ("prompt engineering" can mean ChatGPT dabbling or shipping production agents).
3. **Why?** There's no third-party verification layer. LinkedIn endorsements are peer-based; Coursera certs are test-based (not skill-based); GitHub is self-curated and unverified.
4. **Why?** Existing platforms (cert sites, portfolios, social) don't integrate with recruiter workflows. Recruiters need filtered candidate lists, not links to audit.
5. **Why?** The AI skills landscape is new and fragmented. There's no canonical definition of "intermediate LLM engineer" — so no standard way to verify it.

**Root insight:** We need to sit *between* candidate proof (verified work samples, peer review, maybe light testing) and recruiter search (a searchable, filterable signal they can trust).

---

### Key Assumptions to Validate

| Assumption | Why It Matters | How We'll Test |
|---|---|---|
| Recruiters will pay for verified candidate access / verification badges | Revenue model depends on recruiter willingness to pay | Survey 20–30 technical recruiters; ask: "Would you pay $500–2K/year for a verified AI candidate pool?" |
| Candidates will complete verification (lift existing work) | Adoption depends on low friction | Prototype verification flow (upload 1 project); test with 50 professionals; measure completion rate target: >60% |
| We can verify AI work credibly without 1-on-1 assessment | Scalability & unit economics require light-touch verification | Design verification framework (code review + peer validation); test with 10 projects; recruiter feedback on confidence |
| Recruiters will trust our signal over resumes | Core value prop; requires brand/trust building | A/B test: show recruiters two candidate profiles (one with badge, one without); measure interview rate lift |
| There's a real job market gap (companies hiring for "AI roles" struggle to find people) | Market opportunity validation | Interview 15–20 hiring managers; ask: "How long does it take you to hire for AI-adjacent roles? What's your bottleneck?" |
| "Hands-on" work matters more than formal credentials to hiring teams | Signals product direction (what we verify) | Analyze job postings (150–200 AI-adjacent roles); code for: "degree required" vs. "shipped projects" language |

---

## 4. Opportunity Statement

**The Opportunity:**

There are ~800K professionals in English-speaking tech markets with real hands-on AI experience but no credible way to prove it to recruiters — while recruiters simultaneously struggle to filter AI-adjacent candidates and verify claims. We can build a **skills verification layer** (not a marketplace, not a course platform) that sits on top of LinkedIn and GitHub: candidates upload or link to real work (projects, code, outputs), we verify depth through code review + peer validation + light skills assessment, and we surface verified "AI-skilled" candidates to recruiters via search/filtering. Recruiters pay for access to this verified pool; candidates get a portable, auditable signal. Success means: (1) 50K+ verified professionals on the platform within 18 months, (2) recruiters adopting the signal as a primary source (moving from LinkedIn/manual searches to our platform), (3) 3–5x faster time-to-hire for AI-adjacent roles vs. traditional pipelines, and (4) $5M+ ARR by Year 3.

---

## Approval & Next Steps

**I'm comfortable locking in this direction.** Here's what I want to flag before we move to roadmap:

1. **This is a B2B2C play** — recruiters are the paying customer, professionals are the supply. This changes go-to-market and unit economics. We need to validate recruiter willingness-to-pay *before* we build.

2. **Verification is your moat** — if it's too heavyweight, adoption stalls; if it's too light, recruiters won't trust it. We need to design this carefully (probably: code review by peer reviewers + maybe a light applied assessment).

3. **Recruiter distribution is non-obvious** — we're not a marketplace, so we can't just "grow supply and demand grows." We need a seeding strategy: which recruiting teams do we land first?

**Ready to move to roadmap?** I'd suggest we structure it as:
- **Phase 0 (4 weeks):** Validate top 3 assumptions (recruiter willingness-to-pay, candidate friction to verify, verification credibility)
- **Phase 1 (8 weeks):** MVP (verification flow + simple recruiter search, 100–200 verified profiles)
- **Phase 2 onwards:** Scale, expand verification methods, land recruiter customers

Sound good? What's your instinct on the biggest risk here?