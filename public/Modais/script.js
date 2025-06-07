// JavaScript para interatividade
document.addEventListener('DOMContentLoaded', function () {
    // Variáveis
    const processos = [];
    const btnInserir = document.getElementById('btnInserir');
    const btnExcluirTudo = document.getElementById('btnExcluirTudo');
    const btnEnviar = document.getElementById('btnEnviar');
    const formInserir = document.getElementById('formInserir');
    const tabelaProcessos = document.getElementById('tabelaProcessos');

    // Função para atualizar contadores
    function atualizarContadores() {
        const contadores = {
            '08:00': 0,
            '11:00': 0,
            '14:00': 0,
            '18:00': 0,
            '22:00': 0,
            '23:00': 0,
            'total': 0
        };

        processos.forEach(processo => {
            contadores[processo.horario]++;
            contadores.total++;
        });

        // Atualiza os contadores na UI
        document.getElementById('contador-08').textContent = contadores['08:00'];
        document.getElementById('contador-11').textContent = contadores['11:00'];
        document.getElementById('contador-14').textContent = contadores['14:00'];
        document.getElementById('contador-18').textContent = contadores['18:00'];
        document.getElementById('contador-22').textContent = contadores['22:00'];
        document.getElementById('contador-23').textContent = contadores['23:00'];
        document.getElementById('contador-total').textContent = contadores.total;
        document.getElementById('contadorProcessos').textContent = `${contadores.total} ${contadores.total === 1 ? 'item' : 'itens'}`;

        // Atualiza estilos dos slots de tempo
        document.querySelectorAll('.time-slot').forEach(slot => {
            const time = slot.getAttribute('data-time');
            if (contadores[time] > 0) {
                slot.style.borderColor = 'var(--primary-color)';
                slot.style.boxShadow = 'var(--shadow-sm)';
            } else {
                slot.style.borderColor = 'var(--border-color)';
                slot.style.boxShadow = 'none';
            }
        });
    }

    // Função para renderizar a tabela
    function renderizarTabela() {
        tabelaProcessos.innerHTML = '';

        if (processos.length === 0) {
            tabelaProcessos.innerHTML = `
                <tr class="empty-row">
                    <td colspan="4" class="text-center py-4 text-muted">
                        Nenhum processo agendado
                    </td>
                </tr>
            `;
            return;
        }

        processos.forEach((processo, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${processo.horario}</td>
                <td>${processo.processo}</td>
                <td class="complexidade ${processo.complexidade}">
                    ${processo.complexidade === 'baixa' ? 'Baixa' :
                    processo.complexidade === 'media' ? 'Média' : 'Alta'}
                </td>
                <td class="actions">
                    <button class="action-btn edit-btn" data-index="${index}">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="action-btn delete-btn" data-index="${index}">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
            tabelaProcessos.appendChild(row);
        });

        // Adiciona eventos aos botões de ação
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                editarProcesso(index);
            });
        });

        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = this.getAttribute('data-index');
                excluirProcesso(index);
            });
        });
    }

    // Função para adicionar processo
    function adicionarProcesso() {
        const horario = document.getElementById('horario').value;
        const processo = document.getElementById('processo').value;
        const complexidade = document.getElementById('complexidade').value;

        if (!horario || !processo) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        processos.push({
            horario,
            processo,
            complexidade
        });

        // Limpa o formulário
        formInserir.reset();

        // Atualiza a UI
        atualizarContadores();
        renderizarTabela();
    }

    // Função para editar processo
    function editarProcesso(index) {
        const processo = processos[index];

        // Preenche o formulário com os dados do processo
        document.getElementById('horario').value = processo.horario;
        document.getElementById('processo').value = processo.processo;
        document.getElementById('complexidade').value = processo.complexidade;

        // Remove o processo da lista
        processos.splice(index, 1);

        // Atualiza a UI
        atualizarContadores();
        renderizarTabela();
    }

    // Função para excluir processo
    function excluirProcesso(index) {
        if (confirm('Tem certeza que deseja excluir este processo?')) {
            processos.splice(index, 1);
            atualizarContadores();
            renderizarTabela();
        }
    }

    // Função para limpar tudo
    function limparTudo() {
        if (processos.length === 0) return;

        if (confirm('Tem certeza que deseja limpar todos os processos agendados?')) {
            processos.length = 0;
            atualizarContadores();
            renderizarTabela();
        }
    }

    // Função para exportar
    function exportarProcessos() {
        if (processos.length === 0) {
            alert('Nenhum processo para exportar.');
            return;
        }

        // Simulação de exportação
        alert(`${processos.length} processos serão exportados.`);
        console.log('Processos para exportar:', processos);
    }

    // Event listeners
    btnInserir.addEventListener('click', adicionarProcesso);
    btnExcluirTudo.addEventListener('click', limparTudo);
    btnEnviar.addEventListener('click', exportarProcessos);

    // Inicializa a tabela
    renderizarTabela();
});






// PESQUISA E FILTROS DE USUÁRIOS

// Função para carregar os usuários liberados
function carregarUsuariosLiberados() {
    const userSetor = localStorage.getItem('userSetor');

    // Simulação de dados com fotos
    const usuariosPorSetor = {
        'componentes': [
            { nome: 'João Silva', cargo: 'Supervisor', email: 'joao.silva@grupomulti.com.br', acesso: 'Total', foto: 'https://randomuser.me/api/portraits/men/32.jpg' },
            { nome: 'Maria Oliveira', cargo: 'Operador', email: 'maria.oliveira@grupomulti.com.br', acesso: 'Parcial', foto: 'https://randomuser.me/api/portraits/women/44.jpg' },
            { nome: 'Carlos Souza', cargo: 'Técnico', email: 'carlos.souza@grupomulti.com.br', acesso: 'Parcial', foto: 'https://randomuser.me/api/portraits/men/22.jpg' }
        ],
        'expedicao': [
            { nome: 'Ana Costa', cargo: 'Coordenadora', email: 'ana.costa@grupomulti.com.br', acesso: 'Total', foto: 'https://randomuser.me/api/portraits/women/63.jpg' },
            { nome: 'Pedro Rocha', cargo: 'Auxiliar', email: 'pedro.rocha@grupomulti.com.br', acesso: 'Parcial', foto: 'https://randomuser.me/api/portraits/men/41.jpg' }
        ],
        'transporte': [
            { nome: 'Lucas Lima', cargo: 'Motorista', email: 'lucas.lima@grupomulti.com.br', acesso: 'Total', foto: 'https://randomuser.me/api/portraits/men/75.jpg' }
        ],
        'devolucoes': [
            { nome: 'Fernanda Dias', cargo: 'Analista', email: 'fernanda.dias@grupomulti.com.br', acesso: 'Total', foto: 'https://randomuser.me/api/portraits/women/68.jpg' }
        ],
        'recebimento': [
            { nome: 'Rafael Souza', cargo: 'Conferente', email: 'rafael.souza@grupomulti.com.br', acesso: 'Total', foto: 'https://randomuser.me/api/portraits/men/85.jpg' }
        ]
    };

    const usuarios = usuariosPorSetor[userSetor] || [
        { nome: 'Nenhum usuário específico encontrado', cargo: '-', email: '-', acesso: '-', foto: 'https://randomuser.me/api/portraits/lego/5.jpg' }
    ];

    // Atualiza título do modal
    const modalTitle = document.getElementById('modalUsuariosLiberadosLabel');
    if (modalTitle) {
        let setorLabel = userSetor ? userSetor.charAt(0).toUpperCase() + userSetor.slice(1) : '';
        modalTitle.textContent = `Usuários Liberados - ${setorLabel}`;
    }

    // Renderiza usuários
    const tabela = document.getElementById('tabelaUsuariosLiberados');
    if (tabela) {
        tabela.innerHTML = usuarios.map(usuario => `
      <tr data-access="${usuario.acesso.toLowerCase()}">
        <td><img src="${usuario.foto}" alt="${usuario.nome}" class="user-avatar"></td>
        <td>
          <div class="fw-semibold">${usuario.nome}</div>
          <small class="text-muted">ID: ${Math.floor(1000 + Math.random() * 9000)}</small>
        </td>
        <td>${usuario.cargo}</td>
        <td>
          <a href="mailto:${usuario.email}" class="d-block text-primary text-decoration-none">
            <i class="bi bi-envelope me-1"></i> ${usuario.email}
          </a>
          <small class="text-muted">
            <i class="bi bi-telephone me-1"></i> (11) 9${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}
          </small>
        </td>
        <td class="text-center">
          <span class="badge-access ${usuario.acesso === 'Total' ? 'badge-total' : usuario.acesso === 'Parcial' ? 'badge-parcial' : 'badge-other'}">
            <i class="bi ${usuario.acesso === 'Total' ? 'bi-unlock' : usuario.acesso === 'Parcial' ? 'bi-lock' : 'bi-question-circle'} me-1"></i>
            ${usuario.acesso}
          </span>
        </td>
      </tr>
    `).join('');

        // Atualiza contador
        document.getElementById('contadorUsuarios').textContent = `${usuarios.length} ${usuarios.length === 1 ? 'usuário encontrado' : 'usuários encontrados'}`;
    }

    // Adiciona funcionalidade de pesquisa
    const pesquisaInput = document.getElementById('pesquisaUsuarios');
    if (pesquisaInput && tabela) {
        pesquisaInput.oninput = function (e) {
            const termo = e.target.value.toLowerCase();
            const linhas = tabela.querySelectorAll('tr[data-access]');
            let visiveis = 0;
            linhas.forEach(linha => {
                const textoLinha = linha.textContent.toLowerCase();
                if (textoLinha.includes(termo)) {
                    linha.style.display = '';
                    visiveis++;
                } else {
                    linha.style.display = 'none';
                }
            });
            document.getElementById('contadorUsuarios').textContent = `${visiveis} ${visiveis === 1 ? 'usuário encontrado' : 'usuários encontrados'}`;
        };
    }

    // Adiciona funcionalidade de filtros
    const filterItems = document.querySelectorAll('[data-filter]');
    if (filterItems && tabela) {
        filterItems.forEach(item => {
            item.onclick = function (e) {
                e.preventDefault();
                const filtro = this.getAttribute('data-filter');
                const linhas = tabela.querySelectorAll('tr[data-access]');
                let visiveis = 0;
                linhas.forEach(linha => {
                    if (filtro === 'all' || linha.getAttribute('data-access') === filtro) {
                        linha.style.display = '';
                        visiveis++;
                    } else {
                        linha.style.display = 'none';
                    }
                });
                document.getElementById('contadorUsuarios').textContent = `${visiveis} ${visiveis === 1 ? 'usuário encontrado' : 'usuários encontrados'}`;
            };
        });
    }
}



// SCRIPT DO AGENDAMENTO NACIONAL

// Troca de formulário CNF/SNF para o modal nacional
document.addEventListener('DOMContentLoaded', function () {
    const radioCNF = document.getElementById('radioCNF');
    const radioSNF = document.getElementById('radioSNF');
    const formCNF = document.getElementById('formCNF');
    const formSNF = document.getElementById('formSNF');

    function toggleForms() {
        if (radioCNF.checked) {
            formCNF.style.display = '';
            formSNF.style.display = 'none';
        } else {
            formCNF.style.display = 'none';
            formSNF.style.display = '';
        }
    }

    if (radioCNF && radioSNF && formCNF && formSNF) {
        radioCNF.addEventListener('change', toggleForms);
        radioSNF.addEventListener('change', toggleForms);
        toggleForms();
    }
});