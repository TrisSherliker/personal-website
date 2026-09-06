---
title: "What animal has a prime number of legs?"
date: "2026-09-06"
---

<div class="epigraph">An idle question that did interesting things to AI</div>

<span class="newthought">What animal</span> has a prime number of legs? The best answer is **"a human"**.[^biped] The riddle sounds easy and intuitive, but it's counterintuitive at least because 

[^biped]: {-} Any biped is a fair answer, but 'human' is the most fun answer, because the answer is right there staring you in the face asking you the question.

1. legs come in even pairs, but prime numbers aren't normally even,
2. "animal" doesn't connote "human" to everyone (other bipeds excepted), and 
3. starfish (the obvious residual answer) technically have arms rather than legs.[^arms]

[^arms]: {-} Starfish have "arms" in English, conventionally. Some people do say legs. The point isn't to sneer about jargon. More interestingly a starfish's underside is covered with [hundreds of tiny tube feet](https://commons.wikimedia.org/wiki/File:Pieds_ambulacraires_d%27une_%C3%A9toile_de_mer_glaciaire_(Marthasterias_glacialis)_(Ifremer_00554-66633_-_44457).jpg) with suckers that they use to move around. So they do have something like legs, or at least feet, under there.  ![Starfish feet](/assets/primelegs/starfishfeet.jpg) _Olivier Dugornay via Wikimedia Commons, CC BY 4.0_

<figure><img src="/assets/primelegs/starfish.png" alt="Starfish"><figcaption>Not pictured: legs (credit: James St. John, CC BY 2.0)</figcaption></figure>

So there are a few things to break through, which is what makes it a fun question in the first place for mulling over with the kids.

<span class="newthought">Anyway, after enjoying all that</span> I Googled to find out whether there were any actually-interesting answers, and ... the Gemini summary stopped me in my tracks: 

<figure><img src="/assets/primelegs/gemini-snip.jpg" alt="6 is a prime number"><figcaption>SHUT THE FRONT DOOR</figcaption></figure>

I'm going to refer to these AI Overview outputs as being Gemini models, because as of January 2026, Google [advertises that search snippets are done with Gemini 3](https://blog.google/products-and-platforms/products/search/ai-mode-ai-overviews-updates/). That also happens to be the same model which, as [published in February 2026](https://deepmind.google/blog/accelerating-mathematical-and-scientific-discovery-with-gemini-deep-think/),[^fair], was advancing the frontiers of mathematics. Six wasn't a prime number when I last checked, but admittedly that was back in 2025 so maybe the frontiers of mathematics have just advanced that far.

[^fair]: {-} Of course the reasoning depth and other things differ between user search and scientific research. It's definitely a good thing that Google isn't running its most advanced DeepMind thought-enabled compute against my casual searches, but that comparison's what went through my mind at the time.

Here's the full screenshot and transcript:

{% aiExchange "gemini1full" %}


## What's going on?

I think there are at least three interesting things going on. 

<span class="newthought">There seem to be two competing concepts</span> here which the LLM is having difficulty reconciling: legs, and primes. 

I suppose it's pretty common for people to ask how many legs a spider has, or for training material to declare that "an insect has 6 legs", since the number of leg pairs is [part of the definition of what insects](https://en.wikipedia.org/wiki/Insect) and [arachnids](https://en.wikipedia.org/wiki/Arachnid) are.[^trends] On the other hand, there seem to be far fewer searches for how many legs humans or birds have, and approximately nobody cares about whether or not leg numbers are prime. 

[^trends]: {-} Interestingly Google Trends suggests that the spider-legs question is overwhelmingly the most common of the group (see below, click to zoom). It also shows that over the last 20 years, there's an extremely strong interest in counting spider legs in October, with regular spikes roughly 3 times higher than the surrounds. Interesting! Spider season begins before October so I don't think that explains it. The trend seems to be US-dominated, so perhaps US schools are teaching about insects and spiders in the mid-autumn? [![Google Trends chart comparing searches about spider, insect and human leg counts, with regular October spikes for spiders](/assets/primelegs/google-trends.png)](#trends-zoom) You can [explore the Trends here](https://trends.google.com/explore?q=how%2520many%2520legs%2520do%2520insects%2520have%2Chow%2520many%2520legs%2520do%2520birds%2520have%2Chow%2520many%2520legs%2520do%2520humans%2520have%2Chow%2520many%2520legs%2520do%2520spiders%2520have%2Chow%2520many%2520legs%2520does%2520a%2520centipede%2520have%2Chow%2520many%2520legs%2520does%2520a%2520millipede%2520have&date=all&geo=Worldwide), and see for yourself that Ireland is _disproportionately_ interested in centipede  legs, while Saudi Arabians are the population most likely to check how many legs a human has.

<div class="lightbox" id="trends-zoom"><a href="#_"><img src="/assets/primelegs/google-trends.png" alt="Google Trends chart comparing searches about spider, insect and human leg counts, with regular October spikes for spiders"></a></div>

So as a hypothesis, perhaps there's a strong trained association between `how many legs` questions and the answers `insect` and `arachnid`. 

<span class="newthought">Beyond that, the object of the question</span> (find prime legs) isn't clear on its face, since `prime number` is a sort-of-parameterised shorthand for `the numbers 2, 3, 5, 7, ...`, meaning that the object of the question itself isn't even clear until some reasoning has been applied to parse everything out. 

Chaining hypotheses together, then, perhaps that doesn't provide enough of a signal to override the very strong association mentioned above? If so, that strong signal might explain why on my second attempt, Gemini was so confident in its answer that it was prepared to assert that 8 was both a prime _and a cube of 2_ in the same breath:

{% aiExchange "gemini2snip" %}


<span class="newthought">And then there's the spit-take</span>. I really enjoyed seeing the "Wait!" moment when it caught itself and started backtracking:

{% aiExchange "geminiexposetrace" %}

This doubletake looks a lot like a reasoning trace leaking through, followed by a very corporate and slightly blame-shifting change of gear with the "Let's re-evaluate" break. As a good friend pointed out to me when I showed him, it's interesting that this is directed to the user-facing output _at all_. But it's very relatable.

<figure><img src="/assets/primelegs/spit.jpg"><figcaption>Spit-take. credit: FaceMePLS, CC BY 2.0, via <a href="https://commons.wikimedia.org/wiki/File:Spitting_Leaders_(2611156132).jpg">Wikimedia Commons</a></figcaption></figure>

After trying the same thing a few different times (I didn't screenshot all of them), the problem came up in a few different ways. Sometimes, the answer came more smoothly than others, but in other cases, it didn't correct itself at all and ran with the wrong answers: 

{% aiExchange "gemini2full" %}

Other times, the doubletake happened in different ways. In this example (my third Gemini run), it resulted in the question being rephrased as a whole, and that new phrasing (which broke down the parameterised reference to primes) then led the answer in the correct direction. Below is the third Gemini run, first in full:

{% aiExchange "gemini3full" %}

And from within that, the doubletake:

{% aiExchange "gemini3Crop" %}

Overall, it seemed like without the exposed reasoning trace leaking through as a doubletake, it never seemed to correct itself at all, so that presumably-unintended reasoning trace was performing a function.


<span class="newthought">And then there's the starfish problem.</span> All the Gemini traces seemed to acknowledge the arms-versus-legs problem, and even to _prefer_ the 'arms' terminology:

> - _"Most starfish (sea stars) have five arms/legs..."_

> - _"Most common starfish have five arms/legs"_

> - _"Many common starfish have 5 arms/legs"_

... but didn't really address the issue head-on. So while it's only pedantry that would make the answer invalid, it's at least somewhat incomplete (and in some cases, the biped answer didn't even come up at all).

<span class="newthought">Ultimately, the most interesting thing</span> about all this is how the search function has moved. We started out in the 1990s using search to find resources like webpages; then Google moved to promoting the information to the top, which was not to everyone's taste partly because it changed the tool from a resource-finder to an information-finder. Now we've moved to a non-deterministic generated answer at the top of the page, which catches itself _after the fold_ and re-evaluates.

Perhaps I should join a webring and party like it's 1999.


## So what about other models?

<span class="newthought">Other models varied</span> in a way that made the question an interesting discriminator. Without trying to be scientific, I tried the same prompt on an assortment of other models I had to hand: Claude, Kimi, ChatGPT, Mistral, and (haha) Llama 3.2. In each case I used the default free-plan settings, which seemed a fair way to measure it in a way that's at least reasonably comparable to what's available via Google's AI overview.

**Kimi K3**: was my favourite of the whole bunch! This was run through OpenCode served on Modal. Straight to the point, no dross, and it even dealt with the starfish problem:

{% aiExchange "kimi1" %}

**Claude**: Claude also did well. Even on its lightest-weight current Haiku Model (Haiku 4.5), Claude's answer was flawless and it also addressed the starfish problem.

{% aiExchange "claude" %}                                                                                                                                                                                                                                            

**ChatGPT**: Worst of the commercial services. I don't know which model was auto-selected in the webchat, but it joyfully gave wrong answers 🐙 punctuated 🐛 by 🦐 joyfully 🕷️ unhelpful 🦀 emojis. It didn't get **any correct answers at all**, not even starfish, even though the 𓇼 glyph was right there for the taking.[^glyph] In something like the opposite of a reasoning trace, it tricked itself into thinking that odd numbers of _pairs_ of legs amount to primes in the case of centipedes: 

{% aiExchange "cgpt1" %}


[^glyph]: {-} ChatGPT may have been tripped up because there's no official starfish emoji, meaning that modern tablet computers are less able to represent starfish than the stone tablets of ancient Egyptians 5,500 years ago. It's not all bad though as the glyph `𓇼`, Unicode `U+131FC`, is an Egyptian hieroglyph [representing a five-pointed starfish](https://en.wiktionary.org/wiki/%F0%93%87%BC). It's nice that, being Unicode, the URL of that Wiktionary link ends in the glyph itself. ![Starfish hieroglyph](/assets/primelegs/starglyph.png) _George Douros, public domain via Wikimedia Commons_

**Mistral**: I'm not so familiar with Mistral but its Vibe model was concise. It didn't perceive 2 as a prime number at all, and after it paraphrased the question into "odd" numbers, starfish was always going to be the only answer left to it:

{% aiExchange "mistral1" %}

**Llama 3.2**: As a reminder of how far we've come, here's Llama 3.2 running on my CPU via Ollama. Which was just _pure_ absurdity:

{% aiExchange "llama1" %}

Ah, the rollercoaster! The lift as I watched the tokens accumulate, seem to catch the same doubletake as Gemini _"But wait!"_ ... and the abjet crash as it slopped out, "an ant".

Not even any emojis. 

## If you enjoy...

* ... thinking about prime numbers of legs, check out Wiki's list of animals by number of legs, which is organised (sensibly) by pairs and features several with prime numbers of pairs: https://en.wikipedia.org/wiki/List_of_animals_by_number_of_legs. 

* ... thinking about AI reasoning, here's an interesting article from the Economist about that: https://www.economist.com/interactive/briefing/2026/08/20/the-search-for-consciousness-inside-llms (thanks Brad!)

* ... chatting about this sort of thing, or tech-and-law (another interest of mine), I'm always up for chatting too. If you're in London UK, drop me a line and let's have a coffee.





  
