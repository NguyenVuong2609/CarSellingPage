var getProduct = JSON.parse(localStorage.getItem("listProduct"));
let adminAcc = [
  {
    username: "admin",
    password: "admin",
  },
];
localStorage.setItem("admin", JSON.stringify(adminAcc));
const addProMenubtn = document.getElementById("addPro");
const editProbtn = document.getElementById("editPro");
const addbtnNew = document.getElementById("addbtn");

addProMenubtn.addEventListener("click", () => {
  let getProduct = JSON.parse(localStorage.getItem("listProduct"));
  document.getElementById("formAdd").style.display = "block";
  renderProduct(getProduct);
});

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
        id: getProduct.length + 1,
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
        id: getProduct.length + 1,
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

//! Xóa sản phẩm //
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
  //   let list = JSON.parse(localStorage.getItem("listProduct"));
  renderProduct(getProduct);
}

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
      searchProduct[i].name.toLowerCase().indexOf(search.value.toLowerCase()) !=
        -1 ||
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
