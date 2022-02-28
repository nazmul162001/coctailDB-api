// common function for empty card-container
function handleCard(id){
  const cardContainer = document.getElementById(id);
  cardContainer.textContent = '';
  return cardContainer;
}
// common function for empty search field 
function emptySearch(id){
  const searchBtn = document.getElementById(id);
  searchBtn.value = '';
  return searchBtn;
}
// common function for input border color
function borderColor(id){
  const changeColor = document.getElementById(id);
  changeColor.classList.add('border-danger');
  return changeColor;
}
  // trigger button click on enter 
const input = document.getElementById("search-field");
input.addEventListener("keyup", function(e) {
  if (e.keyCode === 13) {
    e.preventDefault();
  document.getElementById("search-btn").click();
  }
});
// search btn handler & call api 
const searchBtn = () => {
  // show preloader 
  const preloader = document.getElementById('preloader');
  preloader.classList.remove('d-none');
  handleCard('card-container');
  handleCard('details-container');
  // get search text 
  const searchBtn = document.getElementById('search-field');
  const searchText = searchBtn.value;
  
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`
  fetch(url)
  .then(res => res.json())
  .then(data => {
    if(data.drinks === null){
      const errMsg= document.getElementById('err-msg');
      errMsg.classList.remove('d-none');
      errMsg.innerText = 'Data not found';
      emptySearch('search-field'); // empty search field 
      handleCard('err2');
      // empty card-container 
      handleCard('card-container');
      handleCard('details-container');
      const preloader = document.getElementById('preloader'); // show preloader 
      preloader.classList.add('d-none');
      // border borderColor
      borderColor('search-field');
    }
    else if(searchBtn.value === ''){
      const errMsg= document.getElementById('err-msg');
      errMsg.classList.remove('d-none');
      errMsg.innerText = 'Please search Something';
      // show preloader 
      const preloader = document.getElementById('preloader');
      preloader.classList.add('d-none');
      // empty card-container 
      handleCard('err2');
      // border borderColor
      borderColor('search-field');
    }
    else{
      displaySearch(data.drinks)
      const errMsg= document.getElementById('err-msg');
      errMsg.classList.add('d-none');
      // border borderColor
      const changeColor = document.getElementById('search-field');
      changeColor.classList.remove('border-danger');
    }
  })
}

const displaySearch = (drink) => {
  console.log(drink);
  // display total result number 
  const showTotalResult = document.getElementById('err2');
  showTotalResult.textContent = '';
  const p = document.createElement('p');
  p.classList.add('text-center', 'text-primary', 'fs-5')
  p.innerHTML = `
  Showing total of ${drink.length} result 😊
  `;
  showTotalResult.appendChild(p);

  // -------------------------------------------------- //

  const cardContainer = document.getElementById('card-container');
  // empty previous result 
  cardContainer.textContent = '';
  drink.forEach(info => {
    const div = document.createElement('div');
    div.classList.add('col-lg-4', 'col-md-4', 'col-sm-6', 'col-12');
    div.innerHTML = `
      <div class="card mb-5">
          <img src="${info.strDrinkThumb}" class="card-img-top" alt="...">
          <div class="card-body">
              <h5 class="card-title">${info.strDrink}</h5>
              <p class="card-text">${info.strInstructions.slice(0,70)}</p>
              <button onclick = "seeDetails('${info.idDrink}')" class = "btn btn-primary">See Details</button>
          </div>
      </div>
    `;
    // append child div to main div 
    cardContainer.appendChild(div);
    emptySearch('search-field'); // empty search field 
    const preloader = document.getElementById('preloader'); // show preloader 
    preloader.classList.add('d-none');
  })
}

// See details section 
const seeDetails = single => {
  const getClose = document.getElementById('details');
  getClose.classList.remove('d-none')
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${single}`;

  fetch(url)
  .then(res => res.json())
  .then(data => displayDetails(data.drinks[0]))
}

const displayDetails = singleInfo => {
  // console.log(singleInfo);
  const seeDetails = document.getElementById('details-container');
    // empty previous details 
  seeDetails.textContent = '';
  const div = document.createElement('div');
  div.classList.add('col-8');
  div.innerHTML = `
    <div class="card mb-5 custom-card bg-info">
        <img src="${singleInfo.strDrinkThumb}" class="card-img-top p-5" alt="...">
        <div class="card-body">
          <h5 class="card-title">${singleInfo.strDrink}</h5>
          <h5 class="card-title">Category: ${singleInfo.strCategory}</h5>
          <h5 class="card-title">Quality: ${singleInfo.strGlass}</h5>
          <p class="card-text">${singleInfo.strInstructions.slice(0,500)}</p>
          <button onclick="closeBtn()" id="close" class="btn btn-primary">close</button>
        </div>
    </div>
  `;
  seeDetails.appendChild(div);
}


const closeBtn = getCloseBtn => {
  const getClose = document.getElementById('details');
  getClose.classList.add('d-none')
  console.log('object');
}