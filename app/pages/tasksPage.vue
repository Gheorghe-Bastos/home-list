<script setup>
import PreencherTask from '~/components/preencherTask.vue';
import task from '~/components/task.vue';
import { inject } from 'vue'

const usuarioLogado = inject('usuarioLogadoP')

</script>

<template>
  <div class="flex flex-col items-center">
    <UPageHero title="Homelist - O Lar das Tarefas" description="Faça suas anotações onde, como e quando você quiser!"
      :ui="{
        container: 'flex flex-col py-0 sm:py-4 lg:py-17'
      }" />
    <div class="flex flex-col w-full gap-2 items-center">
      
      <UUser
        :name="usuarioLogado.nome"
        description="Software Engineer"
        :avatar="{
          src: 'https://i.pravatar.cc/150?u=john-doe',
          loading: 'lazy',
          icon: 'i-lucide-image'
        }"
      />

      <PreencherTask />
      <div class="h-95 sm:h-76 md:h-78
            lg:h-80 flex gap-1.5 flex-col items-center w-full overflow-y-auto">
        <task />
      </div>
    </div>
  </div>
</template>
