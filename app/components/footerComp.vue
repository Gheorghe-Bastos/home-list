<script setup lang="ts">

</script>

<template>
    <UFooter
    :ui="{
        container: 'py-1 lg:py-4 lg:flex',
    }"
    class="flex items-center justify-center w-full border-t border-default">
      <p class="text-muted text-sm">Powered by SALO - Hometech - © {{ new Date().getFullYear() }}</p>
    </UFooter>
</template>
