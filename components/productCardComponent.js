export default {
    props: ['products'],
    methods: {
      addToCart (id) {
        this.$emit('add-to-cart', id)
      },
      checkItem (item) {
        this.$emit('check-detail', item)
      }
    },
    template:
    `<div class="row row-cols-5">
      <div class="col" v-for="item in products" :key="item.id">
          <div class="card my-2" >
              <img :src="item.imageUrl" class="card-img-top" alt="商品主圖片">
              <div class="card-body">
                <h5 class="card-title">{{item.title}}
                </h5>
                <h5>$ {{item.price}}</h5>
                <button type="button" class="btn btn-outline-primary float-end" 
                  @click="checkItem(item)">查看更多</button>
                <a href="#" class="btn btn-outline-success " 
                  @click.prevent="addToCart(item.id)">加入購物車</a>
              </div>
          </div>
      </div>
    </div>`
}