renderMenuBar();
var getProduct = JSON.parse(localStorage.getItem("listProduct"));
var getMember = JSON.parse(localStorage.getItem("Member"));
var key;
const addProMenubtn = document.getElementById("addPro");
const editProbtn = document.getElementById("editPro");
const addbtnNew = document.getElementById("addbtn");
const editMembtn = document.getElementById("editMem");
const showBanlistbtn = document.getElementById("showBanlist");
let adminAcc = [
  {
    username: "admin",
    password: "admin",
  },
];
localStorage.setItem("admin", JSON.stringify(adminAcc));

addProMenubtn.addEventListener("click", () => {
  let getProduct = JSON.parse(localStorage.getItem("listProduct"));
  data = `<table id="formActions"><td><label for="name">Name:</label></td>
  <td><input type="text" placeholder="Product's name" id="inputName" required></td>
</tr>
<tr>
  <td><label for="img">Image:</label></td>
  <td><input type="text" placeholder="Image's url" id="inputIMG" required></td>
</tr>
<tr>
  <td><label for="price">Price:</label></td>
  <td><input type="number" placeholder="Price" id="inputPrice" required></td>
</tr>
<tr>
  <td><label for="group">Group:</label></td>
  <td><input type="text" placeholder="Group" id="inputGroup"></td>
</tr>
<tr>
  <td><label for="file">Image file</label></td>
  <td><input type="file" accept=".jpg, .png" id="inputFile" onclick="readURL(this)">
  <button onclick="saveIMGUrl()">Save</button></td>
</tr>
</table> 
  <input type="button" value="ADD" id="addbtn" onclick="newProduct()"> 
  <br>
  <input type="text" placeholder="Search..." id="search">`;
  document.getElementById("formAdd").innerHTML = data;
  document.getElementById("formAdd").style.display = "block";
  
  
  //! Tìm kiếm //
  let search = document.getElementById("search");
  search.addEventListener("change", () => {
    let searchProduct = JSON.parse(localStorage.getItem("listProduct"));
    let list = `<tr>
    <th>No.</th>
    <th>Name</th>
    <th>Picture</th>
    <th>Price</th>
    <th>ID</th>
    <th>Actions</th>
  </tr>`;
    for (let i = 0; i < searchProduct.length; i++) {
      if (
        searchProduct[i].name
          .toLowerCase()
          .indexOf(search.value.toLowerCase()) != -1 ||
        searchProduct[i].price == search.value
      ) {
        list += `<tr>
        <td>${i + 1}</td>
        <td>${searchProduct[i].name}</td>
        <td><img src="${searchProduct[i].img}" alt=""></td>
        <td>${searchProduct[i].price}USD</td>
        <td>${searchProduct[i].id}</td>
        <td><input type="button" value="Delete" onclick="deletePro(${
          searchProduct[i].id
        })"></td>
    </tr>
        `;
        document.getElementById("data").innerHTML = list;
      }
    }
  });

  renderProduct(getProduct);
});
//! File IMG url //
function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e) {
          localStorage.setItem("image",e.target.result)
      }
      reader.readAsDataURL(input.files[0]);
  }
}
function saveIMGUrl(){
  let imgUrl =localStorage.getItem("image");
  let inputIMG = document.getElementById("inputIMG");
  let inputFile = document.getElementById("inputFile");
  inputIMG.value = imgUrl;
  inputFile.value = "";
  localStorage.removeItem("image");
}
//! Render Product Add/remove//
function renderProduct(product) {
  let data = `<tr>
    <th>No.</th>
    <th>Name</th>
    <th>Picture</th>
    <th>Price</th>
    <th>ID</th>
    <th>Actions</th>
</tr>`;
  for (let i = 0; i < product.length; i++) {
    data += `<tr>
        <td>${i + 1}</td>
        <td>${product[i].name}</td>
        <td><img src="${product[i].img}" alt=""></td>
        <td>${product[i].price}USD</td>
        <td>${product[i].id}</td>
        <td><input type="button" value="Delete" onclick="deletePro(${
          product[i].id
        })"></td>
    </tr>
        `;
  }
  document.getElementById("data").innerHTML = data;
}

//! Render Product Edit //
function renderEditProduct(product) {
  let data = `<tr>
    <th>No.</th>
    <th>Name</th>
    <th>Picture</th>
    <th>Price</th>
    <th>ID</th>
    <th>Actions</th>
</tr>`;
  for (let i = 0; i < product.length; i++) {
    data += `<tr>
        <td>${i + 1}</td>
        <td>${product[i].name}</td>
        <td><img src="${product[i].img}" alt=""></td>
        <td>${product[i].price}USD</td>
        <td>${product[i].id}</td>
        <td><input type="button" value="Edit" onclick="editPro(${
          product[i].id
        })"></td>
    </tr>
        `;
  }
  document.getElementById("data").innerHTML = data;
}

//! Render Member //
function renderMember(member) {
  let data = `<tr>
    <th>No.</th>
    <th>Username</th>
    <th>Avatar</th>
    <th>Status</th>
    <th>Password</th>
    <th>Permissions</th>
    <th>Actions</th>
</tr>`;
  for (let i = 0; i < member.length; i++) {
    data += `<tr>
        <td>${i + 1}</td>
        <td>${member[i].username}</td>
        <td><img src="${member[i].avatar}" alt=""></td>
        <td>${member[i].status}</td>
        <td>${member[i].password}</td>
        <td>${member[i].permissions}</td>
        <td><input type="button" value="Ban" onclick="banMem(${
          member[i].id
        })"></td>
    </tr>
        `;
  }
  document.getElementById("data").innerHTML = data;
}

//? Render Menu bar //
function renderMenuBar() {
  data = `<div class="nav-menuContent col-3">
  <div class="product">
      <h3>Product</h3>
      <ul>
          <li><input type="button" value="Add/Remove product" id="addPro" class="draw"></li>
          <li><input type="button" value="Edit product" id="editPro" class="draw"></li>
          <li><input type="button" value="Add group" class="draw"></li>
          <li><input type="button" value="Manage Profit" class="draw"></li>
      </ul>
  </div>
  <div class="member">
      <h3>Member</h3>
      <ul>
          <li><input type="button" value="Edit member" class="draw" id="editMem"></li>
          <li><input type="button" value="Manage Order" class="draw"></li>
          <li><input type="button" value="Banned List" class="draw" id="showBanlist"></li>
      </ul>
  </div>
  <div class="member">
      <h3>Information</h3>
      <ul>
          <li><input type="button" value="About" class="draw"></li>
          <li><input type="button" value="News" class="draw"></li>
      </ul>
  </div>
  <div id="logo">
      <img src="/IMG/logoshop.png" alt="">
      <div>Cuti<span>Shop</span></div>
  </div>
</div>`;
  document.getElementById("renderMenu").innerHTML = data;
}

//! Thêm sản phẩm lên local //
function newProduct() {
  let getProduct = JSON.parse(localStorage.getItem("listProduct"));
  let name = document.getElementById("inputName");
  let img = document.getElementById("inputIMG");
  let price = document.getElementById("inputPrice");
  let group = document.getElementById("inputGroup");
  if (getProduct == null) {
    getProduct = [];
    if (name.value != "" && price.value != "" && img.value != "") {
      getProduct.push({
        name: name.value,
        img: img.value,
        price: parseInt(price.value),
        id: getProduct.length,
        group: group.value,
        quantity: 0,
      });
    }
  } else {
    if (name.value != "" && price.value != "" && img.value != "") {
      getProduct.push({
        name: name.value,
        img: img.value,
        price: parseInt(price.value),
        id: getProduct.length,
        group: group.value,
        quantity: 0,
      });
    }
  }
  localStorage.setItem("listProduct", JSON.stringify(getProduct));
  document.getElementById("inputName").value = "";
  document.getElementById("inputIMG").value = "";
  document.getElementById("inputPrice").value = "";
  document.getElementById("inputGroup").value = "";
  renderProduct(getProduct);
}

//! Delete product //
function deletePro(id) {
  let getProduct = JSON.parse(localStorage.getItem("listProduct"));
  if (getProduct.length > 1) {
    for (let i = 0; i < getProduct.length; i++) {
      if (getProduct[i].id == id) {
        getProduct.splice(i, 1);
      }
    }
    for (let j = 0; j < getProduct.length; j++) {
      getProduct[j].id = j;
    }
  } else {
    getProduct = [];
  }
  localStorage.setItem("listProduct", JSON.stringify(getProduct));
  renderProduct(getProduct);
}
//! Edit Product //
editProbtn.addEventListener("click", () => {
  let getProduct = JSON.parse(localStorage.getItem("listProduct"));
  data = `<table id="formActions"><td><label for="name">Name:</label></td>
  <td><input type="text" placeholder="Product's name" id="inputName" required></td>
  </tr>
  <tr>
  <td><label for="img">Image:</label></td>
  <td><input type="text" placeholder="Image's url" id="inputIMG" required></td>
  </tr>
  <tr>
  <td><label for="price">Price:</label></td>
  <td><input type="number" placeholder="Price" id="inputPrice" required></td>
  </tr>
<tr>
  <td><label for="group">Group:</label></td>
  <td><input type="text" placeholder="Group" id="inputGroup"></td>
</tr></table> 
<input type="button" value="Save" id="savebtn"> 
<br>
<input type="text" placeholder="Search..." id="search">`;
  document.getElementById("formAdd").innerHTML = data;
  document.getElementById("formAdd").style.display = "block";
  renderEditProduct(getProduct);

  let savebtn = document.getElementById("savebtn");
  savebtn.addEventListener("click", () => {
    let myList = JSON.parse(localStorage.getItem("listProduct"));
    let name = document.getElementById("inputName");
    let img = document.getElementById("inputIMG");
    let price = document.getElementById("inputPrice");
    let group = document.getElementById("inputGroup");
    for (let i = 0; i < myList.length; i++) {
      if (myList[i].id == key) {
        myList[i].name = name.value;
        myList[i].img = img.value;
        myList[i].price = parseInt(price.value);
        myList[i].group = group.value;
        key = "";
        break;
      }
    }
    document.getElementById("inputName").value = "";
    document.getElementById("inputIMG").value = "";
    document.getElementById("inputPrice").value = "";
    document.getElementById("inputGroup").value = "";
    localStorage.setItem("listProduct", JSON.stringify(myList));

    renderEditProduct(myList);
  });

  let search = document.getElementById("search");
  search.addEventListener("change", () => {
    let searchProduct = JSON.parse(localStorage.getItem("listProduct"));
    let list = `<tr>
    <th>No.</th>
    <th>Name</th>
    <th>Picture</th>
    <th>Price</th>
    <th>ID</th>
    <th>Actions</th>
  </tr>`;
    for (let i = 0; i < searchProduct.length; i++) {
      if (
        searchProduct[i].name
          .toLowerCase()
          .indexOf(search.value.toLowerCase()) != -1 ||
        searchProduct[i].price == search.value
      ) {
        list += `<tr>
        <td>${i + 1}</td>
        <td>${searchProduct[i].name}</td>
        <td><img src="${searchProduct[i].img}" alt=""></td>
        <td>${searchProduct[i].price}USD</td>
        <td>${searchProduct[i].id}</td>
        <td><input type="button" value="Edit" onclick="editPro(${
          searchProduct[i].id
        })"></td>
    </tr>
        `;
        document.getElementById("data").innerHTML = list;
      }
    }
  });
});
function editPro(id) {
  let myList = JSON.parse(localStorage.getItem("listProduct"));
  let name = document.getElementById("inputName");
  let img = document.getElementById("inputIMG");
  let price = document.getElementById("inputPrice");
  let group = document.getElementById("inputGroup");
  for (let i = 0; i < myList.length; i++) {
    if (myList[i].id == id) {
      name.value = myList[i].name;
      img.value = myList[i].img;
      price.value = myList[i].price;
      group.value = myList[i].group;
      key = myList[i].id;
      break;
    }
  }
}

//! Edit members //
editMembtn.addEventListener("click", () => {
  let getMember = JSON.parse(localStorage.getItem("Member"));
  document.getElementById("formAdd").style.display = "none";
  renderMember(getMember);
});
function banMem(id) {
  let getMember = JSON.parse(localStorage.getItem("Member"));
  for (let i = 0; i < getMember.length; i++) {
    if (getMember[i].id == id) {
      getMember[i].permissions = "banned";
    }
  }
  localStorage.setItem("Member", JSON.stringify(getMember));
  renderMember(getMember);
}

//! Banlist //
showBanlistbtn.addEventListener("click", () => {
  renderBanlist();
});
function renderBanlist() {
  let getMember = JSON.parse(localStorage.getItem("Member"));
  let count = 1;
  data = `<tr>
  <th>No.</th>
  <th>Username</th>
  <th>Avatar</th>
  <th>Status</th>
  <th>Password</th>
  <th>Permissions</th>
  <th>Actions</th>
</tr>`;
  for (let i = 0; i < getMember.length; i++) {
    if (getMember[i].permissions == "banned") {
      data += `<tr>
        <td>${count}</td>
        <td>${getMember[i].username}</td>
        <td><img src="${getMember[i].avatar}" alt=""></td>
        <td>${getMember[i].status}</td>
        <td>${getMember[i].password}</td>
        <td>${getMember[i].permissions}</td>
        <td><input type="button" value="Unban" onclick="unbanMem(${getMember[i].id})"></td>
    </tr>
        `;
      count++;
    }
  }
  document.getElementById("data").innerHTML = data;
}

function unbanMem(id) {
  let getMember = JSON.parse(localStorage.getItem("Member"));
  for (let i = 0; i < getMember.length; i++) {
    if (getMember[i].id == id) {
      getMember[i].permissions = "actived";
    }
  }
  localStorage.setItem("Member", JSON.stringify(getMember));
  renderBanlist();
}
