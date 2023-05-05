// create array of objects for Pokemon

let pokemonList = [
    {
        name: 'Bulbasaur',
        height: 0.7,
        type: ['grass', 'posion'],
    },
    {
        name: 'Charmander',
        height: 0.6,
        type: ['fire'],
    },
    {
        name: 'Squirtle',
        height: 0.5,
        type: ['water'],
    }
];

// loop that goes through the array starting at 0 index
for (let i = 0; i < pokemonList.length; i++) {

// write names and heights of Pokemon
    document.write (pokemonList[i].name + ' (Height: ' + pokemonList[i].height + ')');

// conditional for pokemons larger than 0.6
    if (pokemonList[i].height >0.6) {
        document.write (' - Wow! That\'s big!');
    }

// add line break between list items
    document.write('<br>');
}