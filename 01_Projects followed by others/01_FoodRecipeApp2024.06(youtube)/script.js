const searchBtn = document.querySelector("#search-btn");
const meallist = document.querySelector("#meal"); //食物圖片框框內
const mealDetailsContent = document.querySelector("meal-details-content"); //不含叉叉
const recipeCloseBtn = document.querySelector("#recipe-close-btn");

searchBtn.addEventListener("click", getMealList);
meal.addEventListener("click", getMealRecipe);

function getMealList() {
 meallist.innerHTML = "";
 const searchInput = document.querySelector("#search-input");
 let searchInputText = searchInput.value.trim(); //此app預設user只能輸入一種主食材，無法處理多個食材。trim的作用為去頭去尾的空白
 fetch(
  `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`
 )
  .then((response) => response.json())
  .then((data) => {
   //若data抓不到資料，該陣列(名為meal)為null
   if (data.meals) {
    data.meals.forEach((meal) => {
     const template = document.querySelector("template");
     const clone = template.content.cloneNode(true);
     const mealList = document.querySelector("#meal");
     clone.querySelector(".meal-item").dataset.id = `${meal.idMeal}`;
     clone.querySelector(".meal-img img").src = `${meal.strMealThumb}`;
     clone.querySelector(".meal-name h3").innerHTML = `${meal.strMeal}`;
     mealList.appendChild(clone);
     searchInput.value = "";
    });
    meallist.classList.remove("notFound");
   } else {
    meallist.innerHTML = "Sorry,we didn't find any meals.";
    meallist.classList.add("notFound");
    searchInput.value = "";
   }
  });
}

//取得食譜後把該物件丟到 mealRecipeModal中
function getMealRecipe(e) {
 e.preventDefault();
 if (e.target.classList.contains("recipe-btn")) {
  const mealItem = e.target.parentElement.parentElement;
  fetch(
   `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
  )
   .then((response) => response.json())
   .then((data) => {
    mealRecipeModal(data.meals);
   });
 }
}

//顯示食譜
function mealRecipeModal(meal) {
 console.log(meal);
 console.log(meal[0]);
}
