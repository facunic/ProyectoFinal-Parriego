const modoOscuroBtn = document.getElementById("modo-oscuro-btn");
const body = document.body;
const nav = document.querySelector("nav");

modoOscuroBtn.addEventListener("click", () => {
    body.classList.toggle("modo-oscuro");
    nav.classList.toggle("modo-oscuro");

    if (body.classList.contains("modo-oscuro")) {
        modoOscuroBtn.src = "multimedia/bx-moon.png";
        localStorage.setItem("modo-oscuro", "activo");
    } else {
        modoOscuroBtn.src = "multimedia/bxs-moon.png";
        localStorage.setItem("modo-oscuro", "inactivo");
    }
});

const modoOscuroGuardado = localStorage.getItem("modo-oscuro");
if (modoOscuroGuardado === "activo") {
    body.classList.add("modo-oscuro");
    nav.classList.add("modo-oscuro");
    modoOscuroBtn.src = "multimedia/bxs-moon.png";
}

async function getRickAndMortyData() {
    const response = await fetch("https://rickandmortyapi.com/api/character/");
    const data = await response.json();

    const cardsContainer = document.getElementById("cards-container");

    // Limitar el número de tarjetas a 20
    const characters = data.results.slice(0, 20);

    characters.forEach(character => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <h2>${character.name}</h2>
            <img src="${character.image}" alt="${character.name}">
            <p>Status: ${character.status}</p>
            <p>Species: ${character.species}</p>
        `;
        cardsContainer.appendChild(card);
    });
}

getRickAndMortyData();

