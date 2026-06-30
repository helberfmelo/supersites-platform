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
  font-size: 3.35rem;
  line-height: 1.02;
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

.tool-finder {
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(320px, 1.1fr);
  gap: 28px;
  align-items: start;
  padding: 26px 0 24px;
  border-bottom: 1px solid #d8ded8;
}

.tool-finder > *,
.finder-panel > *,
.trust-row > * {
  min-width: 0;
}

.tool-finder__intro {
  display: grid;
  gap: 12px;
}

.tool-finder__intro h1,
.tool-finder__intro p {
  margin-bottom: 0;
}

.finder-panel {
  display: grid;
  gap: 14px;
  padding: 18px;
  border: 1px solid #cfd8d3;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 16px 42px rgb(24 35 31 / 8%);
}

.field--finder label {
  color: #17231e;
  font-size: 0.92rem;
}

.field--finder input {
  min-height: 56px;
  border-color: #97aaa0;
  font-size: 1rem;
}

.category-tabs--finder {
  margin-bottom: 0;
}

.trust-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.trust-row div {
  min-height: 86px;
  padding: 11px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background: #f8faf7;
}

.trust-row strong,
.trust-row span {
  display: block;
}

.trust-row strong {
  margin-bottom: 4px;
  color: #143b2b;
  font-size: 0.88rem;
}

.trust-row span {
  color: #4d5d55;
  font-size: 0.82rem;
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

.netprobe-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 430px);
  gap: 28px;
  align-items: stretch;
  padding: 28px 0 34px;
  border-bottom: 1px solid #d8ded8;
}

.netprobe-hero > *,
.netprobe-section > *,
.netprobe-footer-cluster > * {
  min-width: 0;
}

.netprobe-hero__copy {
  display: grid;
  align-content: center;
  gap: 16px;
}

.netprobe-hero__copy h1,
.netprobe-hero__copy p {
  margin-bottom: 0;
}

.netprobe-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.netprobe-start-panel {
  display: grid;
  gap: 14px;
  align-content: start;
  padding: 18px;
  border: 1px solid #cfd8d3;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 16px 42px rgb(24 35 31 / 8%);
}

.netprobe-start-panel h2 {
  margin-bottom: 0;
  font-size: 1.35rem;
}

.netprobe-start-panel p {
  margin-bottom: 0;
  color: #46554e;
  font-size: 0.94rem;
}

.netprobe-start-list {
  display: grid;
  gap: 8px;
}

.netprobe-start-link {
  display: grid;
  grid-template-columns: 44px minmax(0, 1fr);
  gap: 10px;
  align-items: center;
  min-height: 52px;
  padding: 9px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  color: #17231e;
  background: #f8faf7;
  text-decoration: none;
  transition: border-color 160ms ease, background 160ms ease, transform 160ms ease;
}

.netprobe-start-link span,
.netprobe-tool-card__glyph {
  display: grid;
  width: 42px;
  height: 34px;
  place-items: center;
  border: 1px solid #b9d2cf;
  border-radius: 8px;
  color: #173f55;
  background: #edf7f5;
  font-size: 0.72rem;
  font-weight: 900;
}

.netprobe-start-link strong {
  min-width: 0;
  color: #1e3028;
  font-size: 0.94rem;
}

.netprobe-start-link:hover,
.netprobe-start-link:focus-visible {
  transform: translateY(-1px);
  border-color: #254c6a;
  background: #ffffff;
}

.netprobe-section,
.netprobe-footer-cluster {
  padding: 26px 0;
  border-bottom: 1px solid #d8ded8;
}

.netprobe-tool-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 12px;
}

.netprobe-tool-card {
  display: grid;
  min-width: 0;
  min-height: 190px;
  grid-template-rows: auto 1fr auto;
  gap: 12px;
  padding: 16px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  color: #17231e;
  background: #ffffff;
  text-decoration: none;
  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
}

.netprobe-tool-card:hover,
.netprobe-tool-card:focus-visible {
  transform: translateY(-1px);
  border-color: #254c6a;
  box-shadow: 0 10px 28px rgb(37 76 106 / 10%);
}

.netprobe-tool-card__body {
  display: grid;
  gap: 8px;
  align-content: start;
}

.netprobe-tool-card__body strong {
  color: #17231e;
  font-size: 1.04rem;
  line-height: 1.25;
}

.netprobe-tool-card__body span {
  color: #3f5048;
  font-size: 0.9rem;
}

.netprobe-tool-card em {
  color: #254c6a;
  font-size: 0.86rem;
  font-style: normal;
  font-weight: 850;
}

.netprobe-level-grid,
.netprobe-footer-grid {
  display: grid;
  gap: 14px;
}

.netprobe-level-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.netprobe-level-card {
  min-width: 0;
  padding: 16px 0 0;
  border-top: 3px solid #2e8a57;
}

.netprobe-level-card:nth-child(2) {
  border-color: #254c6a;
}

.netprobe-level-card:nth-child(3) {
  border-color: #bd7424;
}

.netprobe-level-card h3 {
  margin-bottom: 6px;
  font-size: 1.02rem;
}

.netprobe-level-card p {
  margin-bottom: 0;
  color: #3f5048;
  font-size: 0.93rem;
}

.netprobe-footer-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
  padding-top: 4px;
}

.netprobe-footer-grid h3 {
  margin-bottom: 8px;
  color: #17231e;
  font-size: 0.76rem;
  font-weight: 760;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.netprobe-footer-grid ul {
  display: grid;
  gap: 6px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.netprobe-footer-grid a {
  display: inline-block;
  color: #3f4f47;
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.35;
  text-decoration: none;
  transform-origin: left center;
  transition: color 160ms ease, transform 160ms ease, font-weight 160ms ease;
}

.netprobe-footer-grid a:hover,
.netprobe-footer-grid a:focus-visible {
  color: #0f4d70;
  font-weight: 700;
  text-decoration: none;
  transform: translateX(2px) scale(1.025);
}

.netprobe-dev-shortcut {
  padding: 18px 0 0;
}

.calcharbor-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(330px, 460px);
  gap: 28px;
  align-items: stretch;
  padding: 28px 0 34px;
  border-bottom: 1px solid #d8ded8;
}

.calcharbor-hero > *,
.calcharbor-section > *,
.calcharbor-footer-cluster > * {
  min-width: 0;
}

.calcharbor-hero__copy {
  display: grid;
  align-content: start;
  gap: 16px;
}

.calcharbor-hero__copy h1,
.calcharbor-hero__copy p {
  margin-bottom: 0;
}

.calcharbor-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.calcharbor-finder {
  display: grid;
  gap: 14px;
  align-content: start;
  padding: 18px;
  border: 1px solid #cfd8d3;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 16px 42px rgb(24 35 31 / 8%);
}

.calcharbor-finder h2 {
  margin-bottom: 0;
  font-size: 1.35rem;
}

.calcharbor-finder p {
  margin-bottom: 0;
  color: #46554e;
  font-size: 0.94rem;
}

.calcharbor-category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.calcharbor-category-tabs button {
  min-height: 32px;
  padding: 6px 9px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  color: #31453b;
  background: #ffffff;
  font-size: 0.8rem;
  font-weight: 780;
  cursor: pointer;
}

.calcharbor-category-tabs button[aria-pressed="true"] {
  color: #ffffff;
  border-color: #254c6a;
  background: #254c6a;
}

.calcharbor-finder__shortcuts {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.calcharbor-finder__shortcuts a {
  display: grid;
  min-width: 0;
  min-height: 64px;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 9px;
  align-items: center;
  padding: 9px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  color: #17231e;
  background: #f8faf7;
  text-decoration: none;
  transition: border-color 160ms ease, background 160ms ease, transform 160ms ease;
}

.calcharbor-finder__shortcuts a:hover,
.calcharbor-finder__shortcuts a:focus-visible {
  transform: translateY(-1px);
  border-color: #254c6a;
  background: #ffffff;
}

.calcharbor-finder__shortcuts span,
.calcharbor-tool-card__glyph {
  display: grid;
  width: 42px;
  height: 34px;
  place-items: center;
  border: 1px solid #cbd6bd;
  border-radius: 8px;
  color: #395018;
  background: #f1f6e8;
  font-size: 0.7rem;
  font-weight: 900;
}

.calcharbor-finder__shortcuts strong {
  min-width: 0;
  color: #1e3028;
  font-size: 0.9rem;
  line-height: 1.25;
}

.calcharbor-section,
.calcharbor-footer-cluster {
  padding: 26px 0;
  border-bottom: 1px solid #d8ded8;
}

.calcharbor-popular-grid,
.calcharbor-tool-grid,
.calcharbor-topic-grid,
.calcharbor-footer-grid {
  display: grid;
  gap: 12px;
}

.calcharbor-popular-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.calcharbor-tool-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.calcharbor-tool-card {
  display: grid;
  min-width: 0;
  min-height: 188px;
  grid-template-rows: auto 1fr auto;
  gap: 12px;
  padding: 16px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  color: #17231e;
  background: #ffffff;
  text-decoration: none;
  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
}

.calcharbor-tool-card--featured {
  border-top: 3px solid #bd7424;
}

.calcharbor-tool-card:hover,
.calcharbor-tool-card:focus-visible {
  transform: translateY(-1px);
  border-color: #254c6a;
  box-shadow: 0 10px 28px rgb(37 76 106 / 10%);
}

.calcharbor-tool-card__body {
  display: grid;
  gap: 7px;
  align-content: start;
}

.calcharbor-tool-card__body span {
  color: #65746c;
  font-size: 0.72rem;
  font-weight: 850;
  text-transform: uppercase;
}

.calcharbor-tool-card__body strong {
  color: #17231e;
  font-size: 1.02rem;
  line-height: 1.25;
}

.calcharbor-tool-card__body em {
  color: #3f5048;
  font-size: 0.88rem;
  font-style: normal;
  line-height: 1.42;
}

.calcharbor-tool-card b {
  color: #254c6a;
  font-size: 0.84rem;
  font-weight: 850;
}

.calcharbor-empty {
  padding: 16px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  background: #ffffff;
}

.calcharbor-empty h3 {
  margin-bottom: 6px;
  font-size: 1.05rem;
}

.calcharbor-empty p {
  margin-bottom: 0;
  color: #3f5048;
}

.calcharbor-topic-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.calcharbor-topic-grid article {
  min-width: 0;
  padding: 15px 0 0;
  border-top: 3px solid #2e8a57;
}

.calcharbor-topic-grid article:nth-child(2) {
  border-color: #254c6a;
}

.calcharbor-topic-grid article:nth-child(3) {
  border-color: #bd7424;
}

.calcharbor-topic-grid article:nth-child(4) {
  border-color: #607069;
}

.calcharbor-topic-grid h3 {
  margin-bottom: 6px;
  font-size: 1rem;
}

.calcharbor-topic-grid p {
  margin-bottom: 0;
  color: #3f5048;
  font-size: 0.91rem;
}

.calcharbor-footer-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.calcharbor-footer-grid h2 {
  margin-bottom: 8px;
  color: #17231e;
  font-size: 0.76rem;
  font-weight: 760;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.calcharbor-footer-grid ul {
  display: grid;
  gap: 6px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.calcharbor-footer-grid a {
  display: inline-block;
  color: #3f4f47;
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.35;
  text-decoration: none;
  transform-origin: left center;
  transition: color 160ms ease, transform 160ms ease, font-weight 160ms ease;
}

.calcharbor-footer-grid a:hover,
.calcharbor-footer-grid a:focus-visible {
  color: #0f4d70;
  font-weight: 700;
  text-decoration: none;
  transform: translateX(2px) scale(1.025);
}

.devutility-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(340px, 470px);
  gap: 28px;
  align-items: stretch;
  padding: 28px 0 34px;
  border-bottom: 1px solid #d8ded8;
}

.devutility-hero > *,
.devutility-section > *,
.devutility-footer-cluster > * {
  min-width: 0;
}

.devutility-hero__copy {
  display: grid;
  align-content: start;
  gap: 16px;
}

.devutility-hero__copy h1,
.devutility-hero__copy p {
  margin-bottom: 0;
}

.devutility-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.devutility-finder {
  display: grid;
  gap: 14px;
  align-content: start;
  padding: 18px;
  border: 1px solid #cbd6d7;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 16px 42px rgb(24 35 31 / 8%);
}

.devutility-finder h2 {
  margin-bottom: 0;
  font-size: 1.35rem;
}

.devutility-finder p {
  margin-bottom: 0;
  color: #46554e;
  font-size: 0.94rem;
}

.devutility-category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
}

.devutility-category-tabs button {
  min-height: 32px;
  padding: 6px 9px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  color: #31453b;
  background: #ffffff;
  font-size: 0.8rem;
  font-weight: 780;
  cursor: pointer;
}

.devutility-category-tabs button[aria-pressed="true"] {
  color: #ffffff;
  border-color: #254c6a;
  background: #254c6a;
}

.devutility-privacy-note {
  display: grid;
  gap: 4px;
  padding: 11px;
  border-left: 3px solid #2e8a57;
  color: #34443d;
  background: #f6faf7;
  font-size: 0.84rem;
  line-height: 1.4;
}

.devutility-privacy-note strong {
  color: #17231e;
  font-size: 0.78rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.devutility-section,
.devutility-footer-cluster {
  padding: 26px 0;
  border-bottom: 1px solid #d8ded8;
}

.devutility-shortcut-grid,
.devutility-tool-grid,
.devutility-footer-grid {
  display: grid;
  gap: 12px;
}

.devutility-shortcut-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.devutility-shortcut-grid article {
  min-width: 0;
  padding-top: 15px;
  border-top: 3px solid #254c6a;
}

.devutility-shortcut-grid article:nth-child(2) {
  border-color: #2e8a57;
}

.devutility-shortcut-grid article:nth-child(3) {
  border-color: #bd7424;
}

.devutility-shortcut-grid h3 {
  margin-bottom: 6px;
  font-size: 1rem;
}

.devutility-shortcut-grid p {
  margin-bottom: 12px;
  color: #3f5048;
  font-size: 0.9rem;
}

.devutility-shortcut-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.devutility-shortcut-list a {
  display: grid;
  min-width: 0;
  min-height: 58px;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 8px;
  align-items: center;
  padding: 8px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  color: #17231e;
  background: #ffffff;
  text-decoration: none;
  transition: border-color 160ms ease, background 160ms ease, transform 160ms ease;
}

.devutility-shortcut-list a:hover,
.devutility-shortcut-list a:focus-visible {
  transform: translateY(-1px);
  border-color: #254c6a;
  background: #f8faf7;
}

.devutility-shortcut-list span,
.devutility-tool-card__glyph {
  display: grid;
  width: 40px;
  height: 32px;
  place-items: center;
  border: 1px solid #c4d4d8;
  border-radius: 8px;
  color: #254c6a;
  background: #eef6f7;
  font-size: 0.68rem;
  font-weight: 900;
}

.devutility-shortcut-list strong {
  min-width: 0;
  color: #1e3028;
  font-size: 0.88rem;
  line-height: 1.22;
}

.devutility-tool-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.devutility-tool-card {
  display: grid;
  min-width: 0;
  min-height: 176px;
  grid-template-rows: auto 1fr auto;
  gap: 12px;
  padding: 16px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  color: #17231e;
  background: #ffffff;
  text-decoration: none;
  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
}

.devutility-tool-card:hover,
.devutility-tool-card:focus-visible {
  transform: translateY(-1px);
  border-color: #254c6a;
  box-shadow: 0 10px 28px rgb(37 76 106 / 10%);
}

.devutility-tool-card__body {
  display: grid;
  gap: 7px;
  align-content: start;
}

.devutility-tool-card__body span {
  color: #65746c;
  font-size: 0.72rem;
  font-weight: 850;
  text-transform: uppercase;
}

.devutility-tool-card__body strong {
  color: #17231e;
  font-size: 1.02rem;
  line-height: 1.25;
}

.devutility-tool-card__body em {
  color: #3f5048;
  font-size: 0.88rem;
  font-style: normal;
  line-height: 1.42;
}

.devutility-tool-card b {
  color: #254c6a;
  font-size: 0.84rem;
  font-weight: 850;
}

.devutility-empty {
  padding: 16px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  background: #ffffff;
}

.devutility-empty h3 {
  margin-bottom: 6px;
  font-size: 1.05rem;
}

.devutility-empty p {
  margin-bottom: 0;
  color: #3f5048;
}

.devutility-footer-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.devutility-footer-grid h2 {
  margin-bottom: 8px;
  color: #17231e;
  font-size: 0.76rem;
  font-weight: 760;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.devutility-footer-grid ul {
  display: grid;
  gap: 6px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.devutility-footer-grid a {
  display: inline-block;
  color: #3f4f47;
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.35;
  text-decoration: none;
  transform-origin: left center;
  transition: color 160ms ease, transform 160ms ease, font-weight 160ms ease;
}

.devutility-footer-grid a:hover,
.devutility-footer-grid a:focus-visible {
  color: #0f4d70;
  font-weight: 700;
  text-decoration: none;
  transform: translateX(2px) scale(1.025);
}

.timenexus-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 440px);
  gap: 28px;
  align-items: stretch;
  padding: 42px 0 34px;
  border-bottom: 1px solid #d8ded8;
}

.timenexus-hero__copy {
  display: grid;
  max-width: 760px;
  align-content: center;
  gap: 14px;
}

.timenexus-hero__copy h1 {
  max-width: 760px;
}

.timenexus-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 6px;
}

.timenexus-clock-panel {
  display: grid;
  min-width: 0;
  gap: 14px;
  align-content: start;
  padding: 22px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 18px 42px rgb(37 76 106 / 10%);
}

.timenexus-clock-panel h2 {
  margin: 0;
  color: #17231e;
  font-size: 1rem;
}

.timenexus-clock-panel__time {
  display: block;
  color: #17231e;
  font-size: 2rem;
  font-variant-numeric: tabular-nums;
  font-weight: 820;
  letter-spacing: 0;
  line-height: 1;
  white-space: nowrap;
}

.timenexus-clock-panel__date {
  color: #3d5047;
  font-size: 0.94rem;
  font-weight: 650;
}

.timenexus-clock-panel p {
  margin: 0;
  color: #46554e;
  line-height: 1.45;
}

.timenexus-clock-links,
.timenexus-shortcut-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.timenexus-clock-links a,
.timenexus-shortcut-list a {
  display: grid;
  min-width: 0;
  min-height: 62px;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 9px;
  align-items: center;
  padding: 9px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  color: #17231e;
  background: #f9fbf8;
  text-decoration: none;
  transition: border-color 160ms ease, background 160ms ease, transform 160ms ease;
}

.timenexus-clock-links a:hover,
.timenexus-clock-links a:focus-visible,
.timenexus-shortcut-list a:hover,
.timenexus-shortcut-list a:focus-visible {
  transform: translateY(-1px);
  border-color: #254c6a;
  background: #ffffff;
}

.timenexus-clock-links span,
.timenexus-shortcut-list span,
.timenexus-tool-card__glyph {
  display: grid;
  width: 40px;
  height: 32px;
  place-items: center;
  border: 1px solid #c7d6d2;
  border-radius: 8px;
  color: #1c5b62;
  background: #edf7f6;
  font-size: 0.68rem;
  font-weight: 900;
}

.timenexus-clock-links strong,
.timenexus-shortcut-list strong {
  min-width: 0;
  color: #17231e;
  font-size: 0.86rem;
  line-height: 1.22;
}

.timenexus-section,
.timenexus-footer-cluster {
  padding: 26px 0;
  border-bottom: 1px solid #d8ded8;
}

.timenexus-shortcut-grid,
.timenexus-featured-grid,
.timenexus-tool-grid,
.timenexus-footer-grid {
  display: grid;
  gap: 12px;
}

.timenexus-shortcut-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.timenexus-shortcut-grid article {
  min-width: 0;
  padding-top: 15px;
  border-top: 3px solid #254c6a;
}

.timenexus-shortcut-grid article:nth-child(2) {
  border-color: #2e8a57;
}

.timenexus-shortcut-grid article:nth-child(3) {
  border-color: #bd7424;
}

.timenexus-shortcut-grid article:nth-child(4) {
  border-color: #65746c;
}

.timenexus-shortcut-grid h3 {
  margin-bottom: 6px;
  font-size: 1rem;
}

.timenexus-shortcut-grid p {
  margin-bottom: 12px;
  color: #3f5048;
  font-size: 0.9rem;
}

.timenexus-featured-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.timenexus-tool-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.timenexus-finder {
  display: grid;
  grid-template-columns: minmax(240px, 1fr);
  gap: 12px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 10px 28px rgb(23 35 30 / 5%);
}

.timenexus-category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.timenexus-category-tabs button {
  padding: 9px 11px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  color: #31453b;
  background: #ffffff;
  font-size: 0.8rem;
  font-weight: 760;
  cursor: pointer;
}

.timenexus-category-tabs button[aria-pressed="true"] {
  color: #ffffff;
  border-color: #254c6a;
  background: #254c6a;
}

.timenexus-privacy-note {
  display: grid;
  gap: 4px;
  padding: 11px;
  border-left: 3px solid #2e8a57;
  color: #34443d;
  background: #f6faf7;
  font-size: 0.84rem;
  line-height: 1.4;
}

.timenexus-privacy-note strong {
  color: #17231e;
  font-size: 0.78rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.timenexus-tool-card {
  display: grid;
  min-width: 0;
  min-height: 178px;
  grid-template-rows: auto 1fr auto;
  gap: 12px;
  padding: 16px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  color: #17231e;
  background: #ffffff;
  text-decoration: none;
  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
}

.timenexus-tool-card--featured {
  min-height: 190px;
}

.timenexus-tool-card:hover,
.timenexus-tool-card:focus-visible {
  transform: translateY(-1px);
  border-color: #254c6a;
  box-shadow: 0 10px 28px rgb(37 76 106 / 10%);
}

.timenexus-tool-card__body {
  display: grid;
  gap: 7px;
  align-content: start;
}

.timenexus-tool-card__body span {
  color: #65746c;
  font-size: 0.72rem;
  font-weight: 850;
  text-transform: uppercase;
}

.timenexus-tool-card__body strong {
  color: #17231e;
  font-size: 1.02rem;
  line-height: 1.25;
}

.timenexus-tool-card__body em {
  color: #3f5048;
  font-size: 0.88rem;
  font-style: normal;
  line-height: 1.42;
}

.timenexus-tool-card b {
  color: #254c6a;
  font-size: 0.84rem;
  font-weight: 850;
}

.timenexus-empty {
  padding: 16px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  background: #ffffff;
}

.timenexus-empty h3 {
  margin-bottom: 6px;
  font-size: 1.05rem;
}

.timenexus-empty p {
  margin-bottom: 0;
  color: #3f5048;
}

.timenexus-footer-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.timenexus-footer-grid h2 {
  margin-bottom: 8px;
  color: #17231e;
  font-size: 0.76rem;
  font-weight: 760;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.timenexus-footer-grid ul {
  display: grid;
  gap: 6px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.timenexus-footer-grid a {
  display: inline-block;
  color: #3f4f47;
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.35;
  text-decoration: none;
  transform-origin: left center;
  transition: color 160ms ease, transform 160ms ease, font-weight 160ms ease;
}

.timenexus-footer-grid a:hover,
.timenexus-footer-grid a:focus-visible {
  color: #0f4d70;
  font-weight: 700;
  text-decoration: none;
  transform: translateX(2px) scale(1.025);
}

.qrroute-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 480px);
  gap: 30px;
  align-items: stretch;
  padding: 36px 0 32px;
  border-bottom: 1px solid #d8ded8;
}

.qrroute-hero__copy {
  align-self: center;
}

.qrroute-hero__copy h1 {
  max-width: 780px;
}

.qrroute-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
}

.qrroute-preview-panel {
  display: grid;
  gap: 16px;
  min-width: 0;
  padding: 18px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgb(20 88 92 / 8%), transparent 48%),
    #ffffff;
  box-shadow: 0 18px 42px rgb(23 35 30 / 7%);
}

.qrroute-preview-panel__header {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.qrroute-preview-panel__header h2 {
  margin-bottom: 0;
  font-size: 1.15rem;
}

.qrroute-preview-panel__header span {
  color: #496158;
  font-size: 0.76rem;
  font-weight: 760;
  text-transform: uppercase;
}

.qrroute-preview-panel__body {
  display: grid;
  grid-template-columns: 150px minmax(0, 1fr);
  gap: 16px;
  align-items: center;
}

.qrroute-preview-art {
  display: grid;
  width: 150px;
  height: 150px;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  padding: 9px;
  border: 1px solid #cfd8d3;
  border-radius: 8px;
  background: #f8fbf9;
}

.qrroute-preview-art span {
  border-radius: 3px;
  background: #dce7e2;
}

.qrroute-preview-art span:nth-child(1),
.qrroute-preview-art span:nth-child(2),
.qrroute-preview-art span:nth-child(3),
.qrroute-preview-art span:nth-child(5),
.qrroute-preview-art span:nth-child(6),
.qrroute-preview-art span:nth-child(7),
.qrroute-preview-art span:nth-child(8),
.qrroute-preview-art span:nth-child(10),
.qrroute-preview-art span:nth-child(12),
.qrroute-preview-art span:nth-child(14),
.qrroute-preview-art span:nth-child(15),
.qrroute-preview-art span:nth-child(16),
.qrroute-preview-art span:nth-child(17),
.qrroute-preview-art span:nth-child(22),
.qrroute-preview-art span:nth-child(24),
.qrroute-preview-art span:nth-child(25),
.qrroute-preview-art span:nth-child(29),
.qrroute-preview-art span:nth-child(31),
.qrroute-preview-art span:nth-child(34),
.qrroute-preview-art span:nth-child(36),
.qrroute-preview-art span:nth-child(37),
.qrroute-preview-art span:nth-child(39),
.qrroute-preview-art span:nth-child(40),
.qrroute-preview-art span:nth-child(43),
.qrroute-preview-art span:nth-child(44),
.qrroute-preview-art span:nth-child(45),
.qrroute-preview-art span:nth-child(47),
.qrroute-preview-art span:nth-child(49) {
  background: #17231e;
}

.qrroute-preview-art span:nth-child(20),
.qrroute-preview-art span:nth-child(28),
.qrroute-preview-art span:nth-child(33) {
  background: #bd7424;
}

.qrroute-preview-payload {
  display: grid;
  min-width: 0;
  gap: 8px;
}

.qrroute-preview-payload strong {
  display: block;
  overflow-wrap: anywhere;
  color: #17231e;
  font-size: 0.95rem;
  line-height: 1.35;
}

.qrroute-preview-payload p {
  margin: 0;
  color: #43544c;
  font-size: 0.9rem;
  line-height: 1.45;
}

.qrroute-preview-meta {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin: 0;
}

.qrroute-preview-meta div {
  min-width: 0;
  padding: 10px 0 0;
  border-top: 1px solid #d9e0dc;
}

.qrroute-preview-meta dt {
  color: #607067;
  font-size: 0.7rem;
  font-weight: 760;
  text-transform: uppercase;
}

.qrroute-preview-meta dd {
  margin: 4px 0 0;
  color: #17231e;
  font-size: 0.86rem;
  font-weight: 760;
}

.qrroute-section,
.qrroute-footer-cluster {
  padding: 26px 0;
  border-bottom: 1px solid #d8ded8;
}

.qrroute-shortcut-grid,
.qrroute-featured-grid,
.qrroute-tool-grid,
.qrroute-footer-grid {
  display: grid;
  gap: 12px;
}

.qrroute-shortcut-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.qrroute-shortcut-grid article {
  min-width: 0;
  padding-top: 15px;
  border-top: 3px solid #14585c;
}

.qrroute-shortcut-grid article:nth-child(2) {
  border-color: #bd7424;
}

.qrroute-shortcut-grid article:nth-child(3) {
  border-color: #2e8a57;
}

.qrroute-shortcut-grid h3 {
  margin-bottom: 6px;
  font-size: 1rem;
}

.qrroute-shortcut-grid p {
  margin-bottom: 12px;
  color: #3f5048;
  font-size: 0.9rem;
}

.qrroute-shortcut-list {
  display: grid;
  gap: 8px;
}

.qrroute-shortcut-list a {
  display: grid;
  min-width: 0;
  min-height: 58px;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 9px;
  align-items: center;
  padding: 9px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  color: #17231e;
  background: #ffffff;
  text-decoration: none;
  transition: border-color 160ms ease, background 160ms ease, transform 160ms ease;
}

.qrroute-shortcut-list a:hover,
.qrroute-shortcut-list a:focus-visible {
  transform: translateY(-1px);
  border-color: #14585c;
  background: #f8fbf9;
}

.qrroute-shortcut-list span,
.qrroute-tool-card__glyph {
  display: grid;
  width: 40px;
  height: 32px;
  place-items: center;
  border: 1px solid #c8d7d3;
  border-radius: 8px;
  color: #14585c;
  background: #edf7f4;
  font-size: 0.68rem;
  font-weight: 900;
}

.qrroute-shortcut-list strong {
  min-width: 0;
  color: #17231e;
  font-size: 0.86rem;
  line-height: 1.22;
}

.qrroute-featured-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.qrroute-tool-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.qrroute-tool-card {
  display: grid;
  min-width: 0;
  min-height: 178px;
  grid-template-rows: auto 1fr auto;
  gap: 12px;
  padding: 16px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  color: #17231e;
  background: #ffffff;
  text-decoration: none;
  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
}

.qrroute-tool-card--featured {
  min-height: 198px;
}

.qrroute-tool-card:hover,
.qrroute-tool-card:focus-visible {
  transform: translateY(-1px);
  border-color: #14585c;
  box-shadow: 0 10px 28px rgb(20 88 92 / 10%);
}

.qrroute-tool-card__body {
  display: grid;
  gap: 7px;
  align-content: start;
}

.qrroute-tool-card__body span {
  color: #65746c;
  font-size: 0.72rem;
  font-weight: 850;
  text-transform: uppercase;
}

.qrroute-tool-card__body strong {
  color: #17231e;
  font-size: 1.02rem;
  line-height: 1.25;
}

.qrroute-tool-card__body em {
  color: #3f5048;
  font-size: 0.88rem;
  font-style: normal;
  line-height: 1.42;
}

.qrroute-tool-card b {
  color: #14585c;
  font-size: 0.84rem;
  font-weight: 850;
}

.qrroute-static-note {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(260px, 0.9fr);
  gap: 18px;
  padding: 22px 0;
  border-bottom: 1px solid #d8ded8;
}

.qrroute-static-note > div {
  min-width: 0;
  padding-top: 14px;
  border-top: 3px solid #bd7424;
}

.qrroute-static-note > div:last-child {
  border-color: #14585c;
}

.qrroute-static-note h2,
.qrroute-static-note h3 {
  margin-bottom: 7px;
  color: #17231e;
  font-size: 1rem;
}

.qrroute-static-note p {
  margin: 0;
  color: #3f5048;
  font-size: 0.9rem;
  line-height: 1.45;
}

.qrroute-finder {
  display: grid;
  grid-template-columns: minmax(240px, 1fr);
  gap: 12px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 10px 28px rgb(23 35 30 / 5%);
}

.qrroute-category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.qrroute-category-tabs button {
  padding: 9px 11px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  color: #31453b;
  background: #ffffff;
  font-size: 0.8rem;
  font-weight: 760;
  cursor: pointer;
}

.qrroute-category-tabs button[aria-pressed="true"] {
  color: #ffffff;
  border-color: #14585c;
  background: #14585c;
}

.qrroute-privacy-note {
  display: grid;
  gap: 4px;
  padding: 11px;
  border-left: 3px solid #2e8a57;
  color: #34443d;
  background: #f6faf7;
  font-size: 0.84rem;
  line-height: 1.4;
}

.qrroute-privacy-note strong {
  color: #17231e;
  font-size: 0.78rem;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.qrroute-empty {
  padding: 16px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  background: #ffffff;
}

.qrroute-empty h3 {
  margin-bottom: 6px;
  font-size: 1.05rem;
}

.qrroute-empty p {
  margin-bottom: 0;
  color: #3f5048;
}

.qrroute-footer-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.qrroute-footer-grid h2 {
  margin-bottom: 8px;
  color: #17231e;
  font-size: 0.76rem;
  font-weight: 760;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.qrroute-footer-grid ul {
  display: grid;
  gap: 6px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.qrroute-footer-grid a {
  display: inline-block;
  color: #3f4f47;
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.35;
  text-decoration: none;
  transform-origin: left center;
  transition: color 160ms ease, transform 160ms ease, font-weight 160ms ease;
}

.qrroute-footer-grid a:hover,
.qrroute-footer-grid a:focus-visible {
  color: #14585c;
  font-weight: 700;
  text-decoration: none;
  transform: translateX(2px) scale(1.025);
}

.invoicecraft-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(320px, 470px);
  gap: 30px;
  align-items: stretch;
  padding: 36px 0 32px;
  border-bottom: 1px solid #d8ded8;
}

.invoicecraft-hero > *,
.invoicecraft-section > *,
.invoicecraft-review-note > *,
.invoicecraft-footer-cluster > * {
  min-width: 0;
}

.invoicecraft-hero__copy {
  display: grid;
  align-content: center;
  gap: 16px;
}

.invoicecraft-hero__copy h1,
.invoicecraft-hero__copy p {
  margin-bottom: 0;
}

.invoicecraft-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.invoicecraft-preview-panel {
  display: grid;
  gap: 16px;
  min-width: 0;
  padding: 18px;
  border: 1px solid #d9ded7;
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgb(189 116 36 / 10%), transparent 48%),
    #ffffff;
  box-shadow: 0 18px 42px rgb(23 35 30 / 7%);
}

.invoicecraft-preview-panel__header {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.invoicecraft-preview-panel__header h2 {
  margin-bottom: 0;
  font-size: 1.15rem;
}

.invoicecraft-preview-panel__header span {
  flex: 0 0 auto;
  color: #5b4630;
  font-size: 0.76rem;
  font-weight: 760;
  text-transform: uppercase;
}

.invoicecraft-document-preview {
  display: grid;
  gap: 14px;
  min-height: 320px;
  padding: 20px;
  border: 1px solid #d6d8d0;
  border-radius: 8px;
  color: #17231e;
  background:
    linear-gradient(180deg, #ffffff 0 72%, #f7f5ef 72% 100%);
}

.invoicecraft-document-preview__top {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  gap: 14px;
  padding-bottom: 14px;
  border-bottom: 1px solid #dfe2dc;
}

.invoicecraft-document-preview__top div,
.invoicecraft-preview-lines div,
.invoicecraft-preview-total {
  min-width: 0;
}

.invoicecraft-document-preview__top span,
.invoicecraft-preview-total span {
  display: block;
  color: #607069;
  font-size: 0.72rem;
  font-weight: 760;
  text-transform: uppercase;
}

.invoicecraft-document-preview__top strong {
  display: block;
  margin-top: 4px;
  overflow-wrap: anywhere;
  font-size: 1.02rem;
  line-height: 1.25;
}

.invoicecraft-preview-lines {
  display: grid;
  gap: 8px;
  margin: 0;
}

.invoicecraft-preview-lines div {
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 12px;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ecefe9;
}

.invoicecraft-preview-lines dt {
  color: #31443b;
  font-size: 0.9rem;
}

.invoicecraft-preview-lines dd {
  margin: 0;
  color: #17231e;
  font-size: 0.92rem;
  font-weight: 760;
  white-space: nowrap;
}

.invoicecraft-preview-total {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
  padding-top: 12px;
  margin-top: auto;
  border-top: 2px solid #bd7424;
}

.invoicecraft-preview-total strong {
  color: #254c6a;
  font-size: 1.35rem;
  line-height: 1.1;
}

.invoicecraft-section,
.invoicecraft-footer-cluster {
  padding: 26px 0;
  border-bottom: 1px solid #d8ded8;
}

.invoicecraft-shortcut-grid,
.invoicecraft-featured-grid,
.invoicecraft-tool-grid,
.invoicecraft-footer-grid {
  display: grid;
  gap: 12px;
}

.invoicecraft-shortcut-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.invoicecraft-shortcut-grid article {
  min-width: 0;
  padding-top: 15px;
  border-top: 3px solid #bd7424;
}

.invoicecraft-shortcut-grid article:nth-child(2) {
  border-color: #254c6a;
}

.invoicecraft-shortcut-grid article:nth-child(3) {
  border-color: #2e8a57;
}

.invoicecraft-shortcut-grid h3 {
  margin-bottom: 6px;
  font-size: 1rem;
}

.invoicecraft-shortcut-grid p {
  margin-bottom: 12px;
  color: #3f5048;
  font-size: 0.9rem;
}

.invoicecraft-shortcut-list {
  display: grid;
  gap: 8px;
}

.invoicecraft-shortcut-list a {
  display: grid;
  min-width: 0;
  min-height: 58px;
  grid-template-columns: 40px minmax(0, 1fr);
  gap: 9px;
  align-items: center;
  padding: 9px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  color: #17231e;
  background: #ffffff;
  text-decoration: none;
  transition: border-color 160ms ease, background 160ms ease, transform 160ms ease;
}

.invoicecraft-shortcut-list a:hover,
.invoicecraft-shortcut-list a:focus-visible {
  transform: translateY(-1px);
  border-color: #bd7424;
  background: #fbfaf6;
}

.invoicecraft-shortcut-list span,
.invoicecraft-tool-card__glyph {
  display: grid;
  width: 40px;
  height: 32px;
  place-items: center;
  border: 1px solid #d7cbb5;
  border-radius: 8px;
  color: #6a3c12;
  background: #fbf3e5;
  font-size: 0.68rem;
  font-weight: 900;
}

.invoicecraft-shortcut-list strong {
  min-width: 0;
  color: #17231e;
  font-size: 0.86rem;
  line-height: 1.22;
}

.invoicecraft-featured-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.invoicecraft-tool-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.invoicecraft-tool-card {
  display: grid;
  min-width: 0;
  min-height: 176px;
  grid-template-rows: auto 1fr auto;
  gap: 12px;
  padding: 16px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  color: #17231e;
  background: #ffffff;
  text-decoration: none;
  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
}

.invoicecraft-tool-card--featured {
  min-height: 198px;
  border-top: 3px solid #bd7424;
}

.invoicecraft-tool-card:hover,
.invoicecraft-tool-card:focus-visible {
  transform: translateY(-1px);
  border-color: #bd7424;
  box-shadow: 0 10px 28px rgb(189 116 36 / 10%);
}

.invoicecraft-tool-card__body {
  display: grid;
  gap: 7px;
  align-content: start;
}

.invoicecraft-tool-card__body span {
  color: #65746c;
  font-size: 0.72rem;
  font-weight: 850;
  text-transform: uppercase;
}

.invoicecraft-tool-card__body strong {
  color: #17231e;
  font-size: 1.02rem;
  line-height: 1.25;
}

.invoicecraft-tool-card__body em {
  color: #3f5048;
  font-size: 0.88rem;
  font-style: normal;
  line-height: 1.42;
}

.invoicecraft-tool-card b {
  color: #254c6a;
  font-size: 0.84rem;
  font-weight: 850;
}

.invoicecraft-review-note {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(260px, 0.9fr);
  gap: 18px;
  padding: 22px 0;
  border-bottom: 1px solid #d8ded8;
}

.invoicecraft-review-note > div {
  min-width: 0;
  padding-top: 14px;
  border-top: 3px solid #254c6a;
}

.invoicecraft-review-note > div:last-child {
  border-color: #2e8a57;
}

.invoicecraft-review-note h2,
.invoicecraft-review-note h3 {
  margin-bottom: 7px;
  color: #17231e;
  font-size: 1rem;
}

.invoicecraft-review-note p {
  margin: 0;
  color: #3f5048;
  font-size: 0.9rem;
  line-height: 1.45;
}

.invoicecraft-finder {
  display: grid;
  grid-template-columns: minmax(240px, 1fr);
  gap: 12px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 10px 28px rgb(23 35 30 / 5%);
}

.invoicecraft-category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.invoicecraft-category-tabs button {
  padding: 9px 11px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  color: #31453b;
  background: #ffffff;
  font-size: 0.8rem;
  font-weight: 760;
  cursor: pointer;
}

.invoicecraft-category-tabs button[aria-pressed="true"] {
  color: #ffffff;
  border-color: #bd7424;
  background: #8d4f17;
}

.invoicecraft-empty {
  padding: 16px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  background: #ffffff;
}

.invoicecraft-empty h3 {
  margin-bottom: 6px;
  font-size: 1.05rem;
}

.invoicecraft-empty p {
  margin-bottom: 0;
  color: #3f5048;
}

.invoicecraft-footer-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.invoicecraft-footer-grid h2 {
  margin-bottom: 8px;
  color: #17231e;
  font-size: 0.76rem;
  font-weight: 760;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.invoicecraft-footer-grid ul {
  display: grid;
  gap: 6px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.invoicecraft-footer-grid a {
  display: inline-block;
  color: #3f4f47;
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.35;
  text-decoration: none;
  transform-origin: left center;
  transition: color 160ms ease, transform 160ms ease, font-weight 160ms ease;
}

.invoicecraft-footer-grid a:hover,
.invoicecraft-footer-grid a:focus-visible {
  color: #8d4f17;
  font-weight: 700;
  text-decoration: none;
  transform: translateX(2px) scale(1.025);
}

.mailhealth-hero {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(340px, 500px);
  gap: 30px;
  align-items: stretch;
  padding: 36px 0 32px;
  border-bottom: 1px solid #d8ded8;
}

.mailhealth-hero > *,
.mailhealth-section > *,
.mailhealth-limit-note > *,
.mailhealth-footer-cluster > * {
  min-width: 0;
}

.mailhealth-hero__copy {
  display: grid;
  align-content: center;
  gap: 16px;
}

.mailhealth-hero__copy h1,
.mailhealth-hero__copy p {
  margin-bottom: 0;
}

.mailhealth-hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
}

.mailhealth-report-panel {
  display: grid;
  gap: 14px;
  min-width: 0;
  padding: 18px;
  border: 1px solid #cfdbd7;
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgb(31 122 140 / 10%), transparent 46%),
    #ffffff;
  box-shadow: 0 18px 42px rgb(23 35 30 / 7%);
}

.mailhealth-report-panel__header {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: space-between;
}

.mailhealth-report-panel__header h2 {
  margin-bottom: 0;
  font-size: 1.15rem;
}

.mailhealth-report-panel__header span {
  flex: 0 0 auto;
  padding: 5px 8px;
  border: 1px solid #d8d0bc;
  border-radius: 999px;
  color: #6a3c12;
  background: #fff7e8;
  font-size: 0.72rem;
  font-weight: 780;
  text-transform: uppercase;
}

.mailhealth-report-score {
  display: grid;
  grid-template-columns: 132px minmax(0, 1fr);
  gap: 14px;
  align-items: stretch;
}

.mailhealth-report-score > div,
.mailhealth-report-score dl {
  min-width: 0;
  padding: 14px;
  border: 1px solid #d9e0dc;
  border-radius: 8px;
  background: #f8fbf9;
}

.mailhealth-report-score span,
.mailhealth-report-score dt {
  display: block;
  color: #607069;
  font-size: 0.72rem;
  font-weight: 760;
  text-transform: uppercase;
}

.mailhealth-report-score strong {
  display: block;
  margin-top: 4px;
  color: #1f7a8c;
  font-size: 2.6rem;
  font-weight: 860;
  letter-spacing: 0;
  line-height: 0.95;
}

.mailhealth-report-score dl {
  display: grid;
  align-content: center;
  margin: 0;
}

.mailhealth-report-score dd {
  margin: 4px 0 0;
  color: #17231e;
  font-size: 1.02rem;
  font-weight: 760;
}

.mailhealth-report-panel p {
  margin: 0;
  color: #3f5048;
  font-size: 0.9rem;
  line-height: 1.45;
}

.mailhealth-signal-list {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 8px;
}

.mailhealth-signal-list article {
  min-width: 0;
  padding: 11px;
  border: 1px solid #d9e0dc;
  border-radius: 8px;
  background: #ffffff;
}

.mailhealth-signal-list span {
  color: #607069;
  font-size: 0.72rem;
  font-weight: 820;
  text-transform: uppercase;
}

.mailhealth-signal-list strong {
  display: block;
  margin: 4px 0;
  color: #17231e;
  font-size: 0.92rem;
}

.mailhealth-section,
.mailhealth-footer-cluster {
  padding: 26px 0;
  border-bottom: 1px solid #d8ded8;
}

.mailhealth-shortcut-grid,
.mailhealth-featured-grid,
.mailhealth-tool-grid,
.mailhealth-footer-grid {
  display: grid;
  gap: 12px;
}

.mailhealth-shortcut-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.mailhealth-shortcut-grid article {
  min-width: 0;
  padding-top: 15px;
  border-top: 3px solid #1f7a8c;
}

.mailhealth-shortcut-grid article:nth-child(2) {
  border-color: #254c6a;
}

.mailhealth-shortcut-grid article:nth-child(3) {
  border-color: #bd7424;
}

.mailhealth-shortcut-grid h3 {
  margin-bottom: 6px;
  font-size: 1rem;
}

.mailhealth-shortcut-grid p {
  margin-bottom: 12px;
  color: #3f5048;
  font-size: 0.9rem;
}

.mailhealth-shortcut-list {
  display: grid;
  gap: 8px;
}

.mailhealth-shortcut-list a {
  display: grid;
  min-width: 0;
  min-height: 58px;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 9px;
  align-items: center;
  padding: 9px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  color: #17231e;
  background: #ffffff;
  text-decoration: none;
  transition: border-color 160ms ease, background 160ms ease, transform 160ms ease;
}

.mailhealth-shortcut-list a:hover,
.mailhealth-shortcut-list a:focus-visible {
  transform: translateY(-1px);
  border-color: #1f7a8c;
  background: #f8fbf9;
}

.mailhealth-shortcut-list span,
.mailhealth-tool-card__glyph {
  display: grid;
  width: 42px;
  height: 32px;
  place-items: center;
  border: 1px solid #c8d7d8;
  border-radius: 8px;
  color: #1f6f7a;
  background: #edf7f7;
  font-size: 0.66rem;
  font-weight: 900;
}

.mailhealth-shortcut-list strong {
  min-width: 0;
  color: #17231e;
  font-size: 0.86rem;
  line-height: 1.22;
}

.mailhealth-featured-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.mailhealth-tool-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.mailhealth-tool-card {
  display: grid;
  min-width: 0;
  min-height: 178px;
  grid-template-rows: auto 1fr auto;
  gap: 12px;
  padding: 16px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  color: #17231e;
  background: #ffffff;
  text-decoration: none;
  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
}

.mailhealth-tool-card--featured {
  min-height: 198px;
  border-top: 3px solid #1f7a8c;
}

.mailhealth-tool-card:hover,
.mailhealth-tool-card:focus-visible {
  transform: translateY(-1px);
  border-color: #1f7a8c;
  box-shadow: 0 10px 28px rgb(31 122 140 / 10%);
}

.mailhealth-tool-card__body {
  display: grid;
  gap: 7px;
  align-content: start;
}

.mailhealth-tool-card__body span {
  color: #65746c;
  font-size: 0.72rem;
  font-weight: 850;
  text-transform: uppercase;
}

.mailhealth-tool-card__body strong {
  color: #17231e;
  font-size: 1.02rem;
  line-height: 1.25;
}

.mailhealth-tool-card__body em {
  color: #3f5048;
  font-size: 0.88rem;
  font-style: normal;
  line-height: 1.42;
}

.mailhealth-tool-card b {
  color: #1f6f7a;
  font-size: 0.84rem;
  font-weight: 850;
}

.mailhealth-limit-note {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(260px, 0.9fr);
  gap: 18px;
  padding: 22px 0;
  border-bottom: 1px solid #d8ded8;
}

.mailhealth-limit-note > div {
  min-width: 0;
  padding-top: 14px;
  border-top: 3px solid #254c6a;
}

.mailhealth-limit-note > div:last-child {
  border-color: #2e8a57;
}

.mailhealth-limit-note h2,
.mailhealth-limit-note h3 {
  margin-bottom: 7px;
  color: #17231e;
  font-size: 1rem;
}

.mailhealth-limit-note p {
  margin: 0;
  color: #3f5048;
  font-size: 0.9rem;
  line-height: 1.45;
}

.mailhealth-finder {
  display: grid;
  grid-template-columns: minmax(240px, 1fr);
  gap: 12px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 10px 28px rgb(23 35 30 / 5%);
}

.mailhealth-category-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.mailhealth-category-tabs button {
  padding: 9px 11px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  color: #31453b;
  background: #ffffff;
  font-size: 0.8rem;
  font-weight: 760;
  cursor: pointer;
}

.mailhealth-category-tabs button[aria-pressed="true"] {
  color: #ffffff;
  border-color: #1f7a8c;
  background: #1f6f7a;
}

.mailhealth-empty {
  padding: 16px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  background: #ffffff;
}

.mailhealth-empty h3 {
  margin-bottom: 6px;
  font-size: 1.05rem;
}

.mailhealth-empty p {
  margin-bottom: 0;
  color: #3f5048;
}

.mailhealth-footer-grid {
  grid-template-columns: repeat(5, minmax(0, 1fr));
}

.mailhealth-footer-grid h2 {
  margin-bottom: 8px;
  color: #17231e;
  font-size: 0.76rem;
  font-weight: 760;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.mailhealth-footer-grid ul {
  display: grid;
  gap: 6px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.mailhealth-footer-grid a {
  display: inline-block;
  color: #3f4f47;
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.35;
  text-decoration: none;
  transform-origin: left center;
  transition: color 160ms ease, transform 160ms ease, font-weight 160ms ease;
}

.mailhealth-footer-grid a:hover,
.mailhealth-footer-grid a:focus-visible {
  color: #1f6f7a;
  font-weight: 700;
  text-decoration: none;
  transform: translateX(2px) scale(1.025);
}

.sitepulse-report-panel {
  background:
    linear-gradient(145deg, rgb(37 76 106 / 10%), transparent 46%),
    #ffffff;
}

.sitepulse-report-panel__header span {
  color: #24523f;
  border-color: #cfe3d8;
  background: #effaf3;
}

.sitepulse-report-score strong,
.sitepulse-tool-card b {
  color: #254c6a;
}

.sitepulse-tool-card--featured {
  border-top-color: #254c6a;
}

.sitepulse-tool-card:hover,
.sitepulse-tool-card:focus-visible {
  border-color: #254c6a;
  box-shadow: 0 10px 28px rgb(37 76 106 / 11%);
}

.sitepulse-tool-card__glyph,
.sitepulse-shortcut-list span {
  color: #24523f;
  border-color: #cde0d4;
  background: #effaf3;
}

.sitepulse-category-tabs button[aria-pressed="true"] {
  border-color: #254c6a;
  background: #254c6a;
}

.sitepulse-shortcut-grid article {
  border-top-color: #254c6a;
}

.sitepulse-shortcut-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.sitepulse-shortcut-grid article:nth-child(2) {
  border-color: #2e8a57;
}

.sitepulse-shortcut-grid article:nth-child(3) {
  border-color: #bd7424;
}

.sitepulse-shortcut-grid article:nth-child(4) {
  border-color: #1f7a8c;
}

.pixelbatch-drop-panel {
  display: grid;
  gap: 12px;
  min-width: 0;
  padding: 16px;
  border: 1px solid #d8d6c8;
  border-radius: 8px;
  background:
    linear-gradient(145deg, rgb(189 116 36 / 10%), transparent 48%),
    #ffffff;
  box-shadow: 0 18px 42px rgb(23 35 30 / 7%);
}

.pixelbatch-drop-target {
  display: grid;
  min-height: 220px;
  place-items: center;
  gap: 10px;
  padding: 22px;
  border: 2px dashed #bd7424;
  border-radius: 8px;
  background: #fffaf2;
  text-align: center;
}

.pixelbatch-drop-target span {
  display: grid;
  width: 58px;
  height: 42px;
  place-items: center;
  border: 1px solid #d9c6aa;
  border-radius: 8px;
  color: #7b4611;
  background: #ffffff;
  font-size: 0.78rem;
  font-weight: 900;
}

.pixelbatch-drop-target h2 {
  margin: 0;
  font-size: 1.25rem;
}

.pixelbatch-drop-target p {
  max-width: 38ch;
  margin: 0;
  color: #4a5a52;
  font-size: 0.92rem;
  line-height: 1.45;
}

.pixelbatch-drop-target a {
  display: inline-flex;
  min-height: 38px;
  align-items: center;
  justify-content: center;
  padding: 9px 14px;
  border: 1px solid #8d4f17;
  border-radius: 8px;
  color: #ffffff;
  background: #8d4f17;
  font-size: 0.86rem;
  font-weight: 780;
  text-decoration: none;
}

.pixelbatch-drop-meta {
  display: grid;
  gap: 8px;
  padding: 12px;
  border: 1px solid #d7ded8;
  border-radius: 8px;
  background: #f8fbf9;
}

.pixelbatch-drop-meta strong,
.pixelbatch-drop-meta span {
  display: block;
}

.pixelbatch-drop-meta strong {
  color: #24523f;
  font-size: 0.94rem;
}

.pixelbatch-drop-meta span {
  margin-top: 3px;
  color: #5a6a62;
  font-size: 0.82rem;
}

.pixelbatch-preview-table {
  display: grid;
  gap: 9px;
}

.pixelbatch-preview-table h3 {
  margin: 0;
  color: #17231e;
  font-size: 0.95rem;
}

.pixelbatch-preview-table dl {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;
  margin: 0;
}

.pixelbatch-preview-table div {
  min-width: 0;
  padding: 10px;
  border: 1px solid #d8ded8;
  border-radius: 8px;
  background: #ffffff;
}

.pixelbatch-preview-table dt {
  color: #65746c;
  font-size: 0.68rem;
  font-weight: 820;
  text-transform: uppercase;
}

.pixelbatch-preview-table dd {
  margin: 4px 0 0;
  color: #17231e;
  font-size: 0.86rem;
  font-weight: 760;
  line-height: 1.25;
}

.pixelbatch-tool-card b {
  color: #8d4f17;
}

.pixelbatch-tool-card--featured {
  border-top-color: #bd7424;
}

.pixelbatch-tool-card:hover,
.pixelbatch-tool-card:focus-visible {
  border-color: #bd7424;
  box-shadow: 0 10px 28px rgb(189 116 36 / 11%);
}

.pixelbatch-tool-card__glyph,
.pixelbatch-shortcut-list span {
  color: #7b4611;
  border-color: #ddc6a8;
  background: #fff5e4;
}

.pixelbatch-category-tabs button[aria-pressed="true"] {
  border-color: #8d4f17;
  background: #8d4f17;
}

.pixelbatch-shortcut-grid article {
  border-top-color: #bd7424;
}

.pixelbatch-shortcut-grid article:nth-child(2) {
  border-color: #2e8a57;
}

.pixelbatch-shortcut-grid article:nth-child(3) {
  border-color: #254c6a;
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
.popular-tools-section,
.tool-results-section,
.intent-section,
.site-directory {
  padding: 26px 0;
  border-bottom: 1px solid #d8ded8;
}

.tool-results-section {
  padding-top: 22px;
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

.tool-shortcut-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 10px;
}

.tool-shortcut-grid--primary {
  gap: 12px;
}

.tool-shortcut-card {
  display: grid;
  min-width: 0;
  min-height: 184px;
  grid-template-rows: auto 1fr auto;
  gap: 12px;
  padding: 16px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  color: #17231e;
  background: #ffffff;
  text-decoration: none;
  transition: border-color 160ms ease, box-shadow 160ms ease, transform 160ms ease;
}

.tool-shortcut-card:hover,
.tool-shortcut-card:focus-visible {
  transform: translateY(-1px);
  border-color: #254c6a;
  box-shadow: 0 10px 28px rgb(37 76 106 / 10%);
}

.tool-shortcut-card__top {
  display: grid;
  grid-template-columns: 42px minmax(0, 1fr);
  gap: 10px;
  align-items: center;
}

.tool-shortcut-card__glyph {
  display: grid;
  width: 42px;
  height: 42px;
  place-items: center;
  border: 1px solid #b9d2cf;
  border-radius: 8px;
  color: #173f55;
  background: #edf7f5;
  font-size: 0.82rem;
  font-weight: 900;
}

.tool-shortcut-card__meta {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  align-items: center;
  color: #617069;
  font-size: 0.78rem;
  font-weight: 850;
  text-transform: uppercase;
}

.tool-shortcut-card__meta span::before {
  margin-right: 5px;
  color: #9aa8a1;
  content: "/";
}

.tool-shortcut-card__body {
  display: grid;
  gap: 8px;
  align-content: start;
}

.tool-shortcut-card h3 {
  margin: 0;
  font-size: 1.05rem;
}

.tool-shortcut-card p {
  margin-bottom: 0;
  color: #3f5048;
  font-size: 0.9rem;
}

.tool-shortcut-card strong {
  color: #254c6a;
  font-size: 0.86rem;
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
  min-height: 210px;
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

.site-card h3 {
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 1.55rem;
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

.support-block {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 340px);
  gap: 18px;
  align-items: start;
  margin-top: 24px;
  padding: 18px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  background: #ffffff;
}

.support-block p {
  margin-bottom: 0;
  color: #3f5048;
}

.support-block ul {
  display: grid;
  gap: 8px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.support-block li {
  min-height: 34px;
  padding: 7px 10px;
  border: 1px solid #d4dcd6;
  border-radius: 8px;
  color: #31453b;
  background: #f8faf7;
  font-size: 0.88rem;
  font-weight: 850;
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
  grid-template-columns: minmax(190px, 240px) minmax(0, 1fr);
  gap: 20px 30px;
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
  font-size: 0.86rem;
  line-height: 1.48;
}

.inline-link-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

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

.inline-link-list a:hover {
  color: #ffffff;
  border-color: #254c6a;
  background: #254c6a;
}

.footer-verticals {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 18px;
}

.footer-verticals section {
  min-width: 0;
}

.footer-verticals h2 {
  margin-bottom: 9px;
  color: #17231e;
  font-size: 0.72rem;
  font-weight: 760;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.footer-menu {
  display: grid;
  gap: 5px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.footer-menu a,
.page-footer__links a {
  display: inline-block;
  color: #3f4f47;
  font-size: 0.78rem;
  font-weight: 500;
  line-height: 1.35;
  text-decoration: none;
  transform-origin: left center;
  transition: color 160ms ease, transform 160ms ease, font-weight 160ms ease;
}

.footer-menu a:hover,
.page-footer__links a:hover,
.page-footer__links a[aria-current="page"] {
  color: #0f4d70;
  font-weight: 700;
  text-decoration: none;
}

.footer-menu a:hover {
  transform: translateX(2px) scale(1.025);
}

.page-footer__links a:hover {
  transform: translateY(-1px) scale(1.02);
}

.footer-menu a:focus-visible,
.page-footer__links a:focus-visible {
  outline: 3px solid rgba(15, 77, 112, 0.24);
  outline-offset: 3px;
}

.page-footer__links--legal {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 18px;
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

@media (max-width: 1120px) {
  .page-footer {
    grid-template-columns: minmax(180px, 240px) minmax(0, 1fr);
  }

  .footer-verticals {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px 26px;
  }

  .netprobe-tool-grid,
  .netprobe-footer-grid,
  .calcharbor-popular-grid,
  .calcharbor-tool-grid,
  .calcharbor-topic-grid,
  .calcharbor-footer-grid,
  .timenexus-featured-grid,
  .timenexus-tool-grid,
  .timenexus-footer-grid,
  .qrroute-featured-grid,
  .qrroute-tool-grid,
  .qrroute-footer-grid,
  .invoicecraft-featured-grid,
  .invoicecraft-tool-grid,
  .invoicecraft-footer-grid,
  .mailhealth-featured-grid,
  .mailhealth-tool-grid,
  .mailhealth-footer-grid,
  .pixelbatch-featured-grid,
  .pixelbatch-tool-grid,
  .pixelbatch-footer-grid,
  .devutility-tool-grid,
  .devutility-footer-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
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
  .netprobe-hero,
  .calcharbor-hero,
  .devutility-hero,
  .timenexus-hero,
  .qrroute-hero,
  .qrroute-static-note,
  .invoicecraft-hero,
  .invoicecraft-review-note,
  .mailhealth-hero,
  .mailhealth-limit-note,
  .pixelbatch-hero,
  .pixelbatch-limit-note,
  .tool-finder,
  .trust-row,
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
  .tool-shortcut-grid,
  .netprobe-tool-grid,
  .netprobe-level-grid,
  .netprobe-footer-grid,
  .calcharbor-popular-grid,
  .calcharbor-tool-grid,
  .calcharbor-topic-grid,
  .calcharbor-footer-grid,
  .devutility-shortcut-grid,
  .devutility-tool-grid,
  .devutility-footer-grid,
  .timenexus-shortcut-grid,
  .timenexus-featured-grid,
  .timenexus-tool-grid,
  .timenexus-footer-grid,
  .qrroute-shortcut-grid,
  .qrroute-featured-grid,
  .qrroute-tool-grid,
  .qrroute-footer-grid,
  .invoicecraft-shortcut-grid,
  .invoicecraft-featured-grid,
  .invoicecraft-tool-grid,
  .invoicecraft-footer-grid,
  .mailhealth-shortcut-grid,
  .mailhealth-featured-grid,
  .mailhealth-tool-grid,
  .mailhealth-footer-grid,
  .pixelbatch-shortcut-grid,
  .pixelbatch-featured-grid,
  .pixelbatch-tool-grid,
  .pixelbatch-footer-grid,
  .support-block,
  .footer-verticals,
  .evidence-strip {
    grid-template-columns: 1fr;
  }

  .calcharbor-finder__shortcuts,
  .devutility-shortcut-list,
  .timenexus-clock-links,
  .timenexus-shortcut-list,
  .qrroute-shortcut-list,
  .qrroute-preview-panel__body,
  .qrroute-preview-meta,
  .invoicecraft-shortcut-list,
  .invoicecraft-document-preview__top,
  .mailhealth-shortcut-list,
  .mailhealth-report-score,
  .mailhealth-signal-list,
  .pixelbatch-shortcut-list,
  .pixelbatch-preview-table dl {
    grid-template-columns: 1fr;
  }

  .qrroute-preview-art {
    width: min(100%, 180px);
    height: auto;
    aspect-ratio: 1;
    justify-self: center;
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

  .timenexus-clock-panel__time {
    font-size: 1.65rem;
  }

  .ad-placeholder {
    width: 100%;
  }
}
</style>
