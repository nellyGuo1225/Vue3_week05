export default {
    props: ['products'],
    template:
    `<div class="row row-cols-5">
      <div class="col" v-for="item in products" :key="item.id">
          <div class="card my-2" >
              <img :src="item.imageUrl" class="card-img-top" alt="商品主圖片">
              <div class="card-body">
                <h5 class="card-title">{{item.title}}
                </h5>
                <h5>$ {{item.price}}</h5>
                <a href="#" class="btn btn-outline-success w-100">加入購物車</a>
              </div>
          </div>
      </div>
    </div>`
}