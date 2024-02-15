const { createApp } = Vue;

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
VeeValidateI18n.loadLocaleFromURL("https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json");

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize('zh_TW'),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

let detailModal = null;

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
            },
            cartProduct: {},
            itemNum:0,
            tempProduct: {},
            loadingStatus: false
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
            if(this.itemNum === 0){
              alert("購物車請加入品項再送出訂單。")
              this.$refs.form.resetForm();
              this.form.message = '';
              return
            }
            axios.post(`${url}/api/${path}/order`, {data:order})
              .then((res) => {
                alert(res.data.message)
                this.$refs.form.resetForm();
                this.form.message = '';
                this.getCartProducts();
              })
              .catch((error) => {
                console.dir(error);
                alert(error.data.message);
              })
        },
        addToCart(id,qty=1) {
            this.loadingStatus = true;
            const temp = {
                product_id: id,
                qty: qty
            };
            axios.post(`${url}/api/${path}/cart`, { data:temp })
            .then((res) => {
              this.loadingStatus = false;
              alert(res.data.message);
              this.getCartProducts();
              detailModal.hide();
              this.tempProduct={};
            })
            .catch((error) => {
              console.dir(error);
              alert(error.data.message);
            })
        },
        updateCart(item) {
          
            const temp = {
                product_id: item.product_id,
                qty: item.qty
            };

            const id = item.id
            console.log(id,temp.product_id);

            axios.put(`${url}/api/${path}/cart/${id}`,{ data:temp })
            .then((res) => {
              alert(res.data.message)
              this.getCartProducts()
            })
            .catch((error) => {
              console.dir(error);
              alert(error.data.message);
            })
        },
        getCartProducts () {
            axios.get(`${url}/api/${path}/cart`)
            .then((res) => {
              this.cartProduct = res.data;
              this.itemNum = this.cartProduct.data.carts.length;
            })
            .catch((error) => {
              console.dir(error);
              alert(error.data.message);
            })
        },
        delProduct(id) {
            axios.delete(`${url}/api/${path}/cart/${id}`)
            .then((res) => {
              alert(res.data.message)
              this.getCartProducts()
            })
            .catch((error) => {
              console.dir(error);
              alert(error.data.message);
            })
        },
        delCarts() {
            this.loadingStatus = true;
            console.log(this.itemNum);
            axios.delete(`${url}/api/${path}/carts`)
            .then((res) => {
              this.loadingStatus = false;
              alert(res.data.message)
              this.getCartProducts()
            })
            .catch((error) => {
              console.dir(error);
              alert(error.data.message);
            })
        },
        checkDetail (item) {
            this.tempProduct = {...item,qty:1};
            detailModal.show();
            console.log( this.tempProduct);
        },
        isPhone (value) {
          const phoneNumber = /^(09)[0-9]{8}$/
          return phoneNumber.test(value) ? true : '請輸入手機號碼'
        }
    },
    mounted() {
        this.getProducts()
        this.getCartProducts()

        detailModal = new bootstrap.Modal(this.$refs.cartModal, {
            keyboard: false,
            backdrop: 'static'
        })
    },
})

app.component('VForm', VeeValidate.Form);
app.component('VField', VeeValidate.Field);
app.component('ErrorMessage', VeeValidate.ErrorMessage);

app.component('loading', VueLoading.Component);
app.mount('#app');