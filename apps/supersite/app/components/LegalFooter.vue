<script setup lang="ts">
import { computed } from 'vue'
import { getFooterCopy } from '../data/copy'
import { legalPageCatalog, type LegalPageSlug } from '../data/legal'
import { localizedLegalPath, localizedSitePath, type LocaleCode } from '../data/locales'
import { getSiteBySlug, type SiteSummary } from '../data/sites'

const props = defineProps<{
  locale: LocaleCode
  currentSlug?: LegalPageSlug
}>()

const copy = computed(() => getFooterCopy(props.locale))
const productGroups = computed(() => copy.value.groups.map((group) => ({
  ...group,
  sites: group.siteSlugs
    .map((siteSlug) => getSiteBySlug(siteSlug))
    .filter((site): site is SiteSummary => Boolean(site)),
})))
</script>

<template>
  <footer class="page-footer page-footer--rich">
    <section class="page-footer__intro" aria-label="SuperSites">
      <NuxtLink class="page-footer__brand" :to="`/${locale}`">SuperSites</NuxtLink>
      <p>{{ copy.brandBody }}</p>
    </section>

    <nav class="footer-verticals" :aria-label="copy.productNavLabel">
      <section v-for="group in productGroups" :key="group.title">
        <h2>{{ group.title }}</h2>
        <div class="page-footer__links">
          <NuxtLink
            v-for="site in group.sites"
            :key="site.slug"
            :to="localizedSitePath(locale, site.slug)"
          >
            {{ site.name }}
          </NuxtLink>
        </div>
      </section>
    </nav>

    <nav class="page-footer__links page-footer__links--legal" :aria-label="copy.legalNavLabel">
      <NuxtLink
        v-for="page in legalPageCatalog"
        :key="page.slug"
        :to="localizedLegalPath(locale, page.slug)"
        :aria-current="currentSlug === page.slug ? 'page' : undefined"
      >
        {{ page.localized[locale].navLabel }}
      </NuxtLink>
    </nav>
  </footer>
</template>
