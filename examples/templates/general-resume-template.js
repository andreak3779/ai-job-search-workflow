/**
 * General Resume Template — base version for job boards and recruiter submissions
 *
 * Use this for general (non-JD-tailored) resume generation.
 * For JD-tailored versions: use resume-template.js instead.
 *
 * Format: centered header · blue ALL CAPS sections · round bullets
 *         natural page flow (no forced breaks)
 *
 * Fill all // FILL: sections. Do NOT change BLUE, margins, or helpers.
 * Output: ./output/YourName_Resume_General.docx
 *
 * Page limits: target 2 pages. Trim in this order if over:
 *   1. Oldest role — keep 2 bullets
 *   2. Short-tenure roles — keep 2 bullets
 *   3. Tighten sp(0,30) → sp(0,20) on bullets in oldest 2 roles only
 *   4. Body font: 20 → 19 hp (never below 19 body)
 *   5. Skills: remove categories with no relevance
 */

const {
  Document, Packer, Paragraph, TextRun, BorderStyle,
  TabStopType, AlignmentType
} = require('docx');
const fs = require('fs');

// ─── FILL: Output path ───────────────────────────────────────────────────────
const OUTPUT_PATH = './output/YourName_Resume_General.docx';

// ─── FILL: Contact info — copy exactly from resume-snapshot.md ───────────────
const name           = 'YOUR NAME';              // ALL CAPS
const tagline        = 'FILL_Tagline';           // e.g. 'Senior Full-Stack Developer | C# · ASP.NET Core · Angular · Azure'
const email          = 'FILL_email';
const phone          = 'FILL_phone';             // with parentheses: (000) 000-0000
const linkedin       = 'FILL_linkedinUrl';
const github         = 'FILL_githubUrl';
const platformUrl1   = 'FILL_learningPlatformUrl';   // e.g. Pluralsight profile
const platformUrl2   = 'FILL_learningPlatformUrl2';  // e.g. Microsoft Learn transcript

// ─── FILL: Summary ────────────────────────────────────────────────────────────
// 3–4 sentences. Open with role + years. Cert status sentence 2. Differentiator sentence 3.
const summary = 'FILL_summary_paragraph';

// ─── FILL: Skills — 5–6 categories, most ATS-recognisable keyword first ──────
const skillCategories = [
  { label: 'FILL_Category_1', skills: 'FILL_skills_1' },
  { label: 'FILL_Category_2', skills: 'FILL_skills_2' },
  { label: 'FILL_Category_3', skills: 'FILL_skills_3' },
  { label: 'FILL_Category_4', skills: 'FILL_skills_4' },
  { label: 'FILL_Category_5', skills: 'FILL_skills_5' },
  // { label: 'FILL_Category_6', skills: 'FILL_skills_6' }, // uncomment if needed
];

// ─── FILL: Experience — reverse chronological ─────────────────────────────────
// Bullet count rules: most recent client role = 5–6 · others = 3–4 · oldest = 2
// Set company: '' for self-directed / portfolio roles (suppresses the | separator)
const experience = [
  {
    title:   'FILL_Job_Title',
    company: '',    // '' = self-directed; 'Company, City, Province' = employed
    dates:   'FILL_Month YYYY – Present',
    bullets: [
      'FILL_bullet_1',
      'FILL_bullet_2',
      'FILL_bullet_3',
    ],
  },
  {
    title:   'FILL_Job_Title',
    company: 'FILL_Company, FILL_City, FILL_Province',
    dates:   'FILL_Month YYYY – FILL_Month YYYY',
    bullets: [
      'FILL_bullet_1 — lead with metric or outcome in first 6 words',
      'FILL_bullet_2',
      'FILL_bullet_3',
      'FILL_bullet_4',
      'FILL_bullet_5',
    ],
  },
  // Add remaining roles — oldest role: 2 bullets max
];

// ─── FILL: Education ─────────────────────────────────────────────────────────
const educationItems = [
  'FILL_Degree – FILL_School, FILL_City',
  'FILL_Degree – FILL_School, FILL_City',
];

// ─── FILL: Certs — use exact strings from profile-facts.md ───────────────────
const cert1Name      = 'FILL_Cert_1_Name';
const cert1Status    = 'FILL_Status';    // e.g. 'Certified — April 2026'
const cert2Name      = 'FILL_Cert_2_Name';
const cert2Status    = 'FILL_Status';    // e.g. 'In progress (target 2026)'
const platform1Name  = 'FILL_Platform';  // e.g. 'Pluralsight'
const platform1Summary = 'FILL_N courses, N labs completed across [areas]';
const platform2Name  = 'FILL_Platform2'; // e.g. 'Microsoft Learn'

// ════════════════════════════════════════════════════════════════════════════
// DO NOT EDIT BELOW — format constants, helpers, document structure
// ════════════════════════════════════════════════════════════════════════════

const BLUE           = '2E6DA4';
const MARGIN_TOP_BOT = 720;     // 0.5"
const MARGIN_SIDES   = 1080;    // 0.75"
const CONTENT_WIDTH  = 12240 - (MARGIN_SIDES * 2);

const sp  = (before, after) => ({ before, after, line: 240, lineRule: 'auto' });
const run = (text, size, bold = false, italic = false, color = '000000') =>
  new TextRun({ text, font: 'Carlito', size, bold, italics: italic, color });

function sectionHeading(text) {
  return new Paragraph({
    spacing: sp(160, 0),
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 1 } },
    children: [run(text, 22, true, false, BLUE)],
  });
}

function headingContentSpacer() {
  return new Paragraph({ spacing: sp(0, 60), children: [run('', 20)] });
}

function sectionSpacer() {
  return new Paragraph({ spacing: sp(0, 0), children: [run('', 20)] });
}

function skillLine(label, skills) {
  return new Paragraph({
    spacing: sp(0, 45),
    children: [run(label + ': ', 20, true), run(skills, 20)],
  });
}

function jobHeader(title, company, dates) {
  const leftText = company ? `${title} | ${company}` : title;
  return new Paragraph({
    spacing: sp(60, 0),
    keepNext: true,
    tabStops: [{ type: TabStopType.RIGHT, position: CONTENT_WIDTH }],
    children: [
      run(leftText, 21, true),
      new TextRun({ text: '\t', font: 'Carlito', size: 21 }),
      run(dates, 20, false, true),
    ],
  });
}

function jobSpacer() {
  return new Paragraph({ spacing: sp(60, 0), keepNext: true, children: [run('', 20)] });
}

function buildExperience(jobs) {
  const paras = [];
  jobs.forEach((job, i) => {
    if (i > 0) paras.push(jobSpacer());
    paras.push(jobHeader(job.title, job.company, job.dates));
    job.bullets.forEach((b, bi) => {
      const isLast = bi === job.bullets.length - 1;
      paras.push(new Paragraph({
        spacing: sp(0, 30),
        indent: { left: 360, hanging: 200 },
        keepNext: !isLast,
        children: [run('\u2022  ' + b, 20)],
      }));
    });
  });
  return paras;
}

function certBullet(text) {
  return new Paragraph({
    spacing: sp(0, 40),
    indent: { left: 360, hanging: 200 },
    children: [run('\u2022  ' + text, 20)],
  });
}

const doc = new Document({
  sections: [{
    properties: {
      page: {
        size: { width: 12240, height: 15840 },
        margin: {
          top:    MARGIN_TOP_BOT,
          bottom: MARGIN_TOP_BOT,
          left:   MARGIN_SIDES,
          right:  MARGIN_SIDES,
        },
      },
    },
    children: [

      // ── NAME ─────────────────────────────────────────────────────────────
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: sp(0, 30),
        children: [run(name, 32, true)],
      }),

      // ── TAGLINE ──────────────────────────────────────────────────────────
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: sp(0, 30),
        children: [run(tagline, 20)],
      }),

      // ── CONTACT — centered, bottom border ────────────────────────────────
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: sp(0, 0),
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888', space: 2 } },
        children: [run(`${email}  |  ${phone}  |  ${linkedin}  |  ${github}`, 19)],
      }),

      // ── PROFESSIONAL SUMMARY ─────────────────────────────────────────────
      sectionSpacer(),
      sectionHeading('PROFESSIONAL SUMMARY'),
      headingContentSpacer(),
      new Paragraph({ spacing: sp(60, 80), children: [run(summary, 21)] }),

      // ── TECHNICAL SKILLS ─────────────────────────────────────────────────
      sectionSpacer(),
      sectionHeading('TECHNICAL SKILLS'),
      headingContentSpacer(),
      ...skillCategories.map(c => skillLine(c.label, c.skills)),

      // ── PROFESSIONAL EXPERIENCE ──────────────────────────────────────────
      sectionSpacer(),
      sectionHeading('PROFESSIONAL EXPERIENCE'),
      headingContentSpacer(),
      ...buildExperience(experience),

      // ── EDUCATION ────────────────────────────────────────────────────────
      sectionSpacer(),
      sectionHeading('EDUCATION'),
      headingContentSpacer(),
      ...educationItems.map(e => new Paragraph({
        spacing: sp(0, 40),
        indent: { left: 360, hanging: 200 },
        children: [run('\u2022  ' + e, 20)],
      })),

      // ── CERTIFICATIONS ───────────────────────────────────────────────────
      sectionSpacer(),
      new Paragraph({ spacing: sp(0, 40), children: [] }),
      sectionHeading('CERTIFICATIONS'),
      headingContentSpacer(),
      certBullet(`${cert1Name} — ${cert1Status}`),
      certBullet(`${cert2Name} — ${cert2Status}`),
      certBullet(`${platform1Name}: ${platformUrl1} — ${platform1Summary}`),
      new Paragraph({
        spacing: sp(0, 40),
        indent: { left: 360, hanging: 200 },
        children: [run(`\u2022  ${platform2Name}: ${platformUrl2}`, 19)],
      }),

    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUTPUT_PATH, buf);
  console.log('General resume written:', OUTPUT_PATH);
});
