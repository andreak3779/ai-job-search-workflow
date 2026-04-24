---
name: generate-general-resume
description: >
  Generates a general-purpose senior developer resume as a DOCX file, optimised
  for recruiter skimmability and ATS compatibility. Use whenever you ask to
  generate, refresh, or rebuild your general resume with no specific job posting
  involved. For JD-specific tailoring, use the cover-letter-and-resume skill instead.
  Output: DOCX file only.
---

# General Resume Generator

Produces a 2-page, ATS-compatible, recruiter-skimmable DOCX resume.

> **Source files** (load before writing any code):
> - `resume-snapshot.md` — contact info, experience, certs. Load automatically.
> - `profile-facts.md` — cert status and differentiators. Load before Step 2.
> - `general-resume-template.js` — scaffold in the templates folder. Copy and fill.

---

## Document Format

| Element | Format |
|---|---|
| Name | 32pt bold ALL CAPS, **centered** |
| Tagline | 20pt plain, **centered** — `Role \| Tech1 · Tech2 · Tech3` |
| Contact line | 19pt plain, **centered**, pipe-separated |
| Section headings | 22pt bold ALL CAPS, blue (#2E6DA4), blue bottom border |
| Blank line after heading | `headingContentSpacer()` before every section's first content item |
| Summary | Single paragraph, 21pt plain, 3–4 sentences |
| Skill lines | Bold label + plain list on same line, 20pt |
| Job entry | Bold "Title \| Company, City, Province" + right-tab + **italic** dates |
| Bullets | Round `•` with hanging indent (left: 360, hanging: 200), 20pt |
| Education | Bullet-style: `•  Degree – School, City` |
| Page flow | **Natural — no forced page break** |
| Margins | 0.5" top/bottom · 0.75" left/right |

---

## Recruiter-Skimmability Rules (5-second test)

1. **Name + tagline** (1 sec) — centered, immediately readable, role + stack visible
2. **Summary** (1 sec) — 3–4 sentences, role title first, cert status present
3. **Skills** (1–2 sec) — bold labels, keywords scannable left-to-right
4. **Job titles** (1 sec) — bold, dates italic right-aligned, company plain
5. **Top bullet per job** (1 sec) — metric or outcome in first 6 words

Rules:
- **Tagline**: One line. `Role | Tech1 · Tech2 · Tech3`. Lead with role.
- **Summary**: 3–4 sentences. Open with role + years. Cert status sentence 2.
  Differentiator sentence 3.
- **Skills**: 5–6 categories. No category with fewer than 3 items. Lead each
  list with the most ATS-recognisable keyword.
- **Bullets**: Strong action verb first. Metric in first 6 words. Max 2 lines.
- **Most recent client role**: 5–6 bullets. Others: 3–4. Short tenures: 2 max.
  Oldest role: 2 max.
- **Self-directed roles**: set `company: ''` to suppress the `|` separator.

---

## Step 0 — Load Sources

```
resume-snapshot.md   → contact info, all experience, education
profile-facts.md     → cert status, differentiators list
```

Never ask the user to upload anything.

---

## Step 1 — Extract Contact Info

Copy exactly from `resume-snapshot.md`:
`name (ALL CAPS) · tagline · email · phone · linkedin · github · learning platform URLs`

---

## Step 2 — Draft Content

### Tagline
`[Role Title] | [Tech1] · [Tech2] · [Tech3] · [Tech4]`

### Summary (3–4 sentences)
1. Role title + years + top 2 stack items + domain descriptor
2. Cert status from `profile-facts.md` + active investment statement
3. Key differentiator from `profile-facts.md` differentiators list
4. *(Optional)* One additional capability statement

### Skills (5–6 categories)
Suggested order: Backend → Frontend → Database → DevOps & Tools → Cloud & AI →
Testing. Adjust to match your actual stack.

### Experience
Reverse chronological. Apply bullet count rules above.
Lead with quantified achievements — pull metrics from `resume-snapshot.md`.
Set `company: ''` for self-directed / portfolio roles.

### Education
`'Degree – School, City'` as bullet strings in the `educationItems` array.

---

## Step 3 — Generate DOCX

```bash
node -e "require('docx')" 2>/dev/null || npm install -g docx 2>/dev/null || npm install --prefix /home/user docx
```

1. Copy `general-resume-template.js` → working directory as `general-resume.js`
2. Fill all `// FILL:` sections using content drafted in Step 2
3. Set cert status from `profile-facts.md` — use exact strings
4. Do NOT change margins, spacing, BLUE constant, or helper functions
5. Run: `node general-resume.js`

---

## Step 4 — Enforce 2-Page Layout

Content flows naturally — no forced breaks. After running, verify page count:
- **1 page**: Too compressed. Increase `sp(0,30)` → `sp(0,45)` on bullets throughout.
- **3+ pages**: Cut bullets from oldest roles first. Then tighten `sp(0,30)` →
  `sp(0,20)` on oldest 2 roles only.
- **Target**: Content fills ~90% of page 2.

---

## Step 5 — ATS Compliance Check

| Rule | Check |
|---|---|
| No tables | ✓ Paragraphs only — tab stop for date alignment is ATS-safe |
| No columns | ✓ Single-column layout |
| No text boxes or graphics | ✓ |
| No Word headers/footers | ✓ Natural page flow |
| Color text | ✓ ATS-safe — body text black; color on headings only |
| Standard heading names | PROFESSIONAL SUMMARY · TECHNICAL SKILLS · PROFESSIONAL EXPERIENCE · EDUCATION · CERTIFICATIONS |
| Round bullet prefix `•` | ✓ Plain text character — ATS-safe |

---

## Step 6 — Validate and Present

Run validation before presenting. Fix errors first.
Output filename: `[YourName]_Resume_General.docx`

Inline summary (3–4 sentences): tagline · cert status · differentiators · page count.

---

## Design Notes

**General vs tailored.** This skill produces a base resume suitable for job
boards (LinkedIn, Indeed) and recruiter submissions where no specific JD exists.
For a JD-tailored version with reordered bullets and ATS keyword injection,
use the cover-letter-and-resume skill instead.

**Cert status must be current.** Always pull cert status from `profile-facts.md`
immediately before generating — never hardcode dates or statuses that may be stale.

**The template is authoritative.** Spacing, margins, and section order are encoded
in `general-resume-template.js`. Fill the `// FILL:` sections and run — do not
restructure the document.
