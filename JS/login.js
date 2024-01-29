const { createApp } = Vue;
const url = "https://vue3-course-api.hexschool.io/v2";
const path = "nian-api";

const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
    "$1",
  );
axios.defaults.headers.common['Authorization'] = token; 

const app = createApp({
    data() {
        return {
            user: {
                username: '',
                password: ''
            },
            isLoading: false
        }
    },
    methods: {
        login() {
            this.isLoading = true;
            axios.post(`${url}/admin/signin`, this.user)
                .then((res) => {
                    //alert(res.data.message);
                    const {token, expired} = res.data;
                    document.cookie = `hexToken=${ token }; expires=${ new Date(expired)}`;
                    alert(res.data.message);
                    this.isLoading = false;
                    window.location.href="./product.html"

                })
                .catch((error) => {
                    alert(`${error.data.message}，請輸入正確資料並再次登入。`);
                })
        },
        

    },
});

app.component('loading', VueLoading.Component);
app.mount('#app');