// Initializing the Pokemon list
// Wrapped in IIFE with exposed functions
let pokemonRepository = (function () {
  let pokemonList = [];
  let expectedKeys = ['name', 'height', 'weight', 'type', 'category'];

  //List of Pokemon's, init static
  pokemonList = [
    {
      name: 'Bulbasaur',
      height: 0.7,
      weight: 6.9,
      type: ['grass', 'poison'],
      category: 'seed'
    },
    {
      name: 'Ivysaur',
      height: 1,
      weight: 13,
      type: ['grass', 'poison'],
      category: 'seed'
    },
    {
      name: 'Venusaur',
      height: 2,
      weight: 100,
      type: ['grass', 'poison'],
      category: 'seed'
    },
    {
      name: 'Charmander',
      height: 0.6,
      weight: 8.5,
      type: ['fire'],
      category: 'lizard'
    },
    {
      name: 'Charmeleon',
      height: 1.1,
      weight: 19,
      type: ['fire'],
      category: 'flame'
    }
  ];

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

  //Shows a Pokemon's details
  function showDetails(pokemon) {
    console.log(pokemon.name);
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
    getPokemonByName: getPokemonByName
  };
})();

// Loop through the pokemonList and 
// create Pokemon buttons on the page
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});