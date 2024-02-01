export default {
    props:['itemNum'],
    template: 
    `<nav class="navbar navbar-light bg-light w-100">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1">豹豹購物</span>
          <button type="button" class="btn">購物車
            <span class="badge rounded-pill bg-danger">{{itemNum}}</span>
          </button>
        </div>
    </nav>`
}