class Equipamento{
    constructor(nome, descricao, pontoAtaque, pontoDefesa, habilidade){
        this.nome = nome;
        this.descricao = descricao;
        this.pontoAtaque = pontoAtaque;
        this.pontoDefesa = pontoDefesa;
        this.habilidade = habilidade;
    }

    podeSerUsadoPor(heroi){
        return this.habilidade === heroi.habilidade;
    }

    obterBonus(){
        return{
            ataque: 0,
            defesa: 0,
            vida: 0
        };
    }

    exibirDetalhes(){
        return `
            Nome: ${this.nome}
            Descrição: ${this.descricao}
            Ataque: ${this.pontoAtaque}
            Defesa: ${this.pontoDefesa}
            Habilidade: ${this.habilidade}
        `;
    }
}