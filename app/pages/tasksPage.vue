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
    <div v-if="usuarioLogado" class="flex flex-col w-full gap-2 items-center">
    
      <div class="flex w-sm justify-between">
        <div class="flex justify-center gap-1">
        <UAvatar :alt="usuarioLogado?.nome" size="md" />
        <UUser
          :name="usuarioLogado?.nome"
        />
        </div>
        <UDrawer>
          <UButton label="Estatísticas" color="neutral" variant="subtle" trailing-icon="i-lucide-chevron-up" />

          <template #content>
            <Placeholder class="flex h-0 w-sm m-4 items-center justify-center"/>
            <div class="flex items-center justify-center my-24 flex-col">
              <p class=" text-primary">Total de tarefas: {{ usuarioLogado.tasks.length }}</p>
              <p class=" text-success">Tarefas feitas: {{ usuarioLogado.tasks.filter(tasks => tasks.concluida === true).length }}</p>
              <p class=" text-error">Tarefas para fazer: {{ usuarioLogado.tasks.filter(tasks => tasks.concluida === false).length }}</p>
            </div>
          </template>
        </UDrawer>
        

      </div>

      <PreencherTask />
      <div class="h-95 sm:h-76 md:h-78
            lg:h-80 flex flex-col items-center w-full overflow-y-auto">
        <task />
      </div>
    </div>
  </div>
</template>
