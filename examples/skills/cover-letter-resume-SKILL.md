---
name: create-a-cover-letter-and-tailored-resume-for-job-description
description: >
  Generates a tailored cover letter and resume for a specific job posting.
  Use whenever you provide a job description and want application documents created.
  Resume is loaded automatically from resume-snapshot.md. Job description may be
  provided as a file, pasted text, or URL. Output as DOCX files only.
---

# Cover Letter & Tailored Resume Generator

Creates a tailored cover letter and ATS-optimized resume as DOCX files using
docx.js (Node). Uses pre-built JS scaffold templates — fill variables, do not
rewrite structure.

> **Templates** (read before writing any code): `cover-letter-template.js` · `resume-template.js`
> **Cert status + differentiators**: `profile-facts.md` — load before filling cert fields

---

## Step 0 — Gather Inputs

Confirm you have both before proceeding:

1. **Job description** — file, pasted text, or URL. If a URL, fetch with `web_fetch`.
2. **Resume** — load `resume-snapshot.md` automatically. Do NOT ask the user to upload.

If the job description is missing, ask before doing anything else.

---

## Step 1 — Analyze the Job Description

Extract and keep in working memory — these drive every tailoring decision:

- **Job title** and **company name**
- **ATS keywords** — the 5–8 exact skill/technology phrases the ATS will scan for
  (copy exact wording from the JD)
- **Nice-to-haves** — 3–5 preferred qualifications
- **Tone** — startup/casual vs. enterprise/formal (inferred from JD language)
- **Key responsibilities** — what this person will actually do day-to-day
- **Must-haves / red flags** — anything that could disqualify

---

## Step 2 — Analyze resume-snapshot.md

Extract and note:

- **Contact info**: name, email, phone, LinkedIn URL, GitHub URL, learning platform URLs
- **Work experience**: for each job — company, title, date range, bullet points
- **Skills**: current categorized skill list
- **Education** and **Certifications**

---

## Step 3 — Draft All Content as Text First (no code yet)

Draft the full text of both documents before writing any code. This separates
content decisions from formatting work.

### 3a — Resume Content

**Certifications section** — format as follows (plain text, no hyperlinks, ATS-safe):
```
– [Cert 1 Name] — [Status]
– [Cert 2 Name] — [Status]
– [Learning Platform]: [profile URL] — [N] courses, [N] labs completed across [areas]
– [Learning Platform 2]: [transcript URL]
```
- Pull URLs from `resume-snapshot.md` — plain text only, no hyperlink formatting
- Secondary learning platform URL at 19hp (9.5pt) to fit on one line

**Summary (2 lines)**
Write a professional summary naming the exact role from the JD and the 2–3
strongest matching qualifications. Use ATS keywords from Step 1.

**Skills section**
- Lead with exact ATS keywords from Step 1 that the candidate actually has
- Mirror JD phrasing exactly
- Remove or de-emphasize skills not relevant to this role

**Experience bullets — for each job:**
- Reorder bullets — most relevant to this JD first
- Lead with strong action verbs matching the JD's language
- Keep quantified achievements. Never fabricate numbers
- Cut bullets with no relevance to this role

**Page limits — always enforce:**
Resume = max 2 pages. Cover letter = max 1 page.
If either document exceeds its page limit, apply these levers in order:
1. **Cut oldest role bullets** — trim to 2–3 bullets; keep whichever best match the JD
2. **Cut low-relevance bullets** from middle jobs
3. **Tighten spacing** — reduce `after` values on bullets from 40 → 20
4. **Reduce font sizes** — drop body text from 20hp → 19hp; never go below 19hp body
5. **Shorten skills section** — remove unrelated categories entirely

**ATS rules (always apply)**
- No tables, columns, text boxes, headers/footers, or graphics
- Standard section headings: "Experience", "Skills", "Education", "Certifications"
- En dash prefix on bullets (`–`), no Unicode symbols in bullet body text
- No color — black text only
- Consistent font throughout

### 3b — Cover Letter Content

**Header**: name on its own line (bold), then contact line — pull all values from
`resume-snapshot.md`

**Opening hook** (1–2 sentences)
- Do NOT start with "I am writing to express my interest."
- Lead with the single strongest qualification match to this JD's top requirement
- Name the role and company

**WHAT I BRING** (4–6 items)
For each: `[Bold label]: [concise elaboration mapping one JD requirement → evidence]`
- Each item covers one ATS keyword or key responsibility from Step 1
- No item longer than 2 lines. Cut ruthlessly.

**TWO RELEVANT HIGHLIGHTS** (exactly 2 items)
For each: `[Employer name (tenure)]: [specific, concrete detail matching the JD]`
- Pick the 2 most relevant jobs. Lead with the most relevant.

**Closing** (2 sentences)
- Sentence 1: genuine interest in something specific about this company or role
- Sentence 2: direct call to action

**Tone rules**
- Enterprise/government: formal. Startup/tech: direct and punchy.
- First person, active voice. No exclamation marks.
- No filler: no "team player", "passionate about", "I believe I would be a great fit"

---

## Step 4 — Generate the DOCX Files

### Setup
```bash
node -e "require('docx')" 2>/dev/null || npm install -g docx
```

### docx.js rules — always follow

- `▸` and `–` are literal TextRun characters — do NOT use `LevelFormat.BULLET`
- Never use `\n` inside a TextRun — use separate Paragraph elements
- Always set page size explicitly — docx.js defaults to A4, not US Letter
- PageBreak must be inside a Paragraph — standalone PageBreak creates invalid XML

### Page setup

Cover letter — 1-inch margins all sides:
```javascript
const { Document, Packer, Paragraph, TextRun, BorderStyle } = require('docx');
const fs = require('fs');

sections: [{
  properties: {
    page: {
      size: { width: 12240, height: 15840 },
      margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 }
    }
  },
  children: [ /* paragraphs */ ]
}]
```

Resume — 0.6-inch top/bottom, 1-inch left/right:
```javascript
sections: [{
  properties: {
    page: {
      size: { width: 12240, height: 15840 },
      margin: { top: 864, right: 1440, bottom: 864, left: 1440 }
    }
  },
  children: [ /* paragraphs */ ]
}]
```

### Helper: emptyLine
```javascript
// size in half-points: 22 = 11pt, 20 = 10pt
const emptyLine = (size, spacing) =>
  new Paragraph({ spacing, children: [new TextRun({ text: "", font: "Arial", size })] });
```

---

### Cover letter spacing

All line spacing: `line: 240, lineRule: "auto"` throughout.
Sizes in half-points: 28 = 14pt, 22 = 11pt, 21 = 10.5pt, 20 = 10pt.

| Element | size | before | after | Notes |
|---------|------|--------|-------|-------|
| Name | 28 bold | 0 | 40 | |
| Contact line | 20 | 0 | 40 | |
| *(emptyLine spacer)* | 22 | 120 | 40 | blank line before date |
| Date | 22 | 120 | 40 | |
| *(emptyLine spacer)* | 22 | 0 | 160 | blank line before Re: |
| Re: line | 22 bold | 0 | 160 | |
| Hook paragraph | 22 | 0 | 80 | |
| Section headings (WHAT I BRING etc.) | 20 bold | 160 | 60 | |
| ▸ Bullets | 21 | 0 | 60 | 3 TextRuns: `▸ ` / bold label / plain body |
| Closing body paragraph | 22 | 160 | 60 | |
| *(emptyLine spacer)* | 22 | 160 | 60 | blank line before Sincerely |
| Sincerely, | 22 | 160 | 60 | |
| *(emptyLine spacer)* | 22 | 0 | 60 | blank line after Sincerely |
| Name (sign-off) | 22 | 0 | 60 | name only |

**▸ bullet pattern:**
```javascript
new Paragraph({
  spacing: { before: 0, after: 60, line: 240, lineRule: "auto" },
  children: [
    new TextRun({ text: "\u25b8 ", font: "Arial", size: 21 }),
    new TextRun({ text: "Bold label: ", font: "Arial", size: 21, bold: true }),
    new TextRun({ text: "body text here.", font: "Arial", size: 21 })
  ]
})
```

---

### Resume spacing

All line spacing: `line: 240, lineRule: "auto"` throughout.

| Element | size | before | after | Notes |
|---------|------|--------|-------|-------|
| Name | 32 bold | 0 | 40 | |
| Contact line | 19 | 0 | 60 | bottom border: `size:4, color:"888888", space:2` |
| *(emptyLine spacer)* | 20 | 0 | 40 | blank line between header and Summary |
| Summary | 21 | 60 | 80 | |
| *(emptyLine spacer — before Experience only)* | 22 | 120 | 40 | extra spacer before Experience heading |
| Section headings | 22 bold | 120 | 40 | bottom border: `size:6, color:"000000", space:1` |
| Skill lines | 20 | 0 | 40 | bold label TextRun + plain body TextRun in same paragraph |
| Job title | 21 bold | 80 | 20 | `keepNext: true` |
| Job meta (company / dates) | 20 plain — NOT italic | 0 | 40 | |
| Bullets | 20 | 0 | 40 | prefix `\u2013 ` (en dash + space) |
| Page-2 header | 18 | 0 | 60 | `pageBreakBefore: true` · bottom border `size:4, color:"888888", space:2` |
| *(empty spacer after p2 header)* | — | 0 | 40 | `new Paragraph({ spacing: sp(0,40), children: [] })` |
| Education lines | 20 | 0 | 40 | |
| *(empty spacer before Certs)* | — | 0 | 40 | |
| Certifications heading | 22 bold | 120 | 40 | bottom border: `size:6` |
| Cert bullets | 20 | 0 | 40 | `– text` format |
| Learning platform line | 20 | 0 | 40 | plain text, no hyperlink |
| Secondary platform line | 19 | 0 | 40 | 9.5pt to fit long URL |

**Page-2 header** — pull contact info from resume-snapshot.md:
```javascript
new Paragraph({
  pageBreakBefore: true,
  spacing: { before: 0, after: 40, line: 240, lineRule: "auto" },
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: "888888", space: 2 } },
  children: [
    new TextRun({
      text: `${name}  |  ${email}  |  ${phone}  |  ${linkedinUrl}  |  ${githubUrl}`,
      font: "Arial", size: 18
    })
  ]
})
```

---

### Validate before presenting

After writing both files, run validation. Fix errors before presenting.
```bash
python validate.py ./output/YourName_CoverLetter_Company.docx
python validate.py ./output/YourName_Resume_Company.docx
```

### File naming
```
[YourName]_CoverLetter_[CompanyName].docx
[YourName]_Resume_[CompanyName].docx
```

---

## Step 5 — Summary to User

After presenting the files, provide a brief inline summary:
- **ATS keywords incorporated**: list the exact keywords from Step 1 that made it in
- **Gaps excluded**: list any keywords the candidate does not have
- **Assumptions**: tone choice, date used, any content decisions made without guidance

---

## Design Notes

**Draft content first, code second.** Writing content inside a code block leads
to tangled revision cycles. Always draft the full text of both documents in plain
prose before touching any JavaScript.

**Templates encode the constraints.** Margins, spacing, ATS rules, and section
order are baked into the scaffold templates. Fill the `// FILL:` sections and run —
do not restructure the document or change the helpers.

**ATS compliance is structural.** The rules (no tables, no color, standard headings)
are enforced by the template structure itself, not by being careful with content.
This is intentional — compliance can't be accidentally broken by filling in text.
