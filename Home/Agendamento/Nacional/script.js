// --- CALENDÁRIO E AGENDA DO DIA (NACIONAL) ---
document.addEventListener('DOMContentLoaded', function () {
    // Banco de dados de eventos por data (exemplo)
    const eventosPorData = {
        '2025-06-05': [
            { horario: '08:00', processo: 'NF-12345', complexidade: 'Alta' },
            { horario: '11:00', processo: 'SNF-54321', complexidade: 'Média' }
        ],
        '2025-06-06': [
            { horario: '14:00', processo: 'NF-67890', complexidade: 'Baixa' }
        ]
        // Adicione mais datas e eventos conforme necessário
    };

    const diasComEventos = Object.keys(eventosPorData);

    function formatarData(dataStr) {
        const data = new Date(dataStr);
        data.setMinutes(data.getMinutes() + data.getTimezoneOffset() + 180);
        return data.toLocaleDateString('pt-BR');
    }

    function dataTemEventos(dataStr) {
        return diasComEventos.includes(dataStr);
    }

    function carregarProcessos(dataSelecionada) {
        const tabela = document.getElementById('processosDia');
        const dataAtualizacao = document.getElementById('dataAtualizacao');
        const modalDiaLabel = document.getElementById('modalDiaLabel');

        if (!tabela || !dataAtualizacao || !modalDiaLabel) return;

        tabela.innerHTML = `
      <tr class="placeholder-wave">
        <td colspan="3" class="p-4 text-center text-muted">
          <div class="spinner-border text-primary spinner-border-sm" role="status">
            <span class="visually-hidden">Carregando...</span>
          </div>
          <span class="ms-2">Carregando agenda...</span>
        </td>
      </tr>
    `;

        setTimeout(() => {
            modalDiaLabel.textContent = `Agenda do Dia - ${formatarData(dataSelecionada)}`;
            tabela.innerHTML = '';

            if (dataTemEventos(dataSelecionada)) {
                const eventosDoDia = eventosPorData[dataSelecionada];

                eventosDoDia.forEach(proc => {
                    let badgeClass = 'bg-secondary';
                    if (proc.complexidade === 'Alta') badgeClass = 'bg-danger';
                    if (proc.complexidade === 'Média') badgeClass = 'bg-warning text-dark';
                    if (proc.complexidade === 'Baixa') badgeClass = 'bg-success';

                    tabela.innerHTML += `
            <tr>
              <td class="ps-4 text-start">${proc.horario}</td>
              <td class="text-start">${proc.processo}</td>
              <td class="pe-4 text-end"><span class="badge ${badgeClass}">${proc.complexidade}</span></td>
            </tr>
          `;
                });
            } else {
                tabela.innerHTML = `
          <tr>
            <td colspan="3" class="p-4 text-center text-muted">
              <i class="bi bi-calendar-x fs-4"></i>
              <div class="mt-2">Nenhum agendamento nacional para este dia</div>
            </td>
          </tr>
        `;
            }

            const agora = new Date();
            dataAtualizacao.textContent = formatarData(agora) + ' ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
        }, 500);
    }

    // Botão de atualizar agenda
    const btnAtualizar = document.getElementById('btnAtualizar');
    if (btnAtualizar) {
        btnAtualizar.addEventListener('click', function () {
            const titulo = document.getElementById('modalDiaLabel')?.textContent;
            const dataAtual = titulo?.split('-')[1]?.trim();
            if (dataAtual) {
                const partes = dataAtual.split('/');
                if (partes.length === 3) {
                    const dataFormatada = `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
                    carregarProcessos(dataFormatada);
                }
            }
        });
    }

    // Integração com FullCalendar
    const calendarEl = document.getElementById('calendar');
    if (calendarEl && typeof FullCalendar !== 'undefined') {
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            locale: 'pt-br',
            selectable: true,
            dateClick: function (info) {
                const dataSelecionada = info.dateStr;
                carregarProcessos(dataSelecionada);

                // Mostra o offcanvas
                const canvas = new bootstrap.Offcanvas('#offcanvasDia');
                canvas.show();
            },
            dayCellDidMount: function (arg) {
                const dataStr = arg.date.toISOString().split('T')[0];
                if (dataTemEventos(dataStr)) {
                    arg.el.style.backgroundColor = 'rgba(0, 136, 136, 0.1)';
                    arg.el.style.border = '1px solid #008888';
                    arg.el.setAttribute('title', `${eventosPorData[dataStr].length} agendamento(s)`);
                    arg.el.setAttribute('data-bs-toggle', 'tooltip');
                    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
                        new bootstrap.Tooltip(arg.el);
                    }
                }
            }
        });
        calendar.render();
    }

    // Ativar tooltips globais (caso existam)
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.forEach(function (tooltipTriggerEl) {
            new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }

    // Simular carregamento de dados do dashboard
    setTimeout(function () {
        const chartPlaceholder = document.querySelector('.chart-placeholder');
        if (chartPlaceholder) {
            chartPlaceholder.innerHTML =
                '<small class="text-success">Dados carregados com sucesso</small>';
        }
    }, 1500);
});