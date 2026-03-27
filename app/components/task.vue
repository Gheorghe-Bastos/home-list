<script setup>

import { inject } from 'vue';

const usuarioLogado = inject('usuarioLogadoP')
const erro = inject('erroP')
const tituloErro = inject('tituloErroP')
const descricaoErro = inject('descricaoErroP')

function excluirTask(index) {
  usuarioLogado.value.arrayTask.splice(index, 1)
}

function marcarTask(index) {
  usuarioLogado.value.arrayTask[index].concluida = !usuarioLogado.value.arrayTask[index].concluida
}

</script>

<template>
  <div v-if="erro" class="flex w-sm items-center">
      <UAlert
      color="error"
      :ui="{close: 'p-0'}"
      variant="subtle"
      :title="tituloErro" 
      :description="descricaoErro">
      </UAlert>
  </div>
  <div v-for="(task, index) in usuarioLogado.arrayTask" class="flex flex-col items-center w-full max-w-sm ">
    <UAlert :ui="{     
    actions: 'flex self-end absolute '
    }"
    classe="flex items-center"
    :color="task.concluida ? 'success' : 'primary'"
    variant="outline" 
    :title="'Tarefa ' + (index + 1)" 
    :description="task.textoTask"
    icon="mdi:invoice-text-edit">
      <template #actions>
        <UButton
        @click="excluirTask(index)"
        icon="mdi:delete-outline" 
        size="md" color="error"
        variant="subtle"/>
        <UButton
        @click="marcarTask(index)"
        icon="mdi:check-outline" 
        size="md" color="success" 
        variant="subtle"/>
      </template>
    </UAlert>
  </div>
</template>
