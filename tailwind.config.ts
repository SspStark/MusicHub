import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'login-signup': "url('/images/musichub-bg.jpg')",
      },
    },
  },
  plugins: [],
}

export default config
