// Inicialização dos gráficos e KPIs
document.addEventListener('DOMContentLoaded', function () {
    // Gráfico de tipos de devolução
    new Chart(document.getElementById('graficoTipos').getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: ['Avaria', 'Erro Pedido', 'Vencido', 'Outros'],
            datasets: [{
                data: [35, 25, 20, 20],
                backgroundColor: ['#e74a3b', '#f6c23e', '#36b9cc', '#858796'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'bottom' } }
        }
    });

    // Gráfico de linha do tempo
    new Chart(document.getElementById('graficoLinhaTempo').getContext('2d'), {
        type: 'line',
        data: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Devoluções',
                data: [12, 19, 15, 22, 18, 10, 5],
                backgroundColor: 'rgba(78, 115, 223, 0.05)',
                borderColor: '#4e73df',
                borderWidth: 2,
                tension: 0.3,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
        }
    });

    // Gráfico de ranking
    new Chart(document.getElementById('graficoRanking').getContext('2d'), {
        type: 'bar',
        data: {
            labels: ['Fornecedor A', 'Fornecedor B', 'Fornecedor C', 'Fornecedor D', 'Fornecedor E'],
            datasets: [{
                label: 'Devoluções',
                data: [15, 12, 8, 6, 5],
                backgroundColor: '#1cc88a'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            indexAxis: 'y',
            scales: { x: { beginAtZero: true } }
        }
    });

    // Simulação de atualização dos KPIs
    setTimeout(() => {
        document.getElementById('kpi-total').textContent = '12';
        document.getElementById('kpi-tempo').textContent = '01:45';
        document.getElementById('kpi-atrasadas').textContent = '3';
        document.getElementById('kpi-concluidas').textContent = '5';
        document.getElementById('kpi-nao-conformidades').textContent = '25%';
        document.getElementById('kpi-motivo').textContent = 'Avaria';
    }, 1000);
});