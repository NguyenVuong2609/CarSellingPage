let count = 0;
const phoneBtn = document.getElementById("iconPhone");
function renderProduct() {
  let data = "";
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
  phoneNumber.style.display =
    phoneNumber.style.display == "none" || phoneNumber.style.display == ""
      ? "block"
      : "none";
});

//! Show product //
function showData() {
  let listProduct = JSON.parse(localStorage.getItem("listProduct"));
  let data = "";
  for (let i = 0; i < listProduct.length; i++) {
    data += `<div class="col-4 product">
      <img src="${listProduct[i].img}" alt="" onclick="details(${listProduct[i].id})"/>
      <p>${listProduct[i].name}</p>
      <label for="price">Price: ${listProduct[i].price} USD</label><br />
      <div class="actions">
      <input type="number" value="0" id="input${listProduct[i].id}" />
      <i
      onclick="addToCart(${listProduct[i].id})"
      class="fa-solid fa-cart-shopping add-cart"
      ></i>
      <i class="fas fa-heart add-cart" onclick="addFav(${listProduct[i].id})"></i>
    </div>
    </div>`;
  }
  document.getElementById("showData").innerHTML = data;
}
showData();

//! Product details //
function details(id) {
  let open = document.getElementById("fullSrceen");
  open.style.display = "block";
  let listProduct = JSON.parse(localStorage.getItem("listProduct"));
  for (let i = 0; i < listProduct.length; i++) {
    if (listProduct[i].id == id) {
      data = `
      <img src="${listProduct[i].img}" alt="">
      <p>${listProduct[i].name}</p>
      <p>This is one of the best cars in our shop.</p>
      <input type="button" value="X" onclick="closeDetail()" id="closeBtn">`;
      break;
    }
  }
  document.getElementById("productDetail").innerHTML = data;
}

function closeDetail() {
  let close = document.getElementById("fullSrceen");
  close.style.display = "none";
}

//! User Actions //
const loginBtn = document.getElementById("login-button");
function renderUserAction() {
  let user = JSON.parse(localStorage.getItem("Member"));
  let data = "";
  if (user != null) {
    for (let i = 0; i < user.length; i++) {
      if (user[i].status) {
        loginBtn.style.display = "none";
        data = `<img src="${user[i].avatar}" alt="" id="showActions">
        <div id="userActions">
        <ul>
        <li><input type="button" value="My profile" id="goToProfile"></li>
            <li><input type="button" value="Log out" id="logOutUser" onclick="logOutUser(${user[i].id})"></li>
          </ul>
          </div>`;
        break;
      }
    }
  }
  document.getElementById("bodyUser").innerHTML = data;
}
renderUserAction();

function logOutUser(id) {
  let user = JSON.parse(localStorage.getItem("Member"));
  for (let i = 0; i < user.length; i++){
    if (user[i].id == id){
      user[i].status = false;
      break;
    }
  }
  localStorage.setItem("Member",JSON.stringify(user));
  loginBtn.style.display = "block";
  renderUserAction();
}

//! Search Product //
let search = document.getElementById("search");
search.addEventListener("change", () => {
  let searchProduct = JSON.parse(localStorage.getItem("listProduct"));
  let list = "";
  for (let i = 0; i < searchProduct.length; i++) {
    if (
      searchProduct[i].name.toLowerCase().indexOf(search.value.toLowerCase()) !=
        -1 ||
      searchProduct[i].price == search.value
    ) {
      list += `<div class="col-4 product">
    <img src="${searchProduct[i].img}" alt="" onclick="details(${searchProduct[i].id})"/>
    <p>${searchProduct[i].name}</p>
    <label for="price">Price: ${searchProduct[i].price}USD</label><br />
    <div class="actions">
      <input type="number" value="0" id="input${searchProduct[i].id}" />
      <i
        onclick="addToCart(${searchProduct[i].id})"
        class="fa-solid fa-cart-shopping add-cart"
      ></i>
      <i class="fas fa-heart add-cart" onclick="addFav(${searchProduct[i].id})"></i>
    </div>
  </div>`;
      document.getElementById("showData").innerHTML = list;
    }
  }
});
