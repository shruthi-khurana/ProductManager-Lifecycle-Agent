# Sage — PM Lifecycle Agent

A React web app that walks you through the full product management lifecycle using the Anthropic Claude API. Built with a human-in-the-loop architecture — Sage drafts, you decide.

## Live Demo
[Deploy your own on Vercel →]

## Features
- 7-stage PM workflow: Discovery → Roadmap → BRD/FRD → UX → UAT → Production → GTM
- Sage persona — conversational, structured AI PM partner
- Human-in-the-loop checkpoints: Approve, Edit, or Regenerate at every stage
- Persistent memory via localStorage — Sage remembers past sessions
- Download individual artifacts or full bundle as markdown
- Purple brand identity, DM Serif Display typography

## Stack
- React 18
- Anthropic Claude API (claude-haiku-4-5 by default, swap to sonnet in sageApi.js)
- react-markdown + remark-gfm for artifact rendering
- localStorage for persistent memory
- Deployable to Vercel in one click

## Setup

```bash
git clone https://github.com/yourusername/sage-pm-agent
cd sage-pm-agent
npm install
npm start
```

Enter your Anthropic API key on the splash screen. Your key is stored only in your browser session.

## Deploy to Vercel

1. Push to GitHub
2. Go to vercel.com → New Project → Import repo
3. Deploy (no environment variables needed — key is entered at runtime)

## Switching models

In `src/sageApi.js`, change:
```js
model: 'claude-haiku-4-5-20251001'  // fast, cheap (~$0.03/run)
// to:
model: 'claude-sonnet-4-6'          // richer outputs (~$0.30/run)
```

## Built by
Shruthi Khurana — MSBA candidate at UC Davis, former PM at Citi and Axis Bank.

*AI should augment PM judgment, not replace it.*
