// initializing app for the first time

const getAllUsers = localStorage.getItem("users") || false;

if (!getAllUsers) {
  const users = [
    {
      address: "",
      bio: "I'm Sara a Medical student in AKU",
      email: "sara@gmail.com",
      gender: "female",
      institute: "AKU",
      password: "123123123",
      phone: "03129992787",
      profileImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ90fFKUcQdHf74qpBBqf61vTmCpeKIhMw7ec4T2_6bfZUZ3RnGV8xie8dX1biCWRYCizY&usqp=CAU",
      username: "Sara",
      work: "",
    },
    {
      address: "",
      bio: "I am M Kamil Raza a Web Developer. Serving as a Full Stack Developer @AMG Developers",
      email: "kamil@gmail.com",
      gender: "male",
      institute: "SMIU",
      password: "123123123",
      phone: "03129992787",
      profileImage:
        "https://cdn.pixabay.com/photo/2023/06/24/18/14/ai-generated-8085814_1280.jpg",
      username: "M Kamil Raza",
      work: "",
    },
  ];

  const posts = [
    {
      comments: [],
      id: 1,
      likes: ["Sara"],
      postDate: "4 / 11 / 2023 - 10:15am",
      postDesc: "Hey today is my birthday. I am very happy",
      postImage: "",
      user: "kamil@gmail.com",
    },
    {
      comments: [],
      id: 2,
      likes: [],
      postDate: "9 / 12 / 2023 - 10:42pm",
      postDesc: "Enjoying the beauty of nature in gilgit",
      postImage:
        "https://i0.wp.com/picjumbo.com/wp-content/uploads/beautiful-nature-mountain-scenery-with-flowers-free-photo.jpg?w=2210&quality=70",
      user: "sara@gmail.com",
    },
    {
      comments: [],
      id: 3,
      likes: ["M Kamil Raza"],
      postDate: "9 / 11 / 2023 - 10:12pm",
      postDesc:
        "Wow, that's great Babar Azam positioned as a number 1 batsman in ODI",
      postImage: "https://www.samaa.tv/images/sa-34.jpg",
      user: "kamil@gmail.com",
    },
  ];

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("posts", JSON.stringify(posts));
}

// to check user logged or not
const isUserLoggedIn = () => {
  const isUserExists = localStorage.getItem("LoggedInUser") || false;

  if (isUserExists) {
    window.location.href = "./application";
  } else {
    window.location.href = "./userAuthentication/login";
  }
};

isUserLoggedIn();
