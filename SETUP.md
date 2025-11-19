# TinyLink Project Setup Guide

## ✅ Project Generated Successfully!

Your TinyLink URL shortener project is now ready. Follow these steps to get it running.

## 📁 Project Structure

```
tinylink/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── links/
│   │   │   │   ├── route.ts              # POST, GET /api/links
│   │   │   │   └── [code]/
│   │   │   │       └── route.ts          # GET, DELETE /api/links/:code
│   │   │   └── healthz/
│   │   │       └── route.ts              # GET /api/healthz
│   │   ├── [code]/
│   │   │   ├── route.ts                  # GET /:code (redirect + click tracking)
│   │   │   ├── not-found.tsx             # 404 page for missing links
│   │   │   └── stats/
│   │   │       └── page.tsx              # GET /:code/stats (statistics page)
│   │   ├── layout.tsx                    # Root layout with Navbar
│   │   ├── page.tsx                      # Dashboard page (/)
│   │   └── globals.css                   # Global TailwindCSS styles
│   ├── components/
│   │   ├── Navbar.tsx                    # Navigation component
│   │   ├── LinkForm.tsx                  # Form to create short links
│   │   ├── LinksTable.tsx                # Display all links in table
│   │   ├── CopyButton.tsx                # Copy link to clipboard
│   │   └── DeleteButton.tsx              # Delete link button
│   └── lib/
│       └── validation.ts                 # URL and code validation functions
├── prisma/
│   └── schema.prisma                     # Database schema definition
├── package.json                          # Project dependencies
├── tsconfig.json                         # TypeScript configuration
├── tailwind.config.ts                    # TailwindCSS configuration
├── postcss.config.js                     # PostCSS configuration
├── next.config.js                        # Next.js configuration
├── .env.example                          # Environment variables template
├── .env.local                            # Local environment variables
├── .gitignore                            # Git ignore rules
└── README.md                             # Full documentation
```

## 🚀 Quick Start (5 minutes)

### Step 1: Install Dependencies

```bash
cd c:\Users\Jitender\Desktop\url
npm install
```

This installs:
- `next` - React framework
- `react` & `react-dom` - UI library
- `@prisma/client` - Database ORM
- `tailwindcss` - CSS framework
- `typescript` - Type safety

### Step 2: Set Up Database

#### Option A: PostgreSQL Locally (Windows)

```bash
# Download from https://www.postgresql.org/download/windows/
# Or using Chocolatey if installed
choco install postgresql

# During installation, remember the password you set
# Default username is 'postgres'

# After installation, open Command Prompt as Admin:
psql -U postgres

# Create database
CREATE DATABASE tinylink;

# Exit psql
\q
```

Then update `.env.local`:
```
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/tinylink"
```

#### Option B: Use Neon (Recommended for Production)

1. Go to https://neon.tech
2. Sign up (free tier available)
3. Create new project
4. Copy connection string
5. Update `.env.local`:
```
DATABASE_URL="postgresql://[user]:[password]@[host]/[database]?sslmode=require"
```

### Step 3: Initialize Prisma

```bash
# Generate Prisma Client
npm run prisma:generate

# Create database tables from schema
npx prisma db push

# (Optional) View database GUI
npm run prisma:studio
```

### Step 4: Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser! 🎉

## 📝 Environment Variables

Create `.env.local` in project root:

```env
# Database connection string
DATABASE_URL="postgresql://user:password@localhost:5432/tinylink"

# Backend base URL
BASE_URL="http://localhost:3000"

# Public base URL (for short link generation)
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
```

## 🔗 API Endpoints

### Create a Short Link
```bash
curl -X POST http://localhost:3000/api/links \
  -H "Content-Type: application/json" \
  -d '{
    "targetUrl": "https://example.com/very/long/url",
    "code": "mylink"  # optional
  }'
```

### Get All Links
```bash
curl http://localhost:3000/api/links
```

### Get Link Statistics
```bash
curl http://localhost:3000/api/links/mylink
```

### Delete a Link
```bash
curl -X DELETE http://localhost:3000/api/links/mylink
```

### Redirect to Target URL
```
Visit: http://localhost:3000/mylink
(Redirects to target URL and increments click counter)
```

### Health Check
```bash
curl http://localhost:3000/api/healthz
```

## 🎨 Features Implemented

### ✅ Dashboard (`/`)
- Form to create new short links
- Table of all existing links
- Search/filter functionality
- Delete button for each link
- Click counter
- Creation date display
- Last clicked timestamp
- Copy short link button
- Responsive design

### ✅ Statistics Page (`/:code/stats`)
- Full link details
- Click count graph ready
- Created at timestamp
- Last clicked timestamp
- Copy short link button
- Link to target URL

### ✅ Redirect Handler (`/:code`)
- Auto-redirect to target URL
- Click tracking
- 404 page for non-existent links
- 302 redirect status

### ✅ API Routes
- `POST /api/links` - Create link
- `GET /api/links` - List all links
- `GET /api/links/:code` - Get link stats
- `DELETE /api/links/:code` - Delete link
- `GET /api/healthz` - Health check

## 🛠️ Available Commands

```bash
# Development
npm run dev              # Start dev server

# Production
npm run build            # Build for production
npm start                # Run production server

# Prisma
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Create and run migrations
npm run prisma:studio    # Open Prisma Studio GUI

# Linting
npm run lint             # Run ESLint
```

## 📊 Database Schema

```prisma
model Link {
  code        String   @id          # Unique short code (6-8 chars)
  targetUrl   String                # Full URL to redirect to
  clicks      Int      @default(0)  # Number of times clicked
  createdAt   DateTime @default(now())  # Creation timestamp
  lastClicked DateTime?             # Last click timestamp (nullable)
}
```

## ✨ Validation Rules

### URL Validation
- Must be valid HTTP/HTTPS URL
- Standard URL format required

### Code Validation
- Length: 6-8 characters
- Characters: A-Z, a-z, 0-9 only
- Regex: `^[A-Za-z0-9]{6,8}$`
- Must be unique

### Auto-Generation
- If no code provided: Random 6-8 char code generated
- If code exists: Returns 409 Conflict error
- Guaranteed to be unique

## 🚢 Deployment to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/tinylink.git
git push -u origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Add environment variables:
   - `DATABASE_URL`: Your Neon connection string
   - `BASE_URL`: Your Vercel domain (e.g., tinylink.vercel.app)
   - `NEXT_PUBLIC_BASE_URL`: Same as BASE_URL
5. Click "Deploy"

### 3. Database Setup
- Use Neon PostgreSQL for free
- Get connection string from Neon
- Add to Vercel environment variables

## 🔍 Testing the API

### Using Postman
1. Import these endpoints:
   - `POST /api/links` - Create link
   - `GET /api/links` - List all
   - `GET /api/links/:code` - Get stats
   - `DELETE /api/links/:code` - Delete
   - `GET /api/healthz` - Health check

### Using Thunder Client (VS Code)
Same endpoints as Postman

### Using REST Client Extension
Create `.http` file with test requests

## 🐛 Troubleshooting

### Database Connection Failed
```bash
# Check connection string in .env.local
# Verify PostgreSQL is running
# Test connection:
psql [your_connection_string]
```

### Prisma Migration Issues
```bash
# Reset database (clears all data)
npx prisma migrate reset

# Or generate types
npm run prisma:generate
```

### Environment Variables Not Loading
- Verify `.env.local` exists
- Check variable names (case-sensitive)
- Restart dev server after changes

### Port 3000 Already in Use
```bash
# Use different port
npm run dev -- -p 3001
```

## 📚 Key Files to Understand

1. **`src/app/layout.tsx`** - Root layout with Navbar
2. **`src/app/page.tsx`** - Dashboard (main UI)
3. **`src/app/api/links/route.ts`** - Create/list links API
4. **`src/app/api/links/[code]/route.ts`** - Get/delete link API
5. **`src/app/[code]/route.ts`** - Redirect handler
6. **`src/lib/validation.ts`** - Validation functions
7. **`prisma/schema.prisma`** - Database definition

## 🎯 Next Steps

1. **Start dev server**: `npm run dev`
2. **Open browser**: http://localhost:3000
3. **Create a link**: Use the form on dashboard
4. **Test redirect**: Visit /:code
5. **Check stats**: Visit /:code/stats
6. **View API**: Check endpoints section

## 💡 Tips & Best Practices

### For Development
- Use Prisma Studio to view/edit database: `npm run prisma:studio`
- Check browser console for errors
- Use React DevTools extension
- Enable TypeScript strict mode

### For Production
- Use environment variables from Vercel
- Enable HTTPS
- Set up database backups
- Monitor error logs
- Use CDN for assets

### Security
- Never commit `.env.local`
- Use strong database passwords
- Validate all user input
- Keep dependencies updated
- Enable CORS if needed

## 📞 Support

If you encounter issues:
1. Check the README.md for detailed docs
2. Review the Troubleshooting section above
3. Check database logs
4. Enable debug mode in Prisma
5. Review console errors in browser/terminal

## 🎊 You're All Set!

Your TinyLink URL shortener is ready to use. Start with:

```bash
npm install
npm run prisma:generate
npm run dev
```

Then open http://localhost:3000 and start creating short links!

---

**Happy coding! 🚀**
