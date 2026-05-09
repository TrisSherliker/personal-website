---
title: Vibecoding a simole feature with Claude
subtitle: Giving up part of my soul?
date: 2026-05-09
tags: [Claude, LLM, BunTool]
---

<span class="newthought">My side project</span> has been entirely handcoded in the backend, until today. I've used Claude Code a great deal for frontend work -- I am no web designer -- but I've tended my backend carefuly with my own hands.[^hands] Today I decided to break that habit and try adding a feature using Claude to generate all the code edits.

[^hands]: In fact using my hands is part of the point, being effective rehab while recovering from an injury.

[BunTool](https://buntool.co.uk) ([git](https://github.com/TrisSherliker/buntool-website-git) is for making PDF bundles for use in court and legal settings, and one feature requested by a colleague (who absolutely knows what she is talking about and should be listened to) was the ability to add a custom coversheet. That's a great test case, because the feature is easy to conceptualise and express, it touches mutiple points in the bundle-making pipeline from frontend to output, and beause I can hold the logic in my head from beginning to end for checking purposes.

## Framework

Also a good chance to test a new (to me) `claude.md` variant. I heard from a friend today that [Forrest Chang's Karpathy-Inspired Claude Code Guidelines](https://github.com/forrestchang/andrej-karpathy-skills) was useful[^forrest], so installed it as a plugin before I got started. This was pretty easy using claude's inline plugin managemnet commands.

[^forrest]: Described as _"A single CLAUDE.md file to improve Claude Code behavior, derived from Andrej Karpathy's observations on LLM coding pitfalls."_ I've used Claude enough in the past that I think I'll be able to spot differences, though this is a sligtly different exercise.

## Specifying

I decided to work from a markdown checklist and iterate through the steps one by one, so started by planning out my spec for the feature: 

```
# Adding coversheet checklist

## Backend

- [ ] buntoolconfig.js - add bool option
- [ ] validate cover page fumcton: check file = 1 page or extract first page, return first page
- [ ] Add validation call in buntoolMain.js
- [ ] at 3/11 in buntoolMain.js Creation of TOC entries, page numbers +1 if coversheet
- [ ] at 5/11 buntoolMain.js (generating TOC pages) page number needs to respect toc entries setting if coversheet present (just check carries through)
- [ ] After current step 7/11 buntoolMain.js (ass new step before current step 8, after toc is merged), the result of the step7 merge should then be merged again with coversheet
- [ ] the abbreviated justtheeindex flow in buntoolMain.js should merge with coversheet


## frontend

- [ ] Button to add optional coversheet
- [ ] call validate function at point of upload (belt and braces)
- [ ] show selected filename
- [ ] clear/remove button
- [ ] error handling for invalid file
- [ ] submit logic to accommodate coversheet as parameter coversheetFile
- [ ] add mention in tutorial
```

This is specc'd by reference to the logic flow in my `buntoolMain.js` main logic flow, but those steps in turn call out to various submodules.

## Step by step

Setting Claude to ask-before-edits gave me peace of mind, and then I prompted it to follow stepwise ("_ok let's do the coversheet adding plan step by step.  start with step 1: show me your proposed edits_"). Baby steps from the interfce within VSCode:

![claude-polite.png](Claude politely making edits without fluff)

And so it proceeded.

<span class="newthought">Overall it went very well.</span> There were a few nits and irritations though:

- Claude often used variable names which were fine in isolation but which were confusing in their overall context. For example `coversheetFile` and `coversheetPDF` were two dfferent but closely connected things, one derived from the other, both the same type. I much preferred names that conveyed the functions - `coversheetFile` and `validatedCoversheet`. It would have been annoying to come back to maintain the confusing variables in future. 
- Without Forrest Chang's plugin Claude just loved haphazardly deleting my comments. I'm sure that some people would do the same, but I put them there for a reason! I found the plugin helped with this, suppressing unwanted edits.
- Although it had no respect for my comments, it seemed to find the logging prints unassailable. They count up stepwise in the main pipeline ("step 4/11" etc), so a `sed` call or two was needed to update them globally as new pipeline steps were added.[^sed]
- In some cases it got the logical flow of steps out of order. That's fine, this is why I monitor and could correct it. Somewhat sassily it reacted to that by amending my spec to hyperclarify... even after the edit was finished!

So I ended up being quite hands-on and I couldn't surrender control entirely. Having said that, if I were using Claude for maintaining a lot of this wouldn't matter a jot.

![claude-check.png](I let the LLM have the satisfaction of checking things off its list and it took the opportunity for some sassy backkkchat.)


[^sed]: Usind `sed` is quite boring. Luckily Claude could also save me all the typing.

<span class=newthought">At one point while testing</span> I found quite a subtle bug with hyperlinking, which took a while to solve because it seemed to be only intermittently reproducible[^bug]. This was very annoying but I eventually worked out that it was due to relying on undefined behaviour being handled in a certain way. This wasn't Claude's fault, but Claude confidently proposed a fix that broke things much more acutely. I fixed it by hand in the end.

[^bug]: a sort of [Heisenbug](https://en.wikipedia.org/wiki/Heisenbug), since trying to debug it with my preferred PDF viewers (which giver richer control than a browser viewer) led to a different experience.

## Overall?

Overall it was a good experience. I definitely saved time, achieved a good result, and deployed a new feature. It wasn't quite as smooth as I hoped, but that was partly because I was so opinionated about how things should look that I tended to want to micromanage the result anyway.
