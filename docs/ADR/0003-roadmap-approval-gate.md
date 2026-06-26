# ADR 0003 - Roadmap approval gate

Status: Accepted

## Context

The user asked for a complete roadmap and specified that execution after approval must follow sprint, validation, commit, push, deploy monitoring and mandatory reading before the next sprint.

## Decision

Before formal roadmap approval, only local reversible bootstrap is allowed.

Remote mutations such as HostGator folders/databases/crons, GitHub private repositories, DNS, AdSense, Google Cloud and billing are scheduled in the roadmap and executed only after approval.

## Consequences

- Prevents accidental external state changes.
- Keeps planning and execution separated.
- Creates a clear handoff point for Sprint 0.2 onward.

