class HeroiView{
    static renderizarCards(herois, elementoDestino){
        elementoDestino.innerHTML = "";
        herois.forEach((heroi, index)=>{
            const {
                nome,raca, vida, stamina, nivel, poderAtaque, poderDefesa, habilidade
            } = heroi;

            const card = document.createElement("article");
            card.classList.add("card-heroi");

            card.innerHTML = `
                <h2>${heroi.nome}</h2>
                <p><strong>Raça:</strong>${heroi.raca}</p>
                <p><strong>Vida:</strong>${heroi.vida}</p>
                <p><strong>Stamina:</strong>${heroi.stamina}</p>
                <p><strong>Nivel/XP:</strong>${heroi.nivel}</p>
                <p><strong>Ataque:</strong>${heroi.poderAtaque}</p>
                <p><strong>Defesa:</strong>${heroi.poderDefesa}</p>
                <p><strong>Habilidade:</strong>${heroi.habilidade}</p>
                <button class="btnEscolherHeroi" data-index="${index}">
                    Escolher ${heroi.nome}
                </button>    
            `;
            elementoDestino.appendChild(card);
           
        });
    }

    static exibirMensagem(elemento, mensagem){
        elemento.textContent = mensagem;
    }
}