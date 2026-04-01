<script setup>

import { inject } from 'vue'

const usuarioLogado = inject('usuarioLogadoP')

function voltar() {
  usuarioLogado.value = null
  localStorage.removeItem('usuario_sessao')
  navigateTo('/')
}

</script>

<template>
  <UHeader :toggle="{
    color: 'primary',
    variant: 'subtle',
    class: 'rounded-full'
  }">
    <template #title>
      <div class="flex justify-center items-center">
        <img src="/favicon (2).png" class="w-17 h-auto object-contain" />
        <h1 class="text-3xl mt-4">Homelist</h1>
      </div>
    </template>


    <template #right>
      <UButton v-if="usuarioLogado" @click="voltar" color="primary" variant="ghost" to="/" icon="tabler:arrow-back-up" aria-label="Home" />
      
      <UColorModeButton color="primary" />

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton color="primary" variant="ghost" to="https://github.com/Gheorghe-Bastos" target="_blank"
          icon="i-simple-icons-github" aria-label="GitHub" />
      </UTooltip>
    </template>
  </UHeader>
</template>
