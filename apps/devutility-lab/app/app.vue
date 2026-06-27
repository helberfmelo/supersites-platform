<template>
  <NuxtPage />
</template>

<style>
:root {
  color: #17211d;
  background: #f5f7f0;
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
  outline: 3px solid #1f6f78;
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
  background: #1f5d63;
  font-size: 0.82rem;
  font-weight: 900;
}

.language-nav,
.page-footer__links,
.inline-link-list,
.card-actions,
.tool-actions,
.category-tabs,
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
.category-tabs button {
  min-height: 34px;
  padding: 7px 10px;
  border: 1px solid #c8d5cf;
  border-radius: 8px;
  color: #31423c;
  background: #ffffff;
  font-size: 0.85rem;
  font-weight: 800;
  text-decoration: none;
}

.language-nav a[aria-current="page"],
.page-footer__links a[aria-current="page"],
.category-tabs button[aria-pressed="true"] {
  color: #ffffff;
  border-color: #1f5d63;
  background: #1f5d63;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 390px);
  gap: 28px;
  align-items: end;
  padding: 26px 0 34px;
  border-bottom: 1px solid #d8dfd8;
}

.hero > *,
.tool-card > *,
.status-panel > *,
.workbench > *,
.workbench__header > *,
.workbench-grid > *,
.content-layout > *,
.tool-layout > *,
.input-panel > *,
.result-panel > *,
.related-card > * {
  min-width: 0;
}

.eyebrow {
  margin: 0 0 12px;
  color: #9a4f27;
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
.button-link,
pre {
  overflow-wrap: break-word;
}

h1 {
  width: 100%;
  max-width: 820px;
  margin-bottom: 16px;
  font-size: clamp(2.1rem, 6vw, 4.35rem);
  line-height: 1;
}

h2 {
  margin-bottom: 12px;
  font-size: clamp(1.42rem, 3.2vw, 2rem);
  line-height: 1.12;
}

h3 {
  margin-bottom: 8px;
  font-size: 1.04rem;
}

.lead {
  max-width: 720px;
  margin-bottom: 0;
  color: #475a52;
  font-size: 1.04rem;
}

.status-panel,
.band,
.tool-card,
.privacy-callout,
.related-card,
.input-panel,
.result-panel {
  border: 1px solid #d1dcd5;
  border-radius: 8px;
  background: #ffffff;
}

.status-panel__row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 14px;
  align-items: center;
  padding: 14px;
  border-bottom: 1px solid #e5ebe6;
}

.status-panel__row:last-child {
  border-bottom: 0;
}

.status-panel strong,
.status-panel span {
  display: block;
}

.status-panel strong {
  color: #17211d;
  font-size: 0.94rem;
}

.status-panel span {
  color: #65736e;
  font-size: 0.84rem;
}

.signal {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #2e845f;
  box-shadow: 0 0 0 5px #dceee5;
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

.field {
  display: grid;
  gap: 7px;
}

.field label {
  color: #4a5c55;
  font-size: 0.82rem;
  font-weight: 800;
}

.field input,
.field select,
.field textarea {
  width: 100%;
  border: 1px solid #b9c9c1;
  border-radius: 8px;
  color: #17211d;
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
  min-height: 180px;
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
.band p {
  color: #40534b;
}

.field p {
  margin: 0;
  font-size: 0.82rem;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.tool-card {
  display: grid;
  min-height: 306px;
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
  color: #61716a;
  font-size: 0.84rem;
  font-weight: 800;
}

.status {
  flex: 0 0 auto;
  padding: 4px 8px;
  border-radius: 8px;
  color: #123c2d;
  background: #cfecdd;
  font-size: 0.78rem;
  font-weight: 850;
}

.status--info {
  color: #173d42;
  background: #d5eef1;
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
  color: #60706a;
  font-size: 0.77rem;
  font-weight: 850;
  text-transform: uppercase;
}

.tool-card dd,
.fact-list dd {
  margin: 2px 0 0;
  color: #25342f;
}

.button-link {
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  padding: 9px 12px;
  border: 1px solid #1f5d63;
  border-radius: 8px;
  color: #ffffff;
  background: #1f5d63;
  font-size: 0.9rem;
  font-weight: 850;
  text-decoration: none;
  cursor: pointer;
}

.button-link--secondary {
  color: #1f5d63;
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

.workbench {
  margin-top: 26px;
}

.workbench__header {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(250px, 390px);
  gap: 18px;
  align-items: stretch;
  margin-bottom: 14px;
}

.workbench__header h2 {
  margin-bottom: 8px;
}

.workbench__header p {
  margin-bottom: 0;
  color: #40534b;
}

.privacy-callout {
  display: grid;
  align-content: center;
  gap: 6px;
  padding: 16px;
  background: #eef7f2;
}

.privacy-callout strong,
.example-box strong {
  color: #123c2d;
  font-size: 0.84rem;
  font-weight: 900;
  text-transform: uppercase;
}

.privacy-callout span,
.example-box p {
  color: #40534b;
  font-size: 0.9rem;
}

.workbench-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.02fr) minmax(0, 0.98fr);
  gap: 14px;
  align-items: stretch;
}

.workbench-grid .result-panel {
  margin-top: 0;
}

.panel-heading {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(160px, 210px);
  gap: 14px;
  align-items: start;
}

.panel-heading h2 {
  margin-bottom: 8px;
}

.mini-metrics {
  display: grid;
  gap: 8px;
}

.mini-metrics div {
  min-width: 0;
  padding: 8px 10px;
  border: 1px solid #d8e0d9;
  border-radius: 8px;
  background: #f8faf4;
}

.mini-metrics strong,
.mini-metrics span {
  display: block;
}

.mini-metrics strong {
  color: #60706a;
  font-size: 0.72rem;
  font-weight: 850;
  text-transform: uppercase;
}

.mini-metrics span {
  color: #1d302a;
  font-size: 0.86rem;
  font-weight: 800;
}

.example-box {
  margin: 14px 0;
  padding: 12px 14px;
  border-left: 4px solid #1f5d63;
  background: #f8faf4;
}

.example-box p {
  margin: 6px 0 0;
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
  border-top: 3px solid #1f5d63;
}

.band-grid div:nth-child(2) {
  border-color: #2e845f;
}

.band-grid div:nth-child(3) {
  border-color: #b35a2b;
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
  color: #5d6c66;
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

.utility-form {
  display: grid;
  gap: 14px;
}

.result-error {
  color: #783316;
  font-weight: 800;
}

.result-output {
  min-height: 180px;
  max-height: 620px;
  margin: 0;
  padding: 12px;
  border: 1px solid #d8e0d9;
  border-radius: 8px;
  overflow: auto;
  color: #17211d;
  background: #f8faf4;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", monospace;
  font-size: 0.9rem;
  line-height: 1.45;
  white-space: pre-wrap;
}

.result-panel .tool-actions {
  margin-top: 12px;
}

.result-meta {
  margin-bottom: 12px;
}

.result-meta div {
  min-width: 0;
  padding: 8px 10px;
  border: 1px solid #d8e0d9;
  border-radius: 8px;
  background: #f8faf4;
}

.result-meta strong,
.result-meta span {
  display: block;
}

.content-hero h1 {
  max-width: 760px;
  font-size: clamp(2rem, 5vw, 3.7rem);
  line-height: 1.05;
}

.content-section {
  padding: 18px 0;
  border-top: 1px solid #d8e0d9;
}

.content-section p {
  max-width: 780px;
}

.upgrade-band ul {
  display: grid;
  gap: 8px;
  margin: 12px 0 0;
  padding-left: 20px;
  color: #40534b;
}

.related-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 12px;
}

.related-card {
  display: grid;
  gap: 8px;
  padding: 14px;
  color: #17211d;
  text-decoration: none;
}

.related-card span {
  color: #50635b;
  font-size: 0.9rem;
}

.related-card em {
  color: #1f5d63;
  font-size: 0.84rem;
  font-style: normal;
  font-weight: 850;
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
  color: #17211d;
  font-weight: 850;
  cursor: pointer;
}

.faq-list p {
  margin: 8px 0 0;
}

.page-footer {
  margin-top: 36px;
  padding-top: 20px;
  border-top: 1px solid #d8e0d9;
}

@media (max-width: 960px) {
  .tool-grid {
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
  .controls,
  .tool-grid,
  .workbench__header,
  .workbench-grid,
  .panel-heading,
  .band-grid,
  .related-grid,
  .tool-layout,
  .content-layout {
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
