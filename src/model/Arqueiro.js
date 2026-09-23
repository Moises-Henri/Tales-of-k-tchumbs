class Arqueiro extends Heroi{

    constructor(){
        super("Arqueiro", "Elfo", 60, 80, 10, 5, 5);
        this.habilidade = "Agilidade";
    }

      usarAtaqueComum(){
        this.gastarStamina(3);
        this.ganharExperiencia(8);
        return{
            tipo:"ataque",
            nome:"Ataque Comum/Base",
            dano: this.poderAtaque,
            defesa: 0,
            mensagem: `${this.nome} usou Ataque Comum/Base.`
        };
    }

     usarDefesa(){
        this.gastarStamina(3);
        this.ganharExperiencia(8);
        return{
            tipo:"defesa",
            nome:"Defesa",
            dano: 0,
            defesa: this.poderDefesa,
            mensagem: `${this.nome} se defendeu.`
        };
    }

    combateLongaDistancia(roundAtual){
       // return `${this.nome} usou combate Longa Distância e causou +2 de dano e +2 de defesa.`;
        if(this.stamina < 32){
            return{
                erro: true,
                mensagem: `${this.nome} não possui stamina suficiente para o Combate Longa Distância.`
            };
        }

        if(this.nivel < 20){
            return{
                erro: true,
                mensagem: `${this.nome} não possui experiência suficiente para o Combate Longa Distância.`
            };
        }

        if(!this.podeUsarEspecial(roundAtual)){
            return{
                erro: true,
                mensagem: `${this.nome} precisa esperar 1 round para usar outra habilidade especial.`
            };
        }

        this.gastarStamina(12);
        this.ganharExperiencia(8);
        this.registrarUsoEspecial(roundAtual);

        return{
            tipo: "ataqueEspecial",
            nome: "Combate Longa Distância",
            dano: this.poderAtaque + 2,
            defesa: this.poderDefesa + 2,
            mensagem: `${this.nome} usou Combate Longa Distância: +2 dano e +2 defesa.`
        };
    }

    velocidadeCombate(roundAtual){
        //return `${this.nome} usou velocidade de combate e causou +2 de dano.`;
        if(this.stamina < 32){
            return{
                erro: true,
                mensagem: `${this.nome} não possui stamina suficiente para Velocidade de Combate.`
            };
        }

        if(this.nivel < 10){
            return{
                erro: true,
                mensagem: `${this.nome} não possui experiência suficiente para Velocidade de Combate.`
            };
        }

        if(!this.podeUsarEspecial(roundAtual)){
            return{
                erro: true,
                mensagem: `${this.nome} precisa esperar 1 round para usar outra habilidade especial.`
            };
        }

        this.gastarStamina(8);
        this.ganharExperiencia(8);
        this.registrarUsoEspecial(roundAtual);

        return{
            tipo: "ataqueEspecial",
            nome: "Velocidade de Combate",
            dano: this.poderAtaque + 2,
            defesa: 0,
            mensagem: `${this.nome} usou Velocidade de Combate e adicionou + 2 de dano.`
        };
    }
}