<template>
  <NuxtPage />
</template>

<style>
:root {
  color: #19211d;
  background: #f6f7f2;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.5;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: border-box;
}

html,
body {
  min-width: 320px;
  margin: 0;
}

a {
  color: inherit;
}

button,
input,
select {
  font: inherit;
}

button:focus-visible,
input:focus-visible,
select:focus-visible,
a:focus-visible {
  outline: 3px solid #1f7a8c;
  outline-offset: 3px;
}

.page-shell {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 24px 0 64px;
}

.site-header,
.page-footer {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
}

.site-header {
  padding: 10px 0 26px;
}

.brand-link,
.page-footer__brand {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  color: #19211d;
  font-weight: 850;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  width: 38px;
  height: 38px;
  place-items: center;
  border-radius: 8px;
  color: #ffffff;
  background: #254c6a;
  font-size: 0.82rem;
  font-weight: 900;
}

.language-nav,
.page-footer__links,
.inline-link-list,
.card-actions,
.tool-actions,
.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.language-nav,
.page-footer__links {
  justify-content: flex-end;
}

.language-nav a,
.page-footer__links a,
.inline-link-list a,
.category-tabs button {
  min-height: 34px;
  padding: 7px 10px;
  border: 1px solid #cbd8d2;
  border-radius: 8px;
  color: #33423d;
  background: #ffffff;
  font-size: 0.85rem;
  font-weight: 800;
  text-decoration: none;
}

.language-nav a[aria-current="page"],
.page-footer__links a[aria-current="page"],
.category-tabs button[aria-pressed="true"] {
  color: #ffffff;
  border-color: #254c6a;
  background: #254c6a;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 390px);
  gap: 28px;
  align-items: end;
  padding: 26px 0 34px;
  border-bottom: 1px solid #d7ded8;
}

.hero > *,
.tool-card > *,
.status-panel > *,
.content-layout > *,
.tool-layout > *,
.input-panel > *,
.result-panel > * {
  min-width: 0;
}

.eyebrow {
  margin: 0 0 12px;
  color: #9b4f1f;
  font-size: 0.78rem;
  font-weight: 850;
  letter-spacing: 0;
  text-transform: uppercase;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1,
h2,
h3,
p,
span,
strong,
dd,
.button-link {
  overflow-wrap: break-word;
}

h1 {
  width: 100%;
  max-width: 790px;
  margin-bottom: 16px;
  font-size: 4.25rem;
  line-height: 1;
}

h2 {
  margin-bottom: 12px;
  font-size: 2rem;
  line-height: 1.12;
}

h3 {
  margin-bottom: 8px;
  font-size: 1.04rem;
}

.lead {
  max-width: 720px;
  margin-bottom: 0;
  color: #475751;
  font-size: 1.04rem;
}

.status-panel,
.band,
.tool-card,
.input-panel,
.result-panel {
  border: 1px solid #d1dad4;
  border-radius: 8px;
  background: #ffffff;
}

.status-panel__row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 14px;
  align-items: center;
  padding: 14px;
  border-bottom: 1px solid #e4e9e5;
}

.status-panel__row:last-child {
  border-bottom: 0;
}

.status-panel strong,
.status-panel span {
  display: block;
}

.status-panel strong {
  color: #18231f;
  font-size: 0.94rem;
}

.status-panel span {
  color: #64716b;
  font-size: 0.84rem;
}

.signal {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #2e8a57;
  box-shadow: 0 0 0 5px #dcefe4;
}

.signal--amber {
  background: #bd7424;
  box-shadow: 0 0 0 5px #f5e3ca;
}

.controls {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) minmax(170px, 260px);
  gap: 12px;
  align-items: end;
  padding: 24px 0;
}

.section-head {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(240px, 420px);
  gap: 18px;
  align-items: end;
  margin-bottom: 14px;
}

.section-head p:not(.eyebrow) {
  margin-bottom: 0;
  color: #3f504a;
}

.popular-tools,
.category-directory,
.tool-catalog {
  margin-top: 24px;
}

.popular-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.popular-card {
  display: grid;
  min-height: 166px;
  align-content: start;
  gap: 8px;
  padding: 16px;
  border: 1px solid #d1dad4;
  border-radius: 8px;
  background: #ffffff;
  text-decoration: none;
}

.popular-card span,
.popular-card small {
  color: #607069;
}

.popular-card span {
  font-size: 0.76rem;
  font-weight: 850;
  text-transform: uppercase;
}

.popular-card strong {
  color: #17231e;
  font-size: 1rem;
}

.popular-card small {
  font-size: 0.86rem;
  line-height: 1.42;
}

.category-directory {
  padding: 20px 0;
  border-top: 1px solid #d8ded8;
  border-bottom: 1px solid #d8ded8;
}

.category-directory--footer {
  margin-top: 24px;
  border-bottom: 0;
}

.category-directory__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.category-group {
  min-width: 0;
  padding: 14px;
  border: 1px solid #d1dad4;
  border-radius: 8px;
  background: #ffffff;
}

.category-group p {
  color: #52635d;
  font-size: 0.88rem;
}

.calculator-workbench {
  display: grid;
  gap: 18px;
  margin-top: 24px;
  padding: 18px;
  border: 1px solid #cdd8d2;
  border-radius: 8px;
  background: #ffffff;
}

.workbench-heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(240px, 360px);
  gap: 18px;
  align-items: start;
}

.workbench-heading h2 {
  max-width: 720px;
}

.workbench-heading p:not(.eyebrow),
.scenario-snapshot p {
  color: #3f504a;
}

.workbench-tabs {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}

.workbench-tabs button {
  min-height: 46px;
  border: 1px solid #c9d6d0;
  border-radius: 8px;
  color: #26352f;
  background: #f8faf7;
  font-size: 0.9rem;
  font-weight: 850;
  text-align: left;
  cursor: pointer;
}

.workbench-tabs button[aria-selected="true"] {
  color: #ffffff;
  border-color: #254c6a;
  background: #254c6a;
}

.workbench-body {
  display: grid;
  grid-template-columns: minmax(260px, 0.45fr) minmax(0, 0.55fr);
  gap: 16px;
  align-items: start;
}

.workbench-inputs,
.workbench-results,
.scenario-snapshot {
  display: grid;
  gap: 14px;
  min-width: 0;
}

.workbench-inputs,
.workbench-results {
  padding: 16px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background: #fbfcfa;
}

.metric-strip {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.metric-strip div {
  min-width: 0;
  padding: 11px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background: #ffffff;
}

.metric-strip span,
.metric-strip strong {
  display: block;
}

.metric-strip span {
  color: #607069;
  font-size: 0.74rem;
  font-weight: 850;
  text-transform: uppercase;
}

.metric-strip strong {
  color: #18231f;
  font-size: 1rem;
}

.field {
  display: grid;
  gap: 7px;
}

.field label {
  color: #4b5b55;
  font-size: 0.82rem;
  font-weight: 800;
}

.field input,
.field select {
  width: 100%;
  min-height: 44px;
  border: 1px solid #bac9c2;
  border-radius: 8px;
  color: #17231e;
  background: #ffffff;
}

.field input {
  padding: 0 13px;
}

.field p {
  margin: 0;
  color: #65736d;
  font-size: 0.82rem;
}

.field select {
  padding: 0 36px 0 13px;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.tool-card {
  display: grid;
  min-height: 278px;
  align-content: space-between;
  gap: 16px;
  padding: 18px;
}

.tool-card__topline,
.detail-topline {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.category {
  color: #61706a;
  font-size: 0.84rem;
  font-weight: 800;
}

.status {
  flex: 0 0 auto;
  padding: 4px 8px;
  border-radius: 8px;
  color: #123f2d;
  background: #ccebd9;
  font-size: 0.78rem;
  font-weight: 850;
}

.tool-card p,
.content-section p,
.result-panel p,
.input-panel p,
.band p {
  color: #3f504a;
}

.tool-card dl,
.fact-list {
  display: grid;
  gap: 10px;
  margin: 0;
}

.tool-card dt,
.fact-list dt {
  color: #607069;
  font-size: 0.77rem;
  font-weight: 850;
  text-transform: uppercase;
}

.tool-card dd,
.fact-list dd {
  margin: 2px 0 0;
  color: #25332d;
}

.button-link {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  padding: 9px 12px;
  border: 1px solid #254c6a;
  border-radius: 8px;
  color: #ffffff;
  background: #254c6a;
  font-size: 0.9rem;
  font-weight: 850;
  text-decoration: none;
  cursor: pointer;
}

.button-link--secondary {
  color: #254c6a;
  background: #ffffff;
}

.band {
  margin-top: 24px;
  padding: 18px;
}

.band-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-top: 16px;
}

.band-grid div {
  min-width: 0;
  padding-top: 12px;
  border-top: 3px solid #254c6a;
}

.band-grid div:nth-child(2) {
  border-color: #2e8a57;
}

.band-grid div:nth-child(3) {
  border-color: #bd7424;
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
  color: #5d6b65;
  font-size: 0.9rem;
}

.breadcrumb a {
  font-weight: 800;
  text-decoration: none;
}

.tool-layout,
.content-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 360px);
  gap: 24px;
  align-items: start;
  margin-top: 24px;
}

.input-panel,
.result-panel {
  padding: 18px;
}

.result-panel {
  margin-top: 14px;
}

.result-panel--live {
  display: grid;
  gap: 14px;
}

.calculator-form {
  display: grid;
  gap: 14px;
}

.number-input {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  align-items: center;
  min-height: 44px;
  border: 1px solid #bac9c2;
  border-radius: 8px;
  background: #ffffff;
}

.number-input span {
  padding: 0 11px;
  color: #57655f;
  font-size: 0.86rem;
  font-weight: 850;
}

.number-input input {
  min-width: 0;
  min-height: 42px;
  border: 0;
  padding: 0 10px;
}

.result-error {
  color: #7a2f16;
  font-weight: 800;
}

.result-kicker {
  margin-bottom: -8px;
  color: #9b4f1f;
  font-size: 0.78rem;
  font-weight: 850;
  text-transform: uppercase;
}

.privacy-strip,
.planning-note {
  padding: 10px 12px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background: #f7f8f4;
  color: #43534e;
  font-size: 0.88rem;
}

.primary-result {
  display: grid;
  gap: 8px;
  padding: 16px;
  border: 1px solid #bdd6c8;
  border-radius: 8px;
  background: #eef8f2;
}

.primary-result span {
  color: #476158;
  font-size: 0.78rem;
  font-weight: 850;
  text-transform: uppercase;
}

.primary-result strong {
  color: #123f2d;
  font-size: 2.2rem;
  line-height: 1;
}

.primary-result p,
.interpretation-card p,
.upgrade-panel p {
  margin-bottom: 0;
}

.result-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 10px;
}

.result-grid div {
  min-width: 0;
  padding: 12px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background: #f7f8f4;
}

.result-grid strong,
.result-grid span {
  display: block;
}

.result-grid strong {
  color: #607069;
  font-size: 0.76rem;
  text-transform: uppercase;
}

.result-grid span {
  color: #18231f;
  font-size: 1.1rem;
  font-weight: 900;
}

.result-actions,
.tool-insight {
  display: grid;
  gap: 12px;
  padding: 14px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background: #ffffff;
}

.result-actions > strong {
  color: #17231e;
}

.action-feedback {
  margin-bottom: 0;
  color: #2e5f45;
  font-weight: 800;
}

.breakdown-bars,
.margin-bars {
  display: grid;
  gap: 10px;
}

.breakdown-bar {
  display: grid;
  grid-template-columns: minmax(92px, 0.35fr) minmax(120px, 1fr) minmax(92px, auto);
  gap: 10px;
  align-items: center;
}

.breakdown-bar > span {
  color: #52635d;
  font-size: 0.82rem;
  font-weight: 850;
}

.breakdown-bar > strong {
  color: #17231e;
  text-align: right;
}

.bar-track {
  height: 14px;
  overflow: hidden;
  border-radius: 999px;
  background: #e5ece8;
}

.bar-track span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: #2e8a57;
}

.bar-track--principal span {
  background: #254c6a;
}

.bar-track--interest span {
  background: #bd7424;
}

.summary-table {
  width: 100%;
  border-collapse: collapse;
  overflow-wrap: anywhere;
}

.summary-table caption {
  margin-bottom: 6px;
  color: #17231e;
  font-weight: 850;
  text-align: left;
}

.summary-table th,
.summary-table td {
  padding: 9px 8px;
  border-top: 1px solid #e0e7e2;
  text-align: left;
  vertical-align: top;
}

.summary-table th {
  color: #33423d;
  font-weight: 850;
}

.summary-table thead th {
  color: #607069;
  font-size: 0.75rem;
  text-transform: uppercase;
}

.profit-area {
  height: 180px;
  overflow: hidden;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background: linear-gradient(to bottom, #eef8f2 0 50%, #fff6eb 50% 100%);
}

.profit-area svg {
  width: 100%;
  height: 100%;
}

.profit-area__fill {
  fill: rgba(46, 138, 87, 0.16);
}

.profit-area__axis {
  stroke: #aebdb6;
  stroke-width: 1;
  stroke-dasharray: 4 4;
}

.profit-area__line {
  fill: none;
  stroke: #254c6a;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.formula-aside__intro {
  display: grid;
  gap: 8px;
  margin-bottom: 12px;
  padding: 12px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background: #fbfcfa;
}

.formula-aside__intro h3,
.formula-aside__intro p {
  margin-bottom: 0;
}

.interpretation-card {
  display: grid;
  gap: 6px;
  padding: 13px;
  border: 1px solid #d8ded8;
  border-left: 4px solid #254c6a;
  border-radius: 8px;
  background: #ffffff;
}

.interpretation-card--good {
  border-left-color: #2e8a57;
}

.interpretation-card--review {
  border-left-color: #bd7424;
}

.interpretation-card--warning {
  border-left-color: #9b4f1f;
}

.interpretation-card span,
.calculation-memory dt {
  color: #607069;
  font-size: 0.75rem;
  font-weight: 850;
  text-transform: uppercase;
}

.interpretation-card strong {
  color: #17231e;
}

.calculation-memory {
  display: grid;
  gap: 10px;
  padding-top: 4px;
}

.calculation-memory h3 {
  margin-bottom: 0;
}

.calculation-memory dl {
  display: grid;
  gap: 8px;
  margin: 0;
}

.calculation-memory div {
  display: grid;
  grid-template-columns: minmax(110px, 0.8fr) minmax(0, 1.2fr);
  gap: 10px;
  padding: 10px 0;
  border-top: 1px solid #e1e7e3;
}

.calculation-memory dd {
  margin: 0;
  color: #1f2f29;
  font-weight: 800;
}

.scenario-snapshot {
  padding: 14px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background: #ffffff;
}

.scenario-snapshot__head {
  display: grid;
  gap: 8px;
}

.scenario-snapshot h3,
.scenario-snapshot p {
  margin-bottom: 0;
}

.scenario-bars {
  display: grid;
  gap: 9px;
}

.scenario-bar-row {
  display: grid;
  grid-template-columns: minmax(90px, 0.4fr) minmax(120px, 1fr) minmax(90px, auto);
  gap: 10px;
  align-items: center;
}

.scenario-bar-row > span {
  color: #52635d;
  font-size: 0.82rem;
  font-weight: 850;
}

.scenario-bar-row strong {
  color: #17231e;
  font-size: 0.92rem;
  text-align: right;
}

.scenario-track {
  position: relative;
  min-width: 0;
  height: 12px;
  overflow: hidden;
  border-radius: 999px;
  background: #e5ece8;
}

.scenario-track span {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: #2e8a57;
}

.scenario-table {
  width: 100%;
  border-collapse: collapse;
  overflow-wrap: anywhere;
}

.scenario-table th,
.scenario-table td {
  padding: 10px 8px;
  border-top: 1px solid #e0e7e2;
  text-align: left;
  vertical-align: top;
}

.scenario-table th {
  color: #33423d;
  font-weight: 850;
}

.scenario-table thead th {
  color: #607069;
  font-size: 0.75rem;
  text-transform: uppercase;
}

.upgrade-panel {
  display: grid;
  gap: 10px;
  margin-top: 18px;
  padding-top: 16px;
  border-top: 1px solid #e0e7e2;
}

.upgrade-panel ul {
  display: grid;
  gap: 8px;
  margin: 0;
  padding-left: 20px;
  color: #25332d;
}

.related-calculators {
  display: grid;
  grid-template-columns: minmax(220px, 0.45fr) minmax(0, 1fr);
  gap: 20px;
  align-items: start;
  margin-top: 24px;
  padding: 22px 0;
  border-top: 1px solid #d8ded8;
  border-bottom: 1px solid #d8ded8;
}

.related-calculator-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.related-calculator-list a {
  display: grid;
  min-height: 128px;
  align-content: start;
  gap: 8px;
  padding: 14px;
  border: 1px solid #d1dad4;
  border-radius: 8px;
  background: #ffffff;
  text-decoration: none;
}

.related-calculator-list strong,
.related-calculator-list span {
  min-width: 0;
}

.related-calculator-list strong {
  color: #17231e;
}

.related-calculator-list span {
  color: #52635d;
  font-size: 0.88rem;
}

code {
  display: block;
  padding: 12px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background: #f7f8f4;
  color: #17231e;
  overflow-wrap: anywhere;
}

.content-hero h1 {
  max-width: 760px;
  font-size: 3.4rem;
  line-height: 1.05;
}

.content-section {
  padding: 18px 0;
  border-top: 1px solid #d8ded8;
}

.content-section p {
  max-width: 780px;
}

.faq-list {
  display: grid;
  gap: 10px;
}

.faq-list details {
  padding: 12px 0;
  border-top: 1px solid #e0e7e2;
}

.faq-list summary {
  color: #17231e;
  font-weight: 850;
  cursor: pointer;
}

.faq-list p {
  margin: 8px 0 0;
}

.page-footer {
  margin-top: 36px;
  padding-top: 20px;
  border-top: 1px solid #d8ded8;
}

@media (max-width: 820px) {
  .page-shell {
    width: min(100% - 24px, 720px);
    padding-top: 16px;
  }

  .site-header,
  .page-footer,
  .hero,
  .controls,
  .section-head,
  .popular-grid,
  .category-directory__grid,
  .workbench-heading,
  .workbench-body,
  .workbench-tabs,
  .tool-grid,
  .band-grid,
  .tool-layout,
  .content-layout,
  .result-grid,
  .metric-strip,
  .related-calculators,
  .related-calculator-list,
  .calculation-memory div {
    display: grid;
    grid-template-columns: 1fr;
  }

  .site-header,
  .page-footer {
    align-items: start;
  }

  .language-nav,
  .page-footer__links {
    justify-content: flex-start;
  }

  h1 {
    max-width: 100%;
    font-size: 2rem;
    line-height: 1.04;
    word-break: break-word;
  }

  h2,
  .content-hero h1 {
    font-size: 1.55rem;
  }

  .primary-result strong {
    font-size: 1.75rem;
  }

  .scenario-bar-row {
    grid-template-columns: 1fr;
  }

  .breakdown-bar {
    grid-template-columns: 1fr;
  }

  .scenario-bar-row strong,
  .breakdown-bar > strong {
    text-align: left;
  }

  .tool-card {
    min-height: 0;
  }
}
</style>
