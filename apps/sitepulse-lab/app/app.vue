<template>
  <NuxtPage />
</template>

<style>
:root {
  color: #17211d;
  background: #f7f8f4;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.5;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: border-box;
}

html {
  min-width: 320px;
}

body {
  min-width: 320px;
  margin: 0;
}

a {
  color: inherit;
}

button,
input,
select,
textarea {
  font: inherit;
}

button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
a:focus-visible {
  outline: 3px solid #0f766e;
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
  color: #17211d;
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
  background: #275f57;
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
  border-color: #275f57;
  background: #275f57;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 920px);
  gap: 28px;
  align-items: end;
  padding: 26px 0 34px;
  border-bottom: 1px solid #d7ded8;
}

.hero--single {
  grid-template-columns: minmax(0, 820px);
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
  color: #9a4f1e;
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
  max-width: 780px;
  margin-bottom: 16px;
  font-size: clamp(2.1rem, 6vw, 4.6rem);
  line-height: 1;
}

h2 {
  margin-bottom: 12px;
  font-size: clamp(1.45rem, 3.2vw, 2.05rem);
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
  background: #2f855a;
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
.field select,
.field textarea {
  width: 100%;
  border: 1px solid #bac9c2;
  border-radius: 8px;
  color: #17231e;
  background: #ffffff;
}

.field input,
.field select {
  min-height: 44px;
}

.field input {
  padding: 0 13px;
}

.field textarea {
  min-height: 170px;
  padding: 12px 13px;
  resize: vertical;
}

.field select {
  padding: 0 36px 0 13px;
}

.checkbox-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  margin: 10px 0 14px;
  padding: 0;
  border: 0;
}

.checkbox-grid legend {
  grid-column: 1 / -1;
  color: #4b5b55;
  font-size: 0.82rem;
  font-weight: 800;
}

.checkbox-grid label {
  display: flex;
  min-height: 36px;
  align-items: center;
  gap: 7px;
  padding: 7px 9px;
  border: 1px solid #cbd8d2;
  border-radius: 8px;
  background: #ffffff;
  color: #25332d;
  font-size: 0.84rem;
  font-weight: 800;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.tool-card {
  display: grid;
  min-height: 290px;
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

.status--info {
  color: #244d69;
  background: #dceaf3;
}

.tool-card p,
.detail-copy,
.content-section p,
.result-panel p,
.input-panel p,
.band p {
  color: #3f504a;
}

.tool-card dl,
.fact-list,
.method-list {
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
  border: 1px solid #275f57;
  border-radius: 8px;
  color: #ffffff;
  background: #275f57;
  font-size: 0.9rem;
  font-weight: 850;
  text-decoration: none;
  cursor: pointer;
}

.button-link--secondary {
  color: #275f57;
  background: #ffffff;
}

.button-link:disabled,
.button-link[aria-disabled="true"] {
  color: #6a756f;
  border-color: #cfd8d3;
  background: #edf1ed;
  cursor: not-allowed;
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
  border-top: 3px solid #2f855a;
}

.band-grid div:nth-child(2) {
  border-color: #275f57;
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
  grid-template-columns: minmax(0, 1fr);
  gap: 24px;
  align-items: start;
  margin-top: 24px;
}

.health-summary {
  display: grid;
  grid-template-columns: minmax(150px, 220px) minmax(0, 1fr);
  gap: 16px;
  align-items: stretch;
  margin-top: 22px;
  padding: 16px;
  border: 1px solid #d1dad4;
  border-radius: 8px;
  background: #ffffff;
}

.site-report {
  display: grid;
  gap: 18px;
  padding: 28px 0;
  border-bottom: 1px solid #d7ded8;
}

.site-report__header,
.site-report-safeguards {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 440px);
  gap: 18px;
  align-items: start;
}

.site-report__header h2 {
  max-width: 780px;
}

.site-report__header p {
  max-width: 720px;
  color: #43534d;
}

.site-report__form {
  display: grid;
  gap: 8px;
  padding: 14px;
  border: 1px solid #d1dad4;
  border-radius: 8px;
  background: #ffffff;
}

.site-report__form label {
  color: #4b5b55;
  font-size: 0.82rem;
  font-weight: 850;
}

.site-report__input-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
}

.site-report__input-row input {
  width: 100%;
  min-height: 44px;
  padding: 0 13px;
  border: 1px solid #bac9c2;
  border-radius: 8px;
  color: #17231e;
  background: #ffffff;
}

.site-report__summary {
  display: grid;
  grid-template-columns: minmax(150px, 220px) minmax(0, 1fr);
  gap: 16px;
  align-items: stretch;
  padding: 16px;
  border: 1px solid #d1dad4;
  border-left-width: 6px;
  border-radius: 8px;
  background: #ffffff;
}

.site-report__summary--pass {
  border-left-color: #2f855a;
}

.site-report__summary--warn {
  border-left-color: #bd7424;
}

.site-report__summary--fail {
  border-left-color: #a8442b;
}

.site-report__score {
  display: grid;
  place-items: center;
  min-height: 150px;
  padding: 16px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  text-align: center;
  background: #f7f8f4;
}

.site-report__score span,
.site-report__score small {
  color: #607069;
  font-weight: 850;
  text-transform: uppercase;
}

.site-report__score strong {
  display: block;
  color: #17231e;
  font-size: 3.1rem;
  line-height: 1;
}

.site-report__state {
  min-width: 0;
}

.site-report__state h3 {
  margin: 10px 0 8px;
  font-size: 1.18rem;
}

.site-report__state p {
  color: #3f504a;
}

.site-report__meta {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  margin: 12px 0 0;
}

.site-report__meta div {
  min-width: 0;
  padding: 9px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background: #f7f8f4;
}

.site-report__meta dt {
  color: #607069;
  font-size: 0.76rem;
  font-weight: 850;
  text-transform: uppercase;
}

.site-report__meta dd {
  margin: 2px 0 0;
  color: #25332d;
  font-weight: 850;
  overflow-wrap: anywhere;
}

.site-report__section-heading {
  display: grid;
  grid-template-columns: minmax(0, 260px) minmax(0, 1fr);
  gap: 14px;
  align-items: end;
}

.site-report__section-heading p {
  margin-bottom: 12px;
  color: #4b5b55;
}

.site-report-card-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
}

.site-report-card {
  min-width: 0;
  padding: 13px;
  border: 1px solid #d1dad4;
  border-radius: 8px;
  background: #ffffff;
}

.site-report-card h3 {
  margin-top: 10px;
}

.site-report-card p {
  color: #41524c;
  font-size: 0.9rem;
}

.site-report-safeguards {
  align-items: stretch;
}

.site-report-safeguards section {
  min-width: 0;
  padding: 16px;
  border: 1px solid #d1dad4;
  border-radius: 8px;
  background: #ffffff;
}

.health-summary h2,
.health-summary p {
  margin-bottom: 8px;
}

.score-card {
  display: grid;
  place-items: center;
  min-height: 150px;
  padding: 16px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  text-align: center;
  background: #f7f8f4;
}

.score-card span,
.score-card small {
  color: #607069;
  font-weight: 850;
  text-transform: uppercase;
}

.score-card strong {
  display: block;
  color: #17231e;
  font-size: 3.2rem;
  line-height: 1;
}

.score-card--pass {
  border-color: #9bd4b3;
  background: #edf8f0;
}

.score-card--warn {
  border-color: #e2bf7c;
  background: #fff7e8;
}

.score-card--fail {
  border-color: #e2a090;
  background: #fff0ec;
}

.checklist-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 12px;
}

.checklist-grid div {
  min-width: 0;
  padding: 11px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background: #f7f8f4;
}

.checklist-grid strong,
.checklist-grid p {
  display: block;
  margin: 6px 0 0;
}

.severity {
  display: inline-flex;
  max-width: 100%;
  min-height: 26px;
  align-items: center;
  padding: 4px 8px;
  border-radius: 999px;
  font-size: 0.76rem;
  font-weight: 850;
  text-transform: uppercase;
}

.severity--pass {
  color: #135530;
  background: #dff3e7;
}

.severity--warn {
  color: #764706;
  background: #f8e8c8;
}

.severity--fail {
  color: #78301f;
  background: #f8d8cf;
}

.result-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 0 0 12px;
}

.result-tabs button {
  min-height: 34px;
  padding: 7px 10px;
  border: 1px solid #cbd8d2;
  border-radius: 8px;
  color: #33423d;
  background: #ffffff;
  font-size: 0.84rem;
  font-weight: 850;
  cursor: pointer;
}

.result-tabs button[aria-selected="true"] {
  color: #ffffff;
  border-color: #275f57;
  background: #275f57;
}

.result-tab-panel {
  min-width: 0;
}

.technical-section {
  display: grid;
  gap: 10px;
  padding: 16px 0;
  border-top: 1px solid #d8ded8;
}

.technical-section:first-child {
  padding-top: 4px;
  border-top: 0;
}

.technical-section h3 {
  margin: 0;
  color: #17231e;
  font-size: 1rem;
}

.redirect-timeline {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.redirect-timeline li {
  display: grid;
  min-width: 0;
  grid-template-columns: 56px minmax(0, 1fr);
  gap: 12px;
  padding: 12px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background: #ffffff;
}

.redirect-timeline__step {
  display: grid;
  align-content: start;
  gap: 8px;
  justify-items: start;
}

.redirect-timeline__step strong {
  display: grid;
  width: 34px;
  height: 34px;
  place-items: center;
  border-radius: 8px;
  color: #ffffff;
  background: #275f57;
}

.redirect-timeline dl,
.detail-card-grid {
  display: grid;
  min-width: 0;
  gap: 10px;
  margin: 0;
}

.redirect-timeline dl {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.redirect-timeline dt {
  color: #607069;
  font-size: 0.72rem;
  font-weight: 850;
  text-transform: uppercase;
}

.redirect-timeline dd {
  margin: 2px 0 0;
  color: #25332d;
  overflow-wrap: anywhere;
}

.technical-warning {
  margin: 0;
  color: #78301f;
  font-size: 0.88rem;
  font-weight: 800;
}

.detail-card-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.detail-card {
  display: grid;
  min-width: 0;
  gap: 7px;
  padding: 12px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background: #ffffff;
}

.detail-card strong {
  color: #17231e;
}

.detail-card p {
  margin: 0;
  color: #43544e;
  font-size: 0.88rem;
}

.detail-card code {
  display: block;
  max-width: 100%;
  color: #25332d;
  font-size: 0.82rem;
  white-space: normal;
  overflow-wrap: anywhere;
}

.tool-sidebar {
  display: grid;
  grid-column: 1 / -1;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.tool-sidebar .band {
  margin-top: 0;
}

.related-list {
  display: grid;
  gap: 8px;
}

.related-card {
  display: grid;
  gap: 4px;
  padding: 11px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  color: inherit;
  background: #ffffff;
  text-decoration: none;
}

.related-card span {
  color: #52635c;
  font-size: 0.85rem;
}

.input-panel,
.result-panel {
  padding: 18px;
}

.result-panel {
  margin-top: 14px;
}

.result-error {
  color: #7a2f16;
  font-weight: 800;
}

.result-meta {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin: 12px 0;
}

.result-meta div {
  min-width: 0;
  padding: 10px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background: #f7f8f4;
}

.result-meta strong,
.result-meta span {
  display: block;
}

.result-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;
}

.sample-url-list {
  display: grid;
  gap: 8px;
  padding: 12px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background: #f7f8f4;
}

.sample-url-list strong {
  color: #17231e;
}

.result-table-wrap {
  width: 100%;
  overflow-x: auto;
}

.result-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.result-table th,
.result-table td {
  padding: 8px;
  border-bottom: 1px solid #e1e6e2;
  text-align: left;
  vertical-align: top;
  overflow-wrap: anywhere;
}

.result-table th {
  color: #607069;
  font-size: 0.76rem;
  text-transform: uppercase;
}

.result-list,
.pill-list {
  padding: 0;
  list-style: none;
}

.result-list {
  display: grid;
  gap: 8px;
}

.result-list li {
  overflow-wrap: anywhere;
}

.pill-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.pill-list li {
  max-width: 100%;
  padding: 6px 10px;
  border: 1px solid #cfd8d1;
  border-radius: 999px;
  background: #f7f8f4;
  color: #26342f;
  font-size: 0.85rem;
  font-weight: 800;
  overflow-wrap: anywhere;
}

.method-list,
.check-list {
  padding: 0;
  list-style: none;
}

.method-list li,
.check-list li {
  position: relative;
  padding-left: 22px;
  color: #34443e;
}

.method-list li::before,
.check-list li::before {
  position: absolute;
  top: 0.72em;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #2f855a;
  content: "";
}

.content-hero h1 {
  max-width: 760px;
  font-size: clamp(2rem, 5vw, 3.7rem);
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
  .checkbox-grid,
  .tool-grid,
  .site-report__header,
  .site-report__input-row,
  .site-report__summary,
  .site-report__meta,
  .site-report__section-heading,
  .site-report-card-grid,
  .site-report-safeguards,
  .redirect-timeline li,
  .redirect-timeline dl,
  .detail-card-grid,
  .band-grid,
  .tool-sidebar,
  .tool-layout,
  .content-layout,
  .result-meta,
  .health-summary,
  .checklist-grid {
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

  .tool-card {
    min-height: 0;
  }
}
</style>
