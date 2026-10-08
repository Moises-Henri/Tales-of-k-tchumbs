/*
 * ETAPA 14 — BATALHA INTERATIVA
 *
 * Controller responsável por:
 * 1. Recuperar as escolhas da Etapa 13;
 * 2. Reconstruir o herói e aplicar os equipamentos;
 * 3. Sortear um adversário;
 * 4. Criar a instância da classe Batalha;
 * 5. Capturar as ações do jogador;
 * 6. Gerar automaticamente a ação do adversário;
 * 7. Atualizar a View após cada round.
 */

// ======================================================
// 1. ELEMENTOS DA TELA
// ======================================================

const TEMPO_POR_TURNO = 10;
const TEMPO_TOTAL_BATALHA = 120;

const btnAtaque = document.getElementById("btnAtaque");
const btnEspecial = document.getElementById("btnEspecial");
const btnDefesa = document.getElementById("btnDefesa");
const btnPocao = document.getElementById("btnPocao");
const selectEspecial = document.getElementById("selectEspecial");

const logBatalha = document.getElementById("logBatalha");
const resultadoBatalha = document.getElementById("resultadoBatalha");
const linkResultado = document.getElementById("linkResultado");


// ======================================================
// 2. RECUPERAÇÃO DO LOCAL STORAGE
// ======================================================

const heroiSalvo = localStorage.getItem("heroiSelecionado");
const equipamentosSalvos = localStorage.getItem("equipamentosSelecionados");

let intervaloTurno = null;
let intervaloTotal = null;
let tempoTurno = TEMPO_POR_TURNO;
let tempoTotal = TEMPO_TOTAL_BATALHA;
let jogadaEmProcessamento = false;

if (!heroiSalvo || !equipamentosSalvos) {
    alert("Selecione um herói e seus equipamentos antes da batalha.");
    window.location.href = "./herois.html";
} else {
    iniciarBatalha();
}


// ======================================================
// 3. FUNÇÃO PRINCIPAL
// ======================================================

function iniciarBatalha() {
    const dadosHeroi = JSON.parse(heroiSalvo);
    const dadosEquipamentos = JSON.parse(equipamentosSalvos);
    const heroiJogador = heroisMock.find((heroi) => heroi.nome === dadosHeroi.nome);

    if (!heroiJogador) {
        alert("Não foi possível reconstruir o herói");
        window.location.href = "./herois.html";
        return;
    }

    // --------------------------------------------------
    // 3.2 RECONSTRÓI OS EQUIPAMENTOS
    // --------------------------------------------------

    const arma =
        equipamentosMock[dadosEquipamentos.armaIndex];

    const armadura =
        equipamentosMock[dadosEquipamentos.armaduraIndex];

    const pocao =
        equipamentosMock[dadosEquipamentos.pocaoIndex];

    if (
        !(arma instanceof Arma) ||
        !(armadura instanceof Armadura) ||
        !(pocao instanceof Pocao)
    ) {
        alert("Os equipamentos selecionados são inválidos.");
        window.location.href = "./selecao-equipamento.html";
        return;
    }

    // Aplica os bônus da Etapa 13.
    heroiJogador.equipar(arma);
    heroiJogador.equipar(armadura);
    heroiJogador.equipar(pocao);

    // --------------------------------------------------
    // 3.3 SORTEIA O ADVERSÁRIO
    // --------------------------------------------------

    const adversarios = heroisMock.filter(
        (heroi) => heroi.nome !== heroiJogador.nome
    );

    const heroiAdversario = adversarios[Math.floor(Math.random() * adversarios.length)];

    // --------------------------------------------------
    // 3.4 CRIA A BATALHA
    // --------------------------------------------------

    const batalha = new Batalha(
        heroiJogador,
        heroiAdversario
    );

    BatalhaView.atualizarPersonagens(
        heroiJogador,
        heroiAdversario
    );

    BatalhaView.atualizarRound(batalha.round);
    BatalhaView.exibirPocao(pocao.nome);
    BatalhaView.preencherEspeciais(selectEspecial, listarEspeciais(heroiJogador));
    BatalhaView.adicionarLog(logBatalha, batalha.iniciar());

    configurarEventos(batalha, pocao);
    iniciarTemporizadorTotal(batalha);
    reiniciarTemporizadorTurno(batalha);
}

function configurarEventos(batalha, pocao) {
    btnAtaque.addEventListener("click", () => executarJogada(batalha, batalha.heroiJogador.usarAtaqueComum()));
    btnDefesa.addEventListener("click", () => executarJogada(batalha, batalha.heroiJogador.usarDefesa()));
    btnEspecial.addEventListener("click", () => executarJogada(batalha, criarAcaoEspecial(batalha.heroiJogador,
    batalha.round, selectEspecial.value)));

    btnPocao.addEventListener("click", () => {
        if (batalha.finalizada || jogadaEmProcessamento) return;
        const resultado = batalha.usarPocao(batalha.heroiJogador, pocao);
        BatalhaView.adicionarLog(logBatalha, resultado.mensagem);
        BatalhaView.atualizarPersonagens(batalha.heroiJogador, batalha.heroiAdversario);
        if (!resultado.erro) BatalhaView.marcarPocaoUsada();
    });
}
// ======================================================
// 4. EXECUÇÃO DE UMA JOGADA
// ======================================================

function executarJogada(batalha, acaoJogador) {
    if (batalha.finalizada || jogadaEmProcessamento) return; 

    const acaoAdversario = sortearAcaoAdversario(batalha.heroiAdversario, batalha.round);

    const logRound = batalha.executarRound(acaoJogador,acaoAdversario);

    BatalhaView.adicionarLog(logBatalha,logRound);
    atualizarTelaAposRound(batalha);

    const vencedor = batalha.verificarVencedor();
    if (vencedor || batalha.finalizada){
        finalizarBatalha(batalha,vencedor || batalha.finalizarPorTempo());
        return;
    }

    jogadaEmProcessamento = false;
    BatalhaView.desbloquearAcoes(document.getElementById("btnPocao").textContent.includes("utilizada"));
    reiniciarTemporizadorTurno(batalha);
}

function atualizarTelaAposRound(batalha){
    BatalhaView.atualizarPersonagens(batalha.heroiJogador, batalha.heroiAdversario);
    BatalhaView.atualizarRound(batalha.round);
}

function listarEspeciais(heroi) {
    if (heroi instanceof Guerreiro) return [
        { valor: "curta", nome: "Combate Curta Distância"},
        { valor: "velocidade", nome: "Velocidade de combate"}
    ];
    if (heroi instanceof Arqueiro) return [
        { valor: "longa", nome: "Combate Longa Distância"},
        { valor: "velocidade", nome: "Velocidade de combate"}
    ];
    if (heroi instanceof Mago) return [
        { valor: "dano", nome: "Feitiço de Dano"},
        { valor: "cura", nome: "Feitiço de Cura"},
        { valor: "defesa", nome: "Feitiço de Defesa"}
    ];
    return [];
}

// ======================================================
// 5. HABILIDADE ESPECIAL DO JOGADOR
// ======================================================

function criarAcaoEspecial(heroi, roundAtual, escolha) {
    /*
     * Nesta etapa utilizaremos uma habilidade
     * especial principal para cada classe.
     *
     * Outras habilidades serão incorporadas
     * posteriormente à interface.
     */

    if (heroi instanceof Guerreiro) {
        return escolha === "velocidade" ? heroi.velocidadeCombate(roundAtual) : heroi.combateCurtaDistancia(roundAtual);
    }

    if (heroi instanceof Arqueiro) {
        return escolha === "velocidade" ? heroi.velocidadeCombate(roundAtual) : heroi.combateLongaDistancia(roundAtual);    
    }

    if (heroi instanceof Mago) {
        if (escolha === "cura") return heroi.lancarFeiticoCura(roundAtual);
        if (escolha === "defesa") return heroi.lancarFeiticoDefesa(roundAtual);
        return heroi.lancarFeiticoDano(roundAtual);
    }

    return {
        erro: true,
        mensagem:
            "O herói não possui habilidade especial."
    };
}


// ======================================================
// 6. AÇÃO AUTOMÁTICA DO ADVERSÁRIO
// ======================================================

function sortearAcaoAdversario( adversario,roundAtual) {
    const numero = Math.floor(Math.random() * 3 );
    if (numero === 0) return adversario.usarAtaqueComum();
    if (numero === 1) return adversario.usarDefesa();

    const especiais = listarEspeciais(adversario);
    const especial = especiais[Math.floor(Math.random() * especiais.length)];
    return criarAcaoEspecial(adversario, roundAtual, especial?.valor);
}

function reiniciarTemporizadorTurno(batalha) {
    clearInterval(intervaloTurno);
    tempoTurno = TEMPO_POR_TURNO;
    BatalhaView.atualizarTempoTurno(tempoTurno);
    
    intervaloTurno = setInterval(() => {
        tempoTurno--;
        BatalhaView.atualizarTempoTurno(tempoTurno);
        if(tempoTurno <= 0){
            clearInterval(intervaloTurno);
            BatalhaView.adicionarLog(logBatalha, " Tempo do jogador esgotado.");
            executarJogada(batalha, batalha.criarAcaoPassarTurno(batalha.heroiJogador));
        }
    }, 1000);
}

function iniciarTemporizadorTotal(batalha){
    BatalhaView.atualizarTempoTotal(tempoTotal);    
    intervaloTotal = setInterval(() => {
        tempoTotal--;
        BatalhaView.atualizarTempoTotal(tempoTotal);
        if (tempoTotal <= 0 ){
            clearInterval(intervaloTotal);
            clearInterval(intervaloTurno);
            const vencedor = batalha.finalizarPorTempo();
            BatalhaView.adicionarLog(logBatalha, "⏱️ o tempo total da batalha terminou. Vence quem possui mais vida restante");
            finalizarBatalha(batalha, vencedor);
        }
    }, 1000);
}


// ======================================================
// 7. FINALIZAÇÃO
// ======================================================

function finalizarBatalha(batalha,vencedor) {
    clearInterval(intervaloTurno);
    clearInterval(intervaloTotal);
    BatalhaView.bloquearAcoes();

    const jogadorVenceu = vencedor !== "Empate" && vencedor.startsWith(batalha.heroiJogador.nome);
    let mensagem = "🤝 A batalha terminou empatada.";

    if (jogadorVenceu) {
        mensagem =
            `🏆 Vitória! ${batalha.heroiJogador.nome} venceu a batalha.`;
    } else if (vencedor !== "Empate") {
        mensagem =
            `💀 Derrota! ${batalha.heroiAdversario.nome} venceu a batalha.`;
    }

    BatalhaView.exibirResultado(
        resultadoBatalha,
        mensagem
    );
    linkResultado.classList.remove("oculto");

    /*
     * Guarda um resumo simples para futuras etapas.
     */
    localStorage.setItem(
        "resultadoBatalha",
        JSON.stringify({
            vencedor,
            mensagem,
            motivo: batalha.motivoFinalizacao,
            heroiJogador: batalha.heroiJogador.nome,
            heroiAdversario: batalha.heroiAdversario.nome,
            vidaJogador: batalha.heroiJogador.vida,
            vidaAdversario: batalha.heroiAdversario.vida,
            roundFinal: batalha.round,
            tempoRestante: tempoTotal,
            estatisticas: batalha.estatisticas
        }));
}
