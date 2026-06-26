<script setup lang="ts">
import { siteCatalog } from './data/sites'

const statusLabel = {
  foundation: 'Foundation',
  planned: 'Planned',
  blocked: 'Blocked',
}
</script>

<template>
  <main class="shell">
    <header class="masthead">
      <div>
        <p class="eyebrow">SuperSites</p>
        <h1>Useful web tools, organized as one operating network.</h1>
      </div>
      <p class="summary">
        The catalog starts with ten independent utility sites. Every free tool must solve the basic need without mandatory signup; paid plans add scale, history, automation, API access or fewer ads.
      </p>
    </header>

    <section class="toolbar" aria-label="Portfolio status">
      <div>
        <strong>{{ siteCatalog.length }}</strong>
        <span>utility sites planned</span>
      </div>
      <div>
        <strong>5</strong>
        <span>initial languages</span>
      </div>
      <div>
        <strong>NetProbe Atlas</strong>
        <span>first product track</span>
      </div>
    </section>

    <section class="catalog" aria-label="SuperSites catalog">
      <article v-for="site in siteCatalog" :key="site.slug" class="site-card">
        <div class="site-card__topline">
          <span class="category">{{ site.category }}</span>
          <span :class="['status', `status--${site.status}`]">
            {{ statusLabel[site.status] }}
          </span>
        </div>
        <h2>{{ site.name }}</h2>
        <dl>
          <div>
            <dt>Free</dt>
            <dd>{{ site.freeValue }}</dd>
          </div>
          <div>
            <dt>Upgrade</dt>
            <dd>{{ site.upgrade }}</dd>
          </div>
        </dl>
      </article>
    </section>
  </main>
</template>

<style>
:root {
  color: #16201a;
  background: #f7f8f4;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.5;
}

body {
  margin: 0;
}

.shell {
  width: min(1180px, calc(100% - 32px));
  margin: 0 auto;
  padding: 32px 0 56px;
}

.masthead {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(280px, 0.7fr);
  gap: 28px;
  align-items: end;
  padding: 24px 0 28px;
  border-bottom: 1px solid #d9ded6;
}

.eyebrow {
  margin: 0 0 10px;
  color: #2d6a4f;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

h1,
h2,
p {
  margin-top: 0;
}

h1 {
  max-width: 820px;
  margin-bottom: 0;
  font-size: clamp(2.15rem, 5vw, 4.6rem);
  line-height: 0.98;
}

.summary {
  margin-bottom: 0;
  color: #405047;
  font-size: 1rem;
}

.toolbar {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1px;
  margin: 24px 0;
  overflow: hidden;
  border: 1px solid #d9ded6;
  background: #d9ded6;
}

.toolbar div {
  min-width: 0;
  padding: 16px;
  background: #ffffff;
}

.toolbar strong,
.toolbar span {
  display: block;
}

.toolbar strong {
  overflow-wrap: anywhere;
  font-size: 1rem;
}

.toolbar span {
  color: #637066;
  font-size: 0.88rem;
}

.catalog {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
}

.site-card {
  min-width: 0;
  padding: 18px;
  border: 1px solid #d9ded6;
  border-radius: 8px;
  background: #ffffff;
}

.site-card__topline {
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.category {
  color: #637066;
  font-size: 0.84rem;
  font-weight: 700;
}

.status {
  flex: 0 0 auto;
  padding: 4px 8px;
  border-radius: 999px;
  color: #20352a;
  background: #e8efe9;
  font-size: 0.78rem;
  font-weight: 800;
}

.status--foundation {
  color: #103d2a;
  background: #c8ead7;
}

.status--blocked {
  color: #51310b;
  background: #f3dcad;
}

.site-card h2 {
  margin-bottom: 16px;
  font-size: 1.35rem;
}

dl {
  display: grid;
  gap: 12px;
  margin: 0;
}

dt {
  color: #637066;
  font-size: 0.78rem;
  font-weight: 800;
  text-transform: uppercase;
}

dd {
  margin: 2px 0 0;
  color: #26342d;
}

@media (max-width: 760px) {
  .masthead,
  .toolbar,
  .catalog {
    grid-template-columns: 1fr;
  }

  h1 {
    font-size: 2.45rem;
  }
}
</style>
