// Initializing the Pokemon list
let pokemonRepository = (function () {
  let pokemonList = [];
  let expectedKeys = ['name', 'height', 'weight', 'type', 'category'];

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

  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let pokemonListItem = document.createElement('li');
    let pokemonButton = document.createElement('button');
    pokemonButton.innerText = pokemon.name;
    pokemonButton.classList.add('pokemon-button');
    pokemonListItem.appendChild(pokemonButton);
    pokemonList.appendChild(pokemonListItem);
  }

  function getAll() {
    return pokemonList;
  }

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

console.log(pokemonRepository.getAll());

//Testing pokemon search
console.log(pokemonRepository.getPokemonByName('ivysaur'));

// Loop through the pokemonList and create Pokemon buttons
pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonRepository.addListItem(pokemon);
});