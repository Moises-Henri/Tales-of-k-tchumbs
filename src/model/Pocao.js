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
        this.consumida = false;
    }

    obterBonus(){
        return{
            ataque: 0,
            defesa: 0,
            vida: 0
        };
    }

    usar(heroi){
        if(this.consumida){
            return { erro: true, mensagem: `${this.nome} já foi utilizada`};
        }

        if(this.tipoPocao === "Cura") {
            const vidaAntes = heroi.vida;
            heroi.recuperar(10);
            const recuperado = heroi.vida - vidaAntes;
            this.consumida = true;
            return { tipo: "pocao", mensagem: `${heroi.nome} utilizou ${this.nome} e recuperou ${recuperado} de vida.`};
        }

        heroi.poderAtaque += this.poderAtaque;
        heroi.pontoDefesa += this.pontoDefesa;
        this.consumida = true;
        return {
            tipo: "pocao",
            mensagem: `${heroi.nome} utilizou ${this.nome}: +${this.pontoAtaque} ataque e + ${this.pontoDefesa} defesa.`
        };  
    }

    exibirDetalhes(){
        return `
            ${super.exibirDetalhes()}
            Tipo de Poção: ${this.tipoPocao}
            Efeito: ${this.efeito}
        `;
    }
}