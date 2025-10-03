# Created 2 Connect - Youth Camp 2025

A production-grade Next.js website with a bold, vibrant Gen-Z aesthetic featuring dynamic typography and a modern registration flow.

## ✨ Features

### 🎨 Bold Hero Landing Page
- Vibrant electric blue background with animated shapes
- Oversized, dynamic typography (Bebas Neue + Barlow Condensed)
- Layered, overlapping text elements inspired by modern street art
- Smooth Framer Motion animations
- Fully responsive design

### 📋 Modern Registration Form
- Clean, minimal design with bold borders and neo-brutalist shadows
- 3-step flow: Identity → Membership → Logistics
- Real-time validation with React Hook Form + Zod
- Smooth step transitions with Framer Motion
- QR code ticket generation
- Full accessibility (ARIA labels, keyboard navigation, focus states)

## 🎨 Design System

### Color Palette
- **Electric Blue**: `#3939ff` - Primary brand color
- **Sunshine Yellow**: `#f2bb05` - Accent/highlights
- **Flame Orange**: `#ff5b22` - CTAs/alerts
- **Midnight Black**: `#1f1f1f` - Text/borders
- **Cream**: `#fdfbf1` - Background

### Typography
- **Bebas Neue**: Display headings, bold statements
- **Barlow Condensed**: Subheadings, secondary text
- **Inter**: Body copy, form inputs

### Design Philosophy
- **Neo-brutalist** aesthetic with bold borders and sharp shadows
- **High contrast** for accessibility and visual impact
- **Dynamic layouts** with overlapping elements
- **Vibrant colors** targeting Gen-Z/youth demographic
- **Google Material Design** principles for usability

## 🚀 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod validation
- **QR Generation**: qrcode
- **Typography**: Google Fonts (Bebas Neue, Barlow Condensed, Inter)

## 📦 Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open** [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
/app
  /components
    /Hero
      ModernHero.tsx           # Bold typography hero
    /FormLedger
      ModernLedger.tsx         # Main form container
      ModernStepIdentity.tsx   # Step 1: Personal info
      ModernStepMembership.tsx # Step 2: Membership
      ModernStepLogistics.tsx  # Step 3: Logistics
      ModernConfirmation.tsx   # Success screen
      types.ts                 # Zod schemas
  /api
    /register
      route.ts                 # Registration endpoint
  page.tsx                     # Main landing
  layout.tsx                   # Root layout
  globals.css                  # Global styles
```

## 🎯 Key Components

### Hero Section
- **Large Display Text**: "CONNECT" in Bebas Neue (responsive from 8rem to 20rem)
- **Overlapping Elements**: Dynamic positioning with "GROUP", "#CREATED TO2 CONNECT"
- **Animated Background**: Rotating gradient circles
- **CTAs**: Neo-brutalist buttons with shadow effects

### Registration Form
- **Step Indicators**: Circular progress with number badges
- **Input Styling**: Bold 3px borders, electric blue focus states
- **Conditional Fields**: Member ID vs. Referral source based on toggle
- **Validation**: Inline error messages with animations
- **Success State**: QR code ticket with download functionality

## 🔧 Configuration

### Environment Variables
```env
# Optional: Database connection
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

## 🚢 Deployment

### Vercel (Recommended)
```bash
vercel deploy
```

### Build for Production
```bash
npm run build
npm start
```

## ♿ Accessibility

- ✅ Semantic HTML with proper heading hierarchy
- ✅ ARIA labels and descriptions
- ✅ Keyboard navigation support
- ✅ Focus visible states on all interactive elements
- ✅ Color contrast ratio > 4.5:1
- ✅ Reduced motion support
- ✅ Screen reader tested

## 📊 Performance

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- Code splitting with dynamic imports
- Optimized fonts with font-display: swap
- Image optimization with Next/Image

## 🎯 API Endpoints

### POST /api/register
**Request**:
```json
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "isMember": false,
  "heardFrom": "friend",
  "dietaryRestrictions": "None",
  "emergencyContactName": "Jane Doe",
  "emergencyContactPhone": "1234567890",
  "consent": true
}
```

**Response**:
```json
{
  "success": true,
  "ticketId": "C2C-ABCD123456",
  "qrUrl": "data:image/png;base64,..."
}
```

## 🎨 Customization

### Changing Colors
Edit `tailwind.config.ts`:
```ts
colors: {
  electric: '#3939ff',    // Your primary color
  sunshine: '#f2bb05',    // Accent color
  flame: '#ff5b22',       // CTA color
  midnight: '#1f1f1f',    // Text/borders
  cream: '#fdfbf1',       // Background
}
```

### Typography Tweaks
Adjust in components:
- Hero: `app/components/Hero/ModernHero.tsx`
- Form: `app/components/FormLedger/Modern*.tsx`

## 📝 License

MIT

## 🙏 Credits

Design inspired by modern Gen-Z aesthetics and neo-brutalist design trends.

---

**Built with ❤️ for Created 2 Connect Youth Camp 2025**
# Created-To-Connect
