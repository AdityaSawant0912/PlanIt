/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'custom-cream': "#FDF9F9",
        'custom-cream2': "#FDF9F4",
        'custom-green': "#009B9A",
        'custom-yellow': "#F9BC60",
        'custom-blue': "#5271FF",
        'custom-white': "#F5F5F5",
        'custom-gray': "#E0E0E0",
      }
    }
  },
  plugins: [require('daisyui')],
  // daisyui: {
  //   themes: [
  //     {
  //       mytheme: {
  //         primary: '#2563eb',

  //         secondary: '#7B92B2',

  //         accent: '#67CBA0',

  //         neutral: '#3b82f6',

  //         'base-100': '#2A303C',

  //         info: '#3ABFF8',

  //         success: '#36D399',

  //         warning: '#FBBD23',

  //         error: '#F87272',
  //       },
  //     },
  //   ],
  // },
  // daisyui: {
  //   themes: ["cupcake", ],
  // },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#0097B2',
          secondary: '#FEDC79',
          accent: '#37cdbe',
          neutral: '#3d4451',
          'base-100': '#ffffff',
        }
      }
    ]
  }
}
