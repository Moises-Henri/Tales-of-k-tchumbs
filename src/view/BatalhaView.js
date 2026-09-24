class BatalhaView {
    static exibirPersonagem(elemento, heroi, titulo) {
        const mana =
            heroi.mana !== undefined
                ? `<p><strong>Mana:</strong> ${heroi.mana}</p>`
                : "";

        elemento.innerHTML = `
            <h2>${titulo}</h2>
            <h3>${heroi.nome}</h3>

            <p><strong>Raça:</strong> ${heroi.raca}</p>
            <p><strong>Stamina:</strong> ${heroi.stamina}</p>
            ${mana}
            <p><strong>Nível/XP:</strong> ${heroi.nivel}</p>
            <p><strong>Ataque:</strong> ${heroi.poderAtaque}</p>
            <p><strong>Defesa:</strong> ${heroi.poderDefesa}</p>
            <p><strong>Habilidade:</strong> ${heroi.habilidade}</p>
            <p>
            <strong>Vida:</strong>
            <span class="valor-vida">
                if((${heroi.vida}/${heroi.vidaMaxima}) == ${heroi.vidaMaxima}/5){
                    <div id="barraVida"></div>
                }
            </span>
        </p>
        `;
    }

    static atualizarPersonagens(jogador, adversario) {
        this.exibirPersonagem(
            document.getElementById("cardJogador"),
            jogador,
            "Seu Herói"
        );

        this.exibirPersonagem(
            document.getElementById("cardAdversario"),
            adversario,
            "Adversário"
        );
    }

    static atualizarRound(round) {
        document.getElementById("roundAtual").textContent = round;
    }

    static adicionarLog(elemento, mensagem) {
        elemento.textContent += `${mensagem}\n`;
        elemento.scrollTop = elemento.scrollHeight;
    }

    static exibirResultado(elemento, resultado) {
        elemento.textContent = resultado;
        elemento.classList.remove("oculto");
    }

    static bloquearAcoes() {
        document
            .querySelectorAll(".btn-acao")
            .forEach((botao) => {
                botao.disabled = true;
            });
    }
}
