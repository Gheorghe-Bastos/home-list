<script setup lang="ts">

</script>

<template>
  <UHeader :toggle="{
    color: 'primary',
    variant: 'subtle',
    class: 'rounded-full'
  }">
    <template #title>
      <div class="flex justify-center items-center">
        <img src="/Salo Hometech logo.png" class="w-10 h-auto object-contain" />
        <h1 class="text-3xl">Homelist</h1>
      </div>
    </template>


    <template #right>
      <UColorModeButton color="primary" />

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton color="primary" variant="ghost" to="https://github.com/nuxt/ui" target="_blank"
          icon="i-simple-icons-github" aria-label="GitHub" />
      </UTooltip>
    </template>
  </UHeader>
</template>
