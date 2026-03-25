# Business & Functional Requirements: AI Transition Portfolio Platform

---

## BUSINESS REQUIREMENTS DOCUMENT (BRD)

### 1. Executive Summary

**Product Name:** [TBD - suggest "BuildWith.AI" or "VibeDev"] (Phase 1)

**Vision:** Enable professionals transitioning into AI-adjacent roles to build credible, verifiable portfolios of real AI work—moving beyond resume bullet points to tangible, peer-reviewed demonstrations of capability.

**Phase 1 Scope:** MVP focused on portfolio showcase + peer review credibility layer. Live demo days deferred to Phase 2.

**Why Now:** 
- AI hiring is exploding, but recruiters have no signal for "has actually built with LLMs"
- Resume and LinkedIn are insufficient mediums for showing applied AI reasoning
- Early-career and transitioning professionals are competing on theory, not practice
- Peer review (not certificates) will be the credibility moat

---

### 2. Business Objectives & Success Metrics

#### Primary Objectives (Phase 1)
| Objective | Success Metric | Target (6 months) | Owner |
|-----------|---|---|---|
| **User Acquisition** | Signups from target cohorts (career-switchers, early professionals) | 500 active builders | Growth |
| **Content Generation** | # of high-quality showcases posted (min 3 projects per user) | 1,500 showcases | Product |
| **Credibility Signal Established** | Avg peer reviews per showcase; review completion rate | 4+ reviews/showcase; 70% review rate | Product |
| **Recruiter Trust** | Recruiter signups; recruiter profile views on platform | 50 recruiters; 30% of showcase traffic | Growth |
| **Engagement & Retention** | DAU/MAU; repeat reviewer rate; showcase quality improvement over time | DAU/MAU >25%; 40% reviewers are repeat | Analytics |

#### Secondary Objectives (Phase 1)
- Establish the platform as the credible home for AI hands-on proof
- Build network effects via peer review (reviewers → builders, builders → reviewers)
- Seed recruitment partnerships for Phase 2

---

### 3. Scope

#### IN SCOPE (Phase 1 MVP)
- **User onboarding** (builders & reviewers/recruiters)
- **Showcase creation** (text, code, links, media upload)
- **Showcase discovery** (browsing, search by skill/domain)
- **Peer review system** (structured, anonymous or attributed reviews)
- **User profiles** (credentials, work history, showcase history)
- **Basic moderation** (spam/abuse flagging)

#### OUT OF SCOPE (Phase 1)
- Live demo days / Twitch-style streaming (Phase 2)
- Recruiter messaging / direct hiring flow (Phase 2)
- AI-powered skill matching (Phase 2)
- Certification or badging system (Phase 3)
- Payment/subscription (Phase 3+)
- Analytics dashboard for builders (Phase 2)

#### DEFERRED (Post-MVP)
- Third-party integrations (GitHub, HuggingFace, etc.)
- Showcase collaboration features
- Community forums / discussions
- Mobile app

---

### 4. Stakeholder Map

| Stakeholder | Role | Key Needs | Success Criteria |
|---|---|---|---|
| **Builders** (primary) | Content creators; portfolio builders | Easy showcase; credible peer feedback; recruiter visibility | Post 2-3 projects; get 3+ reviews in 30 days |
| **Reviewers** (secondary) | Peer reviewers; engagement drivers | Clear review framework; recognition | Review 5+ showcases in Q1 |
| **Recruiters** (secondary, Phase 1 soft-launch) | Discovery; future hiring | Verify builder credibility; see hands-on AI work | Save 5+ builder profiles; contact 2+ |
| **Product Team** | Builds features; manages roadmap | Clear requirements; feedback loops | Hit 500 users; validate peer review engagement |
| **Safety/Ops** | Moderation; abuse prevention | Clear policies; scalable process | <0.5% flagged content; <24h response to reports |

---

### 5. Business Constraints & Assumptions

#### Constraints
- **No payment processing in MVP** — product must be freemium/free-tier only
- **Limited moderation budget** — must design for self-moderation where possible
- **Lean engineering team** — feature scope must be defensible with <5 engineers
- **6-month runway** — must show traction (500 users, peer review engagement) to justify continued investment

#### Assumptions (to validate)
- **Assumption 1:** Professionals will credibly showcase real work (not fluff); if they do, peers will spot it
  - *Validation:* Review samples manually; check for pattern of credibility over time
- **Assumption 2:** Peer review will drive more engagement than follower counts or upvotes
  - *Validation:* Track reviewer retention; compare to engagement on showcase (comment rate, saves)
- **Assumption 3:** Recruiters will find value in curated, peer-reviewed builders before platform hits 5K users
  - *Validation:* Recruit 20 advisors; get soft feedback on 10 sample profiles
- **Assumption 4:** Builders will return to review others' work (reciprocal engagement)
  - *Validation:* Track % of builders who both post AND review in first 3 months

---

### 6. Risk Register (Top 5)

| Risk | Severity | Likelihood | Mitigation | Trigger |
|---|---|---|---|---|
| **Low-quality submissions destroy credibility** — builders post shallow/AI-generated work, peers don't engage seriously | High | Medium | Onboarding checklist for builders; template scaffolding; manual QA on first 50 showcases; clear community guidelines | >20% showcases with <2 reviews; negative recruiter feedback in month 2 |
| **Review process takes too long** — builders submit but wait weeks for feedback, drop off | Medium | High | Set clear SLA (3 reviews within 7 days); gamify early reviewers; email builders at day 3 to re-engage | Avg time-to-first-review >7 days |
| **No recruiter traction** — platform stays "builder-to-builder" and never signals to hiring side | High | Medium | Proactive recruiter outreach (50 outreach emails); invite beta group of hiring managers; showcase 3-5 "hero" profiles to advisors | <10 recruiter signups by month 4 |
| **Reviewers are anonymous bullies or low-effort** — reviews are vague, mean-spirited, or drive builders away | Medium | Medium | Require structured review template (not free-form); option for attributed reviews; flag and remove hostile language; seed first reviews with advisors | >5% reviews reported as unhelpful/rude; builder NPS <30 |
| **Scaling moderation** — spam, self-promotion, duplicate accounts overwhelm small ops team | Medium | High | Require email verification + phone verification for showcases; allow community flags; auto-suspend on 2+ flags; weekly mod review | >50 flags in a week; >5% of submissions flagged |

---

---

## FUNCTIONAL REQUIREMENTS DOCUMENT (FRD)

### Feature 1: Showcase Creation & Publishing

**Feature Description:**  
Builders create a structured "Showcase" to demonstrate a real AI project or hands-on learning experience. A showcase is the atomic unit of credibility on the platform.

---

**User Story:**  
*As a career-switcher with 3 months of LLM experience, I want to create a showcase of a real project I built (e.g., a chatbot, RAG pipeline, fine-tuning experiment) so that recruiters and peers can see exactly what I've hands-on built, not just talk about it.*

---

**Acceptance Criteria:**

1. **Showcase creation form is intuitive and scaffolded**
   - Given a builder lands on `/create-showcase`
   - When they see the form
   - Then they see 5 required fields + 3 optional fields, with field-level guidance text
   - And form auto-saves drafts every 30 seconds
   - And a builder can return to edit a draft within 30 days

2. **Showcase captures the core signals of real hands-on work**
   - Given a builder fills the form
   - When they complete all required fields:
     - *Title* (what you built)
     - *Category* (select from: LLM Fine-tuning, RAG, Prompt Engineering, LLM API Integration, Data Prep, Evaluation/Evals, Other)
     - *Description* (300–1500 char; what problem did you solve, what was the approach)
     - *What You Learned* (150–500 char; key insight)
     - *Code/Demo Link* (GitHub URL, Hugging Face, Replit, or demo URL)
   - Then the form allows submission
   - And they see a success message with a preview of their published showcase

3. **Optional fields add richness without friction**
   - Given a builder on the form
   - When they choose to add optional fields:
     - *Outcome/Metrics* (e.g., "reduced latency from 5s to 1s", "accuracy 92%")
     - *Tools Used* (text; e.g., "OpenAI API, LangChain, PostgreSQL")
     - *Media* (up to 2 images or 1 short video <30MB; no auto-play)
   - Then the optional fields display prominently in the published showcase

4. **Showcase publishes and is immediately discoverable**
   - Given a builder clicks "Publish"
   - When the showcase is validated (all required fields filled, URL is valid)
   - Then it appears on their profile and in the Discover feed within 10 seconds
   - And the builder receives a confirmation email with a shareable link

5. **Categories & tags help with discovery and peer matching**
   - Given a published showcase
   - When peers browse the Discover feed
   - Then they can filter by Category
   - And each showcase displays 2–3 auto-tagged skills (derived from category + description)

---

**Edge Cases & Error States:**

| Case | Behavior |
|---|---|
| **Invalid Code Link** (404, broken GitHub link) | Show warning icon; allow publish but flag for first review; send builder email with debug steps |
| **Video upload too large (>30MB)** | Reject with clear message; suggest compression tool link |
| **Builder tries to publish duplicate showcase** | Warn ("Are you sure? We detected similar content from you last week") but allow |
| **Builder auto-saves draft but session expires** | Draft persists; re-login automatically restores draft with "last saved" timestamp |
| **Showcase title too short (<5 chars)** | Real-time validation: "Title must be at least 5 characters" |
| **Builder submits without code/demo link** | Reject; show error: "Code/Demo Link is required to verify hands-on work" |

---

**Dependencies:**
- Auth system (builders must be logged in)
- Storage service (file uploads for images/video)
- URL validation service (check GitHub, HF, Replit URLs are live)
- Email service (confirmation, review notifications)
- Moderation queue (first 50 showcases reviewed by team; flagged ones held)

---

**Non-Functional Requirements:**

| Requirement | Standard |
|---|---|
| **Form load time** | <1s on 4G |
| **Draft auto-save latency** | <2s per save |
| **Publish latency** | <3s (shows spinner) |
| **Image compression** | Auto-resize to 1200px wide, <200KB |
| **Accessibility** | WCAG 2.1 AA; form labels linked to inputs; error messages screen-reader friendly |
| **XSS Prevention** | Sanitize all text inputs; no raw HTML in Description |
| **Spam Prevention** | Rate limit: max 5 showcases/day per builder; IP-based cooldown for rapid deletes |

---

---

### Feature 2: Showcase Discovery & Browsing

**Feature Description:**  
Peers and recruiters discover showcases via browsing, filtering, and search. The feed prioritizes quality (peer-reviewed) and relevance.

---

**User Story:**  
*As a recruiter looking to hire an AI engineer, I want to browse curated showcases filtered by skill (e.g., "RAG") and see how many peer reviews they have, so I can quickly identify credible builders.*

---

**Acceptance Criteria:**

1. **Discover feed shows all published showcases with key signals**
   - Given a user (logged in or anon) lands on `/discover`
   - When the page loads
   - Then they see a feed of showcases sorted by *Recent* (default)
   - And each card displays:
     - Showcase title, builder avatar & name, category badge
     - 1-sentence description (truncated)
     - # of peer reviews + avg rating (if 2+ reviews)
     - 1-2 key tools/tags
     - Time posted (e.g., "2 days ago")
   - And pagination loads 12 cards per page

2. **Filter by category**
   - Given a user on the Discover page
   - When they click the "Category" filter
   - Then they see a dropdown with all 6 categories (LLM Fine-tuning, RAG, Prompt Engineering, etc.)
   - And selecting one filters the feed in <1s
   - And they can clear the filter with an "X" button

3. **Search by keyword**
   - Given a user on Discover
   - When they type in the search box (top of feed)
   - Then as they type, autocomplete suggests matching showcase titles, builder names, and tools
   - And pressing Enter searches across title + description + tools
   - And results show up in <2s
   - And empty results show "No showcases match. Try different keywords or browse by category."

4. **Sort options**
   - Given a user on Discover
   - When they click the "Sort" dropdown
   - Then they can choose:
     - *Recent* (default; newest first)
     - *Most Reviewed* (most peer reviews; tiebreak by avg rating)
     - *Highest Rated* (avg review rating; min 2 reviews to be eligible)
   - And feed re-sorts in <1s

5. **Showcase card links to detail page**
   - Given a user on the feed
   - When they click a showcase card
   - Then they're taken to `/showcase/[id]` which shows:
     - Full title, builder profile (clickable), category
     - Full description, what they learned, outcome/metrics
     - Code/demo link (clickable)
     - 1-2 media (images or video)
     - Tools used (as tags)
     - Peer reviews section (see Feature 3)

---

**Edge Cases & Error States:**

| Case | Behavior |
|---|---|
| **No showcases published yet** | Show empty state: "No showcases yet. Be the first to build and share!" with CTA to create |
| **Filter returns 0 results** | Show "No showcases in this category. Try another or browse all." |
| **Search has typo** | Show "No matches. Did you mean…?" (simple spell-check) |
| **Builder deletes showcase while user viewing detail page** | Show error: "This showcase is no longer available." with link back to Discover |
| **Code link is now dead (404)** | Show warning badge on card & detail page: "Code/demo link currently unavailable"; include builder contact option |

---

**Dependencies:**
- Showcase data model (queryable by category, timestamp, rating)
- Search service (Algolia or Postgres full-text search)
- Auth system (for some features, e.g., save to wishlist in Phase 2)
- Cache layer (Discover feed should be cached and updated every 5 min)

---

**Non-Functional Requirements:**

| Requirement | Standard |
|---|---|
| **Feed load time** | <2s (first 12 cards); lazy-load additional pages |
| **Search latency** | <500ms from keystroke to results |
| **Filter latency** | <1s |
| **Responsive design** | Mobile-first; card layout adjusts for mobile, tablet, desktop |
| **Accessibility** | Keyboard navigation (arrow keys to browse feed); ARIA labels for sort/filter dropdowns |
| **SEO** | Showcase detail pages are crawlable; meta tags for title, description |

---

---

### Feature 3: Peer Review System

**Feature Description:**  
Structured peer review is the credibility moat. Reviewers (other builders, recruiters, advisors) provide constructive feedback on showcases, which signals quality to other recruiters. Reviews are optional-attribution (reviewer can be named or anonymous).

---

**User Story:**  
*As an experienced AI engineer, I want to review a peer's showcase—giving specific feedback on their approach and code—so they improve and