<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { getPlannerCopy } from '../data/copy'
import { localizedToolPath, localizedWorldClockPath, type LocaleCode } from '../data/locales'
import {
  buildMeetingPlannerResult,
  formatPlannerZone,
  plannerSourceZones,
  plannerZoneGroups,
  type PlannerZoneResult,
} from '../data/tools'

const props = defineProps<{
  locale: LocaleCode
  initialGroup?: string
}>()

const copy = computed(() => getPlannerCopy(props.locale))
const localDateTime = ref('')
const sourceZone = ref('America/New_York')
const selectedGroup = ref(
  plannerZoneGroups.some((group) => group.value === props.initialGroup)
    ? props.initialGroup!
    : (plannerZoneGroups[0]?.value ?? 'americas-europe'),
)
const durationMinutes = ref(60)
const now = ref(new Date())
let timer: ReturnType<typeof setInterval> | null = null

const activeGroup = computed(() => plannerZoneGroups.find((group) => group.value === selectedGroup.value) ?? plannerZoneGroups[0])
const groupZones = computed(() => activeGroup.value.zones)
const currentCards = computed(() => groupZones.value.map((zone) => formatPlannerZone(now.value, zone, props.locale)))
const plannerResult = computed(() => {
  try {
    return buildMeetingPlannerResult({
      localDateTime: localDateTime.value,
      sourceZone: sourceZone.value,
      durationMinutes: durationMinutes.value,
      targetZones: groupZones.value,
      locale: props.locale,
    })
  } catch {
    return null
  }
})

function statusLabel(status: PlannerZoneResult['businessStatus']): string {
  if (status === 'business') {
    return copy.value.businessStatus
  }

  return status === 'early' ? copy.value.earlyStatus : copy.value.lateStatus
}

function statusClass(status: PlannerZoneResult['businessStatus']): string {
  return `time-status time-status--${status}`
}

function formatLocalDateTimeInput(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hour = String(date.getHours()).padStart(2, '0')
  const minute = String(date.getMinutes()).padStart(2, '0')

  return `${year}-${month}-${day}T${hour}:${minute}`
}

onMounted(() => {
  now.value = new Date()
  localDateTime.value = formatLocalDateTimeInput(now.value)
  timer = setInterval(() => {
    now.value = new Date()
  }, 60_000)
})

onBeforeUnmount(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<template>
  <section class="time-workbench" aria-labelledby="time-workbench-title">
    <div class="workbench-heading">
      <div>
        <p class="eyebrow">{{ copy.eyebrow }}</p>
        <h2 id="time-workbench-title">{{ copy.title }}</h2>
        <p>{{ copy.body }}</p>
      </div>
      <p class="privacy-strip">{{ copy.privacyNote }}</p>
    </div>

    <div class="workbench-grid">
      <section class="workbench-panel" aria-labelledby="current-time-title">
        <div class="panel-heading">
          <h3 id="current-time-title">{{ copy.currentTitle }}</h3>
          <p>{{ copy.currentBody }}</p>
        </div>
        <dl class="clock-list">
          <div v-for="card in currentCards" :key="`${card.zone}-${card.localTime}`" class="clock-row">
            <dt>
              <strong>{{ card.label }}</strong>
              <span>{{ card.zone }}</span>
            </dt>
            <dd>
              <strong>{{ card.localTime }}</strong>
              <span>{{ card.localDate }}</span>
            </dd>
          </div>
        </dl>
      </section>

      <section class="workbench-panel workbench-panel--wide" aria-labelledby="meeting-planner-title">
        <div class="panel-heading">
          <h3 id="meeting-planner-title">{{ copy.meetingTitle }}</h3>
          <p>{{ copy.meetingBody }}</p>
        </div>

        <div class="planner-controls">
          <div class="field">
            <label for="meeting-local-time">{{ copy.localDateTimeLabel }}</label>
            <input id="meeting-local-time" v-model="localDateTime" type="datetime-local">
          </div>
          <div class="field">
            <label for="meeting-source-zone">{{ copy.sourceZoneLabel }}</label>
            <select id="meeting-source-zone" v-model="sourceZone">
              <option v-for="zone in plannerSourceZones" :key="zone.zone" :value="zone.zone">
                {{ zone.label }} - {{ zone.zone }}
              </option>
            </select>
          </div>
          <div class="field">
            <label for="meeting-zone-group">{{ copy.groupLabel }}</label>
            <select id="meeting-zone-group" v-model="selectedGroup">
              <option v-for="group in plannerZoneGroups" :key="group.value" :value="group.value">
                {{ group.label[locale] }}
              </option>
            </select>
          </div>
          <div class="field">
            <label for="meeting-duration">{{ copy.durationLabel }}</label>
            <select id="meeting-duration" v-model.number="durationMinutes">
              <option :value="30">30 min</option>
              <option :value="60">60 min</option>
              <option :value="90">90 min</option>
            </select>
          </div>
        </div>

        <template v-if="plannerResult">
          <div class="planner-answer">
            <div>
              <span>{{ copy.sourceLocalLabel }}</span>
              <strong>{{ plannerResult.sourceLocal }}</strong>
            </div>
            <div>
              <span>{{ copy.utcLabel }}</span>
              <strong>{{ plannerResult.utcInstant }}</strong>
            </div>
          </div>

          <section class="world-clock-section" aria-labelledby="world-clock-title">
            <h4 id="world-clock-title">{{ copy.worldClockTitle }}</h4>
            <div class="zone-grid">
              <div v-for="zone in plannerResult.zones" :key="zone.zone" class="zone-row">
                <div>
                  <strong>{{ zone.label }}</strong>
                  <span>{{ zone.zone }}</span>
                </div>
                <div>
                  <strong>{{ zone.localTime }}</strong>
                  <span>{{ zone.localDate }}</span>
                </div>
                <span :class="statusClass(zone.businessStatus)">
                  {{ statusLabel(zone.businessStatus) }}
                </span>
              </div>
            </div>
          </section>

          <section class="slot-section" aria-labelledby="slot-title">
            <h4 id="slot-title">{{ copy.suggestionsTitle }}</h4>
            <table class="slot-table">
              <thead>
                <tr>
                  <th scope="col">{{ copy.slotColumnLabel }}</th>
                  <th scope="col">{{ copy.fitColumnLabel }}</th>
                  <th scope="col">{{ copy.zonesColumnLabel }}</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="slot in plannerResult.suggestions" :key="slot.utcInstant">
                  <th scope="row">{{ slot.label }} · {{ slot.sourceLocal }}</th>
                  <td>{{ slot.zonesInBusinessHours }} / {{ plannerResult.zones.length }}</td>
                  <td>{{ slot.zoneSummary || '-' }}</td>
                </tr>
              </tbody>
            </table>
          </section>
        </template>

        <div class="tool-actions">
          <NuxtLink class="button-link button-link--secondary" :to="localizedWorldClockPath(locale, selectedGroup)">
            {{ copy.openWorldClockLabel }}
          </NuxtLink>
          <NuxtLink class="button-link" :to="localizedToolPath(locale, 'timezone-converter')">
            {{ copy.openConverterLabel }}
          </NuxtLink>
          <NuxtLink class="button-link button-link--secondary" :to="localizedToolPath(locale, 'timestamp-converter')">
            {{ copy.openTimestampLabel }}
          </NuxtLink>
        </div>
      </section>
    </div>
  </section>
</template>
