# PRO-AGG Hero Slider Documentation

## Overview

The PRO-AGG Hero Slider is a custom Shopify Dawn theme section built specifically for Adventure Getaway Gear. It provides a feature-rich, accessible, and performant hero slider with extensive customization options.

## Files

- **Section**: `sections/pro_agg_hero_slider.liquid`
- **CSS**: `assets/pro_agg_hero_slider.css`
- **JavaScript**: `assets/pro_agg_hero_slider.js`

## Key Features

### 1. Multi-Slide Support
- Support for up to 10 slides
- Each slide can have unique content, images, and CTAs
- Preset includes 3 slides by default

### 2. 9-Point Content Positioning
Each slide's content can be positioned at any of 9 grid points:
- **Vertical**: Top, Middle, Bottom
- **Horizontal**: Left, Center, Right
- **Fine-tuning**: X/Y offset controls (±200px)

### 3. Mobile Optimization

#### Separate Mobile Images
- Optional mobile-specific images
- Falls back to desktop image if not set
- Landscape orientation on mobile uses desktop layout

#### Responsive Heights
- **Desktop**: Min 300px - Max 1200px (default: 500-700px)
- **Mobile**: Min 200px - Max 800px (default: 400-600px)

#### Mobile-Specific Positioning
- Separate vertical/horizontal positioning for mobile
- Default: Bottom-center for mobile, Center-center for desktop

### 4. CTA Buttons

#### Flexibility
- Up to 2 CTA buttons per slide
- Three styles: Primary, Secondary, Outline
- Individual links for each button

#### Layout Options
- **Desktop**: Side-by-side or Stacked
- **Mobile**: Always stacked for touch-friendliness
- Option to hide second CTA on mobile

### 5. Color Controls
- Separate text colors for desktop and mobile
- Per-slide image overlay opacity (0-100%)
- Respects Dawn theme color schemes

### 6. Animation Options

#### Slide Transitions
- **Slide**: Horizontal slide transition
- **Fade**: Cross-fade between slides

#### Content Animations
- **None**: No animation
- **Fade**: Fade in
- **Slide Up**: Slide up from below
- **Zoom**: Zoom in effect

### 7. Autoplay & Controls

#### Autoplay
- Toggle on/off
- Configurable speed (3-10 seconds)
- Pause on hover option
- Respects reduced motion preferences

#### Navigation
- Previous/Next arrow buttons
- Navigation dots
- Play/Pause button
- All controls can be toggled on/off

### 8. Accessibility

#### ARIA Support
- Proper ARIA roles and labels
- `role="region"` for slider
- `role="group"` for slides
- `role="tab"` for navigation dots

#### Keyboard Navigation
- **Left Arrow**: Previous slide
- **Right Arrow**: Next slide
- **Home**: First slide
- **End**: Last slide

#### Screen Readers
- Live region announcements for slide changes
- Descriptive labels for all controls
- Alternative text for images (with fallback to heading)

#### Reduced Motion
- Detects `prefers-reduced-motion` setting
- Disables all animations when enabled
- Stops autoplay automatically

### 9. Performance Optimization

#### Image Loading
- **First slide**: `loading="eager"`, `fetchpriority="high"`
- **Other slides**: `loading="lazy"`
- Responsive images with multiple breakpoints

#### Image Sizes
- **Desktop**: 375, 550, 750, 1100, 1500, 1780, 2000, 3000, 3840 px
- **Mobile**: 375, 550, 750, 1100, 1500 px
- Uses `sizes="100vw"` for optimal loading

### 10. Touch Support
- Swipe gestures on mobile
- Drag threshold: 50px
- Pauses autoplay during interaction
- Prevents vertical scroll during horizontal swipe

## Usage

### Adding the Section

1. In Shopify admin, go to Online Store > Themes
2. Click "Customize" on your theme
3. Click "Add section"
4. Select "PRO-AGG Hero Slider"

### Configuring Global Settings

#### Slider Settings
- **Auto-rotate slides**: Enable/disable autoplay
- **Auto-rotate speed**: Set speed in seconds (3-10)
- **Pause on hover**: Pause when user hovers
- **Transition type**: Choose Slide or Fade
- **Content animation**: Choose animation style

#### Controls
- **Show navigation arrows**: Toggle prev/next buttons
- **Show navigation dots**: Toggle dot indicators
- **Show play/pause button**: Toggle play/pause control

#### Heights
Set minimum and maximum heights for desktop and mobile independently

#### Accessibility
- **Slider description**: Describe the slider for screen readers

### Configuring Individual Slides

Each slide block has the following settings:

#### Images
- **Desktop image**: Main image for desktop/tablet
- **Mobile image**: Optional mobile-specific image
- **Image alt text**: Alternative text (defaults to heading)
- **Image overlay opacity**: Dark overlay (0-100%)

#### Content
- **Heading**: Main heading text (supports rich text)
- **Heading size**: Small, Medium, Large, or Extra Large
- **Subheading**: Secondary text (supports rich text)
- **Subheading size**: Small, Medium, or Large

#### Desktop Positioning
- **Vertical position**: Top, Middle, or Bottom
- **Horizontal position**: Left, Center, or Right
- **Horizontal offset**: Fine-tune X position (±200px)
- **Vertical offset**: Fine-tune Y position (±200px)

#### Mobile Positioning
- **Vertical position**: Top, Middle, or Bottom
- **Horizontal position**: Left, Center, or Right

#### Colors
- **Desktop text color**: Color picker for desktop
- **Mobile text color**: Color picker for mobile

#### Call to Action 1
- **Button text**: CTA button text
- **Button link**: URL for the button
- **Button style**: Primary, Secondary, or Outline

#### Call to Action 2
- **Button text**: Second CTA button text
- **Button link**: URL for the button
- **Button style**: Primary, Secondary, or Outline

#### CTA Layout
- **Desktop layout**: Side by side or Stacked
- **Hide second CTA on mobile**: Toggle visibility

## Customization

### CSS Custom Properties

The slider uses CSS custom properties that can be overridden:

```css
#ProAggSlider-[section-id] {
  --pro-agg-desktop-min-height: 500px;
  --pro-agg-desktop-max-height: 700px;
  --pro-agg-mobile-min-height: 400px;
  --pro-agg-mobile-max-height: 600px;
}
```

### Per-Slide Custom Properties

```css
#ProAggSlide-[section-id]-[index] .pro_agg_slide__content {
  --desktop-text-color: #ffffff;
  --mobile-text-color: #ffffff;
}
```

### Theme Integration

The slider respects Dawn theme settings:
- `--color-button` and `--color-button-text` for primary buttons
- `--color-background` and `--color-foreground` for secondary buttons
- `--color-foreground` for control button colors

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IE11 not supported (uses CSS Grid, Custom Elements)
- Progressive enhancement for older browsers

## Theme Editor Support

The slider integrates with Shopify's theme editor:
- Click any slide block to navigate to it
- Autoplay pauses when editing
- Changes reflect in real-time

## Best Practices

### Images
- Use high-quality images (recommended: 3840x2160 for desktop)
- Provide mobile images for better mobile performance
- Use descriptive alt text for SEO and accessibility

### Content
- Keep headings concise (1-8 words)
- Limit subheadings to 1-2 sentences
- Use clear, action-oriented CTA text

### Performance
- Limit to 5 slides for optimal performance
- Compress images before uploading
- Use WebP format when possible (Shopify handles this)

### Accessibility
- Always provide alt text for images
- Use sufficient color contrast (WCAG AA minimum)
- Test with keyboard navigation
- Test with screen readers

### Mobile
- Always preview on actual mobile devices
- Test touch gestures
- Verify text readability on small screens
- Consider hiding secondary CTA on mobile

## Troubleshooting

### Slider not auto-rotating
- Check if autoplay is enabled in settings
- Check if user has reduced motion enabled
- Verify JavaScript is loading (check browser console)

### Content not positioned correctly
- Check vertical/horizontal position settings
- Adjust offset values if needed
- Verify CSS is loading

### Images not loading
- Verify images are uploaded
- Check image URLs in browser console
- Ensure images are not too large (max 20MB)

### Touch gestures not working
- Ensure JavaScript is loading
- Check for JavaScript errors in console
- Verify touch events are not blocked by other scripts

## Development Notes

### Naming Conventions
All custom classes and IDs use the `pro_agg_` prefix to avoid conflicts with Dawn theme and other sections.

### Code Structure
- **Liquid**: Follows Dawn patterns, uses semantic HTML
- **CSS**: Mobile-first approach, uses CSS custom properties
- **JavaScript**: ES6+ custom element, no dependencies

### Dependencies
- Uses Dawn's icon SVGs (icon-caret, icon-pause, icon-play)
- No external JavaScript libraries required
- Compatible with Dawn theme CSS

## Version History

### Version 1.0.0 (Initial Release)
- Full feature implementation as specified
- Comprehensive accessibility support
- Mobile optimization
- Performance optimizations
- Theme editor integration

## Support

For issues or feature requests, contact the development team or create an issue in the GitHub repository.

## License

This custom section is proprietary to Adventure Getaway Gear and is part of the AGG Dawn theme customization.
