# AI-Assisted Job Search Workflow System

A structured AI workflow system built with Claude that automates the full job application pipeline — from job description analysis through to tailored application documents and phased learning plans.

Built by a senior full-stack developer (.NET · Angular · Azure) as a portfolio project during an active job search.

---

## The Problem

Every job posting requires a different framing of the same experience. ATS systems filter on exact keywords. Cover letters need a specific angle per company. Gaps vary by role. Doing this manually at scale is slow, inconsistent, and easy to get wrong.

The goal was to engineer a system that handles the repetitive, structured work — accurately — so that effort goes into the decisions, not the document production.

---

## System Architecture

The system is built around four layers:

### 1. Source of Truth Files
Canonical context files that every workflow draws from:
- **Resume snapshot** — master resume in Markdown; the single source all documents are generated from
- **Profile facts** — cert status, key differentiators, resolved framing gaps, known genuine gaps
- **Skills summary** — ATS keyword lists by technology area; cert domain coverage tables
- **Course files** — completed Pluralsight and Microsoft Learn training, used to map gaps to evidence

These files are never edited mid-session. They are loaded at the start of each workflow to ensure consistency across outputs.

### 2. Skill Library
Modular prompt templates — called "skills" — each scoped to a specific workflow:

| Skill | Purpose |
|---|---|
| `gap-analysis` | Compares resume against a job description; produces fit rating, strength/gap breakdown, application strategy |
| `cover-letter-and-resume` | Generates ATS-optimized DOCX resume + cover letter tailored to a specific posting |
| `learning-plan` | Converts gap analysis output into a phased PDF learning plan with verified course URLs |
| `pluralsight-updater` | Keeps the completed courses file current as new courses are finished |
| `linkedin-updater` | Produces ready-to-paste copy for every LinkedIn profile field |

Each skill file specifies: inputs required, step-by-step workflow, output format, file naming conventions, and ATS/formatting rules.

### 3. Document Generation Pipeline
Application documents are generated as formatted files — not markdown — to match recruiter and ATS expectations:

- **Resumes and cover letters:** Node.js + `docx` library; templated JS files with `// FILL:` sections; Arial/Carlito fonts, ATS-safe formatting (no tables, no columns, no text boxes)
- **Learning plan PDFs:** Python + ReportLab; phased course cards with color-coded priority levels and clickable URLs

Templates enforce consistent formatting across every document — margins, spacing, section order, bullet style — so outputs don't need manual cleanup.

### 4. Iterative Refinement Loop
Each workflow output feeds the next:

```
Job Description
      ↓
  Gap Analysis  ──→  fit rating · ATS keywords · gap list
      ↓
 Learning Plan  ──→  phased courses · verified URLs · priority order
      ↓
Resume + Cover Letter  ──→  keywords injected · bullets reordered · cert status current
```

The system is designed so a new job posting can move through the full pipeline in a single session with no hallucinated experience and no generic filler.

---

## Key Engineering Decisions

**Source-of-truth context management**
All workflows load the same canonical files rather than relying on session memory. This prevents drift across sessions and ensures cert status, gap classifications, and experience details are always current.

**Token efficiency**
Context files are designed to be lean — titles only in course lists, concise gap descriptions, no verbose explanations. Claude loads multiple files per session; token cost compounds quickly if files are bloated.

**ATS compliance as a constraint, not an afterthought**
Resume templates enforce ATS rules structurally: no tables, no columns, no headers/footers, standard section headings, plain bullet characters, no color. These are baked into the template — they can't be broken by filling in content.

**Verified URLs only**
The learning plan skill maintains a verified course URL file. Slugs are confirmed live before inclusion. The system never guesses a Pluralsight URL — hallucinated course links are a silent failure mode that undermines the whole output.

**Gap classification discipline**
The gap analysis skill distinguishes between four states: strong match (production experience), framing gap (skill exists but not surfaced), course-level (Pluralsight only, no production use), and genuine gap (not present). Softening genuine gaps is explicitly prohibited. This keeps the output honest and the application strategy realistic.

---

## Example Outputs

*All examples are anonymized — real company names and personal contact details are not included.*

- [`examples/gap-analysis-sample.md`](examples/gap-analysis-sample.md) — gap analysis for a fictional .NET Developer posting
- [`examples/skill-template-sample.md`](examples/skill-template-sample.md) — anonymized skill file showing structure and workflow format
- [`examples/prompt-template-sample.md`](examples/prompt-template-sample.md) — example context prompt showing how source-of-truth files are referenced

---

## Stack

| Layer | Technology |
|---|---|
| AI | Claude (Anthropic) |
| Prompt architecture | Structured instruction system / skill library |
| Resume / cover letter generation | Node.js · `docx` npm package |
| PDF generation | Python · ReportLab |
| Context files | Markdown |
| Version control | Git / GitHub |

---

## About

Built by **Andrea Kaplen** — Senior Full-Stack Developer | C# · ASP.NET Core · Angular · Azure

- [LinkedIn](https://www.linkedin.com/in/andrea3779)
- [Pluralsight](https://app.pluralsight.com/profile/andreak9731)
- [GitHub](https://github.com/andreak3779)
- [AZ-900 Credential](https://learn.microsoft.com/api/credentials/share/en-ca/AndreaKaplen-4967/2FDF8918A15F0903?sharingId=EB5AF0F8A6718EC9)

Open to senior full-stack, .NET, and Azure developer roles — remote preferred, Winnipeg-based.
