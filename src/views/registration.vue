<template>
  <div class="background">
    <div class="login-form">
      <form @submit.prevent="handleSubmit" class="form">
        <h3 class="text-xl underline">Sign up</h3>

        <label for="email">Email:</label>
        <input type="email"  name="email" v-model="email" required>

        <label for="email">Password:</label>
        <input type="password"  name="password" v-model="password" required>

        <label for="email">Name:</label>
        <input type="text"  name="password" v-model="name" required>

        <button class="w-max mt-4 px-4 py-2 text-center rounded-full bg-blue-500 text-white">Sign up</button>
      </form>
    </div>
  </div>
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

    return { handleSubmit, email, password, name }
  }
}
</script>


<style scoped>

@keyframes background {
  100% { background-size: 4000px 1300px}
}

.background{
  background-repeat: no-repeat;
  background-image: url("@/assets/Wave.svg");
  background-size: 3000px 1300px;
  background-position: -500px 0;
  color: #f9f9f9;
  animation: background 10s infinite alternate linear;
}

.login-form{
  display: grid;
  place-items: center;
  height: 100vh;
}

h3{
  text-align: center;
  margin: 0;
}

input{
  margin-bottom: 20px;
}

label{
  color: rgba(255, 255, 255, 0.3);
  margin-bottom: 10px;
}

button{
  font-family: 'Alike';
  font-style: normal;
  font-weight: 400;
  margin-top: 10px;
  background: #1F1F1F;
  border: 1px solid rgba(106, 106, 106, 0.3);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 10px 0;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
}

button:active{
  transform: scale(0.9, 0.9);
}

.form{
  display: grid;
  width: 300px;
  border-radius: 10px;
  padding: 70px 70px;
  background: rgba(31, 31, 31, 0.5);
  border: 1px solid rgba(106, 106, 106, 0.3);
  backdrop-filter: blur(7.5px);
}


</style>