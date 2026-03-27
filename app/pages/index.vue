<script setup>
import { inject, reactive} from 'vue'

const arrayUsuario = inject('arrayUsuarioP')
const usuarioLogado = inject('usuarioLogadoP')

const usuario = reactive({
  nome: undefined,
  senha: undefined,
})

function verificar(state) {
  const errors = []
  if (!state.nome) errors.push({ name: 'nome', message: 'Campo obrigatório' })
  if (!state.senha) errors.push({ name: 'password', message: 'Campo obrigatório' })

  if (state.nome && state.senha) {
    const usuarioExiste = buscar(state.nome)

    if (usuarioExiste && usuarioExiste.senha !== state.senha) {
      errors.push({ name: 'senha', message: 'Senha incorreta' })
    }
  }
  return errors
}

function buscar(emailRetornar) {
  for (let i = 0; i < arrayUsuario.value.length; i++) {
    const usuarioEncontrado = arrayUsuario.value[i]
    if (usuarioEncontrado.nome === emailRetornar) {
      return usuarioEncontrado
    }
  }
  return null
}

async function redirecionar() {
  const usuarioExiste = buscar(usuario.nome)

  if (!usuarioExiste) {
    const usuarioLogin = {
      nome: usuario.nome,
      senha: usuario.senha,
      arrayTask: []
    }
    arrayUsuario.value.push(usuarioLogin)
    usuarioLogado.value = usuarioLogin

    toast.add({ title: 'Bem Vindo', description: 'Redirecionando para as tarefas...' })
    await navigateTo('/tasksPage')
  } else if (usuarioExiste.senha !== usuario.value.senha) {
    toast.add({ title: 'Falha no Login!', description: 'Senha incorreta.', color: 'error' })
  } else {

    usuarioLogado.value = usuarioExiste
    toast.add({ title: 'Bem Vindo', description: 'Redirecionando para as tarefas...' })
    await navigateTo('/tasksPage')
  }
  
  provide('usuarioLogadoP', usuarioLogado)
}



const toast = useToast()

async function onError(event) {

  const firstErrorId = event?.errors?.[0]?.id
  if (firstErrorId) {
    const element = document.getElementById(firstErrorId)
    element?.focus()
    element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}
</script>

<template>
  
  <div class="flex flex-col items-center">
    <UPageHero title="Homelist - O Lar das Tarefas" description="Faça suas anotações onde, como e quando você quiser!"
      :ui="{
        container: 'flex flex-col py-6 sm:py-8 lg:py-20'
      }" />
    <div class="flex p-6 size-80 border-1 items-center justify-center rounded-xl">
      <UForm 
        :ui="{base: 'flex flex-col w-xl items-center'}"
        :validate="verificar" 
        :state="usuario" 
        class="space-y-4" 
        @submit="redirecionar" 
        @error="onError"
      >
        <h1 class="flex text-2xl font-extrabold">Login</h1>
        <UFormField label="Usuário" name="nome">
          <UInput v-model="usuario.nome" placeholder="Digite seu usuário" />
        </UFormField>

        <UFormField label="Password" name="password">
          <UInput v-model="usuario.senha" type="password" 
          placeholder="Digite sua senha"/>
        </UFormField>

        <UButton type="submit">
          Enviar
        </UButton>
      </UForm>
    </div>
  </div>
</template>

