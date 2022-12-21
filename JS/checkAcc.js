const ipnElement = document.querySelector("#inputPassword");
const iconElement = document.querySelector("#iconEye");
const ipnElement1 = document.querySelector("#checkPassword");
const iconElement1 = document.querySelector("#iconEye1");
var getMember = JSON.parse(localStorage.getItem("Member"));

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

function checkAccount() {
  let inputID = document.getElementById("inputID");
  let keyQuestion = document.getElementById("keyQuestion");
  for (let i = 0; i < getMember.length; i++) {
    if (
      getMember[i].username == inputID.value &&
      getMember[i].secret.toString().toUpperCase() ==
        keyQuestion.value.toString().toUpperCase()
    ) {
      document.getElementById("isCorrect").style.display = "block";
      document.getElementById("saveBtn").style.display = "block";
      document.getElementById("signInBtn").style.display = "none";
      document.getElementById("secretQuestion").style.display = "none";
      alert('Please enter your new password');
      document.getElementById("checkform").onsubmit = function (e) {
        e.preventDefault();
      };
      break;
    } else {
        alert('Wrong answer!');
        document.getElementById("checkform").onsubmit = function (e) {
            e.preventDefault();
        };
    }
  }
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
    document.getElementById("saveBtn").onsubmit = function (e) {
      e.preventDefault();
    };
  }
}

//! Hàm lưu lại mật khẩu mới //
function newPassword() {
    let inputID = document.getElementById("inputID");
    let inputPassword = document.getElementById("inputPassword");
    for (let i = 0; i < getMember.length; i++) {
        if (getMember[i].username == inputID.value) {
            getMember[i].password = inputPassword.value
            alert("Change password successfully!")
            window.location = "./login.html"
            break;
        }
    }
    localStorage.setItem("Member",JSON.stringify(getMember));
}

checkPassword();
confirmedPassword();
registerConfirm();
