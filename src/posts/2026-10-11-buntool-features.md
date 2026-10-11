---
title: Keeping BunTool Simple
date: 2026-10-11
---

<span class="newthought">This is a reference for now and for the future,</span> and for people who have kindly asked me to extend the features of [BunTool](https://buntool.co.uk) to add new options or other functionality. 

BunTool is, first and foremost, an app to make preparing legal bundles _easy_. It's designed to be accessible to as many people as possible, with the three design goals being: 

- **Design Goal A:** to be highly accessible to people unfamiliar with the legal sphere (like litigants in person), 
- **Design Goal B:** to save time for legal advice charities, pro bono lawyers, and other lawyers hopefully reduce the stress and admin that these people face, and
- **Design Goal C:** to create bundles that work well across the English legal sphere.

Importantly, these are roughly in order of importance, meaning that it's not worth making things easier for lawyers, or to implement the rules of additional tribunals, at the expense of confusing litigants in person.[^settings]

[^settings]: {-} Actually there are already quite a lot of Advanced Settings, but I hide them behind a popup so they're only useful for the people who really need them. I don't want to proliferate more. ![BunTool Advanced Settings image](/assets/buntool-adv-settings.png)

In short, it is a way to reduce the need to study up on various rules, and reduce the need to learn new software, at a stressful time during litigation. It seems to be going well: it has made over 20,000 bundles so far and helped (I presume) thousands of people to present their cases. 

![Cumulative BunTool uses over time](/assets/bundle-uses-over-time.svg)

I write 'I presume' because there is no user tracking:[^track] What this means is that I only find out who and how people are using it when they decide to let me know, and there are generally three different types of emails:

[^track]: {-} At least, I've tried as hard as I can to turn off any personal data collection or similar functionality, including in Cloudflare which hosts the site. 

1. Emails from people (an equal mix between litigants in person and lawyers/judges) who just want to say thank you, or donate to the running of the site. These emails make my day every day, and make the work worthwhile.
2. Emails from people who have found a problem with how the app operates (bug reports). These are always welcome!
3. Emails from people who have had an idea for how to extend the functionality (feature requests).

<span class="newthought">The last kind is where the problems come in.</span> In my experience feature requests are _always_ made in good faith, _almost always_ well-thought-out, and _very often_ excellent ideas that I would enjoy adopting. 

Unfortunately, I can't adopt all the suggestions, even the excellent ones, because making the thing too complicated would violate Design Goal A: To keep things simple.  Extending functionality (by definition) means adding complexity, which will end up overwhelming new users. 

"New Users" here includes _virtually everyone_ in Design Goal A mentioned above: people who are not familiar with courts by definition will not be repeat users of BunTool, so I presume that everyone comes to it fresh and unsullied. As [UX designer Marcin Wichary recently wrote](https://unsung.aresluna.org/they-take-one-look-at-the-ui-and-abandon-it/): 

> If you are familiar with an app, armed with your desire paths and motor memory, you have a lot of capacity to just ignore new menu items, new panels, and new complexity – provided it doesn’t get in your way. New AI option? Turn it off. New tab? Never click on it. New alternate way of doing things? Just continue with the old way.
>
> But as a new user, you don’t have that history, or that experience-backed confidence that a bunch of stuff can simply be ignored as it’s not crucial to everyday operation.

![buntool logo](/assets/buntool-logo-small.png)

<span class="newthought">This is, incidentally, why I keep the colours of BunTool bright</span> and the logo as a friendly hot cross bun. Every time I open up my laptop to work on it, I start by going to the app page and remembering that it's meant to be friendly and welcoming. I'm told that other bundling apps have succumbed to the complexity and have a thicket of menus and optios.[^told] That makes sense for a specialist tool for specialists, but not for BunTool.

[^told]: {-} I'm _told_ they're complex but in fact, I've never used any, not even [BundleDocs](https://bundledocs.com) (which is a popular solution for lawyers) at all, for fear of accidentally copying.

Some features I've implemented include making bundles printable double sided (by inserting an optional blank page if a document would otherwise begin on an even page), and supporting section management. Another popular request from litigants in person and charities alike was making bundles compatible with Family Court "Bates" numbering,[^bates]

[^bates]: {-} The Bates numbering in the Family Court is a terrible misnomer in my view. Bates numbering comes from [Edwin G. Bates, the inventor of the automatic numbering machine in 1896](https://patents.google.com/patent/US676082A/en). It numbered pages sequentially from 000001 to 999999, though in the Family Court "Bates" numbering is used to mean that pages begin again at 1 every section. But those are the rules. ![Bates numbering machine](/assets/bates.png)

Others are less compelling: things like supporting variable table border widths (I did add enable/disable borders), and bundles for very specialist trade mark proceedings are less compelling and would be more likely to break the design fundaments.

<span class="newthought">So, if you've suggested an idea</span> and I haven't been able to implement it - sorry! I don't mean to be rude, and I hope you understand. 
