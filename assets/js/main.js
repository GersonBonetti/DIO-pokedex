function updateTypeColors(types) {
    const typeClasses = types.map(type => `type-${type.type.name}`).join(' ');
    return `<ol class="types ${typeClasses}">${types.map(type => `<li class="type">${type.type.name}</li>`).join('')}</ol>`;
}

function toPascalCase(text) {
    return text.replace(/\w+/g, function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });
}

function getPokemonInfo() {
    const inputElement = document.getElementById("pokemonName");
    const pokemonName = inputElement.value.toLowerCase();

    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then(response => response.json())
        .then(data => {
            const typeColors = updateTypeColors(data.types);

            const pokemonInfo = `
                <ol class="pokemons">
                    <li class="pokemon">
                        <span class="number">#${data.id.toString().padStart(3, '0')}</span>
                        <span class="name">${toPascalCase(data.name)}</span>

                        <div class="detail">
                            <ol class="types">
                                ${data.types.map(type => `<li class="type">${type.type.name}</li>`).join('')}
                            </ol>
                            <img src="${data.sprites.other.dream_world.front_default}" alt="${data.name}">
                        </div>
                        
                        <h3>Características</h3>
                        <ul class="pokemon-stats">
                            <li>Altura: ${data.height}</li>
                            <li>Peso: ${data.weight}</li>
                        </ul>

                        <h3>Habilidades</h3>
                        <ul class="pokemon-stats">
                            <li>HP: ${data.stats[0].base_stat}</li>
                            <li>Ataque: ${data.stats[1].base_stat}</li>
                            <li>Defesa: ${data.stats[2].base_stat}</li>
                            <li>Ataque Especial: ${data.stats[3].base_stat}</li>
                            <li>Defesa Especial: ${data.stats[4].base_stat}</li>
                            <li>Velocidade: ${data.stats[5].base_stat}</li>
                        </ul>
                    </li>
                </ol>
            `;
            document.getElementById("pokemonInfo").innerHTML = pokemonInfo;
        })
        .catch(error => {
            document.getElementById("pokemonInfo").innerHTML = "Pokémon não encontrado.";
        });
}