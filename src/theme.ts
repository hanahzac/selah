import { extendTheme } from '@chakra-ui/react'

export const theme = extendTheme({
  fonts: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'DM Sans', system-ui, sans-serif",
    mono: "'DM Mono', ui-monospace, monospace",
  },
  colors: {
    forest: { 50: '#edf4eb', 100: '#dce8d8', 500: '#36704d', 700: '#194631', 900: '#173827' },
    gold: { 100: '#f8e4b6', 300: '#ebc075', 500: '#b97834' },
    cream: { 50: '#faf8f3', 100: '#f6f3ec', 200: '#ebe7dc' },
  },
  styles: { global: { body: { bg: 'cream.100', color: 'forest.900' }, '*::selection': { background: '#dce8bd' } } },
})
