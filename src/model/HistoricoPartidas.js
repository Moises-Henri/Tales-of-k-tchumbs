class HistoricoPartidas {
    static validarPartida(p) {
        return p && typeof p === "object" &&
            typeof p.heroiJogador === "string" && p.heroiJogador.trim() !== "" &&
            typeof p.heroiAdversario === "string" &&
            typeof p.vencedor === "string" &&
            Number.isFinite(p.vidaJogador) && Number.isFinite(p.vidaAdversario) &&
            Number.isFinite(p.roundFinal) && p.roundFinal >= 1 &&
            p.estatisticas && typeof p.estatisticas === "object";
    }

    static normalizar(partida, id, dataISO) {
        if (!this.validarPartida(partida)) throw new Error("Partida inválida.");
        return {
            id,
            dataISO,
            heroiJogador: partida.heroiJogador,
            heroiAdversario: partida.heroiAdversario,
            vencedor: partida.vencedor,
            motivo: partida.motivo || "vida",
            vidaJogador: partida.vidaJogador,
            vidaAdversario: partida.vidaAdversario,
            roundFinal: partida.roundFinal,
            tempoRestante: Number(partida.tempoRestante) || 0,
        }
    }
}