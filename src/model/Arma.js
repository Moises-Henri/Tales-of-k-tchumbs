class Arma extends Equipamento{
    constructor(
        nome,
        descricao,
        pontoAtaque,
        pontoDefesa,
        habilidade,
        tipoArma,
        efeito
    ){
        super(nome, descricao, pontoAtaque, pontoDefesa, habilidade);
        this.tipoArma = tipoArma;
        this.efeito = efeito;
    }

    obterBonus(){
        return{
            ataque: this.pontoAtaque,
            defesa: this.pontoDefesa,
            vida: 0
        };
    }

    exibirDetalhes(){
        return `
            ${super.exibirDetalhes()}
            Tipo de Arma: ${this.tipoArma}
            Efeito: ${this.efeito}
        `;
    }
}