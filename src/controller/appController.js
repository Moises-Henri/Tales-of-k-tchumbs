/*const botaoTeste = document.getElementById("btnTestar");
botaoTeste.addEventListener("click", () => {
    alert("Javascript conectado com sucesso ao projeto Jogo RPG!");
});

const btnCriarHeroi = document.getElementById("btnCriarHeroi");
const saida = document.getElementById("saida");

btnCriarHeroi.addEventListener("click", () => {
    const heroiTeste = new Heroi(
        "Heroi Base",
        "Humano",
        100,
        50,
        1,
        10,
        5
    );
    console.log(heroiTeste);
    console.log(heroiTeste.atacar());
    console.log(heroiTeste.defender());
    saida.textContent = 
        heroiTeste.exibirStatus()+
        "\n\n"+
        heroiTeste.atacar()+
        "\n"+
        heroiTeste.defender();
});*/

/*const btnCriarHeroi = document.getElementById("btnCriarHeroi");
const saida = document.getElementById("saida");

btnCriarHeroi.addEventListener("click", () => {
    const guerreiro = new Guerreiro();
    const arqueiro = new Arqueiro();
    const mago = new Mago();

    const arma = new Arma(
        "Espada de Ferro",
        "Uma espada resistente para combate corpo a corpo",
        5,
        0,
        "Força",
        "Espada",
        "Corta"
    );

    const armadura = new Armadura(
        "Armadura de Aço",
        "Armadura pesada com alta proteção",
        0,
        6,
        "Força",
        80,
        "Peitoral"
    );

    const pocao = new Pocao(
        "Poção de Cura",
        "Recupera pontos de vida durante a batalha.",
        0,
        0,
        "Sabedoria",
        "Cura",
        "Recupera Vida"
    );

    const feitico = new Feitico(
        "Bola de Fogo",
        "Dano",
        3,
        20,
        8
    );

    const efeito = new Efeito(
        "Queimadura",
        "Aplica dano contínuo no inimigo",
        "Reduz a vida ao longo dos rounds"
    );

    console.log("Guerreiro: ", guerreiro);
    console.log("Arqueiro: ", arqueiro);
    console.log("Mago: ", mago);
    console.log("Arma: ", arma);
    console.log("Armadura: ", armadura);
    console.log("Poção: ", pocao);
    console.log("Feitiço: ", feitico);
    console.log("Efeito: ", efeito);

    saida.textContent =
        "=== HERÓIS ===\n"+
        guerreiro.exibirStatus()+
        "\nHabilidade: "+
        guerreiro.habilidade +   
        "\n\n"+
        "=== ARQUEIRO ===\n"+
        arqueiro.exibirStatus()+
        "\nHabilidade: "+
        arqueiro.habilidade +
        "\n\n"+
        "=== MAGO ===\n"+
        mago.exibirStatus()+
        "\nHabilidade: "+
        mago.habilidade +
        "\nMana: "+
        mago.mana +
        "\n\n"+
        "=== ARMA ===\n"+
        arma.exibirDetalhes()+
        "\n\n"+
        "=== ARMADURA ===\n"+
        armadura.exibirDetalhes()+
        "\n\n"+
        "=== POÇÃO ===\n"+
        pocao.exibirDetalhes()+
        "\n\n"+
        "=== FEITIÇO ===\n"+
        feitico.exibirDetalhes()+
        "\n\n"+
        "=== EFEITO ===\n"+
        efeito.exibirDetalhes();

});*/

/*const btnCriarHeroi = document.getElementById("btnCriarHeroi");
const saida = document.getElementById("saida");

btnCriarHeroi.addEventListener("click",() =>{
    const guerreiro = new Guerreiro();
    const arqueiro = new Arqueiro();

    const batalha = new Batalha(guerreiro, arqueiro);

    let resultado = batalha.iniciar() + "\n";
    //Executa rounds até alguém morrer

    while(!batalha.verificarVencedor()){
        resultado += batalha.executarRound();
    }

    const vencedor = batalha.verificarVencedor();

    resultado +=  `\n🏆 VENCEDOR: ${vencedor}`;

    console.log(resultado);
    saida.textContent = resultado;
});*/
/*const btnCriarHeroi = document.getElementById("btnCriarHeroi");
const saida = document.getElementById("saida");

btnCriarHeroi.addEventListener("click",() =>{
    const guerreiro = new Guerreiro();
    const mago = new Mago();

    const batalha = new Batalha(guerreiro, mago);

    let resultado = batalha.iniciar();

    resultado += batalha.executarRound(
        guerreiro.usarAtaqueComum(),
        mago.usarDefesa()
    );

    resultado += batalha.executarRound(
        guerreiro.velocidadeCombate(batalha.round),
        mago.lancarFeiticoDano(batalha.round)
    );

    resultado += batalha.executarRound(
        guerreiro.combateCurtaDistancia(batalha.round),
        mago.lancarFeiticoCura(batalha.round)
    );

    const vencedor = batalha.verificarVencedor();

    if(vencedor){
        resultado += `\n\n🏆 VENCEDOR: ${vencedor}`;
    }else{
        resultado += `\n\n⚔️ A batalha ainda não terminou.`;
    }

    console.log(resultado);
    saida.textContent = resultado;
});*/

const btnCriarHeroi = document.getElementById("btnCriarHeroi");
const saida = document.getElementById("saida");

btnCriarHeroi.addEventListener("click",() =>{
    let resultado = "=== USUÁRIOS MOCKADOS ===\n";
    usuariosMock.forEach((usuario) => {
        resultado += `Email: ${usuario.email} | Tipo: ${usuario.tipo}\n`;
    });

    resultado+= "\n===  HERÓIS DISPONÍVEIS ===\n";
    heroisMock.forEach((heroi) => {
        resultado += `${heroi.nome} | Vida: ${heroi.vida} | Stamina: ${heroi.stamina} | Habilidade: ${heroi.habilidade}\n`;
    });

    resultado+= "\n===  EQUIPAMENTOS DISPONÍVEIS ===\n";
    equipamentosMock.forEach((equipamento) => {
        resultado += `${equipamento.nome} | Habilidade: ${equipamento.habilidade} | Ataque: ${equipamento.pontoAtaque} | Defesa: ${equipamento.pontoDefesa}\n`;
    });

    resultado+= "\n===  FEITIÇOS DISPONÍVEIS ===\n";
    feiticosMock.forEach((feitico) => {
        resultado += `${feitico.nome} | Tipo: ${feitico.tipo} | Valor: ${feitico.valor} | Mana: ${feitico.custoMana}\n`;
    });

    console.log("Usuários:", usuariosMock);
    console.log("Heróis:", heroisMock);
    console.log("Equipamentos:", equipamentosMock);
    console.log("Feitiços:", feiticosMock);
    
    saida.textContent = resultado;
});