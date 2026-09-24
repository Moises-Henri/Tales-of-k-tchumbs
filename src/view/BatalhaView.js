class BatalhaView {
    static exibirPersonagem(elemento, heroi, titulo) {
        const mana =
            heroi.mana !== undefined
                ? `<p><strong>Mana:</strong> ${heroi.mana}</p>`
                : "";

        const damage = heroi.vidaMaxima - heroi.vida;
        const step = heroi.vidaMaxima / 5;
        let imagemVida = '';

        if (damage <= step * 1) {
            imagemVida = 'url(./assets/images/vidaCheia.png)';
        } else if (damage <= step * 2) {
            imagemVida = 'url(./assets/images/vidaComBarra-1.png)';
        } else if (damage <= step * 3) {
            imagemVida = 'url(./assets/images/vidaComBarra-2.png)';
        } else if (damage <= step * 4) {
            imagemVida = 'url(./assets/images/vidaComBarra-3.png)';
        } else if (heroi.vidaMaxima == heroi.vida) {
            imagemVida = 'url(./assets/images/vidaComBarra-4.png)';
        } else {
            imagemVida = 'url(./assets/images/vidaCOm0.png)'; 
        }       


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
            <div id="barraVida" style="background-image: ${imagemVida};"></div>
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
