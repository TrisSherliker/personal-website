---
date: 2026-06-24
title: Vulnerability reports are still special
---

I've just been reading Filippo Valsorda's well-written post about why, in the age of LLMs and automated security analysis, [Vulnerability Reports are not Special Anymore](https://words.filippo.io/vuln-reports/). It's worth reading, and he also added to it to address several comments. 

But I think I disagree with his premise. To my mind, vulnerability reports *are* still special and  the fact that they are more accessible to a wider range of people fuzzing software through LLMs doesn't change this, even in the open source world. 

To be clear, I don't claim to know better than Filippo: he is immersed in that world! I'm a lawyer who handles security through a very different lens, so I am only dealing with this from a high level, damage-limitation-after-the-event sort of perspective. I also don't want to downplay how serious it can be to suffer the information overload of AI-generated materials  coming thick and fast but taking disproportionate time to verify.[^prob]

[^prob]: But dealing with hard-to-verify overload is a problem where I think lawyers and software engineers do have a similar experience.

Anyway with those caveats, I had the reaction I had for three reasons: 

## 1: Knowledge is power

Knowledge is not always power, but knowledge of a security vulnerability is power over a developer and their users.   It is the fact that someone has invested time into uncovering the vuln which makes it valuable. If they choose to disclose it responsibly, they are surrendering that power and accepting that it will cease to put them in a privileged position.  That is something special which doesn't happen every day. 

It is still potent even if discovered using modern tools, or has done so more quickly or easily than before.  It's true that the defending developer may also have access to these tools and may also be able to triage and find the vulnerability more quickly than before. But not all developers will have those tools or the time or knowledge to triage security analysis in the same way. And anyway, the fact is that the vulnerability is available to attackers *now* and presumably has been in the past, even if it might reasonably be patched on a shorter timescale than before. 

As Filippo puts, it, 

> In exchange for responsiveness and attribution, they are offering precious insight and the confidentiality we need to ship a fix before attackers ship an exploit.

I think that holds true, and sacrificing attentiveness would be a shame because it would break the bargain. The bargain doesn't even really *require* responsiveness, that's just a good convention to follow.


## 2: What can be done once can be done again

If someone has found your vulnerability, others will be able to find it too. Assuming a roughly stable proportion of black-hats to white-hats, the odds of a disclosed vuln being found and abused by others have not changed just because LLMs are available to automate. It might just happen faster, is all. 

Filippo makes the point that these things will be triaged and the triage would probably catch the vulnerability anyway. And that's a good point! But not all tooling is equal, and even with access to the best tools any given project's triage might just be wrong, or not take account of everything known to the researcher or attacker. So the triage might need to adapt. [^agree]

[^agree]: ultimately if this research was on the `#TODO` list anyway, that's probably a signal that everyone agrees it's worth addressing. 

## 3: Abuse is also more accessible than ever

Finally and perhaps a bit more practically, I'm worried that LLMs are not just making vulnerabilities easier to find, but also easier to exploit. Exploiting a software vulnerability has never been an easy task, since it requires a decent depth of understanding even to receive the instructions. But it's now possible to have LLMs guide and patiently explain the steps, or even automate them for you. To that end, I'm not sure the assumption I mentioned above holds: There may well be proportionately *more* black-hatting around if everyone and their dog is able to pick up a CVE and run with it without needing to understand the problem deeply.

I say this last thought is a bit more practical than philosophical, because it doesn't change whether or not the disclosure is still special. But it might be the sort of thing that affects the analysis. 

## Does it matter? 

Probably not really.

But I do think philosophically, the choices that a stranger makes - first to invest time and tokens into finding a vulnerability, and second to disclose it responsibly, are still a special kind of positive interaction, irrespective of the tools used. 

