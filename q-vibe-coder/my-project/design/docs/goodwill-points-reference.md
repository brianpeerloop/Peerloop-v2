# Goodwill Points - Reference Document

**Created:** 2025-12-12  
**Status:** P2 (Post-MVP)  
**MVP Included:** ❌ No

---

## Overview

**Goodwill points** are a gamification feature designed to recognize and reward user engagement on the PeerLoop platform.

---

## User Stories

| ID | Story | Priority | Dependency |
|----|-------|----------|------------|
| **US-S030** | As a Student, I need to earn goodwill points through participation so that my engagement is recognized | P2 | CD-010 |
| **US-P051** | As a System, I need to track goodwill points for user actions so that engagement is gamified | P2 | CD-010 |
| **US-P052** | As a System, I need to calculate power user tiers based on points so that progression is visible | P2 | CD-010 |

### Related Stories

| ID | Story | Priority | Notes |
|----|-------|----------|-------|
| **US-T015** | As a Student-Teacher, I need to earn points for teaching activity so that my engagement is recognized | P2 | CD-011 |
| **US-P058** | As a System, I need to track Teacher Student points for activity so that gamification motivates teachers | P2 | CD-011 |

---

## Where It Fits in User Journeys

From `USER-JOURNEYS-SUMMARY.md`, goodwill points appear in the **Power User tier** of the student journey - an advanced feature for highly engaged users.

| Student Journey Stage | Feature |
|-----------------------|---------|
| Mark progress | ✅ |
| Profile privacy | ✅ |
| Goodwill points | P2 (Post-MVP) |

---

## MVP Decision

From `2025-11-30-student-profile-system.md`:

> ❌ Goodwill points display

**Explicitly cut from MVP scope.** Planned for Block 2 or Block 3.

---

## Implementation Notes

- Points tracking requires a system-level service (US-P051)
- Power user tiers calculated based on accumulated points (US-P052)
- Both Students and Student-Teachers can earn points
- Display would likely appear on user profiles

---

## Open Questions

1. What actions earn goodwill points?
2. What are the power user tier thresholds?
3. Are points visible to other users or private?
4. Do points decay over time?
5. Are there rewards/perks associated with tiers?

---

*This is a reference document. Update as decisions are made.*





