<template>
  <header-main/>
  <div class="container">
    <div class="user-list">
      <div class="user" v-for="user in users" @click="selectUser(user.id)">
        <div class="user-info">
          <div class="avatar"/>
          <h4>{{ user.name }}</h4>
        </div>
      </div>
    </div>
    <div class="messages-window">
      <div class="apart-info"></div>
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
          <input type="text" class="input-message" v-model="message" @keyup.enter="sendMessage">
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
import {doc, updateDoc, collection, onSnapshot, arrayUnion, getDoc} from "firebase/firestore";
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
      onSnapshot(collection(db, "chats"), (querySnapshot) => {
        querySnapshot.forEach((item) => {
          if (item.data().users.owner === id || item.data().users.buyer === id) {
            onSnapshot(doc(db, "chats", item.id), (doc) => {
              selectChatId.value = doc.id
              messages.value = doc.data().messages
            });
          }
        });
      })
    }

    const sendMessage = () => {
      const chatRef = doc(db, 'chats', selectChatId.value);
      if (messages.value) {
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

    onMounted(async () => {
      onSnapshot(collection(db, "users"), (querySnapshot) => {
        querySnapshot.forEach((doc) => {
          if (doc.data().id !== getUser.value) {
            users.value.push(
                {
                  id: doc.data().id,
                  name: doc.data().name
                }
            )
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
  font-family: 'Alike';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 25px;
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
  filter: blur(2px);
  height: 59px;
  position: absolute;
  border-radius: 0 30px 0 0;
}

.input-wrap {
  position: absolute;
  left: 20px;
  bottom: 30px;
}

.input-message {
  height: 57px;
  width: 696px;
  font-family: 'Alike';
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
}

.user {
  background: #1F1F1F;
  border: 1px solid rgba(106, 106, 106, 0.3);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 11px 29px 12px 9px;
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