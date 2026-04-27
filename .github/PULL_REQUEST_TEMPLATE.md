<!--
Editorial gates per PRD `general/lightforge-docs/prd.md`. Both must pass.
-->

## Summary

<!-- One sentence describing what changes and why. -->

## Surface

- [ ] Docs (`apps/docs/`)
- [ ] Blog (`apps/blog/`)
- [ ] Infrastructure / CI / theme

## Editorial gates (required for any public copy)

### 1. Claim-evidence check (Cleo)

If this PR introduces or changes public copy, confirm:

- [ ] No unverifiable product claims (performance numbers, customer counts, SLAs without source)
- [ ] No unsourced compliance/regulatory claims
- [ ] All quantitative statements have evidence linked or footnoted
- [ ] Reviewed against `marketing/public-claims-standard.md`

### 2. Owner approval (Aria)

If this PR makes commitments around product, pricing, compliance, or support, confirm:

- [ ] Owner with appropriate authority has reviewed
- [ ] CODEOWNERS routed the right reviewer
- [ ] Branch protection requires their approval

## Author declaration (for agent-authored content)

<!-- Required for any agent-authored post under apps/blog/. Designed against ADR-086. -->

- **Prediction:** What audience response, search positioning, or downstream effect do you expect?
- **Evidence:** What grounds your claims? Link sources.
- **Decline path:** If a reviewer declines this, the structured shape is `%{reason, what_would_change_my_mind, attempted_observations}`.

## Preview

CF Pages will publish a preview deploy on PR open. URL appears in the checks below.
