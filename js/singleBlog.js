const token = localStorage.getItem("token");
const list = document.querySelector(".list");
const listComment = document.querySelector(".list_comment");
const id = window.location.search.split("=")[1];
console.log(id);

if (!token) {
  window.location.href = "/";
}

function getSingleBlog() {
  const loadingElement = document.createElement("h1");
  loadingElement.classList.add("text-center", "text-gray-500");
  loadingElement.textContent = "Loading...";

  // Append loading before fetching
  list.appendChild(loadingElement);

  fetch(`https://asadbek6035.pythonanywhere.com/blog/retrieve/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      list.innerHTML = "";
      if (data) {
        const li = document.createElement("li");
        li.classList.add(
          // "max-w-[600px]",
          "w-full",
          "border",
          "border-gray-300",
          "rounded-lg",
          "flex",
          "flex-col",
          "justify-between"
        );
        li.innerHTML = `
  <img class="w-full h-[400px] img_single rounded-t-lg" src="${
    data.image ? data.image : "https://picsum.photos/200/300"
  }" alt="" />
  <div class="p-2 flex-grow">
    <h2 class="text-center text-lg">${data.title}</h2>
    <p>${data.description}</p>
  </div>
  <p class="text-sm font-bold text-end p-2 mt-auto">${data.date_created}</p>

`;

        list.appendChild(li);
      } else {
        list.innerHTML = `
        <h1 class="text-red-400 text-center text-3xl">Blog not found</h1>`;
      }
    });
}
getSingleBlog();

function getComment() {
  fetch(
    `https://asadbek6035.pythonanywhere.com/blog/comment/list?blog_id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  )
    .then((res) => res.json())
    .then((data) => {
      listComment.innerHTML = "";

      if (data && data.length > 0) {
        data.reverse().forEach((comment) => {
          console.log(comment);
          const li = document.createElement("li");
          li.classList.add(
            "border",
            "rounded-lg",
            "p-3",
            "w-full",
            "flex",
            "flex-col",
            "gap-2"
          );
          li.innerHTML = `
          <div class="flex items-center gap-2">
          <img src="${comment.user?.avatar}"  alt="${comment.user?.full_name}" class="w-10 h-10 rounded-full"/>
          <p>${comment.user?.full_name}</p>
          </div>


          <div class="flex flex-col gap-2 mt-2">
            <p>${comment.description}</p>
            <p class="text-sm text-gray-500 text-end">${comment.date_created}</p>  
            
          </div>
          `;

          listComment.append(li);
        });
      } else {
        listComment.innerHTML = ` 
        <h3 class="text-center text-lg">No comments yet</h3>
       `;
      }
    });
}
getComment();

function addComment() {
  let comment = document.getElementById("comment_add");
  if (comment.value.trim().length < 1) {
    alert("Pls write smth");
    return;
  }

  console.log(comment);
  fetch(`https://asadbek6035.pythonanywhere.com/blog/comment/post/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      description: comment.value,
      blog: id,
      // user: 85,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Added Comment", data);
      comment.value = "";
      getComment();
    });
}
