const formLogin = document.getElementById("formlogin");
const inputEmail = document.getElementById("email");
const inputSenha = document.getElementById("senha");
const saida = document.getElementById("saida");

formLogin.addEventListener("submit", (event)=>{
    event.preventDefault();
    const email = inputEmail.value.trim().toLowerCase();
    const senha = inputSenha.value.trim();

    if(!validarEmail(email)){
        saida.textContent = "Erro: informe um e-mail válido.";
        return;
    }

    if(!validarSenha(senha)){
        saida.textContent = "Erro: a senha deve possuir pelo menos 6 caracteres.";
        return;
    }

    const usuarioEncontrado = usuariosMock.find((usuario)=>{
        return usuario.email.toLowerCase() === email && usuario.senha === senha;
    });

    if(!usuarioEncontrado){
        saida.textContent = "Erro: e-mail ou senha inválido.";
        return;
    }

    sessionStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));

    saida.textContent = `
        Login realizado com sucesso!
        Email: ${usuarioEncontrado.email}
        Tipo: ${usuarioEncontrado.tipo}
        Redirecionamento...
    `;

   /* if(usuarioEncontrado.tipo === "admin"){
        console.log("Redirecionar para tela de cadastro de equipamentos.");
    }else{
        console.log("Redirecionar para tela de seleção de herói.")
    }*/
   setTimeout(()=>{
        if(usuarioEncontrado.tipo === "admin"){
            window.location.href = "./equipamentos.html";
        }else{
            window.location.href = "./herois.html";
        }
    }, 1000);    
   
});

function validarEmail(email){
    return email.includes("@") && email.includes(".");
}

function validarSenha(senha){
    return senha.length >= 6;
}