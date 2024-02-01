const { createApp } = Vue;
const { createPinia } = Pinia;

//import productStore from '../Store/productStore.js'
import Navbar from '../components/navComponent.js'
import Cart from '../components/cartComponent.js'
import ProductCard from '../components/productCardComponent.js'
import Pagination from '../components/pageComponent.js'

const url = "https://vue3-course-api.hexschool.io/v2";
const path = "nian-api";

Object.keys(VeeValidateRules).forEach(rule => {
    if (rule !== 'default') {
      VeeValidate.defineRule(rule, VeeValidateRules[rule]);
    }
});

// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL('../zh_TW.json');

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

const app = createApp({
    data() {
        return {
            products: [],
            pagination: {},
            form: {
                user: {
                    name: '',
                    email: '',
                    tel: '',
                    address: ''
                },
                message: ''
            }
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
        onSubmit () {
            const order = this.form
            axios.post(`${url}/api/${path}/order`, {data:order})
              .then((res) => {
                alert(res.data.message)
                this.$refs.form.resetForm();
              })
              .catch((error) => {
                console.dir(error);
                alert(error.data.message);
              })
        }
    },
    mounted() {
        this.getProducts()
    },
})
// const pinia = createPinia()
// app.use(pinia)

app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.mount('#app');