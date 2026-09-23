class Heroi {
    constructor(nome, raca, vida, stamina, nivel, poderAtaque, poderDefesa) {
        this.nome = nome;
        this.raca = raca;

        // Vida base e vida máxima começam com o mesmo valor.
        this.vidaMaxima = vida;
        this.vida = vida;

        this.stamina = stamina;
        this.nivel = nivel;
        this.poderAtaque = poderAtaque;
        this.poderDefesa = poderDefesa;

        this.habilidade = "";
        this.ultimoRoundEspecial = 0;
        this.equipamentos = [];
    }

    atacar() {
        return this.poderAtaque;
    }

    defender() {
        return this.poderDefesa;
    }

    receberDano(dano) {
        this.vida -= dano;

        if (this.vida < 0) {
            this.vida = 0;
        }
    }

    recuperarVida(valor) {
        this.vida += valor;

        if (this.vida > this.vidaMaxima) {
            this.vida = this.vidaMaxima;
        }
    }

    gastarStamina(valor) {
        this.stamina -= valor;

        if (this.stamina < 0) {
            this.stamina = 0;
        }
    }

    ganharExperiencia(valor) {
        this.nivel += valor;
    }

    podeUsarEspecial(roundAtual) {
        return roundAtual - this.ultimoRoundEspecial >= 2;
    }

    registrarUsoEspecial(roundAtual) {
        this.ultimoRoundEspecial = roundAtual;
    }

    aplicarBonus({
        ataque = 0,
        defesa = 0,
        vida = 0
    } = {}) {
        this.poderAtaque += ataque;
        this.poderDefesa += defesa;
        this.vidaMaxima += vida;
        this.vida += vida;
    }

    equipar(equipamento) {
        if (!equipamento) {
            throw new Error("Equipamento inválido.");
        }

        if (typeof equipamento.obterBonus !== "function") {
            throw new Error(
                "O objeto informado não é um equipamento válido."
            );
        }

        if (!equipamento.podeSerUsadoPor(this)) {
            throw new Error(
                `${equipamento.nome} não pode ser usado por ${this.nome}.`
            );
        }

        const equipamentoJaAdicionado = this.equipamentos.some(
            (item) => item.nome === equipamento.nome
        );

        if (equipamentoJaAdicionado) {
            return false;
        }

        this.aplicarBonus(equipamento.obterBonus());
        this.equipamentos.push(equipamento);

        return true;
    }

    estaVivo() {
        return this.vida > 0;
    }

    exibirStatus() {
        return `
Nome: ${this.nome}
Raça: ${this.raca}
Vida: ${this.vida}/${this.vidaMaxima}
Stamina: ${this.stamina}
Nível/XP: ${this.nivel}
Ataque: ${this.poderAtaque}
Defesa: ${this.poderDefesa}
Habilidade: ${this.habilidade}
Equipamentos: ${this.equipamentos.length}
        `;
    }
}
