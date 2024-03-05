
//Prepares the Pokemon list
//Wrapped in IIFE with exposed functions
let pokemonRepository = (function () {
  let pokemonList = [];
  let expectedKeys = ['name', 'detailsUrl'];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  //Loads Pokemons from an external API adn store in the repository
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

  //Loads details about a Pokemon from an external API
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

  //Adds a Pokemon as a button in the page
  function addListItem(pokemon) {
    let pokemonList = document.querySelector('.pokemon-list');
    let pokemonListItem = document.createElement('li');
    pokemonListItem.classList.add('list-group-item');

    let pokemonButton = document.createElement('button');
    pokemonButton.innerText = pokemon.name.toUpperCase();
    pokemonButton.setAttribute('type', 'button');
    pokemonButton.classList.add('btn');
    pokemonButton.classList.add('btn-dark');
    pokemonButton.classList.add('pokemon-button');
    pokemonButton.classList.add('box-shadow');

    pokemonListItem.appendChild(pokemonButton);
    pokemonList.appendChild(pokemonListItem);

    addButtonListener(pokemonButton, pokemon);
  }

  //Adds an Event Listener in a Pokemon button
  function addButtonListener(button, pokemon) {
    button.addEventListener('click', function () {showDetails(pokemon)});
  }

  //Shows Pokemon details
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon.name.toUpperCase(), pokemon.imageUrl, pokemon.height, pokemon.types);
    });
  }

  //Shows the modal for Pokemon
  function showModal(title, url, height, types) {
    let modalContainer = document.querySelector('#pokemon-modal-container');

    modalContainer.innerHTML = '';

    let modal = document.createElement('div');
    modal.classList.add('pokemon-modal');

    let closeButtonElement = document.createElement('button');
    closeButtonElement.classList.add('pokemon-modal-close');
    closeButtonElement.innerText = 'Close';
    closeButtonElement.addEventListener('click', hideModal);

    let titleElement = document.createElement('h1');
    titleElement.innerText = title;

    let imgElement = document.createElement('img');
    imgElement.src = url;
    imgElement.alt = title + ' Pokémon image';


    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + height;

    let typesElement = document.createElement('p');

    let typesArray = [];
    types.forEach(function (type) {
      typesArray.push(type.type.name);
    })

    let typesString = 'Types: ' + typesArray.toString().replace(',', ', ');
    typesElement.innerText = typesString;

    modal.appendChild(closeButtonElement);
    modal.appendChild(titleElement);
    modal.appendChild(imgElement);
    modal.appendChild(heightElement);
    modal.appendChild(typesElement);
    modalContainer.appendChild(modal);

    modalContainer.classList.add('is-visible');

    //Hides the Pokemon modal if clicked outside the modal
    modalContainer.addEventListener('click', (e) => {
      // Since this is also triggered when clicking INSIDE the modal
      // We only want to close if the user clicks directly on the overlay
      let target = e.target;
      if (target === modalContainer) {
        hideModal();
      }
    })
  }

  //Hides the Pokemon modal container
  function hideModal() {
    let modalContainer = document.querySelector('#pokemon-modal-container');
    modalContainer.classList.remove('is-visible');
  }

  //Hides the Pokemon modal container when clicked ESC
  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#pokemon-modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

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

//Loads all Pokemons when the page is opened
pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});