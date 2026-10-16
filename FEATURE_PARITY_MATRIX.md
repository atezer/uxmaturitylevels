# DMI Feature-Parity and Regression Audit

This file is the repository's feature-preservation checklist. Update it whenever a feature is added, changed, deprecated, or removed. A feature is not considered verified merely because its prompt instruction exists.

## Verification vocabulary

- **Prompt contract:** the canonical prompt requires the feature.
- **Structural test:** automated checks confirm required instructions/sections remain in repository files.
- **Runtime verification:** a real assessment or artifact was produced and inspected.
- **Not verified by CI:** the structural test does not execute an LLM, render a JPG, or browser-test HTML.

## Canonical feature inventory

| Feature / invariant | Canonical source | Regression protection | What CI can establish | What still needs runtime verification |
|---|---|---|---|---|
| Individual designer assessment, never corporate UX maturity | `PROMPT.md`, critical individual-DMI correction | `tests/dmi-guardrails.test.mjs` | Exact eight-domain taxonomy and anti-corporate-category sentinels remain | Generated report and image use individual-level language/categories |
| Two-stage sequence: complete report first, then ask A/B | `PROMPT.md` Sections 2, 8, 11–12 | `tests/dmi-guardrails.test.mjs` | Required sections and both output choices remain | Model completes every section before asking |
| All 15 written-report sections | `PROMPT.md` Section 8 | `tests/dmi-guardrails.test.mjs` | Section markers remain | Actual run contains complete, substantive sections |
| Evidence classes, confidence, uncertainty, no invented proof | `PROMPT.md` Sections 3, 6–7 and guardrails | `tests/dmi-guardrails.test.mjs` | Core evidence and maturity gates remain | Scores and claims are supported in a real assessment |
| Thinking / Execution / Impact for eight domains | `PROMPT.md` Sections 5–7 | `tests/dmi-guardrails.test.mjs` | Taxonomy and scoring guardrails remain | Actual values are evidence-based and correctly calculated |
| Separate maturity level and professional profile | `PROMPT.md` Section 7A | `tests/dmi-guardrails.test.mjs`, `PROFILE_CLASSIFICATION_TESTS.md` | Classification guardrails and ten qualitative scenarios remain | Model classifies accurately on new cases |
| Career Radar, market signals, scenario matrix, mentorship and experiments | `PROMPT.md` Section 9 and Career Radar release-blocking rule | `tests/visual-delivery-contract.test.mjs` | Required Career Radar contract remains in prompt | Written report, canonical data and final visual contain the supported findings |
| Personal development priorities and multi-horizon roadmap | `PROMPT.md` Sections 8, 9, 14–15 | Section and feature-parity tests | Instructions remain present | Plan is specific, coherent and usable |
| Longitudinal reassessment without fabricated history | `PROMPT.md` Section 14 | Prompt structural checks | Continuity rule remains | Prior snapshots are actually compared when supplied |
| JPG style, personal identity, data consistency and true JPEG | `PROMPT.md` Section 13 and visual delivery contract | `tests/dmi-guardrails.test.mjs`, `tests/visual-delivery-contract.test.mjs` | Rendering and acceptance rules remain | New artifact exists, opens, is readable, matches data and is genuine JPEG |
| Interactive HTML as the alternative output | `PROMPT.md` Section 13B | `tests/dmi-guardrails.test.mjs`, `tests/visual-delivery-contract.test.mjs` | Option and shared-data rules remain | HTML runs, is accessible, responsive and interaction-tested |
| Reference parity without copying reference data | `PROMPT.md` visual delivery contract | `tests/visual-delivery-contract.test.mjs` | Manifest and anti-copy rules remain | Actual visual is compared with the reference and report |
| Graceful fallbacks for null/missing evidence | `PROMPT.md` visual QA and data contract | `tests/dmi-guardrails.test.mjs`, `tests/visual-delivery-contract.test.mjs` | Null/fallback rules remain | Rendered artifact shows uncertainty without inventing values |
| Release-blocking delivery checklist and truthful status | `PROMPT.md` visual delivery contract | `tests/dmi-guardrails.test.mjs`, `tests/visual-delivery-contract.test.mjs` | Acceptance criteria remain | Each check is genuinely run and PASS/FAIL/UNVERIFIED is reported |
| Legacy six-level checklist kept separate from DMI | `README.md`, legacy checklist documentation | `tests/dmi-guardrails.test.mjs` | Separation warning remains | Product UI and users do not mistake it for the canonical model |

## Change-control rules

1. Before editing the canonical prompt, identify which rows the change touches.
2. A change that removes or renames a feature must explicitly state whether it is a deliberate deprecation, a replacement, or a regression.
3. Prompt and README changes must be reviewed together for terminology, section numbering, available formats, and workflow order.
4. Add or update a structural regression assertion for every mandatory feature that could disappear silently.
5. Do not call structural checks runtime validation. CI cannot prove that an LLM followed a prompt, that a JPG was rendered, or that an HTML dashboard works in a browser.
6. A visual delivery is complete only after the actual selected artifact has been inspected; unperformed checks remain **UNVERIFIED**.
7. Old branches and unmerged PRs are historical evidence, not safe sources to merge wholesale. Compare their intended feature changes against current `main`, then port only needed changes.
8. The Career Radar is distinct from the eight-domain competency radar chart. Neither replaces the other.
9. Preserve the explicit distinction between proposed work, implementation, adoption, and measurable impact.
10. If the repository's scope changes, update this matrix, the canonical prompt, README, and tests in the same change.

## Known validation limitation

These checks protect repository instructions and documentation. They do not run a model, validate the quality of a personal assessment, generate a JPEG, or execute an HTML dashboard. Those require separate end-to-end evaluations and artifact inspection.
