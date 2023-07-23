<template>
  <AppHeader />
  <div class="board">
    <div class="container">
      <form @submit.prevent="handleSubmit">
        <h1>Create an account</h1>
        <h2>It's free, it's Open Source</h2>
        <span class="separator">
          <span class="line"></span>
          <span class="text">CONTINUE WITH</span>
          <span class="line"></span>
        </span>
        <div class="auth-buttons">
          <a @click.prevent="handleLogin('google')" class="btn-primary btn-google-auth" tabindex="0">
            <font-awesome-icon :icon="['fab', 'google']" class="logo" />Google
          </a>
          <a class="btn-primary btn-github-auth" tabindex="0"> <font-awesome-icon :icon="['fab', 'github']" class="logo" />GitHub </a>
        </div>

        <div class="fields-row">
          <div class="inputBox">
            <input v-model="form.email" tabindex="0" type="email" label="Email" placeholder=" " required />
            <span>Email</span>
          </div>
          <div class="inputBox">
            <input v-model="form.password" tabindex="0" type="password" label="Password" placeholder=" " required />
            <span>Password</span>
          </div>
          <button class="btn-primary" :disabled="!form.password || !form.email">Create account</button>
        </div>
        <div class="links">
          <div>Already have an account? <router-link to="/login">Login here</router-link></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import AppHeader from '@/components/AppHeader.vue'
import useAuthUser from '@/composables/UseAuthUser'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { register } = useAuthUser()
const form = ref({
  email: '',
  password: '',
})

const handleSubmit = async () => {
  try {
    const user = await register(form.value)
    router.push({
      name: 'EmailConfirmation',
      query: { email: form.value.email },
    })
  } catch (error) {
    console.log(error)
    alert(error.message)
  }
}
</script>

<style scoped>
.fields-row {
  margin-top: 60px;
}
</style>
