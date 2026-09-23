const saidaHeroi = document.getElementById("saidaHeroi");
const saidaEquipamentos = document.getElementById("saidaEquipamentos");
const formEquipamentos = document.getElementById("formEquipamentos");
const selectArma = document.getElementById("arma");
const selectArmadura = document.getElementById("armadura");
const selectPocao = document.getElementById("pocao");
const btnBatalha = document.getElementById("btnBatalha");

const heroiSalvo = localStorage.getItem("heroiSelecionado");

if (!heroiSalvo) {
    EquipamentoView.exibirMensagem(
        saidaHeroi,
        "Nenhum herói foi selecionado. Volte e escolha um herói."
    );
    formEquipamentos.style.display = "none";
} else {
    const heroiSelecionado = JSON.parse(heroiSalvo);
    EquipamentoView.exibirHeroi(saidaHeroi, heroiSelecionado);

    const equipamentosCompativeis = equipamentosMock.filter(
        (equipamento) => equipamento.habilidade === heroiSelecionado.habilidade
    );

    const armas = equipamentosCompativeis.filter(
        (equipamento) => equipamento instanceof Arma
    );
    const armaduras = equipamentosCompativeis.filter(
        (equipamento) => equipamento instanceof Armadura
    );
    const pocoes = equipamentosCompativeis.filter(
        (equipamento) => equipamento instanceof Pocao
    );

    EquipamentoView.preencherSelect(selectArma, armas);
    EquipamentoView.preencherSelect(selectArmadura, armaduras);
    EquipamentoView.preencherSelect(selectPocao, pocoes);
}

formEquipamentos.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!selectArma.value || !selectArmadura.value || !selectPocao.value) {
        EquipamentoView.exibirMensagem(
            saidaEquipamentos,
            "Selecione uma arma, uma armadura e uma poção."
        );
        return;
    }

    const equipamentosSelecionados = {
        arma: equipamentosMock[Number(selectArma.value)],
        armadura: equipamentosMock[Number(selectArmadura.value)],
        pocao: equipamentosMock[Number(selectPocao.value)]
    };

    localStorage.setItem(
        "equipamentosSelecionados",
        JSON.stringify({
            armaIndex: Number(selectArma.value),
            armaduraIndex: Number(selectArmadura.value),
            pocaoIndex: Number(selectPocao.value)
        })
    );

    EquipamentoView.exibirEquipamentosSelecionados(
        saidaEquipamentos,
        equipamentosSelecionados
    );

    btnBatalha.disabled = false;
});

btnBatalha.addEventListener("click", () => {
    if (!localStorage.getItem("equipamentosSelecionados")) {
        EquipamentoView.exibirMensagem(
            saidaEquipamentos,
            "Salve os equipamentos antes de continuar."
        );
        return;
    }

    window.location.href = "./batalha.html";
});
