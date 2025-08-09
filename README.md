# CineCorner 🎬

*Watch. Share. Review. Create.*

A Social Platform for Film Lovers and Filmmakers, focusing on short films and student films.

## 🎯 Mission

Foster honest, supportive, and growth-oriented feedback for filmmakers — no matter their budget, background, or stage.

## 🚀 Features

### For Filmmakers
- Upload and showcase short films, video essays, and behind-the-scenes content
- Receive guided, constructive feedback with timestamped comments
- Create private feedback rooms for work-in-progress reviews
- Build a portfolio with cast & crew connections
- Track film improvements across revisions

### For Viewers
- Discover and track films with personalized journals
- Create custom lists and collections
- Follow filmmakers and other film lovers
- Give detailed, structured feedback
- Build reputation as a trusted reviewer

### Safe Space Features
- Guided feedback prompts instead of blank comment boxes
- Privacy controls for creators (open to feedback, reactions only, etc.)
- Community moderation with feedback ethics
- Anonymous feedback options
- Support-only mode for vulnerable early cuts

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Clerk
- **File Upload**: UploadThing
- **Video Player**: React Player

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```

4. Start the Dockerized database (recommended):
   ```bash
   npm run db:up
   ```

5. Set up the database schema:
   ```bash
   npm run db:push
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📝 Environment Variables

Create a `.env.local` file with:

```
# Database (Docker default)
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/cinecorner?schema=public"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# UploadThing
UPLOADTHING_SECRET=
UPLOADTHING_APP_ID=
```

## 🐳 Dockerized Database

Quick commands:

```bash
# start database
npm run db:up

# view logs
npm run db:logs

# stop and remove container/volume
npm run db:down
```

The compose file provisions Postgres 16 with a persistent volume `postgres-data`. Default credentials: `postgres:postgres`. The default database is `cinecorner`.

## 🎨 Design Philosophy

- **Human-centric**: Real people curating and discovering content
- **Feedback-focused**: Tools designed for constructive criticism
- **Community-driven**: Reward generosity, not just popularity
- **Emotionally safe**: Protect creators' confidence and energy
- **Creator-friendly**: Build identity beyond just content uploads

## 📚 Core Concepts

### Feedback Culture
- Guided prompts for specific, actionable feedback
- Creator intent notes to provide context
- Private and timestamped feedback options
- Credit system for valuable reviewers

### Social Discovery
- Human-curated lists and collections
- "This reminded me of..." connections
- Film DNA/mood tagging system
- Festival-inspired discovery

### Creator Tools
- Behind-the-scenes content sharing
- Cast & crew networking
- Production journals and process documentation
- Collaboration features and remix capabilities

## 🤝 Contributing

This is a passion project for the filmmaking community. Contributions are welcome!

## 📄 License

MIT License - see LICENSE file for details.