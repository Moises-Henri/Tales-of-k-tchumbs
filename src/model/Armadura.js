class Armadura extends Equipamento {
    constructor(
        nome,
        descricao,
        pontoAtaque,
        pontoDefesa,
        habilidade,
        durabilidade,
        tipoArmadura
    ) {
        super(nome, descricao, pontoAtaque, pontoDefesa, habilidade);
        this.durabilidade = durabilidade;
        this.tipoArmadura = tipoArmadura;
    }

    obterBonus(){
        return{
            ataque: this.pontoAtaque,
            defesa: this.pontoDefesa,
            vida: 0
        };
    }

    exibirDetalhes() {
        return `${super.exibirDetalhes()}\n` +
            `Durabilidade: ${this.durabilidade}\n` +
            `Tipo de Armadura: ${this.tipoArmadura}`;
    }
}
