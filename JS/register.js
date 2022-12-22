const ipnElement = document.querySelector("#inputPassword");
const iconElement = document.querySelector("#iconEye");
const ipnElement1 = document.querySelector("#checkPassword");
const iconElement1 = document.querySelector("#iconEye1");

iconElement.addEventListener("click", function () {
  const currentType = ipnElement.getAttribute("type");
  ipnElement.setAttribute(
    "type",
    currentType === "password" ? "text" : "password"
  );
  iconElement.classList.toggle("fa-eye");
});

iconElement1.addEventListener("click", function () {
  const currentType = ipnElement1.getAttribute("type");
  ipnElement1.setAttribute(
    "type",
    currentType === "password" ? "text" : "password"
  );
  iconElement1.classList.toggle("fa-eye");
});

//! Hàm kiểm tra ID theo định dạng email //
function checkID() {
  let idInput = document.getElementById("inputID");
  let pattern =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  idInput.addEventListener("keyup", function () {
    let result = pattern.test(idInput.value);
    if (result == true) {
      document.getElementById("valiadteID").innerHTML = "";
    } else {
      document.getElementById("valiadteID").innerHTML =
        "ID chưa đúng định dạng Email.";
    }
  });
}

//! Hàm kiểm tra mật khẩu //
let keyPass = false;
let keyPassConfirm = false;
function checkPassword() {
  let passwordInput = document.getElementById("inputPassword");
  passwordInput.addEventListener("keyup", function () {
    let array = [];
    let text;
    array.push(passwordInput.value);
    let check = array.toString().split("");
    if (check.length < 8) {
      text = "Vui lòng nhập tối thiểu 8 ký tự";
      document.getElementById("validatePassword1").innerHTML = text;
      keyPass = false;
    } else {
      text = "";
      document.getElementById("validatePassword1").innerHTML = "";
      keyPass = true;
    }
    return keyPass;
  });
}

function confirmedPassword() {
  let passwordInput = document.getElementById("inputPassword");
  let confirmedPassword = document.getElementById("checkPassword");
  confirmedPassword.addEventListener("keyup", function () {
    let text;
    if (
      passwordInput.value == confirmedPassword.value &&
      passwordInput.value != "" &&
      confirmedPassword.value != ""
    ) {
      text = "Mật khẩu đã trùng khớp";
      keyPassConfirm = true;
    } else if (passwordInput.value == "" || confirmedPassword.value == "") {
      text = "Mật khẩu đang bỏ trống";
      keyPassConfirm = false;
    } else {
      text = "Mật khẩu chưa trùng khớp";
      keyPassConfirm = false;
    }
    document.getElementById("validatePassword2").innerHTML = text;
    return keyPassConfirm;
  });
}

//! Kiểm tra có đăng ký được hay không //
function registerConfirm() {
  if ((keyPass = false || keyPassConfirm == false)) {
    document.getElementById("signUpform").onsubmit = function (e) {
      e.preventDefault();
    };
  }
}

//! Hàm thêm thành viên//
let getMember = localStorage.getItem("Member");
class Member {
  constructor(username, password, status, secret, permissions, avatar, id) {
    this.username = username;
    this.password = password;
    this.status = status;
    this.secret = secret;
    this.permissions = permissions;
    this.avatar = avatar;
    this.id = id;
  }
}
function newMember() {
  let inputID = document.getElementById("inputID");
  let inputPassword = document.getElementById("inputPassword");
  let secretQuestion = document.getElementById("keyQuestion");
  if (
    inputID.value != "" &&
    inputPassword.value != "" &&
    keyPassConfirm == true
  ) {
    if (getMember == null) {
      let MemberList = [];
      let newMem = new Member(
        inputID.value,
        inputPassword.value,
        false,
        secretQuestion.value,
        "actived",
        "/IMG/user.png",
        MemberList.length + 1
      );
      MemberList.push(newMem);
      localStorage.setItem("Member", JSON.stringify(MemberList));
      alert("Đăng ký thành công.");
      window.location = "./login.html";
    } else {
      MemberList = JSON.parse(getMember);
      let keyAcc = true;
      for (i = 0; i < MemberList.length; i++) {
        if (MemberList[i].username == inputID.value) {
          keyAcc = false;
          break;
        }
      }
      if (keyAcc) {
        a = new Member(
          inputID.value,
          inputPassword.value,
          false,
          secretQuestion.value,
          "actived",
          "/IMG/user.png",
          MemberList.length + 1
        );
        MemberList.push(a);
        console.log(MemberList);
        localStorage.setItem("Member", JSON.stringify(MemberList));
        alert("Đăng ký thành công.");
        window.location = "./login.html";
      } else {
        document.getElementById("checkAccount").innerHTML =
          "Tài khoản đã tồn tại.";
      }
    }
  }
  return;
}
checkID();
checkPassword();
confirmedPassword();
registerConfirm();
