document.addEventListener('DOMContentLoaded', function () {
    const formCadastro = document.querySelector('.form-cadastro');
    

    formCadastro.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Obtenha os valores dos campos de entrada
        const login = formCadastro.querySelector('input[type="text"]').value;
        const senha = formCadastro.querySelector('input[type="password"]').value;

        // Salve os dados no localStorage
        localStorage.setItem('login', login);
        localStorage.setItem('senha', senha);

        // Redirecione para a página de login
        window.location.href = 'principal.html';
    });


});
