const ipnElement = document.querySelector("#inputPassword");
const iconElement = document.querySelector("#iconEye");

iconElement.addEventListener("click", function () {
  const currentType = ipnElement.getAttribute("type");
  ipnElement.setAttribute(
    "type",
    currentType === "password" ? "text" : "password"
  );
  iconElement.classList.toggle("fa-eye");
});

//! Kiểm tra tài khoản //
let getMember = JSON.parse(localStorage.getItem("Member"));
function checkAccount() {
  let inputID = document.getElementById("inputID");
  let inputPassword = document.getElementById("inputPassword");
  if (inputID.value != "" && inputPassword.value != "") {
    for (let i = 0; i < getMember.length; i++) {
      if (
        getMember[i].username == inputID.value &&
        getMember[i].password == inputPassword.value && getMember[i].permissions === "actived"
      ) {
        window.location = "/index.html";
        document.getElementById("signInform").onsubmit = function (e) {
          e.preventDefault();
        };
        break;
      } else {
        document.getElementById("checkAcc").innerHTML =
          "Sai mật khẩu hoặc tài khoản.";
        document.getElementById("losePassword").style.display = "block";
        document.getElementById("signInform").onsubmit = function (e) {
          e.preventDefault();
        };
      }
    }
  } else {
    document.getElementById("checkAcc").innerHTML =
      "Xin mời điền đầy đủ email và mật khẩu.";
    document.getElementById("signInform").onsubmit = function (e) {
      e.preventDefault();
    };
  }
}
