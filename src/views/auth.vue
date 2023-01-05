<template>
  <form @submit.prevent="handleSubmit" class="">
    <h3 class="">Login</h3>

    <label for="email">Email:</label>
    <input class="" type="email" name="email" v-model="email" required>

    <label for="">Password:</label>
    <input class="" type="password" name="password" v-model="password" required>

    <button class="">Login</button>
    <div v-if="error">{{ error }}</div>
  </form>
</template>

<script>
import router from "@/router";
import {email, required, minLength} from '@vuelidate/validators'
import {useVuelidate} from "@vuelidate/core";
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const error = ref(null)

    const store = useStore()
    const router = useRouter()

    const handleSubmit = async () => {
      try {
        await store.dispatch('login', {
          email: email.value,
          password: password.value
        })
        router.push('/')
      }
      catch (err) {
        error.value = err.message
      }
    }
    return { handleSubmit, email, password, error }
  }
}
</script>

<style scoped>

.invalid{
  border: 4px solid red;
}

</style>