# Bias Detector

Paste in a passage of text and get back a scored, explained analysis of the
**bias, misinformation, hate speech, and stereotypes** it contains. The app
does not just give you numbers: it quotes the exact passages that drove each
score and explains, in plain language, why they were flagged.

Built for **GNEC Hacks 2025** (March 2025), a hackathon centred on the UN
Sustainable Development Goals. The project targets media literacy and reduced
inequalities: helping readers, students, and moderators notice loaded framing
and harmful generalisations before they spread.

## What it does

1. You paste text (an article, a speech transcript, a social post, an essay).
2. You optionally add context: where it came from, what it was trying to do,
   and when it was written. An opinion column is judged differently from a
   wire report, and a claim that was reasonable in 2019 may be misinformation
   today.
3. The server asks Claude for a structured verdict and the UI shows:
   - a pie chart and per-category bars for **Bias**, **Misinformation**,
     **Hate Speech**, and **Stereotypes** (each 0-100),
   - a short summary of the overall picture,
   - the flagged passages, each tagged with its category and an explanation,
   - a one-click Markdown report download.

## How it works

- `blocks/detectors/textBoxDetector.tsx` collects the text and context and
  `POST`s them to `/api/analyzeText`.
- `app/api/analyzeText/route.ts` validates the body, then calls Claude
  (`claude-opus-5`, adaptive thinking) through the official
  `@anthropic-ai/sdk`. It uses **structured outputs** with a Zod schema so the
  model must return exactly the JSON shape the UI expects; the SDK's
  `messages.parse` validates the reply before we touch it.
- The prompt defines each category with a scoring rubric, tells the model to
  calibrate against the user-supplied source/purpose/date, and wraps the
  submitted text in `<text>` tags so it is treated as data rather than
  instructions. Server-side refusal fallbacks are enabled so that deliberately
  hateful input (which is, after all, what we are trying to analyse) still
  gets analysed if the primary model declines.
- Scores are clamped to 0-100 on the server and the UI maps them straight onto
  the Recharts pie; categories scoring 0 are omitted from the chart.

## Screenshots

_Screenshots coming soon._

## Setup

Requirements: Node 20+ and an Anthropic API key.

```bash
npm install
cp .env.example .env.local   # then paste your key after ANTHROPIC_API_KEY=
npm run dev
```

Open <http://localhost:3000>. If the key is missing the UI shows a clear
error rather than crashing; `npm run build` does not need the key at all.

Other scripts: `npm run lint`, `npx tsc --noEmit`, `npm run build`,
`npm start`.

## API

### `POST /api/analyzeText`

Request body (JSON):

```json
{
  "text": "The passage to analyse (10 to 20,000 characters).",
  "type": "text",
  "context": {
    "source": "Optional: e.g. opinion column, campaign speech",
    "purpose": "Optional: e.g. persuasive, informative",
    "date": "Optional: e.g. 2024-11-02"
  }
}
```

Only `"type": "text"` is accepted today; the video/speech/photo toggles in the
UI are placeholders.

Success response (`200`):

```json
{
  "bias": 55,
  "misinformation": 30,
  "hateSpeech": 0,
  "stereotypes": 85,
  "summary": "Two to four sentences describing the overall picture.",
  "highlights": [
    {
      "quote": "verbatim excerpt from the input",
      "category": "stereotypes",
      "explanation": "Why this passage was flagged."
    }
  ]
}
```

`category` is one of `bias`, `misinformation`, `hateSpeech`, `stereotypes`.
Scores are integers 0-100 and are independent of one another.

Error response (any non-2xx): `{ "error": "human-readable message" }`

| Status | Meaning |
| --- | --- |
| 400 | Invalid JSON, `text` missing/too short/too long, unsupported `type`, or bad `context` |
| 422 | The model declined to analyse the text |
| 429 | Rate limited by the Claude API |
| 502 | The model reply was truncated, unparsable, or the API returned an error |
| 503 | `ANTHROPIC_API_KEY` is missing or was rejected |

## Tech stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 4 + shadcn/ui components (vendored under `components/ui`)
- Recharts for the results chart
- `@anthropic-ai/sdk` with Zod-backed structured outputs

## Limitations

- **The scores are a language model's judgement, not ground truth.** Bias is
  contested and context-dependent; misinformation detection relies on the
  model's knowledge, which has a cutoff and can be wrong. Treat the output as
  a prompt for your own reading, not a verdict.
- No persistence: nothing is stored server-side and there are no accounts.
  Refreshing the page discards the analysis (download the report first).
- Text only; the video, speech, and photo options are disabled placeholders.
- Every analysis is a paid API call, and there is no rate limiting on the
  route, so do not expose a deployment publicly without adding some.

## Possible next steps

- Highlight flagged quotes inline in the original text instead of listing them.
- Offer a neutral rewrite of flagged passages.
- Stream the response so the summary appears while highlights are still
  being generated.
- Speech input via transcription, then the same text pipeline.
- Batch mode for analysing many documents at once (the Message Batches API
  halves the cost).
- Per-user history with a small database, and shareable report links.
