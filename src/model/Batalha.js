class Batalha {
    constructor(heroiJogador, heroiAdversario) {
        this.heroiJogador = heroiJogador;
        this.heroiAdversario = heroiAdversario;
        this.round = 1;

        // Define aleatoriamente quem executará a primeira ação.
        this.primeiroMovimento = Math.random() < 0.5 ? "jogador" : "adversario";
        this.finalizada = false;
        this.estatisticas = {
            jogador: this.criarEstatisticas(),
            adversario: this.criarEstatisticas()
        };
    }

    criarEstatisticas() {
        return {
            ataques: 0, 
            defesas: 0, 
            especiais: 0, 
            pocoes: 0, 
            danoCausado: 0, 
            danoRecebido: 0 
        };
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
            return {
                acao: this.criarAcaoPassarTurno(heroi),
                aviso: `⚠️ ${acao?.mensagem || "Ação inválida."}`
            };
        }
        return { acao, aviso: null};
    }

    podeExecutarAcao(heroi, acao) {
        const stamina = acao.custoStamina || 0;
        const mana = acao.custoMana || 0;
        if(heroi.stamina < stamina) return false;
        if (mana > 0 && (heroi.name === undefined || heroi.mana < mana)) return false;
        return true;
    }

    aplicarCustos(heroi, acao){
        heroi.gastarStamina(acao.custoStamina || 0);
        if((acao.custoMana || 0) > 0 && typeof heroi.gastarMana === "function") {
            heroi.gastarMana(acao.custoMana);
        }
        heroi.ganharExperiencia(acao.experiencia || 0);
        if (acao.especial) heroi.registrarUsoEspecial(this.round);
    }

    calcularDano(acaoAtacante, acaoDefensor){
        return Math.max(0, (acaoAtacante.dano || 0) - (acaoDefensor.defesa || 0));
    }

    obterChaveEstatistica(heroi){
        return heroi === this.heroiJogador ? "jogador" : "adversario";
    }

    registrarAcao(heroi, acao) {
        const stats = this.estatisticas[this.obterChaveEstatistica(heroi)];
        if (acao.tipo === "ataque") stats.ataques++;
        if (acao.tipo === "defesa") stats.defesas++;
        if (acao.especial) stats.especiais++;
        if (acao.tipo === "pocao") stats.pocoes++;
    }

    processarAcao(atacante, defensor, acaoAtacante, acaoDefensor) {
       if (!this.podeExecutarAcao(atacante, acaoAtacante)){
        return `⚠️ ${atacante.nome} não possui recursos suficientes. A ação foi cancelada.\n`;
       }

       this.aplicarCustos(atacante, acaoAtacante);
       this.registrarAcao(atacante, acaoAtacante);

       if (acaoAtacante.tipo === "passar") return `${acaoAtacante.mensagem}\n`;

       if (acaoAtacante.cura) {
            atacante.recuperarVida(acaoAtacante.cura);
            return `${acaoAtacante.mensagem}\n❤️ ${atacante.nome} recuperou ${acaoAtacante.cura} de vida \n`;
        }

        if ((acaoAtacante.dano || 0) === 0) return `${acaoAtacante.mensagem}\n`;

        const dano = this.calcularDano(
            acaoAtacante,
            acaoDefensor
        );
        defensor.receberDano(dano);

        const statsAtacante = this.estatisticas[this.obterChaveEstatistica(atacante)];
        const statsDefensor = this.estatisticas[this.obterChaveEstatistica(defensor)];

        return `${acaoAtacante.mensagem}\n💥 Dabo aplicado em ${defensor.nome}: ${dano}.\n`;
    }

    executarRound(acaoJogador, acaoAdversario) {
        if (this.finalizada) {
            return "A batalha já foi finalizada.";
        }

        let log = `\n=== ROUND ${this.round} ===\n`;

        const j = this.normalizarAcao(
            this.heroiJogador,
            acaoJogador
        );

        const a = this.normalizarAcao(
            this.heroiAdversario,
            acaoAdversario
        );

        acaoJogador = j.acao;
        acaoAdversario = a.acao;

        if (j.aviso) log += `${j.aviso}\n`;
        if (a.aviso) log += `${a.aviso}\n`; 

        const ordem =
            this.primeiroMovimento === "jogador"
                ? [
                    { atacante: this.heroiJogador, defensor: this.heroiAdversario, acao:
                    acaoJogador, defesa: acaoAdversario},
                    { atacante: this.heroiAdversario, defensor: this.heroiJogador, acao:
                    acaoAdversario, defesa: acaoJogador}
                ]
                :   [
                    { atacante: this.heroiAdversario, defensor: this.heroiJogador, acao:
                    acaoAdversario, defesa: acaoJogador},
                    { atacante: this.heroiJogador, defensor: this.heroiAdversario, acao:
                    acaoJogador, defesa: acaoAdversario}
                ];
                
        for (const movimento of ordem) {
            if (!movimento.atacante.estaVivo()) continue; 
            if (!movimento.defensor.estaVivo()) break;
            log += this.processarAcao(
                movimento.atacante,
                movimento.defensor,
                movimento.acao,
                movimento.defesa
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
            this.motivoFinalizacao = "vida";
            log += `\n🏆 Resultado: ${vencedor}`;
        } else {
            this.primeiroMovimento = this.primeiroMovimento === "jogador" ? "adversario" : "jogador";
            this.round++
        }
        return log;
    }

    usarPocao(heroi, pocao) {
        if (this.finalizada) return { erro: true, mensagem: "A batalha ja terminou." };
        const resultado = pocao.usar(heroi);
        if(!resultado.erro){
            this.estatisticas[this.obterChaveEstatistica(heroi)].pocoes++;
        }
        return resultado;
    }

    finalizarPorTempo() {
        if (this.finalizada) return this.verificarVencedor();
        this.finalizada = true;
        this.motivoFinalizacao = "tempo";
        if (this.heroiJogador.vida > this.heroiAdversario.vida) return `${this.heroiJogador.nome} venceu`;
        if (this.heroiAdversario.vida > this.heroiJogador.vida) return `${this.heroiAdversario.nome} venceu`;
        return "Empate";
    }

    gerarStatus() {
      const status = (h) => `${h.nome}: ${h.vida}/${h.vidaMaxima} vida | ${h.stamina}
      stamina${h.mana !== undefined ? ` | ${h.mana} mana` : ""} | ${h.nivel} XP`;
      return `\n❤️ ${status(this.heroiJogador)}\n❤️ ${status(this.heroiAdversario)}\n`;
    }

    verificarVencedor() {
      if (this.heroiJogador.vida <= 0 && this.heroiAdversario.vida <= 0) return "Empate";
      if (this.heroiJogador.vida <= 0) return `${this.heroiAdversario.nome} venceu`;
      if (this.heroiAdversario.vida <= 0) return `${this.heroiJogador.nome} venceu`;
      return null;
    }
}
