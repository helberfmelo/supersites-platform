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
  grid-template-columns: minmax(0, 920px);
  gap: 28px;
  align-items: end;
  padding: 26px 0 34px;
  border-bottom: 1px solid #d7ded8;
}

.hero--ip {
  grid-template-columns: minmax(0, 820px);
  align-items: start;
  padding-bottom: 22px;
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

.diagnostic-search {
  display: grid;
  gap: 8px;
  max-width: 760px;
  margin-top: 26px;
  padding: 14px;
  border: 1px solid #cfd9d2;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 14px 42px rgba(30, 48, 42, 0.08);
}

.diagnostic-search label {
  color: #34443e;
  font-size: 0.82rem;
  font-weight: 850;
}

.diagnostic-search__row {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 8px;
}

.diagnostic-search input {
  min-width: 0;
  min-height: 48px;
  padding: 0 14px;
  border: 1px solid #b8c8c0;
  border-radius: 8px;
  color: #17231e;
  background: #ffffff;
}

.diagnostic-search button {
  min-height: 48px;
  padding: 0 16px;
  border: 1px solid #275f57;
  border-radius: 8px;
  color: #ffffff;
  background: #275f57;
  font-weight: 850;
  cursor: pointer;
}

.diagnostic-search p {
  margin-bottom: 0;
  color: #5b6963;
  font-size: 0.88rem;
}

.diagnostic-panel {
  padding: 18px;
  border: 1px solid #cdd9d2;
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(39, 95, 87, 0.12), rgba(189, 116, 36, 0.08)),
    #ffffff;
}

.diagnostic-panel h2 {
  margin-bottom: 8px;
  font-size: 1.35rem;
}

.diagnostic-panel p {
  color: #3f504a;
}

.diagnostic-panel__links {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
  margin-top: 14px;
}

.diagnostic-panel__links a {
  min-width: 0;
  min-height: 38px;
  padding: 8px 10px;
  border: 1px solid #c7d4cd;
  border-radius: 8px;
  color: #275f57;
  background: rgba(255, 255, 255, 0.86);
  font-size: 0.88rem;
  font-weight: 850;
  text-decoration: none;
}

.home-section {
  padding: 30px 0 0;
}

.section-heading {
  max-width: 760px;
  margin-bottom: 16px;
}

.section-heading .eyebrow {
  margin-bottom: 7px;
}

.section-heading h2 {
  margin-bottom: 8px;
}

.section-heading p {
  margin-bottom: 0;
  color: #4a5a54;
}

.quick-tool-grid {
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  gap: 10px;
}

.quick-tool-card {
  display: grid;
  min-height: 210px;
  align-content: space-between;
  gap: 10px;
  padding: 14px;
  border: 1px solid #d1dad4;
  border-radius: 8px;
  background: #ffffff;
}

.quick-tool-card__mark {
  display: inline-flex;
  width: fit-content;
  max-width: 100%;
  min-height: 28px;
  align-items: center;
  padding: 4px 8px;
  border-radius: 7px;
  color: #275f57;
  background: #e6f3ef;
  font-size: 0.72rem;
  font-weight: 850;
  overflow-wrap: anywhere;
}

.quick-tool-card h3 {
  margin-bottom: 0;
  font-size: 1rem;
}

.quick-tool-card p {
  margin-bottom: 0;
  color: #4a5a54;
  font-size: 0.88rem;
}

.quick-tool-card a {
  color: #275f57;
  font-size: 0.9rem;
  font-weight: 850;
  text-decoration: none;
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

.field-label {
  margin: 2px 0 0;
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

.checkbox-grid small {
  color: #6a756f;
  font-size: 0.68rem;
  font-weight: 760;
}

.record-choice--disabled {
  color: #6a756f;
  background: #edf1ed;
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

.support-band {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(240px, 360px);
  gap: 18px;
  align-items: center;
  margin-top: 24px;
  padding: 18px;
  border: 1px solid #d1dad4;
  border-radius: 8px;
  background: #ffffff;
}

.support-band h2 {
  margin-bottom: 8px;
}

.support-band p {
  margin-bottom: 0;
  color: #3f504a;
}

.support-band__actions {
  display: grid;
  gap: 8px;
}

.support-band__actions a {
  min-height: 38px;
  padding: 8px 10px;
  border: 1px solid #cbd8d2;
  border-radius: 8px;
  color: #275f57;
  background: #f7f8f4;
  font-size: 0.9rem;
  font-weight: 850;
  text-align: center;
  text-decoration: none;
}

.diagnostic-footer {
  margin-top: 34px;
  padding: 28px 0;
  border-top: 1px solid #d8ded8;
  border-bottom: 1px solid #d8ded8;
}

.diagnostic-footer__intro {
  max-width: 720px;
  margin-bottom: 22px;
}

.diagnostic-footer__intro h2 {
  margin-bottom: 8px;
}

.diagnostic-footer__intro p {
  margin-bottom: 0;
  color: #4a5a54;
}

.diagnostic-footer__grid {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 26px;
}

.diagnostic-footer__group {
  min-width: 0;
}

.diagnostic-footer__group h3 {
  margin-bottom: 10px;
  font-size: 0.82rem;
  font-weight: 850;
  letter-spacing: 0;
  text-transform: uppercase;
}

.diagnostic-footer__group a {
  display: block;
  margin: 7px 0;
  color: #35443f;
  font-size: 0.92rem;
  font-weight: 520;
  line-height: 1.25;
  text-decoration: none;
  transition: color 0.16s ease, font-size 0.16s ease, font-weight 0.16s ease;
}

.diagnostic-footer__group a:hover {
  color: #17231e;
  font-size: 0.97rem;
  font-weight: 760;
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

.input-panel,
.result-panel {
  padding: 18px;
}

.result-panel {
  margin-top: 14px;
}

.tool-workbench {
  min-width: 0;
}

.tool-layout--diagnostic > .tool-workbench {
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 14px;
  align-items: start;
}

.tool-layout--ip {
  grid-template-columns: 1fr;
}

.tool-layout--ip > .tool-workbench {
  grid-column: 1 / -1;
  display: grid;
  gap: 14px;
}

.tool-layout--ip .result-panel {
  margin-top: 0;
}

.tool-layout--diagnostic .input-panel,
.tool-layout--diagnostic .result-panel {
  margin-top: 0;
}

.tool-layout--diagnostic .upgrade-panel,
.tool-layout--diagnostic .privacy-strip,
.tool-layout--diagnostic .quick-related,
.tool-layout--diagnostic > .band {
  grid-column: 1 / -1;
}

.tool-layout > aside.band {
  grid-column: 1 / -1;
}

.hero--propagation {
  padding-bottom: 20px;
}

.input-panel--propagation {
  padding: 16px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.96), rgba(247, 248, 244, 0.98)),
    #ffffff;
}

.input-panel--propagation h2 {
  margin-bottom: 4px;
  font-size: 1.25rem;
}

.input-panel--propagation > p {
  margin-bottom: 12px;
}

.propagation-search-form {
  gap: 10px;
}

.propagation-search-bar {
  display: grid;
  grid-template-columns: minmax(240px, 1.35fr) minmax(92px, 0.28fr) minmax(220px, 0.9fr) auto;
  gap: 8px;
  align-items: end;
}

.propagation-search-field {
  display: grid;
  min-width: 0;
  gap: 7px;
}

.propagation-search-field label {
  color: #4b5b55;
  font-size: 0.82rem;
  font-weight: 850;
}

.propagation-search-field input,
.propagation-search-field select {
  width: 100%;
  min-height: 44px;
  border: 1px solid #bac9c2;
  border-radius: 8px;
  color: #17231e;
  background: #ffffff;
}

.propagation-search-field input {
  padding: 0 13px;
}

.propagation-search-field select {
  padding: 0 34px 0 11px;
}

.propagation-search-submit {
  min-height: 44px;
  white-space: nowrap;
}

.input-panel--propagation .record-tabs {
  grid-template-columns: repeat(10, minmax(0, 1fr));
  margin-bottom: 0;
}

.record-tabs {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 6px;
  margin: 8px 0 10px;
}

.record-tabs button {
  min-height: 38px;
  border: 1px solid #bfd1c8;
  border-radius: 8px;
  color: #275f57;
  background: #ffffff;
  font-size: 0.84rem;
  font-weight: 850;
  cursor: pointer;
}

.record-tabs button[aria-selected="true"] {
  color: #ffffff;
  border-color: #275f57;
  background: #275f57;
}

.record-tabs button:disabled {
  color: #6a756f;
  border-color: #d8ded8;
  background: #edf1ed;
  cursor: not-allowed;
}

.record-tabs button small {
  display: block;
  margin-top: 2px;
  font-size: 0.62rem;
  font-weight: 760;
  line-height: 1.05;
}

.quick-port-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 7px;
  margin-bottom: 8px;
}

.quick-port-grid button {
  min-height: 38px;
  border: 1px solid #bfd1c8;
  border-radius: 8px;
  color: #275f57;
  background: #ffffff;
  font-weight: 850;
  cursor: pointer;
}

.quick-port-grid button[aria-pressed="true"] {
  color: #ffffff;
  border-color: #275f57;
  background: #275f57;
}

.ip-visual-panel {
  margin-bottom: 14px;
  padding: 18px;
  border: 1px solid #c5d7ce;
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgba(39, 95, 87, 0.12), rgba(247, 248, 244, 0.85)),
    repeating-linear-gradient(90deg, rgba(39, 95, 87, 0.09) 0 1px, transparent 1px 32px),
    #ffffff;
}

.ip-visual-panel > strong {
  display: block;
  margin-bottom: 10px;
  color: #17231e;
  font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace;
  font-size: clamp(1.55rem, 4vw, 2.45rem);
  line-height: 1.05;
  overflow-wrap: anywhere;
}

.ip-visual-panel__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 12px;
}

.ip-visual-panel__meta span {
  min-height: 30px;
  padding: 5px 9px;
  border: 1px solid #cbd8d2;
  border-radius: 999px;
  color: #21443e;
  background: #ffffff;
  font-size: 0.78rem;
  font-weight: 850;
}

.result-panel--ip {
  padding: 0;
  border: 0;
  background: transparent;
}

.ip-answer-shell {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(240px, 340px);
  gap: 14px;
  align-items: stretch;
}

.ip-answer-main,
.ip-privacy-card,
.privacy-option-panel,
.methodology-accordion,
.ip-detail-section {
  border: 1px solid #d1dad4;
  border-radius: 8px;
  background: #ffffff;
}

.ip-answer-main {
  min-width: 0;
  padding: 22px;
  background:
    linear-gradient(135deg, rgba(39, 95, 87, 0.13), rgba(189, 116, 36, 0.07)),
    repeating-linear-gradient(90deg, rgba(39, 95, 87, 0.08) 0 1px, transparent 1px 34px),
    #ffffff;
}

.ip-answer-main h2 {
  margin-bottom: 8px;
  font-size: clamp(1.5rem, 3.5vw, 2.4rem);
}

.ip-loading-copy {
  max-width: 680px;
  color: #3f504a;
}

.ip-address-value {
  display: block;
  margin: 8px 0 12px;
  color: #17231e;
  font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace;
  font-size: clamp(2rem, 7vw, 4.6rem);
  line-height: 1;
  overflow-wrap: anywhere;
}

.ip-privacy-card {
  display: grid;
  align-content: center;
  gap: 8px;
  padding: 18px;
  background: #f7f8f4;
}

.ip-privacy-card strong,
.ip-privacy-card span {
  display: block;
}

.ip-privacy-card strong {
  color: #17231e;
  font-size: 1rem;
}

.ip-privacy-card span {
  color: #3f504a;
  font-size: 0.9rem;
}

.result-actions--ip {
  margin-bottom: 0;
}

.ip-detail-section,
.privacy-option-panel,
.methodology-accordion {
  padding: 18px;
}

.ip-detail-section h3 {
  font-size: 1.18rem;
}

.ip-detail-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
  margin-top: 12px;
}

.ip-detail-card {
  min-width: 0;
  padding: 12px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background: #f7f8f4;
}

.ip-detail-card strong,
.ip-detail-card span {
  display: block;
}

.ip-detail-card strong {
  color: #607069;
  font-size: 0.72rem;
  text-transform: uppercase;
}

.ip-detail-card span {
  margin-top: 6px;
  color: #17231e;
  font-weight: 820;
  overflow-wrap: anywhere;
}

.ip-detail-card p,
.ip-map-panel p {
  margin: 7px 0 0;
  color: #52625c;
  font-size: 0.85rem;
}

.ip-map-panel {
  margin-top: 10px;
  padding: 14px;
  border: 1px dashed #b8c8c0;
  border-radius: 8px;
  background:
    linear-gradient(90deg, rgba(39, 95, 87, 0.08) 1px, transparent 1px),
    linear-gradient(180deg, rgba(39, 95, 87, 0.08) 1px, transparent 1px),
    #f7f8f4;
  background-size: 28px 28px;
}

.ip-map-panel strong {
  color: #17231e;
}

.privacy-option-panel {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
}

.privacy-option-panel h2 {
  margin-bottom: 8px;
  font-size: 1.25rem;
}

.privacy-option-panel p:last-child {
  margin-bottom: 0;
  color: #3f504a;
}

.methodology-accordion details {
  display: grid;
  gap: 12px;
}

.methodology-accordion summary {
  color: #17231e;
  font-size: 1rem;
  font-weight: 850;
  cursor: pointer;
}

.methodology-accordion p {
  margin: 12px 0;
  color: #3f504a;
}

.privacy-strip,
.quick-related {
  margin-top: 14px;
  padding: 16px;
  border: 1px solid #d1dad4;
  border-radius: 8px;
  background: #ffffff;
}

.privacy-strip {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 14px;
  align-items: center;
}

.privacy-strip h2,
.quick-related h2 {
  margin-bottom: 6px;
  font-size: 1.18rem;
}

.privacy-strip p {
  margin-bottom: 0;
  color: #3f504a;
}

.related-tool-list--inline {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.answer-strip {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin: 12px 0 16px;
}

.answer-card {
  min-width: 0;
  padding: 12px;
  border: 1px solid #d8ded8;
  border-top: 4px solid #607069;
  border-radius: 8px;
  background: #f7f8f4;
}

.answer-card--good {
  border-top-color: #2f855a;
}

.answer-card--warning {
  border-top-color: #bd7424;
}

.answer-card strong,
.answer-card span {
  display: block;
}

.answer-card strong {
  color: #607069;
  font-size: 0.72rem;
  text-transform: uppercase;
}

.answer-card span {
  margin-top: 5px;
  color: #17231e;
  font-size: 0.94rem;
  font-weight: 850;
  overflow-wrap: anywhere;
}

.result-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  margin: 10px 0 16px;
}

.result-actions span {
  color: #4f5f59;
  font-size: 0.86rem;
  font-weight: 800;
}

.result-callout {
  margin: 12px 0;
  padding: 14px;
  border-left: 4px solid #275f57;
  background: #f2f6f2;
}

.result-callout p:last-child {
  margin-bottom: 0;
}

.answer-strip--propagation {
  grid-template-columns: repeat(6, minmax(0, 1fr));
  margin-top: 8px;
}

.propagation-console {
  display: grid;
  gap: 14px;
}

.propagation-console > p {
  max-width: 820px;
  margin-bottom: 0;
  color: #3f504a;
}

.propagation-toolbar {
  margin: 0;
}

.propagation-results-grid {
  display: grid;
  grid-template-columns: minmax(300px, 0.78fr) minmax(0, 1.22fr);
  gap: 14px;
  align-items: start;
}

.resolver-list-panel,
.propagation-map-panel {
  min-width: 0;
}

.resolver-list-panel {
  display: grid;
  align-content: start;
  gap: 10px;
  padding: 12px;
  border: 1px solid #d5dfd9;
  border-radius: 8px;
  background: #ffffff;
}

.resolver-list-panel__heading,
.propagation-map-panel__heading {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.resolver-list-panel__heading h3,
.propagation-map-panel__heading h3 {
  margin-bottom: 3px;
}

.resolver-list-panel__heading p {
  margin-bottom: 0;
  color: #607069;
  font-size: 0.84rem;
}

.resolver-list {
  display: block;
  border: 1px solid #e1e7e3;
  border-radius: 6px;
  background: #ffffff;
  overflow: hidden;
}

.resolver-row {
  display: grid;
  grid-template-columns: 28px minmax(118px, 0.9fr) minmax(118px, 1fr) 26px;
  gap: 7px;
  align-items: center;
  min-width: 0;
  min-height: 38px;
  padding: 6px 7px;
  border-bottom: 1px solid #edf1ee;
  background: #ffffff;
}

.resolver-row:last-child {
  border-bottom: 0;
}

.resolver-row--good {
  background: #f6fbf7;
  box-shadow: inset 3px 0 0 #2f855a;
}

.resolver-row--warning {
  background: #fff8ef;
  box-shadow: inset 3px 0 0 #bd7424;
}

.resolver-row--neutral {
  background: #ffffff;
}

.resolver-row__flag {
  display: grid;
  width: 22px;
  height: 16px;
  place-items: center;
  border-radius: 2px;
  color: #275f57;
  font-size: 0.74rem;
  font-weight: 900;
  line-height: 1;
  overflow: hidden;
}

.resolver-row__place,
.resolver-row__answer {
  display: grid;
  min-width: 0;
  gap: 2px;
}

.resolver-row__place strong,
.resolver-row__answer strong {
  color: #17231e;
  font-size: 0.75rem;
  line-height: 1.2;
  overflow-wrap: anywhere;
}

.resolver-row__place span,
.resolver-row__answer span,
.resolver-row__place small,
.resolver-row__answer small {
  color: #607069;
  font-size: 0.64rem;
  font-weight: 760;
  line-height: 1.2;
  overflow-wrap: anywhere;
}

.resolver-row__answer strong {
  color: #2d6da3;
  font-size: 0.72rem;
  font-family: ui-monospace, SFMono-Regular, Consolas, "Liberation Mono", monospace;
}

.resolver-status-symbol {
  justify-self: end;
  color: #6c7973;
  font-size: 0.85rem;
  font-weight: 950;
  line-height: 1;
}

.resolver-status-symbol--good {
  color: #2f855a;
}

.resolver-status-symbol--warning {
  color: #b5471a;
}

.resolver-map--large {
  display: grid;
  gap: 10px;
  margin: 0;
}

.resolver-map--large .resolver-map__canvas {
  min-height: 430px;
}

.map-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
}

.map-legend span {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #607069;
  font-size: 0.78rem;
  font-weight: 820;
}

.map-legend__dot {
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 999px;
  background: #bd7424;
  box-shadow: 0 0 0 4px #f5e3ca;
}

.map-legend__dot--good {
  background: #2f855a;
  box-shadow: 0 0 0 4px #dcefe4;
}

.map-legend__dot--neutral {
  background: #d2a03a;
  box-shadow: 0 0 0 4px #f4ead4;
}

.propagation-after-results {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 0.55fr);
  gap: 14px;
  align-items: start;
}

.propagation-after-results .content-section {
  padding: 14px;
  border: 1px solid #d5dfd9;
  border-radius: 8px;
  background: #ffffff;
}

.expiry-meter {
  display: grid;
  gap: 10px;
  margin: 12px 0 14px;
  padding: 14px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background: #f7f8f4;
}

.expiry-meter strong,
.expiry-meter span {
  display: block;
}

.expiry-meter strong {
  color: #17231e;
}

.expiry-meter span {
  color: #52625c;
  font-size: 0.9rem;
}

.expiry-meter i {
  display: block;
  height: 12px;
  overflow: hidden;
  border-radius: 999px;
  background: #dbe4df;
}

.expiry-meter i::before {
  display: block;
  width: var(--expiry-fill, 0%);
  height: 100%;
  border-radius: inherit;
  background: #bd7424;
  content: "";
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

.result-card-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
  margin: 14px 0;
}

.result-card-grid article {
  min-width: 0;
  padding: 12px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background: #f7f8f4;
}

.result-card-grid strong,
.result-card-grid span {
  display: block;
}

.result-card-grid strong {
  color: #607069;
  font-size: 0.72rem;
  text-transform: uppercase;
}

.result-card-grid span {
  margin-top: 6px;
  color: #17231e;
  font-weight: 820;
  overflow-wrap: anywhere;
}

.result-empty {
  padding: 12px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background: #f7f8f4;
}

.result-meta strong,
.result-meta span {
  display: block;
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

.result-table strong,
.table-subtext {
  display: block;
}

.table-subtext {
  margin-top: 3px;
  color: #607069;
  font-size: 0.76rem;
  font-weight: 700;
}

.status-badge {
  display: inline-flex;
  max-width: 100%;
  padding: 5px 8px;
  border: 1px solid #d8ded8;
  border-radius: 999px;
  background: #f7f8f4;
  color: #26342f;
  font-size: 0.76rem;
  font-weight: 850;
  line-height: 1.2;
}

.status-badge--good {
  border-color: #b7d7c4;
  background: #e7f5ec;
  color: #1f6b45;
}

.status-badge--warning {
  border-color: #e4cba7;
  background: #fff4df;
  color: #895214;
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

.resolver-map {
  margin: 14px 0;
  padding: 14px;
  border: 1px solid #d5dfd9;
  border-radius: 8px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.84), rgba(247, 248, 244, 0.94)),
    repeating-linear-gradient(0deg, rgba(39, 95, 87, 0.08) 0 1px, transparent 1px 32px),
    repeating-linear-gradient(90deg, rgba(39, 95, 87, 0.08) 0 1px, transparent 1px 32px);
}

.resolver-map__canvas {
  position: relative;
  min-height: 260px;
  margin-top: 10px;
  border: 1px solid rgba(39, 95, 87, 0.18);
  border-radius: 8px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.28)),
    linear-gradient(135deg, #eef5f0, #f9fbf7);
  isolation: isolate;
  overflow: hidden;
}

.resolver-world-map {
  position: absolute;
  inset: 12px;
  z-index: 0;
  width: calc(100% - 24px);
  height: calc(100% - 24px);
  pointer-events: none;
}

.resolver-world-map__grid {
  fill: none;
  stroke: rgba(39, 95, 87, 0.09);
  stroke-width: 1;
  vector-effect: non-scaling-stroke;
}

.resolver-world-map__land {
  fill: #2f7095;
  opacity: 0.7;
  filter: drop-shadow(0 10px 18px rgba(36, 84, 111, 0.12));
}

.resolver-world-map__dots circle {
  fill: #2f7095;
  opacity: 0.76;
}

.resolver-marker {
  position: absolute;
  z-index: 2;
  transform: translate(-50%, -50%);
  display: grid;
  width: 16px;
  height: 16px;
  place-items: center;
  border: 2px solid #ffffff;
  border-radius: 999px;
  background: #d2a03a;
  color: #ffffff;
  font-size: 0.58rem;
  font-weight: 950;
  line-height: 1;
  box-shadow: 0 2px 7px rgba(20, 34, 29, 0.22);
}

.resolver-marker--good {
  background: #2f855a;
}

.resolver-marker--warning {
  background: #c94d35;
}

.upgrade-panel {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  margin-top: 14px;
  padding: 18px;
  border: 1px solid #d1dad4;
  border-radius: 8px;
  background: #ffffff;
}

.upgrade-panel h2 {
  margin-bottom: 8px;
  font-size: 1.25rem;
}

.upgrade-panel p:last-child {
  margin-bottom: 0;
}

.sponsor-reserve {
  min-height: 100px;
  max-width: 728px;
  margin: 14px auto 0;
  border: 1px dashed #cbd8d2;
  border-radius: 8px;
  background:
    repeating-linear-gradient(135deg, rgba(39, 95, 87, 0.08) 0 8px, transparent 8px 16px),
    #f7f8f4;
  aspect-ratio: 728 / 100;
  pointer-events: none;
}

.related-tool-list {
  display: grid;
  gap: 8px;
}

.related-tool-list a {
  display: flex;
  min-height: 38px;
  align-items: center;
  padding: 8px 10px;
  border: 1px solid #cbd8d2;
  border-radius: 8px;
  color: #275f57;
  background: #ffffff;
  font-size: 0.9rem;
  font-weight: 850;
  text-decoration: none;
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

@media (min-width: 821px) {
  .result-table {
    table-layout: auto;
  }

  .result-table th:last-child,
  .result-table td:last-child {
    width: 40%;
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
  .diagnostic-search__row,
  .diagnostic-panel__links,
  .quick-tool-grid,
  .support-band,
  .diagnostic-footer__grid,
  .controls,
  .checkbox-grid,
  .tool-grid,
  .band-grid,
  .tool-layout,
  .content-layout,
  .answer-strip,
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

  .quick-tool-card {
    min-height: 0;
  }

  .tool-layout--diagnostic > .tool-workbench,
  .tool-layout--ip > .tool-workbench,
  .ip-answer-shell,
  .ip-detail-grid,
  .result-card-grid,
  .propagation-search-bar,
  .propagation-results-grid,
  .propagation-after-results,
  .upgrade-panel,
  .privacy-option-panel,
  .privacy-strip,
  .related-tool-list--inline {
    display: grid;
    grid-template-columns: 1fr;
    align-items: start;
  }

  .resolver-map__canvas {
    min-height: 320px;
  }

  .resolver-map--large .resolver-map__canvas {
    min-height: 340px;
  }

  .resolver-marker {
    width: 14px;
    height: 14px;
    font-size: 0.52rem;
  }

  .hero--ip {
    grid-template-columns: 1fr;
  }

  .record-tabs {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .input-panel--propagation .record-tabs {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  .propagation-search-submit {
    width: 100%;
  }

  .resolver-list-panel,
  .propagation-map-panel {
    padding: 10px;
  }

  .resolver-list-panel__heading,
  .propagation-map-panel__heading {
    align-items: flex-start;
  }

  .resolver-row {
    grid-template-columns: 38px minmax(0, 1fr);
    align-items: start;
  }

  .resolver-row__flag {
    width: 32px;
    height: 32px;
  }

  .resolver-row__answer,
  .resolver-status-symbol {
    grid-column: 2;
  }

  .quick-port-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sponsor-reserve {
    width: 100%;
    max-width: 360px;
    aspect-ratio: 320 / 100;
  }
}
</style>
