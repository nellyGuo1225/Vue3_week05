export default {
    template:
    `<div class="bg-light my-4 p-3">
    <div class="text-seconary">購物車沒有任何品項</div> <!--v-if-->
      <table class="table align-middle"> <!--v-else-->
          <tbody>
              <tr>
                  <td>
                      <button type="button" class="btn">X</button>
                  </td>
                  <td>商品名稱</td>
                  <td width="200">
                      <div class="input-group mb-3">
                          <input type="number" class="form-control" aria-label="Recipient's username" aria-describedby="basic-addon2">
                          <span class="input-group-text" id="basic-addon2">個</span>
                      </div>
                  </td>
                  <td class="text-end">$1000</td>
                  <td><button type="button" class="btn btn-outline-primary float-end">查看更多</button></td>
              </tr>
          </tbody>
          <tfoot>
              <tr>
                  <td class="text-end" colspan="5">總計 $900</td>
              </tr>
          </tfoot>
      </table>
    </div>`
}