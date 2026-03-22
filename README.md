# Travel Jems

Your Travel Jems website. Built with Decap CMS + Netlify.

## Setup Instructions

1. Push this folder to a GitHub repo
2. Connect the repo to Netlify
3. Enable Netlify Identity in your Netlify dashboard
4. Enable Git Gateway under Identity → Services
5. Go to yoursite.com/admin and create your account
6. Start adding content!

## Adding Content

- **Blog posts** → /admin → Blog Posts → New Post
- **Photos** → /admin → Gallery → Add photos
- **Settings** → /admin → Site Settings (hero video, social handles, etc.)
- **Destinations** → /admin → Destinations

## Folder Structure

```
traveljems/
├── index.html          ← Main site
├── post.html           ← Individual blog post page
├── admin/
│   ├── index.html      ← CMS login page
│   └── config.yml      ← CMS configuration
├── _posts/             ← Your blog posts (markdown)
├── _data/              ← Generated data files
├── images/uploads/     ← Your uploaded images
├── scripts/build.js    ← Build script (runs automatically)
└── netlify.toml        ← Netlify settings
```

