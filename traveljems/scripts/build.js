const fs   = require('fs');
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');

const POSTS_DIR  = path.join(__dirname, '../_posts');
const DATA_DIR   = path.join(__dirname, '../_data');
const SETTINGS   = path.join(__dirname, '../_data/settings.json');

// Ensure _data directory exists
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

// ── Build posts ──────────────────────────────────────────────────
const posts = [];

if (fs.existsSync(POSTS_DIR)) {
  const files = fs.readdirSync(POSTS_DIR)
    .filter(f => f.endsWith('.md'))
    .sort()
    .reverse(); // newest first

  for (const file of files) {
    const raw     = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    const { data, content } = matter(raw);
    const slug    = file.replace(/\.md$/, '');
    const html    = marked(content);

    posts.push({
      slug,
      title:    data.title    || 'Untitled',
      date:     data.date     || new Date().toISOString(),
      region:   data.region   || 'Travel',
      image:    data.image    || '',
      excerpt:  data.excerpt  || content.slice(0, 160).replace(/[#*]/g, '') + '...',
      featured: data.featured || false,
      body:     html,
    });
  }
}

fs.writeFileSync(
  path.join(DATA_DIR, 'posts.json'),
  JSON.stringify({ posts }, null, 2)
);

console.log(`✦ Built ${posts.length} posts → _data/posts.json`);

// ── Ensure settings.json exists ──────────────────────────────────
if (!fs.existsSync(SETTINGS)) {
  const defaults = {
    countries:   "35+",
    heroVideo:   "",
    instagram:   "@traveljems",
    tiktok:      "@traveljems",
    pinterest:   "@traveljems",
    youtube:     "",
    email:       "hello@traveljems.co.uk",
    heroTitle:   "Every jewel has a story.",
    heroSlogan:  "Exploring the world, sharing its jewels.",
    aboutText1:  "I'm a travel blogger, UGC travel creator, and corporate professional navigating the world one trip at a time.",
    aboutText2:  "Since my first big girl trip to Thailand in 2017, I've travelled to over 35 countries — and counting.",
  };
  fs.writeFileSync(SETTINGS, JSON.stringify(defaults, null, 2));
  console.log('✦ Created default settings.json');
}

console.log('✦ Build complete!');
