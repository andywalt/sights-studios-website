# Sights Studios Website

Marketing website for [Sights Studios](https://sightsstudios.com) — a consulting firm specializing in business process optimization, CRM strategy, holistic integrations, personnel development, and AI app rescue.

## Tech Stack

- React 18 / Create React App
- React Router v6
- GSAP (animations)
- FontAwesome
- Hosted on AWS S3 + CloudFront

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, AI Rescue banner, feature cards, client carousel, contact |
| `/ai-rescue` | AI App Rescue service — fix broken AI-generated apps |
| `/services` | All services overview |
| `/about` | About Andy Walters and Sights Studios |
| `/portfolio` | Client case studies |
| `/contact` | Contact form |

## Local Development

```bash
bun install
bun run start
```

Open [http://localhost:3000](http://localhost:3000).

## Deployment

Pushes to `master` automatically build and deploy via GitHub Actions:

1. Builds with `bun run build`
2. Syncs `build/` to `s3://sightsstudios.com`
3. Invalidates the CloudFront distribution

No manual deploy steps needed.
