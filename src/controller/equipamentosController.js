const corpoTabela = document.getElementById("corpoTabela");
const filtroHabilidade = document.getElementById("filtroHabilidade");

function identificarTipo(equipamento) {
    if (equipamento instanceof Arma) return "Arma";
    if (equipamento instanceof Armadura) return "Armadura";
    if (equipamento instanceof Pocao) return "Poção";
    return "Equipamento";
}

function renderizarTabela(lista) {
    corpoTabela.innerHTML = "";

    lista.forEach((equipamento) => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${equipamento.nome}</td>
            <td>${identificarTipo(equipamento)}</td>
            <td>${equipamento.habilidade}</td>
            <td>${equipamento.pontoAtaque}</td>
            <td>${equipamento.pontoDefesa}</td>
        `;
        corpoTabela.appendChild(linha);
    });
}

filtroHabilidade.addEventListener("change", () => {
    const habilidade = filtroHabilidade.value;
    const lista = habilidade === "Todas"
        ? equipamentosMock
        : equipamentosMock.filter((item) => item.habilidade === habilidade);

    renderizarTabela(lista);
});

renderizarTabela(equipamentosMock);
