
// Nav

function openNav(){
    $(`.sidenav`).animate({left: 0 }, 300);

    $(`.sidetoggle`).animate({left: 290}, 500);

    $(`.sidenav`).css( `display` , `flex`) 

    for (let i = 0; i < 6; i++) {
        $(".sidenav li").eq(i).animate({
            top: 50
        }, (i + 5) * 100)
    }
    
}

$(`.open`).on(`click`, openNav )

function closeNav(){
    $(`.sidenav`).animate({left: -350 } , 500)

    $(`.sidetoggle`).animate({ left: 0}, 800);
}

$(`.closeBtn`).on(`click`, closeNav )

// Search
let sByName = document.querySelector(`.sByName`)
let meals = []

async function getData(){
    var response = await fetch( `https://www.themealdb.com/api/json/v1/1/search.php?s=`   )
  var finalData = await response.json();
  meals = finalData.meals;
  console.log(meals);
  display();
}
getData()


$(`#search`).on(`click`,()=>{
    closeNav();

    $(`.home`).addClass(`d-none`)
    $(`#searchInput`).removeClass(`d-none`)

})


async function byName(Name){
    var response = await fetch( `https://www.themealdb.com/api/json/v1/1/search.php?s=${Name}`   )
  var finalData = await response.json();
  meals = finalData.meals;
  console.log(meals);
  display();
}

$(`.sByName`).on(`input` , ()=>{
    byName(sByName.value)
})


function display(){
  
    var cartona = ``
    for( var i=0 ; i<20 ; i++ ){

        cartona += `
        <div onclick="getDetails(${meals[i].idMeal});" class="col-md-3 ">
            <div class="meal position-relative  overflow-hidden ">
                <img src="${meals[i].strMealThumb}" alt="meal" class="mealimg img-fluid w-100">
                <div class="mealLayer bg-body-tertiary d-flex justify-content-start align-items-center h-100 w-100 ">
                    <h3>${meals[i].strMeal}</h3>
                </div>
            </div>
        </div>
        `

    }
    document.getElementById(`rowData`).innerHTML= cartona;
    $(`.home`).removeClass(`d-none`)
    $(`.details`).addClass(`d-none`)
    $(`.IngrediantShow`).addClass(`d-none`)

    console.log(`done`);


}

//  Search By First
let sByfirst = document.querySelector(`.sByfirst`)

async function byFirst(Name){
    var response = await fetch( `https://www.themealdb.com/api/json/v1/1/search.php?f=${Name}`   )
  var finalData = await response.json();
  meals = finalData.meals;
  console.log(meals);
  display();
}

$(`.sByfirst`).on(`keyup` , ()=>{
    byFirst(sByfirst.value)
})
//  By Categories
$(`#categories`).on(`click`,()=>{
    closeNav();

    $(`.home`).addClass(`d-none`)
    $(`#searchInput`).addClass(`d-none`)
    getCategory()

})
let Categories =[];
async function getCategory(){
    var response = await fetch( `https://www.themealdb.com/api/json/v1/1/categories.php`   )
  var finalData = await response.json();
  Categories = finalData.categories;
  console.log(Categories);
  
  displayCategory();
}
function displayCategory(){
    var cartona = ``
    for( var i=0 ; i< Categories.length  ; i++ ){

        cartona += `
        <div class="col-md-3">
            <div onclick="byCategory('${Categories[i].strCategory}')"  class="categ position-relative overflow-hidden  ">
                <img src="${Categories[i].strCategoryThumb}" alt="meal" class="mealimg img-fluid w-100">
                <div class="categLayer bg-body-tertiary d-flex flex-column justify-content-start align-items-center h-100 w-100 overflow-hidden ">
                    <h3 id="sByCategory" >${Categories[i].strCategory}</h3>
                          <p class="desc">${Categories[i].strCategoryDescription}</p>

                </div>
            </div>
        </div>
        ` 


        
    }
    document.getElementById(`categoryData`).innerHTML= cartona;
    $(`.categoryShow`).removeClass(`d-none`)
    $(`.details`).addClass(`d-none`)


    

}

//  Show Meals By Categories

async function byCategory(cat){
    meals =[]
    document.getElementById(`rowData`).innerHTML = ""
    var response = await fetch( `https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`   )
  var finalData = await response.json();
  meals = finalData.meals;
  console.log(meals);
  display();
  $(`.categoryShow`).addClass(`d-none`)
  $(`.home`).removeClass(`d-none`)
}


// By Area
$(`#area`).on(`click`,()=>{
    closeNav();

    $(`.home`).addClass(`d-none`)
    $(`#searchInput`).addClass(`d-none`)
    $(`.categoryShow`).addClass(`d-none`)
    getAreas();

})

let Areas =[];
async function getAreas(){
    var response = await fetch( `https://www.themealdb.com/api/json/v1/1/list.php?a=list`   )
  var finalData = await response.json();
  Areas = finalData.meals;
  console.log(Areas);
  
  displayAreas();
}
function displayAreas(){
    var cartona = ``
    for( var i=0 ; i< Areas.length  ; i++ ){

        cartona += `

        <div onclick="byArea('${Areas[i].strArea}')"  class="col-md-3 text-white d-flex  justify-content-center align-items-center w-100 cursor-pointer ">
        <div  class="area  ">
          
                <i class="fa-solid fa-map-location-dot m-auto w-100 areaLogo my-2"></i>
            
                <h3  >${Areas[i].strArea}</h3>
                      
        </div>
    </div>

            
        
        ` 


        
    }
    document.getElementById(`areaData`).innerHTML= cartona;
    $(`.areaShow`).removeClass(`d-none`);
    $(`.details`).addClass(`d-none`)

    

}

//  Show Meals By Areas

async function byArea(area){
    meals =[]
    document.getElementById(`rowData`).innerHTML = ""
    var response = await fetch( `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`   )
  var finalData = await response.json();
  meals = finalData.meals;
  console.log(meals);
  $(`.areaShow`).addClass(`d-none`)
  display();
}





// $(`.meal`).on(`click`,()=>{
//     closeNav();

   
//     getDetails();
// })


let Details =[]

async function getDetails(id){
    var response = await fetch( `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`   )
  var finalData = await response.json();
  Details = finalData.meals;
  console.log(Details); 
  closeNav();
  $(`.home`).addClass(`d-none`)
  displayDetails();
}

function displayDetails(){

    var cartona = ``
    var box = ``
    
        for( var i=0 ; i<20 ; i++ ){
            box +=
             `
             <li class="col-md-3 bg-info-subtle text-muted m-auto">${Details[0].strMeasure+`${i+1}`}${Details[0].strIngredient+`${i+1}`}</li>
             `

             $(`#ingDetail`).val(box)

        // document.getElementById(`ingDetail`).innerHTML= box;
        // console.log(box);

        }


     
    

        cartona += `
        <div class="col-md-4 ">
          <img
            class="mealImg w-100 img-fluid"
            src="${Details[0].strMealThumb}"
            alt="mealImg"
          />
          <h2 class="my-3">${Details[0].strMeal}</h2>
        </div>

        <div class="col-md-8 gy-3">
          <h2>Instructions</h2>
          <p>
          ${Details[0].strInstructions}
          </p>
          <h2>Area : ${Details[0].strArea}</h2>
          <h2>Category : ${Details[0].strCategory}</h2>
          <h2>Recipes :</h2>
          <ul id="ingDetail" class="row  list-unstyled">
         

            
          </ul>
          <h2>Tags :</h2>
          <div>
            <a href="${Details[0].strYoutube}" class="btn btn-primary mx-2">Source</a>
            <a href="${Details[0].strYoutube}" class="btn btn-danger  mx-2">You Tube</a>
          </div>

           
        </div>
        `

    
    document.getElementById(`details`).innerHTML= cartona;
    $(`.details`).removeClass(`d-none`)
    console.log(`done`);


}

// By Ingrediant

$(`#ingredients`).on(`click`,()=>{
    closeNav();

    $(`.home`).addClass(`d-none`)
    getIngrediant();
})

let Ingrediants =[];
async function getIngrediant(){
    var response = await fetch( `https://www.themealdb.com/api/json/v1/1/list.php?i=list`   )
  var finalData = await response.json();
  Ingrediants = finalData.meals;
  console.log(Ingrediants);
  
  displayIngrediant();
}
function displayIngrediant(){
    var cartona = ``
    for( var i=0 ; i< Ingrediants.length  ; i++ ){

        cartona += `
        <div class="col-md-3">
        
            <div onclick="byIngrediant('${Ingrediants[i].strIngredient}')"  class="categ position-relative overflow-hidden w-100  ">
                <i class="fa-solid fa-carrot fw-bolder text-white w-100 h-25 "></i>
                <div class="categLayer bg-body-tertiary d-flex flex-column justify-content-start align-items-center h-100 w-100 overflow-hidden ">
                    <h3 id="sByCategory" >${Ingrediants[i].strIngredient}</h3>
                          <p class="desc">${Ingrediants[i].strDescription}</p>

                </div>
            </div>
        </div>
        ` 


        
    }
    document.getElementById(`IngrediantData`).innerHTML= cartona;
    $(`.IngrediantShow`).removeClass(`d-none`)
    $(`.details`).addClass(`d-none`)

    

}

//  Show Meals By Categories

async function byIngrediant(ing){
    meals =[]
    document.getElementById(`rowData`).innerHTML = ""
    var response = await fetch( `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`   )
  var finalData = await response.json();
  meals = finalData.meals;
  console.log(meals);
  display();
 
  $(`.home`).removeClass(`d-none`)
}

// contact





$(`#contact`).on(`click`,()=>{
    closeNav();

    $(`.home`).addClass(`d-none`)
    $(`#contactShow`).removeClass(`d-none`)

})

$(`#nameInput`).on(`input`, (e)=>{
    validateInput(e.target);
} )

$(`#mailInput`).on(`input`, (e)=>{
    validateInput(e.target);
} )

$(`#phoneInput`).on(`input`, (e)=>{
    validateInput(e.target);
} )

$(`#ageInput`).on(`input`, (e)=>{
    validateInput(e.target);
} )

$(`#passInput`).on(`input`, (e)=>{
    validateInput(e.target);
} )
$(`#repassInput`).on(`input`, (e)=>{

    validateInput(e.target);

    if(document.querySelector(`#repassInput`).innerText === document.querySelector(`#passInput`).innerText){ 
                   console.log(`true`);
      $(`#repassInput`).addClass(`is-valid`);
      $(`#repassInput`).removeClass(`is-invalid`);
      $(`#submitBtn`).removeClass(`disabled`);
      $(`#repassAlert`).addClass(`d-none`);
      }else{
        $(`#repassInput`).removeClass(`is-valid`);
      $(`#repassInput`).addClass(`is-invalid`);
      $(`#repassAlert`).removeClass(`d-none`); 
      }

    
    } )


function validateInput(element){

    var regex ={
        nameInput : /^[A-Z][a-z]{2,}$/,
        mailInput : /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        passInput : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        repassInput : /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        ageInput : /^(1[0-4][0-9]|[1-9]?[0-9])$/,
        phoneInput : /^(?:\+20|20)?(?:\s*\(?\d{2,3}\)?[-\s]*)?\d{7,8}$/,
    }

    if (regex[element.id].test(element.value) == true){
      element.classList.add(`is-valid`);
      element.classList.remove(`is-invalid`);
      element.nextElementSibling.classList.add(`d-none`);
  
      return true;
    }else{
      element.classList.add(`is-invalid`);
      element.classList.remove(`is-valid`);
      element.nextElementSibling.classList.remove(`d-none`);
      return false;
  
    }
  
  
  
  }





// function validName(){
//     let nameRegex = /^[A-Z][a-zA-Z]{2,}$/;
//     if (nameRegex.test(nameInput)) {
//          $(`#nameAlert`).addClass(`d-none`)
//          console.log(`1`);
//     } else {
//         $(`#nameAlert`).removeClass(`d-none`)
//         console.log(`2`);
        
//     }
// }
// $(`#nameInput`).on(`input`, validName )