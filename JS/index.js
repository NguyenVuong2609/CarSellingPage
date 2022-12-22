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
