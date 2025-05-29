// Paletas de cores globais
const redPalette = ["#ff6b6b", "#ff8787", "#fa5252", "#f03e3e", "#e03131"];
const bluePalette = ["#4dabf7", "#339af0", "#228be6", "#1c7ed6", "#1971c2"];

// Função auxiliar para converter hex para rgba
function hexToRgba(hex, alpha) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Função para inicializar/destruir gráficos
function manageCharts(action = 'init') {
    const isDarkTheme = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    const palette = isDarkTheme ? bluePalette : redPalette;

    // Configurações dos gráficos
    const chartConfigs = [
        {
            id: "graficoEstoque",
            type: "pie",
            data: {
                labels: ["Disponível", "Reservado", "Bloqueado"],
                datasets: [{
                    data: [60, 25, 15],
                    backgroundColor: [palette[0], palette[2], palette[4]]
                }]
            }
        },
        {
            id: "graficoExpedicao",
            type: "doughnut",
            data: {
                labels: ["Concluídas", "Pendentes", "Atrasadas"],
                datasets: [{
                    data: [120, 15, 5],
                    backgroundColor: [palette[0], palette[2], palette[4]]
                }]
            }
        },
        {
            id: "graficoReversa",
            type: "bar",
            data: {
                labels: ["Seg", "Ter", "Qua", "Qui", "Sex"],
                datasets: [{
                    label: "Devoluções",
                    data: [3, 4, 2, 5, 6],
                    backgroundColor: palette[3]
                }]
            }
        },
        {
            id: "graficoCadastro",
            type: "line",
            data: {
                labels: ["Jan", "Fev", "Mar", "Abr", "Mai"],
                datasets: [{
                    label: "Cadastros Realizados",
                    data: [5, 8, 6, 9, 7],
                    borderColor: palette[4],
                    backgroundColor: hexToRgba(palette[4], 0.2),
                    fill: true,
                    tension: 0.3
                }]
            }
        },
        {
            id: "graficoComponentes",
            type: "bar",
            data: {
                labels: ["Recebidos", "Testados", "Aprovados", "Reprovados", "Estoque"],
                datasets: [{
                    label: "Componentes",
                    data: [80, 70, 60, 10, 75],
                    backgroundColor: hexToRgba(palette[1], 0.6),
                    borderColor: palette[1],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => `${ctx.label}: ${ctx.raw}`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        },
        {
            id: "graficoSuprimentos",
            type: "pie",
            data: {
                labels: ["Produção", "Expedição", "Recebimento", "Qualidade"],
                datasets: [{
                    data: [40, 25, 20, 15],
                    backgroundColor: [palette[0], palette[1], palette[2], palette[4]]
                }]
            }
        },
        {
            id: "graficoTransportes",
            type: "bar",
            data: {
                labels: ["Caminhões", "Utilitários", "Empilhadeiras", "Fiorinos"],
                datasets: [{
                    label: "Dias de Uso no Mês",
                    data: [18, 22, 27, 15],
                    backgroundColor: [palette[0], palette[1], palette[2], palette[3]]
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                scales: {
                    x: {
                        beginAtZero: true,
                        grid: {
                            color: isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        },
        {
            id: "graficoProducao",
            type: "line",
            data: {
                labels: ["Turno 1", "Turno 2", "Turno 3"],
                datasets: [{
                    label: "Eficiência (%)",
                    data: [92, 87, 78],
                    borderColor: palette[4],
                    backgroundColor: hexToRgba(palette[4], 0.2),
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
                        }
                    }
                }
            }
        }
    ];

    if (action === 'destroy') {
        // Destrói todos os gráficos existentes
        Chart.helpers.each(Chart.instances, (instance) => {
            instance.destroy();
        });
        return;
    }

    // Inicializa os gráficos
    chartConfigs.forEach(({ id, type, data, options }) => {
        const canvas = document.getElementById(id);
        if (canvas) {
            new Chart(canvas.getContext("2d"), {
                type,
                data,
                options: options || {
                    responsive: true,
                    scales: type === "bar" ? {
                        y: { beginAtZero: true }
                    } : undefined
                }
            });
        }
    });
}

// Função para inicializar o gráfico de ocupação
function initializePositionChart() {
    const isDarkTheme = document.documentElement.getAttribute('data-bs-theme') === 'dark';
    const palette = isDarkTheme ? bluePalette : redPalette;

    // Dados simulados das posições livres por galpão
    const dataPositions = {
        G10: { CP: 10, SA: 15, PA: 5 },
        BLUE: { CP: 8, SA: 12, PA: 7 },
        JOSEPHA: { CP: 5, SA: 10, PA: 3 }
    };

    // Atualiza os valores nos cards
    document.getElementById("g10_cp").innerText = dataPositions.G10.CP;
    document.getElementById("g10_sa").innerText = dataPositions.G10.SA;
    document.getElementById("g10_pa").innerText = dataPositions.G10.PA;

    document.getElementById("blue_cp").innerText = dataPositions.BLUE.CP;
    document.getElementById("blue_sa").innerText = dataPositions.BLUE.SA;
    document.getElementById("blue_pa").innerText = dataPositions.BLUE.PA;

    document.getElementById("josepha_cp").innerText = dataPositions.JOSEPHA.CP;
    document.getElementById("josepha_sa").innerText = dataPositions.JOSEPHA.SA;
    document.getElementById("josepha_pa").innerText = dataPositions.JOSEPHA.PA;

    // Soma total de cada tipo
    const totalCP = dataPositions.G10.CP + dataPositions.BLUE.CP + dataPositions.JOSEPHA.CP;
    const totalSA = dataPositions.G10.SA + dataPositions.BLUE.SA + dataPositions.JOSEPHA.SA;
    const totalPA = dataPositions.G10.PA + dataPositions.BLUE.PA + dataPositions.JOSEPHA.PA;

    // Destrói o gráfico existente se houver
    const positionChartCanvas = document.getElementById("positionChart");
    if (window.positionChartInstance) {
        window.positionChartInstance.destroy();
    }

    // Renderiza o gráfico de distribuição
    const ctx = positionChartCanvas.getContext("2d");
    window.positionChartInstance = new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["CP", "SA", "PA"],
            datasets: [{
                data: [totalCP, totalSA, totalPA],
                backgroundColor: palette,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "bottom"
                },
                tooltip: {
                    callbacks: {
                        label: function (tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw} posições livres`;
                        }
                    }
                }
            }
        }
    });
}

// LEAD TIME / PROCESSOS EM DOCA
const docas = [
    { numero: 4, caminhao: "ABC123", complexidade: "Baixa" },
    { numero: 5, caminhao: "XYZ789", complexidade: "Média" },
    { numero: 6, caminhao: "LMN456", complexidade: "Alta" },
    { numero: 7, caminhao: "DEF789", complexidade: "Baixa" },
    { numero: 8, caminhao: "GHI321", complexidade: "Média" },
    { numero: 9, caminhao: "JKL654", complexidade: "Baixa" },
    { numero: 10, caminhao: "MNO987", complexidade: "Alta" },
    { numero: 11, caminhao: "PQR852", complexidade: "Média" }
];

function getComplexidadeClass(complexidade) {
    switch (complexidade) {
        case "Baixa": return "text-success";
        case "Média": return "text-warning";
        case "Alta": return "text-danger";
        default: return "";
    }
}

function getComplexidadeIcon(complexidade) {
    switch (complexidade) {
        case "Baixa": return "⬇️";
        case "Média": return "↔️";
        case "Alta": return "⬆️";
        default: return "";
    }
}

// Gerar os cards de cada doca
function initializeDocaCards() {
    const container = document.getElementById('docasContainer');
    container.innerHTML = ''; // Limpa os cards existentes

    docas.forEach(doca => {
        const card = document.createElement('div');
        card.className = "d-flex flex-column p-3 rounded shadow-sm border position-relative";
        card.id = `doca-${doca.numero}`;

        card.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
          <div>
            <h6 class="fw-bold mb-2">Doca ${doca.numero} - Caminhão ${doca.caminhao}</h6>
            <div class="mb-1 text-muted">
              Chegada: <strong id="chegada-${doca.numero}">--:--</strong> |
              <span id="leadtime-${doca.numero}" class="text-primary fw-bold">00:00:00</span> |
              Descarga: <strong id="descarga-${doca.numero}">--:--</strong>
            </div>
            <small class="${getComplexidadeClass(doca.complexidade)}">
              ${getComplexidadeIcon(doca.complexidade)} Complexidade: ${doca.complexidade}
            </small>
          </div>
          <div class="d-flex flex-column gap-2">
            <button id="btn-iniciar-${doca.numero}" class="btn btn-success btn-sm" onclick="iniciar(${doca.numero})">▶️ Iniciar</button>
            <button id="btn-finalizar-${doca.numero}" class="btn btn-danger btn-sm" onclick="finalizar(${doca.numero})" disabled>⏹️ Finalizar</button>
          </div>
        </div>
      `;
        container.appendChild(card);
    });
}

function iniciar(docaNumero) {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    document.getElementById(`chegada-${docaNumero}`).textContent = timeString;
    document.getElementById(`btn-iniciar-${docaNumero}`).disabled = true;
    document.getElementById(`btn-finalizar-${docaNumero}`).disabled = false;

    // Inicia o contador de lead time
    const leadTimeElement = document.getElementById(`leadtime-${docaNumero}`);
    let seconds = 0;

    const timer = setInterval(() => {
        seconds++;
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        leadTimeElement.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }, 1000);

    // Armazena o timer no elemento para poder parar depois
    leadTimeElement.dataset.timer = timer;
}

function finalizar(docaNumero) {
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    document.getElementById(`descarga-${docaNumero}`).textContent = timeString;
    document.getElementById(`btn-finalizar-${docaNumero}`).disabled = true;

    // Para o contador de lead time
    const leadTimeElement = document.getElementById(`leadtime-${docaNumero}`);
    clearInterval(leadTimeElement.dataset.timer);
}

// Observador de mudanças no tema
const themeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-bs-theme') {
            // Atualiza todos os gráficos
            manageCharts('destroy');
            manageCharts('init');
            initializePositionChart();
        }
    });
});

// Inicialização quando o DOM estiver carregado
document.addEventListener("DOMContentLoaded", function () {
    // Começa a observar o elemento html para mudanças no atributo data-bs-theme
    themeObserver.observe(document.documentElement, {
        attributes: true
    });

    // Inicializa todos os componentes
    manageCharts('init');
    initializePositionChart();
    initializeDocaCards();
});

// Controlar cronômetros
const timers = {};
const segundosContados = {};

function iniciar(doca) {
    const chegada = document.getElementById(`chegada-${doca}`);
    const leadtime = document.getElementById(`leadtime-${doca}`);
    const btnIniciar = document.getElementById(`btn-iniciar-${doca}`);
    const btnFinalizar = document.getElementById(`btn-finalizar-${doca}`);

    const agora = new Date();
    chegada.textContent = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    segundosContados[doca] = 0;
    timers[doca] = setInterval(() => {
        segundosContados[doca]++;
        leadtime.textContent = formatarTempo(segundosContados[doca]);
    }, 1000);

    btnIniciar.disabled = true;
    btnFinalizar.disabled = false;
}

function finalizar(doca) {
    const descarga = document.getElementById(`descarga-${doca}`);
    const btnFinalizar = document.getElementById(`btn-finalizar-${doca}`);

    const agora = new Date();
    descarga.textContent = agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });

    clearInterval(timers[doca]);
    btnFinalizar.disabled = true;
}

function formatarTempo(segundos) {
    const h = String(Math.floor(segundos / 3600)).padStart(2, '0');
    const m = String(Math.floor((segundos % 3600) / 60)).padStart(2, '0');
    const s = String(segundos % 60).padStart(2, '0');
    return `${h}:${m}:${s}`;
}

function getComplexidadeClass(complexidade) {
    if (complexidade === "Alta") return "text-danger";
    if (complexidade === "Média") return "text-warning";
    return "text-success";
}

function getComplexidadeIcon(complexidade) {
    if (complexidade === "Alta") return "🔴";
    if (complexidade === "Média") return "🟡";
    return "🟢";
}

// TABELAS PEDIDOS E DEVOLUÇÃO

document.addEventListener('DOMContentLoaded', function() {
  // Ordenação de tabelas
  document.querySelectorAll('.sortable').forEach(header => {
    header.addEventListener('click', () => {
      const table = header.closest('table');
      const columnIndex = Array.from(header.parentElement.children).indexOf(header);
      const sortKey = header.dataset.sort;
      const isAscending = !header.classList.contains('asc');
      
      // Reset all headers
      table.querySelectorAll('.sortable').forEach(h => {
        h.classList.remove('asc', 'desc');
        const icon = h.querySelector('i');
        if (icon) icon.className = 'bi bi-arrow-down-up';
      });
      
      // Set current header state
      header.classList.add(isAscending ? 'asc' : 'desc');
      const icon = header.querySelector('i');
      if (icon) icon.className = isAscending ? 'bi bi-arrow-up' : 'bi bi-arrow-down';
      
      // Sort rows
      const tbody = table.querySelector('tbody');
      const rows = Array.from(tbody.querySelectorAll('tr'));
      
      rows.sort((a, b) => {
        const aValue = a.children[columnIndex].textContent.trim();
        const bValue = b.children[columnIndex].textContent.trim();
        
        // Special sorting for dates
        if (sortKey === 'date') {
          return isAscending 
            ? new Date(aValue.split('/').reverse().join('-')) - new Date(bValue.split('/').reverse().join('-'))
            : new Date(bValue.split('/').reverse().join('-')) - new Date(aValue.split('/').reverse().join('-'));
        }
        
        // Numeric sorting
        if (!isNaN(aValue) && !isNaN(bValue)) {
          return isAscending ? aValue - bValue : bValue - aValue;
        }
        
        // Default string sorting
        return isAscending 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      });
      
      // Reappend sorted rows
      rows.forEach(row => tbody.appendChild(row));
    });
  });
  
  // Botão de atualizar
  document.querySelectorAll('.refresh-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.card');
      const spinner = document.createElement('i');
      spinner.className = 'bi bi-arrow-clockwise spin';
      
      this.innerHTML = '';
      this.appendChild(spinner);
      this.disabled = true;
      
      // Simular carregamento
      setTimeout(() => {
        this.innerHTML = '<i class="bi bi-arrow-clockwise"></i>';
        this.disabled = false;
        
        // Adicionar efeito visual
        card.style.transition = 'none';
        card.style.boxShadow = '0 0 0 2px rgba(13, 110, 253, 0.25)';
        setTimeout(() => {
          card.style.transition = 'all 0.3s ease';
          card.style.boxShadow = '0 0.125rem 0.25rem rgba(0, 0, 0, 0.075)';
        }, 500);
      }, 1000);
    });
  });
  
  // Pesquisa na tabela de devoluções
  const searchInput = document.querySelector('.search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const rows = document.querySelectorAll('.returns-table tbody tr');
      
      rows.forEach(row => {
        const clientName = row.querySelector('td:first-child').textContent.toLowerCase();
        row.style.display = clientName.includes(searchTerm) ? '' : 'none';
      });
    });
  }
  
  // Efeito de rotação no ícone de atualização
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .spin {
      animation: spin 1s linear infinite;
    }
  `;
  document.head.appendChild(style);
});

// Cards abaixo das tabelas

 document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card-stat');
    
    cards.forEach(card => {
      // Efeito de foco ao passar o mouse
      card.addEventListener('mouseenter', function() {
        this.style.zIndex = '10';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.zIndex = '1';
      });
      
      // Feedback ao clicar
      card.addEventListener('click', function() {
        this.style.transform = 'scale(0.98)';
        setTimeout(() => {
          this.style.transform = 'translateY(-5px)';
        }, 150);
      });
    });
  });