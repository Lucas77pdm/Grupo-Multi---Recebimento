document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const modal = document.getElementById('modalRelatorios');
    const searchInput = document.getElementById('searchReports');
    const clearSearchBtn = document.getElementById('clearSearch');
    const categoryFilters = document.querySelectorAll('[data-category]');
    const sortOptions = document.querySelectorAll('[data-sort]');
    const viewModeBtns = document.querySelectorAll('.view-mode');
    const resetFiltersBtn = document.getElementById('resetFilters');
    const loadMoreBtn = document.getElementById('loadMoreReports');
    const createReportBtn = document.getElementById('createNewReport');
    const reportsGrid = document.getElementById('reportsGrid');
    const noResults = document.getElementById('noResults');
    const totalReports = document.getElementById('totalReports');

    // Inicialização quando o modal é aberto
    if (modal) {
        modal.addEventListener('shown.bs.modal', function() {
            updateReportCount();
            initViewMode();
        });
    }

    // Função para atualizar contagem de relatórios visíveis
    function updateReportCount() {
        const visibleCards = document.querySelectorAll('#reportsGrid .report-card:not([style*="display: none"])').length;
        const totalCards = document.querySelectorAll('#reportsGrid .report-card').length;
        
        if (totalReports) {
            totalReports.textContent = `${visibleCards} de ${totalCards} relatórios`;
            noResults.classList.toggle('d-none', visibleCards > 0);
            reportsGrid.classList.toggle('d-none', visibleCards === 0);
        }
    }

    // Filtro de busca
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            const cards = document.querySelectorAll('.report-card');
            
            clearSearchBtn.classList.toggle('d-none', searchTerm === '');
            
            cards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                card.parentElement.style.display = cardText.includes(searchTerm) ? 'block' : 'none';
            });
            
            updateReportCount();
        });
    }

    // Botão para limpar busca
    if (clearSearchBtn) {
        clearSearchBtn.addEventListener('click', function() {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
            this.classList.add('d-none');
        });
    }

    // Filtro por categoria
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.dataset.category;
            
            // Atualizar estado ativo
            document.querySelectorAll('[data-category].active').forEach(el => el.classList.remove('active'));
            this.classList.add('active');
            
            // Aplicar filtro
            const cards = document.querySelectorAll('[data-category]');
            cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            updateReportCount();
        });
    });

    // Ordenação
    sortOptions.forEach(option => {
        option.addEventListener('click', function(e) {
            e.preventDefault();
            const sortBy = this.dataset.sort;
            const container = reportsGrid;
            const cards = Array.from(container.children);
            
            cards.sort((a, b) => {
                switch(sortBy) {
                    case 'recent':
                        return new Date(b.dataset.date) - new Date(a.dataset.date);
                    case 'popular':
                        return parseInt(b.dataset.popularity) - parseInt(a.dataset.popularity);
                    case 'az':
                        return a.querySelector('.card-title').textContent.localeCompare(
                            b.querySelector('.card-title').textContent
                        );
                    default:
                        return 0;
                }
            });
            
            // Reordenar no DOM
            cards.forEach(card => container.appendChild(card));
        });
    });

    // Alternar entre visualização em grid e lista
    function initViewMode() {
        viewModeBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                viewModeBtns.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                
                if (this.dataset.view === 'list') {
                    reportsGrid.classList.add('list-view');
                } else {
                    reportsGrid.classList.remove('list-view');
                }
            });
        });
    }

    // Resetar filtros
    if (resetFiltersBtn) {
        resetFiltersBtn.addEventListener('click', function() {
            // Resetar busca
            searchInput.value = '';
            clearSearchBtn.classList.add('d-none');
            
            // Resetar categoria
            document.querySelector('[data-category="all"]').click();
            
            // Resetar ordenação (opcional)
            
            // Atualizar contagem
            updateReportCount();
        });
    }

    // Carregar mais relatórios
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            this.innerHTML = '<i class="bi bi-arrow-repeat me-2"></i>Carregando...';
            this.disabled = true;
            
            // Simular carregamento assíncrono
            setTimeout(() => {
                // Aqui você faria uma chamada AJAX para carregar mais itens
                alert('Funcionalidade de carregar mais relatórios seria implementada aqui com uma chamada AJAX');
                
                this.innerHTML = '<i class="bi bi-plus-circle me-2"></i>Carregar Mais Relatórios';
                this.disabled = false;
            }, 1000);
        });
    }

    // Criar novo relatório
    if (createReportBtn) {
        createReportBtn.addEventListener('click', function() {
            // Aqui você pode abrir um modal de criação ou redirecionar
            alert('Funcionalidade de criação de novo relatório seria implementada aqui');
        });
    }

    // Tooltips para elementos interativos
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            trigger: 'hover'
        });
    });
});