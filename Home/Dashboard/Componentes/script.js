// Inicializa o gráfico principal de movimentação de estoque
document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('inventoryChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30'],
            datasets: [
                {
                    label: 'Entradas',
                    data: [12, 19, 15, 8, 12, 15, 20, 14, 12, 10, 15, 18, 20, 15, 12, 10, 8, 12, 15, 18, 20, 15, 12, 10, 8, 12, 15, 18, 20, 15],
                    borderColor: '#2ecc71',
                    backgroundColor: 'rgba(46, 204, 113, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Saídas',
                    data: [8, 12, 10, 15, 18, 20, 15, 12, 10, 8, 12, 15, 18, 20, 15, 12, 10, 8, 12, 15, 18, 20, 15, 12, 10, 8, 12, 15, 18, 20],
                    borderColor: '#e74c3c',
                    backgroundColor: 'rgba(231, 76, 60, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'top' },
                tooltip: { mode: 'index', intersect: false }
            },
            scales: {
                y: { beginAtZero: true, grid: { drawBorder: false } },
                x: { grid: { display: false } }
            }
        }
    });

    // Troca a tag ativa ao clicar
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', function () {
            document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Animação de fade-in dos cards
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(card => {
            card.style.opacity = '1';
        });
    }, 100);
});