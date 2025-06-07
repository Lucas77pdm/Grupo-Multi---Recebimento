function loadSidebar() {
  const userSetor = localStorage.getItem('userSetor');
  const userName = localStorage.getItem('userName') || 'Usuário';
  const userRole = localStorage.getItem('userRole') || 'Colaborador';
  const userEmail = localStorage.getItem('userEmail') || 'usuario@grupomulti.com.br';

  // Definindo os links de dashboard por setor
  const userDashboardLinks = {
    'componentes': '/Home/Dashboard/Componentes/index.html',
    'expedicao': '/Home/Dashboard/Expedição/index.html',
    'transporte': '/Home/Dashboard/Transporte/index.html',
    'devolucoes': '/Home/Dashboard/Devoluções/index.html',
    'recebimento': '/Home/Dashboard/Recebimento/index.html'
  };

  const dashboardLink = userDashboardLinks[userSetor] || '/Home/Dashboard/index.html';

  // Gera o avatar com as iniciais do usuário
  const avatarName = userName.split(' ').map(n => n[0]).join('');

  // Conteúdo padrão da sidebar
  let sidebarContent = `
    <div class="sidebar">
      <!-- Área superior com scroll -->
      <div class="sidebar-scrollable">
        <div class="sidebar-header">
          <div class="logo-container">
            <img src="https://media.licdn.com/dms/image/v2/C4D0BAQEYMg2iPxx0LA/company-logo_200_200/company-logo_200_200/0/1659028914663?e=2147483647&v=beta&t=JVDe7ZMKvOkT5cgAKQVkfdP2Dik53XUQNdqoDn1nxiY" alt="Logo" class="logo-img" style="height: 40px; width: 40px; border-radius: 8px; margin-right: 8px;">
            <h4>LOGÍSTICA INTELIGENTE</h4>
          </div>
          <div class="search-container">
            <i class="bi bi-search search-icon"></i>
            <input type="text" class="sidebar-search" placeholder="Buscar funcionalidade...">
          </div>
        </div>
        <nav class="sidebar-nav">
          <!-- Item ativo destacado - Dashboard personalizado -->
          <a href="${dashboardLink}" class="sidebar-link active">
            <div class="link-content">
              <i class="bi bi-speedometer2"></i>
              <span>Dashboard</span>
            </div>
            <div class="link-badge">Personalizado</div>
          </a>
  `;

  // Adiciona a seção de Importação apenas para o setor de Recebimento
  if (userSetor === 'recebimento') {
    sidebarContent += `
      <!-- Dropdown Importação com status -->
      <div class="sidebar-dropdown">
        <button class="sidebar-dropdown-btn" type="button" data-bs-toggle="collapse" data-bs-target="#importCollapse">
          <div class="link-content">
            <i class="bi bi-calendar-check"></i>
            <span>Importação</span>
          </div>
          <div class="dropdown-indicator">
            <span class="status-indicator active"></span>
            <i class="bi bi-chevron-down"></i>
          </div>
        </button>
        <div class="collapse" id="importCollapse">
          <div class="sidebar-dropdown-menu">
            <a href="#" class="sidebar-link" data-bs-toggle="modal" data-bs-target="#modalImport">
              <span>Agendar Importação</span>
              <i class="bi bi-plus-circle"></i>
            </a>
            <a href="/Home/Agendamento/Importação/index.html" class="sidebar-link">
              <span>Consulta Programação</span>
              <span class="menu-badge warning">5</span>
            </a>
          </div>
        </div>
      </div>
    `;
  }

  // Conteúdo específico por setor
  let setorSpecificContent = '';
  switch (userSetor) {
    case 'componentes':
      setorSpecificContent = `
        <a href="#" class="sidebar-link" data-bs-toggle="modal" data-bs-target="#modalInventario">
          <div class="link-content">
            <i class="bi bi-clipboard-data"></i>
            <span>Inventário</span>
          </div>
          <span class="menu-badge">Atualizar</span>
        </a>
      `;
      break;
    case 'expedicao':
      setorSpecificContent = `
        <a href="#" class="sidebar-link" data-bs-toggle="modal" data-bs-target="#modalEtiquetas">
          <div class="link-content">
            <i class="bi bi-tags"></i>
            <span>Etiquetagem</span>
          </div>
        </a>
      `;
      break;
    case 'transporte':
      setorSpecificContent = `
        <a href="#" class="sidebar-link" data-bs-toggle="modal" data-bs-target="#modalRotas">
          <div class="link-content">
            <i class="bi bi-geo-alt"></i>
            <span>Gestão de Rotas</span>
          </div>
        </a>
      `;
      break;
    case 'devolucoes':
      setorSpecificContent = `
        <a href="#" class="sidebar-link" data-bs-toggle="modal" data-bs-target="#modalAnalise">
          <div class="link-content">
            <i class="bi bi-graph-up"></i>
            <span>Análise de Devoluções</span>
          </div>
        </a>
      `;
      break;
  }

  // NOVO: Conteúdo extra por setor
  let setorExtraContent = '';
  switch (userSetor) {
    case 'componentes':
      setorExtraContent = `
        <a href="#" class="sidebar-link" data-bs-toggle="modal" data-bs-target="#modalHistoricoComponentes">
          <div class="link-content">
            <i class="bi bi-clock"></i>
            <span>Histórico de Componentes</span>
          </div>
        </a>
      `;
      break;
    case 'expedicao':
      setorExtraContent = `
        <a href="#" class="sidebar-link" data-bs-toggle="modal" data-bs-target="#modalRastreamento">
          <div class="link-content">
            <i class="bi bi-truck"></i>
            <span>Rastreamento de Entregas</span>
          </div>
        </a>
      `;
      break;
    case 'transporte':
      setorExtraContent = `
        <a href="#" class="sidebar-link" data-bs-toggle="modal" data-bs-target="#modalFrota">
          <div class="link-content">
            <i class="bi bi-truck-front"></i>
            <span>Gestão de Frota</span>
          </div>
        </a>
      `;
      break;
    case 'devolucoes':
      setorExtraContent = `
        <a href="#" class="sidebar-link" data-bs-toggle="modal" data-bs-target="#modalEstatisticasDevolucao">
          <div class="link-content">
            <i class="bi bi-bar-chart"></i>
            <span>Estatísticas de Devolução</span>
          </div>
        </a>
      `;
      break;
    case 'recebimento':
      setorExtraContent = `
      <div class="sidebar-dropdown">
        <button class="sidebar-dropdown-btn" type="button" data-bs-toggle="collapse" data-bs-target="#agendamentoNacionalCollapse" id="btnAgendamentoNacional">
          <div class="link-content">
            <i class="bi bi-globe-americas"></i>
            <span>Nacional</span>
          </div>
          <div class="dropdown-indicator">
            <span class="status-indicator active"></span>
            <i class="bi bi-chevron-down" id="iconeAgendamentoNacional"></i>
          </div>
        </button>
        <div class="collapse" id="agendamentoNacionalCollapse">
          <div class="sidebar-dropdown-menu">
            <a href="#" class="sidebar-link" data-bs-toggle="modal" data-bs-target="#modalAgendarNacional">
              <span>Agendar Nacional</span>
              <i class="bi bi-plus-circle"></i>
            </a>
            <a href="/Home/Agendamento/Nacional/index.html" class="sidebar-link">
              <span>Consulta Nacional</span>
              <i class="bi bi-search"></i>
            </a>            
          </div>
        </div>
      </div>
      <a href="#" class="sidebar-link" data-bs-toggle="modal" data-bs-target="#modalRecebimentoExtra">
        <div class="link-content">
          <i class="bi bi-archive"></i>
          <span>Recebimento Extra</span>
        </div>
      </a>
    `;
      break;
  }

  // Continuação do conteúdo da sidebar
  sidebarContent += `
    ${setorSpecificContent}
    ${setorExtraContent}
    <!-- Itens comuns a todos os setores -->
    <a href="#" class="sidebar-link" data-bs-toggle="modal" data-bs-target="#modalChecklist">
      <div class="link-content">
        <i class="bi bi-clipboard2-check"></i>
        <span>Checklist</span>
      </div>
      <span class="menu-badge danger">Urgente</span>
    </a>
    <a href="#" class="sidebar-link" data-bs-toggle="modal" data-bs-target="#modalRelatorios">
      <div class="link-content">
        <i class="bi bi-bar-chart-line"></i>
        <span>Relatórios</span>
      </div>
    </a>
    <div class="sidebar-divider"></div>
    <!-- Seção de Ferramentas -->
    <div class="sidebar-section-title">
      <span>Ferramentas</span>
    </div>
    <!-- Botão de Aplicativos (substitui o Histórico Rápido) -->
    <div class="sidebar-dropdown">
      <button class="sidebar-dropdown-btn" type="button" data-bs-toggle="collapse" data-bs-target="#appsCollapse">
        <div class="link-content">
          <i class="bi bi-grid"></i>
          <span>Aplicativos</span>
        </div>
        <div class="dropdown-indicator">
          <i class="bi bi-chevron-down"></i>
        </div>
      </button>
      <div class="collapse" id="appsCollapse">
        <div class="sidebar-dropdown-menu">
          <a href="mailto:" class="sidebar-link">
            <i class="bi bi-envelope"></i>
            <span>E-mail</span>
          </a>
          <a href="https://slack.com" target="_blank" class="sidebar-link">
            <i class="bi bi-slack"></i>
            <span>Slack</span>
          </a>
          <a href="https://sap.com" target="_blank" class="sidebar-link">
            <i class="bi bi-braces"></i>
            <span>SAP</span>
          </a>
          <a href="#" class="sidebar-link">
            <i class="bi bi-microsoft-teams"></i>
            <span>Teams</span>
          </a>
        </div>
      </div>
    </div>
    <a href="#" class="sidebar-link" data-bs-toggle="modal" data-bs-target="#modalSuporte">
      <div class="link-content">
        <i class="bi bi-headset"></i>
        <span>Suporte</span>
      </div>
      <span class="menu-badge">24/7</span>
    </a>
    </nav>
  </div>
  <!-- Área do Perfil Aprimorada -->
  <div class="sidebar-profile">
    <div class="profile-info">
      <div class="avatar-container">
        <img src="https://ui-avatars.com/api/?name=${avatarName}&background=random" alt="Avatar" class="profile-avatar">
        <span class="status-badge online"></span>
      </div>
      <div class="profile-text">
        <div class="name">${userName}</div>
        <div class="role">${userRole}</div>
        <div class="email">${userEmail}</div>
      </div>
      <button class="profile-settings-btn btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#profileSettingsModal">
        <i class="bi bi-gear"></i>
      </button>
    </div>
    <div class="sidebar-actions">
      <button id="toggleTheme" class="sidebar-btn btn-theme-toggle">
        <i class="bi bi-moon-stars"></i>
        <span>Modo Escuro</span>
      </button>
      <div class="quick-actions">
        <button class="action-btn" data-bs-toggle="modal" data-bs-target="#modalTrocarSenha" title="Trocar Senha">
          <i class="bi bi-key"></i>
        </button>
        <button class="action-btn" data-bs-toggle="modal" data-bs-target="#modalUsuariosLiberados" title="Usuários Liberados">
          <i class="bi bi-people"></i>
        </button>
        <button class="action-btn" title="Notificações" data-bs-toggle="offcanvas" data-bs-target="#alertasPanel">
          <i class="bi bi-bell"></i>
          <span class="notification-counter">3</span>
        </button>
      </div>
      <a href="/public/Login/Index.html" class="sidebar-btn btn-logout" onclick="logout()" style="text-decoration: none;">
        <i class="bi bi-box-arrow-right"></i>
        <span>Sair</span>
      </a>
    </div>
  </div>
</div>
`;

  document.getElementById("sidebar").innerHTML = sidebarContent;
  initializeSidebarFunctions();
}


function initializeSidebarFunctions() {
  // Sistema de busca na sidebar
  const searchInput = document.querySelector('.sidebar-search');
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      const searchTerm = this.value.toLowerCase();
      const links = document.querySelectorAll('.sidebar-link, .sidebar-dropdown-btn');
      links.forEach(link => {
        const text = link.textContent.toLowerCase();
        if (text.includes(searchTerm)) {
          link.style.display = 'flex';
          // Abre dropdowns pai se necessário
          let parentDropdown = link.closest('.sidebar-dropdown');
          if (parentDropdown) {
            const collapseBtn = parentDropdown.querySelector('[data-bs-toggle="collapse"]');
            if (collapseBtn) {
              const collapseId = collapseBtn.getAttribute('data-bs-target');
              const collapseElement = document.querySelector(collapseId);
              if (collapseElement) {
                new bootstrap.Collapse(collapseElement, { show: true });
              }
            }
          }
        } else {
          link.style.display = 'none';
        }
      });
    });
  }

  // Efeitos de hover e animações
  const sidebarLinks = document.querySelectorAll('.sidebar-link, .sidebar-dropdown-btn');
  sidebarLinks.forEach(link => {
    link.addEventListener('mouseenter', function () {
      this.style.transform = 'translateX(5px)';
    });
    link.addEventListener('mouseleave', function () {
      this.style.transform = 'translateX(0)';
    });
  });

  // Sistema de notificações
  const notificationBtn = document.querySelector('.action-btn .bi-bell')?.closest('.action-btn');
  if (notificationBtn) {
    notificationBtn.addEventListener('click', function () {
      console.log('Notificações clicadas');
    });
  }

  // Ativar tooltips para os botões de ação rápida
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[title]'));
  tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Carrega os modais dinamicamente
  fetch('/public/Modais/index.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('modais-container').innerHTML = html;

      // Agora que os modais existem no DOM, adicione o listener:
      const modalUsuariosLiberados = document.getElementById('modalUsuariosLiberados');
      if (modalUsuariosLiberados) {
        // Remove listeners antigos para evitar duplicidade
        modalUsuariosLiberados.removeEventListener('show.bs.modal', carregarUsuariosLiberados);
        modalUsuariosLiberados.addEventListener('show.bs.modal', carregarUsuariosLiberados);
      }
    })
    .catch(error => {
      console.error('Erro ao carregar modais:', error);
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'modal-load-error';
        errorMsg.innerHTML = '<i class="bi bi-exclamation-triangle"></i> Algumas funcionalidades podem estar limitadas';
        sidebar.appendChild(errorMsg);
      }
    });
}

// Funções existentes aprimoradas
function logout() {
  const logoutBtn = document.querySelector('.btn-logout');
  if (logoutBtn) {
    logoutBtn.innerHTML = '<i class="bi bi-box-arrow-right"></i> Saindo...';
    logoutBtn.disabled = true;
  }

  // Limpa os dados do usuário
  localStorage.removeItem('userSetor');
  localStorage.removeItem('userName');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userEmail');

  setTimeout(() => {
    window.location.href = '/public/Login/Index.html';
  }, 1000);
}

function trocarSenha() {
  console.log('Trocar senha clicado');
  // Implemente um modal para troca de senha
}

function trocarConta() {
  console.log('Trocar conta clicado');
  // Implemente a lógica para troca de conta
}

// Carrega a sidebar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', loadSidebar);

function setupThemeAndSidebar() {
  // Configuração do tema
  const toggleBtn = document.getElementById('toggleTheme');
  const html = document.documentElement;

  // Verifica o tema salvo ou usa o preferido pelo sistema
  const savedTheme = localStorage.getItem('tema');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

  // Aplica o tema inicial
  applyTheme(html, toggleBtn, currentTheme);

  // Configura o evento de clique para trocar tema
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const newTheme = html.getAttribute('data-bs-theme') === 'light' ? 'dark' : 'light';
      applyTheme(html, toggleBtn, newTheme);
      localStorage.setItem('tema', newTheme);
    });
  }

  // Configuração dos dropdowns da sidebar
  setupDropdown('setoresCollapse', 'iconeSetores', 'btnSetores');
  setupDropdown('importCollapse', 'iconeImport', 'btnImport');
}

function applyTheme(htmlElement, themeButton, theme) {
  htmlElement.setAttribute('data-bs-theme', theme);

  if (themeButton) {
    const iconClass = theme === 'light' ? 'bi-moon-stars' : 'bi-sun';
    const text = theme === 'light' ? 'Modo Escuro' : 'Modo Claro';

    themeButton.innerHTML = `
      <i class="bi ${iconClass}"></i>
      <span>${text}</span>
    `;

    // Atualiza classes do botão
    themeButton.classList.remove('btn-outline-dark', 'btn-outline-light');
    themeButton.classList.add(theme === 'light' ? 'btn-outline-dark' : 'btn-outline-light');
  }
}

function setupDropdown(collapseId, iconId, buttonId) {
  const collapseElement = document.getElementById(collapseId);
  const iconElement = document.getElementById(iconId);
  const buttonElement = document.getElementById(buttonId);

  if (!collapseElement || !iconElement || !buttonElement) return;

  const bsCollapse = new bootstrap.Collapse(collapseElement, { toggle: false });

  collapseElement.addEventListener('show.bs.collapse', () => {
    iconElement.classList.replace('bi-chevron-down', 'bi-chevron-up');
    iconElement.style.transition = 'transform 0.3s ease';
    iconElement.style.transform = 'rotate(360deg)';
  });

  collapseElement.addEventListener('hide.bs.collapse', () => {
    iconElement.classList.replace('bi-chevron-up', 'bi-chevron-down');
    iconElement.style.transition = 'transform 0.3s ease';
    iconElement.style.transform = 'rotate(0deg)';
  });

  buttonElement.addEventListener('click', () => {
    bsCollapse.toggle();
  });
}

// Chama a função quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function () {
  // Usa um pequeno timeout para garantir que a sidebar foi carregada
  setTimeout(setupThemeAndSidebar, 100);

  // NOVO: Dropdown do Agendamento Nacional
  const collapseElement = document.getElementById('agendamentoNacionalCollapse');
  const iconElement = document.getElementById('iconeAgendamentoNacional');
  const buttonElement = document.getElementById('btnAgendamentoNacional');

  if (collapseElement && iconElement && buttonElement) {
    const bsCollapse = new bootstrap.Collapse(collapseElement, { toggle: false });

    collapseElement.addEventListener('show.bs.collapse', () => {
      iconElement.classList.replace('bi-chevron-down', 'bi-chevron-up');
      iconElement.style.transition = 'transform 0.3s ease';
      iconElement.style.transform = 'rotate(360deg)';
    });

    collapseElement.addEventListener('hide.bs.collapse', () => {
      iconElement.classList.replace('bi-chevron-up', 'bi-chevron-down');
      iconElement.style.transition = 'transform 0.3s ease';
      iconElement.style.transform = 'rotate(0deg)';
    });

    buttonElement.addEventListener('click', () => {
      bsCollapse.toggle();
    });
  }
});