# How to Add Your JPG Images

## Folder Structure

Place all your image files inside the `public/` folder:

```
public/
├── my-profile.jpg          ← your profile photo
├── paintings/
│   ├── water-lilies.jpg
│   ├── impression-sunrise.jpg
│   ├── woman-parasol.jpg
│   ├── san-giorgio.jpg
│   ├── the-magpie.jpg
│   ├── japanese-bridge-1.jpg   ← first slide
│   └── japanese-bridge-2.jpg   ← second slide
└── clothing/
    ├── silk-dress.jpg
    ├── sunrise-scarf.jpg
    ├── giverny-jacket-front.jpg
    ├── giverny-jacket-back.jpg
    └── magpie-tote.jpg
```

## Single Image (no slideshow)

In `App.tsx`, set `imageUrl` to the path relative to `public/`:

```ts
{
  id: 'water-lilies',
  title: 'Water Lilies',
  imageUrl: './paintings/water-lilies.jpg',
  ...
}
```

## Slideshow (multiple images)

Replace `imageUrl` with an `images` array:

```ts
{
  id: 'bridge-giverny',
  title: 'The Japanese Bridge',
  images: [
    './paintings/japanese-bridge-1.jpg',
    './paintings/japanese-bridge-2.jpg',
    './paintings/japanese-bridge-3.jpg',
  ],
  ...
}
```

A "2 views" badge will automatically appear on the card thumbnail,
and left/right arrows + dot indicators will appear in the modal.

## Tips

- JPG quality 80–85% is fine; keeps file size small without visible loss
- Recommended painting size: 1200px wide
- Recommended clothing size: 800–1000px wide (portrait ratio looks best)
- Profile photo: 600×800px works perfectly
