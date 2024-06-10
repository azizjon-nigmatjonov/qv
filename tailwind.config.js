module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './node_modules/@zach.codes/react-calendar/dist/**/*.js'],
  theme: {
    fontFamily: {
      display: ['Inter', 'sans-serif'],
      body: ['Inter', 'sans-serif'],
    },
    extend: {
      colors: {
        primary: '#0E73F6',
        secondary: '#6E8BB7',
        borderColor: '#E5E9EB',
        black: '#1A2024',
        blue: {
          tag_text_color: '#0452C8',
          tag_bg_color: '#D7EDFF',
        },
        yellow: {
          tag_text_color: '#D29404',
          tag_bg_color: '#FFFCC2',
        },
        green: {
          tag_text_color: '#119C2B',
          tag_bg_color: '#BBFBD0',
        },
        red: {
          600: '#F2271C',
          tag_text_color: '#F2271C',
          tag_bg_color: '#fbdfdd',
        },
      },
    },
    screens: {
      desktop: '1100px',
      tablet: '910px',
      sm: '768px',
      mobile: '280px',
    },
  },
  plugins: [],
}
