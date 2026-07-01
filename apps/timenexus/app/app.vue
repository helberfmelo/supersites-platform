<template>
  <NuxtPage />
</template>

<style>
:root {
  color: #18201f;
  background: #f4f7f8;
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
select,
textarea {
  font: inherit;
}

button:focus-visible,
input:focus-visible,
select:focus-visible,
textarea:focus-visible,
a:focus-visible {
  outline: 3px solid #246a73;
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
  color: #18201f;
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
  background: #246a73;
  font-size: 0.82rem;
  font-weight: 900;
}

.language-nav,
.page-footer__links,
.inline-link-list,
.tool-actions,
.category-tabs,
.mode-tabs,
.result-meta {
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
.category-tabs button,
.mode-tabs button {
  min-height: 34px;
  padding: 7px 10px;
  border: 1px solid #cbd7d8;
  border-radius: 8px;
  color: #314647;
  background: #ffffff;
  font-size: 0.85rem;
  font-weight: 800;
  text-decoration: none;
}

.language-nav a[aria-current="page"],
.page-footer__links a[aria-current="page"],
.category-tabs button[aria-pressed="true"],
.mode-tabs button[aria-pressed="true"] {
  color: #ffffff;
  border-color: #246a73;
  background: #246a73;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 390px);
  gap: 28px;
  align-items: end;
  padding: 26px 0 34px;
  border-bottom: 1px solid #d8e2e3;
}

.hero > *,
.tool-card > *,
.status-panel > *,
.content-layout > *,
.tool-layout > *,
.tool-sidebar > *,
.input-panel > *,
.result-panel > *,
.answer-panel > *,
.timeline-panel > *,
.related-panel > * {
  min-width: 0;
}

.eyebrow {
  margin: 0 0 12px;
  color: #8f4f25;
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
pre {
  overflow-wrap: break-word;
}

h1 {
  width: 100%;
  max-width: 820px;
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
  color: #475c5d;
  font-size: 1.04rem;
}

.status-panel,
.band,
.tool-card,
.input-panel,
.result-panel,
.answer-panel,
.timeline-panel,
.related-panel,
.related-card {
  border: 1px solid #d1dcdd;
  border-radius: 8px;
  background: #ffffff;
}

.status-panel__row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 14px;
  align-items: center;
  padding: 14px;
  border-bottom: 1px solid #e5ebec;
}

.status-panel__row:last-child {
  border-bottom: 0;
}

.status-panel strong,
.status-panel span {
  display: block;
}

.status-panel strong {
  color: #18201f;
  font-size: 0.94rem;
}

.status-panel span {
  color: #657576;
  font-size: 0.84rem;
}

.signal {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #2e8068;
  box-shadow: 0 0 0 5px #dceee8;
}

.signal--amber {
  background: #b35a2b;
  box-shadow: 0 0 0 5px #f3dfd2;
}

.controls {
  display: grid;
  grid-template-columns: minmax(220px, 1fr) minmax(170px, 260px);
  gap: 12px;
  align-items: end;
  padding: 24px 0;
}

.time-workbench {
  display: grid;
  gap: 18px;
  padding: 24px 0;
  border-bottom: 1px solid #d8e2e3;
}

.workbench-heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(240px, 360px);
  gap: 18px;
  align-items: start;
}

.workbench-heading > *,
.workbench-grid > *,
.workbench-panel > *,
.planner-answer > *,
.zone-row > *,
.clock-row > * {
  min-width: 0;
}

.privacy-strip {
  margin: 0;
  padding: 10px 12px;
  border: 1px solid #d8e0e1;
  border-radius: 8px;
  color: #405455;
  background: #f8fafb;
  font-size: 0.88rem;
}

.workbench-grid {
  display: grid;
  grid-template-columns: minmax(260px, 0.36fr) minmax(0, 0.64fr);
  gap: 16px;
  align-items: start;
}

.workbench-panel {
  display: grid;
  gap: 16px;
  padding: 18px;
  border: 1px solid #d1dcdd;
  border-radius: 8px;
  background: #ffffff;
}

.panel-heading h3,
.panel-heading p,
.world-clock-section h4,
.slot-section h4 {
  margin-bottom: 0;
}

.panel-heading {
  display: grid;
  gap: 6px;
}

.clock-list,
.zone-grid {
  display: grid;
  gap: 0;
  margin: 0;
  padding: 0;
}

.clock-row,
.zone-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(120px, auto);
  gap: 12px;
  align-items: center;
  padding: 11px 0;
  border-top: 1px solid #e0e7e8;
}

.clock-row dt,
.clock-row dd {
  margin: 0;
}

.clock-row dd {
  text-align: right;
}

.clock-row strong,
.clock-row span,
.zone-row strong,
.zone-row span,
.planner-answer strong,
.planner-answer span {
  display: block;
}

.clock-row span,
.zone-row span,
.planner-answer span {
  color: #607174;
  font-size: 0.78rem;
  font-weight: 850;
}

.planner-controls {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
  align-items: end;
}

.planner-answer {
  display: grid;
  grid-template-columns: minmax(0, 0.36fr) minmax(0, 0.64fr);
  gap: 10px;
}

.planner-answer div {
  padding: 12px;
  border: 1px solid #bdd7d9;
  border-radius: 8px;
  background: #edf7f8;
}

.world-clock-section,
.slot-section {
  display: grid;
  gap: 10px;
}

.zone-row {
  grid-template-columns: minmax(0, 1fr) minmax(130px, auto) minmax(112px, auto);
}

.time-status {
  justify-self: end;
  padding: 4px 8px;
  border-radius: 8px;
  color: #173d42;
  background: #d5eef1;
  font-size: 0.78rem;
  font-weight: 850;
}

.time-status--early,
.time-status--late {
  color: #6f351e;
  background: #f3dfd2;
}

.slot-table {
  width: 100%;
  border-collapse: collapse;
  overflow-wrap: anywhere;
}

.slot-table th,
.slot-table td {
  padding: 10px 8px;
  border-top: 1px solid #e0e7e8;
  text-align: left;
  vertical-align: top;
}

.slot-table thead th {
  color: #607174;
  font-size: 0.75rem;
  text-transform: uppercase;
}

.field {
  display: grid;
  gap: 7px;
}

.field label {
  color: #4a5e5f;
  font-size: 0.82rem;
  font-weight: 800;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  border: 1px solid #b9c9cb;
  border-radius: 8px;
  color: #18201f;
  background: #ffffff;
}

.field input,
.field select {
  min-height: 44px;
}

.field input {
  padding: 0 13px;
}

.field select {
  padding: 0 36px 0 13px;
}

.field textarea {
  min-height: 120px;
  resize: vertical;
  padding: 12px;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  font-size: 0.9rem;
  line-height: 1.45;
}

.field p,
.tool-card p,
.content-section p,
.result-panel p,
.input-panel p,
.answer-panel p,
.timeline-panel p,
.related-panel p,
.band p {
  color: #405455;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.tool-card {
  display: grid;
  min-height: 296px;
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
  color: #617274;
  font-size: 0.84rem;
  font-weight: 800;
}

.status {
  flex: 0 0 auto;
  padding: 4px 8px;
  border-radius: 8px;
  color: #173d42;
  background: #d5eef1;
  font-size: 0.78rem;
  font-weight: 850;
}

.tool-card dl,
.fact-list {
  display: grid;
  gap: 10px;
  margin: 0;
}

.tool-card dt,
.fact-list dt,
.result-meta strong {
  color: #607174;
  font-size: 0.77rem;
  font-weight: 850;
  text-transform: uppercase;
}

.tool-card dd,
.fact-list dd {
  margin: 2px 0 0;
  color: #253637;
}

.button-link {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  padding: 9px 12px;
  border: 1px solid #246a73;
  border-radius: 8px;
  color: #ffffff;
  background: #246a73;
  font-size: 0.9rem;
  font-weight: 850;
  text-decoration: none;
  cursor: pointer;
}

.button-link--secondary {
  color: #246a73;
  background: #ffffff;
}

.button-link:disabled {
  cursor: wait;
  opacity: 0.68;
}

.band {
  margin-top: 24px;
  padding: 18px;
}

.section-heading {
  display: flex;
  gap: 16px;
  align-items: start;
  justify-content: space-between;
}

.section-heading p {
  max-width: 720px;
  margin-bottom: 0;
  color: #405455;
}

.city-link-band {
  display: grid;
  gap: 16px;
}

.directory-band {
  display: grid;
  gap: 16px;
  padding: 24px 0 0;
}

.directory-grid,
.directory-footer {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 12px;
}

.directory-card {
  display: grid;
  gap: 10px;
  align-content: start;
  min-height: 178px;
  padding: 14px;
  border: 1px solid #d1dcdd;
  border-radius: 8px;
  background: #ffffff;
}

.directory-card h3,
.directory-card p {
  margin-bottom: 0;
}

.directory-card p {
  color: #405455;
  font-size: 0.9rem;
}

.city-link-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.city-card {
  display: grid;
  min-height: 138px;
  align-content: space-between;
  gap: 8px;
  padding: 14px;
  border: 1px solid #d1dcdd;
  border-radius: 8px;
  color: #18201f;
  background: #f8fafb;
  text-decoration: none;
}

.city-card span,
.city-card small,
.city-card em {
  color: #607174;
  font-size: 0.78rem;
  font-style: normal;
  font-weight: 850;
}

.city-card strong {
  font-size: 1.08rem;
  line-height: 1.15;
}

.city-card em {
  color: #246a73;
}

.city-depth-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 420px);
  gap: 18px;
  align-items: start;
  padding: 24px 0 0;
}

.city-timeline {
  display: grid;
  gap: 10px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.city-timeline__item {
  display: grid;
  grid-template-columns: minmax(0, 0.54fr) minmax(0, 0.46fr);
  gap: 12px;
  align-items: center;
  padding: 13px 0 13px 14px;
  border-left: 4px solid #246a73;
  border-bottom: 1px solid #d8e0e1;
}

.city-timeline__item:nth-child(2) {
  border-left-color: #2e8068;
}

.city-timeline__item:nth-child(3) {
  border-left-color: #b35a2b;
}

.city-timeline__item:nth-child(4) {
  border-left-color: #607174;
}

.city-timeline__item strong,
.city-timeline__item span {
  display: block;
}

.city-timeline__item span {
  color: #607174;
  font-size: 0.82rem;
  font-weight: 750;
}

.city-overlap-grid {
  display: grid;
  gap: 10px;
}

.city-overlap-card {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(120px, auto);
  gap: 4px 10px;
  align-items: center;
  padding: 10px 0;
  border-top: 1px solid #e0e7e8;
}

.city-overlap-card strong,
.city-overlap-card span,
.city-overlap-card small {
  display: block;
}

.city-overlap-card small {
  grid-column: 1 / 2;
  color: #607174;
  font-size: 0.78rem;
  font-weight: 800;
}

.city-overlap-card .time-status {
  grid-column: 2 / 3;
  grid-row: 2 / 3;
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
  border-top: 3px solid #246a73;
}

.band-grid div:nth-child(2) {
  border-color: #2e8068;
}

.band-grid div:nth-child(3) {
  border-color: #b35a2b;
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
  color: #5d6d6f;
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
.result-panel,
.answer-panel,
.timeline-panel {
  padding: 18px;
}

.result-panel,
.input-panel,
.timeline-panel {
  margin-top: 14px;
}

.answer-panel {
  display: grid;
  gap: 12px;
  margin-top: 0;
}

.answer-panel__topline {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.answer-panel__topline h2,
.timeline-panel h2,
.related-panel h2 {
  margin-bottom: 0;
}

.answer-primary {
  display: block;
  color: #18201f;
  font-size: 1.72rem;
  line-height: 1.15;
}

.answer-secondary {
  margin-bottom: 0;
}

.answer-details,
.timeline-list,
.gated-list {
  margin: 0;
  padding: 0;
}

.answer-details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
}

.answer-details div {
  min-width: 0;
  padding: 10px;
  border: 1px solid #d8e0e1;
  border-radius: 8px;
  background: #f8fafb;
}

.answer-details dt {
  color: #607174;
  font-size: 0.77rem;
  font-weight: 850;
  text-transform: uppercase;
}

.answer-details dd {
  margin: 3px 0 0;
  color: #18201f;
}

.timeline-panel {
  display: grid;
  gap: 16px;
}

.timeline-list {
  display: grid;
  gap: 10px;
  list-style: none;
}

.timeline-list li {
  display: grid;
  grid-template-columns: minmax(90px, 0.38fr) minmax(0, 1fr);
  gap: 12px;
  align-items: center;
  padding: 10px 0 10px 14px;
  border-left: 4px solid #246a73;
}

.timeline-list li:nth-child(2) {
  border-color: #2e8068;
}

.timeline-list li:nth-child(3) {
  border-color: #b35a2b;
}

.timeline-list span {
  color: #607174;
  font-size: 0.82rem;
  font-weight: 850;
}

.timeline-list strong {
  color: #18201f;
  font-size: 0.94rem;
}

.tool-sidebar {
  display: grid;
  gap: 14px;
}

.tool-sidebar .band {
  margin-top: 0;
}

.gated-list {
  display: grid;
  gap: 8px;
  list-style: none;
}

.gated-list li {
  padding-left: 14px;
  border-left: 3px solid #b35a2b;
  color: #314647;
  font-weight: 750;
}

.related-panel {
  display: grid;
  grid-template-columns: minmax(220px, 0.34fr) minmax(0, 1fr);
  gap: 16px;
  align-items: start;
  margin-top: 24px;
  padding: 18px;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.related-card {
  display: grid;
  min-height: 132px;
  align-content: space-between;
  gap: 8px;
  padding: 14px;
  color: #18201f;
  text-decoration: none;
}

.related-card span,
.related-card small {
  color: #607174;
  font-size: 0.78rem;
  font-weight: 850;
}

.related-card strong {
  line-height: 1.18;
}

.related-card small {
  color: #246a73;
}

.utility-form {
  display: grid;
  gap: 14px;
}

.form-grid {
  display: grid;
  gap: 12px;
  align-items: end;
}

.form-grid--two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.form-grid--three {
  grid-template-columns: minmax(0, 1fr) minmax(190px, 0.7fr) minmax(190px, 0.7fr);
}

.mode-tabs {
  align-items: center;
}

.mode-tabs button {
  cursor: pointer;
}

.unit-mode-groups {
  display: grid;
  gap: 12px;
}

.unit-mode-group {
  display: grid;
  gap: 8px;
}

.unit-mode-group h3 {
  margin-bottom: 0;
  color: #607174;
  font-size: 0.82rem;
  text-transform: uppercase;
}

.copy-status {
  margin: 0;
  color: #246a73;
  font-size: 0.84rem;
  font-weight: 850;
}

.result-error {
  color: #783316;
  font-weight: 800;
}

.result-card-grid,
.mini-timeline {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-bottom: 12px;
}

.copy-card,
.mini-timeline div {
  min-width: 0;
  padding: 10px;
  border: 1px solid #d8e0e1;
  border-radius: 8px;
  background: #f8fafb;
  text-align: left;
}

.copy-card {
  cursor: pointer;
}

.copy-card:hover {
  border-color: #246a73;
}

.copy-card span,
.mini-timeline dt {
  display: block;
  color: #607174;
  font-size: 0.76rem;
  font-weight: 850;
  text-transform: uppercase;
}

.copy-card strong,
.mini-timeline dd {
  display: block;
  margin: 4px 0 0;
  color: #18201f;
  font-size: 0.96rem;
  line-height: 1.25;
}

.mini-timeline {
  margin-top: 4px;
}

.mini-timeline dt,
.mini-timeline dd {
  margin-left: 0;
}

.notice-panel,
.formula-line {
  margin: 0 0 12px;
  padding: 10px 12px;
  border-left: 4px solid #b35a2b;
  color: #405455;
  background: #fff7f2;
}

.result-output {
  min-height: 150px;
  max-height: 620px;
  margin: 0;
  padding: 12px;
  border: 1px solid #d8e0e1;
  border-radius: 8px;
  overflow: auto;
  color: #18201f;
  background: #f8fafb;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  font-size: 0.9rem;
  line-height: 1.45;
  white-space: pre-wrap;
}

.result-meta {
  margin-bottom: 12px;
}

.result-meta div {
  min-width: 0;
  padding: 8px 10px;
  border: 1px solid #d8e0e1;
  border-radius: 8px;
  background: #f8fafb;
}

.result-meta strong,
.result-meta span {
  display: block;
}

.content-hero h1 {
  max-width: 760px;
  font-size: 3.4rem;
  line-height: 1.05;
}

.content-section {
  padding: 18px 0;
  border-top: 1px solid #d8e0e1;
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
  border-top: 1px solid #e0e7e8;
}

.faq-list summary {
  color: #18201f;
  font-weight: 850;
  cursor: pointer;
}

.faq-list p {
  margin: 8px 0 0;
}

.page-footer {
  margin-top: 36px;
  padding-top: 20px;
  border-top: 1px solid #d8e0e1;
}

.directory-footer {
  margin-top: 24px;
  padding: 18px 0;
  border-top: 1px solid #d8e0e1;
  border-bottom: 1px solid #d8e0e1;
}

.directory-footer div {
  display: grid;
  gap: 8px;
  align-content: start;
}

.directory-footer h2 {
  margin-bottom: 0;
  color: #607174;
  font-size: 0.82rem;
  text-transform: uppercase;
}

.directory-footer a {
  color: #253637;
  font-size: 0.9rem;
  font-weight: 750;
  text-decoration: none;
}

@media (max-width: 960px) {
  .tool-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .city-link-grid,
  .directory-grid,
  .directory-footer {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 820px) {
  .page-shell {
    width: min(100% - 24px, 720px);
    padding-top: 16px;
  }

  .site-header,
  .page-footer,
  .hero,
  .workbench-heading,
  .workbench-grid,
  .planner-controls,
  .planner-answer,
  .clock-row,
  .zone-row,
  .controls,
  .tool-grid,
  .band-grid,
  .tool-layout,
  .content-layout,
  .city-depth-grid,
  .related-panel,
  .related-grid,
  .city-link-grid,
  .directory-grid,
  .directory-footer,
  .city-timeline__item,
  .city-overlap-card,
  .answer-details,
  .timeline-list li,
  .form-grid--two,
  .form-grid--three,
  .result-card-grid,
  .mini-timeline {
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

  .answer-primary {
    font-size: 1.3rem;
  }

  .clock-row dd,
  .time-status,
  .city-overlap-card .time-status {
    justify-self: start;
    text-align: left;
  }

  .city-overlap-card small,
  .city-overlap-card .time-status {
    grid-column: auto;
    grid-row: auto;
  }

  .tool-card {
    min-height: 0;
  }
}
</style>
