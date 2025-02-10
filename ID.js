document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const salario = document.getElementById('salario').value;
    const senha = document.getElementById('senha').value;

    // Gerar meme com base no salário
    const memeContainer = document.getElementById('memeContainer');
    memeContainer.innerHTML = `<img src="https://example.com/falcao-nick-meme?salario=${salario}" alt="Falcão Nick Meme">`;

    // Verificar login
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(u => u.senha === senha);

    if (usuario) {
        alert(`Bem-vindo, ${usuario.nome}!`);
        // Salvar dados em cookies
        document.cookie = `usuarioID=${usuario.id}; path=/`;
        document.cookie = `usuarioNome=${usuario.nome}; path=/`;
        // Redirecionar ou carregar dados da conta
    } else {
        alert('Senha incorreta ou usuário não encontrado.');
    }
});

document.getElementById('registrar').addEventListener('click', function() {
    const salario = document.getElementById('salario').value;
    const senha = document.getElementById('senha').value;
    const nome = "José"; // Nome fixo para o exemplo

    // Criar ID único
    const id = Math.random().toString(36).substr(2, 9);

    // Salvar usuário
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push({ id, nome, senha });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Usuário registrado com sucesso!');
});
