# ADR 0021 - SitePulse bounded web diagnostics MVP

Date: 2026-06-27

## Status

Accepted

## Context

Sprint 4.4 starts SitePulse Lab, a workflow-paid product for website status, redirects, headers, crawlability and timing diagnostics. The free MVP must solve the basic need without mandatory signup: status, redirects, security headers, robots.txt, sitemap, TTFB and a point-in-time performance snapshot.

These checks require outbound HTTP requests and can be abused for SSRF, private-network probing, broad crawling or uptime claims that are not supported by a single request. Paid uptime, incidents, status pages, alerts, history and multi-region probes also require account, billing, retention, alert delivery and worker/runtime gates that are not active yet.

## Decision

Build SitePulse Sprint 4.4 as:

- a Nuxt SSG/browser app in `apps/sitepulse-lab` with seven localized website diagnostic tools;
- a single bounded public control-plane endpoint under `/api/v1/sitepulse/probe`;
- a dedicated `sitepulse-public` rate limiter;
- reuse of the existing `NetProbeHostGuard` and DNS resolver contracts before every outbound HTTP request;
- HTTP(S)-only URL validation, no credentials/fragments, default web ports only, private/reserved range blocking, capped redirect following and short timeouts;
- same-origin `/robots.txt` and `/sitemap.xml` checks only, with body-size limits and no broad crawl;
- analytics limited to tool lifecycle metadata and `tool_slug`, never target URLs, hosts, headers, redirect chains, timings or results.

No production worker, cron, account, billing, alert delivery, incident workflow, status page generation, external analytics, AdSense placement, multi-region probe or real SitePulse traffic switch is activated in Sprint 4.4.

## Consequences

The free MVP is useful locally/CI while keeping outbound web access bounded and testable. The control-plane temporarily hosts SitePulse public probes, similar to earlier NetProbe and MailHealth module patterns, until a separate backend or probe runtime is justified.

Before real public launch or paid workflow activation, SitePulse still needs app-specific HostGator artifact validation, public smoke, rollback, account/billing/entitlement gates, retention/export/deletion rules, production worker/probe runtime, alert delivery controls, incident/status-page workflows and legal review.
