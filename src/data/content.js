export const SITE_CONTENT = {
  hero: {
    greeting: "Hey there, I'm",
    name: "Dan Truong",
    role: "Technical Product Manager 2, Xbox @ Microsoft",
    subrole: "UC Berkeley '24 · Econ Major, Data Science & Public Policy Minors · Bay Area Native",
    location: "San Francisco, CA",
    photo: "images/sf-header.jpg",
    bio: "I'm a curious product builder who thrives at the intersection of economics, value creation, technology, and delightful experiences for users and customers. Born and raised in San Jose (Bay Area) and a 2024 UC Berkeley graduate (Econ major, Data Science & Public Policy minors), I turn complex system incentives into consumer products people love on the Xbox team at Microsoft.",
    quote: "The cold water does not get warmer if you jump late.",
    quoteAttr: "— one of many favorites"
  },
  about: {
    title: "About Me",
    subtitle: "Curious product builder thriving at the intersection of economics, value creation, technology, & human delight.",
    paragraphs: [
      "Hi, I'm Dan! Born and raised in San Jose, California (Bay Area native), I'm a Technical Product Manager 2 on the Xbox team at Microsoft. I graduated from UC Berkeley in 2024 with a degree in Economics alongside minors in Data Science and Public Policy.",
      "At my core, I'm a curious product builder who thrives at the intersection of economics, value creation, technology, and user delight. I love diving into complex system incentives, market dynamics, and customer insights to turn knotty challenges into intuitive, high-value consumer experiences.",
      "Beyond building product at Microsoft, you can find me exploring local coffee spots and bakeries around San Francisco, writing op-eds on technology and economic policy, building side projects, and reading Paul Graham essays over warm lofi beats."
    ],
    highlights: [
      { label: "Role", value: "Technical PM 2, Xbox @ Microsoft" },
      { label: "Education", value: "UC Berkeley '24 (Econ Major, Data Science & Public Policy Minors)" },
      { label: "Roots & Location", value: "San Jose (Roots) · San Francisco, CA" },
      { label: "Focus", value: "Value Creation, Data Economics & Consumer Experiences" }
    ]
  },
  projects: [
    {
      id: "metabolic-app",
      tag: "Consumer Health App",
      title: "Metabolic App — Grocery Health & Nutrition",
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
      title: "Gates Foundation Social Impact Competition",
      description: "Won 1st place in college by pitching a localized digital volunteer platform designed to increase charitable revenues and volunteer engagement for non-profit organizations.",
      tech: ["Nonprofit Tech", "Social Impact", "Public Policy", "GTM Strategy"],
      featured: false
    },
    {
      id: "haas-case-competition",
      tag: "1st Place · UC Berkeley Haas",
      title: "Haas School of Business GTM Competition",
      description: "Won 1st place at UC Berkeley Haas Business School by developing and pitching a comprehensive marketing and Go-To-Market (GTM) growth campaign for a local coffee business.",
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
      title: "Dan's Substack — Essays & Reflections",
      excerpt: "Long-form essays, product reflections, and thoughts on economics, technology, personal growth, and culture published regularly on Substack.",
      url: "https://substack.com/@dantruong12/p-204045676"
    }
  ],
  quotes: [
    {
      id: 1,
      quote: "The cold water does not get warmer if you jump late.",
      author: "Unknown / Wise Saying",
      category: "Action & Courage",
      favorite: true
    },
    {
      id: 2,
      quote: "If you want to build a ship, don't drum up the men to gather wood, divide the work, and give orders. Instead, teach them to yearn for the vast and endless sea.",
      author: "Antoine de Saint-Exupéry",
      category: "Leadership & Inspiration",
      favorite: true
    },
    {
      id: 3,
      quote: "You get points for predicting rain, but you get prizes for building arks.",
      author: "Lou Gerstner",
      category: "Execution",
      favorite: true
    },
    {
      id: 4,
      quote: "The best way to predict the future is to invent it.",
      author: "Alan Kay",
      category: "Technology",
      favorite: false
    },
    {
      id: 5,
      quote: "Simplicity is about subtracting the obvious and adding the meaningful.",
      author: "John Maeda",
      category: "Design",
      favorite: true
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
