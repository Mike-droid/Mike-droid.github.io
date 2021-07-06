const baseUrl = `https://pokeapi.co/api/v2/pokemon/`;
const pokemon = document.getElementById('pokemonName');
const buttonPokemon = document.getElementById('searchPokemon');
const buttonClear = document.getElementById('clearPokemon');
const appNode = document.getElementById('app');

buttonPokemon.addEventListener('click' , insertPokemon);
buttonPokemon.addEventListener('touchstart' , insertPokemon); //*For mobile devices

buttonClear.addEventListener('click' , deletePokemons);
buttonClear.addEventListener('touchstart' , deletePokemons); //* For mobile devices

async function insertPokemon() {
  try {
    const res = await fetch(`${baseUrl}${pokemon.value.toLocaleLowerCase()}`)
    const pokemonDataJSON = await res.json()

    const allItems = [];
    const result = []; //*Guardaremos la respuesta en el array

    for (let pokemonInfo in pokemonDataJSON) { //*Convertimos el objeto JSON a array
      result.push([pokemonInfo , pokemonDataJSON[pokemonInfo]]);
    }

    console.table(result); //! only for development

    //* Información de en frente

    //*Crear imagen
    const pokemonImage = document.createElement('img');
    pokemonImage.src = result[14][1].front_default; //*Image of pokemon

    //*Nombre de pokemon e ID
    const pokemonName = document.createElement('h2');
    pokemonName.innerText = `Name: ${result[10][1]} - ID: ${result[6][1]}`; //* Name of pokemon with ID

    //*Tipo de pokemon
    const pokemonType = document.createElement('h2');
    pokemonType.innerText = `Type: ${result[16][1][0].type.name}`; //*Type of pokemon

    //* Pokemon HP
    const hp = document.createElement('p');
    hp.innerText = `HP: ${result[15][1][0].base_stat}`; //*HP of pokemon
    hp.classList.add('pokemonStats');

    //* Attack power
    const attack = document.createElement('p');
    attack.innerText = `Attack: ${result[15][1][1].base_stat}`; //* Attack power of pokemon
    attack.classList.add('pokemonStats');

    //* Defense
    const defense = document.createElement('p');
    defense.innerText = `Defense: ${result[15][1][2].base_stat}`; //* Pokemon defense
    defense.classList.add('pokemonStats');

    //* Special Attack
    const specialAttack = document.createElement('p');
    specialAttack.innerText = `Special Attack: ${result[15][1][3].base_stat}`; //* Pokemon special attack
    specialAttack.classList.add('pokemonStats');

    //* Special Defense
    const specialDefense = document.createElement('p');
    specialDefense.innerText = `Special Defense: ${result[15][1][4].base_stat}`; //* Pokemon special defense
    specialDefense.classList.add('pokemonStats');

    //* Speed
    const speed = document.createElement('p');
    speed.innerText = `Speed: ${result[15][1][5].base_stat}`; //* Pokemon special attack
    speed.classList.add('pokemonStats');

    //* Contenerdor de stats
    const stats = document.createElement('div');
    stats.append(hp, attack, defense, specialAttack, specialDefense, speed);
    stats.classList.add('pokemonStatsContainer');

    //*Crear contenedor
    const container = document.createElement('div');
    container.append(pokemonImage , pokemonName ,pokemonType, stats);
    container.classList.add('container');

    allItems.push(container);

    appNode.append(...allItems);

  } catch (error) {
    alert("That pokemon isn't available. Try againt with another one!");
  }
}

function deletePokemons() {
  let allPokemon = appNode.childNodes;
  allPokemon = Array.from(allPokemon);

  allPokemon.forEach(pokemon => {
    pokemon.remove(pokemon);
  });
}
