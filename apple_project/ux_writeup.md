# AI-Native Developer Portal — UX Design Rationale

## Overview

The goal here is simple: give developers a straightforward way to discover repos, understand what's happening, kick off AI-powered tasks, and watch them run in real time. No mystery, no friction, no wasting time clicking through wizards.

---

## Core Design Thinking

**Progressive Disclosure**
We move users through a simple path: pick a repo → see what's going on → run a task → watch it happen. Each screen gives just enough info for that step, nothing more. Reduces cognitive load and keeps things moving.

**Transparency Matters**
Developers aren't gonna trust a black box. Live logs, progress bars, status badges—all of it shows that something's actually going on. If something breaks, they see it.

**Speed is Everything**
Nobody wants to click through five screens to run a task. Single-click actions, consolidated metrics, straightforward buttons. Think "how would I do this if I was in a hurry?"

**Stick with What Works**
Borrow patterns people already know: search boxes like Google, cards like GitHub, progress bars like literally every installer. Don't reinvent the wheel just for the sake of it.

---

## Screen 1: Repository List

Goal: Find and pick a repo as fast as possible.

**The search box is the star here.** Developers work with tons of repos. Scrolling is slow. A search box wins every time. Plus a couple of quick filters (All / My Starred) for the common cases.

**Each repo shows:**
- Name and description so you know what it is
- A status dot (🟢 🟡 🔴) signaling health—green means active, red means haven't touched it in a while
- Stars, forks, issues, last commit time. These tell you at a glance if the repo is mature and if it's actively developed
- The whole card is clickable, not just a button. Easier to hit, less thinking required

The card layout and spacing keep things visually clean. No animations, no clutter.

Realistically? If you know what you want, you can find and click a repo in under 10 seconds. If you're browsing, 20-30 seconds.

---

## Screen 2: Repository Details

Goal: understand what you're about to automate, then pick a task to run.

First thing is a "back" button. Developers might want to switch repos without going all the way home, so give them that option.

**Header shows the repo name, description, and basics** (branch, language, size). Nothing you haven't seen, but it establishes context.

**Quick metrics grid:** Pull Requests, Issues, Tests Passing, Coverage. Why these? They actually tell you something useful. High coverage = safer to refactor. Open issues = good automation candidate. Active PRs = the repo's alive.

**Recent activity list** shows recent PRs and commits in plain english. Answers the question "what happened recently?" Builds confidence that this is an active project.

**Task selector** is just a dropdown. Pick one from maybe 5-6 options like "Code Refactoring", "Run Tests", "Security Audit", etc. Plain language, not jargon. And once you pick, there's a big button: "Run Agent Task". One click, it starts.

---

## Screen 3: Watch It Run

Goal: show the developer what's happening, step by step. No mystery.

**Top shows what task is running, on which repo, and how long it's been going.** Tells you exactly what you're watching and gives you a sense of whether it's fast or slow.

**Progress bar with step counter.** "Step 3 of 6" breaks it into human-sized chunks. Feels like progress. The percentage number reinforces it.

**Live logs.** Each log line has a little status icon (✓ ⟳ ○ ✗), a timestamp, and the message. The icons let you scan at a glance without reading everything. Timestamps prove work is happening—not stuck.

**Expandable details.** There's a "[Show Details]" button to see the full log dump if you want to dig in. Otherwise, keep it clean by default.

**Control buttons:** Cancel if you change your mind, or Pause Logs if they're scrolling too fast and you want to read them. Pretty straightforward.

The result? You can monitor without reading every line, but you still have full transparency if something looks wrong.

---

## Screen 4: Done

Goal: show what happened and move the developer to the next action.

**Success case:** Big green ✅ SUCCESS badge. Show what actually happened (e.g., "Created a PR with 12 refactored functions"). Link directly to the PR so they can review it. Maybe button to run another task, keep the momentum going.

**Failure case:** Big red ❌ FAILED badge. Tell them plainly what went wrong, no stack traces. Give a few actionable suggestions: "Check the logs", "Retry with different params", etc. Include a Retry button to get back in the game.

---

## How It All Fits Together

Four screens, one after another:
1. Find a repo
2. Look at its state, pick what to do
3. Watch it happen  
4. See the results, decide next steps

You can backtrack at any point with a Back button, or close the modal and try again. It's linear but not rigid.

Why separate screens instead of one long scrolly page? Because mixing "pick a repo" with "watch live logs" in the same view is a mess. Each screen has a job; keep it focused.

---

## Keeping It Accessible

- **Icons + color.** Don't rely only on red/green. Use ✓ and ✗ too.
- **Real labels.** "Run Agent Task", not "Execute". "Pull Requests", not "PRs".
- **Keyboard nav.** Tab through stuff, Enter to confirm, Escape to cancel. Standard web stuff.
- **Readable typography.** Good spacing, enough line height, monospace for logs. Not a wall of text.
- **No motion dependency.** Animations are fine but optional. Text labels work without them.

---

## Visual Style

Keep it clean and familiar:
- **Cards** like GitHub or Slack. Modern, easy to scan.
- **Simple icons.** They work everywhere, easy to understand.
- **Progress bars** everyone recognizes. Solid fill, straightforward.
- **Monospace logs.** Technical convention, plus easier to copy-paste.
- **Buttons with good contrast.** Big enough to hit, clear what they do.

---

## What We're Not Doing (Yet)

We kept scope tight on purpose:
- No advanced dashboards or historical trends
- No custom task definitions or drag-and-drop builders
- No team features or notifications
- No fancy real-time collab

Some of that might come later. For now, the goal is just a solid foundation that developers trust.

---

## Success

How do you know this is working?

1. **Speed:** Can someone go from "I want to refactor" to "task's running" in under a minute? Ideally 45 seconds.
2. **Confidence:** Do developers understand what the AI is doing? Target: >80% say yes.   
3. **Recovery:** If something fails, can they retry without confusion? Target: >70% figure it out alone.
4. **Adoption:** Are people actually using it? First month target: >30% of developers try it.

---

## Wrap-Up

This design is about balancing automation with control. We want devs to trust that the portal's doing useful work, but they're never left wondering what's happening or unable to fix something if it breaks.

Simple screens, clear feedback, familiar patterns. No magic boxes.
