---
name: create-a-cover-letter-and-tailored-resume-for-job-description
description: >
  Generates a tailored cover letter and resume for a specific job posting.
  Use whenever you provide a job description and want application documents created.
  Resume is loaded automatically from resume-snapshot.md.
  Job description may be provided as a file, pasted text, or URL.
  Output as DOCX files only.
---

# Cover Letter & Tailored Resume Generator

Creates tailored cover letter + ATS-optimized resume as DOCX files.
Uses pre-built JS scaffold templates — fill variables, do not rewrite structure.

> **Templates** (read before writing any code): `cover-letter-template.js` · `resume-template.js`
> **Cert status + differentiators**: `profile-facts.md` — load before filling cert fields

---

## Step 0 — Gather Inputs
- **Job description**: file, pasted text, or URL (`web_fetch` if URL). Ask if missing.
- **Resume**: load `resume-snapshot.md`. Do NOT ask user to upload.
- **Profile facts**: load `profile-facts.md` for cert status and differentiators.

## Step 1 — Analyze the JD
Extract and keep in working memory: job title + company · **5–8 ATS keywords** (copy JD
wording exactly) · 3–5 nice-to-haves · tone (startup vs enterprise) · key responsibilities ·
must-haves/disqualifiers.

## Step 2 — Extract Contact Info
Use values exactly as written in `resume-snapshot.md`. Do not paraphrase, reformat, or infer.

## Step 3 — Plan Content

**Resume:** Summary (2 lines, exact role + 2–3 ATS keywords) · Skills (ATS keywords first,
remove irrelevant categories) · Experience bullets (reorder/reword by JD relevance) ·
Cert status: use values from `profile-facts.md`.

**Cover letter:** Hook (strongest match to top JD requirement, NOT "I am writing…") ·
WHAT I BRING (4–6 items: ATS keyword → evidence, max 2 lines each) ·
TWO HIGHLIGHTS (2 most relevant employers + concrete detail) ·
Closing (company/role interest + direct CTA) ·
Tone: enterprise = formal, startup = direct.

## Step 4 — Generate DOCX

```bash
node -e "require('docx')" 2>/dev/null || npm install -g docx 2>/dev/null || npm install --prefix /home/user docx
```

1. Copy `cover-letter-template.js` → working directory
2. Copy `resume-template.js` → working directory
3. Fill all `// FILL:` sections. Do not alter spacing, margins, or helpers.
4. Set cert status from `profile-facts.md`.
5. Run: `node cover-letter.js && node resume.js`

**ATS rules (non-negotiable):**
- No tables · no columns · no text boxes · no headers/footers · no graphics
- Standard section headings · en dash prefix (–) · no Unicode in bullet body
- No color · consistent font throughout · resume ≤ 2 pages · cover letter = 1 page

## Step 5 — Validate and Present

Fix any generation errors before presenting.

Naming convention:
- `[YourName]_CoverLetter_CompanyName.docx`
- `[YourName]_Resume_CompanyName.docx`

Inline summary after delivery: ATS keywords incorporated · gaps excluded · assumptions made.

---

## Why DOCX, Not PDF?

ATS systems parse DOCX more reliably than PDF. Many ATS platforms convert PDF to text
before parsing, which can scramble formatting. A clean, ATS-safe DOCX file is the
correct format for job applications unless the posting explicitly requests PDF.

The templates enforce ATS safety structurally — the constraints are in the scaffold,
not dependent on the content being filled in correctly.

---

## Template Fill Pattern

Both templates use `// FILL:` comments to mark every variable that needs to be replaced.
The pattern is intentional: it makes it easy to audit what was changed and catch any
missed substitutions before running the script.

Non-fill sections (helpers, spacing constants, document structure) are marked
`// DO NOT EDIT BELOW` and should never be modified. All formatting decisions are
encoded there — changing them breaks the consistent output the system depends on.
