const { createApp } = Vue;
const { createPinia } = Pinia;

import productStore from '../Store/productStore.js'
import Navbar from '../components/navComponent.js'
import Cart from '../components/cartComponent.js'
import ProductCard from '../components/productCardComponent.js'
import Pagination from '../components/pageComponent.js'

const url = "https://vue3-course-api.hexschool.io/v2";
const path = "nian-api";

const app = createApp({
    data() {
        return {
            products: [],
            pagination: {},
        }
    },
    components: {
        Navbar,
        Cart,
        ProductCard,
        Pagination
    },
    methods: {
        getProducts (page = 1) {
            axios.get(`${url}/api/${path}/products/?page=${page}`)
              .then((res) => {
                this.products = res.data.products;
                this.pagination = res.data.pagination;
              })
              .catch((error) => {
                console.dir(error);
                alert(error.data.message);
              })
        },
    },
    mounted() {
        this.getProducts()
    },
})
const pinia = createPinia()
app.use(pinia)

app.mount('#app');