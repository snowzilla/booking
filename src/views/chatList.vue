<template>
  <header-main/>
  <div class="container">
    <div class="user-list">
      <div class="user" v-for="user in users" :id="user.id" @click="selectUser(user.id)" :key="user.id">
        <div class="user-info">
          <div class="avatar"/>
          <h4>{{ user.name }}</h4>
        </div>
      </div>
    </div>
    <div class="messages-window">
      <div class="apart-info">
        <h1 v-if="!selectChatId">Choose a chat</h1>
      </div>
      <div class="chat-window">
        <div class="messages">
          <div class="messages-list" ref="scroll">
            <div :class="{'my-message' : getUser === message.uid }" class="message" v-for="message in messages">
              <h4>{{ message.message }}</h4>
              <p></p>
            </div>
          </div>
        </div>
        <div class="input-wrap">
          <input type="text" class="input-message" v-model="message" @keyup.enter="sendMessage" :disabled="!selectChatId">
          <div class="keyup">
            <img src="@/assets/send.jpg" alt="" class="send" @click="sendMessage">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headerMain from "@/components/headerMain";
import {computed, onMounted, ref, onUpdated} from "vue";
import {doc, updateDoc, collection, onSnapshot, arrayUnion, getDocs} from "firebase/firestore";
import {db} from "@/main";
import {useStore} from "vuex";
import {getAuth} from "firebase/auth";

export default {
  name: "chatList",
  components: {headerMain},
  setup() {
    let messages = ref(null)
    const users = ref([])
    let selectChatId = ref('')


    const scroll = ref(null)
    const message = ref('')

    const store = useStore()

    const getUser = computed(() => {
      if (getAuth().currentUser) {
        return store.state.user.uid
      }
    });

    const selectUser = async (id) => {
      const chatUsers = document.querySelectorAll('.user')
      messages.value = null
      onSnapshot(collection(db, "chats"), (querySnapshot) => {
        querySnapshot.forEach((item) => {
          if (item.data().users.owner === getUser.value || item.data().users.buyer === getUser.value) {
            if (item.data().users.owner === id || item.data().users.buyer === id) {
              onSnapshot(doc(db, "chats", item.id), (doc) => {
                selectChatId.value = doc.id
                messages.value = doc.data().messages
              });
            }
          }
        });
      })
      chatUsers.forEach(user => {
        user.classList.remove('select')

        if (user.id === id) {
          user.classList.add('select')
        }

      })
    }

    const sendMessage = () => {
      const chatRef = doc(db, 'chats', selectChatId.value);
      if (message.value) {
        updateDoc(chatRef,
            {
              messages: arrayUnion({uid: getUser.value, message: message.value})
            });
        message.value = ''
      }
    }

    onUpdated(() => {
      scroll.value.scrollTop = 9999999999;
    })

    onMounted(() => {
      onSnapshot(collection(db, "chats"), (querySnapshot) => {
        users.value.length = 0
        querySnapshot.forEach((doc) => {
          if (doc.data().users.owner === getUser.value) {
            users.value.push({
              id: doc.data().users.buyer,
              name: doc.data().users.buyerName
            })
          } else if (doc.data().users.buyer === getUser.value) {
            users.value.push({
              id: doc.data().users.owner,
              name: doc.data().users.ownerName
            })
          }
        })
      })

    })


    return {getUser, messages, sendMessage, message, scroll, users, selectUser, selectChatId}
  }
}
</script>

<style scoped>

::-webkit-scrollbar {
  width: 0;
}

p {
  margin: 0;
}

h4 {
  font-weight: 400;
  font-size: 20px;
  color: #FFFFFF;
  margin: 0;
}


.container {
  display: grid;
  grid-template-columns: 288px 756px;
  width: 1044px;
  margin: 30px auto 0 auto;
  height: 80vh;
}

.user-list,
.messages-window {
  background: rgba(31, 31, 31, 0.5);
  border: 1px solid rgba(106, 106, 106, 0.3);
  backdrop-filter: blur(7.5px);
}

.user-list {
  border-radius: 30px 0 0 30px;
  padding: 36px 16px;
}

.messages {
  position: relative;
  z-index: 0;
}

.messages-list {
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 5px;
  margin-top: 75px;
  height: 58vh;
}

.messages-window {
  border-radius: 0 30px 30px 0;
  position: relative;
}

.message {
  background: #1F1F1F;
  border: 1px solid rgba(106, 106, 106, 0.3);
  border-radius: 10px;
  padding: 10px 16px;
  margin-left: 30px;
  align-self: start;
}

.my-message {
  align-self: end;
  margin-left: 0;
  margin-right: 30px;
  background: #722CCB;
}

.apart-info {
  z-index: 1;
  width: 100%;
  background: #1F1F1F;
  border: 1px solid rgba(106, 106, 106, 0.3);
  /*filter: blur(2px);*/
  height: 59px;
  position: absolute;
  border-radius: 0 30px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
}


.input-wrap {
  position: absolute;
  left: 20px;
  bottom: 30px;
}

.input-message {
  height: 57px;
  width: 696px;
  font-family: 'Alike', serif;
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;
  background: #1F1F1F;
}

.send {
  border-radius: 10px;
  position: absolute;
  right: 16px;
  top: 10px;
  cursor: pointer;
}

.user-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: scroll;
}

.user {
  background: #1F1F1F;
  border: 1px solid rgba(106, 106, 106, 0.3);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 11px 29px 12px 9px;
  cursor: pointer;
  transition: 0.3s;
}


.user:active{
  box-shadow: inset 0 2px 2px #000000;
  transition: 0.3s;
}

.select{
  box-shadow: inset 0 4px 4px #000000;
  transition: 0.3s;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 9px;
}

.avatar {
  background: #D9D9D9;
  border-radius: 100px;
  width: 36px;
  height: 36px;
}

</style>