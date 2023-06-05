// code wrapped in IIFE to avoid accidentally accessing global state
let pokemonRepository = (function () {

    // wrapped listArray in IIFE 
    let pokemonList = [];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // return object with getAll and add functions assigned as keys
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonUnorderedList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');

        let button = document.createElement('button');
        button.innerText = (pokemon.name);
        $("button").addClass("btn btn-primary");
        $("button").attr("data-toggle", "modal");
        $("button").attr("data-target", "#exampleModal");

        listItem.appendChild(button);
        pokemonUnorderedList.appendChild(listItem);

        // showDetails called after click
        button.addEventListener('click', function () {
            showDetails(pokemon);
        });

    };

    // function that uses fetch to GET pokemon list
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    height: item.height,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    // function that GETs pokemon details 
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // add the details to the item
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    //function that logs pokemon to console
    function showDetails(item) {
        loadDetails(item).then(function () {
            showModal(item);
        });
    }


    function showModal(pokemon) {
        // define the modal divs as variables
        let modalTitle = $('.modal-title');
        let modalBody = $('.modal-body');

        // empty all of the divs each time the modal is opened
        modalTitle.empty();
        modalBody.empty();

        //create the name element for the pokemon
        let nameElement = $('<h1>' + pokemon.name + '</h1>');

        // create height 
        let heightElement = $("<p>" + "Height : " + pokemon.height + "</p>");

        // create imageElement and assign source
        let imageElement = document.createElement('img');
        imageElement.src = pokemon.imageUrl;

        //append elements to divs
        modalTitle.append(nameElement);
        modalBody.append(heightElement);
        modalBody.append(imageElement);
    }
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,

    };
})();

pokemonRepository.loadList().then(function () {
    // forEach loop that accesses pokemonList via getAll function 
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});