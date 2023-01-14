import { css, defineConfig } from "@twind/core"
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

    body {
      font-family: -apple-system, BlinkMacSystemFont, segoe ui, helvetica neue,
        Arial, noto sans, sans-serif, apple color emoji, segoe ui emoji,
        segoe ui symbol, noto color emoji !important;
    }

    .scrollbar::-webkit-scrollbar {
      width: 5px;
    }

    .scrollbar::-webkit-scrollbar-track {
      background: transparent;
    }

    .scrollbar::-webkit-scrollbar-thumb {
      background: transparent;
    }

    .scrollbar::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    .scrollbar::-webkit-scrollbar-track:hover {
      background: #f1f1f1;
    }

    .article-body {
      @apply text-lg leading-7;
    }

    .article-body h1,
    .article-body h2,
    .article-body h3,
    .article-body h4,
    .article-body h5,
    .article-body h6 {
      @apply my-4 font-bold;
    }

    .article-body h1 {
      @apply text-2xl md:text-4xl;
    }

    .article-body h2 {
      @apply text-xl md:text-3xl;
    }

    .article-body h3 {
      @apply text-lg md:text-2xl;
    }

    .article-body h4 {
      @apply text-base md:text-xl;
    }

    .article-body a {
      @apply text-primary-500 duration-200 hover:text-primary-600;
    }

    .dark .article-body a {
      @apply link-underline text-gray-500;
    }

    .dark .article-body a {
      background-image: linear-gradient(transparent, transparent),
        linear-gradient(#6b7280, #6b7280);
    }

    .article-body {
      @apply pt-4;
    }

    .article-body p {
      @apply text-base leading-[24px] md:text-lg md:leading-[32px];
    }

    .article-body p:not(:last-child) {
      @apply mb-6;
    }

    .article-body img {
      @apply h-auto max-h-full max-w-full rounded-md;
    }

    .article-body blockquote {
      @apply border-l-4 border-gray-200 p-4;
    }

    .article-body li {
      @apply ml-6 mb-2 text-base md:ml-12 md:text-lg;
    }

    .article-body ul {
      position: relative;
    }

    .article-body ul::before {
      content: " ";
      position: absolute;
      top: 0;
      bottom: 0;
      width: 5px;
      height: 100%;
      background: #0000001c;
      border-radius: 10px;
    }

    .article-body ul::before {
      @apply left-[3px] dark:bg-[#ffffff1c] md:left-[20px];
    }

    .article-body ul,
    .article-body figure {
      @apply my-4;
    }

    .article-body iframe {
      @apply relative m-0 aspect-video h-auto w-full rounded-md align-baseline;
    }

    .article-body figcaption {
      @apply text-center text-xs italic;
    }

    .article-body hr {
      @apply mx-4 mb-4 text-gray-400;
    }

    .dark .article-body .IRPP_kangoo .ctaText {
      color: #ffffff9c;
    }

    .article-body .IRPP_kangoo:hover .ctaText,
    .article-body .IRPP_kangoo:hover .postTitle {
      @apply opacity-60 transition-opacity duration-200;
    }

    .dark .article-body .postTitle {
      color: rgb(229 231 235 / var(--tw-text-opacity));
    }

    #ez-toc-container.ez-toc-transparent {
      background: none;
    }

    div#ez-toc-container {
      width: 100%;
    }

    div#ez-toc-container {
      padding-right: 20px;
    }

    #ez-toc-container {
      background: #f9f9f9;
      border: 1px solid #aaa;
      border-radius: 4px;
      -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
      box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
      display: table;
      margin-bottom: 1em;
      padding: 10px;
      position: relative;
      width: auto;
    }

    #ez-toc-container > [type="checkbox"],
    .cssicon,
    .cssiconcheckbox {
      @apply hidden;
    }
  `,
  presets: [
    presetAutoprefix(),
    presetTailwind(),
    presetTailwindForms(),
    presetLineClamp(),
  ],
})
