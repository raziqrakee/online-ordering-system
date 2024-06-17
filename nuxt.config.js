export default {
  // Global page headers
  head: {
    title: 'online-ordering-app',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/node_modules/bootstrap/dist/css/bootstrap.min.css'
  ],

  // Plugins to run before rendering page
  plugins: [
    '@/plugins/element-ui',
    { src: '~/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js', mode: 'client' }
  ],

  // Auto import components
  components: true,

  // Modules for dev and build (recommended)
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    '@nuxtjs/dotenv',
  ],

  // Axios module configuration
  axios: {
    baseURL: process.env.API_BASE_URL || 'http://localhost:8000',
  },

  // Build Configuration
  build: {
    transpile: [/^element-ui/],
  },

  // Router middleware
  router: {
    middleware: ['auth']
  },

  // Set the target to 'server' for SSR
  target: 'static'
}
