<template>
  <div>
    <div class="header">
      <router-link to="/">
        <div class="logo">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <rect width="40" height="40" fill="url(#pattern0)"/>
          <defs>
            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
              <use xlink:href="#image0_4_47" transform="scale(0.0104167)"/>
            </pattern>
            <image id="image0_4_47" width="96" height="96" xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAGJklEQVR4nO2dXagVVRTH/0tNpdLyo4+boZVpiFpZGWVgIpWJiQZZShQlpC9BD1G+WPhoZZSUiUT0EoJm+JHXD0oJsh7KkFT8Si21zEqpFOX60f31MOfY4XbOnX3mzpw95579g/Nw58ys/V9rnZm1Z2bvfaVAIBAIBAKBQCAQCAQCgUAgUBPMt4AkAD0kPSBpWGHTLkmbzOysP1UNAjAD+JX/cxSY7ltfpwXoCswvE/i2LAG6+dbbqQB6AWscgl9kA3Clb92dAuAmYGcVwS+yFxjqW39dA4wBfksQ/CLHgXG+/ahLgJnA2ZgAHy182uMsMNO3P3UDYMA8h1/3Z0AfoDew1mH/hUBX3/7lGuByYJVDMJcAl5Qc17UQ4DjWA1f49DG3ANcD38UE8AIwpx0bs4BzMTZ2ADfW0rfcA9wLHIsJ3ElgkoOtB4E/Y2wdB+6vhW+5B5gOnIkJ2H5gWLy1izZvBnbH2GwBnsnSt1yDe7H9Ergqgf2+wCYH+wuBLln4mFuAy4CVDsF5n5Jim6CdbsA7Du2sA3qn6WNuAQYAW2MC0m6xTdDmLOB8TJvbgRvSajOXAPdQ/klmKSeByRm0/RDxxfkPYGzabecC4Anii+0BYHiGGoYCe2I0tABPZ6Wh5vBfsW2NcXwLcHUN9PQFNsdogc5QnImK7ScOzn4AdK+hrm7AIgdda4FetdKVKsB1wLcxDqZabBNofKGgoT2+Bwb50pgIYBRwOMaxU8CUHGh9GPgrRutR4G7fWp0ApgGnYxw6AozyrbUIMAI4GKO5BXjKt9aKEBXbOcA/MY58BVzjW29bgH7AFzHaW4neS+erOAM9gY9ixAMsBXr61lsJoDvwoYMfHwOX+tYr6WKx/cbhlzPPt1ZXiIpz3Jm8DRjoW+jtwKEYoaeAqV6FJgCYCPwd49tRYLQvgS7FFuBWLwJTALjNwb/TwLRaC5tL/J0tADUVlgEuPhZi8UqtBM12FNVICSgyu1r7VQ/OBfZKch7wZGZ1OQC4SJU/on1mdks19pP0Z/slOKZRqDo2SRKwrsy2Iwns1Ds/l9nWnHmrRHeMa4j6ya1ETzubGrAGNAHNJX+vA/pUaz/x9RnoJ+m8mZ0sCi3bQCetAUW/CnHoama/J7GfWnAaNQEdJV8PlRqQ3M4kAQZLGi+pbwdNnZC02cwOdlxVjkmrCAP9iZ42Ot1pO9IKLC9cr734VYlc1QCgv6SvJQ1JS1cb9kkaY2YnqtDUUDVgsbILvhTdwS/K0H7V5OYMILrm/5CmpkpNSRpsZj867dxAZ8B41WbiuBXaygV56gVVek/cKmmppF+qtDdA0pMqn9SmKm1lRp4SUEnLUjNLNBoBMEVJcG2r5uTpElSJAx04dn9qKjKiHhLQqQkJ8ExIgGdCAjwTEuCZkADPhAR4JiTAMyEBngkJ8ExIgGdCAjyT+VNBoLuZncvAbpOk4iS/VWZ2LIM2eqRtsy21OAPuStsg8KikPYpeYS6WtLewLW0yn3yRZgJOVdj+NgmG7FUCeFHSCkmlq5v0lrSi8F1a7fSV9FaFryv5WjVpXoIOSRpRZvtoSbuAT1XybN/MXqvGONFquO9KqjQGv4ukBcAQSc+b2YUq7ZdOGB8sabKkayvs7vQ+2YU0E7Be5RMgRY4812abcwKI1vJZLmmCw+6zJd0APO5qv8D8KvZdX6XtiqR5CXpPUharlw+UtEVuwS8yoXBMFrMYWxT5mgqpJcDMfpL0alr2SnhW0sgEx40sHJs2c83scFrGUu0FmdnrkhakaTOGnYVPrXjDzN5M02Dq3VAze0nSVEXdxCzZKOm+wmdjxm3tljTFzF5O23AmN2JmtlrSauAOSXcqGqOT5hIFS1TS0wEeUfs9JBfadgpaFI1F2mpm2zpgtz7AbQnLdpc8wG2JAdqzUWvq6VlQi6QZZlYxeGa2UNJjks7UTFUHyVMCzrfz3TFJY81sWZwRM1spaVzhmCRtNSbApAqXi+0kWJUEGES0UHc5JmbhQ10DdCGaxVJKMx1Y0Zbofws0t7G5jBwtuJSrGYxEg2knKrqJ2i5pg5l1eDoQMEHScEk7JH2ehs1AIBAIBAKBQCAQCAQCSfgXrr1TmZL7xgEAAAAASUVORK5CYII="/>
          </defs>
        </svg>
        <h1>Booking</h1>
      </div>
      </router-link>
      <div class="header-right">
        <router-link to="/likeList">
          <img src='@/assets/like.svg' alt="like"/>
        </router-link>
        <router-link to="/chatList">
          <img src='@/assets/chat.svg' alt="chat"/>
        </router-link>
        <router-link to="/profile">
          <div class="avatar">
            {{name.substring(0, 1)}}
          </div>
        </router-link>
        <button @click="exit">exit</button>
      </div>
    </div>
  </div>
</template>

<script >
import {computed, onMounted, ref} from "vue";
import {collection, getDocs} from "firebase/firestore";
import {db} from "@/main";
import {useStore} from "vuex";
import {getAuth} from "firebase/auth";
import router from "@/router";

export default {
  setup () {
    let name = ref('')

    const store = useStore()

    const getUser = computed(() => store.state.user)

    onMounted(async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          if (doc.data().id === getUser.value.uid) {
            name.value = doc.data().name
          }
        });
      }catch (err) {}
    })

    const exit = async () => {
        await store.dispatch('logout' )
        await router.push('/')
    }


    return {name, exit}
  }

}
</script>

<style scoped>


a:-webkit-any-link {
  text-decoration: none;
  display: flex;
}

.header{
  width: 1044px;
  display: flex;
  align-items: center;
  margin: 28px auto 0;
  justify-content: space-between;
}

.logo{
  display: flex;
  align-items: center;
}

.header-right{
  display: flex;
  gap: 25px;
  align-items: center;
}

.lang{
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  gap: 7px;
}

.avatar{
  width: 36px;
  height: 36px;
  border-radius: 100%;
  background: #FFFFFF;
  color: #1C1B1B;
  text-align: center;
  line-height: 30px;
  font-size: 30px;
}


</style>