// ========== GRÁFICOS PRINCIPAIS ==========

// Gráfico: Expedições por Status
if (document.getElementById('graficoStatusExpedicao')) {
    new Chart(graficoStatusExpedicao, {
        type: 'doughnut',
        data: {
            labels: ['Entregue', 'Em Rota', 'Atrasado', 'Processando'],
            datasets: [{ data: [29, 5, 3, 1], backgroundColor: ['#198754', '#ffc107', '#dc3545', '#0d6efd'] }]
        },
        options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    });
}

// Gráfico: Volumes por Tipo de Carga
if (document.getElementById('graficoTipoCarga')) {
    new Chart(graficoTipoCarga, {
        type: 'bar',
        data: {
            labels: ['Paletizada', 'Granel', 'Fracionada', 'Conteiner'],
            datasets: [{ label: 'Volumes', data: [400, 320, 250, 150], backgroundColor: ['#0dcaf0', '#ffc107', '#198754', '#6c757d'] }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });
}

// Gráfico: Atrasos por Transportadora
if (document.getElementById('graficoAtrasosTransportadora')) {
    new Chart(graficoAtrasosTransportadora, {
        type: 'bar',
        data: {
            labels: ['TransLog', 'ExpressoSul', 'ViaCarga', 'NordesteTransp'],
            datasets: [{ label: 'Atrasos', data: [1, 2, 2, 1,3], backgroundColor: ['#dc3545', '#ffc107', '#0d6efd', '#17a673'] }]
        },
        options: { responsive: true, plugins: { legend: { display: false } } }
    });
}

// Gráfico: Performance de Entrega
if (document.getElementById('graficoPerformanceEntrega')) {
    new Chart(graficoPerformanceEntrega, {
        type: 'line',
        data: {
            labels: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            datasets: [{
                label: 'Entregas',
                data: [5, 7, 6, 8, 9, 4, 3],
                borderColor: '#198754',
                backgroundColor: 'rgba(25,135,84,0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: { responsive: true }
    });
}

// Gráfico: Checklist de Expedição
if (document.getElementById('graficoChecklist')) {
    new Chart(graficoChecklist, {
        type: 'pie',
        data: {
            labels: ['OK', 'Pendente', 'Em aberto'],
            datasets: [{ data: [34, 5, 3], backgroundColor: ['#0dcaf0', '#ffc107', '#dc3545'] }]
        },
        options: { responsive: true, plugins: { legend: { position: 'bottom' } } }
    });
}

// ========== BOTÕES DE REFRESH E EXPORTAÇÃO ==========

document.querySelectorAll('.refresh-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.add('disabled');
        btn.innerHTML = '<span class="spinner-border spinner-border-sm"></span>';
        setTimeout(() => {
            btn.classList.remove('disabled');
            btn.innerHTML = '<i class="bi bi-arrow-clockwise"></i>';
        }, 1000);
    });
});

document.querySelectorAll('.export-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const table = document.querySelector('.orders-table');
        let csv = [];
        for (let row of table.rows) {
            let rowData = [];
            for (let cell of row.cells) rowData.push(cell.innerText.replace(/\n/g, ' ').trim());
            csv.push(rowData.join(','));
        }
        const blob = new Blob([csv.join('\n')], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'expedicoes.csv';
        document.body.appendChild(a); a.click();
        document.body.removeChild(a); URL.revokeObjectURL(url);
    });
});

// ========== PAGINAÇÃO DA TABELA DE EXPEDIÇÕES ==========

const expedicoes = [
    { id: '#2001', destino: 'Rio de Janeiro', uf: 'RJ', status: 'Entregue', statusClass: 'success', data: '14/04/2025', transp: 'TransLog' },
    { id: '#2002', destino: 'São Paulo', uf: 'SP', status: 'Em Rota', statusClass: 'warning', data: '14/04/2025', transp: 'ExpressoSul' },
    { id: '#2003', destino: 'Belo Horizonte', uf: 'MG', status: 'Atrasado', statusClass: 'danger', data: '13/04/2025', transp: 'ViaCarga' },
    { id: '#2004', destino: 'Salvador', uf: 'BA', status: 'Processando', statusClass: 'primary', data: '15/04/2025', transp: 'NordesteTransp' },
];
// Simula 32 registros
while (expedicoes.length < 32) {
    let n = expedicoes.length + 2001;
    expedicoes.push({
        id: `#${n}`,
        destino: 'Destino ' + n,
        uf: ['RJ', 'SP', 'MG', 'BA'][n % 4],
        status: ['Entregue', 'Em Rota', 'Atrasado', 'Processando'][n % 4],
        statusClass: ['success', 'warning', 'danger', 'primary'][n % 4],
        data: '15/04/2025',
        transp: ['TransLog', 'ExpressoSul', 'ViaCarga', 'NordesteTransp'][n % 4]
    });
}
let currentPage = 1, sortKey = null, sortDir = 'asc';
const perPage = 4;

// Renderiza a tabela de expedições recentes
function renderTable(page = 1, sortKey = null, sortDir = 'asc') {
    let data = [...expedicoes];
    if (sortKey) {
        data.sort((a, b) => {
            if (a[sortKey] < b[sortKey]) return sortDir === 'asc' ? -1 : 1;
            if (a[sortKey] > b[sortKey]) return sortDir === 'asc' ? 1 : -1;
            return 0;
        });
    }
    const start = (page - 1) * perPage, end = start + perPage;
    const pageData = data.slice(start, end);
    const tbody = document.querySelector('.orders-table tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    pageData.forEach(exp => {
        tbody.innerHTML += `
        <tr>
            <td class="fw-bold">${exp.id}</td>
            <td>
                <div class="d-flex align-items-center">
                    <div class="avatar-sm me-2">
                        <span class="avatar-title rounded bg-${exp.statusClass} bg-opacity-10${exp.statusClass !== 'primary' ? ' text-' + exp.statusClass : ''}">${exp.uf}</span>
                    </div>
                    <div>${exp.destino}</div>
                </div>
            </td>
            <td><span class="badge bg-${exp.statusClass} bg-opacity-10${exp.statusClass !== 'primary' ? ' text-' + exp.statusClass : ''}">${exp.status}</span></td>
            <td>${exp.data}</td>
            <td>${exp.transp}</td>
            <td class="text-end">
                <button class="btn btn-sm btn-outline-primary" title="Detalhes"><i class="bi bi-eye"></i></button>
            </td>
        </tr>
        `;
    });
    // Atualiza info de paginação
    document.querySelector('.card-footer .text-muted span.fw-bold').innerText = `${start + 1} - ${Math.min(end, data.length)}`;
    document.querySelectorAll('.card-footer .fw-bold')[1].innerText = data.length;
    // Atualiza botões de paginação
    const pagBtns = document.querySelectorAll('.pagination button');
    pagBtns[0].classList.toggle('disabled', page === 1);
    pagBtns[1].classList.toggle('active', page === 1);
    pagBtns[2].classList.toggle('active', page === 2);
    pagBtns[3].classList.toggle('active', page === 3);
    pagBtns[4].classList.toggle('disabled', page === Math.ceil(data.length / perPage));
}
renderTable();

document.querySelectorAll('.pagination button').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('disabled')) return;
        if (idx === 0 && currentPage > 1) currentPage--;
        else if (idx === 4 && currentPage < 3) currentPage++;
        else if (idx > 0 && idx < 4) currentPage = idx;
        renderTable(currentPage, sortKey, sortDir);
    });
});

// Ordenação das colunas
document.querySelectorAll('.orders-table th.sortable').forEach(th => {
    th.addEventListener('click', () => {
        const keyMap = { id: 'id', client: 'destino', date: 'data' };
        const key = keyMap[th.dataset.sort];
        if (sortKey === key) sortDir = sortDir === 'asc' ? 'desc' : 'asc';
        else { sortKey = key; sortDir = 'asc'; }
        renderTable(currentPage, sortKey, sortDir);
    });
});

// Botão de detalhes da expedição
document.querySelector('.orders-table').addEventListener('click', function (e) {
    if (e.target.closest('button[title="Detalhes"]')) {
        alert('Detalhes da expedição (implemente modal conforme necessário)');
    }
});

// Botão de visualizar pendências/alertas
document.querySelectorAll('.card-body table').forEach(table => {
    table.addEventListener('click', function (e) {
        if (e.target.closest('button[title="Visualizar"]')) {
            alert('Visualizar pendência/alerta (implemente modal conforme necessário)');
        }
    });
});