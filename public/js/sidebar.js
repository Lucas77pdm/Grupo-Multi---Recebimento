document.getElementById("sidebar").innerHTML = `
<div class="sidebar d-flex flex-column justify-content-between p-3" style="height: 100vh;">
  <!-- Área superior com scroll -->
  <div style="overflow-y: auto; max-height: calc(100vh - 250px);">
    <h4 class="text-center">LOGÍSTICA</h4>

    <a href="/Home/Dashboard/index.html"><i class="bi bi-ui-checks-grid me-2"></i>Home</a>

    <!-- Botão do dropdown -->
    <button class="btn text-white w-100 text-start d-flex justify-content-between align-items-center" type="button"
      id="btnSetores">
      <span><i class="bi bi-diagram-3 me-2"></i> Setores</span>
      <i class="bi bi-chevron-down" id="iconeSetores"></i>
    </button>

    <!-- Conteúdo que expande -->
    <div class="collapse mt-2" id="setoresCollapse">
      <a class="d-block ms-3 my-1" href="#estoque">Estoque</a>
      <a class="d-block ms-3 my-1" href="#recebimento">Recebimento</a>
      <a class="d-block ms-3 my-1" href="#expedicao">Expedição</a>
      <a class="d-block ms-3 my-1" href="#transporte">Transporte</a>
      <a class="d-block ms-3 my-1" href="#devolucao">Devoluções</a>
    </div>

    <!-- Botão Importação -->
    <button class="btn text-white w-100 text-start d-flex justify-content-between align-items-center" type="button"
      id="btnImport">
      <span><i class="bi bi-calendar-check me-2"></i> Importação</span>
      <i class="bi bi-chevron-down" id="iconeImport"></i>
    </button>

    <div class="collapse mt-2" id="importCollapse">
      <a class="d-block ms-3 my-1" href="#" data-bs-toggle="modal" data-bs-target="#modalImport">Agendar Importação</a>
      <a class="d-block ms-3 my-1" href="/Home/Agendamento/index.html">Consulta Programação</a>
    </div>

    <a href="#" data-bs-toggle="modal" data-bs-target="#modalChecklist"><i
        class="bi bi-card-checklist me-2"></i>Checklist</a>
    <a href="#" data-bs-toggle="modal" data-bs-target="#modalRelatorios"><i
        class="bi bi-bar-chart-line me-2"></i>Relatórios</a>
    <a href="#" data-bs-toggle="modal" data-bs-target="#modalSuporte"><i class="bi bi-headset me-2"></i>Suporte</a>
  </div>

  <!-- Perfil -->
  <div class="mt-4 pt-3 border-top text-white small">
    <div class="d-flex align-items-center mb-2">
      <i class="bi bi-person-circle fs-4 me-3"></i>
      <div>
        <div class="fw-bold">Usuário</div>
        <div class="text-primary small" style="font-size: 0.85rem;">usuario@email.com</div>
      </div>
    </div>

    <!-- Botão de Troca de Tema -->
    <div class="d-grid gap-2 mb-2">
      <button id="toggleTheme" class="btn btn-sm btn-outline-light">
        <i class="bi bi-moon-stars"></i> Trocar Tema
      </button>
    </div>

    <div class="d-grid gap-2">
      <button class="btn btn-sm btn-outline-light" onclick="trocarSenha()"><i class="bi bi-key me-1"></i> Trocar
        Senha</button>
      <button class="btn btn-sm btn-outline-light" onclick="trocarConta()"><i class="bi bi-arrow-left-right me-1"></i>
        Trocar Conta</button>
      <button class="btn btn-sm btn-danger" onclick="logout()"><i class="bi bi-box-arrow-right me-1"></i>
        Sair</button>
    </div>
  </div>
</div>

`;

  // Carrega os modais dinamicamente
  fetch('/public/Modais/index.html')
    .then(response => response.text())
    .then(html => {
      document.getElementById('modais-container').innerHTML = html;
    });

setTimeout(() => {
  const toggleBtn = document.getElementById('toggleTheme');

  const html = document.documentElement;
  const temaSalvo = localStorage.getItem('tema');

  // Aplica o tema salvo no carregamento da página
  if (temaSalvo) {
    html.setAttribute('data-bs-theme', temaSalvo);
    if (toggleBtn) {
      toggleBtn.innerHTML = `<i class="bi bi-${temaSalvo === 'light' ? 'moon-stars' : 'sun'}"></i> Trocar Tema`;
    }
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const temaAtual = html.getAttribute('data-bs-theme');
      const novoTema = temaAtual === 'light' ? 'dark' : 'light';

      html.setAttribute('data-bs-theme', novoTema);
      localStorage.setItem('tema', novoTema); // Salva o novo tema

      toggleBtn.innerHTML = `<i class="bi bi-${novoTema === 'light' ? 'moon-stars' : 'sun'}"></i> Trocar Tema`;

      // Ajuste de classe opcional (se seu botão precisa disso)
      toggleBtn.classList.remove('btn-outline-dark', 'btn-outline-light');
      toggleBtn.classList.add(novoTema === 'light' ? 'btn-outline-dark' : 'btn-outline-light');
    });
  }


  // Controle do botão Setores
  const setoresCollapse = document.getElementById('setoresCollapse');
  const iconSetores = document.getElementById('iconeSetores');
  const bsSetores = new bootstrap.Collapse(setoresCollapse, { toggle: false });

  setoresCollapse.addEventListener('show.bs.collapse', () => {
    iconSetores.classList.remove('bi-chevron-down');
    iconSetores.classList.add('bi-chevron-up');
    iconSetores.style.transition = 'transform 0.3s ease';
    iconSetores.style.transform = 'rotate(360deg)';
  });

  setoresCollapse.addEventListener('hide.bs.collapse', () => {
    iconSetores.classList.remove('bi-chevron-up');
    iconSetores.classList.add('bi-chevron-down');
    iconSetores.style.transition = 'transform 0.3s ease';
    iconSetores.style.transform = 'rotate(0deg)';
  });

  document.getElementById('btnSetores').addEventListener('click', () => {
    bsSetores.toggle();
  });


  // Controle do botão Importação
  const importCollapse = document.getElementById('importCollapse');
  const iconImport = document.getElementById('iconeImport');
  const bsImport = new bootstrap.Collapse(importCollapse, { toggle: false });

  importCollapse.addEventListener('show.bs.collapse', () => {
    iconImport.classList.remove('bi-chevron-down');
    iconImport.classList.add('bi-chevron-up');
    iconImport.style.transition = 'transform 0.3s ease';
    iconImport.style.transform = 'rotate(360deg)';
  });

  importCollapse.addEventListener('hide.bs.collapse', () => {
    iconImport.classList.remove('bi-chevron-up');
    iconImport.classList.add('bi-chevron-down');
    iconImport.style.transition = 'transform 0.3s ease';
    iconImport.style.transform = 'rotate(0deg)';
  });

  document.getElementById('btnImport').addEventListener('click', () => {
    bsImport.toggle();
  });

}, 100);

document.addEventListener('DOMContentLoaded', () => {
  const retorno = document.getElementById('retorno');
  const emailContainer = document.getElementById('emailContainer');
  const telContainer = document.getElementById('telContainer');
  const emailInput = document.getElementById('email');
  const telInput = document.getElementById('tel');

  retorno.addEventListener('change', () => {
    const valor = retorno.value;

    emailContainer.style.display = valor === 'email' ? 'block' : 'none';
    telContainer.style.display = valor === 'telefone' ? 'block' : 'none';

    if (valor === 'email') {
      emailInput.setAttribute('required', 'required');
      telInput.removeAttribute('required');
    } else if (valor === 'telefone') {
      telInput.setAttribute('required', 'required');
      emailInput.removeAttribute('required');
    } else {
      emailInput.removeAttribute('required');
      telInput.removeAttribute('required');
    }
  });

  // Validação do formulário
  const form = document.getElementById('formSuporte');
  form.addEventListener('submit', function (e) {
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();
    }
    form.classList.add('was-validated');
  });
});

// CHECKLIST

// Botão Filtrar
document.getElementById('btnFiltrar').addEventListener('click', function () {
  document.getElementById('resultadoChecklist').style.display = 'block';
});

// Botão Salvar e Filtrar
document.getElementById('btnSalvarFiltrar').addEventListener('click', function () {
  document.getElementById('resultadoChecklist').style.display = 'block';
});

// Opcional: Botão Limpar para esconder de novo (se quiser)
document.getElementById('btnLimpar').addEventListener('click', function () {
  document.getElementById('resultadoChecklist').style.display = 'none';
});

