---
name: interview-prep
description: >
  Generates a tailored, role-specific interview preparation guide. Use whenever
  you have an upcoming interview and want structured preparation covering phone
  screen, technical topics, system design, and behavioural questions. Requires
  a job description; recruiter briefing is optional. Load this file when
  preparing for a specific interview stage and tailor to the role.
---

# Interview Preparation — .NET / Azure Developer

Load this file when preparing for a specific interview stage. Tailor to the role.

---

## Phone Screen / HR

| Question | Talking point |
|---|---|
| "Tell me about your .NET experience." | Walk the ASP.NET Core learning path (Big Picture → Fundamentals → MVC → EF Core → Debugging) — anchor with hands-on labs and production use. |
| "What Azure services have you worked with?" | Describe your cert progression and call out hands-on labs specifically — services touched, not just courses taken. |
| "Pursuing certifications?" | Name current cert status + next target + timeline. Shows intentionality. |
| "Why this company/role?" | 2 specific reasons — research the company before the screen. Never generalize. |
| "What are you looking for?" | Role type + tech stack match + growth area. Keep it role-relevant. |

---

## Technical Round — .NET Topics

- ASP.NET Core middleware pipeline — order of execution, custom middleware, short-circuiting
- Dependency injection patterns — scopes (transient / scoped / singleton), when each applies
- EF Core: migrations, relationships, performance (N+1, AsNoTracking)
- REST API design principles and versioning strategies
- API security: JWT structure, OAuth2 flows, Azure AD integration, token validation
- Debugging: structured logging, exception middleware, Application Insights

---

## Technical Round — Azure Topics

- Azure Functions: triggers, bindings, Durable Functions basics
- App Service vs Functions vs Container Apps — when to use each, trade-offs
- Azure Storage: Blob, Queue, Table — use cases and access patterns
- Azure AD / Entra ID: app registrations, managed identities, RBAC
- Azure Monitor: Log Analytics, Application Insights, alerts
- Resilient architecture: retry policies, circuit breakers, health checks

---

## System Design Approach

1. Clarify requirements (functional + non-functional)
2. Sketch high-level (clients → API → services → data)
3. Map to Azure services explicitly — name the services, don't be generic
4. Address: scalability · security · cost optimization · monitoring
5. Call out trade-offs — there is no perfect design; show you understand the choices

**Common prompts to prepare for:**
- "Design a file processing pipeline on Azure."
- "Architect a multi-tenant SaaS API on Azure."
- "Design a notification system using Azure Functions and queues."
- "How would you modernize this legacy .NET application?"
- "Design an API for [domain in the JD]."

---

## Behavioural Round (STAR format)

Pre-build answers for these scenarios before the interview. Each needs:
- **S**ituation — brief context (1–2 sentences)
- **T**ask — what you were responsible for
- **A**ction — what you specifically did (use "I", not "we")
- **R**esult — quantified outcome where possible

Scenarios to prepare:
- Debugging a complex production issue
- Learning a new technology quickly
- Improving the team's development process
- Disagreeing with a technical decision — and what happened
- Mentoring or helping a colleague
- Delivering a project under a tight deadline
- Dealing with unclear or changing requirements

> Anchor each answer to a specific employer and achievement from your resume.
> Vague STAR answers land much weaker than named ones.
> Leverage completed leadership and communication courses as evidence of
> intentional professional development — not just technical skills.

---

## Questions to Ask the Interviewer

Prepare 3–4, use 2–3:

- "What does the first 90 days look like for this role?"
- "What's the current tech debt situation and how does the team approach it?"
- "How are architectural decisions made — top-down or collaborative?"
- "What does the CI/CD pipeline look like today?"
- "What's the biggest technical challenge the team is working through right now?"
- "How do you measure success for this role at 6 months?"

Avoid questions answered on the company website.

---

## Stage-Appropriate Depth

| Stage | Depth needed |
|---|---|
| Phone screen | 90-second answers; confident overview of stack and cert trajectory |
| Technical round | Working knowledge + trade-off awareness; be ready to go deep on anything in the JD |
| Final round | Strategic thinking, system design, leadership examples, questions about team culture |

Don't bring final-round depth to a phone screen — it reads as nervous over-preparation.
