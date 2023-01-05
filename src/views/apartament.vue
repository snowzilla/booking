<template>
  <div>
    <header-main/>
    <div class="container">
      <div class="modal">
        <div class="modal-header">
          <h3>{{ name }}, {{ country }}</h3>
          <svg @click="this.$router.go(-1)" width="83" height="46" viewBox="0 0 83 46" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
                d="M81.1725 25.1213C82.3441 23.9497 82.3441 22.0503 81.1725 20.8787L62.0807 1.7868C60.9091 0.615223 59.0096 0.615223 57.838 1.7868C56.6664 2.95837 56.6664 4.85786 57.838 6.02944L74.8086 23L57.838 39.9706C56.6664 41.1421 56.6664 43.0416 57.838 44.2132C59.0096 45.3848 60.9091 45.3848 62.0807 44.2132L81.1725 25.1213ZM0.94873 26H79.0512V20H0.94873V26Z"
                fill="#6A6A6A" fill-opacity="0.3"/>
          </svg>
        </div>
        <h1>{{ item.hotelName }}</h1>
        <div class="modal-bottom">
          <h4>{{ item.priceFrom }} ₽</h4>
          <div ref="btn" class="btn" @click="load">
            <img v-if="loading" class="load" src="@/assets/load.gif" alt="">
            <p class="btn-name" v-show="!loading">Reserve</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import router from "@/router";
import headerMain from "@/components/headerMain";
import {addDoc, collection, onSnapshot} from "firebase/firestore";
import {db} from "@/main";

export default {
  components: {
    headerMain
  },
  data() {
    return {
      item: {},
      country: '',
      name: '',
      loading: false,
      userId: [],
      userName: '',
      ownerName: ''
    }
  },
  computed: {
    hotels() {
      return store.state.hotels.hotels
    },
    user() {
      return store.state.user
    }
  },
  mounted() {
    this.hotels.forEach(item => {
      if (+item.hotelId === +this.$route.params.id) {
        this.item = item
        this.name = item.location.name
        this.country = item.location.country
      }
    });

    onSnapshot(collection(db, "chats"), (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().hasOwnProperty('users')) {
          if (doc.data().users.owner === this.user?.uid) {
            this.userId.push(doc.data().users.owner)
          }
          if (doc.data().users.buyer === this.user?.uid) {
            this.userId.push(doc.data().users.buyer)
          }
        }
      })

    });

    onSnapshot(collection(db, "users"), (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().id === this.user?.uid) {
          this.userName = doc.data().name
        } else if (doc.data().id === this.item.owner) {
          this.ownerName = doc.data().name
        }
      })
    });
  },
  methods: {
    load() {
      if (this.user) {
        if (this.user.uid !== this.item.owner) {
          if (!this.userId.length) {
            if (this.item.apart) {
              addDoc(collection(db, "chats"), {
                users: {
                  owner: this.item.owner,
                  ownerName: this.ownerName,
                  buyer: this.user.uid,
                  buyerName: this.userName
                },
                messages: []
              });
              router.push("/chatList")
            }
          }
        }
      } else {
        alert('Sign up to contact the owner')
      }
    }
  }
}

</script>

<style scoped>

h1 {
  font-size: 55px;
  color: #FFFFFF;
  margin-top: 62px;
}

h4 {
  font-size: 52px;
  color: #FFFFFF;
  margin: 0;
}

h3 {
  font-size: 30px;
  margin: 0;
}

.container {
  display: grid;
  place-items: center;
}

.modal {
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

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

svg {
  cursor: pointer;
}

svg:hover path {
  fill: #a6a6a6;
}

.modal-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 100px;
  width: 964px;
  top: 406px;
}

.btn {
  font-size: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.3);
  background: #1F1F1F;
  box-sizing: border-box;
  border: 1px solid rgba(106, 106, 106, 0.3);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  border-radius: 30px;
  width: 281px;
  height: 70px;
  cursor: pointer;
}

.btn:hover {
  background: #2f2f2f;
}

.btn:active {
  transform: scale(0.9, 0.9);
}

.load {
  width: 40px;
}

</style>