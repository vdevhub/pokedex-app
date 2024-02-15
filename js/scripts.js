// Initializing the Pokemon list
let pokemonRepository = (function () {
  let pokemonList = [];

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

  let expectedKeys = ['name', 'height', 'weight', 'type', 'category'];

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

  function getAll() {
    return pokemonList;
  }

  return {
    add: add,
    getAll: getAll
  };
})();

console.log(pokemonRepository.getAll());

// Testing pokemon addition
pokemonRepository.add({
  name: 'Kikiki',
  height: 0.7,
  weight: 6.9,
  type: ['grass', 'poison'],
  category: 'seed'
});

// Loop through the pokemonList and print pokemons' name and height
// Each pokemon is in a separate paragraph
// If a pokemon is higher than 1.5 meters, add a flag

let pokemonDescription = '';
let bigPokemonTag = ' - <b>Wow, that’s big!</b>';

pokemonRepository.getAll().forEach(function (pokemon) {
  pokemonDescription = pokemon.name + ' (Height: ' + pokemon.height + ', Weight: ' + pokemon.weight + ')';
  if (pokemon.height > 1.5) {
    pokemonDescription = pokemonDescription + bigPokemonTag;
  }
  pokemonDescription = '<p>' + pokemonDescription + '</p>';
  console.log(pokemonDescription);
  document.write(pokemonDescription);
});