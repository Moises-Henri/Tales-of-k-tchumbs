class Feitico{
    constructor(nome, tipo, valor, custoMana, custoStamina){
        this.nome = nome;
        this.tipo = tipo;
        this.valor = valor;
        this.custoMana = custoMana;
        this.custoStamina = custoStamina;
    }

    exibirDetalhes(){
        return `
            Nome: ${this.nome}
            Tipo: ${this.tipo}
            Valor: ${this.valor}
            Custo de Mana: ${this.custoMana}
            Custo de Stamina: ${this.custoStamina}
        `;
    }
}