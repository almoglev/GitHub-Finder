module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: true, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      //'light',
      'dark',
      //'synthwave',
      //'retro',
      //'cyberpunk',
      //'valentine',
      //'halloween',
      //'garden',
      //'forest',
      //'aqua',
      //'lofi',
      //'pastel',
      //'fantasy',
      //'wireframe',
      //'black',
      //'luxury',
      //'dracula',
      //'cmyk',
    ],
  },
}
