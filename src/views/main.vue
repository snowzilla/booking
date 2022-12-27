<template>
  <div>
    <header-main/>
    <div class="main-img">
      <h2>
        Look at the world. <br/>
        He’s much more amazing than dreams.
      </h2>
      <div @click='modal = true' class="btn-start">Start your search</div>
      <div :class="{'active': modal }" class="search-modal">
        <h3>Enter the details</h3>
        <div class="search-line">
          <div class="input-line">
            <input type="text" v-model="location" class='location' placeholder='Location'/>
            <input type="text" class='date' placeholder='Entry date'/>
            <hr/>
            <input type="text" class='date' placeholder='Exit date'/>
          </div>
          <div class="btn-search" @click="getHotel">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M10 0C4.48828 0 0 4.48828 0 10C0 15.5117 4.48828 20 10 20C12.3965 20 14.5977 19.1484 16.3223 17.7363L22.293 23.707C22.543 23.9688 22.916 24.0742 23.2676 23.9824C23.6172 23.8906 23.8906 23.6172 23.9824 23.2676C24.0742 22.916 23.9688 22.543 23.707 22.293L17.7363 16.3223C19.1484 14.5977 20 12.3965 20 10C20 4.48828 15.5117 0 10 0ZM10 2C14.4297 2 18 5.57031 18 10C18 14.4297 14.4297 18 10 18C5.57031 18 2 14.4297 2 10C2 5.57031 5.57031 2 10 2Z"
                  fill="white" fill-opacity="0.3"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderMain from "@/components/headerMain";
import {useStore} from "vuex";
import router from "@/router";
import {onMounted, ref} from "vue";
import {collection, getDocs, onSnapshot} from "firebase/firestore";
import {db} from "@/main";
import {getAuth} from "firebase/auth";
import store from "@/store";

export default {
  components: {
    HeaderMain,
  },
  data() {
    return {
      modal: false,
      hotels: [],
      location: 'Moscow',
      entry: '',
      exit: ''
    }
  },
  methods: {
    getHotel() {
      let url = `https://engine.hotellook.com/api/v2/cache.json?location=${this.location}&currency=rub&checkIn=2023-01-20&checkOut=2023-02-12&limit=10`

      fetch(url)
          .then(res => res.json())
          .then(as => this.hotels = as)
    }
  },
  watch: {
    async hotels() {
      this.$store.commit('SET_HOTELS', this.hotels)

      const querySnapshot = await getDocs(collection(db, "apartments"));
      querySnapshot.forEach((doc) => {
        this.$store.commit('SET_APARTMENTS', doc.data());
      });

      router.push('/apartaments')
    }
  },
}

</script>

<style scoped>


.main-img {
  background-image: url("@/assets/mainImg.jpg");
  margin: 30px auto 0;
  width: 1128px;
  min-height: 600px;
  height: 100%;
  background-repeat: no-repeat;
  border-radius: 30px;
  text-align: center;
  position: relative;
}

.btn-start {
  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 30px;
  color: rgba(255, 255, 255, 0.7);
  font-size: 20px;
  margin: 60px auto 0;
  display: grid;
  place-items: center;
  width: 250px;
  height: 55px;
  cursor: pointer;
}

.search-modal {
  background: rgba(31, 31, 31, 0.5);
  border: 1px solid rgba(106, 106, 106, 0.3);
  backdrop-filter: blur(7.5px);
  border-radius: 30px;
  position: absolute;
  width: 850px;
  height: 200px;
  top: 470px;
  left: 139px;
  opacity: 0;
}

.active {
  opacity: 1;
  transition: 0.3s;
}


.search-line {
  display: flex;
  justify-content: space-between;
  margin-left: 40px;
  margin-right: 61px;
  align-items: center;
  margin-top: 27px;
}

.search-line hr {
  width: 50px;
  border: 1px solid #6A6A6A;
  height: 0;
}

.input-line {
  display: flex;
  gap: 30px;
  align-items: center;
}

.location {
  width: 180px;
}

.date {
  padding: 0;
  width: 132px;
  text-align: center;
}

.btn-search {
  padding: 5px 14px;
  display: flex;
  align-items: center;
  border: 1px solid #6A6A6A;
  border-radius: 10px;
  cursor: pointer;
}

.btn-start:active {
  transform: scale(0.9, 0.9);
}

.btn-search:active {
  transform: scale(0.9, 0.9);
}
</style>