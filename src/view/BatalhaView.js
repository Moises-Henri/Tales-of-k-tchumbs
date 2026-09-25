class BatalhaView {
    static exibirPersonagem(elemento, heroi, titulo) {
        const mana =
            heroi.mana !== undefined
                ? `<p><strong>Mana:</strong> ${heroi.mana}</p>`
                : "";

       
        const step = heroi.vidaMaxima / 5;
        let imagemVida = '';

        if (heroi.vida === 0) {
            imagemVida = 'url(./assets/images/vidaCom0.png)'; 
        } else if (heroi.vida <= step * 1) {
            imagemVida = 'url(./assets/images/vidaComBarra-4.png)';
        } else if (heroi.vida <= step * 2) {
            imagemVida = 'url(./assets/images/vidaComBarra-3.png)';
        } else if (heroi.vida <= step * 3) {
            imagemVida = 'url(./assets/images/vidaComBarra-2.png)';
        } else if (heroi.vida <= step * 4) {
            imagemVida = 'url(./assets/images/vidaComBarra-1.png)';
        } else if (heroi.vida <= step * 5) {
            imagemVida = 'url(./assets/images/vidaCheia.png)';
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
        <span class="valor-vida">
            <div id="barraVida" style="background-image: ${imagemVida};"></div>
            <br>
            <p style="text-align: center;"><strong>Vida Atual: ${heroi.vida} </strong></p>
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
