const ipnElement = document.querySelector("#inputPassword");
const iconElement = document.querySelector("#iconEye");
var flag = false;

let adminAcc = [
  {
    username: "admin@admin.com",
    password: "admin",
    status: "offline"
  },
];
localStorage.setItem("admin", JSON.stringify(adminAcc));

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
let checkMember = JSON.parse(localStorage.getItem("admin"));
function checkAccount() {
  let inputID = document.getElementById("inputID");
  let inputPassword = document.getElementById("inputPassword");
  let key = false;
  if (inputID.value != "" && inputPassword.value != "") {
    if (inputID.value == checkMember[0].username && inputPassword.value == checkMember[0].password) {
      checkMember[0].status = "online";
      localStorage.setItem("admin",JSON.stringify(checkMember));
      window.location = "/Pages/Admin.html";
      document.getElementById("signInform").onsubmit = function (e) {
        e.preventDefault();
      };
    } else {
      for (let i = 0; i < getMember.length; i++) {
        if (
          getMember[i].username == inputID.value &&
          getMember[i].password == inputPassword.value
        ) {
          key = true;
          if (getMember[i].permissions === "actived") {
            getMember[i].status = true;
            flag = true;
            localStorage.setItem("Flag", JSON.stringify(flag));
            localStorage.setItem("Member", JSON.stringify(getMember));
            window.location = "/index.html";
            document.getElementById("signInform").onsubmit = function (e) {
              e.preventDefault();
            };
            break;
          } else if (getMember[i].permissions === "banned") {
            document.getElementById("checkAcc").innerHTML = "Your account has been banned.";
            document.getElementById("signInform").onsubmit = function (e) {
              e.preventDefault();
            };
          }
        } 
        if (key == false){
          document.getElementById("checkAcc").innerHTML =
            "Sai mật khẩu hoặc tài khoản.";
          document.getElementById("losePassword").style.display = "block";
          document.getElementById("signInform").onsubmit = function (e) {
            e.preventDefault();
          };
        }
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
