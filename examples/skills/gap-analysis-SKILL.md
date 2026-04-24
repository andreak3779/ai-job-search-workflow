---
name: gap-analysis-job-description
description: >
  Produces a structured gap analysis comparing your resume and skills against a
  specific job description. Use whenever you share a job posting and ask how well
  you match, what gaps exist, whether to apply, or how to frame the application.
  Also trigger when you paste a job description without an explicit question —
  the implied ask is always "how do I fit this?" Output: downloadable markdown
  file + inline summary.
---

# Gap Analysis — Job Description Skill

Produces a structured, honest gap analysis comparing your verified profile against
a specific job posting. Output is a downloadable markdown file plus an inline
summary covering fit rating, matched strengths, framing gaps, genuine gaps,
application strategy, and resume tailoring priorities.

---

## Inputs Required

1. **Job description** — pasted text, uploaded file, or URL (use web_fetch if
   a URL is provided).
2. **Resume** — load `resume-snapshot.md` from the project automatically.
   Do NOT ask the user to upload a resume.
3. **Profile facts** — load `profile-facts.md` for cert status, differentiators,
   resolved gaps, and known genuine gaps.

If the job description is missing, ask for it before proceeding.

---

## Step 1 — Parse the Job Description

Extract and record:

- **Job title** and **company name**
- **Role type** — backend-heavy, full-stack, cloud/Azure, data/SQL,
  government/enterprise, other
- **Required skills** — flag as "critical" if the JD uses words like "must",
  "required", "strong", "critical", "essential"
- **Preferred / nice-to-have skills** — flagged as non-blockers
- **Experience level required** (years, seniority)
- **Location / remote policy**
- **Client-facing or communication requirements**
- **Any explicit red flags** — unrealistic requirements, vague descriptions,
  must-have skills that are genuine gaps

---

## Step 2 — Analyse the Profile Against the JD

Use `resume-snapshot.md` as the source of truth for production experience.
Load `profile-facts.md` before classifying any requirement — apply the resolved
gaps list and use the known genuine gaps list as a starting point.

For each requirement, classify it as one of:

| Status | Meaning |
|---|---|
| ✅ Strong Match | Production experience directly evidenced in resume |
| ✅ Exceeds | Meets and surpasses the requirement |
| ✅ Differentiator | Exceeds in a way that stands out vs typical candidates |
| 🟡 Framing Gap | Skill exists but not surfaced clearly for this role |
| 🟡 Adjacent | Related skill present; not exact match |
| 🟡 Course-Level | Covered by coursework, no production use |
| 🔴 Genuine Gap | Not in resume or coursework — real missing skill |
| 🔴 Minor Gap | Not present but low-weight or optional requirement |

**Critical rules:**
- Never re-flag items listed in `profile-facts.md` Resolved Framing Gaps —
  those are confirmed fixed and must NOT be flagged again in any gap analysis.
- Distinguish production experience from course-level exposure — be explicit
  about which is which.
- Be honest about genuine gaps — do not soften them.
- Note where your profile exceeds requirements — this matters for positioning.
- Never fabricate experience. If a skill is only in coursework, say so.

---

## Step 3 — Determine Overall Fit Rating

| Rating | Meaning |
|---|---|
| **Strong — Apply with confidence** | Meets all critical requirements; gaps are minor or cover-letter-level |
| **Good — Apply with tailoring** | Meets most critical requirements; 1–2 genuine gaps to address honestly |
| **Stretch — Apply selectively** | Significant gaps in critical requirements; requires strong framing |
| **Pass** | Multiple critical gaps; would require misrepresenting experience |

---

## Step 4 — Build the Gap Analysis Document

Save as: `[Company]_[RoleShortTitle]_GapAnalysis.md`
Output to your designated outputs directory.

### Document structure

```
# Gap Analysis: [Job Title]
[Company] — [Location] · [Job ID if present]
[Your Name] · [Month Year]

---

## Overall Fit: [Rating]
[One sentence rationale]

---

## ✅ Strong Matches (No Gap)
[Each match: bold the requirement, explain the evidence, anchor to specific
 employers or quantified achievements. Include nice-to-haves that are strong.]

---

## 🟡 Framing Gaps (Skills You Have — Resume Doesn't Show Clearly)
[Each framing gap: what skill exists, where it appears, what specific
 resume or cover letter change surfaces it for this role.]

---

## 🔴 Genuine Gaps
[Each genuine gap: name it honestly, state severity (critical / minor),
 suggest fastest mitigation path if the role is worth pursuing.]

---

## Updated Summary Table
| Requirement | Status | Notes |
|---|---|---|

---

## How to Frame the Application

### Resume tailoring priorities
[3–5 specific ordered actions: reorder bullets, mirror JD language,
 lead with X not Y, quantify Z. Be concrete — name the exact bullet
 to move or the exact phrase to add.]

### Cover letter angle
[Hook sentence, 2–3 specific points, company-specific framing if
 the company is named and researchable.]

---

## Fit Rating
| Dimension | Rating (★★★★★) |
|---|---|
| [Key dimension 1] | ★★★★★ |
| [Key dimension 2] | ★★★☆☆ |
| **Overall** | **[Rating label]** |
```

---

## Step 5 — Inline Summary

After presenting the file, give a brief inline summary covering:
- Overall fit rating and one-line rationale
- The 1–2 biggest strengths for this specific role
- The primary gap and how to handle it
- The single most important resume tailoring action
- Whether to apply and why

Keep the inline summary to 6–8 sentences. The file has the detail; the
summary gives the user what they need to decide quickly.

---

## profile-facts.md Structure

Your `profile-facts.md` file should contain these sections to support
consistent gap analysis across all job applications:

**Cert Status** — current certification state for any active credentials

**Key Differentiators** — 5–8 profile strengths to surface when the JD
references them; include production employer and quantified achievement anchors

**Resolved Framing Gaps** — skills that exist in your resume but needed
surfacing; once listed here they are never re-flagged as gaps in any analysis

**Known Genuine Gaps** — skills not in your resume or coursework; re-evaluate
severity per JD but always report honestly

---

## Design Principles

**Honesty over comfort.** The gap analysis is only useful if it's accurate.
Softening genuine gaps produces a false sense of readiness. The system
explicitly prohibits softening genuine gaps.

**Source of truth, not session memory.** Every classification decision is
anchored to the resume and profile-facts files loaded at the start of the
session — not to what was discussed earlier in the conversation.

**Resolved gaps are permanent.** Once a framing gap has been fixed in the
master resume, it is never re-flagged. The profile-facts file maintains this
list so the skill never generates remediation advice for problems already solved.

**Exceeds matters.** Where your profile surpasses a requirement, that should
be called out explicitly — it drives positioning and cover letter angle.
