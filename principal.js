document.addEventListener('DOMContentLoaded', function () {
    const formLogin = document.querySelector('.form-login');

    formLogin.addEventListener('submit', function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Obtenha os valores dos campos de entrada
        const email = formLogin.querySelector('input[type="text"]').value;
        const senha = formLogin.querySelector('input[type="password"]').value;

        // Obtenha os dados salvos no localStorage
        const savedEmail = localStorage.getItem('login');
        const savedSenha = localStorage.getItem('senha');

        // Verifique se os campos não estão vazios
        if (email.trim() === '' || senha.trim() === '') {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Verifique se os dados inseridos correspondem aos salvos
        if (email === savedEmail && senha === savedSenha) {
            // Redirecione para a página inicial (index.html) se o login for bem-sucedido
            window.location.href = 'index.html';
        } else {
            // Exiba uma mensagem de erro caso o login falhe
            alert('Login ou senha incorretos. Por favor, tente novamente.');
        }
    });

    const entreAquiButton = document.querySelector('.button-login');

    entreAquiButton.addEventListener('click', function (event) {
        // Impede o redirecionamento padrão ao clicar no botão
        event.preventDefault();

        // Dispara o evento de submit no formulário de login
        formLogin.dispatchEvent(new Event('submit'));
    });

    // Mensagem de manutenção para os botões Google e Facebook
    const googleButton = document.querySelector('.google-button');
    const facebookButton = document.querySelector('.facebook-button');

    googleButton.addEventListener('click', function (event) {
        event.preventDefault();
        alert('Entrar pela Google está em manutenção. Desculpe pelo transtorno. Obrigado pela compreensão.');
    });

    facebookButton.addEventListener('click', function (event) {
        event.preventDefault();
        alert('Entrar pelo Facebook está em manutenção. Desculpe pelo transtorno. Obrigado pela compreensão.');
    });
});
