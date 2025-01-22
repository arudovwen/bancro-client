// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  site: {
    url: "",
  },
  nitro: {
    baseURL: "/",
    prerender: {
      crawlLinks: true,
    },
  },
  image: {
    inject: true,
    cloudinary: {
      baseURL: "https://res.cloudinary.com/arudovwen-me/image/upload/",
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "@vee-validate/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/google-fonts",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
    "nuxt-swiper",
    "@nuxt/image",
    "@nuxt/devtools",
    '@vueuse/nuxt',
  ],

  runtimeConfig: {
    public: {
      API_BASE_URL: process.env.API_BASE_URL,
      APP_BASE_URL: process.env.APP_BASE_URL,
      APP_MONNIFYAPIKEY: process.env.APP_MONNIFYAPIKEY,
      APP_MONNIFYCONTRACTCODE: process.env.APP_MONNIFYCONTRACTCODE,
      APP_MONNIFYISTEST: process.env.APP_MONNIFYISTEST,
      APP_MONNIFYISTESTMODE: process.env.APP_MONNIFYISTESTMODE,
      TINY_MCE: process.env.APP_TINYMCE_KEY,
      PUBLIC_KEY: process.env.PUBLIC_KEY,
      TENANT_ID: process.env.TENANT_ID
    },
  },
  ssr: false,
  spaLoadingTemplate: true,
  router: {
    options: {
      hashMode: false,
    },
  },
  // plugins: ["~/plugins/pdf-viewer.client.js"],
  // @ts-ignore
  colorMode: {
    classSuffix: "",
  },
  css: [
    "vue-toastification/dist/index.css",
    "vue3-carousel/dist/carousel.css",
    "~/assets/css/tailwind.css",
    "~/assets/scss/_button.scss",
    "~/assets/scss/_form.scss",
    "~/assets/scss/style.scss",
  ],
  googleFonts: {
    families: {
      Onest: [100, 200, 300, 400, 500, 600, 700, 800], // Enable the IntInterer font
    },
  },
  devtools: { enabled: process.env.NODE_ENV === "development" },

  app: {
    head: {
      title: " Bancro",
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1 ",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Bancro ",
        },
        {
          hid: "og:title",
          property: "og:title",
          content: "Bancro",
        },
        {
          hid: "og:description",
          property: "og:description",
          content: "Bancro ",
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "",
        }, // Add OG image URL
        // Twitter Tags
        {
          hid: "twitter:card",
          name: "twitter:card",
          content: "",
        }, // Use 'summary_large_image' for large images
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: "Bancro",
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: "Bancro ",
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "URL to your Twitter image",
        }, // Add Twitter image URL
        {
          name: "keywords",
          content: "Bancro",
        }, // Add relevant keywords
        { name: "author", content: "Success Ahon" }, // Add author information
        { name: "robots", content: "index, follow" }, // Control search engine indexing
        { name: "theme-color", content: "#183329" }, // Set the theme color for mobile browsers
      ],
    },
  },
  routes: { "/": { prerender: true }, "/*": { cors: true } },
});
