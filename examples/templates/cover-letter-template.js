/**
 * Cover Letter Template
 * Matches the standard resume format for a consistent application package.
 * Format: centered header · blue ALL CAPS sections · round bullets · 1 page
 *
 * Fill all // FILL: sections. Do NOT change BLUE, margins, or helpers.
 * Output: ./output/YourName_CoverLetter_CompanyName.docx
 */

const {
  Document, Packer, Paragraph, TextRun, BorderStyle, AlignmentType
} = require('docx');
const fs = require('fs');

// ─── FILL: Output path ───────────────────────────────────────────────────────
const OUTPUT_PATH = '/mnt/user-data/outputs/YourName_CoverLetter_CompanyName.docx';

// ─── FILL: Contact info — copy exactly from Resume_Snapshot.md ───────────────
const name     = 'YOUR NAME';   // ALL CAPS
const tagline  = 'FILL_Tagline';    // match resume tagline for this application
const email    = 'FILL_email';
const phone    = 'FILL_phone';      // with parentheses: (204) 951-7816
const linkedin = 'FILL_linkedinUrl';
const github   = 'FILL_githubUrl';

// ─── FILL: Letter metadata ───────────────────────────────────────────────────
const date   = 'FILL_Month DD, YYYY';           // e.g. 'April 19, 2026'
const reLine = 'FILL_Re: [Role] — [Company]';   // e.g. 'Re: Senior .NET Developer — Acme Corp'

// ─── FILL: Hook paragraph ────────────────────────────────────────────────────
// 1–2 sentences. Lead with strongest match. Name role + company. NOT "I am writing…"
const hookText = 'FILL_hook_paragraph_text';

// ─── FILL: WHAT I BRING bullets (4–6 items) ──────────────────────────────────
// Each: { label: 'Bold label', body: 'plain body text.' }  Max 2 lines each.
const bringItems = [
  { label: 'FILL_Label_1', body: 'FILL_body_1' },
  { label: 'FILL_Label_2', body: 'FILL_body_2' },
  { label: 'FILL_Label_3', body: 'FILL_body_3' },
  { label: 'FILL_Label_4', body: 'FILL_body_4' },
  // { label: 'FILL_Label_5', body: 'FILL_body_5' },  // uncomment if needed
];

// ─── FILL: TWO RELEVANT HIGHLIGHTS (exactly 2) ───────────────────────────────
// Each: { label: 'Employer (tenure)', body: 'specific concrete detail.' }
const highlights = [
  { label: 'FILL_Employer_1 (FILL_tenure)', body: 'FILL_detail_1' },
  { label: 'FILL_Employer_2 (FILL_tenure)', body: 'FILL_detail_2' },
];

// ─── FILL: Closing paragraph ─────────────────────────────────────────────────
// 2 sentences: specific company/role interest + direct CTA.
const closingText = 'FILL_closing_paragraph_text';

// ════════════════════════════════════════════════════════════════════════════
// DO NOT EDIT BELOW — shared format constants, helpers, document structure
// ════════════════════════════════════════════════════════════════════════════

const BLUE           = '2E6DA4';   // matches resume section heading color
const MARGIN_TOP_BOT = 720;        // 0.5" — matches resume
const MARGIN_SIDES   = 1080;       // 0.75" — matches resume

const sp  = (before, after) => ({ before, after, line: 240, lineRule: 'auto' });
const run = (text, size, bold = false, italic = false, color = '000000') =>
  new TextRun({ text, font: 'Carlito', size, bold, italics: italic, color });

const blueBorder = {
  bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE, space: 1 },
};

// ALL CAPS blue section heading — matches resume exactly
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

// Round bullet with bold label — matches resume bullet style, adds bold label for cover letter
function bulletPara(label, body) {
  return new Paragraph({
    spacing: sp(0, 50),
    indent: { left: 360, hanging: 200 },
    children: [
      run('\u2022  ', 21),
      run(label + ': ', 21, true),
      run(body, 21),
    ],
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

      // ── NAME — centered, bold, ALL CAPS — matches resume ─────────────────
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: sp(0, 30),
        children: [run(name, 32, true)],
      }),

      // ── TAGLINE — centered — matches resume ───────────────────────────────
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: sp(0, 30),
        children: [run(tagline, 20)],
      }),

      // ── CONTACT — centered, bottom border — matches resume ────────────────
      new Paragraph({
        alignment: AlignmentType.CENTER,
        spacing: sp(0, 0),
        border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '888888', space: 2 } },
        children: [run(`${email}  |  ${phone}  |  ${linkedin}  |  ${github}`, 19)],
      }),

      // ── DATE ─────────────────────────────────────────────────────────────
      new Paragraph({ spacing: sp(160, 40), children: [run(date, 21)] }),

      // ── RE: LINE ─────────────────────────────────────────────────────────
      new Paragraph({ spacing: sp(0, 120), children: [run(reLine, 21, true)] }),

      // ── HOOK ─────────────────────────────────────────────────────────────
      new Paragraph({ spacing: sp(0, 0), children: [run(hookText, 21)] }),

      // ── WHAT I BRING ─────────────────────────────────────────────────────
      sectionSpacer(),
      sectionHeading('WHAT I BRING'),
      headingContentSpacer(),
      ...bringItems.map(i => bulletPara(i.label, i.body)),

      // ── TWO RELEVANT HIGHLIGHTS ───────────────────────────────────────────
      sectionSpacer(),
      sectionHeading('TWO RELEVANT HIGHLIGHTS'),
      headingContentSpacer(),
      ...highlights.map(i => bulletPara(i.label, i.body)),

      // ── CLOSING ──────────────────────────────────────────────────────────
      sectionSpacer(),
      new Paragraph({ spacing: sp(0, 0), children: [run(closingText, 21)] }),

      // ── SIGN-OFF ─────────────────────────────────────────────────────────
      new Paragraph({ spacing: sp(120, 40), children: [run('Sincerely,', 21)] }),
      new Paragraph({ spacing: sp(120, 0),  children: [run(name, 21)] }),

    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUTPUT_PATH, buf);
  console.log('Cover letter written:', OUTPUT_PATH);
});
