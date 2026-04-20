/**
 * Resume Template — JD-tailored version
 * Generates an ATS-safe DOCX resume from structured JavaScript data.
 *
 * Format: centered header · blue ALL CAPS section headings · round bullets
 *         right-tab italic dates · page-2 header · natural page flow
 *
 * Fill all // FILL: sections. Do NOT change BLUE, margins, or helpers.
 *
 * Page limits: 1–2 pages. Trim in this order if over 2 pages:
 *   1. Oldest role — keep 2 JD-relevant bullets
 *   2. Short-tenure roles — keep 2 bullets
 *   3. Tighten bullet spacing on oldest 2 roles only
 *   4. Body font: 20 → 19 hp (never below 19 body)
 *   5. Skills: remove categories with no JD match
 */

const {
  Document, Packer, Paragraph, TextRun, BorderStyle,
  TabStopType, AlignmentType, Header
} = require('docx');
const fs = require('fs');

// ─── FILL: Output path ───────────────────────────────────────────────────────
const OUTPUT_PATH = './output/YourName_Resume_CompanyName.docx';

// ─── FILL: Contact info ───────────────────────────────────────────────────────
const name        = 'YOUR NAME';              // ALL CAPS
const tagline     = 'FILL_Tagline';           // e.g. 'Senior .NET Developer | C# · ASP.NET Core · Azure'
const email       = 'FILL_email';
const phone       = 'FILL_phone';
const linkedin    = 'FILL_linkedinUrl';
const github      = 'FILL_githubUrl';
const pluralsight = 'FILL_pluralsightUrl';    // or remove if not applicable
const mslearn     = 'FILL_mslearnUrl';        // or remove if not applicable

// ─── FILL: Summary (2 lines — JD-tailored) ───────────────────────────────────
// Line 1: Exact JD role title + 2–3 ATS keywords + years experience + domain
// Line 2: Cert status + strongest differentiator for this JD
const summary = [
  'FILL_summary_line_1',
  'FILL_summary_line_2',
];

// ─── FILL: Skills — ordered by JD relevance, ATS keywords first ──────────────
// Mirror JD phrasing exactly. Remove irrelevant categories.
// Lead each list with the most JD-recognizable keyword.
const skillCategories = [
  { label: 'FILL_Category_1', skills: 'FILL_skills_1' },
  { label: 'FILL_Category_2', skills: 'FILL_skills_2' },
  { label: 'FILL_Category_3', skills: 'FILL_skills_3' },
  { label: 'FILL_Category_4', skills: 'FILL_skills_4' },
  // 5–7 categories max
];

// ─── FILL: Experience — reverse chronological, bullets reordered by JD ───────
// Most JD-relevant bullet goes first within each role.
// Use company: '' for self-directed roles (omits the | separator).
const experience = [
  {
    title:   'FILL_Job_Title',
    company: 'FILL_Company, FILL_City, FILL_Province',
    dates:   'FILL_Month YYYY – FILL_Month YYYY',
    bullets: [
      'FILL_bullet_1',
      'FILL_bullet_2',
      'FILL_bullet_3',
    ],
  },
  {
    title:   'FILL_Job_Title_2',
    company: 'FILL_Company_2, FILL_City, FILL_Province',
    dates:   'FILL_Month YYYY – FILL_Month YYYY',
    bullets: [
      'FILL_bullet_1',
      'FILL_bullet_2',
    ],
  },
];

// ─── FILL: Education ─────────────────────────────────────────────────────────
const educationItems = [
  'FILL_Degree – FILL_School, FILL_City',
  'FILL_Degree – FILL_School, FILL_City',
];

// ─── FILL: Cert status ────────────────────────────────────────────────────────
const cert1Status        = 'FILL_cert_status';     // e.g. 'Certified — April 2026'
const cert2Status        = 'FILL_cert_status';     // e.g. 'In progress (target 2026)'
const learningPlatform   = 'FILL_N courses, N labs completed (all 100%) across [areas]';

// ════════════════════════════════════════════════════════════════════════════
// DO NOT EDIT BELOW — shared format constants, helpers, document structure
// ════════════════════════════════════════════════════════════════════════════

const BLUE           = '2E6DA4';
const MARGIN_TOP_BOT = 720;
const MARGIN_SIDES   = 1080;
const CONTENT_WIDTH  = 12240 - (MARGIN_SIDES * 2);

const sp  = (before, after) => ({ before, after, line: 240, lineRule: 'auto' });
const run = (text, size, bold = false, italic = false, color = '000000') =>
  new TextRun({ text, font: 'Carlito', size, bold, italics: italic, color });

const blueBorder = {
  bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 1 },
};

function sectionHeading(text) {
  return new Paragraph({
    spacing: sp(160, 0),
    border: blueBorder,
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

function summaryLine(text) {
  return new Paragraph({
    spacing: sp(0, 50),
    children: [run(text, 21)],
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

const doc = new Document({
  sections: [{
    properties: {
      titlePage: true,
      page: {
        size: { width: 12240, height: 15840 },
        margin: {
          top:    MARGIN_TOP_BOT,
          bottom: MARGIN_TOP_BOT,
          left:   MARGIN_SIDES,
          right:  MARGIN_SIDES,
          header: 360,
        },
      },
    },
    headers: {
      first:   new Header({ children: [new Paragraph({ children: [] })] }),
      default: new Header({
        children: [
          new Paragraph({
            spacing: { before: 0, after: 60, line: 240, lineRule: 'auto' },
            border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888', space: 2 } },
            children: [run(`${name}  |  ${email}  |  ${phone}  |  ${linkedin}  |  ${github}`, 18)],
          }),
        ],
      }),
    },
    children: [

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: sp(0, 30),
        children: [run(name, 32, true)],
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: sp(0, 30),
        children: [run(tagline, 20)],
      }),

      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: sp(0, 0),
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888', space: 2 } },
        children: [run(`${email}  |  ${phone}  |  ${linkedin}  |  ${github}`, 19)],
      }),

      sectionSpacer(),
      sectionHeading('PROFESSIONAL SUMMARY'),
      headingContentSpacer(),
      ...summary.map(line => summaryLine(line)),

      sectionSpacer(),
      sectionHeading('TECHNICAL SKILLS'),
      headingContentSpacer(),
      ...skillCategories.map(c => skillLine(c.label, c.skills)),

      sectionSpacer(),
      sectionHeading('PROFESSIONAL EXPERIENCE'),
      headingContentSpacer(),
      ...buildExperience(experience),

      sectionSpacer(),
      sectionHeading('EDUCATION'),
      headingContentSpacer(),
      ...educationItems.map(e => new Paragraph({
        spacing: sp(0, 30),
        indent: { left: 360, hanging: 200 },
        children: [run('\u2022  ' + e, 20)],
      })),

      sectionSpacer(),
      sectionHeading('CERTIFICATIONS'),
      headingContentSpacer(),
      // Update cert labels to match your actual certifications
      new Paragraph({ spacing: sp(0, 30), indent: { left: 360, hanging: 200 },
        children: [run('\u2022  [Cert 1 Name] \u2014 ' + cert1Status, 20)] }),
      new Paragraph({ spacing: sp(0, 30), indent: { left: 360, hanging: 200 },
        children: [run('\u2022  [Cert 2 Name] \u2014 ' + cert2Status, 20)] }),
      new Paragraph({ spacing: sp(0, 30), indent: { left: 360, hanging: 200 },
        children: [run('\u2022  [Learning Platform]: ' + pluralsight + ' \u2014 ' + learningPlatform, 20)] }),

    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUTPUT_PATH, buf);
  console.log('Resume written:', OUTPUT_PATH);
});
