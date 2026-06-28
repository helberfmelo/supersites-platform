<template>
  <NuxtPage />
  <ConsentBanner />
</template>

<style>
:root {
  color: #18231f;
  background: #f6f7f2;
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
  outline: 3px solid #1f7a8c;
  outline-offset: 3px;
}

.page-shell {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
  padding: 28px 0 64px;
}

.site-header {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  padding: 12px 0 28px;
}

.brand-link {
  display: inline-flex;
  gap: 10px;
  align-items: center;
  color: #15231e;
  font-weight: 850;
  text-decoration: none;
}

.brand-mark {
  display: grid;
  width: 36px;
  height: 36px;
  place-items: center;
  border-radius: 8px;
  color: #ffffff;
  background: #254c6a;
  font-size: 0.85rem;
  font-weight: 900;
}

.language-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: flex-end;
}

.language-nav a {
  min-height: 34px;
  padding: 7px 10px;
  border: 1px solid #cfd8d3;
  border-radius: 8px;
  color: #33423b;
  background: #ffffff;
  font-size: 0.85rem;
  font-weight: 750;
  text-decoration: none;
}

.language-nav a[aria-current="page"] {
  color: #ffffff;
  border-color: #254c6a;
  background: #254c6a;
}

.hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(280px, 420px);
  gap: 32px;
  align-items: end;
  padding: 28px 0 34px;
  border-bottom: 1px solid #d8ded8;
}

.hero > *,
.site-card > *,
.band > *,
.network-panel__row > * {
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
h3 {
  overflow-wrap: anywhere;
}

p,
dd,
strong,
span,
.button-link,
.category-tabs button {
  overflow-wrap: break-word;
}

h1,
h2,
h3,
p {
  margin-top: 0;
}

h1 {
  max-width: 840px;
  width: 100%;
  margin-bottom: 16px;
  font-size: 4.75rem;
  line-height: 0.98;
  word-break: normal;
}

h2 {
  margin-bottom: 12px;
  font-size: 2.05rem;
  line-height: 1.1;
}

h3 {
  margin-bottom: 8px;
  font-size: 1.08rem;
}

.lead {
  max-width: 740px;
  margin-bottom: 0;
  color: #46554e;
  font-size: 1.05rem;
}

.network-panel {
  min-width: 0;
  border: 1px solid #cfd8d3;
  border-radius: 8px;
  background: #ffffff;
}

.network-panel__row {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 14px;
  align-items: center;
  padding: 14px;
  border-bottom: 1px solid #e4e8e2;
}

.network-panel__row:last-child {
  border-bottom: 0;
}

.network-panel strong,
.network-panel span {
  display: block;
}

.network-panel strong {
  overflow-wrap: anywhere;
  color: #16231f;
  font-size: 0.95rem;
}

.network-panel span {
  color: #647069;
  font-size: 0.84rem;
}

.signal {
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #2e8a57;
  box-shadow: 0 0 0 5px #dcefe3;
}

.signal--amber {
  background: #bd7424;
  box-shadow: 0 0 0 5px #f5e3ca;
}

.launch-desk,
.intent-section {
  padding: 26px 0;
  border-bottom: 1px solid #d8ded8;
}

.section-heading {
  display: grid;
  max-width: 760px;
  gap: 8px;
  margin-bottom: 18px;
}

.section-heading h2,
.section-heading p {
  margin-bottom: 0;
}

.section-heading p {
  color: #46554e;
}

.section-heading--compact {
  margin-bottom: 14px;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.feature-card,
.intent-card {
  display: grid;
  min-width: 0;
  gap: 14px;
  padding: 16px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  background: #ffffff;
}

.feature-card {
  align-content: space-between;
  min-height: 330px;
}

.feature-card h3,
.intent-card h3 {
  margin-top: 6px;
  font-size: 1.25rem;
}

.feature-card p,
.intent-card p {
  margin-bottom: 0;
  color: #3f5048;
}

.preview-frame {
  position: relative;
  display: grid;
  min-height: 118px;
  gap: 8px;
  align-content: end;
  padding: 14px;
  overflow: hidden;
  border: 1px solid #cbd8d1;
  border-radius: 8px;
  background:
    linear-gradient(135deg, rgb(37 76 106 / 12%), rgb(46 138 87 / 10%)),
    #f8faf7;
}

.preview-frame::before {
  position: absolute;
  top: 12px;
  left: 14px;
  width: 46px;
  height: 10px;
  border-radius: 999px;
  background: #254c6a;
  content: "";
}

.preview-frame span {
  display: block;
  height: 10px;
  border-radius: 999px;
  background: #d4e2dc;
}

.preview-frame span:nth-child(1) {
  width: 82%;
  background: #254c6a;
}

.preview-frame span:nth-child(2) {
  width: 66%;
}

.preview-frame span:nth-child(3) {
  width: 46%;
}

.preview-frame i {
  position: absolute;
  right: 14px;
  bottom: 14px;
  width: 42px;
  height: 42px;
  border-radius: 8px;
  background: #bd7424;
}

.preview-frame[data-category="calculators"] i,
.preview-frame[data-category="time"] i {
  background: #2e8a57;
}

.preview-frame[data-category="developer"] i {
  background: #7b5aa6;
}

.evidence-strip {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 14px;
  align-items: center;
  margin-top: 14px;
  padding: 14px 16px;
  border-left: 4px solid #2e8a57;
  background: #eef6f0;
}

.evidence-strip strong {
  color: #143b2b;
}

.evidence-strip span {
  color: #41524a;
}

.intent-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
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
  color: #4a5851;
  font-size: 0.82rem;
  font-weight: 800;
}

.field input,
.field select {
  width: 100%;
  min-height: 44px;
  border: 1px solid #bac8c1;
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

.category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.category-tabs button {
  min-height: 38px;
  padding: 8px 12px;
  border: 1px solid #cfd8d3;
  border-radius: 8px;
  color: #34423b;
  background: #ffffff;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 800;
}

.category-tabs button[aria-pressed="true"] {
  color: #ffffff;
  border-color: #254c6a;
  background: #254c6a;
}

.catalog-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.site-card {
  display: grid;
  min-width: 0;
  min-height: 310px;
  align-content: space-between;
  gap: 16px;
  padding: 18px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  background: #ffffff;
}

.site-card__topline,
.detail-topline {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
}

.site-card__signals {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin: 14px 0;
  list-style: none;
}

.site-card__signals li {
  min-height: 30px;
  padding: 5px 9px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  color: #31453b;
  background: #f8faf7;
  font-size: 0.78rem;
  font-weight: 850;
}

.category {
  color: #617069;
  font-size: 0.84rem;
  font-weight: 800;
}

.status {
  flex: 0 0 auto;
  padding: 4px 8px;
  border-radius: 8px;
  color: #253229;
  background: #e9eee8;
  font-size: 0.78rem;
  font-weight: 850;
}

.status--success,
.status--foundation {
  color: #123f2d;
  background: #ccebd9;
}

.status--info,
.status--planned {
  color: #254c6a;
  background: #d9e9f3;
}

.status--warning,
.status--blocked {
  color: #5c3710;
  background: #f5dfba;
}

.site-card p,
.detail-copy {
  color: #3f5048;
}

.site-card dl,
.fact-list {
  display: grid;
  gap: 11px;
  margin: 0;
}

.site-card dt,
.fact-list dt {
  color: #607069;
  font-size: 0.77rem;
  font-weight: 850;
  text-transform: uppercase;
}

.site-card dd,
.fact-list dd {
  margin: 2px 0 0;
  color: #25332d;
}

.card-actions,
.detail-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
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
}

.button-link--secondary {
  color: #254c6a;
  background: #ffffff;
}

.empty-state,
.band {
  margin-top: 24px;
  padding: 18px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  background: #ffffff;
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
  border-top: 3px solid #2e8a57;
}

.band-grid div:nth-child(2) {
  border-color: #254c6a;
}

.band-grid div:nth-child(3) {
  border-color: #bd7424;
}

.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 18px;
  color: #5d6b64;
  font-size: 0.9rem;
}

.breadcrumb a {
  font-weight: 800;
  text-decoration: none;
}

.detail-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 360px);
  gap: 24px;
  align-items: start;
  margin-top: 24px;
}

.detail-section {
  padding-top: 20px;
  border-top: 1px solid #d8ded8;
}

.check-list {
  display: grid;
  gap: 10px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.check-list li {
  position: relative;
  padding-left: 22px;
  color: #34443d;
}

.check-list li::before {
  position: absolute;
  top: 0.72em;
  left: 0;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #2e8a57;
  content: "";
}

.page-footer {
  display: grid;
  grid-template-columns: minmax(220px, 300px) minmax(0, 1fr);
  gap: 18px;
  align-items: start;
  margin-top: 36px;
  padding-top: 20px;
  border-top: 1px solid #d8ded8;
}

.page-footer__brand {
  display: inline-flex;
  margin-bottom: 8px;
  color: #15231e;
  font-weight: 900;
  text-decoration: none;
}

.page-footer__intro p {
  margin-bottom: 0;
  color: #4c5a53;
}

.page-footer__links,
.inline-link-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.page-footer__links {
  justify-content: flex-start;
}

.page-footer__links a,
.inline-link-list a {
  min-height: 34px;
  padding: 7px 10px;
  border: 1px solid #cfd8d3;
  border-radius: 8px;
  color: #33423b;
  background: #ffffff;
  font-size: 0.85rem;
  font-weight: 800;
  text-decoration: none;
}

.page-footer__links a[aria-current="page"],
.inline-link-list a:hover {
  color: #ffffff;
  border-color: #254c6a;
  background: #254c6a;
}

.footer-verticals {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.footer-verticals section {
  min-width: 0;
}

.footer-verticals h2 {
  margin-bottom: 8px;
  color: #17231e;
  font-size: 0.96rem;
}

.page-footer__links--legal {
  grid-column: 1 / -1;
  padding-top: 16px;
  border-top: 1px solid #d8ded8;
}

.content-hero h1 {
  max-width: 760px;
  font-size: 3.4rem;
  line-height: 1.05;
}

.content-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(260px, 340px);
  gap: 24px;
  align-items: start;
  margin-top: 24px;
}

.content-section {
  padding: 18px 0;
  border-top: 1px solid #d8ded8;
}

.content-section p {
  max-width: 780px;
  color: #3f5048;
}

.content-side {
  margin-top: 0;
}

.consent-banner {
  position: fixed;
  z-index: 30;
  right: 16px;
  bottom: 16px;
  left: 16px;
  display: flex;
  justify-content: flex-end;
  pointer-events: none;
}

.consent-banner__panel {
  display: grid;
  width: min(560px, 100%);
  gap: 14px;
  padding: 16px;
  border: 1px solid #b9c6c0;
  border-radius: 8px;
  color: #17231e;
  background: #ffffff;
  box-shadow: 0 18px 50px rgb(24 35 31 / 16%);
  pointer-events: auto;
}

.consent-banner h2 {
  margin-bottom: 6px;
  font-size: 1.05rem;
}

.consent-banner p {
  margin-bottom: 0;
  color: #3f5048;
  font-size: 0.92rem;
}

.consent-banner__note {
  margin-top: 8px;
  color: #5c3710;
}

.consent-banner__choices {
  display: grid;
  gap: 8px;
}

.consent-banner__choices label {
  display: flex;
  gap: 8px;
  align-items: center;
  color: #25332d;
  font-size: 0.92rem;
  font-weight: 750;
}

.consent-banner__choices input {
  width: 18px;
  height: 18px;
  accent-color: #254c6a;
}

.consent-banner__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.consent-banner__actions .button-link {
  border-radius: 8px;
  cursor: pointer;
}

.ad-placeholder {
  display: grid;
  width: min(100%, 728px);
  margin: 28px auto 0;
  place-items: center;
  border: 1px dashed #aebbb5;
  border-radius: 8px;
  color: #4f5f57;
  background:
    linear-gradient(135deg, rgb(37 76 106 / 8%), rgb(46 138 87 / 8%)),
    #ffffff;
  pointer-events: none;
}

.ad-placeholder__inner {
  display: grid;
  gap: 4px;
  max-width: 560px;
  padding: 14px;
  text-align: center;
}

.ad-placeholder strong {
  color: #25332d;
  font-size: 0.9rem;
}

.ad-placeholder span {
  color: #5c6a63;
  font-size: 0.82rem;
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
  .catalog-grid,
  .band-grid,
  .detail-layout,
  .content-layout {
    grid-template-columns: 1fr;
  }

  .site-header {
    display: grid;
    align-items: start;
  }

  .language-nav {
    justify-content: flex-start;
  }

  .page-footer__links {
    justify-content: flex-start;
  }

  h1 {
    max-width: 100%;
    font-size: 2rem;
    line-height: 1.04;
    word-break: break-word;
  }

  h2 {
    font-size: 1.55rem;
  }

  .content-hero h1 {
    font-size: 2rem;
  }

  .feature-grid,
  .intent-grid,
  .footer-verticals,
  .evidence-strip {
    grid-template-columns: 1fr;
  }

  .site-card {
    min-height: 0;
  }

  .consent-banner {
    right: 10px;
    bottom: 10px;
    left: 10px;
  }

  .consent-banner__actions .button-link {
    width: 100%;
  }

  .ad-placeholder {
    width: 100%;
  }
}
</style>
