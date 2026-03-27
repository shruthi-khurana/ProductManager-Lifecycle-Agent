const SAGE_PERSONA = `You are Sage, a calm and structured AI product management partner.

Your personality:
- Conversational and warm — you feel like a smart colleague, not a tool
- Structured — you never skip steps or rush past important details
- Honest — you flag risks and gaps clearly, without being alarmist
- Collaborative — you think out loud and invite the PM to weigh in
- Occasionally use phrases like "Let's think through this carefully", "One thing worth flagging here", "Before we move on", "This is the part where most teams rush"

Always output clean, well-structured markdown. Lead with your thinking, then the artifact.`;

const STAGE_PROMPTS = {
  discovery: {
    system: `You are Sage conducting product discovery. Be thorough but conversational. Output clean markdown.`,
    user: (problem, memory) => `Problem Statement: ${problem}
${memory ? `\nContext from past sessions: ${memory}` : ''}

Conduct thorough product discovery. Produce:

## 1. Market Context
- Market size estimate (TAM/SAM/SOM)
- Key trends driving this problem
- 3–5 competitive solutions and their gaps

## 2. User Personas
Create 2–3 distinct personas. For each:
- Name, role, context
- Top 3 pain points
- Jobs-to-be-done
- Current workarounds

## 3. Problem Framing
- Refined problem statement ("How might we...")
- Root cause analysis (5 Whys)
- Key assumptions to validate

## 4. Opportunity Statement
One crisp paragraph: what is the opportunity, for whom, and what would success look like?`
  },
  roadmap: {
    system: `You are Sage building a product roadmap. Be opinionated — make real tradeoff decisions. Output markdown with tables.`,
    user: (problem, discovery) => `Problem: ${problem}

Discovery:
${discovery}

Build a prioritized roadmap:

## 1. Feature Ideation
Generate 10–12 potential features.

## 2. RICE Prioritization
Score each: Reach × Impact × Confidence / Effort. Present as a markdown table sorted by score.

## 3. MoSCoW Classification
Must Have / Should Have / Could Have / Won't Have (v1)

## 4. Phased Roadmap
- Phase 1 (MVP 0–3 months)
- Phase 2 (Growth 3–6 months)
- Phase 3 (Scale 6–12 months)

## 5. Key Tradeoffs
What are you explicitly NOT building in v1 and why?`
  },
  brd: {
    system: `You are Sage writing formal product requirements. Be precise and engineer-ready. Output clean markdown.`,
    user: (problem, roadmap) => `Problem: ${problem}

Roadmap:
${roadmap}

Generate BRD and FRD for Phase 1 MVP:

## BUSINESS REQUIREMENTS DOCUMENT

### 1. Executive Summary
### 2. Business Objectives & Success Metrics
### 3. Scope (In / Out of Scope)
### 4. Stakeholder Map
### 5. Business Constraints & Assumptions
### 6. Risk Register (top 5 with mitigation)

---

## FUNCTIONAL REQUIREMENTS DOCUMENT

For each Phase 1 feature:

### Feature: [Name]
**User Story:** As a [persona], I want to [action] so that [outcome].
**Acceptance Criteria:** Given/When/Then format
**Edge Cases & Error States:**
**Dependencies:**
**Non-Functional Requirements:**`
  },
  ux: {
    system: `You are Sage creating a design brief. Think in flows and user journeys. Output clean markdown.`,
    user: (brd) => `Requirements:
${brd}

Create UI/UX design brief:

## 1. Design Principles
3–5 guiding principles.

## 2. User Flows
For each key feature: entry point, step-by-step journey, success state, error states.

## 3. Screen Inventory
List every screen needed with purpose, key components, and navigation.

## 4. Wireframe Descriptions
For each critical screen: layout, header/nav, primary content, CTAs, mobile vs desktop.

## 5. Accessibility Requirements
WCAG 2.1 AA compliance notes.

## 6. Open Design Questions`
  },
  uat: {
    system: `You are Sage building a UAT plan. Be exhaustive — think adversarially about what can break. Output markdown with tables.`,
    user: (brd, ux) => `BRD/FRD:
${brd}

UX Flows:
${ux}

Build comprehensive UAT plan:

## 1. UAT Strategy
Objectives, entry/exit criteria, roles, environment requirements.

## 2. Test Case Matrix
| Test ID | Feature | Scenario | Steps | Expected Result | Pass/Fail |
Cover: happy path, alternate paths, edge cases, error states, performance, security.
Minimum 20 test cases.

## 3. Regression Checklist

## 4. Bug Triage Framework
Severity definitions, resolution SLAs, go/no-go criteria.

## 5. UAT Sign-Off Template`
  },
  prod: {
    system: `You are Sage leading a production launch. Think in risk, rollback, and operational stability. Output clean markdown.`,
    user: (problem, uat) => `Product: ${problem}

UAT Results:
${uat}

Build production readiness plan:

## 1. Production Readiness Checklist
Categories: Engineering, Data & Security, Compliance & Legal, Operations, Monitoring, Communication.

## 2. Go / No-Go Decision Framework
Table with criteria, owner, and status columns.

## 3. Rollback Plan
Trigger conditions, step-by-step procedure, data integrity, communication plan.

## 4. Launch Day Runbook
Hour-by-hour plan with owners and checkpoints.

## 5. Post-Launch Monitoring Plan
Key metrics for 24h / 7 days / 30 days, alert thresholds, feedback collection.`
  },
  gtm: {
    system: `You are Sage planning a GTM strategy. Think in segments, positioning, channels, and metrics. Output clean markdown.`,
    user: (problem, discovery, roadmap) => `Problem: ${problem}

Discovery:
${discovery}

Roadmap:
${roadmap}

Build comprehensive GTM plan:

## 1. Target Segment & ICP
Ideal Customer Profile, segment sizing, early adopter profile.

## 2. Positioning & Messaging
Positioning statement, value propositions per persona, objection handling.

## 3. Channel Strategy
Primary/secondary channels, rationale, content ideas per channel.

## 4. Launch Timeline
Pre-launch (T-4 to T-1 week), launch week, post-launch (30/60/90 day plan).

## 5. Pricing & Packaging
Model options with pros/cons, recommendation with rationale.

## 6. Success Metrics & OKRs
North Star Metric, OKRs for first 90 days, leading vs lagging indicators.

## 7. Internal Comms Plan`
  }
};

const CHECKPOINT_REACTIONS = {
  discovery: "discovery and ideation",
  roadmap: "roadmap and prioritization",
  brd: "BRD and FRD requirements",
  ux: "UI/UX design brief",
  uat: "UAT plan and test cases",
  prod: "production readiness plan",
  gtm: "GTM strategy"
};

export async function callClaude(systemPrompt, userPrompt, apiKey) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      system: SAGE_PERSONA + '\n\n' + systemPrompt,
      messages: [{ role: 'user', content: userPrompt }]
    })
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(err.error?.message || 'API call failed');
  }

  const data = await response.json();
  return data.content[0].text;
}

export async function runStage(stageName, context, apiKey) {
  const p = STAGE_PROMPTS[stageName];
  let userPrompt;

  switch (stageName) {
    case 'discovery':
      userPrompt = p.user(context.problem, context.memory);
      break;
    case 'roadmap':
      userPrompt = p.user(context.problem, context.discovery);
      break;
    case 'brd':
      userPrompt = p.user(context.problem, context.roadmap);
      break;
    case 'ux':
      userPrompt = p.user(context.brd);
      break;
    case 'uat':
      userPrompt = p.user(context.brd, context.ux);
      break;
    case 'prod':
      userPrompt = p.user(context.problem, context.uat);
      break;
    case 'gtm':
      userPrompt = p.user(context.problem, context.discovery, context.roadmap);
      break;
    default:
      throw new Error('Unknown stage: ' + stageName);
  }

  return callClaude(p.system, userPrompt, apiKey);
}

export async function getSageReaction(stageName, output, apiKey) {
  const stageLabel = CHECKPOINT_REACTIONS[stageName] || stageName;
  const prompt = `You just produced the following ${stageLabel} output for a product.
In 2-3 sentences as Sage, give a brief collegial reaction: what looks strong, and one specific thing the PM should pay close attention to before approving.
Be conversational. No bullet points. Talk directly to the PM.

Output (first 1500 chars):
${output.slice(0, 1500)}`;

  return callClaude('', prompt, apiKey);
}

export async function getSageSpokenLine(reaction, apiKey) {
  const prompt = `You are Sage, a PM partner. Summarize this checkpoint reaction into ONE punchy spoken sentence of maximum 15 words. 
No filler words. Direct, sharp, memorable. Something you'd say out loud to a colleague.

Reaction: ${reaction}

Respond with only the single sentence, nothing else.`;

  return callClaude('', prompt, apiKey);
}

export async function getSummary(context, apiKey) {
  const prompt = `Problem: ${context.problem}

Summarize the full product lifecycle output in an executive brief:
1. The problem and opportunity (2–3 sentences)
2. What we're building — Phase 1 MVP (3–5 bullet points)
3. Key product decisions and tradeoffs made
4. Launch readiness status
5. North Star Metric and 90-day OKRs
6. Recommended next steps`;

  return callClaude('You are Sage writing a crisp executive summary. One page maximum.', prompt, apiKey);
}

export const STAGES = [
  { key: 'discovery', label: 'Discovery', icon: '🔍', intro: "Before we dive in — discovery is the stage most teams rush. We're going to slow down here and really understand the problem. Trust the process." },
  { key: 'roadmap', label: 'Roadmap', icon: '🗺️', intro: "Now that we know the problem, let's get opinionated about what to build. A roadmap without tradeoffs isn't a roadmap — it's a wishlist." },
  { key: 'brd', label: 'BRD / FRD', icon: '📋', intro: "This is where vague ideas become real commitments. Every requirement we write here is a promise to engineering. Let's be precise." },
  { key: 'ux', label: 'UI/UX', icon: '🎨', intro: "We're not designing screens — we're designing decisions. I'll map every flow so your designer can start without needing a single meeting." },
  { key: 'uat', label: 'UAT', icon: '🧪', intro: "This is the stage where most launches go wrong. We're going to be exhaustive — happy paths, edge cases, failure states. All of it." },
  { key: 'prod', label: 'Production', icon: '🚀', intro: "You've built it. Now let's make sure you can ship it safely. A launch without a rollback plan isn't a launch — it's a gamble." },
  { key: 'gtm', label: 'GTM', icon: '📣', intro: "The product is ready. Now let's make sure the right people know about it, in the right way, at the right time." }
];
