<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon (2).png' }
  ],
  htmlAttrs: {
    lang: 'pt-br'
  }
})

import { ref, provide, onMounted} from 'vue';
import footerComp from './components/footerComp.vue'
import headerComp from './components/headerComp.vue'

const title = 'Homelist'
const description = 'A production-ready starter template powered by Nuxt UI. Build beautiful, accessible, and performant applications in minutes, not hours.'

const task = ref('');
const usuarioLogado = ref(null)

const erro = ref(false)
const tituloErro = ref('')
const descricaoErro = ref('')

onMounted(async () => {

  const salvo = localStorage.getItem('usuario_sessao')
  if (salvo) {
    usuarioLogado.value = JSON.parse(salvo)
  }
})

provide('erroP', erro)
provide('tituloErroP', tituloErro)
provide('descricaoErroP', descricaoErro)
provide('usuarioLogadoP', usuarioLogado)
provide('taskP', task)

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterImage: 'https://ui.nuxt.com/assets/templates/nuxt/starter-light.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <div class="flex flex-col min-h-screen">
      <header>
        <headerComp />
      </header>

      <main class="flex flex-1 flex-col items-center">
        <NuxtPage />
      </main>

      <footer class="flex w-full sticky">
        <footerComp />
      </footer>
    </div>
  </UApp>
</template>
