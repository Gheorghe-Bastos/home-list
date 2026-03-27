<script setup>

import { ref, inject } from 'vue'

const usuarioLogado = inject('usuarioLogadoP')
const taskInput = inject('taskP')
const erro = inject('erroP')
const tituloErro = inject('tituloErroP')
const descricaoErro = inject('descricaoErroP')
const limiteCaracteres = ref(80)


function criarTask() {
    erro.value = false

    if (taskInput.value.length > limiteCaracteres.value) {
        tituloErro.value = 'Opa! Você atingiu o limite de caracteres.'
        descricaoErro.value = `o limite maximo é de ${limiteCaracteres.value} caracteres`
        erro.value = true

        if (erro.value === true) {
            setTimeout(() => {
                erro.value = false
            }, 8000);
        }
    }
    else if (taskInput.value.trim() === '') {
        tituloErro.value = 'Opa!'
        descricaoErro.value = 'Você não escreveu nada ainda.'
        erro.value = true

        if (erro.value === true) {
            setTimeout(() => {
                erro.value = false
            }, 8000);
        }
    }
    else {
        usuarioLogado.value.arrayTask.push({
            textoTask: taskInput.value,
            concluida: false
        })

        taskInput.value = ''
        erro.value = false
    }
}

</script>

<template>
    <div class="flex flex-col items-center gap-3">
        <UInput highlight v-model="taskInput" @keydown.enter="criarTask" class="w-sm" icon="mdi:pencil-outline"
            size="xl" variant="subtle" placeholder="Escreva sua tarefa aqui" />
    </div>
</template>
