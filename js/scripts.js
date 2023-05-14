let pokemonRepository = (function () {
    // wrapped listArray in IIFE to avoid accidentally accessing global state
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

    // return object with getAll and add functions assigned as keys
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    } 

    return {
        add: add,
        getAll: getAll
    };
})(); 

// forEach loop that accesses pokemonList via getAll function 
pokemonRepository.getAll().forEach(function(pokemon){
    document.write('<br>' + pokemon.name + ' ' + pokemon.height)
    if(pokemon.height > 0.6) {
        document.write (' - Wow! That\'s big!');
    }
});

