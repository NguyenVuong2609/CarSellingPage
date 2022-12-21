let count = 0;
const phoneBtn = document.getElementById("iconPhone");
function renderProduct() {
  let list = "";
  let data = "";
  let productArray = JSON.parse(localStorage.getItem("listProduct"));
  data = `
      <div class="header col-12">
            <div class="col-3" id="shop">
            <img src="/IMG/logoshop.png" alt="">
              <a href="/index.html">CUTI</a><span>SHOP</span>
            </div>
            <div class="menu col-6">
              <ul class="ul-center">
                <li><a href="#">Shop</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Services</a></li>
                <li><a href="#">Favourite</a></li>
              </ul>
            </div>
            <div class="avatar col-3">
              <ul class="menu-left">
                <li>
                  <div>
                    <input type="text" placeholder="Search..." id="search" />
                    <button><i class="fa-solid fa-magnifying-glass"></i></button>
                  </div>
                </li>
                <li>
                  <a href="#">
                    <span>
                      <i class="fa-solid fa-cart-shopping" id="cart-button"></i>
                      <small id="small"></small>
                    </span>
                  </a>
                </li>
                <li>
                  <input
                    type="button"
                    value="Log in"
                    id="login-button"
                    class="custom-btn"
                  />
                </li>
                <li>
                  <div id="cart-menu">
                    <div id="show-cart">
                    <table id="tableCart">
                    </table>
                    </div>
                    <div id="totalCart"></div>
                    <input type="button" value="Delete Cart" id="deleteCart" />
                    <input type="button" value="Pay Money" id="pay-money" />
                  </div>
                </li>
              </ul>
            </div>
          </div>`;
  document.getElementById("header").innerHTML = data;
  // setInterval(bannerShow,3000);
}
renderProduct();
bannerShow();
footerShow();
//! Slideshow //
function bannerShow() {
  let arraySlideShow = [
    "/IMG/anh1.png",
    "/IMG/ferrari.jpg",
    "/IMG/lambo-1.jpg",
  ];
  dataSlide = `
      <img src="${arraySlideShow[count]}" alt="">`;
  count++;
  if (count == 3) {
    count = 0;
  }
  document.getElementById("slideShow").innerHTML = dataSlide;
}

//! Footer !//
function footerShow() {
  let data = `
    <div class="col-4 info-footer">
      <h3>Cuti<span>Shop</span></h3>
      <p><i class='fas fa-home'></i> Address: Song Da Tower, Pham Hung street, Hanoi City.</p>
      <p><i class="fas fa-phone-alt"></i> Tel: 0976.106.636</p>
      <p><i class="fas fa-mail-bulk"></i> Mail: ducvuong.269@gmail.com</p>
      <p><img src="/IMG/bct.png" alt=""></p>
    </div>
    <div class="col-4 footer-link">
      <h3>Directional</h3>
      <ul>
        <li><a href="">About</a></li>
        <li><a href="">News</a></li>
        <li><a href="">Picture</a></li>
        <li><a href="">Contact</a></li>
      </ul>
    </div>
    <div class="col-4 footer-social">
      <h3>Social</h3>
      <div class="soccialLink">
        <ul>
          <li><a href="#" class="fa fa-facebook"></a></li>
          <li><a href="#" class="fa fa-instagram"></a></li>
          <li><a href="#" class="fa fa-youtube"></a></li>
        </ul>
      </div>
    </div>`;
  document.getElementById("footer").innerHTML = data;
}
//? Show Phone //
let phoneNumber = document.getElementById("phoneNumber");
phoneBtn.addEventListener("click", () => {
  phoneNumber.style.display = (phoneNumber.style.display == "none" || phoneNumber.style.display == "") ? "block" : "none";
});

//! Show product //
function showData(){
  let listProduct = JSON.parse(localStorage.getItem("listProduct"));
  console.log(listProduct);
  let data = "";
  for (let i = 0; i < listProduct.length; i++) {
    data += `<div class="col-4 product">
    <img src="${listProduct[i].img}" alt="" onclick="details(${listProduct[i].id})"/>
    <p>${listProduct[i].name}</p>
    <label for="price">Price: ${listProduct[i].price}USD</label><br />
    <div class="actions">
      <input type="number" value="0" id="input${listProduct[i].id}" />
      <i
        onclick="addToCart(${listProduct[i].id})"
        class="fa-solid fa-cart-shopping add-cart"
      ></i>
      <i class="fas fa-heart add-cart" onclick="addFav(${listProduct[i].id})"></i>
    </div>
  </div>`
  }
  document.getElementById('showData').innerHTML = data;
}
showData();

//! Product details //
function details(id) {
  
}