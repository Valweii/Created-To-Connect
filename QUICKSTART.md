# 🚀 Quick Start Guide

Transform your event registration in 3 steps!

## Prerequisites

- **Node.js** 18+ installed
- **npm** or **yarn**

## Installation

### Step 1: Install Dependencies

```bash
npm install
```

This installs:
- Next.js 14 (App Router)
- Framer Motion (animations)
- React Hook Form + Zod (validation)
- Tailwind CSS (styling)
- Google Fonts (Bebas Neue, Barlow Condensed, Inter)

### Step 2: Start Development Server

```bash
npm run dev
```

### Step 3: Open Browser

Navigate to [http://localhost:3000](http://localhost:3000)

## 🎨 What You'll See

### Hero Landing Page
- **Bold Electric Blue Background** with animated gradient circles
- **Massive "CONNECT" Typography** (Bebas Neue font, 8-20rem responsive)
- **Overlapping Design Elements**:
  - "GROUP (BARLOW)" in top left
  - "#CREATED TO2 CONNECT" stacked text, rotated -3deg
- **Tagline**: "IT WON'T BE LIKE THIS FOREVER" (Bebas Neue)
- **CTA Buttons**:
  - "REGISTER NOW" - Yellow with neo-brutalist shadow
  - "LEARN MORE" - Outlined cream border
- **Animated Elements**: Rotating circles, floating scroll indicator

### Registration Form (3 Steps)

#### Step 1: Your Info
- Full Name* (required)
- Preferred Name
- Email* (required)
- Phone Number

#### Step 2: Membership
- Member toggle checkbox
- If member → Member ID* field
- If not → "How did you hear about us?"* dropdown

#### Step 3: Final Details
- Dietary Restrictions* (textarea)
- Emergency Contact Name*
- Emergency Contact Phone*
- Consent checkbox*

#### Success Screen
- ✓ Checkmark animation
- "YOU'RE IN!" heading
- Unique Ticket ID
- QR Code for event check-in
- Download button + Home button

## 🎨 Design Highlights

### Color Scheme
```
Electric Blue:  #3939ff (Primary)
Sunshine:       #f2bb05 (Accent)
Flame:          #ff5b22 (CTA/Alert)
Midnight:       #1f1f1f (Text/Borders)
Cream:          #fdfbf1 (Background)
```

### Typography Stack
- **Bebas Neue** - Display/Headers
- **Barlow Condensed** - Subheadings
- **Inter** - Body/Forms

### Signature Effects
- **Neo-brutalist Shadows**: `box-shadow: 8px 8px 0px #1f1f1f`
- **Bold Borders**: 3-4px solid borders
- **High Contrast**: Vibrant colors on cream background
- **Smooth Animations**: Framer Motion transitions

## ✨ Interactions

1. **Hero CTAs**: 
   - Hover = Scale up + shadow shift
   - Click "Register Now" = Smooth scroll to form

2. **Form Steps**:
   - Validation on blur
   - Animated step indicator
   - Slide transitions between steps
   - Conditional fields (member toggle)

3. **Submit Flow**:
   - Loading state on button
   - Success animation
   - QR code generation
   - Download functionality

## 🛠️ Customization

### Change Primary Color
```ts
// tailwind.config.ts
colors: {
  electric: '#YOUR_COLOR', // Change this
}
```

### Edit Hero Text
```tsx
// app/components/Hero/ModernHero.tsx
<h1>YOUR TEXT HERE</h1>
```

### Add Form Fields
```tsx
// app/components/FormLedger/types.ts
export const registrationSchema = z.object({
  // Add your field here
  newField: z.string().min(1),
});
```

## 🚀 Deploy to Production

### Vercel (1-Click)
1. Push to GitHub
2. Import to Vercel
3. Deploy ✨

### Manual Build
```bash
npm run build
npm start
```

## 🐛 Troubleshooting

### Fonts not loading?
- Check internet connection (Google Fonts CDN)
- Clear browser cache

### Form validation not working?
- Ensure all required fields filled
- Check browser console for Zod errors

### Animations choppy?
- Check browser performance
- Disable hardware acceleration if needed

## 📱 Responsive Breakpoints

- **Mobile**: < 640px (stacked layout)
- **Tablet**: 640-1024px (adjusted typography)
- **Desktop**: > 1024px (full experience)

## 🎯 Next Steps

- [ ] Connect backend (Supabase/Firebase)
- [ ] Add email notifications
- [ ] Implement payment (Stripe)
- [ ] Create admin dashboard
- [ ] Add event calendar

## 💡 Pro Tips

- **Performance**: Use Lighthouse to check scores
- **Accessibility**: Test with screen readers
- **SEO**: Add meta tags in `app/layout.tsx`
- **Analytics**: Integrate Google Analytics/Plausible

---

**Need Help?** Check [README.md](./README.md) for full documentation.

**Design inspired by modern Gen-Z aesthetics** 🎨
