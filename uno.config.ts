import { defineConfig, presetAttributify, presetIcons, presetUno, presetWebFonts } from 'unocss'

/**
 * UnoCSS Configuration - Rucio WebUI Design System
 * Based on DESIGN_SYSTEM.md v1.0.0
 * Aligned with tailwind.config.js from webui
 */
export default defineConfig({
  shortcuts: [
    // Typography shortcuts
    {
      'heading-1': 'text-4xl font-bold text-neutral-900 dark:text-neutral-100',
      'heading-2': 'text-3xl font-bold text-neutral-800 dark:text-neutral-200',
      'heading-3': 'text-2xl font-semibold text-neutral-800 dark:text-neutral-200',
      'body-text': 'text-base text-neutral-700 dark:text-neutral-300',
      'body-small': 'text-sm text-neutral-600 dark:text-neutral-400',
      'caption': 'text-xs text-neutral-500 dark:text-neutral-500',
    },
    // Button variants
    {
      'btn': 'px-4 py-2 rounded-md font-medium transition-all duration-150',
      'btn-primary': 'btn bg-brand-600 text-white hover:bg-brand-700 active:scale-98',
      'btn-outline': 'btn border border-brand-600 text-brand-600 hover:bg-brand-50',
      'btn-ghost': 'btn text-brand-600 hover:bg-brand-50',
    },
    // Card/Surface variants
    {
      'card': 'bg-neutral-100 dark:bg-neutral-800 rounded-lg p-6 shadow-md',
      'card-elevated': 'bg-neutral-0 dark:bg-neutral-900 rounded-lg p-6 shadow-lg',
    },
  ],
  theme: {
    colors: {
      neutral: {
        0: '#ffffff',
        100: '#f1f5f9',
        200: '#e2e8f0',
        300: '#cbd5e1',
        400: '#94a3b8',
        500: '#64748b',
        600: '#475569',
        700: '#334155',
        800: '#1e293b',
        900: '#0f172a',
        1000: '#000000',
      },
      brand: {
        100: '#ede9fe',
        200: '#ddd6fe',
        300: '#c4b5fd',
        400: '#a78bfa',
        500: '#8b5cf6',
        600: '#7c3aed',
        700: '#6d28d9',
        800: '#5b21b6',
        900: '#4c1d95',
      },
      success: {
        100: '#dcfce7',
        200: '#bbf7d0',
        300: '#86efac',
        400: '#4ade80',
        500: '#22c55e',
        600: '#16a34a',
        700: '#15803d',
        800: '#166534',
        900: '#14532d',
      },
      error: {
        100: '#fee2e2',
        200: '#fecaca',
        300: '#fca5a5',
        400: '#f87171',
        500: '#ef4444',
        600: '#dc2626',
        700: '#b91c1c',
        800: '#991b1b',
        900: '#7f1d1d',
      },
      warning: {
        100: '#fef3c7',
        200: '#fde68a',
        300: '#fcd34d',
        400: '#fbbf24',
        500: '#f59e0b',
        600: '#d97706',
        700: '#b45309',
        800: '#92400e',
        900: '#78350f',
      },
      info: {
        100: '#e0f2fe',
        200: '#bae6fd',
        300: '#7dd3fc',
        400: '#38bdf8',
        500: '#0ea5e9',
        600: '#0284c7',
        700: '#0369a1',
        800: '#075985',
        900: '#0c4a6e',
      },
    },
    fontFamily: {
      sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: '"JetBrains Mono", "IBM Plex Mono", Menlo, Monaco, "Courier New", monospace',
    },
    fontSize: {
      xs: ['0.75rem', '1rem'],      // 12px / 16px
      sm: ['0.875rem', '1.25rem'],  // 14px / 20px
      base: ['1rem', '1.5rem'],     // 16px / 24px
      lg: ['1.125rem', '1.75rem'],  // 18px / 28px
      xl: ['1.25rem', '1.75rem'],   // 20px / 28px
      '2xl': ['1.5rem', '2rem'],    // 24px / 32px
      '3xl': ['1.875rem', '2.25rem'], // 30px / 36px
      '4xl': ['2.25rem', '2.5rem'], // 36px / 40px
      '5xl': ['3rem', '1'],         // 48px
      '6xl': ['3.75rem', '1'],      // 60px
      '7xl': ['4.5rem', '1'],       // 72px
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
    },
    borderRadius: {
      none: '0',
      sm: '0.125rem',     // 2px
      DEFAULT: '0.25rem', // 4px
      md: '0.375rem',     // 6px
      lg: '0.5rem',       // 8px
      xl: '0.75rem',      // 12px
      '2xl': '1rem',      // 16px
      '3xl': '1.5rem',    // 24px
      full: '9999px',
    },
    spacing: {
      0: '0',
      1: '4px',
      2: '8px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      8: '32px',
      10: '40px',
      12: '48px',
      16: '64px',
      20: '80px',
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      brand: '0 0 0 3px color-mix(in srgb, transparent, #8b5cf6 50%)',
      none: 'none',
    },
    transitionDuration: {
      75: '75ms',
      100: '100ms',
      150: '150ms',
      200: '200ms',
      300: '300ms',
      500: '500ms',
      700: '700ms',
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
      collections: {
        heroicons: () => import('@iconify-json/heroicons/icons.json').then(i => i.default),
      },
    }),
    presetWebFonts({
      fonts: {
        sans: 'Inter:400,500,600,700,800',
        mono: 'JetBrains Mono:400,500,600',
      },
    }),
  ],
})
