export const SITE_CONTENT = {
  hero: {
    greeting: "Hey there, I'm",
    name: "Dan Truong",
    role: "Technical Product Manager 2, Xbox @ Microsoft",
    subrole: "UC Berkeley '24 · Econ + Data Science & Public Policy",
    location: "San Francisco, CA",
    photo: "images/sf-header.jpg",
    bio: "I'm a product builder fascinated by how economics and technology intersect to shape human behavior. On the Xbox team at Microsoft, I turn complex system incentives and data insights into delightful consumer experiences that millions of players genuinely love.",
    quote: "The cold water does not get warmer if you jump late.",
    quoteAttr: "— one of many favorites"
  },
  about: {
    title: "About Me",
    subtitle: "Product builder, economist, music lover, and lifelong learner.",
    paragraphs: [
      "Hi, I'm Dan! I'm a Technical Product Manager 2 on the Xbox team at Microsoft and a 2024 UC Berkeley graduate with degrees in Economics and Data Science & Public Policy.",
      "My work lives where system incentives, data insights, and human-centered design collide—turning knotty economic and technical challenges into intuitive products that millions of players enjoy globally.",
      "Beyond product building, I love writing op-eds on economic policy and technology, building personal web tools, digging through indie/lofi/R&B music, and reading Paul Graham essays."
    ],
    highlights: [
      { label: "Role", value: "Technical PM 2, Xbox @ Microsoft" },
      { label: "Education", value: "UC Berkeley '24 (Econ + Data Science)" },
      { label: "Location", value: "San Francisco / Bay Area, CA" },
      { label: "Focus", value: "Consumer Products, Gaming Systems & Data Economics" }
    ]
  },
  projects: [
    {
      id: "personal-website",
      tag: "Web & Design",
      title: "Cozy Lofi Personal Sanctuary",
      description: "A hand-crafted digital sanctuary built with React, Vite, Framer Motion, and Tailwind CSS. Features tactile artsy aesthetics, lofi audio controls, 3D tilt cards, and curated essays.",
      tech: ["React", "Vite", "Framer Motion", "Tailwind CSS", "shadcn/ui"],
      url: "https://github.com/dantruong1",
      featured: true
    },
    {
      id: "xbox-player-insights",
      tag: "Product & Data",
      title: "Xbox System Incentives & Economy",
      description: "Data-driven product initiatives on the Xbox team analyzing player behavior, incentive alignment, and engagement economics for gaming platforms.",
      tech: ["Data Science", "Economics", "A/B Experimentation", "Product Strategy"],
      featured: true
    },
    {
      id: "econ-policy-analysis",
      tag: "Research & Writing",
      title: "Asian American Economic Disparity Study",
      description: "Published op-ed and empirical inquiry examining wealth inequality, intra-group disparity, and public policy implications across Asian American communities.",
      tech: ["Data Analytics", "Econometrics", "Policy Analysis"],
      featured: false
    }
  ],
  writings: [
    {
      id: "econ-disparity",
      date: "Dec 2022",
      tag: "Op-Ed · Daily Cal",
      title: "A Look Into Economic Disparity Among Asian Americans",
      excerpt: "An op-ed written during college for The Daily Californian examining economic disparity, wealth inequality, and systemic factors across Asian American communities.",
      url: "https://dailycal.org/2022/12/07/a-look-into-economic-disparity-among-asian-americans"
    },
    {
      id: "tech-economics",
      date: "Jul 2026",
      tag: "Essay · Tech & Society",
      title: "Incentive Alignment in Modern Digital Ecosystems",
      excerpt: "Reflections on how platforms shape human decision-making, choice architecture, and market design in consumer software.",
      url: "#"
    },
    {
      id: "berkeley-reflections",
      date: "May 2024",
      tag: "Personal Reflection",
      title: "Lessons From Four Years at UC Berkeley",
      excerpt: "Thoughts on navigating economics, data science, public policy, and building enduring friendships in Berkeley.",
      url: "#"
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
