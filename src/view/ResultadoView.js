class ResultadoView {
    static exibir(dados){
        const area = document.getElementById("resumoResultado");
        const s = dados.estatisticas;
        area.innerHTML = `
        <h2>${dados.mensagem}</h2>
        <p><strong>Herói: </strong> ${dados.heroiJogador} </p>
        <p><strong>Adversario: </strong> ${dados.heroiAdversario} </p>
        <p><strong>Motivo: </strong> ${dados.motivo === "tempo" ? "Tempo Esgotado" : "Vida Zerada"} </p>
        <p><strong>Round Final:</strong> ${dados.roundFinal}</p>
        <p><strong>Vida Final:</strong> ${dados.vidaJogador} x ${dados.vidaAdversario}</p>
        <h3>Estatísticas do Jogador</h3>
        <p>Ataques: ${s.jogador.ataques} | Defesas: ${s.jogador.defesas} | Especiais: ${s.jogador.especiais} </p>
        <p>Poções: ${s.jogador.pocoes} | Dano causado: ${s.jogador.danoCausado} | Dano Recebido: ${s.jogador.danoRecebido}</p>
        `;
    }
}