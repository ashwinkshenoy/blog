export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "dns-prefetch", href: "//use.typekit.net" },
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      // Font prefetch
      {
        rel: "preload",
        href:
          "https://use.typekit.net/af/572508/00000000000000003b9b1a96/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n3&v=3",
        as: "font",
        type: "font/woff2",
        crossorigin: "anonymous"
      },
      {
        rel: "preload",
        href:
          "https://use.typekit.net/af/7158ff/00000000000000003b9b1a9c/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n6&v=3",
        as: "font",
        type: "font/woff2",
        crossorigin: "anonymous"
      },
      // Font
      {
        rel: "stylesheet",
        type: "text/css",
        href: "https://use.typekit.net/cnc8rvf.css"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    "bootstrap-vue/nuxt",
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/proxy"
  ],
  proxy: {
    "/posts": {
      target: "https://truecaller.blog/wp-json/wp/v2"
    },
    "/tags": {
      target: "https://truecaller.blog/wp-json/wp/v2"
    },
    "/categories": {
      target: "https://truecaller.blog/wp-json/wp/v2"
    }
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods":
        "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD"
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
