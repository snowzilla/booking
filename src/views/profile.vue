<template>
  <header-main/>
  <div class="container">
    <div class="modal">
      <input type="text" v-model="apartName" @keyup.enter="addApartments">
      <input type="text">
    </div>
  </div>
</template>

<script>
import headerMain from "@/components/headerMain";
import {onMounted, ref, computed} from "vue";
import {db} from '@/main'
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import {useStore} from "vuex";
export default {
name: "profile",
  components: {
  headerMain
  },
  setup () {
    const apartName = ref('')

    const store = useStore()

    const getUser = computed(() => store.state.user.uid)

    const addApartments =  () => {
      addDoc(collection(db, "apartments"), {
        hotelName: apartName.value,
        owner: getUser.value,
        hotelId: Math.floor(Math.random() * 999999999),
        apart: true,
        priceFrom: '1234',
        location: {
          name: 'Moscow',
          country: 'Russia'
        }
      });
      apartName.value = ''
    }

    onMounted(async () => {

      onSnapshot(collection(db, "apartments"), (querySnapshot) => {
        const apartments = [];
        querySnapshot.forEach((doc) => {
          apartments.push(doc.data());
        });
        console.log(apartments);
      });
    })

    return {apartName, addApartments, getUser, }
  }
}
</script>

<style scoped>


.container{
  display: grid;
  place-items: center;
}

.modal{
  width: 1044px;
  background: rgba(31, 31, 31, 0.5);
  border: 1px solid rgba(106, 106, 106, 0.3);
  backdrop-filter: blur(7.5px);
  border-radius: 30px;
  margin-top: 90px;
  padding: 40px;
  box-sizing: border-box;
  position: relative;
}

</style>