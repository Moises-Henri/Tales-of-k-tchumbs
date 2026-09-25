class Mago extends Heroi{

    constructor(){
        super("Mago", "Humano", 50, 60, 15, 3, 6);
        this.habilidade = "Sabedoria";
        this.mana = 100;
    }

    gastarMana(valor){
        this.mana -= valor;
        if(this.mana < 0){
            this.mana = 0;
        }
    }

    usarAtaqueComum(){
        
        return{
            tipo:"ataque",
            nome:"Ataque Comum/Base",
            dano: this.poderAtaque,
            defesa: 0,
            custoStamina: 2,
            custoMana: 5,
            experiencia: 15,
            mensagem: `${this.nome} usou Ataque Comum/Base.`
        };
    }

    usarDefesa(){
        return{
            tipo:"defesa",
            nome:"Defesa",
            dano: 0,
            defesa: this.poderDefesa,
            custoStamina: 2,
            custoMana: 5,
            experiencia: 15,
            mensagem: `${this.nome} se defendeu.`
        };
    }

    lancarFeiticoDano(roundAtual){
        //return `${this.nome} lançou feitiço de Dano e causou +3 de dano.`;
        if(this.stamina < 12){
            return{
                erro: true,
                mensagem: `${this.nome} não possui stamina suficiente para lançar feitiço.`
            };
        }

        if(this.mana < 20){
            return{
                erro: true,
                mensagem: `${this.nome} não possui mana suficiente para lançar feitiço de dano.`
            };
        }

        if(this.nivel < 15){
            return{
                erro: true,
                mensagem: `${this.nome} não possui experiência suficiente para lançar feitiço.`
            };
        }

        if(!this.podeUsarEspecial(roundAtual)){
            return{
                erro: true,
                mensagem: `${this.nome} precisa esperar 1 round para usar outra habilidade especial.`
            };
        }

        this.registrarUsoEspecial(roundAtual);

        return{
            tipo: "ataqueEspecial",
            nome: "Feitiço de Dano",
            dano: this.poderAtaque + 3,
            defesa: 0,
            custoStamina: 8,
            custoMana: 20,
            experiencia: 15,
            mensagem: `${this.nome} usou Feitiço de Dano e adicionou +3 de dano.`
        };

    }

    lancarFeiticoCura(roundAtual){
        //return `${this.nome} lançou feitiço de Dano Cura e recuperou +5 de vida.`;
        if(this.stamina < 12){
            return{
                erro: true,
                mensagem: `${this.nome} não possui stamina suficiente para lançar feitiço.`
            };
        }

        if(this.mana < 20){
            return{
                erro: true,
                mensagem: `${this.nome} não possui mana suficiente para lançar feitiço.`
            };
        }

        if(this.nivel < 30){
            return{
                erro: true,
                mensagem: `${this.nome} não possui experiência suficiente para lançar feitiço de Cura.`
            };
        }

        if(!this.podeUsarEspecial(roundAtual)){
            return{
                erro: true,
                mensagem: `${this.nome} precisa esperar 1 round para usar outra habilidade especial.`
            };
        }

        this.registrarUsoEspecial(roundAtual);

        return{
            tipo: "curaEspecial",
            nome: "Feitiço de Cura",
            dano: 0,
            defesa: 0,
            cura: 5,
            custoStamina: 8,
            custoMana: 20,
            experiencia: 15,
            mensagem: `${this.nome} usou Feitiço de Cura e recuperou +5 de vida.`
        };
    }

    lancarFeiticoDefesa(roundAtual){
        //return `${this.nome} lançou feitiço de Defesa e ganhou +4 de defesa.`;
        if(this.stamina < 12){
            return{
                erro: true,
                mensagem: `${this.nome} não possui stamina suficiente para lançar feitiço.`
            };
        }

        if(this.mana < 20){
            return{
                erro: true,
                mensagem: `${this.nome} não possui mana suficiente para lançar feitiço.`
            };
        }

        if(this.nivel < 15){
            return{
                erro: true,
                mensagem: `${this.nome} não possui experiência suficiente para lançar feitiço de defesa.`
            };
        }

        if(!this.podeUsarEspecial(roundAtual)){
            return{
                erro: true,
                mensagem: `${this.nome} precisa esperar 1 round para usar outra habilidade especial.`
            };
        }

        this.registrarUsoEspecial(roundAtual);

        return{
            tipo: "defesaEspecial",
            nome: "Feitiço de Defesa",
            dano: 0,
            defesa: this.poderDefesa + 4,
            custoStamina: 8,
            custoMana: 20,
            experiencia: 15,
            mensagem: `${this.nome} usou Feitiço de Defesa e adicionou +4 de defesa.`
        };
    }

    exibirStatus(){
        return`
            ${super.exibirStatus()} Mana: ${this.mana}
        `;
    }
}