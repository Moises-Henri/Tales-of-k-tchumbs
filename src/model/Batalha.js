class Batalha {
    constructor(heroiJogador, heroiAdversario) {
        this.heroiJogador = heroiJogador;
        this.heroiAdversario = heroiAdversario;
        this.round = 1;

        // Define aleatoriamente quem executará a primeira ação.
        this.primeiroMovimento =
            Math.random() < 0.5 ? "jogador" : "adversario";

        this.finalizada = false;
    }

    iniciar() {
        const primeiroNome =
            this.primeiroMovimento === "jogador"
                ? this.heroiJogador.nome
                : this.heroiAdversario.nome;

        return (
            `⚔️ Batalha iniciada entre ` +
            `${this.heroiJogador.nome} e ${this.heroiAdversario.nome}.\n` +
            `🎲 ${primeiroNome} ganhou o sorteio e fará o primeiro movimento.`
        );
    }

    calcularDano(acaoAtacante, acaoDefensor) {
        const ataque = acaoAtacante.dano || 0;
        const defesa = acaoDefensor.defesa || 0;

        return Math.max(0, ataque - defesa);
    }

    normalizarAcao(heroi, acao) {
        if (!acao || acao.erro) {
            const mensagemErro =
                acao?.mensagem ||
                `${heroi.nome} não conseguiu executar a ação escolhida.`;

            const ataqueComum = heroi.usarAtaqueComum();

            return {
                acao: ataqueComum,
                aviso:
                    `⚠️ ${mensagemErro}\n` +
                    `Ação substituída por Ataque Comum.`
            };
        }

        return {
            acao,
            aviso: null
        };
    }

    processarAcao(atacante, defensor, acaoAtacante, acaoDefensor) {
        let log = "";

        // Ações de cura não causam dano.
        if (acaoAtacante.cura) {
            atacante.recuperarVida(acaoAtacante.cura);

            log += `${acaoAtacante.mensagem}\n`;
            log += `❤️ ${atacante.nome} recuperou ${acaoAtacante.cura} de vida.\n`;

            return log;
        }

        // Defesa comum ou especial não causa dano diretamente.
        if ((acaoAtacante.dano || 0) === 0) {
            log += `${acaoAtacante.mensagem}\n`;
            return log;
        }

        const dano = this.calcularDano(
            acaoAtacante,
            acaoDefensor
        );

        defensor.receberDano(dano);

        log += `${acaoAtacante.mensagem}\n`;
        log += `💥 Dano aplicado em ${defensor.nome}: ${dano}.\n`;

        return log;
    }

    executarRound(acaoJogador, acaoAdversario) {
        if (this.finalizada) {
            return "A batalha já foi finalizada.";
        }

        let log = `\n=== ROUND ${this.round} ===\n`;

        const jogadorNormalizado = this.normalizarAcao(
            this.heroiJogador,
            acaoJogador
        );

        const adversarioNormalizado = this.normalizarAcao(
            this.heroiAdversario,
            acaoAdversario
        );

        acaoJogador = jogadorNormalizado.acao;
        acaoAdversario = adversarioNormalizado.acao;

        if (jogadorNormalizado.aviso) {
            log += `${jogadorNormalizado.aviso}\n`;
        }

        if (adversarioNormalizado.aviso) {
            log += `${adversarioNormalizado.aviso}\n`;
        }

        const ordem =
            this.primeiroMovimento === "jogador"
                ? [
                    {
                        atacante: this.heroiJogador,
                        defensor: this.heroiAdversario,
                        acaoAtacante: acaoJogador,
                        acaoDefensor: acaoAdversario
                    },
                    {
                        atacante: this.heroiAdversario,
                        defensor: this.heroiJogador,
                        acaoAtacante: acaoAdversario,
                        acaoDefensor: acaoJogador
                    }
                ]
                : [
                    {
                        atacante: this.heroiAdversario,
                        defensor: this.heroiJogador,
                        acaoAtacante: acaoAdversario,
                        acaoDefensor: acaoJogador
                    },
                    {
                        atacante: this.heroiJogador,
                        defensor: this.heroiAdversario,
                        acaoAtacante: acaoJogador,
                        acaoDefensor: acaoAdversario
                    }
                ];

        for (const movimento of ordem) {
            if (!movimento.atacante.estaVivo()) {
                continue;
            }

            if (!movimento.defensor.estaVivo()) {
                break;
            }

            log += this.processarAcao(
                movimento.atacante,
                movimento.defensor,
                movimento.acaoAtacante,
                movimento.acaoDefensor
            );

            if (!movimento.defensor.estaVivo()) {
                log += `💀 ${movimento.defensor.nome} foi derrotado!\n`;
                break;
            }
        }

        log += this.gerarStatus();

        const vencedor = this.verificarVencedor();

        if (vencedor) {
            this.finalizada = true;
            log += `\n🏆 Resultado: ${vencedor}`;
        }

        // No próximo round, o outro personagem executa primeiro.
        this.primeiroMovimento =
            this.primeiroMovimento === "jogador"
                ? "adversario"
                : "jogador";

        this.round++;

        return log;
    }

    gerarStatus() {
        let log =
            `\n❤️ ${this.heroiJogador.nome}: ` +
            `${this.heroiJogador.vida}/${this.heroiJogador.vidaMaxima} vida | ` +
            `${this.heroiJogador.stamina} stamina`;

        if (this.heroiJogador.mana !== undefined) {
            log += ` | ${this.heroiJogador.mana} mana`;
        }

        log += ` | ${this.heroiJogador.nivel} XP`;

        log +=
            `\n❤️ ${this.heroiAdversario.nome}: ` +
            `${this.heroiAdversario.vida}/${this.heroiAdversario.vidaMaxima} vida | ` +
            `${this.heroiAdversario.stamina} stamina`;

        if (this.heroiAdversario.mana !== undefined) {
            log += ` | ${this.heroiAdversario.mana} mana`;
        }

        log += ` | ${this.heroiAdversario.nivel} XP\n`;

        return log;
    }

    verificarVencedor() {
        if (
            this.heroiJogador.vida <= 0 &&
            this.heroiAdversario.vida <= 0
        ) {
            return "Empate";
        }

        if (this.heroiJogador.vida <= 0) {
            return `${this.heroiAdversario.nome} venceu`;
        }

        if (this.heroiAdversario.vida <= 0) {
            return `${this.heroiJogador.nome} venceu`;
        }

        return null;
    }
}
