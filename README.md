# Günnur Tekşen - Clinical Psychologist Portfolio

Modern, responsive portfolio website built with Next.js 13+ App Router, Tailwind CSS, and TypeScript.

## Features

- 🌍 Multi-language support (Turkish/English)
- 📱 Responsive design
- 📝 Blog system with markdown support
- 📊 Admin dashboard
- 🔒 Secure authentication with rate limiting
- 🚀 Server-side rendering
- ⚡ API rate limiting and security
- 💾 Redis caching (optional)
- 🎨 Framer Motion animations
- 🏥 Health check endpoint
- 📝 Centralized logging

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Database**: PostgreSQL with Prisma ORM
- **Caching**: Redis (Upstash, optional)
- **Animation**: Framer Motion
- **Testing**: Jest & React Testing Library

## Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- PostgreSQL database
- (Optional) Redis/Upstash instance for rate limiting and caching

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/gunnur.git
cd gunnur
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file based on `.env.example`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and configure the following variables:

**Required:**
- `DATABASE_URL`: PostgreSQL connection string
- `ADMIN_USERNAME`: Admin panel username
- `ADMIN_PASSWORD_HASH`: Bcrypt hashed password (see below)

**Optional:**
- `UPSTASH_REDIS_REST_URL`: Redis URL for rate limiting
- `UPSTASH_REDIS_REST_TOKEN`: Redis token
- `NODE_ENV`: Environment (development/production)
- `ALLOWED_ORIGINS`: Comma-separated list of allowed CORS origins

### 4. Generate Admin Password Hash

Generate a bcrypt hash for your admin password:

```bash
npm run hash-password "your_secure_password"
```

Copy the generated hash to `ADMIN_PASSWORD_HASH` in your `.env.local` file.

### 5. Database Setup

Run Prisma migrations:

```bash
# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed the database
npm run db:seed
```

### 6. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:password@localhost:5432/gunnur_db?schema=public` |
| `ADMIN_USERNAME` | Admin panel username | `admin` |
| `ADMIN_PASSWORD_HASH` | Bcrypt hashed password | Use `npm run hash-password` to generate |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `UPSTASH_REDIS_REST_URL` | Redis instance URL | In-memory store used |
| `UPSTASH_REDIS_REST_TOKEN` | Redis authentication token | In-memory store used |
| `NODE_ENV` | Environment mode | `development` |
| `ALLOWED_ORIGINS` | Comma-separated allowed CORS origins | `localhost:3000` |

## Database Setup

### PostgreSQL Installation

**macOS (Homebrew):**
```bash
brew install postgresql
brew services start postgresql
createdb gunnur_db
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo -u postgres createdb gunnur_db
```

**Windows:**
Download and install from [PostgreSQL Downloads](https://www.postgresql.org/download/windows/)

### Running Migrations

```bash
# Development
npx prisma migrate dev

# Production
npx prisma migrate deploy
```

### Database Seeding

```bash
npm run db:seed
```

### Reset Database (Development Only)

```bash
npm run db:reset
```

## Testing

### Run Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Debug mode
npm run test:debug

# With coverage
npm test -- --coverage
```

## Project Structure

```
gunnur/
├── app/                      # Next.js 13 app directory
│   ├── api/                 # API routes
│   │   ├── auth/           # Authentication endpoints
│   │   ├── blog/           # Blog endpoints
│   │   ├── contact/        # Contact form endpoint
│   │   ├── services/       # Services endpoint
│   │   └── health/         # Health check endpoint
│   ├── admin/              # Admin dashboard
│   ├── auth/               # Authentication pages
│   ├── blog/               # Blog pages
│   └── ...
├── components/             # React components
│   ├── common/            # Common/shared components
│   └── ui/                # UI components (Shadcn)
├── lib/                   # Utility functions
│   ├── auth.ts            # Authentication utilities
│   ├── logger.ts          # Logging utility
│   └── prisma.ts          # Prisma client
├── prisma/                # Database schema and migrations
│   ├── schema.prisma      # Prisma schema
│   └── migrations/        # Migration files
├── __tests__/            # Test files
├── middleware.ts         # Next.js middleware (security headers, CORS)
└── .env.example          # Environment variables template
```

## Security Features

### Implemented Security Measures

- ✅ Environment variables properly managed (never committed)
- ✅ Input validation on all API endpoints
- ✅ SQL injection protection (Prisma ORM)
- ✅ XSS protection (input sanitization)
- ✅ Rate limiting on login endpoint
- ✅ Security headers (CSP, HSTS, X-Frame-Options, etc.)
- ✅ CORS configuration
- ✅ Password hashing with bcrypt
- ✅ Error handling without exposing sensitive data
- ✅ Production logging (no sensitive data in logs)
- ✅ Authentication required for admin endpoints

### Security Best Practices

1. **Never commit `.env` files** - Always use `.env.example` as a template
2. **Use strong passwords** - Generate secure admin passwords
3. **Keep dependencies updated** - Regularly run `npm audit` and update packages
4. **Review logs** - Monitor application logs for suspicious activity
5. **Rate limiting** - Configure Redis for production rate limiting
6. **HTTPS** - Always use HTTPS in production

## API Endpoints

### Public Endpoints

- `GET /api/blog` - Get published blog posts
- `POST /api/contact` - Submit contact form
- `GET /api/services` - Get active services
- `GET /api/health` - Health check endpoint

### Protected Endpoints (Require Authentication)

- `POST /api/blog` - Create blog post
- `POST /api/auth/login` - Admin login

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables in Vercel dashboard
4. Set build command: `npm run build`
5. Deploy

### Environment Variables in Vercel

Add all required environment variables in Vercel project settings:
- `DATABASE_URL`
- `ADMIN_USERNAME`
- `ADMIN_PASSWORD_HASH`
- (Optional) Redis variables

### Health Check

The health check endpoint is available at `/api/health` for monitoring:
```bash
curl https://yourdomain.com/api/health
```

## Development

### Code Quality

- TypeScript for type safety
- ESLint for code linting
- Prettier for code formatting (recommended)
- Jest for testing

### Debugging

- Development logs: Check console output in development mode
- Production logs: Use proper logging service (Sentry, LogRocket, etc.)
- Health check: Use `/api/health` endpoint

## Troubleshooting

### Common Issues

**Database Connection Error:**
- Verify `DATABASE_URL` is correct
- Ensure PostgreSQL is running
- Check database exists

**Authentication Issues:**
- Verify `ADMIN_PASSWORD_HASH` is correctly generated
- Check password hash format (60 or 80 characters)

**Redis Connection Issues:**
- Redis is optional - app will use in-memory store
- Verify Redis credentials if using Upstash

**Build Errors:**
- Run `npx prisma generate` before building
- Check all environment variables are set
- Clear `.next` folder and rebuild

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new features
5. Ensure all tests pass
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Code Style

- Follow TypeScript best practices
- Use meaningful variable names
- Add comments for complex logic
- Write tests for new features

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or support, please open an issue in the GitHub repository.
