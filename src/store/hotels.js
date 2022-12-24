
export default({
    state: {
        hotels: [],
    },
    getters: {
        HOTELS(state) {
            return state.hotels
        },
    },
    mutations: {
        SET_HOTELS: (state, hotels) => {
            state.hotels = hotels
        },
        SET_APARTMENTS: (state, apart) => {
            state.hotels.push(apart)
        }
    },
    actions: {
    }
})


