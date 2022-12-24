<template>
  <form @submit.prevent="handleSubmit" class="mt-4 flex flex-col">
    <h3 class="text-xl underline">Login</h3>

    <label for="email">Email:</label>
    <input class="border w-4/12" type="email" name="email" v-model="email" required>

    <label for="email">Password:</label>
    <input class="border w-4/12" type="password" name="password" v-model="password" required>

    <button class="w-max mt-4 px-4 py-2 text-center rounded-full bg-blue-500 text-white">Login</button>
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