module.exports = {
  content: [
      './index.html',
      './src/**/*.{html,js}'
    ],
  theme: {
    screens: {
      'phone': '640px',
      'tablet': '768px',
      'laptop': '1280px',
    },
    extend: {
      fontFamily: {
        // Note that Tailwind does not automatically escape font names for you. If you’re using a font that contains an invalid identifier, wrap it in quotes or escape the invalid characters.
        'trueno' : ['Trueno', 'sans-serif'],
        'fira-code' : ['"Fira Code"', 'monospace'],
        'fira-sans' : ['"Fira Sans"', 'sans-serif'],
        'lato' : ['Lato', 'sans-serif'],
        'open-sans' : ['"Open Sans"', 'sans-serif'],
        'noto-sans' : ['"Noto Sans"', 'sans-serif']
      },
    },
  },
  plugins: [],
}
