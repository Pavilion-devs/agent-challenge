## Tabsy, AI Workspace

**Demo Video:**

[![Watch Tabsy Demo](https://img.youtube.com/vi/78RntRVaPAk/maxresdefault.jpg)](https://youtu.be/78RntRVaPAk)

**What is Tabsy?** A production-ready AI workspace that integrates your calendar, email, and tasks into a single dashboard, with an AI agent that summarizes your day, suggests optimizations, drafts replies, and can reschedule events. Live sync updates the UI as changes happen.

### 🎯 Key Capabilities

- **Unified Dashboard:** Calendar, unread emails, and tasks in one place with tabbed interface
- **AI Daily Summary:** Analyzes calendar, emails, and tasks to provide actionable insights
- **Smart Email Management:** Priority detection, draft assistance, and intelligent filtering
- **Calendar Optimization:** Free slot detection, meeting clustering, and schedule suggestions
- **Task Prioritization:** AI-powered task ranking based on deadlines and importance
- **Real-time Sync:** Intelligent caching with 15-minute calendar TTL and 5-minute email TTL
- **MCP Tools:** Calendar, email, and task tools power real AI actions via Mastra framework
- **Streaming AI Responses:** Interactive chat with CopilotKit integration

### 🏗️ Tech Stack

**Frontend:**
- Next.js 15 with App Router & React 19
- TypeScript for type safety
- Tailwind CSS + Radix UI components
- CopilotKit for AI chat interface
- Lucide React icons

**Backend & AI:**
- Mastra 0.13.4+ for AI agent orchestration
- OpenAI GPT-4o-mini for agent reasoning
- Model Context Protocol (MCP) for tool management
- Ollama support for local LLM alternatives

**Database:**
- Prisma ORM with SQLite
- LibSQL for Mastra agent state
- Comprehensive schema for users, tasks, events, emails, and chat history

**External APIs:**
- Google Calendar API for event management
- Gmail API for email operations
- Google OAuth 2.0 for authentication

**DevOps:**
- Docker containerization
- Turbopack for fast development
- Concurrent process management

### 🗄️ Database Schema

The application uses SQLite with Prisma ORM. Key models include:

- **User** - Application users with Google OAuth tokens
- **Task** - User tasks with status, priority, and due dates
- **CalendarEvent** - Google Calendar events with sync metadata
- **Email** - Gmail messages with priority analysis
- **ChatConversation/ChatMessage** - AI chat history
- **SyncMetadata** - Tracks sync status for external services

Schema location: `prisma/schema.prisma`

### 📁 Project Structure

```
src/
├── app/                      # Next.js app directory
│   ├── api/                  # API routes
│   │   ├── auth/             # OAuth endpoints
│   │   ├── agent/            # Agent endpoints (daily-summary, chat)
│   │   ├── calendar/         # Calendar CRUD operations
│   │   ├── emails/           # Email operations
│   │   └── tasks/            # Task management
│   ├── dashboard/            # Main dashboard page
│   ├── calendar/             # Calendar interface
│   ├── emails/               # Email interface
│   ├── tasks/                # Task management (Kanban board)
│   ├── analytics/            # Analytics dashboard
│   └── settings/             # User settings
│
├── components/               # React components
│   ├── ui/                   # Radix UI wrappers
│   ├── app-layout.tsx        # Main layout wrapper
│   ├── ai-chat-panel.tsx     # AI chat interface
│   └── kanban/               # Kanban board for tasks
│
├── mastra/                   # AI agent configuration
│   ├── agents/               # Agent definitions (workspace agent)
│   ├── tools/                # Tool implementations (calendar, email, task)
│   ├── services/             # Business logic with caching
│   ├── auth/                 # Google OAuth implementation
│   ├── db/                   # Prisma client
│   └── mcp/                  # Model Context Protocol setup
│
├── lib/                      # Utility functions
└── hooks/                    # React hooks
```

### 🔧 Available Scripts

```bash
# Development
pnpm run dev:ui              # Start UI server (port 3000)
pnpm run dev:agent           # Start Mastra agent server (port 4111)
pnpm run dev:debug           # Start with debug logging

# Production
pnpm run build               # Build both agent and UI
pnpm run start               # Start production servers

# Code Quality
pnpm run lint                # Run ESLint
```

> Note: Due to OAuth limitations for Gmail/Calendar scopes, the public live link cannot allow external testers. Please clone and run locally with your own OAuth credentials and refresh token as documented below.

# Builders' Challenge #3: AI Agents 102
**Presented by Nosana and Mastra**

![Agent](./assets/NosanaBuildersChallenge03.jpg)

## Welcome to the AI Agent Challenge

Build and deploy intelligent AI agents using the **Mastra framework** on the **Nosana decentralized compute network**. Whether you're a beginner or an experienced developer, this challenge has something for everyone!

## 🎯 Challenge Overview

**Your Mission:** Build an intelligent AI agent with a frontend interface and deploy it on Nosana's decentralized network.

### What You'll Build

Create an AI agent that performs real-world tasks using:
- **Mastra framework** for agent orchestration
- **Tool calling** to interact with external services
- **MCP (Model Context Protocol)** for enhanced capabilities
- **Custom frontend** to showcase your agent's functionality

### Agent Ideas & Examples

The possibilities are endless! Here are some ideas to get you started:

- 🤖 **Personal Assistant** - Schedule management, email drafting, task automation
- 📊 **Data Analyst Agent** - Fetch financial data, generate insights, create visualizations
- 🌐 **Web Researcher** - Aggregate information from multiple sources, summarize findings
- 🛠️ **DevOps Helper** - Monitor services, automate deployments, manage infrastructure
- 🎨 **Content Creator** - Generate social media posts, blog outlines, marketing copy
- 🔍 **Smart Search** - Multi-source search with AI-powered result synthesis
- 💬 **Customer Support Bot** - Answer FAQs, ticket routing, knowledge base queries

**Be Creative!** The best agents solve real problems in innovative ways.

## Getting Started Template

This is a starter template for building AI agents using [Mastra](https://mastra.ai) and [CopilotKit](https://copilotkit.ai). It provides a modern Next.js application with integrated AI capabilities and a beautiful UI.

## Getting Started

### Important: Live Link Access

For security and OAuth policy reasons, the public live link cannot grant access to third-party testers. To run and evaluate this project, please clone the repository and configure your own `.env` with your Google OAuth credentials and refresh token. A step-by-step guide is below.

### Prerequisites & Registration

To participate in the challenge and get Nosana credits/NOS tokens, complete these steps:

1. Register at [SuperTeam](https://earn.superteam.fun/listing/nosana-builders-challenge-agents-102)
2. Register at the [Luma Page](https://luma.com/zkob1iae)
3. Star these repos:
   - [this repo](https://github.com/nosana-ci/agent-challenge)
   - [Nosana CLI](https://github.com/nosana-ci/nosana-cli)
   - [Nosana SDK](https://github.com/nosana-ci/nosana-sdk)
4. Complete [this registration form](https://e86f0b9c.sibforms.com/serve/MUIFALaEjtsXB60SDmm1_DHdt9TOSRCFHOZUSvwK0ANbZDeJH-sBZry2_0YTNi1OjPt_ZNiwr4gGC1DPTji2zdKGJos1QEyVGBzTq_oLalKkeHx3tq2tQtzghyIhYoF4_sFmej1YL1WtnFQyH0y1epowKmDFpDz_EdGKH2cYKTleuTu97viowkIIMqoDgMqTD0uBaZNGwjjsM07T)

### Setup Your Development Environment

#### **Step 1: Fork, Clone and Quickstart**

```bash
# Fork this repo on GitHub, then clone your fork
git clone https://github.com/YOUR-USERNAME/agent-challenge

cd agent-challenge

cp nosana.env.example .env

# Install dependencies
pnpm i

# Setup database
npx prisma generate          # Generate Prisma client
npx prisma db push           # Create database schema

# Start development servers (run in separate terminals)
pnpm run dev:ui              # Start UI server (port 3000)
pnpm run dev:agent           # Start Mastra agent server (port 4111)
```

Open <http://localhost:3000> to see your agent in action in the frontend.
Open <http://localhost:4111> to open up the Mastra Agent Playground.

**What happens during setup:**
- Dependencies are installed via pnpm
- SQLite database is created at `prisma/data/prod.db`
- Prisma client is generated with type-safe database access
- Database schema is pushed (7 tables: User, Task, CalendarEvent, Email, ChatConversation, ChatMessage, SyncMetadata)

#### **Step 2: Choose Your LLM for Development (Optional)**

Pick one option below to power your agent during development:

##### Option A: Use Shared Nosana LLM Endpoint (Recommended - No Setup!)

We provide a free LLM endpoint hosted on Nosana for development. Edit your `.env`:

```env
# Qwen3:8b - Nosana Endpoint
# Note baseURL for Ollama needs to be appended with `/api`
OLLAMA_API_URL=https://3yt39qx97wc9hqwwmylrphi4jsxrngjzxnjakkybnxbw.node.k8s.prd.nos.ci/api
MODEL_NAME_AT_ENDPOINT=qwen3:8b
```

If it goes down, reach out on [Discord](https://discord.com/channels/236263424676331521/1354391113028337664)

##### Option B: Use Local LLM

Run Ollama locally (requires [Ollama installed](https://ollama.com/download)):

```bash
ollama pull qwen3:0.6b
ollama serve
```

Edit your `.env`:
```env
OLLAMA_API_URL=http://127.0.0.1:11434/api
MODEL_NAME_AT_ENDPOINT=qwen3:0.6b
```

##### Option C: Use OpenAI

Add to your `.env` and uncomment the OpenAI line in `src/mastra/agents/index.ts`:

```env
OPENAI_API_KEY=your-key-here
```

#### **Step 3: Configure Google OAuth (Required for Calendar/Email)**

1. Create a Google Cloud Project → APIs & Services → Credentials → Create OAuth Client ID:
   - Application type: Web application
   - Authorized redirect URI (local dev): `http://localhost:3000/api/auth/google/callback`
2. Enable APIs:
   - Google Calendar API
   - Gmail API
3. Put values into `.env` (copied from `nosana.env.example`):
   - `GOOGLE_CLIENT_ID=...`
   - `GOOGLE_CLIENT_SECRET=...`
   - `GOOGLE_REDIRECT_URI=http://localhost:3000/api/auth/google/callback`
4. Obtain a Google Refresh Token (local one-time setup):
   - Start the app: `pnpm run dev:ui`
   - Open `http://localhost:3000/` and click “Sign in with Google”
   - After consenting, capture the refresh token printed in server logs OR wire it via your OAuth callback handler
   - Set `GOOGLE_REFRESH_TOKEN=...` in `.env`
5. Restart the app. The backend will use your refresh token to make Calendar/Gmail calls without requiring every tester to authenticate.

Notes:
- If your OAuth app is in "Testing" mode, only tester emails you add can log in.
- Publishing an External app with sensitive scopes (Gmail/Calendar) typically requires verification, which is not feasible for quick judging; that's why local setup is required.

#### **Step 4: Environment Variables Reference**

Here's a complete reference of all environment variables used by Tabsy:

| Variable | Required | Purpose | Example |
|----------|----------|---------|---------|
| `OPENAI_API_KEY` | Yes* | OpenAI API access for GPT-4o-mini | `sk-proj-...` |
| `GOOGLE_CLIENT_ID` | Yes | OAuth app ID from Google Cloud Console | `xxxxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Yes | OAuth app secret from Google Cloud Console | Secret string |
| `GOOGLE_REDIRECT_URI` | Yes | OAuth callback URL | `http://localhost:3000/api/auth/google/callback` |
| `GOOGLE_REFRESH_TOKEN` | Yes | Long-lived refresh token obtained via OAuth flow | Obtained during first login |
| `DATABASE_URL` | Yes | Prisma database connection string | `file:./prisma/data/prod.db` |
| `NODE_ENV` | Yes | Environment mode | `development` or `production` |
| `NEXT_PUBLIC_APP_URL` | Yes | Public-facing app URL | `http://localhost:3000` |
| `NEXT_PUBLIC_BYPASS_AUTH` | No | Skip OAuth for demo purposes | `true` or `false` |
| `OLLAMA_API_URL` | No* | Local/remote Ollama LLM endpoint | `http://127.0.0.1:11434/api` |
| `MODEL_NAME_AT_ENDPOINT` | No* | Model name for Ollama | `qwen3:0.6b` or `qwen3:8b` |
| `LOG_LEVEL` | No | Mastra logging level | `debug`, `info`, `warn`, `error` |

\* Either `OPENAI_API_KEY` OR `OLLAMA_API_URL` + `MODEL_NAME_AT_ENDPOINT` must be set

**Environment Variable Locations:**
- Copy `nosana.env.example` to `.env` in the root directory
- Never commit `.env` to version control
- For production/Docker deployment, set these as container environment variables

## 🏗️ Implementation Timeline

**Important Dates:**
- Start Challenge: 10 October
- Submission Deadline: 31 October
- Winners Announced: 07 November

### Phase 1: Development

1. **Setup** : Fork repo, install dependencies, choose template
2. **Build** : Implement your tool functions and agent logic
3. **Test** : Validate functionality at http://localhost:3000

### Phase 2: Containerization

1. **Clean up**: Remove unused agents from `src/mastra/index.ts`
2. **Build**: Create Docker container using the provided `Dockerfile`
3. **Test locally**: Verify container works correctly

```bash
# Build your container (using the provided Dockerfile)
docker build -t yourusername/agent-challenge:latest .

# Test locally first
docker run -p 3000:3000 yourusername/agent-challenge:latest 

# Push to Docker Hub
docker login
docker push yourusername/agent-challenge:latest
```

### Phase 3: Deployment to Nosana
1. **Deploy your complete stack**: The provided `Dockerfile` will deploy:
   - Your Mastra agent
   - Your frontend interface
   - An LLM to power your agent (all in one container!)
2. **Verify**: Test your deployed agent on Nosana network
3. **Capture proof**: Screenshot or get deployment URL for submission

### Phase 4: Video Demo

Record a 1-3 minute video demonstrating:
- Your agent **running on Nosana** (show the deployed version!)
- Key features and functionality
- The frontend interface in action
- Real-world use case demonstration
- Upload to YouTube, Loom, or similar platform

### Phase 5: Documentation

Update this README with:
- Agent description and purpose
- What tools/APIs your agent uses
- Setup instructions
- Environment variables required
- Example usage and screenshots

## ✅ Minimum Requirements

Your submission **must** include:

- [ ] **Agent with Tool Calling** - At least one custom tool/function
- [ ] **Frontend Interface** - Working UI to interact with your agent
- [ ] **Deployed on Nosana** - Complete stack running on Nosana network
- [ ] **Docker Container** - Published to Docker Hub
- [ ] **Video Demo** - 1-3 minute demonstration
- [ ] **Updated README** - Clear documentation in your forked repo
- [ ] **Social Media Post** - Share on X/BlueSky/LinkedIn with #NosanaAgentChallenge

## Submission Process

1. **Complete all requirements** listed above
2. **Commit all of your changes to the `main` branch of your forked repository**
   - All your code changes
   - Updated README
   - Link to your Docker container
   - Link to your video demo
   - Nosana deployment proof
3. **Social Media Post** (Required): Share your submission on X (Twitter), BlueSky, or LinkedIn
   - Tag @nosana_ai
   - Include a brief description of your agent
   - Add hashtag #NosanaAgentChallenge
4. **Finalize your submission on the [SuperTeam page](https://earn.superteam.fun/listing/nosana-builders-challenge-agents-102)**
   - Add your forked GitHub repository link
   - Add a link to your social media post
   - Submissions that do not meet all requirements will not be considered

## 🚀 Deploying to Nosana

If you choose to containerize and deploy, you must configure your own environment variables on the target platform (DO NOT commit secrets):

Required env vars in production:
- `OPENAI_API_KEY`
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GOOGLE_REDIRECT_URI` (e.g., `https://your-domain.com/api/auth/google/callback`)
- `GOOGLE_REFRESH_TOKEN`
- `NEXT_PUBLIC_APP_URL` (e.g., your deployed URL)

### Using Nosana Dashboard
1. Open [Nosana Dashboard](https://dashboard.nosana.com/deploy)
2. Click `Expand` to open the job definition editor
3. Edit `nos_job_def/nosana_mastra.json` with your Docker image:
   ```json
   {
     "image": "yourusername/agent-challenge:latest"
   }
   ```
4. Copy and paste the edited job definition
5. Select a GPU
6. Click `Deploy`

### Using Nosana CLI (Alternative)
```bash
npm install -g @nosana/cli
nosana job post --file ./nos_job_def/nosana_mastra.json --market nvidia-3090 --timeout 30
```

## 🎨 Feature Details & Implementation

### AI Agent Capabilities

The Workspace Agent (`src/mastra/agents/workspace.agent.ts:14`) provides intelligent automation powered by Mastra and OpenAI:

#### Daily Summary Generation
- **Endpoint:** `/api/agent/daily-summary`
- **Function:** Analyzes your calendar (30-day window), unread emails (up to 500), and active tasks
- **Output:** Provides actionable insights including:
  - Top meetings to reschedule for better flow
  - Urgent emails requiring immediate attention
  - Recommended focus blocks based on your schedule
  - Task priorities aligned with deadlines

#### Real-Time Chat Agent
- **Endpoint:** `/api/copilotkit`
- **Streaming:** Uses AI SDK for real-time response streaming
- **Tools Available:** Calendar management, email operations, task CRUD, weather (template)
- **Implementation:** CopilotKit integration with Mastra agents

### Calendar Management

**Location:** `src/mastra/services/calendar.service.ts`

**Features:**
- 30-day event window (7 days past, 23 days future)
- Intelligent caching with 15-minute TTL
- Free time slot detection with configurable duration
- Create/update/delete events with Google Calendar API v3
- Meeting conflict detection

**API Endpoints:**
- `GET /api/calendar` - Fetch all events
- `POST /api/calendar` - Create new event
- `PATCH /api/calendar/[id]` - Update event
- `DELETE /api/calendar/[id]` - Delete event

**Caching Strategy:**
- Events cached in SQLite (`CalendarEvent` table)
- Automatic refresh on data staleness
- Sync metadata tracking (`SyncMetadata` table)

**Code Reference:** `src/mastra/tools/calendar.tool.ts:1`

### Email Management

**Location:** `src/mastra/services/email.service.ts`

**Features:**
- Unread email fetching with Gmail API v1
- AI-powered priority analysis (`src/mastra/services/email-priority.service.ts:1`)
- Intelligent caching with 5-minute TTL and 500 email limit
- Mark as read functionality
- Draft email assistance via AI agent

**Priority Analysis:**
Emails are automatically categorized as:
- **High Priority:** Urgent deadlines, executive emails, important keywords
- **Medium Priority:** Standard work communications
- **Low Priority:** Newsletters, automated notifications

**API Endpoints:**
- `GET /api/emails` - Fetch unread emails
- `POST /api/emails/[id]/read` - Mark email as read
- `GET /api/emails/[id]` - Get single email details

**Code Reference:** `src/mastra/tools/email.tool.ts:1`

### Task Management

**Location:** `src/mastra/services/task.service.ts`

**Features:**
- Full CRUD operations for tasks
- Status tracking: pending, in_progress, completed
- Priority levels: low, medium, high
- Task categories for organization
- Due date management
- Kanban board UI (`src/components/kanban/kanban-board.tsx`)

**API Endpoints:**
- `GET /api/tasks` - Fetch all tasks
- `POST /api/tasks` - Create new task
- `PATCH /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

**Database:** Tasks stored in SQLite with indexes on status and priority for performance

**Code Reference:** `src/mastra/tools/task.tool.ts:1`

### Authentication & OAuth

**Location:** `src/mastra/auth/google-auth.ts`

**Flow:**
1. User clicks "Sign in with Google" (`src/app/page.tsx:1`)
2. OAuth redirect to Google with calendar + Gmail scopes
3. Callback handler receives authorization code (`src/app/api/auth/google/callback/route.ts`)
4. Exchange code for refresh token
5. Store refresh token in database (`User.googleRefreshToken`)
6. Backend uses refresh token for all subsequent API calls

**Scopes Required:**
- `https://www.googleapis.com/auth/calendar` - Calendar access
- `https://www.googleapis.com/auth/gmail.readonly` - Read emails
- `https://www.googleapis.com/auth/gmail.modify` - Mark emails as read

### Data Synchronization

**Caching Strategy:**

| Service | TTL | Max Items | Storage |
|---------|-----|-----------|---------|
| Calendar Events | 15 minutes | Unlimited | SQLite `CalendarEvent` |
| Emails | 5 minutes | 500 | SQLite `Email` |
| Tasks | Real-time | Unlimited | SQLite `Task` |

**Sync Metadata:**
- Tracks last sync timestamp per user per service
- Enables intelligent cache invalidation
- Stored in `SyncMetadata` table

**Implementation:** `src/mastra/services/calendar.service.ts:50`, `src/mastra/services/email.service.ts:45`

## 🏆 Judging Criteria

Submissions evaluated on 4 key areas (25% each):

### 1. Innovation 🎨
- Originality of agent concept
- Creative use of AI capabilities
- Unique problem-solving approach

### 2. Technical Implementation 💻
- Code quality and organization
- Proper use of Mastra framework
- Efficient tool implementation
- Error handling and robustness

### 3. Nosana Integration ⚡
- Successful deployment on Nosana
- Resource efficiency
- Stability and performance
- Proper containerization

### 4. Real-World Impact 🌍
- Practical use cases
- Potential for adoption
- Clear value proposition
- Demonstration quality

## 🎁 Prizes

**Top 10 submissions will be rewarded:**
- 🥇 1st Place: $1,000 USDC
- 🥈 2nd Place: $750 USDC
- 🥉 3rd Place: $450 USDC
- 🏅 4th Place: $200 USDC
- 🏅 5th-10th Place: $100 USDC each

## 📚 Learning Resources

For more information, check out the following resources:

- [Nosana Documentation](https://docs.nosana.io)
- [Mastra Documentation](https://mastra.ai/en/docs) - Learn more about Mastra and its features
- [CopilotKit Documentation](https://docs.copilotkit.ai) - Explore CopilotKit's capabilities
- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Docker Documentation](https://docs.docker.com)
- [Nosana CLI](https://github.com/nosana-ci/nosana-cli)
- [Mastra Agents Overview](https://mastra.ai/en/docs/agents/overview)
- [Build an AI Stock Agent Guide](https://mastra.ai/en/guides/guide/stock-agent)
- [Mastra Tool Calling Documentation](https://mastra.ai/en/docs/agents/tools)

## 🆘 Support & Community

### Get Help
- **Discord**: Join [Nosana Discord](https://nosana.com/discord) 
- **Dedicated Channel**: [Builders Challenge Dev Chat](https://discord.com/channels/236263424676331521/1354391113028337664)
- **Twitter**: Follow [@nosana_ai](https://x.com/nosana_ai) for live updates

## 🎉 Ready to Build?

1. **Fork** this repository
2. **Build** your AI agent
3. **Deploy** to Nosana
4. **Present** your creation

Good luck, builders! We can't wait to see the innovative AI agents you create for the Nosana ecosystem.

**Happy Building!** 🚀

## Stay in the Loop

Want access to exclusive builder perks, early challenges, and Nosana credits?
Subscribe to our newsletter and never miss an update.

👉 [ Join the Nosana Builders Newsletter ](https://e86f0b9c.sibforms.com/serve/MUIFALaEjtsXB60SDmm1_DHdt9TOSRCFHOZUSvwK0ANbZDeJH-sBZry2_0YTNi1OjPt_ZNiwr4gGC1DPTji2zdKGJos1QEyVGBzTq_oLalKkeHx3tq2tQtzghyIhYoF4_sFmej1YL1WtnFQyH0y1epowKmDFpDz_EdGKH2cYKTleuTu97viowkIIMqoDgMqTD0uBaZNGwjjsM07T)

Be the first to know about:
- 🧠 Upcoming Builders Challenges
- 💸 New reward opportunities
- ⚙ Product updates and feature drops
- 🎁 Early-bird credits and partner perks

Join the Nosana builder community today — and build the future of decentralized AI.


