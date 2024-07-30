<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html {
  scroll-behavior: smooth;
  box-sizing: border-box;
}
body {
  font-family: "Inter", sans-serif;
  color: #333333;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
.dark-mode {
  @apply text-white bg-gray-800;
}

.light-mode {
  @apply text-[#333] bg-white;
}

.recommended .carousel__viewport .carousel__track {
  column-gap: 24px;
  @media (max-width: 768px) {
    column-gap: 16px;
  }
  @media (max-width: 465px) {
    column-gap: 10px;
  }
  .carousel__prev {
    left: -26px !important;
  }
  .carousel__next {
    right: -26px !important;
  }
}
.carousel__viewport .carousel__track {
  column-gap: 34px;
  @media (max-width: 768px) {
    column-gap: 16px;
  }
  @media (max-width: 465px) {
    column-gap: 10px;
  }
}
.carousel__prev {
  left: -26px !important;
}
.carousel__next {
  right: -26px !important;
}
body::-webkit-scrollbar,
body {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

/* width */
::-webkit-scrollbar {
  width: 5px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #ffffff;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #ececec;
  border-radius: 8px;
  height: 100px;
}

::-webkit-scrollbar:horizontal {
  width: 5px;
  height: 5px;
}

/* Track */
::-webkit-scrollbar-track:horizontal {
  background: #ffffff;
}

/* Handle */
::-webkit-scrollbar-thumb:horizontal {
  background: #ececec;
  width: 50px;
  border-radius: 8px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  opacity: 0.9;
}
label,
.input-label {
  color: #6a6c6a !important;
  font-size: 12px;
  font-weight: 400;
}
</style>

<script setup>
useHead(
  {
    title: "Bancro",
    charset: "utf-8",
    viewport: "width=device-width, initial-scale=1",
    meta: [
      {
        hid: "description",
        name: "description",
        content: "Bancro.",
      },
      {
        hid: "og:title",
        property: "og:title",
        content: "Bancro ",
      },
      {
        hid: "og:description",
        property: "og:description",
        content: "Bancro",
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "https://matta.trade/img/3.png",
      }, // Add OG image URL
      // Twitter Tags
      {
        hid: "twitter:card",
        name: "twitter:card",
        content: "https://matta.trade/img/3.png",
      }, // Use 'summary_large_image' for large images
      {
        hid: "twitter:title",
        name: "twitter:title",
        content: "Bancro ",
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
        content: "Bancro, Business",
      }, // Add relevant keywords
      { name: "author", content: "Success Ahon" }, // Add author information
      { name: "robots", content: "index, follow" }, // Control search engine indexing
      { name: "theme-color", content: "#183329" }, // Set the theme color for mobile browsers
    ],
    script: [
      {
        src: "https://sdk.monnify.com/plugin/monnify.js",

        defer: true,
      },
      {
        src: "https://kit.fontawesome.com/c1a534ffdb.js",
        crossorigin: "anonymous",
        defer: true,
      },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://unicons.iconscout.com/release/v4.0.0/css/line.css",
      },
    ],
  },
  {
    mode: "client", // Load the script 'strict-dynamically' on client-side only
  }
);

import AOS from "aos";
import "aos/dist/aos.css";

onMounted(() => {
  AOS.init();
});
</script>
