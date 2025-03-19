const pokemonList = document.querySelector("#pokemonList");
const btnHeader = document.querySelectorAll(".btn-header");
let url = "https://pokeapi.co/api/v2/pokemon/";

for(let i = 1; i <= 999; i++){
    fetch(url + i)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => showPokemon(data))
        .catch(error => console.warn(`Error at index ${i}:`, error.message));
}

function showPokemon(poke){
    let types = poke.types.map((cur) => `<p class="${cur.type.name} type">${cur.type.name}</p>`);
    types = types.join("");

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
    <p class="pokemon-id-back">#${String(poke.id).padStart(3,0)}</p>

    <div class="pokemon-img">
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
    </div>

    <div class="pokemon-info">
        <div class="name-container">
            <p class="pokemon-id">#${String(poke.id).padStart(3,0)}</p>
            <h2 class="pokemon-name">${poke.name}</h2>
        </div>

        <div class="pokemon-types">
            ${types}
        </div>

        <div class="pokemon-stats">
            <p class="stat">${poke.height / 10}m</p>
            <p class="stat">${poke.weight / 10}kg</p>
        </div>

    </div>
    `; 

    pokemonList.append(div);
};


btnHeader.forEach(btn => btn.addEventListener("click",event => {
    const btnId = event.currentTarget.id; /* ở đây là id của button */
    /* event.currentTarget:
-Chỉ đến phần tử mà sự kiện đang được gắn vào, tức là phần tử đang lắng nghe sự kiện.
-Luôn luôn là phần tử có trình nghe sự kiện (event listener), 
ngay cả khi bạn nhấn vào phần tử con. */



    pokemonList.innerHTML = '';
        
    for(let i = 1; i <= 999; i++){
        fetch(url + i)
            .then(response => response.json())
            .then(data => {

                if (btnId === "All"){
                    showPokemon(data);
                }

                else{
                    const types = data.types.map(type => type.type.name);
                    if (types.some(type => type.includes(btnId))){
                    /* 
                    .some() là phương thức của mảng, trả về true nếu ít nhất một 
                        phần tử trong mảng thỏa mãn điều kiện do bạn cung cấp.
                    Hàm callback sẽ chạy cho từng phần tử của mảng cho đến khi tìm được 
                        một phần tử trả về true, sau đó dừng lại ngay. 
                        Nếu không tìm thấy, trả về false. 
                    */
                        showPokemon(data);
                    }
                }

            });
    }

}));
