// CALENDARIO

document.addEventListener('DOMContentLoaded', function () {
  // Banco de dados de eventos por data
  const eventosPorData = {
    '2025-05-21': [
      { horario: '09:00', processo: 'Reunião de Planejamento', complexidade: 'Média' },
      { horario: '14:00', processo: 'Atualização de Sistema', complexidade: 'Alta' }
    ],
    '2025-05-22': [
      { horario: '08:30', processo: 'Importação de Dados', complexidade: 'Alta' },
      { horario: '11:00', processo: 'Treinamento de Equipe', complexidade: 'Baixa' },
      { horario: '16:00', processo: 'Revisão Contratual', complexidade: 'Média' }
    ],
    '2025-05-23': [
      { horario: '10:00', processo: 'Auditoria Financeira', complexidade: 'Alta' }
    ],
    '2025-05-27': [
      { horario: '13:30', processo: 'Integração com ERP', complexidade: 'Alta' },
      { horario: '15:45', processo: 'Apresentação para Cliente', complexidade: 'Média' }
    ],
    '2025-06-18': [
      { horario: '08:00', processo: 'Manutenção Preventiva', complexidade: 'Baixa' }
    ],
    // Adicione mais datas e eventos conforme necessário
  };

  // Lista de dias que têm eventos (gerada automaticamente)
  const diasComEventos = Object.keys(eventosPorData);

  // Função para formatar a data corretamente
  function formatarData(dataStr) {
    const data = new Date(dataStr);
    // Ajuste para o fuso horário brasileiro (UTC-3)
    data.setMinutes(data.getMinutes() + data.getTimezoneOffset() + 180);
    return data.toLocaleDateString('pt-BR');
  }

  // Função para verificar se a data tem eventos
  function dataTemEventos(dataStr) {
    return diasComEventos.includes(dataStr);
  }

  // Função para carregar processos específicos para a data selecionada
  function carregarProcessos(dataSelecionada) {
    const tabela = document.getElementById('processosDia');
    const dataAtualizacao = document.getElementById('dataAtualizacao');

    // Mostra loading
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

    // Simulação de requisição assíncrona
    setTimeout(() => {
      // Atualiza o título com a data selecionada
      document.getElementById('modalDiaLabel').textContent = `Agenda do Dia - ${formatarData(dataSelecionada)}`;

      // Preenche a tabela com os eventos específicos da data ou mensagem de vazio
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
                            <div class="mt-2">Nenhum processo agendado para este dia</div>
                        </td>
                    </tr>
                `;
      }

      // Atualiza a data/hora de atualização
      const agora = new Date();
      dataAtualizacao.textContent = formatarData(agora) + ' ' + agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }, 500); // Tempo de simulação menor para melhor UX
  }

  // Evento de clique no botão Atualizar
  document.getElementById('btnAtualizar')?.addEventListener('click', function () {
    // Recupera a data atual do título
    const titulo = document.getElementById('modalDiaLabel').textContent;
    const dataAtual = titulo.split('-')[1]?.trim();
    if (dataAtual) {
      // Converte para formato YYYY-MM-DD
      const partes = dataAtual.split('/');
      const dataFormatada = `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
      carregarProcessos(dataFormatada);
    }
  });

  // Integração com FullCalendar
  const calendarEl = document.getElementById('calendar');
  if (calendarEl) {
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
        // Destaca os dias que têm eventos
        const dataStr = arg.date.toISOString().split('T')[0];
        if (dataTemEventos(dataStr)) {
          arg.el.style.backgroundColor = 'rgba(0, 136, 136, 0.1)';
          arg.el.style.border = '1px solid #008888';

          // Adiciona tooltip com quantidade de eventos
          arg.el.setAttribute('title', `${eventosPorData[dataStr].length} evento(s)`);
          arg.el.setAttribute('data-bs-toggle', 'tooltip');
          new bootstrap.Tooltip(arg.el);
        }
      }
    });
    calendar.render();
  }
});

// 📍 MAPA AGENDAMENTO
document.addEventListener('DOMContentLoaded', function () {
  // Inicializa o mapa
  var map = L.map('mapaOperacoes').setView([-23.9618, -46.3289], 7);

  // Camada de tiles (visual do mapa)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  // Coordenadas dos locais
  var portoSantos = L.latLng(-23.9559, -46.3181);
  var extremaMG = L.latLng(-22.8767, -46.3495);
  var xavierPinheiro = L.latLng(-23.9507, -46.3159);

  // Marcadores
  L.marker(portoSantos).addTo(map).bindPopup('Porto de Santos');
  L.marker(extremaMG).addTo(map).bindPopup('Extrema - MG');
  L.marker(xavierPinheiro).addTo(map).bindPopup('Rua Xavier Pinheiro - Santos');

  // Rotas
  var rota1 = L.polyline([portoSantos, extremaMG], { color: 'red', weight: 5 }).addTo(map);
  var rota2 = L.polyline([portoSantos, xavierPinheiro], { color: 'blue', weight: 5, dashArray: '5, 10' }).addTo(map);

  // Ajusta o zoom para caber tudo
  map.fitBounds(L.featureGroup([rota1, rota2]).getBounds());
});

// Exemplo de interação com os cards de horário
document.querySelectorAll('.horario-card').forEach(card => {
  card.addEventListener('click', function () {
    // Remove a seleção de todos os cards
    document.querySelectorAll('.horario-card').forEach(c => {
      c.classList.remove('selected');
    });

    // Adiciona seleção ao card clicado
    this.classList.add('selected');

    // Atualiza o select com o horário selecionado
    document.getElementById('horario').value = this.dataset.horario;
  });
});

// Agendar eventos

document.addEventListener('DOMContentLoaded', function () {
  // Banco de dados de processos
  let processos = [];

  // Elementos do DOM
  const form = document.getElementById('formInserir');
  const selectHorario = document.getElementById('horario');
  const inputProcesso = document.getElementById('processo');
  const tabelaProcessos = document.getElementById('tabelaProcessos');
  const btnInserir = document.getElementById('btnInserir');
  const btnExcluirTudo = document.getElementById('btnExcluirTudo');

  // Função para atualizar contadores
  function atualizarContadores() {
    // Zera todos os contadores
    const contadores = {
      '08': 0, '11': 0, '14': 0,
      '18': 0, '22': 0, '23': 0, total: 0
    };

    // Conta os processos por horário
    processos.forEach(proc => {
      const hora = proc.horario.split(':')[0];
      contadores[hora]++;
      contadores.total++;
    });

    // Atualiza os badges
    document.getElementById('contador-08').textContent = contadores['08'];
    document.getElementById('contador-11').textContent = contadores['11'];
    document.getElementById('contador-14').textContent = contadores['14'];
    document.getElementById('contador-18').textContent = contadores['18'];
    document.getElementById('contador-22').textContent = contadores['22'];
    document.getElementById('contador-23').textContent = contadores['23'];
    document.getElementById('contador-total').textContent = contadores.total;
    document.getElementById('contadorProcessos').textContent = contadores.total + (contadores.total === 1 ? ' item' : ' itens');

    // Atualiza cores conforme quantidade
    atualizarCoresContadores();
  }

  // Função para atualizar cores dos contadores
  function atualizarCoresContadores() {
    const horarios = ['08', '11', '14', '18', '22', '23'];

    horarios.forEach(hora => {
      const contador = document.getElementById(`contador-${hora}`);
      const qtd = parseInt(contador.textContent);

      // Remove todas as classes de cor
      contador.className = 'badge';

      // Adiciona classe conforme quantidade
      if (qtd === 0) {
        contador.classList.add('bg-secondary');
      } else if (qtd < 3) {
        contador.classList.add('bg-success');
      } else if (qtd < 5) {
        contador.classList.add('bg-primary');
      } else if (qtd < 7) {
        contador.classList.add('bg-warning', 'text-dark');
      } else {
        contador.classList.add('bg-danger');
      }
    });
  }

  // Função para renderizar a tabela
  function renderizarTabela() {
    tabelaProcessos.innerHTML = '';

    if (processos.length === 0) {
      tabelaProcessos.innerHTML = `
        <tr>
          <td colspan="4" class="text-center py-4 text-muted">
            <i class="bi bi-inbox fs-4 d-block mb-2"></i>
            Nenhum processo agendado
          </td>
        </tr>
      `;
      return;
    }

    processos.forEach((proc, index) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td class="ps-4 text-start">${proc.horario}</td>
        <td class="text-start">${proc.processo}</td>
        <td class="text-center">
          <select class="form-select form-select-sm complexidade" data-index="${index}">
            <option value="Baixa" ${proc.complexidade === 'Baixa' ? 'selected' : ''}>Baixa</option>
            <option value="Média" ${proc.complexidade === 'Média' ? 'selected' : ''}>Média</option>
            <option value="Alta" ${proc.complexidade === 'Alta' ? 'selected' : ''}>Alta</option>
          </select>
        </td>
        <td class="pe-4 text-end">
          <button class="btn btn-sm btn-outline-danger excluir" data-index="${index}">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      tabelaProcessos.appendChild(tr);
    });

    // Adiciona eventos aos novos botões
    document.querySelectorAll('.excluir').forEach(btn => {
      btn.addEventListener('click', function () {
        const index = parseInt(this.dataset.index);
        processos.splice(index, 1);
        renderizarTabela();
        atualizarContadores();
      });
    });

    document.querySelectorAll('.complexidade').forEach(select => {
      select.addEventListener('change', function () {
        const index = parseInt(this.dataset.index);
        processos[index].complexidade = this.value;
      });
    });
  }

  // Evento de inserção
  btnInserir.addEventListener('click', function () {
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      return;
    }

    const novoProcesso = {
      horario: selectHorario.value,
      processo: inputProcesso.value,
      complexidade: 'Média' // Valor padrão
    };

    processos.push(novoProcesso);
    renderizarTabela();
    atualizarContadores();

    // Limpa o formulário
    inputProcesso.value = '';
    selectHorario.value = '';
    form.classList.remove('was-validated');
  });

  // Evento de limpar tudo
  document.getElementById('btnExcluirTudo').addEventListener('click', function () {
    if (processos.length > 0) {
      Swal.fire({
        title: 'Tem certeza?',
        html: '<div class="text-center"><i class="bi bi-exclamation-triangle-fill text-warning display-5 mb-3"></i><p>Você está prestes a remover <strong>todos os ' + processos.length + ' processos</strong> agendados!</p></div>',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: '<i class="bi bi-trash-fill"></i> Sim',
        cancelButtonText: '<i class="bi bi-x-circle"></i> Cancelar',
        backdrop: 'rgba(0,107,107,0.4)',
        customClass: {
          confirmButton: 'btn btn-danger px-4 py-2',
          cancelButton: 'btn btn-secondary px-4 py-2'
        },
        buttonsStyling: false,
        didOpen: () => {
          // Acesso direto ao container dos botões para ajustar o espaçamento
          const actions = Swal.getActions();
          if (actions) {
            actions.style.gap = '48px'; // Espaçamento de 48px entre os botões
            actions.style.padding = '0 24px'; // Padding horizontal para afastar das bordas
          }
        }
      }).then((result) => {
        if (result.isConfirmed) {
          processos = [];
          renderizarTabela();
          atualizarContadores();

          Swal.fire({
            title: 'Limpeza concluída!',
            text: 'Todos os processos foram removidos com sucesso.',
            icon: 'success',
            confirmButtonColor: '#006b6b',
            timer: 2000,
            timerProgressBar: true,
            didOpen: () => {
              // Ajuste opcional para o alerta de sucesso
              const confirmButton = Swal.getConfirmButton();
              if (confirmButton) {
                confirmButton.style.margin = '0 auto'; // Centralizar botão de OK
              }
            }
          });
        }
      });
    } else {
      Swal.fire({
        title: 'Nada para limpar',
        text: 'A lista de processos já está vazia.',
        icon: 'info',
        confirmButtonColor: '#006b6b',
        timer: 2000,
        timerProgressBar: true
      });
    }
  });

  // Inicializa
  atualizarContadores();
  renderizarTabela();
});



