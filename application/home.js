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

// if not logged in redirected to login page
if (!isUserExists) {
  window.location.href = "/userAuthentication/login";
}

// setting user's name
const userNameDisplay = document.getElementById("username-span");
const currentUser = JSON.parse(isUserExists);

userNameDisplay.innerText = currentUser ? currentUser.username : "";

// setting user's profile image
const accountIcon = document.getElementById("account-icon");
const accountIcon2 = document.getElementById("account-icon-2");
const accountIconSidebar = document.getElementById("account-icon-sidebar");

accountIcon.style.backgroundImage = `url(${currentUser.profileImage})`;
accountIcon2.style.backgroundImage = `url(${currentUser.profileImage})`;
accountIconSidebar.style.backgroundImage = `url(${currentUser.profileImage})`;

// setting user's name in account details container
const userNameAcc = document.getElementById("acc-username");
const userNameAccSidebar = document.getElementById("acc-username-sidebar");

userNameAcc.innerText = currentUser?.username;
userNameAccSidebar.innerText = currentUser?.username;

// setting items to post modal
const postUserImage = document.getElementById("account-icon-post");
const postUsername = document.getElementById("exampleModalLabel");

postUserImage.style.backgroundImage =
  currentUser.profileImage == ""
    ? "url('https://cdn-icons-png.flaticon.com/512/3237/3237472.png')"
    : `url(${currentUser.profileImage})`;
postUsername.innerText = currentUser.username;

const getAllUsers = () => {
  return JSON.parse(localStorage.getItem("users"));
};

// loging out
const logoutHandler = () => {
  localStorage.removeItem("LoggedInUser");
  window.location.reload();
};

document
  .getElementById("logout-handler")
  .addEventListener("click", logoutHandler);

// show account details/actions container

const showAccountDetails = () => {
  const accoutnDetails = document.getElementById("account-container");
  if (accoutnDetails.classList.contains("hidden")) {
    accoutnDetails.classList.remove("hidden");
    accoutnDetails.classList.add("flex");
  } else {
    accoutnDetails.classList.add("hidden");
    accoutnDetails.classList.remove("flex");
  }
};

document
  .getElementById("account-icon")
  .addEventListener("click", showAccountDetails);

// show users liked the post

const showUsersLikedPost = (usersLikedPost) => {
  console.log(usersLikedPost);
};

// Get the details of User for post

const getPostUser = (postUserEmail) => {
  const allUsers = getAllUsers();
  const postUser = allUsers.find((user) => {
    if (user.email == postUserEmail) return user;
  });
  return postUser;
};

// to Check either logged in user liked the post or not

const isPostLiked = (post) => {
  const isLiked = post.likes.find((user) => {
    if (user == currentUser.username) return user;
  });

  return isLiked;
};

// show post menu to edit and delete

const showPostMenu = (thisElem) => {
  const postMenu = thisElem.nextElementSibling;
  postMenu.classList.toggle("hidden");
};

// setting posts

const setAllPosts = () => {
  const postsContainer = document.getElementById("posts-container");

  const allPosts = JSON.parse(localStorage.getItem("posts")) || false;

  if (!allPosts) {
    postsContainer.style.color = "grey";
    postsContainer.innerHTML = "<br/>No Post Available";
  } else {
    allPosts.reverse();
    postsContainer.innerHTML = "";
    allPosts.forEach((post) => {
      postsContainer.innerHTML += `
      <div class="p-2 w-full max-w-[600px]">
                  <div class="w-full rounded-lg shadow-md bg-white">
                      <div class="p-4 pb-0 mb-2">
                      <div class="w-full flex justify-between">
                        <div class="flex gap-3 ">
                          <div
                              class="w-[40px] h-[40px] rounded-full bg-cover bg-center bg-[url(${
                                getPostUser(post.user).profileImage
                              })]">
                          </div>

                          <div>
                              <p class="font-semibold">${
                                getPostUser(post.user).username
                              }</p>
                              <p class="text-gray-600 text-[12px]">${
                                post.postDate
                              }</p>
                          </div>
                        </div>
                              ${
                                currentUser.email == post.user
                                  ? `<div class="relative h-fit">
                                  <img src="/assets/icons/menu-icon.png" alt="options" class="h-[20px] cursor-pointer" onclick="showPostMenu(this)" />
                                  <div class="hidden absolute top-[100%] right-0 bg-white shadow-md rounded-md flex flex-col">
                                    <span class="px-4 py-2 rounded-t-md hover:bg-gray-200 cursor-pointer">Edit</span>
                                    <span class="px-4 py-2 rounded-b-md hover:bg-gray-200 cursor-pointer">Delete</span>
                                  </div>
                                </div>`
                                  : ""
                              }
                        </div>
                  </div>
                    <p class="py-2 px-4">${post.postDesc}</p>

                    ${
                      post.postImage == ""
                        ? "<div></div>"
                        : `<img class='w-full h-auto' src='${post.postImage}' alt='post image'>`
                    }

                    <div class="px-4 my-3 flex justify-between">
                        <div class="flex gap-2 align-items-center cursor-pointer" onclick=" () => alert("asd")" >
                            <i class="fas fa-thumbs-up text-blue-600"></i>
                            <p class="text-gray-600 text-sm" id="like-counts">${
                              post.likes.length
                            }</p>
                        </div>
                        <div class="flex gap-2">
                            <i class="far fa-comment-dots"></i>
                            <p class="text-gray-600 text-sm" id="like-counts">${
                              post.comments.length
                            }</p>
                        </div>
                    </div>

                    <div class="p-4 pt-0">
                        <div class="pt-4 flex justify-between  border-t-2  sm:px-10 text-xl text-gray-600 ">
                          <div title="Like Post" class="flex items-center gap-2 cursor-pointer  text-[13px] sm:text-[16px]" onclick="postLiked(${
                            post.id
                          })">
                          ${
                            isPostLiked(post)
                              ? "<i class='fas fa-thumbs-up text-blue-600'></i>"
                              : "<i class='far fa-thumbs-up'></i>"
                          }                                                  
                              <p class="">Like</p>
                          </div>
                          <div title="Comment" class="flex items-center gap-2 cursor-pointer text-[13px] sm:text-[16px]">
                              <i class="far fa-comment-dots"></i>
                              <p class="">Comment</p>
                          </div>
                          <div title="Share Post" class="flex items-center gap-2 cursor-pointer  text-[13px] sm:text-[16px]">
                              <i class="fas fa-share"></i>
                              <p class="">Share</p>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
      `;
    });
  }
};

setAllPosts();

// set post date and time

const postDateTime = () => {
  const date = new Date();

  const postDate = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
  const postDateString = postDate.join(" / ");

  const postTime = [
    date.getHours() > 12
      ? date.getHours() - 12
      : date.getHours() == 0
      ? "12"
      : date.getHours(),
    date.getMinutes(),
  ];
  let postTimeString = postTime.join(":");

  postTimeString += date.getHours() >= 12 ? "pm" : "am";

  const postDateAndTime = postDateString + " - " + postTimeString;

  return postDateAndTime;
};

const enablePostBtn = (elem) => {
  const postBtn =
    elem.parentNode.nextElementSibling.firstElementChild.nextElementSibling;
  if (elem.value == "") {
    postBtn.style.backgroundColor = "#93C5FD";
    postBtn.disabled = true;
  } else {
    postBtn.style.backgroundColor = "#1D4ED8";
    postBtn.disabled = false;
  }
};

// Adding post

const postImage = document.getElementById("post-image");
const postImageRemove = document.getElementById("post-image-remove");
const postUploadedImage = document.getElementById("post-uploaded-img");

// get image link

let postImageLink = "";

const getPostImageLink = () => {
  postImageLink = prompt("Add(paste) Image Link");
  if (postImageLink != null) {
    postImage.style.display = "none";
    postUploadedImage.src = postImageLink;
    postImageRemove.classList.remove("hidden");
  } else {
    postImageLink = "";
  }
};

// remove uploaded image

const removeUploadedImage = () => {
  postImage.style.display = "block";
  postUploadedImage.src = "";
  postImageRemove.classList.add("hidden");
  postImageLink = "";
};

postImageRemove.addEventListener("click", removeUploadedImage);

postImage.addEventListener("click", getPostImageLink);

const setPost = () => {
  const postDesc = document.getElementById("post-desc");
  const allPosts = JSON.parse(localStorage.getItem("posts")) || [];

  const post = {
    id: allPosts.length + 1,
    user: currentUser.email,
    postDate: postDateTime(),
    postDesc: postDesc.value,
    postImage: postImageLink,
    likes: [],
    comments: [],
  };

  allPosts.push(post);

  console.log(allPosts);

  localStorage.setItem("posts", JSON.stringify(allPosts));
  setTimeout(() => {
    setAllPosts();
  }, 1000);

  postUploadedImage.src = "";
  postDesc.value = "";
};

// Like The Post

const postLiked = (postId) => {
  const allPosts = JSON.parse(localStorage.getItem("posts"));

  const postLiked = allPosts.find((post) => {
    if (post.id == postId) return post;
  });

  const alreadyLiked = postLiked.likes.find((likeByUsername) => {
    if (likeByUsername == currentUser.username) return likeByUsername;
  });

  if (alreadyLiked) {
    const indexOfUser = postLiked.likes.indexOf(alreadyLiked);
    postLiked.likes.splice(indexOfUser, 1);
  } else {
    postLiked.likes.push(currentUser.username);
  }

  localStorage.setItem("posts", JSON.stringify(allPosts));

  setAllPosts();
};

document.getElementById("post-btn").addEventListener("click", setPost);
