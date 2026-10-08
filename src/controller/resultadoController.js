const resultadoSalvo = localStorage.getItem("resultadoBatalha");

if (!resultadoSalvo) {
    alert("Nenhum resultado de batalha foi encontrado,");
    window.location.href = "./herois.html";
} else {
    ResultadoView.exibir(JSON.parse(resultadoSalvo));
}

document.getElementById("btnJogarNovamente").addEventListener("click", () => {
    localStorage.removeItem("resultadoBatalha");
    window.location.href = "./herois.html";
});