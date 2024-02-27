
//Initializing the Pokemon list
//Wrapped in IIFE with exposed functions
let pokemonRepository = (function () {
  let pokemonList = [];
  let expectedKeys = ['name', 'detailsUrl'];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      hideLoadingMessage();
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage();
    })
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      hideLoadingMessage();
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
      hideLoadingMessage();
    });
  }

  //Shows loading message on the page
  function showLoadingMessage() {
    let messageBlock = document.querySelector('.loading-status');
    let message = document.createElement('p');
    message.classList.add('status-message');
    message.innerText = 'Loading ...';
    messageBlock.append(message);
  }

  //Hides loading message from the page
  function hideLoadingMessage() {
    let message = document.querySelector('.status-message');
    message.parentElement.removeChild(message);
  }

  //Adds a new Pokemon if it's an Object and has all required keys
  function add(pokemon) {
    if (typeof(pokemon) === 'object'){
      let keysToAdd = Object.keys(pokemon);
      let areKeysCorrect = JSON.stringify(expectedKeys.sort()) === JSON.stringify(keysToAdd.sort());
      if (areKeysCorrect) {
        pokemonList.push(pokemon);
        console.log('Added new pokemon.');
      } else {
        console.log('Not added. Object keys incorrect.');
      }
    }
    else {
      console.log('Not added. This item is not an Object.');
    }
  }

  //Adds a Pokemon as a list item (button) in the page
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let pokemonListItem = document.createElement('li');

    let pokemonButton = document.createElement('button');
    pokemonButton.innerText = pokemon.name;
    pokemonButton.classList.add('pokemon-button');

    pokemonListItem.appendChild(pokemonButton);
    pokemonList.appendChild(pokemonListItem);

    addButtonListener(pokemonButton, pokemon);
  }

  //Adds an Event Listener in a button
  function addButtonListener(button, pokemon) {
    button.addEventListener('click', function () {showDetails(pokemon)});
  }

  //Shows Pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
    //console.log(pokemon.name);
  }

  //Gets all stored Pokemons
  function getAll() {
    return pokemonList;
  }

  //Finds a Pokemon by its name
  function getPokemonByName(searchedName) {
    return pokemonList.filter((pokemon) => pokemon.name.toLowerCase() === searchedName.toLowerCase());
  }

  return {
    add: add,
    addListItem: addListItem,
    getAll: getAll,
    getPokemonByName: getPokemonByName,
    loadList: loadList,
    loadDetails: loadDetails
  };
})();

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});