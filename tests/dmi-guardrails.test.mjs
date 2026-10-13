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
