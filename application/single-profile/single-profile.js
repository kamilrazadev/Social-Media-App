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
// setting page title

const titleElem = document.getElementById("page-title");

// setting page title and favicon

titleElem.textContent = currentUser.username;

userNameDisplay.innerText = currentUser ? currentUser.username : "";

// setting user's profile image
const accountIcon = document.getElementById("account-icon");
const accountIcon2 = document.getElementById("account-icon-2");

accountIcon.style.backgroundImage = `url(${currentUser.profileImage})`;
accountIcon2.style.backgroundImage = `url(${currentUser.profileImage})`;

// setting user's name in account details container
const userNameAcc = document.getElementById("acc-username");
const userNameAccSidebar = document.getElementById("acc-username-sidebar");

userNameAcc.innerText = currentUser?.username;

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

// setting main profile image

const mainProfileImage = document.getElementById("main-profile-image");
const mainProfileImageZoomed = document.getElementById(
  "main-profile-image-full"
);

mainProfileImageZoomed.src = currentUser.profileImage;
mainProfileImage.style.backgroundImage = `url(${currentUser.profileImage})`;

document
  .getElementById("account-icon")
  .addEventListener("click", showAccountDetails);

// Show and hide full profile image

const fullProfileImageContainer = document.getElementById(
  "full-profile-container"
);

fullProfileImageContainer.style.transform = "scale(0)";

const showFullProfileImage = () => {
  fullProfileImageContainer.style.transform = "scale(1)";
  setTimeout(() => {
    fullProfileImageContainer.classList.add(
      "bg-[#00000061]",
      "backdrop-blur-[2px]"
    );
  }, 100);
};
mainProfileImage.addEventListener("click", showFullProfileImage);

const hideFullProfileImage = () => {
  fullProfileImageContainer.classList.remove(
    "bg-[#00000061]",
    "backdrop-blur-[2px]"
  );
  fullProfileImageContainer.style.transform = "scale(0)";
};
fullProfileImageContainer.addEventListener("click", hideFullProfileImage);

// loging out
const logoutHandler = () => {
  localStorage.removeItem("LoggedInUser");
  window.location.reload();
};

document
  .getElementById("logout-handler")
  .addEventListener("click", logoutHandler);

// setting users info side bar

const bio = document.getElementById("user-bio");
const email = document.getElementById("user-email-sidebar");
const address = document.getElementById("user-address-sidebar");
const institute = document.getElementById("user-institute-sidebar");
const work = document.getElementById("user-work-sidebar");
const phone = document.getElementById("user-phone-sidebar");

(bio.textContent = currentUser.bio ? currentUser.bio : "Bio not added"),
  (bio.style.color = "gray");

currentUser.email
  ? ((email.textContent = currentUser.email),
    (email.href = `mailto:${currentUser.email}`))
  : (email.parentNode.style.display = "none");

currentUser.address
  ? (address.textContent = "Lives in " + currentUser.address)
  : (address.parentNode.style.display = "none");

currentUser.institute
  ? (institute.textContent = "Study at " + currentUser.institute)
  : (institute.parentNode.style.display = "none");

currentUser.work
  ? (work.textContent = "Works at " + currentUser.work)
  : (work.parentNode.style.display = "none");

currentUser.phone
  ? ((phone.textContent = currentUser.phone),
    (phone.href = `tel:${currentUser.phone}`))
  : (phone.parentNode.style.display = "none");

// get all posts

const getAllPosts = () => {
  const allPosts = JSON.parse(localStorage.getItem("posts")) || false;

  return allPosts;
};

// show post menu to edit and delete

const showPostMenu = () => {
  const postMenu = document.getElementById("post-menu");
  postMenu.classList.toggle("hidden");
};

// to Check either logged in user liked the post or not

const isPostLiked = (post) => {
  const isLiked = post.likes.find((user) => {
    if (user == currentUser.username) return user;
  });

  return isLiked;
};

// Edit the post
const editPost = (thisPostId) => {
  console.log(thisPostId);
};

// delete the post

const deletePost = (thisPostId) => {
  const allPosts = getAllPosts();

  const postToDel = allPosts.find((post) => {
    if (post.id == thisPostId) return post;
  });

  postToDel;
};

// setting all users posts
const setUserPost = () => {
  const userPostsContainer = document.getElementById("user-posts-container");

  const allPosts = JSON.parse(localStorage.getItem("posts")) || false;

  if (!allPosts) {
    userPostsContainer.style.color = "grey";
    userPostsContainer.innerHTML = "<br/>Nothing Posted";
  } else {
    const thisUsersPosts = allPosts.filter((post) => {
      if (post.user == currentUser.email) return post;
    });

    userPostsContainer.innerHTML = "";

    thisUsersPosts.forEach((post) => {
      userPostsContainer.innerHTML += `
      <div class=" w-full max-w-[600px]">
                <div class="w-full rounded-lg shadow-md bg-white">
                    <div class="p-4 pb-0 mb-2">
                        <div class="w-full flex justify-between">
                          <div class="flex gap-3 ">
                            <div
                                class="w-[40px] h-[40px] rounded-full bg-cover bg-center bg-[url(${
                                  currentUser.profileImage
                                })]">
                            </div>

                            <div>
                                <p class="font-semibold">${
                                  currentUser.username
                                }</p>
                                <p class="text-gray-600 text-[12px]">${
                                  post.postDate
                                }</p>
                            </div>
                          </div>
                                <div class="relative h-fit">
                                  <img src="/assets/icons/menu-icon.png" alt="options" class="h-[20px] cursor-pointer" onclick="showPostMenu()" />
                                  <div id="post-menu" class="hidden absolute top-[100%] right-0 bg-white shadow-md rounded-md flex flex-col">
                                    <span class="px-4 py-2 rounded-t-md hover:bg-gray-200 cursor-pointer" onclick="editPost(${
                                      post.id
                                    })">Edit</span>
                                    <span class="px-4 py-2 rounded-b-md hover:bg-gray-200 cursor-pointer" onclick="deletePost(${
                                      post.id
                                    })">Delete</span>
                                  </div>
                                </div>
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
setUserPost();

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

  setUserPost();
};
