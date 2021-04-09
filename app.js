const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
const pokemon = document.getElementById('pokemonName');
const buttonPokemon = document.getElementById('searchPokemon');
const buttonClear = document.getElementById('clearPokemon');
const appNode = document.getElementById('app');

buttonPokemon.addEventListener('click' , insertPokemon);
buttonPokemon.addEventListener('touchstart' , insertPokemon); //*For mobile devices

buttonClear.addEventListener('click' , deletePokemons);
buttonClear.addEventListener('touchstart' , deletePokemons); //* For mobile devices

function insertPokemon() {
  window.fetch(`${baseUrl}${pokemon.value.toLocaleLowerCase()}`)
    .then(response =>{
      if (response.status === 404) {
        alert("This pokemon is not available. Try with another one!");
      } else {
        return response.json();
      }
    })
    .then(responseJSON => {
      const allItems = [];

      const result = []; //*Guardaremos la respuesta en el array

      for (let pokemonInfo in responseJSON) { //*Convertimos el objeto JSON a array
        result.push([pokemonInfo , responseJSON[pokemonInfo]]);
      }

      //!console.table(result); only for development

      //*Crear imagen
      const pokemonImage = document.createElement('img');
      pokemonImage.src = result[14][1].front_default; //*Image of pokemon

      //*Nombre de pokemon e ID
      const pokemonName = document.createElement('h2');
      pokemonName.innerText = `Name: ${result[10][1]} - ID: ${result[6][1]}`; //* Name of pokemon with ID

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
  let allPokemon = appNode.childNodes;
  allPokemon = Array.from(allPokemon);

  allPokemon.forEach(pokemon => {
    pokemon.remove(pokemon);
  });
}
