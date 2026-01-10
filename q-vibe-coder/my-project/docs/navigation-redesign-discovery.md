# PeerLoop Navigation Redesign - Discovery Summary

**Date:** December 20, 2025
**Purpose:** Complete record of discovery questions and decisions for navigation redesign

---

## The PeerLoop Value Proposition

### The Flywheel
Student → Certified → Teacher → Earns money back → More students attracted

### The Learning Split
- 50% live 1-on-1 sessions (with teachers/student-teachers)
- 50% feed interaction (learning from discussions, Q&A, community)

### Feed as Conversion Mechanism

**Traditional Model:**
```
Sales Page → Pay → Community (buying blind)
```

**PeerLoop Model:**
```
Community Feed → See it working → Trust → Pay
```

The feed IS the landing page. Trust is earned by seeing the community function before spending a dollar:
- Students posting breakthroughs
- Student-Teachers sharing earnings
- Creators answering FAQs
- Real discussions, not testimonial carousels

---

## Discovery Questions & Answers

### User Roles

**Q1: Can one person be both creator AND student?**
A: Yes - same account can wear both hats.

**Q2: What makes someone a "teacher"?**
A: A student who completes a course can apply to become a teacher. The creator approves the application.

**Q3: What can teachers do that students can't?**
A: Only teach the course they've passed. All interactions (posting, commenting) are the same across student, student-teacher, and creator.

**Q4: Do students have public profiles?**
A: Yes.

### Creators & Structure

**Q5: One community per creator, or multiple?**
A: One community per creator.

**Q6: Community-Course relationship?**
A: Community is separate from courses, but courses have communities under them.

**Q7: Can a course exist without being tied to a creator's community?**
A: No - courses only live under a community.

### Access Levels

- **Follow a creator (free)** → Access to creator's main community feed
- **Browse a course (free)** → See/interact in public course community
- **Buy a course (paid)** → Unlock private course community

### Feeds

**Q8: Global feed - who can post?**
A: Anyone can post. It's algorithmic/curated.

**Q9: Creator's community feed visibility?**
A: Only visible if you follow the creator.

**Q10: Course public feed - can anyone post?**
A: Yes, anyone interested can interact. It's like an introductory area.

**Q11: Content types across feeds?**
A: Text, images, video clips, links/embeds. No polls.

### User Journeys

**Q12: What should new visitors see first?**
A: Uncertain - possibly an explanation of how the site works. Explore in mockups.

**Q13: Path to purchase?**
A: Multiple valid paths - browse courses, discover via communities, or interesting posts. No single funnel.

**Q14: After purchase, where does student land?**
A: Either private course feed or dashboard - uncertain, explore in mockups.

### Navigation Preferences

**Q15: "Menus that never disappear" - what specifically?**
A: Ideally a sidebar, but needs to work responsively:
- Desktop: Full sidebar
- Tablet: Collapsed to icons
- Phone: Bottom icon bar

**Q16: Biggest navigation pain?**
A: Too many options to keep up with. Everything should exist under a creator community (except global feed). Within a creator community, easy navigation to:
- Creator feed
- Courses
- Course feed
- Course description
- Buy button (always visible)

**Q17: Sites with navigation you love?**
A: Twitter (but exhausted that interface), Skool.com (but get lost in some menus).

### Device Usage

**Q18: Expected device split?**
A:
- Phone/tablet: Surfing, discovery, community interaction, buying
- Desktop/tablet: Actually taking courses

**Q19: Current scale?**
A: Starting with 1-2 creators, 4-5 courses.

**Q20: ONE thing always one tap away?**
A: Get back to the community where the course is.

---

## Content Structure

```
GLOBAL FEED (algorithmic, anyone posts)

CREATOR COMMUNITY (everything else lives here)
├── Creator's Community Feed (must follow to see)
├── Courses
│   ├── Public Course Feed (free - the conversion mechanism)
│   ├── Course Description
│   ├── BUY BUTTON (always visible)
│   └── Private Course Feed (unlocked after purchase)
```

---

## Navigation Requirements Summary

1. Menus never disappear
2. Responsive: sidebar (desktop) → collapsed icons (tablet) → bottom bar (phone)
3. Once inside a creator community, stay in that context
4. Always one tap back to the community from anywhere
5. Buy button always visible on courses
6. Course listing should have direct access to course feed
7. Twitter-like clarity + Skool-like structure, without getting lost

---

## Mockup Concepts

### Mockup A: "The Living Room" (CREATED)
**File:** `public/mockup-a-living-room.html`

Feed is always center stage. Sidebar shows WHERE you are in the hierarchy.
- Sidebar expands under each creator to show their courses
- Click deeper = see that feed in main area
- Current location always highlighted
- Simple, Twitter-like feel

### Mockup B: "The Pathway" (NOT YET CREATED)
Three-column progressive disclosure.
- Column 1: Primary nav (always visible)
- Column 2: Lists (creators, courses)
- Column 3: Content (feeds, details)
- See all three levels at once - no getting lost

### Mockup C: "The Hub" (NOT YET CREATED)
Global feed is one world. Creator community is another.
- At global level: mixed feed, discovery
- Enter a creator = whole UI scopes to THAT creator
- Clear "← Back to Global" escape hatch
- Most distinct separation of contexts

---

## Files Created

| File | Purpose |
|------|---------|
| `public/mockup-a-living-room.html` | Mockup A - responsive wireframe |
| `docs/navigation-redesign-discovery.md` | This file - full discovery record |

---

## Next Steps

1. Review Mockup A in browser
2. Provide feedback on what works / what doesn't
3. Either refine A, or create Mockup B or C for comparison
4. Once direction is chosen, implement in actual React components

---

## Key Components to Modify (after mockup approval)

```
src/components/
├── Sidebar.js          (navigation hierarchy)
├── BottomNav.js        (mobile navigation)
├── MainContent.js      (routing)
├── Community.js        (feed integration)
├── BrowseView.js       (course listing with feed links)
```
