// Loading Logic

const mainSection = document.getElementById("main");
const loader = document.getElementById("loader");

mainSection.classList.add("d-none");

window.onload = () => {
  setTimeout(() => {
    loader.style.display = "none";
    mainSection.classList.remove("d-none");
    mainSection.classList.add("d-flex");
  }, 1000);
};

const username = document.getElementById("username");
const email = document.getElementById("email");
const gender = document.getElementById("gender");
const pass = document.getElementById("password");
const cPass = document.getElementById("cpassword");
const errorMessage = document.getElementById("error-message");
const passwordError = document.getElementById("password-error");

email.value = "@gmail.com";

// to check user logged or not
const isUserExists = localStorage.getItem("LoggedInUser") || false;

const currentUser = JSON.parse(isUserExists);

// setting account icon
const userProfile = document.getElementById("account-bar");
const userProfileImage = document.getElementById("account-icon");
const userName = document.getElementById("usernameAcc");
userProfile.style.display = "none";

if (isUserExists) {
  email.value = currentUser.email;

  userProfile.style.display = "flex";
  userProfileImage.style.backgroundImage = `url(${currentUser.profileImage})`;
  userName.innerText = currentUser.username;
}

// Show and Hide Password
function password_show_hide(elem) {
  var x = elem.previousElementSibling;
  var show_eye = elem.children[0];
  var hide_eye = elem.children[1];
  hide_eye.classList.remove("d-none");
  if (x.type === "password") {
    x.type = "text";
    show_eye.style.display = "none";
    hide_eye.style.display = "block";
  } else {
    x.type = "password";
    show_eye.style.display = "block";
    hide_eye.style.display = "none";
  }
}

// Login Handler

function loginHandler() {
  const email = document.getElementById("email");
  const pass = document.getElementById("password");

  if (email.value == "" || pass.value == "") {
    errorMessage.innerText = "All Fields are Required";
    setTimeout(() => {
      errorMessage.innerText = "";
    }, 1500);
    return;
  }

  if (pass.value.length < 7) {
    errorMessage.innerText = "Password must be 8 characters long";
    setTimeout(() => {
      errorMessage.innerText = "";
    }, 1500);
    return;
  }

  let DatabaseUsers = JSON.parse(localStorage.getItem("users")) || [];

  const checkUser = DatabaseUsers.find((user) => {
    if (user.email == email.value) return user;
  });

  if (!checkUser) {
    errorMessage.innerText = "Account don't exists!";
    setTimeout(() => {
      errorMessage.innerText = "";
    }, 1500);
    return;
  }

  if (checkUser.password != pass.value) {
    errorMessage.innerText = "Wrong Password";
    setTimeout(() => {
      errorMessage.innerText = "";
    }, 1500);
    return;
  }

  localStorage.setItem("LoggedInUser", JSON.stringify(checkUser));

  window.location.href = "../../application";
}

document
  .getElementById("login-handler")
  .addEventListener("click", loginHandler);
