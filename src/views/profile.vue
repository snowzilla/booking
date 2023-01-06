<template>
  <header-main/>
  <div class="container">
    <div class="profile-wrapper">
      <div class="profile-info">
        <div class="name">
          <p>Name:</p>
          <h2>{{user}}</h2>
        </div>
        <div class="loc">
          <p>Location:</p>
          <h2>Moscow</h2>
        </div>
        <div class="email">
          <p>Email:</p>
          <h2>{{ email }}</h2>
        </div>
      </div>
      <div class="buttons">
        <a class="edit-profile">Edit profile</a>
        <a class="add-apartments" @click="show = true">Add apartments</a>
      </div>
    </div>
    <div :class="{'show' : show }" class="apartments-form">
      <form class="form" @submit.prevent="addApartments">
        <div class="inputs">
          <input v-model="form.apartName" placeholder="Apart name">
          <input v-model="form.location" placeholder="Location">
          <input v-model="form.price" placeholder="Price">
        </div>
        <button class="save-button">Save</button>
      </form>
    </div>
  </div>
</template>

<script>
import headerMain from "@/components/headerMain";
import {onMounted, ref, computed, reactive} from "vue";
import {db} from '@/main'
import {collection, addDoc, onSnapshot} from "firebase/firestore";
import {useStore} from "vuex";
import {useVuelidate} from "@vuelidate/core";
import {required} from "@vuelidate/validators";

export default {
  name: "profile",
  components: {
    headerMain
  },
  setup() {
    const user = ref('')
    const email = ref('')
    const form = reactive({
      apartName: '',
      location: '',
      price: ''
    })
    const show = ref(false)
    const error = "Empty field"
    const valid = {
      apartName: {required},
      location: {required},
      price: {required}
    }

    const v$ = useVuelidate(valid, form)
    const store = useStore()

    const getUser = computed(() => store.state.user.uid)

    const addApartments = () => {
      if (!v$.value.$invalid) {
        addDoc(collection(db, "apartments"), {
          hotelName: form.apartName,
          owner: getUser.value,
          hotelId: Math.floor(Math.random() * 999999999),
          apart: true,
          priceFrom: form.price,
          location: {
            name: form.location,
            country: 'Russia'
          },
          stars: 5
        });
        form.apartName = ''
        form.price = ''
        form.location = ''
      } else {
        alert(error)
      }
    }

    onMounted(() => {
      onSnapshot(collection(db, "users"), (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().id === getUser.value) {
            user.value = doc.data().name.charAt(0).toUpperCase() + doc.data().name.slice(1);
            email.value = JSON.parse(localStorage.vuex).user.email
          }
        })
      });
    })

    return {form, addApartments, getUser, show, v$, error, user, email}
  }
}
</script>

<style scoped>

p {
  margin: 0;
  color: rgba(255, 255, 255, 0.3);
  font-weight: 400;
  font-size: 20px;
}

h2 {
  font-family: 'Alike', serif;
  font-weight: 400;
  font-size: 30px;
  color: #FFFFFF;
  padding: 0;
}

a {
  font-weight: 400;
  background: #1F1F1F;
  border: 1px solid rgba(106, 106, 106, 0.3);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}


.container {
  display: grid;
  place-items: center;
}

.profile-wrapper {
  width: 1044px;
  background: rgba(31, 31, 31, 0.5);
  border: 1px solid rgba(106, 106, 106, 0.3);
  backdrop-filter: blur(7.5px);
  border-radius: 30px;
  margin-top: 30px;
  padding: 40px;
  box-sizing: border-box;
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.profile-info {
  display: grid;
  row-gap: 20px;
}

.name,
.loc,
.email {
  display: flex;
  gap: 20px;
  align-items: center;
}

.buttons {
  display: grid;
  place-items: end;
  row-gap: 52px;
}

.edit-profile {
  font-size: 20px;
  width: 141px;
  height: 42.55px;
}

.add-apartments {
  font-size: 30px;
  width: 281px;
  height: 70px;
}


.apartments-form {
  opacity: 0;
  background: rgba(31, 31, 31, 0.5);
  border: 1px solid rgba(106, 106, 106, 0.3);
  backdrop-filter: blur(7.5px);
  border-radius: 30px;
  padding: 40px;
  margin-top: 30px;
}

.show {
  opacity: 1;
  transition: 0.5s;
}

.form {
  display: grid;
  row-gap: 78px;
  place-items: center;
}

.inputs {
  display: grid;
  row-gap: 30px;
}

.save-button {
  width: 141px;
  height: 43px;
  background: #1F1F1F;
  border: 1px solid rgba(106, 106, 106, 0.3);
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
  font-family: 'Alike', serif;
  border-radius: 10px;
  font-weight: 400;
  font-size: 20px;
  color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  outline: none;
}

.save-button:active,
a:active {
  transform: scale(0.9, 0.9);
}

</style>