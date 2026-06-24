# AutomateBarrie - Landing Page

Premium, mobile-responsive landing page for a web automation and SaaS agency based in Barrie, Ontario.

## Tech Stack

- **HTML5** - Semantic markup
- **Tailwind CSS** - Utility-first styling via CDN
- **Vanilla JavaScript** - No framework dependencies
- **Web3Forms** - Contact form handling

## Features

- Dark-themed, modern tech aesthetic
- Fully mobile-responsive design
- Animated hero section with floating elements
- Services section (Web Design, Custom SaaS, Workflow Automation)
- Transparent pricing section ($1,000 setup + $100/mo)
- Case studies/prototypes showcase
- Working contact form via Web3Forms
- Intersection Observer scroll animations
- Parallax mouse-tracking effects
- Accessible (reduced motion support, focus states)
- SEO-optimized meta tags

## Deployment to Netlify

### Option 1: Drag & Drop
1. Go to [app.netlify.com](https://app.netlify.com)
2. Drag the entire project folder onto the deploy area
3. Your site will be live in seconds

### Option 2: Git-Based Deploy
1. Push this folder to a GitHub/GitLab repository
2. Connect the repo in Netlify dashboard
3. Set publish directory to `.` (root)
4. Deploy

## Setup: Web3Forms Contact Form

1. Go to [web3forms.com](https://web3forms.com)
2. Enter your email to get a free Access Key
3. Replace `YOUR_WEB3FORMS_ACCESS_KEY` in `index.html` (line in the contact form section) with your actual key
4. Form submissions will be emailed to you directly

## File Structure

```
agency-landing-page/
├── index.html          # Main landing page
├── styles.css          # Custom CSS (grid bg, scrollbar, animations)
├── script.js           # Interactive JS (nav, form, animations)
├── netlify.toml        # Netlify deployment config & headers
└── README.md           # This file
```

## Customization

- **Colors**: Edit the Tailwind config in `<script>` tag inside `index.html`
- **Content**: Update text directly in `index.html`
- **Contact Info**: Update email/location in the contact section
- **Social Links**: Update footer social media URLs

## Performance

- No build step required
- Tailwind loaded via CDN (cached globally)
- Minimal custom CSS
- Lazy-loaded animations via Intersection Observer
- Optimized for Core Web Vitals
