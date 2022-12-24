<template>
  <form @submit.prevent="handleSubmit" class="mt-4 flex flex-col">
    <h3 class="text-xl underline">Sign up</h3>

    <label for="email">Email:</label>
    <input class="border w-4/12" type="email"  name="email" v-model="email" required>

    <label for="email">Password:</label>
    <input class="border w-4/12" type="password"  name="password" v-model="password" required>

    <label for="email">Name:</label>
    <input class="border w-4/12" type="text"  name="password" v-model="name" required>

    <button class="w-max mt-4 px-4 py-2 text-center rounded-full bg-blue-500 text-white">Sign up</button>
    <div v-if="error">{{ error }}</div>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const email = ref('')
    const password = ref('')
    const name = ref('')
    const error = ref(null)

    const store = useStore()
    const router = useRouter()

    const handleSubmit = async () => {
      try {
        await store.dispatch('signup', {
          email: email.value,
          password: password.value,
          name: name.value
        })
        await router.push('/')
      }
      catch (err) {
        error.value = err.message
      }
    }

    return { handleSubmit, email, password, error, name }
  }
}
</script>


<style scoped>


@keyframes background {
  100% { background-size: 4000px 1000px}
}

body{
  background-repeat: no-repeat;
  background-image: url("@/assets/Wave.svg");
  background-size: 2000px 1000px;
  background-position: -500px 0;
  color: #f9f9f9;
  animation: background 10s infinite alternate linear;
}


</style>