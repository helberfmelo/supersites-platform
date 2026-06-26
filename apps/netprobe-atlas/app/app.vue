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
select {
  font: inherit;
}

button:focus-visible,
input:focus-visible,
select:focus-visible,
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
  .band-grid,
  .tool-layout,
  .content-layout,
  .result-meta {
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
