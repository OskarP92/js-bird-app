let pokemonRepository = (function () {
    // wrapped listArray in IIFE to avoid accidentally accessing global state
    let pokemonList = [

    ];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // return object with getAll and add functions assigned as keys
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    } 

    //function that logs pokemon to console
     function showDetails(pokemon) {
         loadDetails(pokemon).then(function() {
          console.log(pokemon);   
         });
       
   }

    function addListItem(pokemon) {
        let pokemonUnorderedList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = (pokemon.name);
        button.classList.add('my-button');
        listItem.appendChild(button);
        pokemonUnorderedList.appendChild(listItem);

        // showDetails called after click
        button.addEventListener('click', function() {
            showDetails(pokemon);
         } );
   
    };

     //function that logs pokemon to console
     function showDetails(pokemon) {
         loadDetails(pokemon).then(function() {
          console.log(pokemon);   
         });
       
   };

// function that uses fetch to GET pokemon list
    function loadList() {
        return fetch(apiUrl).then(function(response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    // function that GETs pokemon details 
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            //Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }


    
    

    return {
        add: add,
        getAll: getAll,
       addListItem: addListItem,
       loadList: loadList,
       loadDetails: loadDetails
    };

    

})(); 

pokemonRepository.loadList().then(function() {
// forEach loop that accesses pokemonList via getAll function 
pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
});
});

