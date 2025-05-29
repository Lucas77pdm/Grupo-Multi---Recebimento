// JavaScript para interatividade
document.addEventListener('DOMContentLoaded', function() {
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
            btn.addEventListener('click', function() {
                const index = this.getAttribute('data-index');
                editarProcesso(index);
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
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