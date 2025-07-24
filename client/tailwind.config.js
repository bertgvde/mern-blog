/* eslint-disable no-undef */
    /** @type {import('tailwindcss').Config} */
    export default {
      content: [
        "./src/**/*.{html,js,ts,jsx,tsx}",
        "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
      ],
      theme: {
        extend: {
        },
      },
      plugins: [require('flowbite/plugin')],
    }

