document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');
    const togglePassword = document.querySelector('.toggle-password');
    const passwordInput = document.getElementById('password');

    // Alternar visibilidade da senha
    togglePassword.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.querySelector('i').classList.toggle('fa-eye');
        this.querySelector('i').classList.toggle('fa-eye-slash');
    });

    // Validação do formulário
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const remember = document.getElementById('remember').checked;

        // Validação simples
        if (!email || !password) {
            showStyledAlert('Por favor, preencha todos os campos.', 'error');
            return;
        }

        // Simulação de login bem-sucedido
        simulateLogin(email, password, remember);
    });

    // Simulação de login (substituir por chamada real à API)
    function simulateLogin(email, password, remember) {
        showStyledAlert('Login em processamento...', 'info');

        const userRoles = {
            'componentes@grupomulti.com.br': {
                setor: 'componentes',
                nome: 'Operador de Componentes',
                cargo: 'Operador',
                dashboard: '/Home/Dashboard/Componentes/index.html'
            },
            'expedicao@grupomulti.com.br': {
                setor: 'expedicao',
                nome: 'Supervisor de Expedição',
                cargo: 'Supervisor',
                dashboard: '/Home/Dashboard/Expedição/index.html'
            },
            'transporte@grupomulti.com.br': {
                setor: 'transporte',
                nome: 'Coordenador de Transporte',
                cargo: 'Coordenador',
                dashboard: '/Home/Dashboard/Transporte/index.html'
            },
            'devolucoes@grupomulti.com.br': {
                setor: 'devolucoes',
                nome: 'Analista de Devoluções',
                cargo: 'Analista',
                dashboard: '/Home/Dashboard/Devoluções/index.html'
            },
            'recebimento@grupomulti.com.br': {
                setor: 'recebimento',
                nome: 'Gerente de Recebimento',
                cargo: 'Gerente',
                dashboard: '/Home/Dashboard/Recebimento/index.html'
            }
        };

        const validPassword = '12345';

        setTimeout(() => {
            const emailLower = email.toLowerCase();
            if (userRoles[emailLower] && password === validPassword) {
                const userData = userRoles[emailLower];
                localStorage.setItem('userSetor', userData.setor);
                localStorage.setItem('userName', userData.nome);
                localStorage.setItem('userRole', userData.cargo);
                localStorage.setItem('userEmail', emailLower);
                localStorage.setItem('userDashboard', userData.dashboard);

                showStyledAlert('Login realizado com sucesso! Redirecionando...', 'success');

                setTimeout(() => {
                    window.location.href = userData.dashboard;
                }, 2000);
            } else {
                showStyledAlert('E-mail ou senha inválidos.', 'error');
            }
        }, 1500);
    }

    // Mostrar notificação estilizada
    function showStyledAlert(message, type) {
        // Remove notificações anteriores
        const existingAlerts = document.querySelectorAll('.custom-notification');
        existingAlerts.forEach(alert => {
            alert.style.opacity = '0';
            setTimeout(() => alert.remove(), 300);
        });

        // Cores e ícones para cada tipo
        const styles = {
            success: {
                bgColor: '#4CAF50',
                icon: '✓',
                borderColor: '#388E3C'
            },
            error: {
                bgColor: '#F44336',
                icon: '✗',
                borderColor: '#D32F2F'
            },
            info: {
                bgColor: '#2196F3',
                icon: 'ⓘ',
                borderColor: '#1976D2'
            },
            warning: {
                bgColor: '#FF9800',
                icon: '⚠',
                borderColor: '#F57C00'
            }
        };

        const notification = document.createElement('div');
        notification.className = 'custom-notification';

        // Aplicar estilos dinâmicos
        notification.style.backgroundColor = styles[type].bgColor;
        notification.style.borderLeft = `5px solid ${styles[type].borderColor}`;

        // Conteúdo da notificação
        notification.innerHTML = `
            <div class="notification-icon">${styles[type].icon}</div>
            <div class="notification-content">${message}</div>
            <div class="notification-close">&times;</div>
        `;

        document.body.appendChild(notification);

        // Mostrar com animação
        setTimeout(() => {
            notification.style.right = '20px';
            notification.style.opacity = '1';
        }, 10);

        // Fechar ao clicar no X
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.style.right = '-100%';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 300);
        });

        // Fechar automaticamente (exceto para mensagens de info)
        if (type !== 'info') {
            setTimeout(() => {
                notification.style.right = '-100%';
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 300);
            }, 5000);
        }
    }

    // Efeito hover nos botões sociais
    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        });

        button.addEventListener('mouseleave', function () {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });
});