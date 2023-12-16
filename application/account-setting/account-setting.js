// Loading Logic

const mainSection = document.getElementById("main");
const loader = document.getElementById("loader");

mainSection.classList.add("hidden");

window.onload = () => {
  setTimeout(() => {
    loader.style.display = "none";
    mainSection.classList.remove("hidden");
    mainSection.classList.add("block");
  }, 1000);
};

// to check user logged or not
const isUserExists = localStorage.getItem("LoggedInUser") || false;

const currentUser = JSON.parse(isUserExists);

const username = document.getElementById("username");
const email = document.getElementById("email");
const bio = document.getElementById("bio");
const address = document.getElementById("address");
const institute = document.getElementById("institute");
const work = document.getElementById("work");
const phone = document.getElementById("phone");

const profileImageInputDiv = document.getElementById("profile-image-input");
const profileImageInput = document.getElementById(
  "profile-image-input"
).firstElementChild;
const profileImage = document.getElementById("profile-image");
const updateImageBtn = document.getElementById("update-profile-btn");

// setting values to input fields

username.disabled = true;
username.value = currentUser.username;
email.value = currentUser.email;
bio.value = currentUser.bio ? currentUser.bio : "";
address.value = currentUser.address ? currentUser.address : "";
institute.value = currentUser.institute ? currentUser.institute : "";
work.value = currentUser.work ? currentUser.work : "";
phone.value = currentUser.phone ? currentUser.phone : "";

profileImage.style.backgroundImage = `url(${currentUser.profileImage})`;
profileImageInputDiv.style.display = "none";

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

// if not logged in redirected to login page
if (!isUserExists) {
  window.location.href = "/userAuthentication/login";
}

// to get all database users

const getAllUsers = () => {
  let allUsers = JSON.parse(localStorage.getItem("users"));
  return allUsers;
};

// update account details
const showprofileImageInput = () => {
  updateImageBtn.style.display = "none";
  profileImageInputDiv.style.display = "flex";
  profileImageInput.focus();
};

const closeProfileImageInput = () => {
  updateImageBtn.style.display = "block";
  profileImageInput.value = "";
  profileImageInputDiv.style.display = "none";
};

const showUsernameInput = () => {
  username.disabled = false;
  username.nextElementSibling.style.display = "none";
  username.focus();
};

const updateAccountDetails = () => {
  const errorMessage = document.getElementById("error-message");

  if (username.value == "") {
    errorMessage.innerText = "Your Name is Required";
    setTimeout(() => {
      errorMessage.innerText = "";
    }, 1500);
    return;
  }

  if (
    username.value == currentUser.username &&
    profileImageInput.value == currentUser.profileImage &&
    bio.value == currentUser.bio &&
    address.value == currentUser.address &&
    institute.value == currentUser.institute &&
    work.value == currentUser.work &&
    phone.value == currentUser.phone
  ) {
    errorMessage.innerText = "Nothing to Update";
    setTimeout(() => {
      errorMessage.innerText = "";
    }, 1500);
    return;
  }

  const allUsers = getAllUsers();

  const userToUpdate = allUsers.find((user) => {
    if (user.email == email.value) return user;
  });

  userToUpdate.email = email.value;
  userToUpdate.username = username.value;
  userToUpdate.bio = bio.value;
  userToUpdate.address = address.value;
  userToUpdate.institute = institute.value;
  userToUpdate.work = work.value;
  userToUpdate.phone = phone.value;

  userToUpdate.profileImage = profileImageInput.value
    ? profileImageInput.value
    : currentUser.profileImage;

  localStorage.setItem("LoggedInUser", JSON.stringify(userToUpdate));

  localStorage.setItem("users", JSON.stringify(allUsers));

  window.location.href = "/application";
};
