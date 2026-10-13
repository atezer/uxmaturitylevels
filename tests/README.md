# Calibration test status

The automated suite checks repository-level invariants: required prompt sections, the evidence gates, output-format consistency, and the presence of all ten qualitative calibration scenarios.

It does not call an LLM and does not claim to validate runtime classification accuracy. Runtime evaluation should run each scenario through the target model, record the profile, maturity level, evidence citations, and confidence, then compare results against human-reviewed expected ranges.

Run locally with:

```sh
node --test tests/dmi-guardrails.test.mjs
```
