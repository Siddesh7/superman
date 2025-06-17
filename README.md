# Superman - Gym Management PWA

A Progressive Web App for gym membership management built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Quick Start

This project uses **bun** as the package manager for fast installs and builds.

### Prerequisites

- [Bun](https://bun.sh/) - JavaScript runtime & package manager
- Node.js 18+ (for compatibility)

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun run dev

# Build for production
bun run build

# Start production server
bun run start
```

## 📱 PWA Features

This app is a full Progressive Web App with:

- ✅ **Installable** - Can be installed on any device
- ✅ **Offline Support** - Works without internet connection
- ✅ **Service Worker** - Automatic caching and updates
- ✅ **Web App Manifest** - Native app-like experience
- ✅ **Responsive Design** - Works on desktop, tablet, and mobile

### PWA Testing

1. Build the production version: `bun run build`
2. Start the production server: `bun run start`
3. Open http://localhost:3000 in Chrome/Edge
4. Look for the install prompt or use browser menu > "Install Superman..."
5. Test offline by disabling network in DevTools

## 🛠️ Tech Stack

- **Runtime**: Bun
- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Database**: Supabase
- **Auth**: NextAuth.js
- **PWA**: next-pwa

## 📁 Project Structure

```
├── app/                    # Next.js app directory
├── components/            # Reusable UI components
├── lib/                   # Utility functions
├── public/               # Static assets & PWA files
│   ├── manifest.json     # Web app manifest
│   ├── sw.js            # Service worker (auto-generated)
│   ├── offline.html     # Offline fallback page
│   └── icon-*.png       # App icons
└── vendors/              # Vendor-specific code
```

## 🔧 Environment Variables

Create a `.env.local` file with:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_key
```

## 📱 PWA Installation Component

Use the built-in install component:

```tsx
import { PWAInstall } from "@/components/pwa-install";

export default function MyPage() {
  return (
    <div>
      <PWAInstall />
    </div>
  );
}
```

## 🎨 Customization

### App Icons

Replace the placeholder icons in `/public/`:

- `icon-192x192.png` (192×192 pixels)
- `icon-512x512.png` (512×512 pixels)

### App Manifest

Edit `/public/manifest.json` to customize:

- App name and description
- Theme colors
- Categories

### Offline Page

Customize `/public/offline.html` for your brand.

## 🚀 Deployment

The app builds as a static PWA that can be deployed to:

- Vercel (recommended for Next.js)
- Netlify
- Any static hosting service

```bash
bun run build
```

The build output includes:

- Static pages in `.next/`
- Service worker at `/public/sw.js`
- Web app manifest at `/public/manifest.json`

## 📖 PWA Documentation

For detailed PWA setup information, see `PWA_SETUP.md`.

---

Built with ❤️ using Bun and Next.js
