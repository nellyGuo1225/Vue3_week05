export default {
    props:['cartProduct'],
    methods: {
        delCartItem (id) {
            this.$emit('del-product',id)
        },
        updateQty (id) {
            this.$emit('update-cart',id)
        }
    },
    template:
    `
    <div class="bg-light my-4 p-3">
    <div class="text-seconary" v-if="!cartProduct.data">購物車沒有任何品項</div>
      <table class="table align-middle" v-else>
          <tbody>
              <tr v-for="item in cartProduct.data.carts" :key="item.id">
                  <td>
                      <button type="button" class="btn btn-outline-danger" @click="delCartItem(item.id)">X</button>
                  </td>
                  <td>{{item.product.title}}</td>
                  <td width="200">
                      <div class="input-group mb-3">
                          <input type="number" class="form-control" aria-label="product num" aria-describedby="basic-addon2"
                          v-model="item.qty" @blur="updateQty(item.id)">
                          <span class="input-group-text" id="basic-addon2">{{item.product.unit}}</span>
                      </div>
                  </td>
                  <td class="text-end">$ {{item.product.price}}</td>
              </tr>
          </tbody>
          <tfoot>
              <tr>
                  <td class="text-end" colspan="5">總計 $ {{cartProduct.data.final_total}}</td>
              </tr>
          </tfoot>
      </table>
    </div>`
}