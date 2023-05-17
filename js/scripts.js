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

    //function that logs pokemon to console
    //function showDetails(pokemon) {
     //   console.log(pokemon);
   // }

    function addListItem(pokemon) {
        let pokemonUnorderedList = document.querySelector('.pokemon-list');

        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = (pokemon.name);
        button.classList.add('my-button');
        listItem.appendChild(button);
        pokemonUnorderedList.appendChild(listItem);

        // showDetails called after click
        //button.addEventListener('click', showDetails(pokemon) );
   

        // this works - but the showDetails function does not
        button.addEventListener('click', function() {
            console.log(pokemon);
        } );
    
    };
    
    

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };

    

})(); 

// forEach loop that accesses pokemonList via getAll function 
pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
    
});

