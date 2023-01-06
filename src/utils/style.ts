import { apply, css, defineConfig } from "@twind/core"
import presetAutoprefix from "@twind/preset-autoprefix"
import presetTailwind from "@twind/preset-tailwind"
import presetLineClamp from "@twind/preset-line-clamp"
import presetTailwindForms from "@twind/preset-tailwind-forms"

export default defineConfig({
  darkMode: "class",
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        gray: {
          50: "#f2f2f2",
          100: "#d9d9d9",
          200: "#bfbfbf",
          300: "#a6a6a6",
          400: "#8c8c8c",
          500: "#737373",
          600: "#595959",
          700: "#404040",
          800: "#262626",
          900: "#0d0d0d",
        },
      },
    },
  },
  preflight: (preflight: any) => css`
    ${preflight}
    /* width */
    .scrollbar::-webkit-scrollbar {
      width: 10px;
    }

    /* Track */
    .scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }

    /* Handle */
    .scrollbar::-webkit-scrollbar-thumb {
      background: transparent;
    }

    /* Handle on hover */
    .scrollbar::-webkit-scrollbar-thumb:hover {
      background: #555;
    }
    /* Handle on hover */
    .scrollbar::-webkit-scrollbar-track:hover {
      background: #f1f1f1;
    }
  `,
  presets: [
    presetAutoprefix(),
    presetTailwind(),
    presetTailwindForms(),
    presetLineClamp(),
  ],
})
