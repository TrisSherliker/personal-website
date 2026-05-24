---
title: Cloudflare cache frustration 
subtitle: Senseless errors annoying lots of people 
date: 2026-05-10
tags: [lawtech]
---

<div class="epigraph">
<blockquote>
<p>There are only two hard things in Computer Science: cache invalidation and naming things.</p>
<footer>Phil Karlton</footer>
</blockquote>
</div>

<span class="newthought">I spent most of today</span> debugging a senseless
error.

This morning's flight of BunTool emails included a suggestion to include
compatibility for Times New Roman and Arial fonts. That's a great idea because
some tribunals specify font types[^lockin] and the plumbing for it was mostly
there in the backend.

[^lockin]: In fact it's a minor access to justice issue that courts require
   people to use proprietary fonts, but probably not a deliberate one. Most people
    seem to think of TNR and Arial as being generic and free, even if that's wrong.
    Fair enough given their prevalence and the hyper-niche nuance of font IP law.


The trouble is that both those fonts are proprietary and BunTool is FOSS. So I
found two excellent alternatives - respectively, [CharisSIL](https://software.sil.org/charis/) and [Liberation Sans](https://en.wikipedia.org/wiki/Liberation_fonts).[^whynot] So I loaded those in and connected up the plumbing, spun up the test cases and all worked well. 

[^whynot]: Why not Liberation Serif too? Only because I liked Charis. All the
    Liberation fonts are great!

Deploying broke everything. Cloudflare was serving some fonts but not others,
even fonts of the same size and in the same directories as working fonts. 

Why? After two hours I'm pretty sure it was a
Cloudflare caching error. Branching and deploying to a fresh preview instance confirmed this was probably the error, since it didn't have the same problems. But annoyingly even purging CF's cache didn't fix it. 

<span class="newthought">In the end</span> I did: 

- Roll back to working instance
- Copy font files only (and no code) from my `dev` branch to `main`
- redeploy
- then merge `dev` into `main`, once fonts were already deployed.

Somehow, that stage of copying just the fonts dir into CF's deployment first,
and then merging seemed to have helped. Or perhaps it just caught up over the
two hours that I was trying to diagnose the problem? I'll never know.

    

