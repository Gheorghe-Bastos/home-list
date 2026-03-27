<script setup>

import { inject } from 'vue';

const supabase = useSupabaseClient()
const usuarioLogado = inject('usuarioLogadoP')
const erro = inject('erroP')
const tituloErro = inject('tituloErroP')
const descricaoErro = inject('descricaoErroP')

async function atualizarBanco() {
  await supabase
    .from('perfis')
    .update({ tasks: usuarioLogado.value.tasks })
    .eq('id', usuarioLogado.value.id)

  localStorage.setItem('usuario_sessao', JSON.stringify(usuarioLogado.value))
}

async function excluirTask(index) {
  usuarioLogado.value.tasks.splice(index, 1)
  await atualizarBanco()
}

async function marcarTask(index) {
  usuarioLogado.value.tasks[index].concluida = !usuarioLogado.value.tasks[index].concluida
  await atualizarBanco()
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
  <div v-for="(task, index) in usuarioLogado?.tasks" class="flex flex-col items-center w-full max-w-sm ">
    <UAlert :ui="{     
    actions: 'flex self-end absolute ',
    root: 'break-words'
    }"
    classe="flex items-center"
    :color="task.concluida ? 'success' : 'primary'"
    variant="outline" 
    :title="'Tarefa ' + (index + 1)"
    icon="mdi:invoice-text-edit">
      <template #description>
        <p class="max-w-[75%]">{{ task.textoTask }}</p>
      </template>
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
