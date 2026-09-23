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

const btnAtaque = document.getElementById("btnAtaque");
const btnEspecial = document.getElementById("btnEspecial");
const btnDefesa = document.getElementById("btnDefesa");

const logBatalha = document.getElementById("logBatalha");
const resultadoBatalha = document.getElementById("resultadoBatalha");


// ======================================================
// 2. RECUPERAÇÃO DO LOCAL STORAGE
// ======================================================

const heroiSalvo = localStorage.getItem("heroiSelecionado");
const equipamentosSalvos = localStorage.getItem(
    "equipamentosSelecionados"
);

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

    // --------------------------------------------------
    // 3.1 RECONSTRÓI O HERÓI
    // --------------------------------------------------

    const heroiJogador = heroisMock.find(
        (heroi) => heroi.nome === dadosHeroi.nome
    );

    if (!heroiJogador) {
        alert("Não foi possível reconstruir o herói.");
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

    const adversariosPossiveis = heroisMock.filter(
        (heroi) => heroi.nome !== heroiJogador.nome
    );

    const indiceSorteado = Math.floor(
        Math.random() * adversariosPossiveis.length
    );

    const heroiAdversario =
        adversariosPossiveis[indiceSorteado];

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

    BatalhaView.adicionarLog(
        logBatalha,
        batalha.iniciar()
    );

    // --------------------------------------------------
    // 3.5 EVENTOS DOS BOTÕES
    // --------------------------------------------------

    btnAtaque.addEventListener("click", () => {
        executarJogada(
            batalha,
            heroiJogador.usarAtaqueComum()
        );
    });

    btnDefesa.addEventListener("click", () => {
        executarJogada(
            batalha,
            heroiJogador.usarDefesa()
        );
    });

    btnEspecial.addEventListener("click", () => {
        const acaoEspecial = criarAcaoEspecial(
            heroiJogador,
            batalha.round
        );

        executarJogada(
            batalha,
            acaoEspecial
        );
    });
}


// ======================================================
// 4. EXECUÇÃO DE UMA JOGADA
// ======================================================

function executarJogada(batalha, acaoJogador) {
    if (batalha.finalizada) {
        return;
    }

    /*
     * O adversário escolhe automaticamente
     * uma ação a cada round.
     */
    const acaoAdversario = sortearAcaoAdversario(
        batalha.heroiAdversario,
        batalha.round
    );

    const logRound = batalha.executarRound(
        acaoJogador,
        acaoAdversario
    );

    BatalhaView.adicionarLog(
        logBatalha,
        logRound
    );

    BatalhaView.atualizarPersonagens(
        batalha.heroiJogador,
        batalha.heroiAdversario
    );

    BatalhaView.atualizarRound(
        batalha.round
    );

    const vencedor = batalha.verificarVencedor();

    if (vencedor) {
        finalizarBatalha(
            batalha,
            vencedor
        );
    }
}


// ======================================================
// 5. HABILIDADE ESPECIAL DO JOGADOR
// ======================================================

function criarAcaoEspecial(heroi, roundAtual) {
    /*
     * Nesta etapa utilizaremos uma habilidade
     * especial principal para cada classe.
     *
     * Outras habilidades serão incorporadas
     * posteriormente à interface.
     */

    if (heroi instanceof Guerreiro) {
        return heroi.combateCurtaDistancia(
            roundAtual
        );
    }

    if (heroi instanceof Arqueiro) {
        return heroi.combateLongaDistancia(
            roundAtual
        );
    }

    if (heroi instanceof Mago) {
        return heroi.lancarFeiticoDano(
            roundAtual
        );
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

function sortearAcaoAdversario(
    adversario,
    roundAtual
) {
    const numeroSorteado = Math.floor(
        Math.random() * 3
    );

    switch (numeroSorteado) {
        case 0:
            return adversario.usarAtaqueComum();

        case 1:
            return adversario.usarDefesa();

        case 2:
            return criarAcaoEspecial(
                adversario,
                roundAtual
            );

        default:
            return adversario.usarAtaqueComum();
    }
}


// ======================================================
// 7. FINALIZAÇÃO
// ======================================================

function finalizarBatalha(
    batalha,
    vencedor
) {
    BatalhaView.bloquearAcoes();

    const jogadorVenceu =
        batalha.heroiJogador.estaVivo() &&
        !batalha.heroiAdversario.estaVivo();

    let mensagem;

    if (vencedor === "Empate") {
        mensagem = "🤝 A batalha terminou empatada.";
    } else if (jogadorVenceu) {
        mensagem =
            `🏆 Vitória! ${batalha.heroiJogador.nome} venceu a batalha.`;
    } else {
        mensagem =
            `💀 Derrota! ${batalha.heroiAdversario.nome} venceu a batalha.`;
    }

    BatalhaView.exibirResultado(
        resultadoBatalha,
        mensagem
    );

    /*
     * Guarda um resumo simples para futuras etapas.
     */
    localStorage.setItem(
        "resultadoBatalha",
        JSON.stringify({
            vencedor,
            heroiJogador:
                batalha.heroiJogador.nome,
            heroiAdversario:
                batalha.heroiAdversario.nome,
            roundFinal:
                batalha.round - 1
        })
    );
}
