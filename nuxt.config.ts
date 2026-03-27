// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase', 
    '@nuxt/ui',
    '@nuxt/eslint'
  ],

  supabase: {
    redirect: false // Mantenha false para evitar loops de redirecionamento agora
  },

  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }
  },

  colorMode: {
    preference: 'dark', // Define o padrão como escuro
    fallback: 'dark',   // Se não detetar preferência do sistema, usa escuro
    storageKey: 'nuxt-color-mode'
  },

  devtools: {
    enabled: true
  },

  css: ['~/assets/css/main.css'],

  routeRules: {
    '/': { prerender: true }
  },

  compatibilityDate: '2025-01-15',

  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})
