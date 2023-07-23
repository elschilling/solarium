<template>
  <AppHeaderVue />
  <div class="board">
    <div class="container">
      <h1>Welcome back!</h1>
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
      <span class="separator">
        <span class="line"></span>
        <span class="text">OR</span>
        <span class="line"></span>
      </span>

      <form @submit.prevent="handleLogin()">
        <div class="fields-row">
          <div class="inputBox">
            <input v-model="form.email" tabindex="0" type="email" label="Email" placeholder=" " required />
            <span>Email</span>
          </div>
          <div class="inputBox">
            <input v-model="form.password" tabindex="0" type="password" label="Password" placeholder=" " required />
            <span>Password</span>
          </div>
          <button class="btn-primary" :disabled="!form.password || !form.email">Sign in</button>
        </div>
        <div class="links">
          <div><router-link to="/forgotPassword">Forgot Password?</router-link></div>
          <div>No account yet? <router-link to="/register">Create an account</router-link></div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import AppHeaderVue from '@/components/AppHeader.vue'

import { ref } from 'vue'
import useAuthUser from '@/composables/UseAuthUser'
import { useRouter } from 'vue-router'

const router = useRouter()
const { login, loginWithSocialProvider } = useAuthUser()

const form = ref({
  email: '',
  password: '',
})

const handleLogin = async (provider) => {
  try {
    provider ? await loginWithSocialProvider(provider) : await login(form.value)
    router.push({ name: 'Me' })
  } catch (error) {
    alert(error.message)
  }
}
</script>

<style></style>
