/*
 * SITE CONTENT DATA
 * ==================
 * Edit this file to update your website content.
 * No HTML knowledge needed — just change the text values.
 *
 * For photos: drop images into the images/ folder and
 * set the path here (e.g. "images/profile/photo.jpg").
 *
 * For Substack: paste your article URL in the "url" field
 * under writings. The card will link to your Substack post.
 */

const SITE_CONTENT = {

  hero: {
    greeting: "Welcome",
    name: "Dan Truong",
    tagline: "Builder, thinker, music lover. Exploring ideas across code, sound, and the written word.",
    photo: ""  // e.g. "images/profile/dan.jpg"
  },

  about: {
    photo: "",  // e.g. "images/profile/about.jpg"
    paragraphs: [
      "<span class='about__highlight'>Hi, I'm Dan.</span> I'm passionate about building things that live at the intersection of technology and creativity. Whether it's writing code, exploring music, or putting thoughts into words, I believe in the power of making things with intention and care.",
      "When I'm not at a keyboard, you'll probably find me diving into a book, discovering new music, or thinking about ideas worth sharing. This site is a small window into the things I care about."
    ]
  },

  projects: [
    {
      tag: "Web",
      title: "Personal Website",
      description: "This very site — a hand-crafted space to share my projects, thoughts, and recommendations with the world.",
      tech: ["HTML", "CSS", "JavaScript"],
      image: "",  // e.g. "images/projects/website.png"
      url: ""     // e.g. "https://github.com/you/repo"
    },
    {
      tag: "Coming Soon",
      title: "Project Two",
      description: "More projects on the way. Stay tuned for updates as I continue building and shipping.",
      tech: ["TBD"],
      image: "",
      url: ""
    }
  ],

  music: [
    {
      title: "Favorite Album",
      artist: "Your favorite artist",
      genre: "Genre",
      emoji: "🎸",
      image: ""  // e.g. "images/music/album-cover.jpg" (replaces emoji)
    },
    {
      title: "Currently Playing",
      artist: "What's on repeat",
      genre: "Genre",
      emoji: "🎹",
      image: ""
    },
    {
      title: "Discovery Playlist",
      artist: "Fresh finds & deep cuts",
      genre: "Mixed",
      emoji: "🎧",
      image: ""
    }
  ],

  quotes: [
    {
      text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
      author: "Will Durant",
      source: "summarizing Aristotle"
    },
    {
      text: "The best time to plant a tree was 20 years ago. The second best time is now.",
      author: "Chinese Proverb",
      source: ""
    },
    {
      text: "Simplicity is the ultimate sophistication.",
      author: "Leonardo da Vinci",
      source: ""
    }
  ],

  writings: [
    {
      date: "Jul 2026",
      title: "On Building in Public",
      excerpt: "Reflections on why sharing your process openly leads to better work and deeper connections.",
      url: ""  // e.g. "https://yourname.substack.com/p/on-building-in-public"
    },
    {
      date: "Jun 2026",
      title: "The Art of Starting Small",
      excerpt: "How beginning with the smallest possible version of an idea can lead to the biggest breakthroughs.",
      url: ""
    },
    {
      date: "May 2026",
      title: "Music & Focus",
      excerpt: "Exploring the relationship between the right soundtrack and deep, creative work.",
      url: ""
    }
  ],

  recommendations: [
    {
      category: "book",
      title: "Atomic Habits",
      description: "James Clear's practical guide to building good habits and breaking bad ones. Changed the way I think about consistency.",
      image: "",  // e.g. "images/recommendations/atomic-habits.jpg"
      url: ""     // e.g. "https://jamesclear.com/atomic-habits"
    },
    {
      category: "tool",
      title: "Obsidian",
      description: "A powerful knowledge base that works on local Markdown files. Perfect for building a second brain.",
      image: "",
      url: ""
    },
    {
      category: "podcast",
      title: "Lex Fridman Podcast",
      description: "Long-form conversations with brilliant minds on science, technology, philosophy, and the human condition.",
      image: "",
      url: ""
    }
  ]

};
