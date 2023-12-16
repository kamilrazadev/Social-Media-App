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

// to change user's name into title case
const toTitleCase = (name) => {
  var words = name.split(" ");

  for (var i = 0; i < words.length; i++) {
    words[i] =
      words[i].charAt(0).toUpperCase() + words[i].substring(1).toLowerCase();
  }

  var titleCaseName = words.join(" ");

  return titleCaseName;
};

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

// to check password and confirm password

const matchPasswords = () => {
  if (pass.value != cPass.value) {
    if (cPass.value != "") {
      passwordError.innerText = "Not Matching with Password";
    }
  } else {
    passwordError.innerText = "";
  }
};

cPass.addEventListener("input", matchPasswords);

pass.addEventListener("input", matchPasswords);

// Signup Handler

function signupHandler() {
  const username = document.getElementById("username");
  const email = document.getElementById("email");
  const gender = document.getElementById("gender");
  const pass = document.getElementById("password");
  const cPass = document.getElementById("cpassword");
  if (
    username.value == "" ||
    email.value == "" ||
    gender.value == "" ||
    pass.value == "" ||
    cPass.value == ""
  ) {
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

  if (pass.value != cPass.value) {
    errorMessage.innerText = "Password and Confirm Password must be same";
    setTimeout(() => {
      errorMessage.innerText = "";
    }, 1800);
    return;
  }

  let DatabaseUsers = JSON.parse(localStorage.getItem("users")) || [];

  const checkUser = DatabaseUsers.find((user) => {
    if (user.email == email.value) return user;
  });

  if (checkUser) {
    errorMessage.innerText = "Account already created! Login to Continue";
    setTimeout(() => {
      errorMessage.innerText = "";
    }, 1500);
    return;
  }

  const user = {
    username: toTitleCase(username.value),
    email: email.value,
    password: pass.value,
    gender: gender.value,
    profileImage:
      gender.value == "female"
        ? "https://cdn-icons-png.flaticon.com/512/4140/4140047.png"
        : "https://cdn-icons-png.flaticon.com/512/4140/4140037.png",
  };

  DatabaseUsers.push(user);

  localStorage.setItem("users", JSON.stringify(DatabaseUsers));

  window.location.href = "/userAuthentication/login/index.html";
}

document
  .getElementById("signup-handler")
  .addEventListener("click", signupHandler);
