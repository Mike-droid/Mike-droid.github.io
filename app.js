const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
const pokemon = document.getElementById('pokemonName');
const buttonPokemon = document.getElementById('searchPokemon');
const buttonDelete = document.getElementById('deleteSearch');
const appNode = document.getElementById('app');

buttonPokemon.addEventListener('click' , () => {
  window.fetch(`${baseUrl}${pokemon.value}`)
  .then(response => response.json())
  .then(responseJSON => {
    const allItems = [];

    const result = []; //*Guardaremos la respuesta en el array

    for (let index in responseJSON) { //*Convertimos el objeto JSON a array
      result.push([index , responseJSON[index]]);
    }

    console.log(result);

    //*Crear imagen
    const pokemonImage = document.createElement('img');
    pokemonImage.src = result[14][1].front_default;

    //*Tipo de pokemon
    const pokemonType = document.createElement('h2');
    pokemonType.innerText = result[16][1][0].type.name;

    //*Crear contenedor
    const container = document.createElement('div');
    container.append(pokemonImage , pokemonType);
    container.classList.add('container');

    allItems.push(container);

    appNode.append(...allItems);
  });
});
