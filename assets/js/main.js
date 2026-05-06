const searchbox = document.querySelector(".search-box");
const searchbtn = document.querySelector(".search-btn");
const searchinput = document.querySelector(".input-box");

const menuBtn = document.querySelector(".menu-btn");
const mobilemenu = document.querySelector(".mobile-menu");

searchbtn.addEventListener("click", () => {
  searchbox.classList.toggle("hidden");
  setTimeout(() => {
    searchinput.classList.toggle("opacity-0");
    searchinput.classList.toggle("translate-y-10");
  });
});

menuBtn.addEventListener("click", () => {
  menuBtn.classList.toggle("open");
  mobilemenu.classList.toggle("hidden");
});

//-------------------------------------------------------------------------------------------
const getCategories = async () => {
  try {
    const response = await axios.get(
      "https://dummyjson.com/products/category-list",
    );
    return response.data;
  } catch (error) {
    alert("error in getting categories");
  }
};

const displayCategories = async () => {
  const data = await getCategories();
  console.log(data);

  try {
    const result = data
      .map(
        (category) =>
          `
          <a
                    href="./details-category.html?category=${category}"
                    class="text-gray-600 hover:text-orange-500 text-sm transition"
                    >${category}</a
                  >
        `,
      )
      .join("");

    document.querySelector(".Categories-big").innerHTML = result;
    document.querySelector(".Categories-small").innerHTML = result;
  } catch (error) {
    alert("error with displaying categories");
  }
};

getCategories();
displayCategories();
