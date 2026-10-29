/**
 * Semantic design tokens for the mobile app.
 *
 * These tokens mirror the naming conventions used in web artifacts (index.css)
 * so that multi-artifact projects share a cohesive visual identity.
 *
 * Replace the placeholder values below with values that match the project's
 * brand. If a sibling web artifact exists, read its index.css and convert the
 * HSL values to hex so both artifacts use the same palette.
 *
 * To add dark mode, add a `dark` key with the same token names.
 * The useColors() hook will automatically pick it up.
 */

const colors = {
  light: {
    text: '#193A32',
    tint: '#1D5A48',

    background: '#F7F4ED',
    foreground: '#193A32',

    card: '#FFFCF6',
    cardForeground: '#193A32',

    primary: '#1D5A48',
    primaryForeground: '#ffffff',

    secondary: '#E5EEE7',
    secondaryForeground: '#1D5A48',

    muted: '#EDE8DD',
    mutedForeground: '#718078',

    accent: '#D7E8DA',
    accentForeground: '#1D5A48',

    destructive: '#B45345',
    destructiveForeground: '#ffffff',

    border: '#DCE2D9',
    input: '#E7E8E1',
  },

  radius: 18,
};

export default colors;

