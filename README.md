# AI Automate Platform

Enterprise-grade AI Workflow Automation Platform combining artificial intelligence with workflow orchestration.

## 📋 Overview

**AI Automate** is an open-source platform that enables businesses to automate complex workflows enhanced with AI capabilities. It integrates with n8n for workflow automation, supports multiple AI providers (OpenAI, Claude), and provides a modern web interface for creating and managing automated processes.

### Key Features

- 🤖 **AI-Powered Workflows** - Leverage GPT-4, Claude, and other AI models
- 🔄 **Visual Workflow Builder** - Drag-and-drop interface powered by n8n
- 📄 **Document Processing** - OCR, PDF parsing, and AI-powered extraction
- 📧 **Multi-Channel Integration** - Email, Slack, Discord, webhooks
- 📊 **Real-time Monitoring** - Live execution tracking and analytics
- 🔐 **Enterprise Security** - JWT authentication, encrypted credentials
- 🌍 **Scalable Architecture** - Docker-based, cloud-ready deployment

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                        │
│              Dashboard • Workflow Builder • Analytics        │
└────────────────────┬────────────────────────────────────────┘
                     │ WebSocket/HTTP
┌────────────────────▼────────────────────────────────────────┐
│              BACKEND API (Node.js + Express)                │
│         Routes • Authentication • WebSocket Server          │
└──────┬──────────────────────┬──────────────────┬────────────┘
       │                      │                  │
   ┌───▼────┐  ┌──────────────▼──┐  ┌─────────┬▼────────┐
   │PostgreSQL│  │     Redis      │  │   n8n  │ AI APIs │
   └─────────┘  │  Job Queue &   │  │ Engine │ (OpenAI)│
                │    Cache       │  └────────┴─────────┘
                └────────────────┘
```

## 📁 Project Structure

```
ai-automate/
├── backend/                    # Node.js + Express API
│   ├── src/
│   │   ├── index.ts           # Application entry point
│   │   ├── config/            # Database & Redis config
│   │   ├── routes/            # API endpoints
│   │   ├── services/          # Business logic
│   │   ├── middleware/        # Auth, error handling
│   │   ├── models/            # Database models
│   │   ├── jobs/              # Queue jobs
│   │   ├── utils/             # Utilities (logger, etc)
│   │   └── types/             # TypeScript definitions
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── README.md
│
├── frontend/                   # Next.js + React Dashboard
│   ├── src/
│   │   ├── app/               # Next.js app directory
│   │   ├── components/        # React components
│   │   ├── hooks/             # Custom hooks
│   │   ├── store/             # Zustand stores
│   │   ├── services/          # API clients
│   │   ├── types/             # TypeScript types
│   │   └── styles/            # Global styles
│   ├── package.json
│   ├── tsconfig.json
│   ├── tailwind.config.js
│   ├── next.config.js
│   └── README.md
│
├── docker-compose.yml         # Docker orchestration
├── .env.example               # Environment template
├── .gitignore                 # Git ignore patterns
└── README.md                  # This file
```

## 🚀 Quick Start

### Prerequisites

- **Docker** & **Docker Compose** (Recommended)
- **Node.js 18+** & **npm 9+** (For local development)
- **PostgreSQL 16** (If running locally)
- **Redis 7** (If running locally)

### Option 1: Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/Srivenkatesh03/ai-automate.git
cd ai-automate

# Copy environment file
cp .env.example .env

# Start all services
docker-compose up -d

# Services will be available at:
# - Frontend: http://localhost:3001
# - Backend: http://localhost:3000
# - n8n: http://localhost:5678
# - PostgreSQL: localhost:5432
# - Redis: localhost:6379
```

### Option 2: Local Development

```bash
# Backend setup
cd backend
npm install
npm run dev

# Frontend setup (in a new terminal)
cd frontend
npm install
npm run dev
```

## 🔐 Environment Configuration

Create a `.env` file from `.env.example` and configure:

```env
# Database
DB_HOST=postgres
DB_PORT=5432
DB_USER=aiuser
DB_PASSWORD=your_secure_password
DB_NAME=ai_automate_db

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password

# API
BACKEND_PORT=3000
FRONTEND_PORT=3001
JWT_SECRET=your_jwt_secret_key

# AI Providers
OPENAI_API_KEY=sk-...
CLAUDE_API_KEY=sk-ant-...

# Email (Gmail)
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-app-password

# Slack
SLACK_WEBHOOK_URL=https://hooks.slack.com/...

# n8n
N8N_USER=admin@example.com
N8N_PASSWORD=secure_password
```

## 📚 API Documentation

### Authentication

```bash
# Register
POST /api/v1/auth/register
{
  "email": "user@example.com",
  "password": "secure_password"
}

# Login
POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "secure_password"
}
```

### Workflows

```bash
# Get all workflows
GET /api/v1/workflows
Authorization: Bearer {token}

# Create workflow
POST /api/v1/workflows
Authorization: Bearer {token}
{
  "name": "Email Classification",
  "description": "Classify incoming emails using AI"
}

# Execute workflow
POST /api/v1/workflows/{id}/execute
Authorization: Bearer {token}
```

See complete API documentation in [PHASE 3](./PHASE_3_PLAN.md)

## 🛠️ Development

### Backend Development

```bash
cd backend

# Install dependencies
npm install

# Run in development (with hot-reload)
npm run dev

# Build for production
npm run build

# Start production build
npm start

# Run tests
npm run test

# Lint code
npm run lint
```

### Frontend Development

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🐳 Docker Commands

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend
docker-compose logs -f frontend

# Stop all services
docker-compose down

# Remove volumes (WARNING: deletes data)
docker-compose down -v

# Rebuild images
docker-compose build --no-cache
```

## 📊 Database Migrations

Migrations are managed using TypeORM. Running the application will automatically apply pending migrations.

## 🧪 Testing

```bash
# Backend tests
cd backend
npm run test

# Frontend tests
cd frontend
npm run test
```

## 📝 Development Phases

### ✅ PHASE 1: Project Setup
- [x] Repository initialization
- [x] Docker configuration
- [x] Backend scaffolding
- [x] Frontend scaffolding

### 🔄 PHASE 2: Environment & Configuration (Current)
- [x] Docker Compose orchestration
- [x] Environment configuration
- [x] TypeScript setup
- [x] Build configurations
- [x] Logging utilities

### 📅 PHASE 3: Core Features (Next)
- [ ] User authentication & authorization
- [ ] Workflow CRUD operations
- [ ] n8n integration
- [ ] Document processing
- [ ] Email notifications

### 📅 PHASE 4: AI Integration
- [ ] OpenAI integration
- [ ] Claude integration
- [ ] Prompt management
- [ ] Token optimization

### 📅 PHASE 5: Advanced Features
- [ ] Webhook management
- [ ] Scheduling & triggers
- [ ] Analytics & monitoring
- [ ] Team collaboration

### 📅 PHASE 6: Deployment & Polish
- [ ] CI/CD pipeline
- [ ] Performance optimization
- [ ] Security hardening
- [ ] Documentation

## 🔗 Integration Examples

### Email Processing Workflow

```
Gmail → Extract Email → AI Classification → 
Store in DB → Send to Slack
```

### Document Analysis Workflow

```
Upload PDF → OCR → AI Analysis → 
Generate Summary → Email Report
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

- 📖 [Documentation](./docs)
- 💬 [Discussions](https://github.com/Srivenkatesh03/ai-automate/discussions)
- 🐛 [Report Issues](https://github.com/Srivenkatesh03/ai-automate/issues)

## 🙏 Acknowledgments

- [n8n](https://n8n.io/) - Workflow automation platform
- [OpenAI](https://openai.com/) - AI models
- [Next.js](https://nextjs.org/) - React framework
- [Express.js](https://expressjs.com/) - Web framework
- [Tailwind CSS](https://tailwindcss.com/) - Styling

---

**Made with ❤️ for automation enthusiasts**
