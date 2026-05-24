---
title: "What logs does BunTool save?"
date: "2026-05-24"
subtitle: "A sample of real logs to illustrate"
tags: buntool, privacy
---

I say on its Privacy page and homepage that [BunTool](https://buntool.co.uk) doesn't log any personal information. This is part of the point, because it's a private tool and if it ingested information about everyone and their legal cases it would be worthless

There is _some_ logging though, and I recently posted about this on LinkedIn: 

<iframe src="https://www.linkedin.com/embed/feed/update/urn:li:share:7463327320574054402?collapsed=1" height="669" width="504" frameborder="0" allowfullscreen="" title="Embedded post"></iframe>

As you see, it's technical logging only without any personal info. Having posted that I realised people might like to know exactly what is logged, so here are some examples of some real-life logs from the last few days, chosen at random (and slightly prettified for ease of display in a news post):

|            |                           6114 |                6022 |                6023 |
|------------|-------------------------------:|--------------------:|--------------------:|
| Started    |            2026-05-21 22:08:22 | 2026-05-21 11:06:56 | 2026-05-21 11:12:04 |
| Files used |                              2 |                  11 |                   3 |
| Page count |                             59 |                 159 |                 119 |
| Size       |                         2.1 MB |             88.9 MB |              0.7 MB |
| Duration   |                          2.3 s |               4.8 s |               2.2 s |
| Status     | Interrupted: cancelled by user |                  OK |                  OK |

That's about it. The error codes (here labelled "Status") can vary - for example there was an increasing trend of errors where people were creating larger and larger bundles which showed up as `realloc error (8765432 bytes failed)` and reference a line of the code where the problem arose[^stack].

[^stack]: The "stack trace"

But still, no personal information.
