---
name: learning-plan-gap-analysis
description: >
  Generates a prioritised learning plan from a completed gap analysis, targeting
  the skill gaps identified for a specific job role. Use whenever you ask for a
  learning plan, study plan, or course list after a gap analysis has been produced.
  Output is a PDF with clickable links to every course and credential.
  If no genuine gaps exist, produces an interview readiness plan instead.
---

# Learning Plan — Gap Analysis Skill

Converts a gap analysis into a phased PDF learning plan with verified clickable links.
Sources: Pluralsight · Microsoft Applied Skills (free) · Microsoft Learn.

> **Before selecting courses:** Load `course-urls.md` — verified slugs by gap type.
> Do not guess course slugs; search if a course isn't listed.
> **Before generating PDF:** Copy `pdf-template.py` to working directory, fill data sections, run it.

---

## Inputs

1. **Gap analysis** — markdown from `gap-analysis` skill, or pasted gaps.
   If missing: "I need the gap analysis first."
2. **Job context** — role title + company (from gap analysis header).
3. **Active application?** — yes = Priority 1 urgency increases.

---

## Step 1 — Classify Plan Type

- **Gaps exist** (any 🔴 or 🟡) → Standard phased plan (Priority 1 / 2 / 3)
- **No genuine gaps** (Strong fit, framing gaps only) → Interview Readiness plan

---

## Step 2 — Assign Priorities

| Priority | What | Complete by |
|---|---|---|
| 1 | 🔴 Genuine gaps; critical must-haves with zero coverage | Before applying |
| 2 | 🟡 Framing gaps; course-level skills; important nice-to-haves | Before tech screen |
| 3 | Differentiators; interview depth; elevates good to exceptional | Before final round |

Rules:
- Active application → P1 within 1–2 weeks
- Cert domain gaps → P1 if exam is imminent
- Resolved resume framing gaps → P2/P3 (vocabulary only, not P1)

---

## Step 3 — Select Courses

Load `course-urls.md`. Match each gap to the best source:

| Gap type | Source |
|---|---|
| Genuine gap (new topic) | Getting Started / Fundamentals course |
| Framing gap (depth) | Deep Dive / Best Practices / Advanced course |
| Azure hands-on gap | Course + Applied Skills lab |
| AI domain | Course + Applied Skills + Microsoft Learn |

If a course isn't in `course-urls.md`, use web search to verify the slug
before including it. Never guess a course slug.

---

## Step 4 — Generate the PDF

```bash
pip install reportlab --break-system-packages -q
```

1. Copy `pdf-template.py` → working directory
2. Fill all `# FILL:` sections (PLAN list, SUMMARY list, OUTPUT path, title strings)
3. Run: `python learning_plan.py`
4. Verify output renders correctly before presenting

File naming: `[Company]_[RoleShortTitle]_LearningPlan.pdf`

---

## Step 5 — Present and Summarise

After delivering the file, give a 4–5 sentence inline summary:
item count · total hours · Priority 1 ask · any time-sensitive deadline · what to do first.

---

## Plan Formats

### Standard Plan sections (in order)
Banner → urgency box (if cert deadline applies) → legend → About This Plan →
course cards by phase → Quick Reference Table → Key Links → footer

### Interview Readiness Plan sections
Banner → legend → About This Plan → Before Phone Screen → Before Tech Screen →
Before Final Round → STAR Story Prep → Quick Reference Table

---

## Design Notes

**Verified URLs only.** Every course link is confirmed against a maintained URL file before
inclusion. A learning plan with broken links is worse than no learning plan — the user
follows the link and hits a 404, which undermines confidence in the whole output.

**Phase discipline.** The three-phase structure (before applying / before tech screen /
before final round) maps to actual interview timelines. Dumping everything into "Phase 1"
defeats the purpose — the point is to sequence effort correctly, not just list courses.

**Hours estimates matter.** Approximate hours are included per course so the user can
assess whether the plan is realistic given their timeline. A plan with 40 hours of Priority 1
work for an application due in three days is not a useful plan.
