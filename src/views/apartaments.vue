<template>
  <div>
    <header-main/>
    <div class="page-info">
      <div class="filter-sort">
        <div class="sort">
          <h1>Sort</h1>
          <hr>
          <div class="sort-list">
            <div class="num-star" @click="sort('stars')">
              For numbers stars
            </div>
            <div class="min-price" @click="sort('priceFrom')">
              For min price
            </div>
          </div>
        </div>
      </div>
      <div class="hotel-list">
        <div class="hotel" v-for="hotel in hotels" :key="hotel.hotelId">
          <router-link :to="{name: 'apartament', params : { id: hotel.hotelId }}">
            <div class="hotel-wrap">
              <div class="hotel-header">
                <div class="stars">
                  <svg :class="{ 'none' : hotel.stars < 1}" width="20" height="19" viewBox="0 0 20 19" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z"
                        fill="#EFD700"/>
                  </svg>
                  <svg :class="{ 'none' : hotel.stars < 2}" width="20" height="19" viewBox="0 0 20 19" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z"
                        fill="#EFD700"/>
                  </svg>
                  <svg :class="{ 'none' : hotel.stars < 3}" width="20" height="19" viewBox="0 0 20 19" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z"
                        fill="#EFD700"/>
                  </svg>
                  <svg :class="{ 'none' : hotel.stars < 4}" width="20" height="19" viewBox="0 0 20 19" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z"
                        fill="#EFD700"/>
                  </svg>
                  <svg :class="{ 'none' : hotel.stars < 5}" width="20" height="19" viewBox="0 0 20 19" fill="none"
                       xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M10 0L12.2451 6.90983H19.5106L13.6327 11.1803L15.8779 18.0902L10 13.8197L4.12215 18.0902L6.36729 11.1803L0.489435 6.90983H7.75486L10 0Z"
                        fill="#EFD700"/>
                  </svg>
                </div>
                <div class="location">
                  <h5>{{ hotel.location.name }}, {{ hotel.location.country }}</h5>
                </div>
              </div>
              <div class="hotel-info">
                <div class="hotel-name">
                  <h5>{{ hotel.hotelName }}</h5>
                </div>
                <h4>{{ hotel.priceFrom }} ₽</h4>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import headerMain from "@/components/headerMain";
import router from "@/router";

function byField (field) {
  return (a, b) => a[field] > b[field] ? 1 : -1;
}

export default {
  name: "Apartaments",
  components: {
    headerMain
  },
  data() {
    return {
      stars: [],
      modal: false,
    }
  },

  computed: {
    hotels() {
      return store.state.hotels.hotels
    },
  },
  methods: {
    sort(field) {
      this.hotels.sort(byField(field));
    }
  }
}
</script>

<style scoped>

a:-webkit-any-link {
  text-decoration: none;
}

.none {
  display: none;
}

h1 {
  font-size: 30px;
  color: rgba(255, 255, 255, 0.3);
}

h3 {
  padding: 0;
  color: rgba(255, 255, 255, 0.3);
  font-size: 25px;
  margin-top: 0;
}

h4 {
  color: #FFFFFF;
  font-size: 24px;
  margin: 0;
  white-space: nowrap;
}

h5 {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.3);

}


hr {
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-top: 10px;
  margin-bottom: 20px;
}

.page-info {
  display: grid;
  grid-template-columns: 303px 1fr;
  column-gap: 40px;
  width: 1044px;
  margin: 30px auto 0;
}

.filter-sort {
  display: flex;
  flex-direction: column;
  row-gap: 20px;
}

.sort {
  padding: 16px 16px 20px 16px;
  background: rgba(31, 31, 31, 0.5);
  border: 1px solid rgba(106, 106, 106, 0.3);
  backdrop-filter: blur(7.5px);
  border-radius: 30px;
}

.hotel-list {
  padding: 20px 20px;
  background: rgba(31, 31, 31, 0.5);
  border: 1px solid rgba(106, 106, 106, 0.3);
  backdrop-filter: blur(7.5px);
  border-radius: 30px;
  min-width: 700px;
  box-sizing: border-box;
  display: grid;
  row-gap: 20px;
}

.hotel {
  background: #1F1F1F;
  border: 1px solid rgba(106, 106, 106, 0.3);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  transition: 0.3s;
  cursor: pointer;
}

.hotel-wrap {
  padding: 11px 20px 20px 30px;
}

.hotel:hover {
  transform: scale(1.1, 1.1);
  transition: 0.3s;
  background: #2f2f2f;
}


.hotel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.stars {
  display: flex;
}

.hotel-info {
  margin-top: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-overflow: ellipsis;
}

.hotel-name {
  -ms-text-overflow: clip;
  text-overflow: clip;
  overflow: hidden;
  height: 25px;
  width: 300px;
}

.sort-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.hotel:active {
  transform: scale(1, 1);
}


.min-price,
.num-star {
  font-size: 20px;
  color: rgba(255, 255, 255, 0.3);
  border: 1px solid #6A6A6A;
  border-radius: 10px;
  width: 179px;
  height: 35px;
  padding-left: 11px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.min-price:hover,
.num-star:hover {
  background: #2f2f2f;
  transition: 0.3s;
}

.num-star:active,
.min-price:active {
  transform: scale(0.9, 0.9);
}

.inputs-price hr {
  height: 0;
  width: 71px;
}

</style>