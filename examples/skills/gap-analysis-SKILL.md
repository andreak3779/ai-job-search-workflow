---
name: gap-analysis-job-description
description: >
  Produces a structured gap analysis comparing your resume and skills against a
  specific job description. Use whenever you share a job posting and want to know
  how well you match, what gaps exist, whether to apply, or how to frame the
  application. Also trigger when you paste a job description without an explicit
  question — the implied ask is always "how do I fit this?"
  Output: downloadable markdown file + inline summary.
---

# Gap Analysis — Job Description Skill

Compares your profile against a job posting. Output: markdown file + inline
summary covering fit rating, strengths, gaps, and application strategy.

> **Profile reference:** Load `profile-facts.md` before Step 2.
> Contains differentiators, cert status, resolved gaps, and known genuine gaps.
> Do NOT ask for resume — load `resume-snapshot.md` automatically.

---

## Inputs

1. **Job description** — pasted text, uploaded file, or URL (`web_fetch` if URL).
2. **Resume** — `resume-snapshot.md`. Load automatically.
3. **Profile facts** — `profile-facts.md`. Load before Step 2.

If the job description is missing, ask before proceeding.

---

## Step 1 — Parse the JD

Extract: job title · company · role type · required skills (flag "critical" if
must/required/strong/essential) · preferred skills · experience level ·
location/remote · client-facing requirements · red flags.

---

## Step 2 — Analyse Profile vs JD

Load `profile-facts.md` first. Apply resolved gaps list — never re-flag those
items. Use resume as source of truth; profile-facts.md for cert status and gap
context.

Status labels:

| Status | Meaning |
|---|---|
| ✅ Strong Match | Production experience in resume |
| ✅ Exceeds | Surpasses requirement; differentiator |
| 🟡 Framing Gap | Skill exists but not surfaced for this role |
| 🟡 Course-Level | Coursework only; no production use |
| 🔴 Genuine Gap | Not in resume or coursework |
| 🔴 Minor Gap | Not present but low-weight / optional |

Rules:
- Distinguish production vs course-level — never conflate them
- Never soften genuine gaps
- Note where you exceed requirements (these are differentiators)
- Never fabricate experience

---

## Step 3 — Fit Rating

| Rating | Meaning |
|---|---|
| **Strong — Apply with confidence** | Meets all critical requirements |
| **Good — Apply with tailoring** | Meets most; 1–2 genuine gaps |
| **Stretch — Apply selectively** | Significant gaps in critical requirements |
| **Pass** | Multiple critical gaps; would require misrepresenting experience |

---

## Step 4 — Build the Document

File: `[Company]_[RoleShortTitle]_GapAnalysis.md` → output directory

```
# Gap Analysis: [Job Title]
[Company] — [Location] · [Job ID if present]
[Your Name] · [Month Year]

## Overall Fit: [Rating]
[One sentence rationale]

## ✅ Strong Matches
[bold requirement → evidence → employer/achievement anchor]

## 🟡 Framing Gaps
[skill exists → where it appears → specific fix for this role]

## 🔴 Genuine Gaps
[name it → severity → fastest mitigation if worth pursuing]

## Summary Table
| Requirement | Status | Notes |

## How to Frame the Application
### Resume tailoring priorities (3–5 ordered actions)
### Cover letter angle (hook + 2–3 points + company framing)

## Fit Rating
| Dimension | ★★★★★ |
| **Overall** | **[label]** |
```

---

## Step 5 — Inline Summary

6–8 sentences covering: fit rating · top 2 strengths · primary gap + mitigation ·
single most important resume action · whether to apply.

---

## Design Principles

**Honesty over comfort.** The gap analysis is only useful if it's accurate.
Softening genuine gaps produces a false sense of readiness and leads to poor
application decisions. The system explicitly prohibits softening genuine gaps.

**Source of truth, not session memory.** Every classification decision is
anchored to the resume and profile-facts files loaded at the start of the
session — not to what was discussed earlier in the conversation. This prevents
drift across long sessions.

**Resolved gaps are permanent.** Once a framing gap has been fixed in the master
resume, it is never re-flagged. The profile-facts file maintains this list so
the gap analysis skill never generates remediation advice for problems already solved.
