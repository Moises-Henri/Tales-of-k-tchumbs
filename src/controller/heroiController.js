const listaHerois = document.getElementById("listaHerois");
const saida = document.getElementById("saida");
const btnAvancar = document.getElementById("btnAvancar");

HeroiView.renderizarCards(heroisMock, listaHerois);

document.querySelectorAll(".btnEscolherHeroi").forEach((botao) => {
    botao.addEventListener("click", () => {
        const index = Number(botao.dataset.index);
        const heroiSelecionado = heroisMock[index];

        localStorage.setItem(
            "heroiSelecionado",
            JSON.stringify({
                index,
                nome: heroiSelecionado.nome,
                raca: heroiSelecionado.raca,
                vida: heroiSelecionado.vida,
                stamina: heroiSelecionado.stamina,
                nivel: heroiSelecionado.nivel,
                poderAtaque: heroiSelecionado.poderAtaque,
                poderDefesa: heroiSelecionado.poderDefesa,
                habilidade: heroiSelecionado.habilidade,
                mana: heroiSelecionado.mana ?? null
            })
        );

        localStorage.removeItem("equipamentosSelecionados");

        HeroiView.exibirMensagem(
            saida,
            `Você escolheu: ${heroiSelecionado.nome}\n` +
            `Habilidade: ${heroiSelecionado.habilidade}\n` +
            "O herói foi salvo no localStorage."
        );

        btnAvancar.disabled = false;
    });
});

btnAvancar.addEventListener("click", () => {
    if (!localStorage.getItem("heroiSelecionado")) {
        HeroiView.exibirMensagem(saida, "Selecione um herói antes de avançar.");
        return;
    }

    window.location.href = "./selecao-equipamento.html";
});
