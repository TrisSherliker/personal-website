module.exports = {

  gemini1full: {
    title: "Gemini search overview (1st attempt)",
    image: "/assets/primelegs/gemini-full.jpg",
    imageAlt: "Gemini correcting its own math about which leg counts are prime",
    transcript: `Tris: What animal has a prime number of legs?

    Gemini: Many common animals have a prime number of legs, such as insects with 6 legs or spiders and scorpions with 8 legs, both of which are prime numbers.

Common Examples

Insects (6 legs): Bees, ants, beetles, and butterflies all have six legs, and 6 is a prime number.

Arachnids (8 legs): Spiders, ticks, mites, and scorpions all have eight legs, and 8 is a prime number (wait, 8 is not a prime number—8 = 2 × 4. Let me correct that: 6 is prime, 2 is prime, 4 is composite, 8 is composite. Wait! 2, 3, 5, 7 are primes. So 2-legged animals like birds/humans, 3? No animal with 3. 5-legged animals like most starfish have 5 legs, which is a prime number!).

Let's re-evaluate:

Starfish (5 legs): Most starfish (sea stars) have five arms/legs, and 5 is a prime number.
Insects (6 legs): 6 is composite (2 × 3).
Arachnids (8 legs): 8 is composite (2³).
Vertebrates (2 or 4 legs): 2 is prime, 4 is composite. So bipedal animals (humans, birds, kangaroos) have 2 legs, which is a prime number.

Summary of Prime-Legged Animals
2 legs (Prime): Humans, birds, and kangaroos.
5 legs (Prime): Starfish (echinoderms).`,
  },



  geminiexposetrace: {
    title: "Gemini's doubletake (1st run)",
    image: "/assets/primelegs/gemini-exposetrace.jpg",
    imageAlt: "Crop showing Gemini realizing mid-sentence that 8 is not prime",
    transcript: `Gemini: scorpions all have eight legs, and 8 is a prime number (wait, 8 is not a prime number—8 = 2 × 4. Let me correct that: 6 is prime, 2 is prime, 4 is composite, 8 is composite. Wait! 2, 3, 5, 7 are primes. So 2-legged animals like birds/humans, 3? No animal with 3. 5-legged animals like most starfish have 5 legs, which is a prime number!).

    Let's re-evaluate:`,
  },


  gemini2full: {
    title: "Gemini search overview (2nd attempt)",
    image: "/assets/primelegs/gemini2-full.jpg",
    imageAlt: "Gemini citing Blue Planet Aquarium, calling 8 a prime number for arachnids",
    transcript: `Tris: What animal has a prime number of legs?

    Gemini: Many common animals have a prime number of legs, such as insects with 6 legs, spiders with 8 legs, or starfish which typically have 5 legs.

    Animals with Prime Number Legs

    Insects (6 legs): Bees, ants, and beetles all have six legs, and 6 is a prime number.

    Arachnids (8 legs): Spiders, scorpions, and ticks have eight legs, and 8 is a prime number (notably, a cube of 2).

    Starfish (5 legs): Most common starfish have five arms/legs, and 5 is a prime number.

    Centipedes (Odd pairs): Many centipedes possess an odd number of leg pairs (such as 15 pairs, making 30 legs, though the total count varies by species; some specific species or segment counts can land on prime totals like 42 or others depending on individual variation).`,
  },


  gemini2snip: {
    title: "A prime is a cube (Gemini, 2nd run)",
    image: "/assets/primelegs/gemini2-snip.jpg",
    imageAlt: "Crop: Gemini confidently declaring 8 a prime number, calling it a cube of 2",
    transcript: `Arachnids (8 legs): Spiders, scorpions, and ticks have eight legs, and 8 is a prime number (notably, a cube of 2).`,
  },

  gemini3full: {
    title: "Gemini search overview (3rd attempt)",
    image: "/assets/primelegs/gemini3-full.jpg",
    imageAlt: "Gemini listing insects, arachnids, vertebrates and starfish, second-guessing itself about whether 8 is prime",
    transcript: `Tris: What animal has a prime number of legs?

    Gemini: Many common animals have a prime number of legs, such as insects with 6 legs or spiders and scorpions with 8 legs, both of which are prime numbers.

    Common Examples with Prime Leg Counts

    Insects (6 legs): Ants, bees, beetles, and butterflies all have six legs, and 6 is a prime number (2 × 3).

    Arachnids (8 legs): Spiders, scorpions, ticks, and mites have eight legs, and 8 is not prime (it is 2³), but wait—let's check math: 2, 3, 5, 7 are primes. 6 is composite (2×3), 8 is composite (2×4). Wait! Are there animals with 2, 3, 5, 7, 11, 13 legs?

    Vertebrates (2 or 4 legs): Humans and birds have 2 legs (2 is a prime number). Dogs, cats, horses, and frogs have 4 legs (4 is not prime).

    Starfish (5 legs): Many common starfish have 5 arms/legs, and 5 is a prime number.`,
  },

  gemini3Crop: {
    title: "Gemini's doubletake (3rd run)",
    image: "/assets/primelegs/gemini3-crop.jpg",
    imageAlt: "Crop: Arachnids paragraph questioning whether 8 is prime, then wondering about animals with 11 or 13 legs",
    transcript: `Gemini: Arachnids (8 legs): Spiders, scorpions, ticks, and mites have eight legs, and 8 is not prime (it is 2³), but wait—let's check math: 2, 3, 5, 7 are primes. 6 is composite (2×3), 8 is composite (2×4). Wait! Are there animals with 2, 3, 5, 7, 11, 13 legs?`,
  },


  cgpt1: {
    title: "ChatGPT, unknown free-tier model",
    image: "/assets/primelegs/cgpt-full.jpg",
    imageAlt: "ChatGPT-style share dialog listing octopus, spider, crabs, centipedes and copepods",
    transcript: `Tris: What animal has a prime number of legs?

    ChatGPT: If you mean naturally occurring animals with a prime number of legs, there are some good examples:

🐙 Octopus — 8 legs → not prime
🕷️ Spider — 8 → not prime
🦀 Most crabs — 10 → not prime
🐛 Centipedes — can have 15, 17, 19, 21, … legs depending on species → some have prime numbers
🦐 Some copepods — 5 pairs → 10 → not prime

The most straightforward answer is a centipede: certain species have 15 or 17 legs, both prime numbers.

Interestingly, all known centipedes have an odd number of pairs of legs, and the number of pairs ranges from 15 to 191 depending on species.`,
  },

  mistral1: {
    title: "Mistral Vibe, free",
    image: "/assets/primelegs/mistral.jpg",
    imageAlt: "Cropped view of the octopus/spider/crab/centipede answer",
    transcript: `Tris: What animal has a prime number of legs?

    Mistral: Most animals have an even number of legs (like 2, 4, 6, or 8), but there is one well-known exception: the starfish (or sea star). Starfish typically have 8 legs (arms), and 5 is a prime number.

    So, the answer is: starfish!`,
  },



  claude: {
    title: "Claude Haiku 4.5",
    image: "/assets/primelegs/claude.jpg",
    imageAlt: "Claude got the answer right directly",
    transcript: `Tris: What animal has a prime number of legs?

    Claude: Finding an animal with a prime number ... >

  Several animals have a prime number of legs! Here are some examples:

  2 legs (prime):
  - Humans
  - Birds (chickens, eagles, ostriches, penguins, etc.)
  - Kangaroos

  5 legs (prime):

  - Starfish (sea stars) - they have 5 arms, which function as legs

  7 legs (prime):
  - Some types of millipedes and centipedes have 7 pairs of legs

  The most common examples are probably
  humans and birds with 2 legs, and starfish
  with 5 arms/legs. These stand out because 2
  and 5 are both prime numbers (only
  divisible by 1 and themselves).`,
  },

  llama1: {
    title: "Llama 3.2 (Ollama, local)",
    image: "/assets/primelegs/llama32.png",
    imageAlt: "Terminal running ollama with llama3.2, answering the prime-legs question",
    transcript: `Tris: what animal has a prime number of legs?

    Llama3.2: The answer is... a butterfly! Butterflies have four legs, but when you count the legs on
    each leg (each joint), it's actually eight legs. However, if we count the legs
    individually, there are indeed four legs, which is a composite number.

    But wait, I can give you another example of an animal with a prime number of legs: the ant!
    Ants have six legs, which is a prime number.

    So, to answer your question, the animal with a prime number of legs could be either the
    butterfly (counting each leg individually) or the ant (if we count each leg separately).`,
  },

  kimi1: {
    title: "Kimi K3 (Modal, via OpenCode)",
    image: "/assets/primelegs/kimik3.png",
    transcript: `Tris: what animal has a prime number of legs?

    Kimi K3: + Thought: 6.3s

    A bird—or a human—has 2 legs, and 2 is prime.

    If you mean an odd prime, a starfish has 5 arm-like "legs," though they aren't true legs.

    Build · Kimi K3 (Modal) · 8.8s`,
  },

};
