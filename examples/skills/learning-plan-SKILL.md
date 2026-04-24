---
name: learning-plan-gap-analysis
description: >
  Generates a prioritised learning plan from a completed gap analysis. Use
  whenever you ask for a learning plan, study plan, or course list after a gap
  analysis has been produced. Always use after a gap analysis — do not generate
  ad hoc. If no genuine gaps exist, produces an interview readiness plan instead.
  Output: downloadable markdown file with clickable links.
---

# Learning Plan — Gap Analysis Skill

Converts a completed gap analysis into a prioritised, phased learning plan with
clickable links. Sources: Pluralsight · Microsoft Applied Skills (free, lab-based) ·
Microsoft Learn.

> **Before selecting courses:** Load `course-urls.md` — verified slugs by gap type.
> Do not guess slugs; use web search if a course isn't listed.

---

## Inputs Required

1. **Gap analysis** — markdown output from the gap analysis skill, or pasted gaps.
   If missing: "I need the gap analysis first."
2. **Job context** — role title + company (from gap analysis header).
3. **Active application?** — yes = Priority 1 urgency increases.

---

## Step 1 — Classify the Gap Analysis Type

### Standard Plan (gaps exist)
Use when the gap analysis contains any 🔴 Genuine Gaps or 🟡 Framing Gaps.
Produce a **phased Priority 1 / 2 / 3 plan**.

### Interview Readiness Plan (no genuine gaps)
Use when the gap analysis is rated **Strong — Apply with confidence** AND has
no 🔴 Genuine Gaps — only framing gaps or differentiator opportunities.
Produce an **interview readiness plan** instead (see format below).

---

## Step 2 — Assign Priorities (Standard Plan only)

| Priority | What goes here | Complete by |
|---|---|---|
| **Priority 1** | 🔴 Genuine gaps blocking the role; critical must-haves with no coverage | Before applying / ASAP |
| **Priority 2** | 🟡 Framing gaps; course-level skills needing strengthening; important nice-to-haves | Before technical screen |
| **Priority 3** | Differentiators; interview depth; skills that elevate from good to exceptional | Before final round |

**Priority assignment rules:**
- Active application → Priority 1 = complete within 1–2 weeks
- JD must-have with zero coverage → always Priority 1
- Framing gaps already resolved in master resume → Priority 2 or 3 (vocabulary only)
- Nice-to-haves with no coverage → Priority 3 unless role is heavily weighted toward them
- Certification domain gaps → Priority 1 if exam is imminent, Priority 2 otherwise

---

## Step 3 — Select Courses and Resources

Match each gap to the best source in this order of preference:

### 1. Pluralsight (primary)
Use for deep technical knowledge courses. Always include the full direct URL.

Search logic:
- **Genuine gaps** (new topic): prefer "Getting Started" or "Fundamentals" courses
- **Framing gaps** (skill exists, needs depth): prefer "Deep Dive", "Advanced",
  or "Best Practices" courses
- Verify the course exists before including — never guess a slug

### 2. Microsoft Applied Skills (for Azure / Microsoft stack gaps)
Free, lab-based credentials (~2–4 hours each). Use when:
- The gap is a hands-on Azure service only seen at course level
- The gap maps to a verifiable credential on a transcript
- The gap is in an Azure certification domain and a relevant Applied Skills lab exists

Browse all: `https://learn.microsoft.com/en-us/credentials/browse/?credential_types=applied-skills`

### 3. Microsoft Learn modules (for certification gaps)
Use for structured learning paths tied to Microsoft certification domains,
particularly where the official sandbox is the best learning path.

### Source selection by gap type

| Gap type | Preferred source |
|---|---|
| New technical topic (genuine gap) | Course Getting Started + Applied Skills lab |
| Framing gap (vocabulary / interview depth) | Course Deep Dive or Best Practices |
| Azure certification domain gap | Course + Applied Skills lab |
| AI domain gap | Course + Applied Skills + Microsoft Learn |
| Interview readiness | Methodology / principles courses |

---

## Step 4 — Build the Learning Plan Document

File naming: `[Company]_[RoleShortTitle]_LearningPlan.md`

### Standard Plan format

```markdown
# [Role Title] — Learning Plan
[Company] · [Month Year]
Based on gap analysis: [gap analysis filename or date]

---

## About This Plan
[2–3 sentences: what the plan covers, how many items, total estimated hours,
sources used. State whether this is for an active application.]

---

## Priority Legend
- **Priority 1** — Genuine gaps. Complete before applying.
- **Priority 2** — Framing gaps / important skills. Complete before technical screen.
- **Priority 3** — Differentiators. Complete before final round.

---

## Phase 1 — Close the Genuine Gaps
[Skip if no Priority 1 items]

### [Source: Pluralsight / Applied Skills / Microsoft Learn]
**[Number]. [Course Title]**
[Full URL as clickable link]
Gap closed: [one sentence — what this closes and why it matters for this role]
Est. time: [X hrs]

[Repeat for each Priority 1 item]

---

## Phase 2 — Strengthen Interview Readiness
[Priority 2 items — same card format]

---

## Phase 3 — Reinforce Your Differentiators
[Priority 3 items — same card format]

---

## Quick Reference Table

| # | Course / Resource | Source | Gap Closed | Est. Hrs |
|---|---|---|---|---|

---

## Key Links
- [Learning platform profile URL]
- [Applied Skills browse URL]
- [Any certification-specific links relevant to this role]

*Generated [Month Year] · All links are direct URLs — click to open in browser.*
```

---

### Interview Readiness Plan format (no genuine gaps)

```markdown
# [Role Title] — Interview Readiness Plan
[Company] · [Month Year]
Gap analysis result: Strong match — no genuine gaps identified.

---

## About This Plan
Your profile is a strong match for this role. This plan focuses on sharpening
how you articulate your existing strengths in interviews. [X] items across [X] hours.

---

## Before the Phone Screen
**[Number]. [Resource]** · [URL]
Why: [One sentence — what interview question or scenario this prepares for]
Est. time: [X hrs]
[2–3 items: methodology vocabulary, talking points, company research]

---

## Before the Technical Screen
[3–4 items: deep-dive courses, JD-framing language for existing experience]

---

## Before the Final Round
[2–3 items: system design patterns, leadership/communication, differentiator topics]

---

## STAR Story Prep
[3–4 specific scenarios: name the employer and achievement for each]

---

## Quick Reference Table
| # | Resource | Purpose | Est. Hrs |
|---|---|---|---|
```

---

## Step 5 — Save and Present

1. Save the markdown file to your outputs directory
2. Present using `present_files`
3. Give a brief inline summary:
   - How many items, total hours
   - What Priority 1 requires (if any)
   - Whether any items are time-sensitive (cert deadline)
   - One sentence on what to do first

---

## Certification Deadline Awareness

Always surface active certification deadlines prominently in the plan header.
If certification domain gaps appear in the gap analysis, add a warning at the
top noting the deadline and that Priority 1 items must be completed before
sitting the exam.

---

## Course URL Reference by Gap Type

Use these as a starting point. Verify all URLs before including in a plan.

### Full-Stack .NET roles
| Gap | URL |
|---|---|
| NGINX | https://www.pluralsight.com/courses/nginx-getting-started |
| Web App Pen Testing | https://www.pluralsight.com/courses/web-app-pentesting-fundamentals |
| Secure Coding C# | https://www.pluralsight.com/courses/c-sharp-10-owasp-secure-coding |
| TDD in C# | https://www.pluralsight.com/courses/csharp-test-driven-development |
| SOLID Principles | https://www.pluralsight.com/courses/csharp-solid-principles |
| C# Design Patterns | https://www.pluralsight.com/courses/c-sharp-10-design-patterns |
| SQL Server Query Performance | https://www.pluralsight.com/courses/sqlserver-query-performance-developers |
| ASP.NET Core Web API Auth | https://www.pluralsight.com/courses/asp-dot-net-core-web-api-authentication-playbook |
| Angular Architecture | https://www.pluralsight.com/courses/angular-architecture-best-practices |
| EF Core 8 Fundamentals | https://www.pluralsight.com/courses/ef-core-8-fundamentals |

### Azure / AZ-204 domain gaps
| Gap | URL |
|---|---|
| Service Bus | https://www.pluralsight.com/courses/azure-service-bus-in-depth |
| Cosmos DB | https://www.pluralsight.com/courses/azure-cosmos-db |
| Cosmos DB .NET SDK | https://www.pluralsight.com/courses/microsoft-azure-developer-develop-solutions-cosmos-db-storage |
| Key Vault | https://www.pluralsight.com/courses/microsoft-azure-key-vault-configuring-managing |
| Redis Cache | https://www.pluralsight.com/courses/microsoft-azure-cache-implementing |
| API Management | https://www.pluralsight.com/courses/microsoft-azure-api-management-essentials |
| Container Apps (Applied Skills) | https://learn.microsoft.com/en-us/credentials/applied-skills/deploy-cloud-native-apps-using-azure-container-apps/ |
| Azure Monitor (Applied Skills) | https://learn.microsoft.com/en-us/credentials/applied-skills/deploy-and-configure-azure-monitor/ |
| CI/CD Security (Applied Skills) | https://learn.microsoft.com/en-us/credentials/applied-skills/implement-security-through-pipeline-using-devops/ |

### AI / Generative AI gaps
| Gap | URL |
|---|---|
| Azure OpenAI Getting Started | https://www.pluralsight.com/courses/azure-openai-services-getting-started |
| Building AI-enabled Apps | https://www.pluralsight.com/courses/building-ai-enabled-dot-net-applications |
| RAG with Azure AI Search | https://www.pluralsight.com/courses/retrieval-augmented-generation-rag-azure-ai-search |
| GenAI (Applied Skills) | https://learn.microsoft.com/en-us/credentials/applied-skills/develop-generative-ai-solutions-with-azure-openai-service/ |
| Document Intelligence (Applied Skills) | https://learn.microsoft.com/en-us/credentials/applied-skills/create-intelligent-document-solution-azure-ai/ |

### Python gaps
| Gap | URL |
|---|---|
| Python Fundamentals | https://www.pluralsight.com/courses/python-3-fundamentals |
| Python OOP | https://www.pluralsight.com/courses/classes-object-oriented-programming-python-3 |
| Python Testing | https://www.pluralsight.com/courses/testing-python-3 |

### SQL / data roles
| Gap | URL |
|---|---|
| SQL Server Query Performance | https://www.pluralsight.com/courses/sqlserver-query-performance-developers |
| T-SQL Fundamentals | https://www.pluralsight.com/courses/tsql-fundamentals |

### Security gaps
| Gap | URL |
|---|---|
| Secure Coding C# (OWASP) | https://www.pluralsight.com/courses/c-sharp-10-owasp-secure-coding |
| API Security Practices | https://www.pluralsight.com/courses/api-security-practices |
| Web App Pen Testing | https://www.pluralsight.com/courses/web-app-pentesting-fundamentals |

---

## Design Principles

**Verified URLs only.** A plan with broken links is worse than no plan. Every
course URL must be confirmed before inclusion — never guess a slug.

**Phase discipline.** The three-phase structure maps to actual interview timelines.
Sequencing effort correctly matters more than listing every available course.

**Hours estimates matter.** Include approximate hours per course so the user
can assess whether the plan is realistic given their timeline.
