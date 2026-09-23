class EquipamentoView {
    static preencherSelect(select, equipamentos) {
        select.innerHTML = "";

        const opcaoPadrao = document.createElement("option");
        opcaoPadrao.value = "";
        opcaoPadrao.textContent = "Selecione uma opção";
        select.appendChild(opcaoPadrao);

        equipamentos.forEach((equipamento) => {
            const option = document.createElement("option");
            option.value = equipamentosMock.indexOf(equipamento);
            option.textContent = `${equipamento.nome} | Ataque: ${equipamento.pontoAtaque} | Defesa: ${equipamento.pontoDefesa}`;
            select.appendChild(option);
        });
    }

    static exibirHeroi(elemento, heroi) {
        elemento.textContent = `Nome: ${heroi.nome}\n` +
            `Raça: ${heroi.raca}\n` +
            `Vida: ${heroi.vida}\n` +
            `Stamina: ${heroi.stamina}\n` +
            `Nível/XP: ${heroi.nivel}\n` +
            `Ataque: ${heroi.poderAtaque}\n` +
            `Defesa: ${heroi.poderDefesa}\n` +
            `Habilidade: ${heroi.habilidade}\n` +
            `Mana: ${heroi.mana ?? "Não possui"}`;
    }

    static exibirEquipamentosSelecionados(elemento, equipamentos) {
        const { arma, armadura, pocao } = equipamentos;

        elemento.textContent =
            "=== EQUIPAMENTOS SELECIONADOS ===\n\n" +
            `Arma:\n${arma ? arma.exibirDetalhes() : "Nenhuma arma selecionada"}\n\n` +
            `Armadura:\n${armadura ? armadura.exibirDetalhes() : "Nenhuma armadura selecionada"}\n\n` +
            `Poção:\n${pocao ? pocao.exibirDetalhes() : "Nenhuma poção selecionada"}`;
    }

    static exibirComparacaoAtributos(
        elemento,
        atributosBasicos,
        heroiPreparado
    ){
        elemento.textContent =
            "=== COMPARAÇÃO DOS ATRIBUTOS ===\n\n"+
            `Vida:\n`+
            `${atributosBasicos.vida}➡️`+
            `${heroiPreparado.vida}\n\n`+

            `Ataque:\n`+
            `${atributosBasicos.poderAtaque}➡️`+
            `${heroiPreparado.poderAtaque}\n\n`+

            `Defesa:\n`+
            `${atributosBasicos.poderDefesa}➡️`+
            `${heroiPreparado.poderDefesa}\n\n`+

            `Equipamentos aplicados:\n`+
            `${heroiPreparado.equipamentos.length}`;            

    }

    static exibirMensagem(elemento, mensagem) {
        elemento.textContent = mensagem;
    }
}
