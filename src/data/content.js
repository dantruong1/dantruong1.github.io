export const SITE_CONTENT = {
  hero: {
    greeting: "Hey there, I'm",
    name: "Dan Truong",
    role: "Technical Product Manager 2, Xbox @ Microsoft",
    subrole: "UC Berkeley '24 · Econ Major, Data Science & Public Policy Minors · Bay Area Native",
    location: "San Francisco, CA",
    photo: "images/sf-header.jpg",
    bio: "I'm endlessly fascinated by people: why we make the decisions we do, how incentives shape behavior, and how thoughtful technology can make everyday life a little better. At Microsoft, I work as a Technical Product Manager on the Xbox team, where I get to build AI-powered tools alongside incredibly smart people and solve problems that help others do their best work.",
    bioExtended: "On Xbox at Microsoft, I translate user needs and product strategy into intuitive consumer experiences.",
    quote: "The cold water does not get warmer if you jump late.",
    quoteAttr: "one of many favorites"
  },
  pillars: [
    {
      id: "behavior",
      name: "Human Behavior",
      tagline: "Patterns of everyday life",
      description: "Observing how people navigate choices, form habits, and interact with tools in their natural environment."
    },
    {
      id: "psychology",
      name: "Psychology",
      tagline: "Mental models & emotion",
      description: "Understanding motivation, perception, and cognitive friction to design products that feel effortless and human."
    },
    {
      id: "economics",
      name: "Economics",
      tagline: "Systems & value creation",
      description: "Analyzing market incentives, decision logic, and human trade-offs to build sustainable consumer products."
    },
    {
      id: "incentives",
      name: "Incentives",
      tagline: "System mechanics & nudges",
      description: "Uncovering reward structures and trade-offs to align platform mechanics with human desires and well-being."
    },
    {
      id: "decision-making",
      name: "Decision Making",
      tagline: "Choices under uncertainty",
      description: "Exploring how individuals evaluate risk, utility, and timing when making choices in complex systems."
    },
    {
      id: "technology",
      name: "Technology",
      tagline: "Thoughtful tools for human lives",
      description: "Software engineered with purpose, turning complex technical capability into delightful user experiences."
    }
  ],
  scrapbook: [
    {
      id: "goldengate",
      src: "images/sf-header.jpg",
      title: "Golden Gate Sunset",
      caption: "Golden Hour in San Francisco",
      location: "San Francisco, CA",
      badge: "SF 🌉",
      year: "2024",
      rotate: "-rotate-2",
      washiPos: "washi-tape-top-left"
    },
    {
      id: "berkeley",
      src: "images/profile/berkeley-grad.jpg",
      title: "UC Berkeley '24",
      caption: "Econ Major · Data Science & Public Policy Minors",
      location: "Doe Library · Berkeley, CA",
      badge: "Cal Alum 🎓",
      year: "2024",
      rotate: "rotate-2",
      washiPos: "washi-tape-top-right"
    },
    {
      id: "bayarea",
      src: "images/profile/chase-center.jpg",
      title: "Bay Area Native",
      caption: "San Jose Roots · Chase Center",
      location: "Chase Center · San Francisco, CA",
      badge: "Bay Area 🏀",
      year: "2025",
      rotate: "rotate-1",
      washiPos: "washi-tape-bottom-left"
    },
    {
      id: "yosemite",
      src: "images/profile/yosemite-halfdome.jpg",
      title: "California Trails",
      caption: "Half Dome Sunset Hike",
      location: "Yosemite Valley, CA",
      badge: "Outdoors 🏔️",
      year: "2024",
      rotate: "-rotate-3",
      washiPos: "washi-tape-bottom-right"
    }
  ],
  about: {
    title: "About Me",
    subtitle: "Born and raised in San Jose, CA. Building helpful products for people at Microsoft.",
    paragraphs: [
      "Hi, I’m Dan. I grew up in San Jose, California and studied Economics, Data Science, and Public Policy at UC Berkeley. Today, I’m a Technical Product Manager at Microsoft on the Xbox team, where I work on AI/ML-powered automation that’s changing how games are tested and built. Before that, I worked on Microsoft Learn, and earlier in my career interned at Zillow and Wish.",
      "I'm endlessly curious about people: why we make the decisions we do, how incentives shape behavior, and how good products fit naturally into everyday life.",
      "Outside of work, I mentor refugees, a cause that's personal to me because my father came to the United States as a refugee after the Vietnam War. I also love tennis, the Warriors, cooking Vietnamese food, exploring national parks, and spending time with family and friends.",
      "I drink green tea almost every day. You'll usually find me somewhere between a warm cup of tea, a good essay, and lofi beats."
    ],
    philosophyCore: "I love chasing meaningful problems with great people and figuring out how to build helpful, useful tools.",
    spotifyUrl: "https://open.spotify.com/user/dantruong12",
    highlights: [
      { label: "Role", value: "Technical PM, Xbox @ Microsoft" },
      { label: "Previously", value: "Microsoft Learn · Zillow · Wish" },
      { label: "Education", value: "UC Berkeley '24 (Econ, Data Science & Public Policy)" },
      { label: "Roots & Location", value: "San Jose (Born & Raised) · San Francisco, CA" },
      { label: "Interests", value: "Warriors, Tennis, Vietnamese Cooking, National Parks" }
    ]
  },
  projects: [
    {
      id: "metabolic-app",
      tag: "Consumer Health App",
      title: "Metabolic App: Grocery Health & Nutrition",
      description: "A consumer health app designed to help users grocery shop healthier and achieve their personalized nutrition goals, backed by authoritative USDA food composition data.",
      tech: ["Consumer Product", "USDA Food Data API", "Health & AI", "Nutrition Data"],
      url: "https://metabolicapp.com",
      featured: true
    },
    {
      id: "msft-hackathon-2024",
      tag: "1st Place · Microsoft 2024",
      title: "Microsoft Global Hackathon 1st Place Winner",
      description: "Won 1st Place out of 70,000+ employees and 20,000+ competing teams worldwide at the Microsoft 2024 Global Hackathon. Designed and built an interactive game-based learning product to upskill tech professionals.",
      tech: ["Gamified Learning", "EdTech", "Product Strategy", "System Design"],
      featured: true
    },
    {
      id: "gates-foundation",
      tag: "1st Place · Gates Foundation",
      title: "Bill & Melinda Gates Foundation Case Competition - UC Berkeley",
      description: "Won 1st place in college by pitching a localized digital volunteer platform designed to increase charitable revenues and volunteer engagement for non-profit organizations.",
      tech: ["Nonprofit Tech", "Social Impact", "Public Policy", "GTM Strategy"],
      featured: false
    },
    {
      id: "haas-case-competition",
      tag: "1st Place · UC Berkeley Haas",
      title: "Haas Business School Case Competition - 1951 Coffee Company",
      description: "Won 1st place at UC Berkeley Haas Business School by developing and pitching a comprehensive marketing and Go-To-Market (GTM) growth campaign for 1951 Coffee Company.",
      tech: ["GTM Strategy", "Marketing", "Brand Strategy", "Economics"],
      featured: false
    },
    {
      id: "strava-pricing-strategy",
      tag: "Product Consulting · Spring 2021",
      title: "Strava Global Pricing Strategy Project",
      description: "Engaged directly with Strava's Product Management team as a student consultant in Spring 2021. Designed international market-based pricing strategies to optimize subscription tiers across localized global markets.",
      tech: ["Product Management", "Pricing Strategy", "Econometrics", "Global Markets"],
      featured: false
    }
  ],
  writings: [
    {
      id: "econ-disparity",
      date: "Dec 2022",
      tag: "Op-Ed · Daily Cal",
      title: "A Look Into Economic Disparity Among Asian Americans",
      excerpt: "An op-ed published during college for The Daily Californian examining economic disparity, wealth inequality, intra-group variance, and systemic factors across Asian American communities.",
      url: "https://dailycal.org/2022/12/07/a-look-into-economic-disparity-among-asian-americans"
    },
    {
      id: "substack-essays",
      date: "Substack · @dantruong12",
      tag: "Substack Publication",
      title: "Dan's Substack: Essays & Reflections",
      excerpt: "Long-form essays, product reflections, and thoughts on economics, technology, personal growth, and culture published regularly on Substack.",
      url: "https://substack.com/@dantruong12/p-204045676"
    }
  ],
  quotes: [
    // ── Action & Courage ──
    {
      id: 1,
      quote: "The cold water does not get warmer if you jump late.",
      author: "Popular Aphorism",
      category: "Action & Courage",
      favorite: true
    },
    {
      id: 2,
      quote: "If you want to build a ship, don't drum up the men to gather wood, divide the work, and give orders. Instead, teach them to yearn for the vast and endless sea.",
      author: "Antoine de Saint-Exupéry",
      category: "Action & Courage",
      favorite: true
    },
    {
      id: 3,
      quote: "You get points for predicting rain, but you get prizes for building arks.",
      author: "Lou Gerstner",
      category: "Action & Courage",
      favorite: true
    },
    {
      id: 4,
      quote: "Before you try to increase your willpower, try to decrease the friction in your environment.",
      author: "James Clear (Atomic Habits)",
      category: "Action & Courage",
      favorite: true
    },
    {
      id: 5,
      quote: "Everything negative, pressures, challenges, is all an opportunity for me to rise.",
      author: "Kobe Bryant",
      category: "Action & Courage",
      favorite: true
    },
    {
      id: 6,
      quote: "Fail early, fail often, fail forward.",
      author: "John C. Maxwell",
      category: "Action & Courage",
      favorite: false
    },
    {
      id: 7,
      quote: "Sucking at something is the first step to becoming sorta good at something.",
      author: "Jake the Dog (Adventure Time)",
      category: "Action & Courage",
      favorite: true
    },
    {
      id: 8,
      quote: "Be brave. Take risks. Nothing can substitute experience.",
      author: "Paulo Coelho",
      category: "Action & Courage",
      favorite: false
    },
    {
      id: 9,
      quote: "Success consists of going from failure to failure without loss of enthusiasm.",
      author: "Winston Churchill",
      category: "Action & Courage",
      favorite: true
    },
    {
      id: 10,
      quote: "Only those who dare to fail greatly can ever achieve greatly.",
      author: "Robert F. Kennedy",
      category: "Action & Courage",
      favorite: false
    },
    {
      id: 11,
      quote: "The only real mistake is the one from which we learn nothing.",
      author: "Henry Ford",
      category: "Action & Courage",
      favorite: false
    },
    {
      id: 12,
      quote: "What is the point of being alive if you don't at least try to do something remarkable?",
      author: "John Green",
      category: "Action & Courage",
      favorite: true
    },
    {
      id: 13,
      quote: "A person who never made a mistake never tried anything new.",
      author: "Albert Einstein",
      category: "Action & Courage",
      favorite: false
    },
    {
      id: 14,
      quote: "It's failure that gives you the proper perspective on success.",
      author: "Ellen DeGeneres",
      category: "Action & Courage",
      favorite: false
    },
    {
      id: 15,
      quote: "I have not failed. I've just found 10,000 ways that won't work.",
      author: "Thomas Edison",
      category: "Action & Courage",
      favorite: false
    },
    {
      id: 16,
      quote: "Your path is harder because your calling is higher.",
      author: "Popular Wisdom",
      category: "Action & Courage",
      favorite: true
    },
    {
      id: 17,
      quote: "Choose your hard. Being broke is hard; building wealth is hard. Being unfit is hard; staying fit is hard. Choose your hard.",
      author: "Popular Aphorism",
      category: "Action & Courage",
      favorite: true
    },
    {
      id: 18,
      quote: "Waste no more time arguing about what a good man should be. Be one.",
      author: "Marcus Aurelius",
      category: "Action & Courage",
      favorite: true
    },
    {
      id: 19,
      quote: "If your dreams don't scare you, you're not dreaming big enough.",
      author: "Ellen Johnson Sirleaf",
      category: "Action & Courage",
      favorite: false
    },
    {
      id: 20,
      quote: "If you are completely certain of the path you're on, it's usually because you're following someone else's.",
      author: "Joseph Campbell / Carl Jung",
      category: "Action & Courage",
      favorite: true
    },
    {
      id: 21,
      quote: "The day you plant the seed is not the day you eat the fruit.",
      author: "Fabienne Fredrickson",
      category: "Action & Courage",
      favorite: false
    },
    {
      id: 22,
      quote: "Feeling lost or stuck forces you to pause and reevaluate. It gives you the opening to consciously choose the path that feels truest to you.",
      author: "Personal Reflection",
      category: "Action & Courage",
      favorite: false
    },
    {
      id: 23,
      quote: "The thing about your 20s is, no matter how you spend them, you'll wonder about the other path. So forget decision paralysis: take a leap of faith and follow your heart.",
      author: "Conventional Wisdom",
      category: "Action & Courage",
      favorite: true
    },
    {
      id: 24,
      quote: "People don't practice to be great; people practice to practice. Don't count minutes or take shortcuts: practice for excellence.",
      author: "Personal Reflection",
      category: "Action & Courage",
      favorite: false
    },

    // ── Mindset & Gratitude ──
    {
      id: 25,
      quote: "Most unhappiness is caused by the stories we tell ourselves in our heads.",
      author: "Epictetus",
      category: "Mindset & Gratitude",
      favorite: true
    },
    {
      id: 26,
      quote: "Optimism is the highest form of intellectual maturity. You see the world for what it is, yet still choose to hope and focus on solutions.",
      author: "Popular Wisdom",
      category: "Mindset & Gratitude",
      favorite: true
    },
    {
      id: 27,
      quote: "There are only two days in the year that nothing can be done: one is called Yesterday and the other is called Tomorrow.",
      author: "Dalai Lama",
      category: "Mindset & Gratitude",
      favorite: true
    },
    {
      id: 28,
      quote: "We suffer more often in imagination than in reality.",
      author: "Seneca",
      category: "Mindset & Gratitude",
      favorite: true
    },
    {
      id: 29,
      quote: "Traveling won't cure your depression. A change of character, not a change of air, is what you need.",
      author: "Seneca",
      category: "Mindset & Gratitude",
      favorite: false
    },
    {
      id: 30,
      quote: "Think about how happy you would be if you lost everything you had right now, and then got it all back.",
      author: "Stoic Reflection",
      category: "Mindset & Gratitude",
      favorite: true
    },
    {
      id: 31,
      quote: "Worrying means you suffer twice.",
      author: "J.K. Rowling (Newt Scamander)",
      category: "Mindset & Gratitude",
      favorite: false
    },
    {
      id: 32,
      quote: "The foolish man seeks happiness in the distance; the wise grows it under his feet.",
      author: "James Oppenheim",
      category: "Mindset & Gratitude",
      favorite: false
    },
    {
      id: 33,
      quote: "Don't be overheard complaining, not even to yourself.",
      author: "Marcus Aurelius",
      category: "Mindset & Gratitude",
      favorite: true
    },
    {
      id: 34,
      quote: "Sometimes you never know the value of a moment until it becomes a memory.",
      author: "Dr. Seuss",
      category: "Mindset & Gratitude",
      favorite: false
    },
    {
      id: 35,
      quote: "When taking a shower, be in the warm water, not in your breakfast or commute. Be present.",
      author: "Mindfulness Principle",
      category: "Mindset & Gratitude",
      favorite: true
    },
    {
      id: 36,
      quote: "You can have 1,000 problems in life until you have a health problem. Then you only have one problem.",
      author: "Naval Ravikant",
      category: "Mindset & Gratitude",
      favorite: true
    },
    {
      id: 37,
      quote: "If you choose not to find joy in the snow, you will have less joy in your life and the exact same amount of snow.",
      author: "Popular Wisdom",
      category: "Mindset & Gratitude",
      favorite: true
    },
    {
      id: 38,
      quote: "Never treat your current stage of life like a transitory period. Don't waste your now hoping for something else.",
      author: "Personal Reflection",
      category: "Mindset & Gratitude",
      favorite: true
    },
    {
      id: 39,
      quote: "Life is 10% what happens to you and 90% how you react to it.",
      author: "Charles R. Swindoll",
      category: "Mindset & Gratitude",
      favorite: false
    },
    {
      id: 40,
      quote: "Emotion regulation isn't about controlling what you feel; it's about choosing how you respond.",
      author: "Psychology Reflection",
      category: "Mindset & Gratitude",
      favorite: false
    },
    {
      id: 41,
      quote: "Obsessing over pain makes problems grow. Move your body, run errands, get outside, don't let rumination become a habit.",
      author: "Personal Reflection",
      category: "Mindset & Gratitude",
      favorite: false
    },

    // ── Self-Mastery & Authenticity ──
    {
      id: 42,
      quote: "If you are lonely when you're alone, you are in bad company.",
      author: "Jean-Paul Sartre",
      category: "Self-Mastery",
      favorite: true
    },
    {
      id: 43,
      quote: "Better to admit you walked through the wrong door than spend the rest of your life in the wrong room.",
      author: "Popular Wisdom",
      category: "Self-Mastery",
      favorite: true
    },
    {
      id: 44,
      quote: "In order to love who you are, you cannot hate the experiences that shaped you.",
      author: "Andrea Dykstra",
      category: "Self-Mastery",
      favorite: true
    },
    {
      id: 45,
      quote: "Do you remember who you were before the world told you who you should be?",
      author: "Danielle LaPorte",
      category: "Self-Mastery",
      favorite: true
    },
    {
      id: 46,
      quote: "Confidence is built on a high reputation with yourself. Keep the promises you make to yourself.",
      author: "Ed Mylett / Alex Hormozi",
      category: "Self-Mastery",
      favorite: true
    },
    {
      id: 47,
      quote: "Discipline is the highest form of self-love.",
      author: "Will Smith",
      category: "Self-Mastery",
      favorite: true
    },
    {
      id: 48,
      quote: "The best part about being authentic is that there's no image to maintain.",
      author: "Popular Wisdom",
      category: "Self-Mastery",
      favorite: false
    },
    {
      id: 49,
      quote: "Instead of passively accepting existence, take ownership of your choices. Create your own meaning and purpose.",
      author: "Jean-Paul Sartre",
      category: "Self-Mastery",
      favorite: false
    },
    {
      id: 50,
      quote: "It's okay to live a life others don't understand.",
      author: "Popular Aphorism",
      category: "Self-Mastery",
      favorite: false
    },
    {
      id: 51,
      quote: "There is no map for when you should accomplish things in life. Don't waste your life living by other people's deadlines.",
      author: "Conventional Wisdom",
      category: "Self-Mastery",
      favorite: true
    },
    {
      id: 52,
      quote: "My biggest achievement: I know who I am, I love who I am, and I like the pace at which I'm taking my life.",
      author: "Personal Reflection",
      category: "Self-Mastery",
      favorite: true
    },
    {
      id: 53,
      quote: "Don't be so humble that you disappear or sell yourself short.",
      author: "Maya Angelou",
      category: "Self-Mastery",
      favorite: false
    },
    {
      id: 54,
      quote: "You can disappoint people and still be good enough. Mistakes make you human, not inept.",
      author: "Personal Reflection",
      category: "Self-Mastery",
      favorite: false
    },

    // ── Perspective & Kindness ──
    {
      id: 55,
      quote: "'Remember when' is the lowest form of conversation.",
      author: "Tony Soprano (The Sopranos)",
      category: "Perspective & Kindness",
      favorite: false
    },
    {
      id: 56,
      quote: "Truth without kindness is brutality. Kindness without truth is manipulation.",
      author: "Warren Wiersbe",
      category: "Perspective & Kindness",
      favorite: true
    },
    {
      id: 57,
      quote: "A society full of sinners judging other sinners for sinning differently.",
      author: "Popular Wisdom",
      category: "Perspective & Kindness",
      favorite: true
    },
    {
      id: 58,
      quote: "I don't have to agree with you to like you.",
      author: "Popular Aphorism",
      category: "Perspective & Kindness",
      favorite: false
    },
    {
      id: 59,
      quote: "Who am I to judge another, when I walk as an imperfect man?",
      author: "Traditional Aphorism",
      category: "Perspective & Kindness",
      favorite: false
    },
    {
      id: 60,
      quote: "Refuse to be offended. When people are mean, they are revealing what's within themselves, not within you.",
      author: "Marcus Aurelius",
      category: "Perspective & Kindness",
      favorite: true
    },
    {
      id: 61,
      quote: "Everything said at funerals should be said at birthdays.",
      author: "Popular Wisdom",
      category: "Perspective & Kindness",
      favorite: true
    },
    {
      id: 62,
      quote: "Don't judge someone's choices when you don't know what their options were.",
      author: "Popular Wisdom",
      category: "Perspective & Kindness",
      favorite: false
    },
    {
      id: 63,
      quote: "You don't meet the people you love; you recognize them.",
      author: "Popular Aphorism",
      category: "Perspective & Kindness",
      favorite: false
    },
    {
      id: 64,
      quote: "Hard work doesn't entitle you to achievement. Millions of immigrants work tirelessly just to get by. Hard work is a privilege.",
      author: "Conventional Wisdom",
      category: "Perspective & Kindness",
      favorite: true
    },
    {
      id: 65,
      quote: "I've always liked quiet people. You never know if they're dancing in a daydream or carrying the weight of the world.",
      author: "John Green",
      category: "Perspective & Kindness",
      favorite: true
    },
    {
      id: 66,
      quote: "Speak to people in a way that if they died tomorrow, you'd be at peace with the last words you said to them.",
      author: "Popular Wisdom",
      category: "Perspective & Kindness",
      favorite: true
    },

    // ── Wisdom & Wonder ──
    {
      id: 67,
      quote: "The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.",
      author: "Marcel Proust",
      category: "Wisdom & Wonder",
      favorite: true
    },
    {
      id: 68,
      quote: "The light we wake up to in the morning has traveled 93 million miles just to touch our skin.",
      author: "Nature Reflection",
      category: "Wisdom & Wonder",
      favorite: true
    },
    {
      id: 69,
      quote: "No man ever steps in the same river twice, for it's not the same river and he is not the same man.",
      author: "Heraclitus",
      category: "Wisdom & Wonder",
      favorite: true
    },
    {
      id: 70,
      quote: "It is not the man who has too little, but the man who craves more, who is poor.",
      author: "Seneca",
      category: "Wisdom & Wonder",
      favorite: false
    },
    {
      id: 71,
      quote: "Pretend you died and asked Buddha to send you back to Earth just to feel rain, see mountains, and love your friends again. Never forget the miracle of being here.",
      author: "Buddhist Reflection",
      category: "Wisdom & Wonder",
      favorite: true
    },
    {
      id: 72,
      quote: "When you walk into the room, bring your people with you: your parents, grandparents, and ancestors who loved you into being. You'll be unstoppable.",
      author: "Maya Angelou",
      category: "Wisdom & Wonder",
      favorite: true
    },
    {
      id: 73,
      quote: "I want to live simply: read books I'll never be tested on, paint because I want to, and not be governed by artificial constraints. Boundless & infinite.",
      author: "Cozy Living Reflection",
      category: "Wisdom & Wonder",
      favorite: true
    },
    {
      id: 74,
      quote: "Fall semester energy: summer tan, crisp weather, autumn leaves, red cups, hoodies, Thanksgiving, and holiday magic.",
      author: "Conventional Wisdom",
      category: "Wisdom & Wonder",
      favorite: false
    }
  ],
  recommendations: [
    {
      category: "Canonical Readings",
      items: [
        {
          title: "Animal Farm",
          author: "George Orwell",
          note: "A timeless allegorical novella on power, corruption, propaganda, and human nature.",
          url: "https://www.goodreads.com/book/show/170448.Animal_Farm"
        },
        {
          title: "Life is Short",
          author: "Paul Graham",
          note: "A profound reflection on time, priorities, and eliminating bullshit to focus on what truly matters.",
          url: "https://paulgraham.com/vb.html"
        },
        {
          title: "How to Do Great Work",
          author: "Paul Graham",
          note: "The definitive guide on curiosity, persistence, finding natural inclination, and doing work that lasts.",
          url: "https://paulgraham.com/greatwork.html"
        },
        {
          title: "Having Kids",
          author: "Paul Graham",
          note: "Reflections on trade-offs, perspective shifts, and the depth of love and meaning that comes with parenthood.",
          url: "https://paulgraham.com/kids.html"
        },
        {
          title: "The Inner Game of Tennis",
          author: "W. Timothy Gallwey",
          note: "The classic guide to overcoming self-doubt, non-judgmental awareness, and achieving peak performance state (Self 1 vs Self 2).",
          url: "https://www.goodreads.com/book/show/905.The_Inner_Game_of_Tennis"
        },
        {
          title: "My Investment Philosophy",
          author: "The Science of Hitting",
          note: "A grounded breakdown of long term thinking, business fundamentals, and staying rational when markets get noisy. It articulates the discipline needed to hold great assets through market cycles.",
          url: "https://thescienceofhitting.com/p/my-investment-philosophy"
        },
        {
          title: "A Long Walk to Water",
          author: "Linda Sue Park",
          note: "A moving story based on true events about resilience, hope, and human endurance in Sudan. It puts everyday comforts in perspective and shows how small acts of perseverance change lives.",
          url: "https://www.goodreads.com/book/show/7988018-a-long-walk-to-water"
        },
        {
          title: "The Monsters Are Due on Maple Street",
          spineTitle: "Monsters on Maple St.",
          author: "Rod Serling",
          note: "A brilliant Twilight Zone teleplay showing how fast fear and suspicion can tear a normal neighborhood apart. It captures how human paranoia is often a bigger threat than any external monster.",
          url: "https://www.goodreads.com/book/show/12470719-the-monsters-are-due-on-maple-street"
        }
      ]
    }
  ],
  music: [
    {
      rank: "#1",
      badge: "Heavy Rotation",
      title: "SUMMER",
      artist: "BROCKHAMPTON",
      album: "SATURATION III",
      genre: "Alt R&B / Indie Pop",
      note: "Bearface's soulful electric guitar ballad and soaring falsetto. The quintessential golden-hour summer track."
    },
    {
      rank: "#2",
      badge: "On Repeat",
      title: "Everything Hallelujah",
      artist: "Justin Bieber",
      album: "Freedom. / Acoustic",
      genre: "Soulful R&B / Acoustic",
      note: "Raw vocal performance with warm piano chords and gospel undertones. Perfect for quiet, reflective late nights."
    },
    {
      rank: "#3",
      badge: "Daily Vibe",
      title: "TEXAS",
      artist: "keshi",
      album: "GABRIEL",
      genre: "Alt Pop / Lofi R&B",
      note: "Mellow acoustic guitar, smooth lo-fi beats, and nostalgic vocals. Effortlessly cozy atmosphere."
    },
    {
      badge: "Favorite Album",
      title: "Blonde",
      artist: "Frank Ocean",
      album: "Boys Don't Cry",
      genre: "Avant-Garde R&B",
      note: "A timeless masterpiece of minimalism, storytelling, and lush production."
    },
    {
      badge: "Focus Soundtrack",
      title: "Lofi Beats & Chill Harmonies",
      artist: "Various Artists",
      album: "Cozy Study Sessions",
      genre: "Lofi Instrumental",
      note: "Subtle vinyl crackle and chill piano chords for deep work and coding flows."
    }
  ]
};
