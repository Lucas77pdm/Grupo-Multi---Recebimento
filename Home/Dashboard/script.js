// 📊 Inicialização dos Gráficos
window.addEventListener("DOMContentLoaded", () => {
    // 🧩 Outros Gráficos do Dashboard
    const chartConfigs = [
        {
            id: "graficoEstoque",
            type: "pie",
            data: {
                labels: ["Disponível", "Reservado", "Bloqueado"],
                datasets: [{
                    data: [60, 25, 15],
                    backgroundColor: ["#198754", "#ffc107", "#dc3545"]
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
                    backgroundColor: ["#198754", "#ffc107", "#dc3545"]
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
                    backgroundColor: "#fd7e14"
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
                    borderColor: "#6f42c1",
                    backgroundColor: "rgba(111, 66, 193, 0.2)",
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
                    backgroundColor: "rgba(13, 202, 240, 0.6)",
                    borderColor: "#0dcaf0",
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
                            color: "#ccc"
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
                    backgroundColor: ["#0d6efd", "#198754", "#ffc107", "#dc3545"]
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
                    backgroundColor: ["#20c997", "#0dcaf0", "#6f42c1", "#fd7e14"]
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                scales: {
                    x: { beginAtZero: true }
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
                    borderColor: "#0d6efd",
                    backgroundColor: "rgba(13, 110, 253, 0.2)",
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        }

    ];

    // 🛠️ Renderização dos gráficos adicionais
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
});



// grafico de ocupação
document.addEventListener("DOMContentLoaded", function () {
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

    // Renderiza o gráfico de distribuição
    const ctx = document.getElementById("positionChart").getContext("2d");
    new Chart(ctx, {
        type: "doughnut",
        data: {
            labels: ["CP", "SA", "PA"],
            datasets: [{
                data: [totalCP, totalSA, totalPA],
                backgroundColor: ["#007bff", "#ffc107", "#28a745"], // Azul, Amarelo, Verde
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
});


// LEAD TIME / PROCESSOS EM DOCA

// Dados das docas
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

// Gerar os cards de cada doca
const container = document.getElementById('docasContainer');
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