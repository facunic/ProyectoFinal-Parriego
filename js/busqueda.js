document.addEventListener("DOMContentLoaded", () => {
    const modoOscuroBtn = document.getElementById("modo-oscuro-btn");
    const nav = document.querySelector("nav");
    const body = document.body;
    const navLinks = document.querySelectorAll("nav a");

    // Centrar la sección de búsqueda
    const searchSection = document.querySelector('section');
    searchSection.style.textAlign = 'center';

    modoOscuroBtn.addEventListener("click", () => {
        if (body.classList.contains("modo-oscuro")) {
            navLinks.forEach(link => {
                link.style.color = "#000";
            });
        } else {
            navLinks.forEach(link => {
                link.style.color = "";
            });
        }
    });

    modoOscuroBtn.addEventListener("click", () => {
        body.classList.toggle("modo-oscuro");
        nav.classList.toggle("modo-oscuro");

        if (body.classList.contains("modo-oscuro")) {
            modoOscuroBtn.src = "../multimedia/bx-moon.png";
            localStorage.setItem("modo-oscuro", "activo");
        } else {
            modoOscuroBtn.src = "../multimedia/bxs-moon.png";
            localStorage.setItem("modo-oscuro", "inactivo");
        }
    });

    const modoOscuroGuardado = localStorage.getItem("modo-oscuro");
    if (modoOscuroGuardado === "activo") {
        body.classList.add("modo-oscuro");
        nav.classList.add("modo-oscuro");
        modoOscuroBtn.src = "../multimedia/bxs-moon.png";
    }

    const searchButton = document.getElementById("search-button");
    const searchInput = document.getElementById("search-input");
    const resultsSection = document.getElementById("results-section");
    const favoritesList = document.getElementById("favorites-list");
    const clearFavoritesButton = document.getElementById("clear-favorites");

    let characters = [];
    let favorites = getFavoritesFromStorage();

    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.toLowerCase();
        fetch(`https://rickandmortyapi.com/api/character/?name=${searchTerm}`)
            .then(response => response.json())
            .then(data => {
                const filteredCharacters = data.results;
                displayResults(filteredCharacters);
            })
            .catch(error => console.error("Error al buscar personajes:", error));
    });

    clearFavoritesButton.addEventListener("click", () => {
        favorites = [];
        updateFavoritesList();
        saveFavoritesToStorage();
        notifyUser("Todos los favoritos han sido eliminados");
    });

    // Llama a displayResults y updateFavoritesList al cargar la página
    displayResults(characters);
    updateFavoritesList();

    function displayResults(results) {
        resultsSection.innerHTML = "";
        results.forEach(result => {
            const isFavorite = favorites.some(favorite => favorite.name === result.name);
            const card = createCard(result, addToFavorites, isFavorite);
            resultsSection.appendChild(card);
        });
    }

    function createCard(character, clickHandler, isFavorite) {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h3>${character.name}</h3>
            <img src="${character.image}" alt="${character.name}">
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
            <button class="add-favorite-button">${isFavorite ? 'Eliminar de' : 'Agregar a'} Favoritos</button>
        `;

        const addButton = card.querySelector(".add-favorite-button");
        addButton.addEventListener("click", () => clickHandler(character, isFavorite));

        return card;
    }

    function addToFavorites(character, isFavorite) {
        if (!isFavorite) {
            favorites.push(character);
            updateFavoritesList();
            saveFavoritesToStorage();
            notifyUser(`${character.name} añadido a Favoritos`);
        } else {
            removeFromFavorites(character);
        }
    }

    function updateFavoritesList() {
        favoritesList.innerHTML = "";
        favorites.forEach(favorite => {
            const card = createCard(favorite, removeFromFavorites, true);
            favoritesList.appendChild(card);
        });
    }

    function removeFromFavorites(character) {
        favorites = favorites.filter(favorite => favorite.name !== character.name);
        updateFavoritesList();
        saveFavoritesToStorage();
        notifyUser(`${character.name} eliminado de Favoritos`);
    }

    function notifyUser(message) {
        const notification = document.getElementById("notification");
        notification.textContent = message;
        notification.style.display = "block";

        setTimeout(() => {
            notification.style.display = "none";
        }, 2000); // Ocultar la notificación después de 2 segundos
    }

    function getFavoritesFromStorage() {
        const storedFavorites = localStorage.getItem("favoritos");
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    }

    function saveFavoritesToStorage() {
        localStorage.setItem("favoritos", JSON.stringify(favorites));
    }
});