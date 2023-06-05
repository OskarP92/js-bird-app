let pokemonRepository = (function () {


    // define modalContainer declared globally in the IIFE to follow the DRY principle 
    let modalContainer = document.querySelector('#modal-container');

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
        loadDetails(pokemon).then(function () {

            // select modal-container div, add is-visible class, clear any content
            // modalContainer.classList.add('is-visible');
            // modalContainer.innerHTML = '';

            // // create .modal div 
            // let modal = document.createElement('div');
            // modal.classList.add('modal');

            // // create close button
            // let closeButton = document.createElement('button');
            // closeButton.classList.add('close-modal');
            // closeButton.innerText = 'X';
            // closeButton.addEventListener('click', hideModal);

            // // create h1 element to display name
            // let titleElement = document.createElement('h1');
            // titleElement.innerText = pokemon.name;

            // // create p element to display height
            // let heightElement = document.createElement('p');
            // heightElement.innerText = 'Height: ' + pokemon.height;

            // // create img element 
            // let imageElement = document.createElement('img');
            // imageElement.src = pokemon.imageUrl;

            // // append elements to parents
            // modal.appendChild(closeButton);
            // modal.appendChild(titleElement);
            // modal.appendChild(heightElement);
            // modal.appendChild(imageElement);
            // modalContainer.appendChild(modal);

            // // listen for clicks on the container to close modal
            // modalContainer.addEventListener('click', (e) => {
            //     let target = e.target;
            //     if (target === modalContainer) {
            //         hideModal();
            //     }
            // });
        });
    }

    // remove is-visible class 
    // function hideModal() {
    //     modalContainer.classList.remove('is-visible')
    // }

    // declare that modalContainer must be visible for Esc key to close it
    // window.addEventListener('keydown', (e) => {
    //     if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
    //         hideModal();
    //     }
    // });

    function addListItem(pokemon) {
        let pokemonUnorderedList = document.querySelector('.list-group');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        let button = document.createElement('button');
        $("button").addClass("btn btn-primary");
        $("button").attr("data-toggle", "modal");
        $("button").attr("data-target", "#exampleModal");

        button.innerText = (pokemon.name);
        
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

pokemonRepository.loadList().then(function () {
    // forEach loop that accesses pokemonList via getAll function 
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});