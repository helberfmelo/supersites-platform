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
.category-tabs button[aria-pressed="true"] {
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
.input-panel > *,
.result-panel > *,
.preview-panel > * {
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
  color: #475c5d;
  font-size: 1.04rem;
}

.status-panel,
.band,
.tool-card,
.input-panel,
.result-panel,
.preview-panel {
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
.preview-panel {
  padding: 18px;
}

.result-panel,
.preview-panel {
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

.preview-panel {
  border: 1px solid #d1dcdd;
  border-radius: 8px;
  background: #ffffff;
}

.preview-frame {
  display: grid;
  min-height: 300px;
  place-items: center;
  padding: 18px;
  border: 1px solid #d8e0e1;
  border-radius: 8px;
  overflow: auto;
  background: #f8fafb;
}

.preview-frame img {
  display: block;
  width: min(100%, 420px);
  height: auto;
  max-height: 360px;
  object-fit: contain;
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

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.form-grid--three {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.image-form input[type='file'] {
  min-height: auto;
  padding: 11px;
  background: #ffffff;
}

.field-help {
  margin: 6px 0 0;
  color: #607174;
  font-size: 0.88rem;
}

.image-preview {
  display: grid;
  gap: 12px;
  margin: 0;
}

.image-preview__frame {
  display: grid;
  min-height: 240px;
  place-items: center;
  padding: 16px;
  border: 1px solid #d8e0e1;
  border-radius: 8px;
  background:
    linear-gradient(45deg, #f4f7f7 25%, transparent 25%),
    linear-gradient(-45deg, #f4f7f7 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #f4f7f7 75%),
    linear-gradient(-45deg, transparent 75%, #f4f7f7 75%);
  background-color: #ffffff;
  background-position: 0 0, 0 10px, 10px -10px, -10px 0;
  background-size: 20px 20px;
}

.image-preview img {
  display: block;
  width: auto;
  max-width: 100%;
  max-height: 520px;
  border-radius: 6px;
  box-shadow: 0 14px 36px rgb(12 33 35 / 18%);
}

.image-preview figcaption,
.warning-list {
  color: #607174;
  font-size: 0.92rem;
}

.warning-list {
  display: grid;
  gap: 8px;
  margin: 0;
  padding-left: 20px;
}

.content-hero h1 {
  max-width: 760px;
  font-size: clamp(2rem, 5vw, 3.7rem);
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
  .band-grid,
  .tool-layout,
  .content-layout,
  .form-grid,
  .form-grid--three {
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

