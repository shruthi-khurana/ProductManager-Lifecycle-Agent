# Product Roadmap: AI Work Credibility Platform

Let me think through this carefully. Your discovery is clean and directional: professionals have skin in the game (they *want* to show their work), and recruiters have the wallet. That's a strong two-sided dynamic to build on.

Before I build the roadmap, one thing worth flagging: the "AI-first community" mention tells me you're not *just* building a portfolio—you're building a signaling layer + network effect. That shapes everything downstream. Let's make sure the roadmap reflects that.

---

## 1. Feature Ideation

Here are 15 potential features, organized around three pillars: **Showcase**, **Credibility**, and **Community**.

### Showcase (How professionals prove what they built)
1. **Portfolio Builder with AI Prompts/Model Cards** — Capture the actual prompt, model used, iterations, and output. Not just a link to the result.
2. **Project Timeline & Iteration Tracking** — Show the evolution of a project (v1 → v3), including mistakes and refinements.
3. **Code + Prompt Versioning** — Git-like history for both code and prompts (collaborative experiments).
4. **Live Demo Embedding** — Embed working AI applications (chatbots, agents, fine-tuned models) directly on profile.
5. **Skill Endorsement via Proof** — Instead of "endorsing" a skill, reviewers endorse *specific projects* that demonstrate it.

### Credibility (How recruiters trust the work is real)
6. **Authenticity Badges** — "Built in 30 days," "Solo project," "Open source," "Verified by peer review" — earned through platform actions.
7. **Peer Review/Attestation System** — Other professionals review and sign off on work quality and novelty.
8. **Impact Metrics Dashboard** — Track usage/engagement (GitHub stars, API calls, user feedback) to prove real adoption.
9. **Public Learner Challenges** — Complete structured AI tasks (e.g., "Fine-tune BERT for sentiment," "Build a RAG system") with automated scoring and leaderboards.
10. **Work Provenance Log** — Transparent record of when work was created, what tools/models were used, and whether it's truly original.

### Community & Engagement (Network effects)
11. **AI-First Discussion Threads** — Project-specific discussions where professionals debate approach, results, tradeoffs (not just validation).
12. **Mentorship Matching** — Connect junior transitioning professionals with senior practitioners based on shared projects/interests.
13. **Collaborative Project Requests** — Recruiters post "build this with Claude" challenges; professionals team up and build together.
14. **Weekly Shipping Digest** — Curated feed of what people built this week (drives FOMO, community visibility).
15. **Recruiter Watchlist & Reverse Matching** — Professionals can see which recruiters are watching their profile, get notified of job matches.

---

## 2. RICE Prioritization

Let's score these honestly. I'm assuming:
- **Reach**: How many of your target professionals (and recruiters) does this unlock?
- **Impact**: How much does this move the needle on "I can now prove I know AI"?
- **Confidence**: How sure are we this will work? (lower confidence on new behaviors)
- **Effort**: Realistic person-weeks to ship a usable v1.

| # | Feature | Reach | Impact | Conf. | Effort | RICE Score |
|---|---------|-------|--------|-------|--------|-----------|
| 1 | Portfolio Builder with AI Prompts/Model Cards | 9 | 10 | 1.0 | 6 | **15.0** |
| 6 | Authenticity Badges (Earned) | 9 | 8 | 0.8 | 5 | **11.5** |
| 7 | Peer Review/Attestation System | 8 | 9 | 0.8 | 8 | **9.0** |
| 8 | Impact Metrics Dashboard | 7 | 9 | 0.8 | 6 | **8.4** |
| 2 | Project Timeline & Iteration Tracking | 8 | 7 | 1.0 | 4 | **14.0** |
| 9 | Public Learner Challenges | 7 | 8 | 0.8 | 10 | **4.5** |
| 4 | Live Demo Embedding | 7 | 7 | 0.8 | 7 | **5.6** |
| 5 | Skill Endorsement via Proof | 7 | 7 | 0.8 | 5 | **7.84** |
| 10 | Work Provenance Log | 6 | 8 | 0.8 | 4 | **9.6** |
| 15 | Recruiter Watchlist & Reverse Matching | 8 | 6 | 0.8 | 5 | **7.68** |
| 11 | AI-First Discussion Threads | 6 | 6 | 0.8 | 5 | **5.76** |
| 12 | Mentorship Matching | 5 | 6 | 0.5 | 6 | **2.5** |
| 3 | Code + Prompt Versioning | 5 | 6 | 0.8 | 8 | **3.0** |
| 14 | Weekly Shipping Digest | 7 | 5 | 0.8 | 3 | **9.33** |
| 13 | Collaborative Project Requests | 5 | 7 | 0.5 | 12 | **1.46** |

**Sorted by RICE (descending):**

| Rank | Feature | RICE Score | Status |
|------|---------|-----------|--------|
| 1 | Portfolio Builder with AI Prompts/Model Cards | **15.0** | Must Have |
| 2 | Project Timeline & Iteration Tracking | **14.0** | Must Have |
| 3 | Authenticity Badges (Earned) | **11.5** | Must Have |
| 4 | Work Provenance Log | **9.6** | Should Have |
| 5 | Weekly Shipping Digest | **9.33** | Should Have |
| 6 | Peer Review/Attestation System | **9.0** | Should Have |
| 7 | Impact Metrics Dashboard | **8.4** | Should Have |
| 8 | Skill Endorsement via Proof | **7.84** | Should Have |
| 9 | Recruiter Watchlist & Reverse Matching | **7.68** | Should Have |
| 10 | Live Demo Embedding | **5.6** | Could Have |
| 11 | AI-First Discussion Threads | **5.76** | Could Have |
| 12 | Public Learner Challenges | **4.5** | Could Have |
| 13 | Code + Prompt Versioning | **3.0** | Could Have |
| 14 | Mentorship Matching | **2.5** | Won't Have (v1) |
| 15 | Collaborative Project Requests | **1.46** | Won't Have (v1) |

---

## 3. MoSCoW Classification (v1)

### Must Have (MVP)
- **Portfolio Builder with AI Prompts/Model Cards** — Core product. Without this, there's nothing to show. Must capture: prompt, model, outputs, iterations, date.
- **Project Timeline & Iteration Tracking** — Differentiates you from GitHub/Behance. Shows process, not just polish. Critical for signaling real understanding.
- **Authenticity Badges (Earned)** — The *currency* of credibility. Professionals earn badges by shipping; recruiters trust the badges. This is what makes the signal *credible*.

### Should Have (Growth, Months 2–6)
- **Work Provenance Log** — Transparent metadata (when built, what tools, open source or proprietary). Builds trust with recruiters.
- **Weekly Shipping Digest** — Drives engagement, community visibility, FOMO. Early network effect.
- **Peer Review/Attestation System** — Other professionals validate work. Peer trust > self-attestation.
- **Impact Metrics Dashboard** — Show real usage (GitHub stars, deployed app traffic). Proves viability.
- **Skill Endorsement via Proof** — Cleaner signal than LinkedIn endorsements (tied to actual projects).
- **Recruiter Watchlist & Reverse Matching** — Recruiter-side feature that drives two-sided engagement.

### Could Have (Scale, Months 6–12)
- **Live Demo Embedding** — Nice-to-have for certain projects (chatbots, apps), but not essential in v1.
- **AI-First Discussion Threads** — Community building, but can start with Reddit/Discord and integrate later.
- **Public Learner Challenges** — Drives engagement but adds complexity. Easier as a Phase 2 addition once platform has traction.
- **Code + Prompt Versioning** — Git integration is nice, but most professionals already use GitHub. Lower ROI in v1.

### Won't Have (v1)
- **Mentorship Matching** — Requires critical mass and curation. Defer to Phase 3.
- **Collaborative Project Requests** — Complex two-sided coordination. Focus on individual credibility first.

---

## 4. Phased Roadmap

### **Phase 1: MVP (Months 0–3) — "Prove You Built It"**

**Goal**: Get professionals to upload their best AI work with full provenance. Start recruiting funnel.

| Week | Pillar | Feature | Deliverable |
|------|--------|---------|-------------|
| 1–2 | Core | Portfolio Platform | Basic profile + project upload (title, description, date) |
| 3–4 | Core | Portfolio Builder with Prompts | Add: prompt card, model used, iterations/versions, outputs. UI for "tell your story" |
| 5–6 | Credibility | Authenticity Badges (3 initial) | "Early Adopter," "Shipped," "Peer Verified" |
| 7–8 | Core | Project Timeline | Show evolution (v1 → v2 → v3) with screenshots/outputs |
| 9–10 | Credibility | Work Provenance Log | Timestamp, model info, URL/repo links, open source flag |
| 11–12 | Growth | Recruiter Invite Portal | Launch recruiter sign-ups; give them ability to search by skills/badges |

**Launch Milestones:**
- ✅ Soft launch to 500 early-adopter professionals (week 8)
- ✅ Gather feedback on portfolio UI and what recruiters actually look for (week 10)
- ✅ Recruiter alpha (50 recruiters, month 3)

**Metrics to track:**
- Profiles created & % with ≥1 project uploaded
- Average # projects per professional
- Recruiter searches & clicks
- Badge adoption rate

---

### **Phase 2: Growth (Months 3–6) — "Trust & Network Effects"**

**Goal**: Introduce peer validation and community. Grow both sides of the marketplace.

| Week | Feature | Why Now | Effort |
|------|---------|---------|--------|
| 13–14 | Peer Review/Attestation | Professionals trust peers; recruiters trust verified work | 3 weeks |
| 15–16 | Weekly Shipping Digest | Drive engagement; showcase success stories | 2 weeks |
| 17–18 | Impact Metrics Dashboard | Let professionals show real traction (GitHub stars, usage) | 4 weeks |
| 19–20 | Skill Endorsement via Proof | LinkedIn alternative; tied to projects | 2 weeks |
| 21–22 | Recruiter Watchlist | Drive reverse engagement; give professionals FOMO | 2 weeks |
| 23–24 | Iterate on Badges | Add 3–5 more badges based on community behavior | 2 weeks |

**Key decisions in Phase 2:**
- Open peer review or curated reviewers? → Start curated (invite-only, 100 expert reviewers) to maintain quality.
- Shipping Digest: Weekly email or in-app? → Both. Email + homepage feed.
- Impact metrics: Auto-sync from GitHub? → Yes, but allow manual input too (not all projects live there).

**Growth Mechanics:**
- Professionals share profiles → referral loop (invite other transitioning pros)
- Recruiters share feedback → "You were reviewed by 3 recruiters" notification

**Metrics to track:**
- % of projects with peer reviews
- Recruiter-to-professional message conversion rate
- Week-over-week profile views & uploads
- Referral loop velocity

---

### **Phase 3: Scale (Months 6–12) — "Network & Monetization"**

**Goal**: Deepen network effects. Introduce premium recruiter tier. Explore creator economy.

| Feature | Rationale |
|---------|-----------|
| **Live Demo Embedding** | Once we have adoption, add richness (deployed agents, chatbots live on profile). 3 weeks effort. |
| **Public Learner Challenges** | "Build a RAG system" challenge; leaderboard; recruiters sponsor prizes. Drives engagement + job pipeline. 8 weeks effort. |
| **AI-First Discussion Threads** | Deep conversations per project. Build community. 3 weeks. |
| **Mentorship Matching** | Connect junior + senior pros. Retention tool. 4 weeks. |
| **Recruiter Premium Tier** | Unlimited searches, saved filters, automated outreach tools. $500–1K/mo. |
| **Creator Monetization** | Top professionals can sell AI courses, templates, prompts on platform. (Future iteration) |

**Pricing model (Phase 3):**
- Professionals: Free forever (community benefits from free)
- Recruiters: Freemium
  - Free: 10 searches/mo, browse public profiles
  - Premium: Unlimited searches, filters, messaging, watchlists, recruiter analytics ($500–1K/mo)

---

## 5. Key Tradeoffs & Decisions

### **What We're NOT Building in v1 (and Why)**

#### ❌ Automated Skill Detection / AI Resume Parser
- **Why not**: Tempting to auto-extract skills from projects using LLMs, but it's a false sense of accuracy. We want professionals to *explicitly claim* skills + projects to prove them. Self-selection > algorithmic detection.
- **When we'll revisit**: Phase 3, for personalized recruiter recommendations.

#### ❌ Collaborative/Team Projects
- **Why not**: Adds governance complexity (who gets credit? IP sharing?). Start with individual portfolios. Team projects can be manually added as "contributed to [project]."
- **When**: Phase 3, with clear roles/attribution.

#### ❌ AI-Generated Portfolio Summaries
- **Why not**: Ironic given the product. Professionals should write their own story—that's part of the signal. An AI writing "I built this with AI" dilutes credibility.
- **Alternative**: Optional writing guidance/template.

#### ❌ Direct Integration with ATS (Applicant Tracking Systems)
- **Why not**: Recruiters still need to see resumes. This is *additive* to existing hiring flows, not a replacement.
- **When we'll revisit**: Once we have recruiter stickiness (Phase 2+).

#### ❌ Mentorship Marketplace / One-on-One Coaching
- **Why not**: Requires high-touch curation. Defer. Start with peer validation (async).

#### ❌ Gamification (Points, Streaks, Leaderboards) in v1
- **Why not**: Can feel gimmicky early. Focus on real credibility signals (badges, peer reviews) over vanity metrics.
- **Revisit in Phase 2**: If engagement metrics dip.

---

## 6. Success Metrics by Phase

### Phase 1 (MVP)
- ✅ 1,000 professionals with ≥1 project
- ✅ 50+ recruiters signed up and browsing
- ✅ Average project has 2+ iterations/versions documented
- ✅ NPS from both sides ≥ 40

### Phase 2 (Growth)
- ✅ 10,000 professionals, 500+ recruiters
- ✅ 30% of projects have peer reviews
- ✅ 5+ recruiter messages per professional per month (signal of real interest)
- ✅ Referral rate: 20% of new signups

### Phase 3 (Scale)
- ✅ 50,000 professionals, 2,000+