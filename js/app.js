const searchDrink = () => {
  const searchText = document.getElementById('search-field').value;
  console.log(searchText);
  const getSpinner = document.getElementById('spinner');
  getSpinner.classList.remove('d-none');
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`

  fetch(url)
  .then(res => res.json())
  .then(data => displayDrink(data.drinks));
}

const displayDrink = info => {
  // console.log(info);
  const cardContainer = document.getElementById('card-container');
  // empty element
  cardContainer.textContent = '';

  info.forEach(drink => {
    // console.log(drink);
  const div = document.createElement('div');
  div.classList.add('col-lg-4', 'col-md-4', 'col-sm-6', 'col-12');
  div.innerHTML = `
    <div class="card mb-5" style="width: 20rem;">
    <img src="${drink.strDrinkThumb}" class="card-img-top p-4" alt="...">
      <div class="card-body">
        <h5 class="card-title">${drink.strIngredient3}</h5>
        <p class="card-text">${drink.strInstructions.slice(0, 50)}</p>
        <button onclick="seeDetails('${drink.idDrink}')" class="btn btn-primary">See Details</button>
      </div>
    </div>
  `;
  // hide spinner 
  const getSpinner = document.getElementById('spinner');
  getSpinner.classList.add('d-none');
  // empty searchField 
  document.getElementById('search-field').value = '';
  // append chile 
  cardContainer.appendChild(div);
  })
}

const seeDetails = single => {
//  console.log(single);
 const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${single}`;

 fetch(url)
 .then(res => res.json())
 .then(data => displaySingleDetails(data.drinks[0]))
}

const displaySingleDetails = singleDetails => {
  console.log(singleDetails);
  const cardContainer = document.getElementById('details-container');
  // empty element 
  cardContainer.textContent = '';
  const div = document.createElement('div');
  div.classList.add('col');
  div.innerHTML = `
  <div class="card mb-5 w-50">
  <img src="${singleDetails.strDrinkThumb}" class="card-img-top p-4" alt="...">
    <div class="card-body">
      <h5 class="card-title">${singleDetails.strIngredient3}</h5>
      <p class="card-text">${singleDetails.strInstructions.slice(0, 50)}</p>
      <button onclick="seeDetails('${singleDetails.idDrink}')" class="btn btn-primary">See Details</button>
    </div>
  </div>
  `;
  cardContainer.appendChild(div);
}