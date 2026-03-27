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
    <UPageHero title="Homelist - O Lar das Tarefas" description="Faça suas anotações onde, como e quando você quiser!"
      :ui="{
        container: 'flex flex-col py-2 sm:py-3 lg:py-8'
      }" />
    <div class="flex p-6 size-80 border-1 border-yellow-800 items-center justify-center rounded-xl">
      <UForm 
        :ui="{base: 'flex flex-col w-xl items-center'}"
        :state="usuario" 
        class="space-y-4" 
        :validate="verificar"
        @submit="redirecionar" 
        @error="onError"
      > 
      <div class="flex gap-1 items-center">
        <img class='w-18' src="/loginHomelist.png"/>
        <h1 class="text-2xl mt-5 font-extrabold">Login</h1>
      </div>
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

