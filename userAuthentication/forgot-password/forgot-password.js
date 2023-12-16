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

// --------

const username = document.getElementById("username");
const email = document.getElementById("email");
const gender = document.getElementById("gender");
const pass = document.getElementById("password");
const cPass = document.getElementById("cpassword");
const errorMessage = document.getElementById("error-message");
const passwordError = document.getElementById("password-error");

email.value = "@gmail.com";

// If user exists then set mail and image in forgot password section

const isUserExists = localStorage.getItem("LoggedInUser") || false;
const userProfile = document.getElementById("account-bar");
const userProfileImage = document.getElementById("account-icon");
const userName = document.getElementById("username");
userProfile.style.display = "none";

if (isUserExists) {
  const currentUser = JSON.parse(isUserExists);
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

// Reset Password Hanlder

const resetPasswordHandler = () => {
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

  const updatedUsers = DatabaseUsers.map((user) => {
    if (user.email == email.value) {
      user.password = pass.value;
    }
    return user;
  });

  localStorage.setItem("users", JSON.stringify(updatedUsers));
  alert("Password Updated Successfully");
};

document
  .getElementById("resetpass-handler")
  .addEventListener("click", resetPasswordHandler);
