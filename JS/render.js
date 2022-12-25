var count = 0;
var getMembers = JSON.parse(localStorage.getItem("Member"));
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
  <li><input type="button" value="Shop"></li>
  <li><input type="button" value="About"></li>
  <li><input type="button" value="Services"></li>
  <li><input type="button" value="Favourite" onclick="showFavList()"></li>
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
  let btnDelete = document.getElementById("deleteCart");
  btnDelete.addEventListener("click", () => {
    let flag = JSON.parse(localStorage.getItem("Flag"));
    let getMember = JSON.parse(localStorage.getItem("Member"));
    let myCart;
    let userCart;
    if (flag) {
      for (let i = 0; i < getMember.length; i++) {
        if (getMember[i].status) {
          myCart = JSON.parse(localStorage.getItem(`${getMember[i].username}`));
          userCart = getMember[i].username;
          break;
        }
      }
    }
    localStorage.removeItem(`${userCart}`);
    document.getElementById("tableCart").innerHTML = "";
    document.getElementById("small").innerHTML = "";
    document.getElementById("totalCart").innerHTML = "";
  });
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
      <li><a href="https://www.facebook.com/" class="fa fa-facebook"></a></li>
          <li><a href="https://www.instagram.com/" class="fa fa-instagram"></a></li>
          <li><a href="https://www.youtube.com/" class="fa fa-youtube"></a></li>
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
  document.getElementById("productDetail").innerHTML = `<table id="fav-list"></table>`
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
        <li><input type="button" value="My profile" id="goToProfile" onclick="showProfileUser()"></li>
        <li><input type="button" value="My favorites" id="goToFavorites" onclick="showFavList()"></li>
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

const profileUser = document.getElementById("profileUser");
function renderUserProfile() {
  let user = JSON.parse(localStorage.getItem("Member"));
  let data = "";
  if (user != null) {
    for (let i = 0; i < user.length; i++) {
      if (user[i].status) {
        data = `<img src="${user[i].avatar}" alt="">
        <div id="profileUsername">${user[i].username}</div>
        <input type="password" value="${user[i].password}" id="profilePassword" disabled>
        <input type="button" value="&#128072;Edit" class="editProfilePass" onclick="unlockPass()">
        <input type="button" value="&#128076;Save" class="editProfilePass" onclick="savePass()">
        <i id="iconEye" class="fa-regular fa-eye-slash" onclick="changeType()"></i>
        <input type="button" value="X" id="closeProfile" onclick="closeProfile()">`;
        break;
      }
    }
  }
  document.getElementById("profileData").innerHTML = data;
}
renderUserProfile();

function changeType() {
  let ipnElement = document.querySelector("#profilePassword");
  let iconElement = document.querySelector("#iconEye");
  const currentType = ipnElement.getAttribute("type");
  ipnElement.setAttribute(
    "type",
    currentType === "password" ? "text" : "password"
  );
  iconElement.classList.toggle("fa-eye");
}
function unlockPass() {
  let iconElement = document.getElementById("iconEye");
  iconElement.style.display = "block";
  document.getElementById("profilePassword").removeAttribute("disabled");
}
function savePass() {
  let getMembers = JSON.parse(localStorage.getItem("Member"));
  let profilePassword = document.getElementById("profilePassword");
  let profileUsername = document.getElementById("profileUsername");
  for (i = 0; i < getMembers.length; i++) {
    if (getMembers[i].username == profileUsername.innerHTML) {
      getMembers[i].password = profilePassword.value;
      break;
    }
  }
  localStorage.setItem("Member", JSON.stringify(getMembers));
  let iconElement = document.getElementById("iconEye");
  iconElement.style.display = "none";
  document.getElementById("profilePassword").setAttribute("disabled", "");
}
function closeProfile() {
  profileUser.style.display = "none";
}

function logOutUser(id) {
  let user = JSON.parse(localStorage.getItem("Member"));
  for (let i = 0; i < user.length; i++) {
    if (user[i].id == id) {
      user[i].status = false;
      let flag = false;
      localStorage.setItem("Flag", JSON.stringify(flag));
      break;
    }
  }
  localStorage.setItem("Member", JSON.stringify(user));
  loginBtn.style.display = "block";
  renderUserAction();
}
function showProfileUser() {
  profileUser.style.display = "block";
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

//! Add to cart //

function addToCart(id) {
  let flag = JSON.parse(localStorage.getItem("Flag"));
  let getMember = JSON.parse(localStorage.getItem("Member"));
  let cart = JSON.parse(localStorage.getItem("listProduct"));
  let myCart;
  let userCart;
  for (let i = 0; i < getMember.length; i++) {
    if (
      getMember[i].status &&
      localStorage.getItem(`${getMember[i].username}`) == null
    ) {
      localStorage.setItem(`${getMember[i].username}`, "");
    }
  }
  if (flag) {
    for (let i = 0; i < getMember.length; i++) {
      if (getMember[i].status) {
        myCart = localStorage.getItem(`${getMember[i].username}`);
        userCart = getMember[i].username;
        break;
      }
    }
    //   ? Nếu giỏ hàng đang rỗng  //
    if (myCart == "") {
      listProduct = [];
      for (let i = 0; i < cart.length; i++) {
        let count = parseInt(cart[i].quantity);
        if (cart[i].id == id) {
          if (parseInt(document.getElementById("input" + id).value) > 0) {
            count += parseInt(document.getElementById("input" + id).value);
            cart[i].quantity = count;
          }
          listProduct.push(cart[i]);
          document.getElementById("input" + id).value = 0;
          localStorage.setItem(`${userCart}`, JSON.stringify(listProduct));
          break;
        }
      }
    } else {
      // //? Nếu giỏ đã có hàng //
      let listProduct = JSON.parse(localStorage.getItem(`${userCart}`));
      let key = true;
      if (listProduct != null) {
        for (let i = 0; i < listProduct.length; i++) {
          let quantity = parseInt(listProduct[i].quantity);

          //   TODO TH1: Nếu mặt hàng này đã có trong giỏ (Cộng số lượng) //
          if (id == listProduct[i].id) {
            key = true;
            if (parseInt(document.getElementById("input" + id).value) > 0) {
              quantity += parseInt(document.getElementById("input" + id).value);
            }
            listProduct[i].quantity = quantity;
            document.getElementById("input" + id).value = 0;
            console.log(listProduct);
            localStorage.setItem(`${userCart}`, JSON.stringify(listProduct));
            break;
          } else {
            // TODO TH2: Nếu mặt hàng này chưa có trong giỏ //
            key = false;
          }
        }
        if (key == false) {
          let listProduct = JSON.parse(localStorage.getItem(`${userCart}`));
          let quantity = parseInt(cart[id].quantity);
          if (parseInt(document.getElementById("input" + id).value) > 0) {
            quantity += parseInt(document.getElementById("input" + id).value);
            cart[id].quantity = quantity;
          }
          listProduct.push(cart[id]);
          document.getElementById("input" + id).value = 0;
          localStorage.setItem(`${userCart}`, JSON.stringify(listProduct));
        }
      }
    }
    showCart();
    totalCart();
  } else {
    alert("Please login first");
  }
}

//! Show Cart //
//? Hide - Show //
let btnCart = document.getElementById("cart-button");
btnCart.addEventListener("click", () => {
  let visible = document.getElementById("cart-menu");
  let cart = localStorage.getItem("myCart");
  if (visible.style.visibility == "") {
    visible.style.visibility = "visible";
  } else {
    visible.style.visibility =
      visible.style.visibility == "hidden" ? "visible" : "hidden";
  }
  if (cart != "") {
  }
  showCart();
  totalCart();
});

function showCart() {
  let flag = JSON.parse(localStorage.getItem("Flag"));
  let getMember = JSON.parse(localStorage.getItem("Member"));
  let myCart;
  let userCart;
  let showCart = document.getElementById("show-cart");
  if (flag) {
    for (let i = 0; i < getMember.length; i++) {
      if (getMember[i].status) {
        myCart = JSON.parse(localStorage.getItem(`${getMember[i].username}`));
        userCart = getMember[i].username;
        break;
      }
    }
    let dataProduct = `<tr>
    <td>Num</td>
    <td>Picture</td>
    <td>Name</td>
    <td>Price</td>
    <td>Quantity</td>
    <td>Total Money</td>
    </tr>
    `;
    for (let i = 0; i < myCart.length; i++) {
      dataProduct += `
      <tr>
      <td>${i + 1}</td>
      <td><img src="${myCart[i].img}" alt=""></td>
      <td>${myCart[i].name}</td>
      <td>${myCart[i].price}USD</td>
      <td>
      <input type="number" value="${myCart[i].quantity}" id="editQuantity${
        myCart[i].id
      }" disabled>
      <input type="button" value="&#9997;" onclick="changeValue(${
        myCart[i].id
      })" id="pencilEdit">
      </td>
      <td>${myCart[i].quantity * myCart[i].price} USD</td>
      </tr>
      `;
    }
    document.getElementById("tableCart").innerHTML = dataProduct;
    if (myCart.length > 4) {
      showCart.style.overflow = "auto";
      showCart.style.height = "40vh";
    } else {
      showCart.style.height = "auto";
    }
  }
}

function changeValue(id) {
  let editQuantity = document.getElementById(`editQuantity${id}`);
  let getMember = JSON.parse(localStorage.getItem("Member"));
  let flag = JSON.parse(localStorage.getItem("Flag"));
  let myCart;
  let userCart;
  if (flag) {
    for (let i = 0; i < getMember.length; i++) {
      if (getMember[i].status) {
        myCart = JSON.parse(localStorage.getItem(`${getMember[i].username}`));
        userCart = getMember[i].username;
        break;
      }
    }
    for (i = 0; i < myCart.length; i++) {
      if (myCart[i].id == id) {
        if (editQuantity.value >= 0) {
          myCart[i].quantity = editQuantity.value;
          break;
        }
      }
    }
    localStorage.setItem(`${userCart}`, JSON.stringify(myCart));
    console.log(editQuantity.getAttribute("disabled"));
    if (editQuantity.getAttribute("disabled") == null) {
      showCart();
      totalCart();
    }
  }
  editQuantity.toggleAttribute("disabled");
}

//? Total cart //
function totalCart() {
  let flag = JSON.parse(localStorage.getItem("Flag"));
  let getMember = JSON.parse(localStorage.getItem("Member"));
  let myCart;
  let userCart;
  let sum = 0;
  let total = 0;
  if (flag) {
    for (let i = 0; i < getMember.length; i++) {
      if (getMember[i].status) {
        myCart = JSON.parse(localStorage.getItem(`${getMember[i].username}`));
        userCart = getMember[i].username;
        break;
      }
    }
    for (let i = 0; i < myCart.length; i++) {
      sum += parseInt(myCart[i].quantity);
      total += parseInt(myCart[i].quantity * myCart[i].price);
    }
    document.getElementById("small").innerHTML = sum;
    document.getElementById("totalCart").innerHTML =
      "Total product: " + sum + "&nbsp&nbsp Total money: " + total + "&nbspUSD";
  }
}

//! Favourite product //
function addFav(id) {
  let flag = JSON.parse(localStorage.getItem("Flag"));
  let getMember = JSON.parse(localStorage.getItem("Member"));
  let cart = JSON.parse(localStorage.getItem("listProduct"));
  let myFavourite;
  let userCartFav;
  for (let i = 0; i < getMember.length; i++) {
    if (
      getMember[i].status &&
      localStorage.getItem(`fav${getMember[i].username}`) == null
    ) {
      localStorage.setItem(`fav${getMember[i].username}`, "");
    }
  }
  if (flag) {
    for (let i = 0; i < getMember.length; i++) {
      if (getMember[i].status) {
        myFavourite = localStorage.getItem(`fav${getMember[i].username}`);
        userCartFav = getMember[i].username;
        break;
      }
    }
    //   ? Nếu danh sách đang rỗng  //
    if (myFavourite == "") {
      listProductFav = [];
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id == id) {
          listProductFav.push(cart[i]);
          localStorage.setItem(
            `fav${userCartFav}`,
            JSON.stringify(listProductFav)
          );
          break;
        }
      }
    } else {
      // //? Nếu danh sách đã có hàng //
      let listProductFav = JSON.parse(
        localStorage.getItem(`fav${userCartFav}`)
      );
      let key = true;
      if (listProductFav != null) {
        for (let i = 0; i < listProductFav.length; i++) {
          //   TODO TH1: Nếu mặt hàng này đã có trong giỏ thì không thêm //
          if (id == listProductFav[i].id) {
            key = true;
            alert("This product has already been added.");
            break;
          } else {
            //   TODO TH2: Nếu mặt hàng này chưa có trong giỏ thì thêm //
            key = false;
            break;
          }
        }
        if (key == false) {
          let listProductFav = JSON.parse(
            localStorage.getItem(`fav${userCartFav}`)
          );
          listProductFav.push(cart[id]);
          console.log(listProductFav);
          localStorage.setItem(
            `fav${userCartFav}`,
            JSON.stringify(listProductFav)
          );
        }
      }
    }
  } else {
    alert('Please login and try again.');
  }
}

function showFavList() {
  let open = document.getElementById("fullSrceen");
  let flag = JSON.parse(localStorage.getItem("Flag"));
  let getMember = JSON.parse(localStorage.getItem("Member"));
  let myFavourite;
  let userCartFav;
  let productDetail = document.getElementById("productDetail");
  let data = `<input type="button" value="X" onclick="closeDetail()" id="closeBtn">
  <tr>
  <th>Name</th>
  <th>Picture</th>
  <th>Price</th>
  <th>Actions</th>
</tr>`;
  open.style.display = "block";
  if (flag) {
    for (let i = 0; i < getMember.length; i++) {
      if (getMember[i].status) {
        myFavourite = JSON.parse(
          localStorage.getItem(`fav${getMember[i].username}`)
        );
        userCartFav = getMember[i].username;
        break;
      }
    }
    if (myFavourite != null) {
      for (j = 0; j < myFavourite.length; j++) {
        data += `<tr>
        <td>${myFavourite[j].name}</td>
        <td><img src="${myFavourite[j].img}" alt=""></td>
        <td>${myFavourite[j].price} USD</td>
        <td><input type="button" value="Unlike" onclick="deleteFavItem(${myFavourite[j].id})"></td>
      </tr>`;
      }
      if (myFavourite.length > 4) {
        productDetail.style.overflow = "auto";
        productDetail.style.height = "40vh";
      } else {
        productDetail.style.height = "auto";
      }
    }
  }
  document.getElementById("fav-list").innerHTML = data;
}
function deleteFavItem(id) {
  let getMember = JSON.parse(localStorage.getItem("Member"));
  let myFavourite;
  let userCartFav;
  for (let i = 0; i < getMember.length; i++) {
    if (getMember[i].status) {
      myFavourite = JSON.parse(localStorage.getItem(`fav${getMember[i].username}`));
      userCartFav = getMember[i].username;
      break;
    }
  }
  if (myFavourite.length > 1) {
    for (let i = 0; i < myFavourite.length; i++) {
      if (myFavourite[i].id == id) {
        myFavourite.splice(i, 1);
        localStorage.setItem(`fav${userCartFav}`,JSON.stringify(myFavourite));
        break;
      }
    }
  } else {
    localStorage.removeItem(`fav${userCartFav}`);
    document.getElementById("fav-list").innerHTML = "";
  }
  showFavList();
}
