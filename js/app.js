const searchDrink = () => {
  const searchText = document.getElementById('search-field').value;
  console.log(searchText);
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchText}`

  fetch(url)
  .then(res => res.json())
  .then(data => displayDrink(data.drinks));
}

const displayDrink = info => {
  // console.log(info);
  const cardContainer = document.getElementById('card-container');
  
  info.forEach(drink => {
    console.log(drink);
  const div = document.createElement('div');
  div.classList.add('col-lg-4', 'col-md-4', 'col-sm-6', 'col-12');
  div.innerHTML = `
    <div class="card mb-5" style="width: 20rem;">
    <img src="${drink.strDrinkThumb}" class="card-img-top p-4" alt="...">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  `
  cardContainer.appendChild(div);
  })
}