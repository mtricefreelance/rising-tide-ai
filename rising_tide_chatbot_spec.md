# Rising Tide AI — Website Chatbot Spec
**Rising Tide AI LLC** | Created: May 2026

---

## What It Is

A lead qualification and routing chatbot embedded on risingtideai.ai. Powered by the Claude API (Sonnet model). Its one job: have a smart, brief conversation that ends with the right visitor booking a discovery call or an AI Clarity Session.

This chatbot is also a live demo of what Rising Tide AI sells. A VP Finance lands on the site, talks to a smart, scoped AI that knows FP&A, and thinks — "I want this in my workflow." You're not describing the methodology. You're showing it.

---

## Architecture Decisions (Locked)

### Decision 1 — Where the API Call Lives: Netlify Serverless Function

The chatbot calls the Anthropic API through a Netlify serverless function, not directly from the React frontend.

**Why not call the API directly from React?**
Calling the API from the browser would expose your `ANTHROPIC_API_KEY` in client-side code. Anyone who opens DevTools on your site could find it and use it at your expense. For a demo or internal tool that's an acceptable tradeoff — for a client-facing production site, it's not.

**Why a Netlify serverless function?**
Your site is already hosted on Netlify. Serverless functions are a built-in Netlify feature — no separate server, no separate hosting cost, no infrastructure to manage. You write one file (`netlify/functions/chat.js`), Netlify runs it on-demand when the chatbot makes a request. The API key lives in Netlify's environment variables, never in your code or the browser.

**How it works:**
```
Visitor types a message
        ↓
ChatWidget.jsx (React) — sends message to /api/chat
        ↓
netlify/functions/chat.js — receives message, adds system prompt, calls Anthropic API
        ↓
Anthropic API — returns Claude's response
        ↓
Netlify function — passes response back to React
        ↓
ChatWidget.jsx — displays response to visitor
```

**The file that makes this work:**
```
netlify/
  functions/
    chat.js     ← one file, ~40 lines, handles everything
```

`ANTHROPIC_API_KEY` is set in Netlify dashboard under Site Settings → Environment Variables. Never in code. Never committed to GitHub.

---

### Decision 2 — Styling: Tailwind CSS v4, Matched to Existing Site

The chatbot uses the same Tailwind CSS v4 setup already in the project. No separate stylesheet. Claude Code should pull color tokens and typography directly from the existing `src/index.css` — do not hardcode any colors.

**Specific instruction for Claude Code:**
> Read `src/index.css` first. Use the existing CSS custom properties (color tokens, font stack) for the chat widget. The widget should look like it was designed at the same time as the rest of the site — not dropped in from a different project.

**Widget visual spec:**
- Floating button: bottom-right corner, matches primary CTA button style from the site
- Chat panel: clean, minimal — white/light background, matches site card/panel styling
- Typography: same font family as the rest of the site
- Message bubbles: user messages right-aligned, assistant messages left-aligned
- "Book a call →" links rendered as styled buttons, not plain URLs
- Loading indicator: simple animated dots while waiting for API response

---

## System Prompt

*Stored in `src/constants.js`. Interpolate `CALENDLY_URL` at runtime before sending to the API.*

```
You are the AI assistant for Rising Tide AI LLC, a financial systems automation consultancy run by Michael Trice.

YOUR ROLE:
You help visitors understand what Rising Tide AI does, figure out if it's a fit for them, and get them to the right next step. You are not a general-purpose assistant. Stay focused on this purpose.

ABOUT RISING TIDE AI:
- Builds and deploys custom financial intelligence systems and AI-powered workflows directly into client environments
- Code lives on the client's infrastructure — Rising Tide never touches client data
- One-man operation by design — the AI-augmented build methodology IS the product
- Proven at two organizations: a recruiting firm (full AI pipeline built in 2 days) and a scaling media company (FP&A platform live across 7 departments, tracking $100M+ ARR)

SERVICES:
1. AI Clarity Session — $750 fixed. 90-minute working session. Output: written 90-day roadmap, top 3 AI opportunities ranked by impact and feasibility, honest DIY vs. build assessment. Best for founders and operators who need a gameplan.
2. Custom Build — $3,000–$5,000 upfront, scoped 60-90 days. For finance leaders who know what's broken and want it fixed. Leads to a monthly retainer.
3. Monthly Retainer — $1,500–$2,000/month. Maintenance, new features, ongoing advisory.
4. SaaS Audit — "Show me your stack and I'll find where you're overpaying and underserved." Entry point for SMB operators.

THE RIGHT CLIENT:
- VP Finance, Controller, or CFO at a company doing $10M–$100M in revenue (SaaS or services)
- OR a founder/operator at a $1M–$10M business who sees AI as leverage, not magic
- Intellectually curious, wants to understand the system, eager to collaborate
- $750 is not a stretch for them — that's a signal they have real budget

WHO THIS IS NOT FOR:
- Anyone who wants a vendor relationship only
- Anyone for whom $750 feels like a big commitment

CONVERSATION RULES:
- Be direct, warm, and confident. Not salesy. Not overly formal.
- Ask ONE question at a time. Don't overwhelm.
- Keep responses concise — 2-4 sentences max unless they ask something detailed.
- Never mention the name of any specific company Michael has worked for. Use proof points only: "$100M+ ARR", "7 departments", "2-day build".
- Never make up capabilities, pricing, or timelines. If unsure, say "that's a great question for the discovery call."
- Never discuss topics unrelated to Rising Tide AI's services or the visitor's business needs.
- If someone seems like a great fit, drive toward booking. Use this Calendly link: [CALENDLY_URL]
- If someone is clearly not a fit, be honest and kind about it.

ROUTING LOGIC:
- Scaling company, knows what's broken → Custom Build path → book discovery call
- Founder/operator, needs a gameplan → AI Clarity Session → book that session
- Paying for SaaS tools that don't quite fit → SaaS Audit conversation → book discovery call
- Just browsing / not sure → qualify gently with 1-2 questions, then route

NEVER DO:
- Never claim Michael works for any specific named company
- Never discuss pricing outside of what's listed above
- Never promise specific outcomes or timelines
- Never collect sensitive personal or financial information
- Never go off-topic
```

---

## Conversation Flow

Three entry points a visitor will likely come in through:

**"What do you do?"**
Short answer on the methodology + one qualifying question: *"Are you dealing more with reporting that's too slow, or workflows that are still manual?"*

**"How much does it cost?"**
Give the three tiers cleanly, then ask which situation fits them best to route correctly.

**"Is this right for my business?"**
Ask company size and biggest current pain. Route from there.

All paths end the same way — either a Calendly link for the discovery call, or a clear *"the AI Clarity Session is your starting point"* with the $750 framing.

---

## File Structure

```
rising-tide-ai/
  netlify/
    functions/
      chat.js                 ← NEW: serverless function, API proxy
  src/
    components/
      ChatWidget.jsx          ← NEW: floating chat UI component
    constants.js              ← UPDATE: add CHATBOT_SYSTEM_PROMPT
  .env                        ← never committed — local dev only
```

**Netlify environment variables to set (in Netlify dashboard):**
- `ANTHROPIC_API_KEY` — your Anthropic API key

**Local `.env` for development:**
```
ANTHROPIC_API_KEY=your_key_here
```

---

## React Component Spec (ChatWidget.jsx)

### State
```javascript
const [isOpen, setIsOpen] = useState(false);
const [messages, setMessages] = useState([]);  // { role: 'user' | 'assistant', content: string }
const [inputValue, setInputValue] = useState('');
const [isLoading, setIsLoading] = useState(false);
```

### Opening Message (Hardcoded — No API Call)
```
Hi — I'm the Rising Tide AI assistant.
Are you here to learn more about what we build, or do you have a specific problem you're trying to solve?
```
Hardcoded as the initial assistant message on widget open. No API call needed. Saves cost, loads instantly, sets the right tone.

### API Call (to Netlify function, not Anthropic directly)
```javascript
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ messages: conversationHistory })
});
```

### UX Requirements
- Typing indicator (animated dots) while awaiting response
- Input disabled while loading
- Auto-scroll to latest message on each new response
- Calendly URLs rendered as styled `<a>` buttons, not plain text
- Error fallback message: *"Something went wrong — you can reach Mike directly at mike@risingtideai.ai"*
- Mobile: full-screen overlay when open
- Desktop: ~360px wide fixed panel, bottom-right

---

## Netlify Function Spec (chat.js)

```javascript
// netlify/functions/chat.js
const Anthropic = require('@anthropic-ai/sdk');
const { CHATBOT_SYSTEM_PROMPT } = require('../../src/constants');

exports.handler = async (event) => {
  const { messages } = JSON.parse(event.body);

  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

  const response = await client.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 300,
    system: CHATBOT_SYSTEM_PROMPT,
    messages
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ content: response.content[0].text })
  };
};
```

---

## constants.js Additions

```javascript
export const CALENDLY_URL = "https://calendly.com/[YOUR_LINK]"; // update when Calendly is set up

export const CHATBOT_SYSTEM_PROMPT = `[paste full system prompt here]
...
If someone seems like a great fit, drive toward booking. Use this Calendly link: ${CALENDLY_URL}
...`;
```

---

## Cost Estimate

| Monthly Conversations | Avg Tokens/Chat | Est. Monthly API Cost |
|---|---|---|
| 50 | ~500 | ~$0.50 |
| 100 | ~500 | ~$1.00 |
| 500 | ~500 | ~$5.00 |

At `max_tokens: 300` with Sonnet pricing, API cost is negligible at any realistic traffic volume for a new consultancy site.

---

## Build Timing

**Do not build this before:**
1. The MVP demo is complete
2. You've had your first 3–5 discovery calls

You will learn what visitors actually ask in those early conversations. That real-world input makes the system prompt dramatically better. Building it now means building it blind — and then rebuilding it anyway.

**The right sequence:** Site live → MVP demo done → First clients → Chatbot v1

---

## What This Demonstrates

This chatbot is not just a lead tool. It is a second proof point of the methodology. When a VP Finance visits the site and has a sharp, scoped conversation with an AI that speaks their language — that is the pitch, not just a feature of the pitch. Build it well and let it do that work.

---

*Rising Tide AI LLC | risingtideai.ai | Chatbot Spec v1 — May 2026*
