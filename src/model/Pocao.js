class Pocao extends Equipamento{
    constructor(
        nome,
        descricao,
        pontoAtaque,
        pontoDefesa,
        habilidade,
        tipoPocao,
        efeito
    ){
        super(nome, descricao, pontoAtaque, pontoDefesa, habilidade);
        this.tipoPocao = tipoPocao;
        this.efeito = efeito;
    }

    obterBonus(){
        return{
            ataque: 0,
            defesa: 0,
            vida: 0
        };
    }

    usar(heroi){
        return `${heroi.nome} utilizou ${this.nome}: ${this.efeito}.`;
    }

    exibirDetalhes(){
        return `
            ${super.exibirDetalhes()}
            Tipo de Poção: ${this.tipoPocao}
            Efeito: ${this.efeito}
        `;
    }
}