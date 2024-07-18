const searchbox=document.querySelector('.searchbox');
const searchBtn=document.querySelector('.searchBtn');
const recipecontainer=document.querySelector('.recipe-container');
const recipedetailscontent=document.querySelector('.recipe-details-content');
const recipeclosebtn=document.querySelector('.recipe-closebtn');

const fetchRecipes= async (query)=>{
    recipecontainer.innerHTML="<h2>Fetching Recipes...</h2>"
    const data= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response= await data.json();
    
    recipecontainer.innerHTML= "";
    response.meals.forEach(meal => {
        const recipediv=document.createElement('div');
        recipediv.classList.add('recipe');
        recipediv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
    
        `
        const button=document.createElement('button');
        button.textContent="View Recipe";
        recipediv.appendChild(button);
        button.addEventListener('click',()=>{
            OpenRecipePopup(meal);

        })
        recipecontainer.appendChild(recipediv);
        
    });
}
const fetchIngredients=(meal)=>{
    let ingredientsList="";
    for(let i=1;i<=20;i++){
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`]
            ingredientsList+=`<li>${measure}${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;

}
const OpenRecipePopup=(meal)=>{
    recipedetailscontent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients :</h3>
    <ul class="ingradientlist">${fetchIngredients(meal)}</ul>
    <div class="recipeinstructions">
      <h3>Instructions :</h3>
        <p class="recipeInstructions">${meal.strInstructions}</p>
       
    </div>


    `

   
    recipedetailscontent.parentElement.style.display="block";
}
recipeclosebtn.addEventListener('click', () =>{
    recipedetailscontent.parentElement.style.display="none"
})

    



searchBtn.addEventListener('click' , (e) => {
    e.preventDefault();
    const searchInput=searchbox.value.trim();
    fetchRecipes(searchInput);
    console.log('button clicked')
});
