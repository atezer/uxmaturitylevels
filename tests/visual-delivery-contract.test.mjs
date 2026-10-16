import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const prompt = await readFile(new URL('../PROMPT.md', import.meta.url), 'utf8');

test('visual delivery contract requires reference-to-report requirements mapping before render', () => {
  assert.match(prompt, /RELEASE-BLOCKING VISUAL DELIVERY CONTRACT — REFERENCE PARITY AND DATA TRACEABILITY/);
  assert.match(prompt, /Build a visual requirements manifest before rendering/);
  assert.match(prompt, /exact source report section\/data fields that will populate it/);
  assert.match(prompt, /expected fallback when its source data is missing/);
});

test('reference parity cannot be replaced by a short summary or copied reference data', () => {
  assert.match(prompt, /Do not silently reduce a multi-section reference to a short summary infographic/);
  assert.match(prompt, /Never copy reference-person claims, scores, role labels, benchmark values, or unsupported categories/);
  assert.match(prompt, /A visual that contains correct data but omits most of the reference's relevant sections or visual modules is still a failed deliverable/);
});

test('canonical dataset is the only source of visible assessment values', () => {
  assert.match(prompt, /Create one canonical structured data object from the final written report and Section 13 dataset/);
  assert.match(prompt, /Every visible label, value, score, profile hypothesis, date, evidence status, insight, roadmap item, and benchmark state must map to that object/);
  assert.match(prompt, /Null, missing, unsupported, and not-applicable values must remain distinct/);
  assert.match(prompt, /Keep assessment logic separate from layout\/rendering logic/);
});

test('dense data should use deterministic rendering rather than image-model text composition', () => {
  assert.match(prompt, /prefer a deterministic HTML\/SVG or equivalent template renderer/);
  assert.match(prompt, /Do not rely on an image-generation model to accurately typeset long passages, tables, exact scores, or all required sections/);
});

test('visual acceptance is conjunctive and failures block delivery', () => {
  for (const expected of [
    'All applicable reference modules have a mapped destination',
    'All required DMI sections and all eight competency domains are present',
    'The visible content and values are traceable to the written report',
    'The actual final image has been opened and inspected',
    'the file is the requested real format and can be decoded',
    'Any FAIL in items 1–8 blocks delivery',
    'Any UNVERIFIED item must be disclosed'
  ]) assert.ok(prompt.toLowerCase().includes(expected.toLowerCase()), 'missing acceptance criterion: ' + expected);
});


test('Career Radar is release-blocking across written report, canonical data, and both visual formats', () => {
  assert.match(prompt, /RELEASE-BLOCKING RULE — CAREER RADAR MUST SURVIVE THE REPORT-TO-VISUAL PIPELINE/);
  assert.match(prompt, /Career Radar & Mentorship Synthesis/);
  assert.match(prompt, /Written-report completeness gate/);
  assert.match(prompt, /Canonical-data and visual mapping gate/);
  assert.match(prompt, /Release-blocking acceptance checks/);
  for (const expected of [
    'past, present, near-future, and long-term career horizons',
    'current market research with dated citations',
    'an evidence ledger that separates direct evidence, inference, unknowns',
    'a side-by-side comparison using the same decision criteria',
    'best-supported next step, most personally aligned direction, and highest-uncertainty/highest-learning experiment',
    'falsifiable 30–90-day career experiments',
    'dedicated **Career Radar / Career Direction** module',
    'a compact scenario matrix, evidence-led trajectory, or clearly structured editorial section',
    'Never substitute one for the other',
    'Any failed check blocks declaring the assessment or visual deliverable complete'
  ]) assert.ok(prompt.includes(expected), 'missing Career Radar release requirement: ' + expected);
  assert.match(prompt, /Career Radar is not confused with the eight-domain competency radar chart/);
  assert.match(prompt, /actual JPG\/HTML artifact contains a readable Career Radar module/);
});
