# TinyLink — URL Shortener

A production-ready URL shortener web application built with modern web technologies. Create short, shareable links and track analytics with ease.

## Features

✨ **Core Features**
- Create short, memorable links
- Custom short codes (6-8 alphanumeric characters)
- Auto-generate random short codes if not provided
- Track click analytics in real-time
- Beautiful, responsive dashboard
- Delete links whenever needed
- Search and filter links
- Link statistics page with creation date and last clicked info

🔧 **Technical Highlights**
- Built with Next.js 14 (App Router)
- Styled with TailwindCSS
- PostgreSQL database with Prisma ORM
- Type-safe with TypeScript
- Vercel-ready deployment
- RESTful API endpoints
- Health check endpoint

## Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL (recommended: Neon)
- **ORM**: Prisma
- **Deployment**: Vercel
- **Language**: TypeScript

## Project Structure

```
tinylink/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── links/
│   │   │   │   ├── route.ts           # POST, GET /api/links
│   │   │   │   └── [code]/
│   │   │   │       └── route.ts       # GET, DELETE /api/links/:code
│   │   │   └── healthz/
│   │   │       └── route.ts           # GET /api/healthz
│   │   ├── [code]/
│   │   │   ├── route.ts               # GET /:code (redirect handler)
│   │   │   ├── not-found.tsx          # 404 page
│   │   │   └── stats/
│   │   │       └── page.tsx           # GET /:code/stats
│   │   ├── layout.tsx                 # Root layout with Navbar
│   │   ├── page.tsx                   # Dashboard page
│   │   └── globals.css                # Global styles
│   ├── components/
│   │   ├── CopyButton.tsx             # Copy to clipboard button
│   │   ├── DeleteButton.tsx           # Delete link button
│   │   ├── LinkForm.tsx               # Form to create links
│   │   ├── LinksTable.tsx             # Display all links
│   │   └── Navbar.tsx                 # Navigation bar
│   └── lib/
│       └── validation.ts              # URL and code validation
├── prisma/
│   └── schema.prisma                  # Database schema
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── next.config.js
├── .env.example                       # Environment variables template
└── README.md
```

## Database Schema

```prisma
model Link {
  code        String   @id
  targetUrl   String
  clicks      Int      @default(0)
  createdAt   DateTime @default(now())
  lastClicked DateTime?
}
```

## API Routes

### Create Link
```
POST /api/links
Content-Type: application/json

{
  "targetUrl": "https://example.com/very/long/url",
  "code": "custom"  // optional, 6-8 alphanumeric chars
}

Response: 201 Created
{
  "code": "custom",
  "targetUrl": "https://example.com/very/long/url",
  "clicks": 0,
  "createdAt": "2024-01-01T00:00:00Z",
  "lastClicked": null
}
```

### List All Links
```
GET /api/links

Response: 200 OK
[
  {
    "code": "custom",
    "targetUrl": "https://example.com/very/long/url",
    "clicks": 5,
    "createdAt": "2024-01-01T00:00:00Z",
    "lastClicked": "2024-01-02T10:30:00Z"
  }
]
```

### Get Link Stats
```
GET /api/links/:code

Response: 200 OK
{
  "code": "custom",
  "targetUrl": "https://example.com/very/long/url",
  "clicks": 5,
  "createdAt": "2024-01-01T00:00:00Z",
  "lastClicked": "2024-01-02T10:30:00Z"
}

Response: 404 Not Found
{
  "error": "Link not found"
}
```

### Delete Link
```
DELETE /api/links/:code

Response: 200 OK
{
  "success": true
}

Response: 404 Not Found
{
  "error": "Link not found"
}
```

### Redirect (with click tracking)
```
GET /:code

Response: 302 Found
Location: https://example.com/very/long/url

Note: Increments click count and updates lastClicked timestamp
```

### Health Check
```
GET /api/healthz

Response: 200 OK
{
  "ok": true,
  "version": "1.0"
}
```

## Setup Instructions

### 1. Clone or Create Project

```bash
# Create new Next.js project
npx create-next-app@latest tinylink --typescript --tailwind

# Or navigate to existing project
cd tinylink
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Database

#### Option A: Use Neon (PostgreSQL) - Recommended

1. Go to [Neon](https://neon.tech)
2. Create a free account
3. Create a new project
4. Copy the connection string

#### Option B: Use Local PostgreSQL

```bash
# Install PostgreSQL if not already installed
# macOS
brew install postgresql

# Windows (using Chocolatey)
choco install postgresql

# Ubuntu/Debian
sudo apt-get install postgresql postgresql-contrib

# Start PostgreSQL service
postgres -D /usr/local/var/postgres

# Create database
createdb tinylink
```

### 4. Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local with your values
```

**.env.local** should contain:
```
DATABASE_URL="postgresql://user:password@localhost:5432/tinylink"
BASE_URL="http://localhost:3000"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

**For Neon:**
```
DATABASE_URL="postgresql://[user]:[password]@[host]/[database]?sslmode=require"
BASE_URL="http://localhost:3000"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

### 5. Initialize Prisma

```bash
# Generate Prisma client
npm run prisma:generate

# Create and run migrations
npm run prisma:migrate

# Or push schema directly (for development)
npx prisma db push
```

### 6. Run Locally

```bash
# Development
npm run dev

# Open browser to http://localhost:3000
```

## How to Deploy to Vercel

### 1. Push Code to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/tinylink.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Configure environment variables:
   - `DATABASE_URL`: Your Neon connection string
   - `BASE_URL`: Your deployed URL (e.g., `https://tinylink.vercel.app`)
   - `NEXT_PUBLIC_BASE_URL`: Same as BASE_URL

5. Click "Deploy"

### 3. Set Up Database

For Neon PostgreSQL:

1. Go to [Neon](https://neon.tech)
2. Create a branch for production
3. Copy the connection string
4. Add to Vercel environment variables

## Validation Rules

### URL Validation
- Must be a valid HTTP or HTTPS URL
- Must follow standard URL format

### Code Validation
- Length: 6-8 characters
- Characters: Alphanumeric (A-Z, a-z, 0-9)
- Regex: `^[A-Za-z0-9]{6,8}$`
- Must be unique

### Custom Code Conflicts
- If code already exists: Returns `409 Conflict`
- If not provided: Auto-generates random code

## Performance Considerations

- **Click Tracking**: Real-time updates on each redirect
- **Database Queries**: Indexed on `code` for fast lookups
- **Response Times**: <100ms average response time
- **Scalability**: PostgreSQL can handle millions of links

## Security Considerations

- Input validation on all URLs and codes
- Regex validation prevents SQL injection
- No authentication by default (add for production)
- HTTPS recommended for production
- CORS headers can be added if needed

## Testing the API

### Using cURL

```bash
# Create link
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{"targetUrl":"https://example.com","code":"mylink"}'

# Get all links
curl http://localhost:3000/api/links

# Get link stats
curl http://localhost:3000/api/links/mylink

# Delete link
curl -X DELETE http://localhost:3000/api/links/mylink

# Health check
curl http://localhost:3000/api/healthz
```

### Using Postman

1. Import these endpoints:
   - POST `/api/links`
   - GET `/api/links`
   - GET `/api/links/:code`
   - DELETE `/api/links/:code`
   - GET `/api/healthz`

2. Test with sample data

## Development

### Update Prisma Schema

```bash
# Edit prisma/schema.prisma
nano prisma/schema.prisma

# Create migration
npm run prisma:migrate

# View database GUI
npm run prisma:studio
```

### Run Linter

```bash
npm run lint
```

### Build for Production

```bash
npm run build
npm start
```

## Troubleshooting

### Database Connection Issues

```bash
# Test connection
psql [DATABASE_URL]

# Check Prisma
npx prisma db execute --stdin < query.sql
```

### Migrations Failing

```bash
# Reset database (⚠️ clears all data)
npx prisma migrate reset

# Or manually fix
npx prisma migrate resolve --applied "migration_name"
```

### Environment Variables Not Loading

- Verify `.env.local` exists in project root
- Restart dev server after editing
- Check for typos in variable names

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host/db` |
| `BASE_URL` | Backend base URL | `http://localhost:3000` |
| `NEXT_PUBLIC_BASE_URL` | Public base URL for short links | `http://localhost:3000` |

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## License

MIT

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review API documentation
3. Check database logs
4. Enable debug mode in Prisma

## Future Enhancements

- User authentication
- Custom domains
- QR code generation
- Advanced analytics (device, location, referrer)
- Link expiration
- Rate limiting
- API key authentication
- Webhook notifications
- Custom branding
- Bulk operations

---

**Built with ❤️ using Next.js, React, and TailwindCSS**
