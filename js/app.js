const searchDrink = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  console.log(searchText);
  // hide spinner 
  const getSpinner = document.getElementById('spinner');
  getSpinner.classList.remove('d-none');
  // document.getElementById('card-container').style.display = 'none';

  
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`

  fetch(url)
  .then(res => res.json())
  .then(data => {
    if(data.drinks === null || searchField.value === '' || typeof(searchField.value) === !String){
      // console.log('not found');
      getSpinner.classList.add('d-none');
      searchField.value = '';
      const errHandling = document.getElementById('err');
      errHandling.classList.remove('d-none');
      const cardContainer = document.getElementById('card-container');
      // empty element
      cardContainer.textContent = '';

      // empty details container 
      const detailsContainer = document.getElementById('details-container');
      detailsContainer.textContent = '';

        // handling 
      const getHandling = document.getElementById('handling');
      getHandling.classList.add('d-none')
    }
    else{
      displayDrink(data.drinks)
      const errHandling = document.getElementById('err');
      errHandling.classList.add('d-none');

        // handling 
      const getHandling = document.getElementById('handling');
      getHandling.classList.remove('d-none')
    }
  });
}

const displayDrink = info => {
  // console.log(info, info.length);
  // handling content 
  const getHandling = document.getElementById('handling');
  // hide previous handling text 
  getHandling.textContent = '';
  // creat & showing handling text 
  const p = document.createElement('p');
  p.classList.add('text-center', 'text-primary', 'fs-5');
  p.innerHTML = `
      Showing total of ${info.length} result 😊
  `
  getHandling.appendChild(p);


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
  // append chile 
  cardContainer.appendChild(div);
  });
    // hide spinner 
    const getSpinner = document.getElementById('spinner');
    getSpinner.classList.add('d-none');
    // document.getElementById('card-container').style.display = 'block';
    // empty searchField 
    document.getElementById('search-field').value = '';

          // empty details container 
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.textContent = '';
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
      <button onclick="removeDetails('${singleDetails.idDrink}')" class="btn btn-primary">See Details</button>
    </div>
  </div>
  `;
  cardContainer.appendChild(div);
}
