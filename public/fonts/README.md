# 3D Font Setup

The 3D wooden sign requires a Three.js compatible font file.

## Steps to Generate Font

1. Visit [Facetype.js](https://gero3.github.io/facetype.js/)
2. Upload **Barlow Condensed Bold** font file (download from Google Fonts)
3. Download the generated JSON file
4. Save it as `barlow_condensed_bold.json` in this directory

## Alternative Solutions

If you don't want to use custom fonts:

### Option 1: Use a built-in Three.js font
Replace the font path in `WoodenSign.tsx`:
```tsx
font="/fonts/helvetiker_bold.typeface.json"
```

### Option 2: Use Sprite Text
Replace Text3D with a texture-based solution:
```tsx
import { Text } from '@react-three/drei';

<Text
  color="#d4a574"
  fontSize={0.25}
  maxWidth={3}
  lineHeight={1}
  letterSpacing={0.02}
  textAlign="center"
  font="/fonts/BarlowCondensed-Bold.woff"
>
  Created 2 Connect
</Text>
```

### Option 3: Simplify to 2D
Remove 3D text entirely and use CSS text over the scene with a wooden texture background.



