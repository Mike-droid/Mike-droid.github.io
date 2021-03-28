const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
const pokemon = document.getElementById('pokemonName');
const buttonPokemon = document.getElementById('searchPokemon');
const buttonDelete = document.getElementById('deleteSearch');
const buttonClear = document.getElementById('clearPokemon');
const appNode = document.getElementById('app');

buttonPokemon.addEventListener('click' , insertPokemon);
buttonPokemon.addEventListener('touchstart' , insertPokemon); //*For mobile devices

buttonClear.addEventListener('click' , deletePokemons);
buttonClear.addEventListener('touchstart' , deletePokemons); //* For mobile devices

function insertPokemon() {
  window.fetch(`${baseUrl}${pokemon.value.toLocaleLowerCase()}`)
    .then(response => response.json())
    .then(responseJSON => {
      const allItems = [];

      const result = []; //*Guardaremos la respuesta en el array

      for (let index in responseJSON) { //*Convertimos el objeto JSON a array
        result.push([index , responseJSON[index]]);
      }

      //console.log(result);

      //*Crear imagen
      const pokemonImage = document.createElement('img');
      pokemonImage.src = result[14][1].front_default; //*Image of pokemon

      //*Nombre de pokemon
      const pokemonName = document.createElement('h2');
      pokemonName.innerText = `Name: ${result[10][1]}`; //* Name of pokemon

      //*Tipo de pokemon
      const pokemonType = document.createElement('h2');
      pokemonType.innerText = `Type: ${result[16][1][0].type.name}`; //*Type of pokemon

      //*Crear contenedor
      const container = document.createElement('div');
      container.append(pokemonImage , pokemonName ,pokemonType);
      container.classList.add('container');

      allItems.push(container);

      appNode.append(...allItems);
    });
}

function deletePokemons() {
  allChildren = appNode.childNodes;
  allChildren = Array.from(allChildren);

  allChildren.forEach(pokemon => {
    pokemon.remove(pokemon);
  });
}