const btnconfirmPay = document.getElementById("confirmPay");
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
footerShow();

var accName;
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
              <li><input type="button" value="Log out" id="logOutUser" onclick="logOutUser(${user[i].id})"></li>
            </ul>
            </div>`;
        accName = user[i].username
        break;
      }
    }
  }
  document.getElementById("bodyUser").innerHTML = data;
}
renderUserAction();

const userActions = document.getElementById("userActions");
var getMembers = JSON.parse(localStorage.getItem("Member"));
if (getMembers == null) {
  let loginBtn = document.getElementById("login-button");
  loginBtn.addEventListener("click", () => {
    window.location = "/Pages/login.html";
  });
} else if (getMembers != null) {
  for (let i = 0; i < getMembers.length; i++) {
    if (getMembers[i].status == false) {
      let loginBtn = document.getElementById("login-button");
      loginBtn.addEventListener("click", () => {
        window.location = "/Pages/login.html";
      });
    } else {
      let loginBtn = document.getElementById("login-button");
      loginBtn.addEventListener("click", () => {
        window.location = "/Pages/login.html";
      });
      const showActions = document.getElementById("showActions");
      showActions.addEventListener("click", () => {
        userActions.style.display =
          userActions.style.display == "none" || userActions.style.display == ""
            ? "block"
            : "none";
      });
    }
  }
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

var sum = 0;
function showCart() {
  let flag = JSON.parse(localStorage.getItem("Flag"));
  let getMember = JSON.parse(localStorage.getItem("Member"));
  let myCart;
  let userCart;
  let total = 0;
  if (flag) {
    for (let i = 0; i < getMember.length; i++) {
      if (getMember[i].status) {
        myCart = JSON.parse(localStorage.getItem(`${getMember[i].username}`));
        userCart = getMember[i].username;
        break;
      }
    }
    if (myCart == null) {
        console.log(btnconfirmPay.style.display);
        btnconfirmPay.style.display = "none";
        document.getElementById("tableCart").innerHTML = "";
        document.getElementById('showTotal').innerHTML = "Your cart is empty."
    } else {
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
            <td>${myCart[i].quantity}</td>
            <td>${myCart[i].quantity * myCart[i].price} USD</td>
            </tr>
            `;
            total += myCart[i].quantity * myCart[i].price
        }
        sum = total;
        document.getElementById('showTotal').innerHTML = "Your total bill is: " + total + " USD";
        document.getElementById("tableCart").innerHTML = dataProduct;
    }
  }
}
showCart();

btnconfirmPay.addEventListener("click", () =>{
    let list = JSON.parse(localStorage.getItem(`${accName}`));
    let pending = JSON.parse(localStorage.getItem("pending"));
    if (pending == null) {
        pending = [];
        pending.push({
            name: accName,
            bill: {
                list: list
            },
            id: pending.length,
            summary: sum,
            status: "pending"
        })
        localStorage.removeItem(`${accName}`);
        localStorage.setItem("pending", JSON.stringify(pending));
    } else {
        pending.push({
            name: accName,
            bill: {
                list: list
            },
            id: pending.length,
            summary: sum,
            status: "pending"
        })
        sum = 0;
        localStorage.removeItem(`${accName}`);
        localStorage.setItem("pending", JSON.stringify(pending));
    }
    alert(`
    STK: 100800106636
    Nguyen Duc Vuong
    Viettinbank CN Bac HN
    Your bill is No${pending.length}
    Your content must include your bill's number when banking.`)
    showCart();
})