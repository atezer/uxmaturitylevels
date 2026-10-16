import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const prompt = await readFile(new URL('../PROMPT.md', import.meta.url), 'utf8');
const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');
const scenarios = await readFile(new URL('../PROFILE_CLASSIFICATION_TESTS.md', import.meta.url), 'utf8');

test('canonical prompt preserves the 15-section report and both visual choices', () => {
  for (let i = 1; i <= 15; i++) {
    assert.match(prompt, new RegExp('## Section ' + i + ' —'));
  }
  assert.match(prompt, /A — JPG infographic/);
  assert.match(prompt, /B — interactive HTML dashboard/);
  assert.match(prompt, /same canonical dataset is the source of truth for either visual output/);
});

test('profile and maturity remain independent and evidence-gated', () => {
  assert.match(prompt, /Professional profile and maturity level are separate outputs/);
  assert.match(prompt, /Maturity-level calibration rubric \(decision anchors\)/);
  assert.match(prompt, /Level 4 requires at least one concrete example of implemented systemic work/);
  assert.match(prompt, /Level 5 requires evidence of sustained adoption, repeatability, organizational influence, and impact/);
  assert.match(prompt, /score never overrides a missing evidence gate/);
  assert.match(prompt, /Treat missing evidence as \*\*unknown\*\*/);
});

test('qualitative calibration coverage includes ten distinct scenarios', () => {
  const headings = [...scenarios.matchAll(/^## (\d+)\./gm)].map(match => Number(match[1]));
  assert.deepEqual(headings, [1,2,3,4,5,6,7,8,9,10]);
  for (const expected of [
    'Craft & Interaction Designer',
    'Research-led Designer',
    'Product-oriented Designer',
    'Systems & DesignOps Designer',
    'Technical Design Architect',
    'AI & Automation Innovator',
    'Design Leader & Facilitator',
    'Hybrid / Emerging profile'
  ]) assert.ok(scenarios.includes(expected), 'missing profile scenario signal: ' + expected);
  assert.match(scenarios, /Strategic vocabulary only/);
  assert.match(scenarios, /Proposals are not treated as implementation, adoption, or impact/);
});

test('README agrees with the prompt and clearly labels validation limits', () => {
  assert.match(readme, /interactive HTML dashboard \(B\)/);
  assert.match(readme, /JPG infographic \(A\)/);
  assert.match(readme, /do \*\*not\*\* run an AI model/);
  assert.match(readme, /legacy six-level checklist/);
});


test('maturity calibration remains provisional and score bands cannot bypass evidence gates', () => {
  assert.match(readme, /maturity-level score bands are only orientation guidance/i);
  assert.match(prompt, /These are assessment guidelines, not industry benchmarks\./);
  assert.match(prompt, /score never overrides a missing evidence gate/);
  assert.match(prompt, /Treat missing evidence as \*\*unknown\*\*/);
  assert.match(readme, /not a psychometric test, formal HR certification, or independently validated industry benchmark/);
});

test('visual standards are consolidated and keep A/B outputs data-consistent', () => {
  assert.equal((readme.match(/^## (?:Default JPG visual style|Permanent default JPG style|Reliable JPG generation|Visual output standards)$/gm) || []).length, 1);
  assert.match(readme, /A — JPG infographic/);
  assert.match(readme, /B — Interactive HTML dashboard/);
  assert.match(readme, /single source of truth/);
  assert.match(readme, /genuinely converted to JPEG/);
  assert.match(readme, /Reference imagery may guide \*\*visual style only\*\*/);
});

test('legacy checklist is explicitly independent of DMI maturity scoring', () => {
  assert.match(readme, /separate legacy six-level checklist/);
  assert.match(readme, /do not map to DMI's five-level model/);
});


test('visual-generation prompt defines pre-flight and a single canonical data contract', () => {
  assert.match(prompt, /ADDITIONAL MANDATORY RULE — PRE-FLIGHT, DATA CONTRACT, AND FAILURE-SAFE VISUAL QA/);
  assert.match(prompt, /Create a compact internal requirements matrix/);
  assert.match(prompt, /Use one canonical data object derived from the completed written report and Section 13 final numerical dataset/);
  assert.match(prompt, /Never coerce null, missing, or not-applicable values to zero/);
  assert.match(prompt, /Keep rendering logic separate from assessment logic/);
});

test('missing evidence has a graceful visual fallback without fabricated scores', () => {
  assert.match(prompt, /Missing scores must not produce fabricated charts/);
  assert.match(prompt, /replace the chart area with a clear evidence map or competency overview/);
  assert.match(prompt, /Show a target series only when supported by the canonical dataset/);
  assert.match(prompt, /Do not remove required report sections merely because numeric data is incomplete/);
});

test('visual QA covers failure cases and forbids unverified success claims', () => {
  for (const expected of [
    'Fully populated, valid assessment data',
    'All competency scores missing or null',
    'Partially populated competency scores',
    'Unsupported or missing target values',
    'Conflict between the written report and final numerical dataset',
    'Legacy/reference values attempting to appear in the current output',
    'Turkish characters and punctuation',
    'Text overflow, clipping, overlap, and small labels',
    'Renderer or image-conversion failure',
    'Correct output type for the selected option'
  ]) assert.ok(prompt.includes(expected), 'missing visual validation scenario: ' + expected);
  assert.match(prompt, /Do not claim that tests passed unless they were actually run/);
  assert.match(prompt, /Do not claim 100% correctness/);
  assert.match(prompt, /If a check cannot be performed, mark it unverified and disclose why/);
});


test('individual DMI subject and exact eight-domain taxonomy are release-blocking', () => {
  const domains = [
    'Design Strategy & Systems Thinking',
    'User Research & Experience Quality',
    'Product Thinking & Business Impact',
    'Interaction & Visual Design',
    'Design Systems & DesignOps',
    'Technical & Delivery Capability',
    'AI, Automation & Innovation',
    'Leadership, Communication & Mentorship'
  ];
  const correction = prompt.slice(prompt.lastIndexOf('# CRITICAL CORRECTION — INDIVIDUAL DMI, NOT CORPORATE UX MATURITY'));
  assert.ok(correction.length > 0, 'missing authoritative individual-DMI correction');
  assert.match(correction, /assessment of an individual designer's professional maturity/i);
  assert.match(correction, /It is NOT:/);
  assert.match(correction, /Never assess or visualize the maturity of a company, department, team, design organization, or UX function/i);
  assert.match(correction, /Use the exact eight individual DMI domains, in this order, everywhere in the assessment and visual/i);
  for (const domain of domains) {
    assert.ok(correction.includes(domain), 'missing required individual competency domain: ' + domain);
  }
  for (const forbidden of [
    'Bütçe ve Kaynaklar',
    'Organizasyonel Yapı',
    'Yetenek ve Ekip Gelişimi',
    'UX Süreçleri ve Yöntemler'
  ]) {
    assert.ok(correction.includes(forbidden), 'missing corporate-category regression sentinel: ' + forbidden);
  }
  assert.match(correction, /This regression test is release-blocking for both JPG and HTML/i);
});

test('visual deliverable cannot be declared complete without actual artifact QA', () => {
  assert.match(prompt, /Do not claim that tests passed unless they were actually run/i);
  assert.match(prompt, /If a check cannot be performed, mark it unverified and disclose why/i);
  assert.match(prompt, /inspect the actual final image/i);
  assert.match(prompt, /A PNG must be genuinely converted to JPEG/i);
  assert.match(prompt, /Correct output type for the selected option/i);
});
