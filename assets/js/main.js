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

const getProducts = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/products?limit=10");
    return response.data;
  } catch (error) {
    alert("error in getting products");
  }
};

const displayProducts = async () => {
  const data = await getProducts();
  console.log(data);

  try {
    const result = data.products
      .map(
        (product) =>
          `
        <div
          class="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
        >
          <div class="aspect-square bg-gray-100 overflow-hidden">
            <img
              src="${product.thumbnail}"
              
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-6">
            <div class="flex items-center justify-between mb-2">
              <span
                class="text-sm font-medium text-indigo-600 uppercase tracking-wider"
                >In Stock</span
              >
              <div class="flex items-center text-yellow-400">
                <span class="text-sm font-bold text-gray-700 mr-1">${product.rating}</span>
                <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                  />
                </svg>
              </div>
            </div>
            <h3 class="text-xl font-semibold text-gray-800">
              ${product.title}
            </h3>
            <p class="mt-4 text-2xl font-bold text-gray-900">$${product.price}</p>
            <a href="./product-details.html?productId=${product.id}" class="mt-4 block text-center text-sm font-semibold text-indigo-600 hover:text-indigo-500 hover:underline transition-all">
            View Product Details
        </a>
            <button
              class="mt-6 w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
       
        `,
      )
      .join("");

    document.querySelector(".products-10").innerHTML = result;
  } catch (error) {
    alert("error with displaying products");
  }
};

getProducts();
displayProducts();

//--------------------------------------------------------------------
//sorting

const sortSelect = document.querySelector(".sort-products");

let currentPage = 1;
const limit = 10;

const updateProducts = async (page = 1) => {
  currentPage = page;

  if (sortSelect.value !== "") {
    sortValue = sortSelect.value;
  } else {
    sortValue = "title-asc";
  }
  const [sortBy, order] = sortValue.split("-");

  const skip = (currentPage - 1) * limit;

  console.log(skip);

  try {
    const response = await axios.get(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}&select=title,price,thumbnail,rating`,
    );

    const { products, total } = response.data;

    const result = products
      .map(
        (product) => `
            <div class="group bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <div class="aspect-square bg-gray-100 overflow-hidden">
                    <img src="${product.thumbnail}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div class="p-6">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-sm font-medium text-indigo-600 uppercase tracking-wider">In Stock</span>
                        <div class="flex items-center text-yellow-400">
                            <span class="text-sm font-bold text-gray-700 mr-1">${product.rating}</span>
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                        </div>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-800">${product.title}</h3>
                    <p class="mt-4 text-2xl font-bold text-gray-900">$${product.price}</p>
                    <a href="./product-details.html?productId=${product.id}" class="mt-4 block text-center text-sm font-semibold text-indigo-600 hover:text-indigo-500 hover:underline">
                        View Product Details
                    </a>
                    <button class="mt-6 w-full bg-gray-900 text-white py-3 rounded-xl font-medium hover:bg-gray-800">
                        Add to Cart
                    </button>
                </div>
            </div>
        `,
      )
      .join("");

    document.querySelector(".products-10").innerHTML = result;

    renderPagination(total);
  } catch (error) {
    console.error(error);
    alert("Error in getting products");
  }
};

const renderPagination = (totalItems) => {
  const paginationUl = document.querySelector(".pagination-container");
  if (!paginationUl) return;

  const totalPages = Math.ceil(totalItems / limit);
  let html = "";

  html += `<li><button onclick="updateProducts(${currentPage > 1 ? currentPage - 1 : 1})" class="px-3 h-10 border border-gray-300 rounded-l-lg bg-white cursor-pointer">Previous</button></li>`;

  for (let i = 1; i <= totalPages; i++) {
    const isActive =
      i === currentPage
        ? "bg-orange-600 text-white cursor-pointer"
        : "bg-white text-gray-500 cursor-pointer";
    html += `<li><button onclick="updateProducts(${i})" class="px-4 h-10 border border-gray-300 ${isActive} cursor-pointer">${i}</button></li>`;
  }

  html += `<li><button onclick="updateProducts(${currentPage < totalPages ? currentPage + 1 : totalPages})" class="px-3 h-10 border border-gray-300 rounded-r-lg bg-white cursor-pointer">Next</button></li>`;

  paginationUl.innerHTML = html;
};

sortSelect.addEventListener("change", () => {
  updateProducts(1);
});

updateProducts();
