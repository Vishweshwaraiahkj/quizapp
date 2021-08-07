// used for local https security
// import path from 'path'
// import fs from 'fs'

export default {

  server: {     
   // port: 3000, // default: 3000     
    host: '192.168.1.9', // default: localhost   
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'MyExamAim >> Free Online Mock Test',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description',
       content: 'MyExamAim Karnataka Police Constable (PC) Previous Year Question Papers Online Test' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.png' }]
 
    
  },

  loading: {
    color: 'blue',
    height: '3px'
  },

  // used for local https security
  // server: {
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
  //     cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
  //   }
  // },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~plugins/fb_login.client.js', // renders only in client side as appended with .client
    '~plugins/axios.js', // renders in both client & server
    '~plugins/errorHandler.client.js', // global error handler methods plugin file
    '~plugins/regChecks.client.js' // a plugin for regualr checks
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    //'@nuxtjs/eslint-module',
    
    // https://go.nuxtjs.dev/stylelint
    '@nuxtjs/stylelint-module',
  ],

  // this code is related to google analytics
  googleAnalytics: {
    // Use as fallback if no runtime config is provided
    id: process.env.GOOGLE_ANALYTICS_ID
  },
  publicRuntimeConfig: {
    googleAnalytics: {
      id: process.env.GOOGLE_ANALYTICS_ID,
      asyncID: async (context) => { 
        /* do something */
        return process.env.GOOGLE_ANALYTICS_ID 
      },
      debug: {
        enabled: true,
        sendHitTask: true
      },
      checkDuplicatedScript: true,
      disableScriptLoader: true
    }
  },

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    // https://auth.nuxtjs.org
    '@nuxtjs/auth',
    // proxy for CORS issues
    '@nuxtjs/proxy',
    // to add resources like scss variables etc
    '@nuxtjs/style-resources',

    '@nuxtjs/google-analytics'
    
  ],

  googleAnalytics: {
    id: 'UA-148603757-1',
    debug: {
      enabled: false, // default value
      trace: false, // default value
      sendHitTask: true // default value
    }
  },
  
  publicRuntimeConfig: {
    googleAnalytics: {
      id:'UA-148603757-1',
       debug: {
    enabled: false, // default value
    trace: false, // default value
    sendHitTask: true // default value
  }
    }
  },

  styleResources: {
    scss: ['~/assets/scss/variables.scss', '~assets/styles/globals.scss']
  },

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'http://myexamaim-env.eba-33wdzvt4.us-east-2.elasticbeanstalk.com/',
    retry: { retries: 3 }
  },

  // Content module configuration (https://go.nuxtjs.dev/content-config)
  content: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: ['@nuxtjs/auth']
  },

  // Build Configuration
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: '/oauth/token',
            method: 'post',
            propertyName: 'access_token'
          },
          logout: false,
          user: false
        }
      }
    }
  },
  router: {
    middleware: ['auth']
  }
}
