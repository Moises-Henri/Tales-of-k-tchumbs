class Efeito{
    constructor(nome, descricao, impacto){
        this.nome = nome;
        this.descricao = descricao;
        this.impacto = impacto;
    }

    exibirDetalhes(){
        return `
            Nome: ${this.nome}
            Descrição: ${this.descricao}
            Impacto: ${this.impacto}
        `;
    }
}