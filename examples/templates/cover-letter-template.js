/**
 * Cover Letter Template — JD-tailored version
 * Generates an ATS-safe DOCX cover letter from structured JavaScript data.
 *
 * Format: centered header · blue ALL CAPS section headings · round bullets
 *         bold labels · 1 page strict
 *
 * Fill all // FILL: sections. Do NOT change BLUE, margins, or helpers.
 */

const {
  Document, Packer, Paragraph, TextRun, BorderStyle, AlignmentType
} = require('docx');
const fs = require('fs');

// ─── FILL: Output path ───────────────────────────────────────────────────────
const OUTPUT_PATH = './output/YourName_CoverLetter_CompanyName.docx';

// ─── FILL: Contact info ───────────────────────────────────────────────────────
const name     = 'YOUR NAME';    // ALL CAPS
const tagline  = 'FILL_Tagline'; // match resume tagline for this application
const email    = 'FILL_email';
const phone    = 'FILL_phone';
const linkedin = 'FILL_linkedinUrl';
const github   = 'FILL_githubUrl';

// ─── FILL: Letter metadata ───────────────────────────────────────────────────
const date   = 'FILL_Month DD, YYYY';           // e.g. 'April 20, 2026'
const reLine = 'FILL_Re: [Role] — [Company]';   // e.g. 'Re: Senior .NET Developer — Acme Corp'

// ─── FILL: Hook paragraph ────────────────────────────────────────────────────
// 1–2 sentences. Lead with strongest match to top JD requirement.
// Name the role and company. Do NOT start with "I am writing to apply…"
const hookText = 'FILL_hook_paragraph_text';

// ─── FILL: WHAT I BRING bullets (4–6 items) ──────────────────────────────────
// Each: { label: 'Bold label', body: 'plain body text.' }
// Max 2 lines each. Lead label with the exact ATS keyword from the JD.
const bringItems = [
  { label: 'FILL_Label_1', body: 'FILL_body_1' },
  { label: 'FILL_Label_2', body: 'FILL_body_2' },
  { label: 'FILL_Label_3', body: 'FILL_body_3' },
  { label: 'FILL_Label_4', body: 'FILL_body_4' },
  // { label: 'FILL_Label_5', body: 'FILL_body_5' }, // uncomment if needed
];

// ─── FILL: TWO RELEVANT HIGHLIGHTS (exactly 2) ───────────────────────────────
// Each: { label: 'Employer (tenure)', body: 'specific concrete detail.' }
// These are your two most relevant employers for this specific JD.
const highlights = [
  { label: 'FILL_Employer_1 (FILL_tenure)', body: 'FILL_detail_1' },
  { label: 'FILL_Employer_2 (FILL_tenure)', body: 'FILL_detail_2' },
];

// ─── FILL: Closing paragraph ─────────────────────────────────────────────────
// 2 sentences: specific company/role interest + direct CTA.
// Tone: enterprise = formal, startup = direct.
const closingText = 'FILL_closing_paragraph_text';

// ════════════════════════════════════════════════════════════════════════════
// DO NOT EDIT BELOW — shared format constants, helpers, document structure
// ════════════════════════════════════════════════════════════════════════════

const BLUE           = '2E6DA4';
const MARGIN_TOP_BOT = 720;
const MARGIN_SIDES   = 1080;

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

      new Paragraph({ spacing: sp(160, 40), children: [run(date, 21)] }),
      new Paragraph({ spacing: sp(0, 120), children: [run(reLine, 21, true)] }),
      new Paragraph({ spacing: sp(0, 0), children: [run(hookText, 21)] }),

      sectionSpacer(),
      sectionHeading('WHAT I BRING'),
      headingContentSpacer(),
      ...bringItems.map(i => bulletPara(i.label, i.body)),

      sectionSpacer(),
      sectionHeading('TWO RELEVANT HIGHLIGHTS'),
      headingContentSpacer(),
      ...highlights.map(i => bulletPara(i.label, i.body)),

      sectionSpacer(),
      new Paragraph({ spacing: sp(0, 0), children: [run(closingText, 21)] }),

      new Paragraph({ spacing: sp(120, 40), children: [run('Sincerely,', 21)] }),
      new Paragraph({ spacing: sp(120, 0),  children: [run(name, 21)] }),

    ],
  }],
});

Packer.toBuffer(doc).then(buf => {
  fs.writeFileSync(OUTPUT_PATH, buf);
  console.log('Cover letter written:', OUTPUT_PATH);
});
