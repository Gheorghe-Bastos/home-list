<script setup>
import { inject, reactive} from 'vue'

const supabase = useSupabaseClient()
const usuarioLogado = inject('usuarioLogadoP')

const usuario = reactive({
  nome: undefined,
  senha: undefined,
})

function verificar(state) {
  const errors = []
  if (!state.nome) {
     errors.push({ name: 'nome', message: 'Digite seu nome' })
    }
  else if (!state.senha) {
    errors.push({ name: 'password', message: 'Digite sua senha' })
  }
  return errors
}

async function redirecionar() {

  const { data: usuarioExiste} = await supabase
    .from('perfis')
    .select('*')
    .eq('nome', usuario.nome)
    .single()

  if (!usuarioExiste) {

    const { data: usuarioNovo, error: errCria } = await supabase
      .from('perfis')
      .insert([{ nome: usuario.nome, senha: usuario.senha, tasks: [] }])
      .select()
      .single()

    if (errCria) {
    return toast.add({ title: 'Erro', color: 'error', description: errCria.message })
    }  

    usuarioLogado.value = usuarioNovo
    localStorage.setItem('usuario_sessao', JSON.stringify(usuarioLogado.value))

    toast.add({ title: 'Bem Vindo', description: 'Redirecionando para as tarefas...' })
    await navigateTo('/tasksPage')
  } 
  
  else if (usuarioExiste.senha !== usuario.senha) {
    toast.add({ title: 'Falha no Login!', description: 'Senha incorreta.', color: 'error' })
  } 
  
  else {
    usuarioLogado.value = usuarioExiste
    localStorage.setItem('usuario_sessao', JSON.stringify(usuarioLogado.value))
    
    toast.add({ title: 'Bem Vindo', description: 'Redirecionando para as tarefas...' })
    await navigateTo('/tasksPage')
  }
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
    <UPageHero title="Homelist - O Lar das Tarefas" description="Faça suas tarefas onde, como e quando você quiser!"
      :ui="{
        container: 'flex flex-col py-4 sm:py-5 lg:py-13'
      }" />
    <div class="flex h-80 w-xs p-6 dark:border-1 dark:border-yellow-800
    items-center justify-center rounded-xl  shadow-[0px_0px_10px_#00000083]">
      <UForm 
        :ui="{base: 'flex flex-col w-xl items-center'}"
        :state="usuario" 
        class="space-y-4" 
        :validate="verificar"
        @submit="redirecionar" 
        @error="onError"
      > 
      <div class="flex gap-1 mb-1 -mt-4 flex-col justify-center items-center">
        <div class="flex justify-center items-center gap-1">
          <img class='w-18' src="/loginHomelist.png"/>
          <h1 class="text-2xl mt-5 font-extrabold">Login</h1>
        </div>
        <p class="text-xs">Insira seus dados para entrar no lar das tarefas.</p>
      </div>
        <UFormField class="w-full" label="Usuário" name="nome">
          <UInput class="w-full" v-model="usuario.nome" placeholder="Digite seu usuário" />
        </UFormField>

        <UFormField class="w-full" label="Password" name="password">
          <UInput class="w-full" v-model="usuario.senha" type="password" 
          placeholder="Digite sua senha"/>
        </UFormField>

        <UButton class="w-full text-neutral-900" type="submit">
          Enviar
        </UButton>
      </UForm>
    </div>
  </div>
</template>

