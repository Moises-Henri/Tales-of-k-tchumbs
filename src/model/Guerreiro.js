class Guerreiro extends Heroi{

    constructor(){
        super("Guerreiro", "Humano",80,100, 10, 8, 6);
        this.habilidade = "Força";
    }

    usarAtaqueComum(){
        this.gastarStamina(5);
        this.ganharExperiencia(5);
        return{
            tipo:"ataque",
            nome:"Ataque Comum/Base",
            dano: this.poderAtaque,
            defesa: 0,
            mensagem: `${this.nome} usou Ataque Comum/Base.`
        };
    }

    usarDefesa(){
        this.gastarStamina(5);
        this.ganharExperiencia(5);
        return{
            tipo:"defesa",
            nome:"Defesa",
            dano: 0,
            defesa: this.poderDefesa,
            mensagem: `${this.nome} se defendeu.`
        };
    }

    combateCurtaDistancia(roundAtual){
        //return `${this.nome} usou combate Curta Distância e causou +3 de dano.`;
        if(this.stamina < 50){
            return{
                erro: true,
                mensagem: `${this.nome} não possui stamina suficiente para o Combate Curta Distância.`
            };
        }

        if(this.nivel < 20){
            return{
                erro: true,
                mensagem: `${this.nome} não possui experiência suficiente para o Combate Curta Distância.`
            };
        }

        if(!this.podeUsarEspecial(roundAtual)){
            return{
                erro: true,
                mensagem: `${this.nome} precisa esperar 1 round para usar outra habilidade especial.`
            };
        }

        this.gastarStamina(15);
        this.ganharExperiencia(5);
        this.registrarUsoEspecial(roundAtual);

        return{
            tipo: "ataqueEspecial",
            nome: "Combate Curta Distância",
            dano: this.poderAtaque + 3,
            defesa: 0,
            mensagem: `${this.nome} usou Combate Curta Distância e adicionou + 3 de dano.`
        };
    }

    velocidadeCombate(roundAtual){
        //return `${this.nome} usou velocidade de combate e causou +1 de dano.`;
        if(this.stamina < 50){
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
        this.ganharExperiencia(5);
        this.registrarUsoEspecial(roundAtual);

        return{
            tipo: "ataqueEspecial",
            nome: "Velocidade de Combate",
            dano: this.poderAtaque + 1,
            defesa: 0,
            mensagem: `${this.nome} usou Velocidade de Combate e adicionou + 1 de dano.`
        };
    }
}