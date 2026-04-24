---
name: salary-research
description: >
  Researches salary ranges and contract hourly rates for target developer roles
  in Canadian dollars (CAD). Use whenever you ask about salary, pay, compensation,
  rates, how much to ask for, what to charge, or what the market rate is for a role.
  Also trigger when evaluating a job offer. Output: downloadable markdown file with
  salary tables, contract rate tables, and negotiation guidance. Always report in CAD.
---

# Salary Research Skill

Produces a market-rate salary and contract rate reference document in Canadian dollars.
Uses live web search across multiple sources and anchors figures to your actual
experience level.

> **Load before generating:** `profile-facts.md` — cert status affects market positioning.

---

## Inputs

The user may specify any combination of:

- **Job type(s):** Hybrid local, remote Canada, or both
- **Role title:** e.g. "Senior Full-Stack .NET Developer", "Azure Developer"
- **Employment type:** Permanent (salary) and/or Contract (hourly) — produce both
  unless specified otherwise

If inputs are vague, proceed with defaults: both scenarios, both employment types.

---

## Step 1 — Identify Role Targets

Map the user's request to one or more role titles. Use your target roles from
your job search context if not specified.

---

## Step 2 — Web Search

Run all searches in CAD context. Use `web_search` for each query.

### Required searches
1. `[Role title] salary [City] Canada [current year] CAD`
2. `Senior [stack] developer remote Canada salary [current year] CAD`
3. `[Role title] contract hourly rate Canada [current year]`
4. `IT contractor rates Canada [current year] senior developer`

### Preferred sources (prioritize in results)
- **Glassdoor Canada** — self-reported, role-specific, most reliable for Canada
- **Robert Half Canada Salary Guide** — recruiter-anchored, cert premium data
- **ERI SalaryExpert** — employer survey data, good for specific cities
- **ZipRecruiter Canada** — real-time job posting data
- **PayScale Canada** — good for percentile breakdown
- **CareerBeacon** — active Canadian job postings, posted salary ranges

Skip US-only sources. Convert any USD figures using current exchange rate if needed,
but prefer CAD-native sources.

### Cert premium note
Robert Half Canada Salary Guide: 73% of tech leaders pay more for certifications.
Active certifications in progress justify upper-half positioning. Note this
explicitly in the document.

---

## Step 3 — Time Zone Compatibility (remote scenario)

For remote Canada roles, include a compatibility table:

| Zone | Cities | Verdict |
|---|---|---|
| Pacific (PT) | Vancouver, Victoria | ✅ Workable |
| Mountain (MT) | Edmonton, Calgary | ✅ Easy |
| Saskatchewan (CT, no DST) | Regina, Saskatoon | ✅ No offset |
| Central (CT) | [Your city if Central] | ✅ Home zone |
| Eastern (ET) | Toronto, Ottawa | ✅ Easy |

All Canadian time zones are workable for a Canadian-based remote developer.

---

## Step 4 — Contract Rate Calculation

**Formula:** Employee salary midpoint × 1.30–1.40 ÷ 1,800 hrs = hourly floor

The 30–40% premium covers: self-employment taxes, no CPP/EI employer match,
no benefits, no paid vacation.

**Geographic premium:** For Toronto/Vancouver clients hiring remote, apply a
10–15% geographic premium — do not discount for smaller market location.

---

## Step 5 — Build the Markdown Document

File name: `SalaryResearch_[RoleShortTitle]_[YYYY-MM].md`

### Document structure

```markdown
# Salary & Contract Rate Research — [Role Title]
[Month Year] · All figures in CAD

## How to Use This Document
[When to use each section, what "target" and "floor" mean]

## Scenario 1 — Hybrid Role in [City]
### Salary Range (Permanent, Full-Time)
| Percentile | Annual | Monthly | Notes |
### Contract Hourly Rate
| Band | Rate/hr | Annualized | Notes |
**Your target ask:** [range]
**Negotiation floor:** [number + rationale]

## Scenario 2 — Remote Canada
### Time Zone Compatibility Notes
### Salary Range (Permanent, Full-Time)
| Market | Percentile | Annual | Notes |
### Contract Hourly Rate
| Band | Rate/hr | Annualized | Notes |
**Your target ask:** [range]
**Negotiation floor:** [number + rationale]

## Key Factors That Support the Higher End
[Table: factor → impact on positioning]

## Sources Used
[Table: source · data used · date]

## Negotiation Tips
[5–7 concrete, role-specific tips — not generic advice]
```

---

## Step 6 — Present and Summarise

Use `present_files` to deliver the markdown file.

Inline summary (6–8 sentences):
- Local salary target and floor
- Remote salary target and floor
- Local contract rate target
- Remote contract rate target
- Top 2 profile factors that push toward the higher end
- One negotiation tip specific to your situation

---

## Principles

- **Always CAD.** Never report USD without an explicit conversion note.
- **Anchor to seniority.** 10+ years experience = never use "all levels" averages
  as the target. Always find senior-level data or apply an experience premium.
- **Cite sources inline.** Every salary claim should trace to a named source + date.
- **No generic advice.** Negotiation tips must reference your specific differentiators
  (certs, quantified achievements, specialized depth).
- **Update cert status from `profile-facts.md`** before writing — cert language
  must match current status (Certified vs. In Progress).
