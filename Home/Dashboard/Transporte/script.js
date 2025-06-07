// Filtro de pesquisa na tabela
$(document).ready(function () {
  // Pesquisa na tabela
  $('.input-group input[type="text"]').on('keyup', function () {
    const value = $(this).val().toLowerCase();
    $('.orders-table tbody tr').filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  // Paginação simulada (apenas visual, sem backend)
  $('.pagination button').on('click', function () {
    if (!$(this).hasClass('active') && !$(this).hasClass('disabled')) {
      $('.pagination button').removeClass('active');
      $(this).addClass('active');
      // Aqui você pode implementar a lógica real de paginação se desejar
      Swal.fire('Página alterada', 'Funcionalidade de paginação simulada.', 'info');
    }
  });

  // Dropdowns dos gráficos (apenas alertas simulados)
  $('.chart-card .dropdown-menu .dropdown-item').on('click', function () {
    const filtro = $(this).text();
    Swal.fire('Filtro aplicado', `Você selecionou: ${filtro}`, 'success');
    // Aqui você pode atualizar os gráficos conforme o filtro selecionado
  });

  // Botão de atualizar
  $('.card-header .btn-outline-primary[title="Atualizar"]').on('click', function () {
    Swal.fire('Atualizado!', 'Os dados foram atualizados.', 'success');
    // Aqui você pode recarregar os dados da tabela/gráficos
  });

  // Botão de exportar
  $('.card-header .btn-outline-secondary[title="Exportar"]').on('click', function () {
    Swal.fire('Exportação', 'Exportação de dados simulada.', 'info');
    // Aqui você pode implementar a exportação real
  });

  // Tooltips Bootstrap
  $('[title]').tooltip({ trigger: 'hover' });
});

// Inicialização dos gráficos Chart.js
$(document).ready(function () {
  // Gráfico de Gastos
  if (document.getElementById('expensesChart')) {
    new Chart(document.getElementById('expensesChart').getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
          label: 'Gastos (R$)',
          data: [12000, 15000, 11000, 18000, 14000, 17000],
          backgroundColor: '#4e73df'
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  }

  // Gráfico de Provisão de Pagamento
  if (document.getElementById('paymentChart')) {
    new Chart(document.getElementById('paymentChart').getContext('2d'), {
      type: 'doughnut',
      data: {
        labels: ['A Vencer', 'Vencidos', 'Pagos'],
        datasets: [{
          data: [24, 12, 12],
          backgroundColor: ['#f6c23e', '#e74a3b', '#1cc88a']
        }]
      },
      options: { responsive: true }
    });
  }

  // Gráfico Programado por Dia
  if (document.getElementById('dailyChart')) {
    new Chart(document.getElementById('dailyChart').getContext('2d'), {
      type: 'line',
      data: {
        labels: ['01/06', '05/06', '10/06', '15/06', '20/06'],
        datasets: [{
          label: 'Programado',
          data: [2, 5, 3, 4, 1],
          borderColor: '#3498db',
          backgroundColor: 'rgba(52,152,219,0.2)',
          fill: true
        }]
      },
      options: { responsive: true }
    });
  }

  // Gráfico Passivos 2024
  if (document.getElementById('monthly24Chart')) {
    new Chart(document.getElementById('monthly24Chart').getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
          label: 'Passivos 2024',
          data: [3000, 2500, 4000, 3500, 3200, 2800],
          backgroundColor: '#e74a3b'
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  }

  // Gráfico Passivos 2025
  if (document.getElementById('monthly25Chart')) {
    new Chart(document.getElementById('monthly25Chart').getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
          label: 'Passivos 2025',
          data: [2000, 1800, 2200, 2100, 1900, 1700],
          backgroundColor: '#f6c23e'
        }]
      },
      options: { responsive: true, plugins: { legend: { display: false } } }
    });
  }
});