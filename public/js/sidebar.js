document.getElementById("sidebar").innerHTML = `
<div class="sidebar d-flex flex-column justify-content-between p-3">
  <div>
    <h4 class="text-center">LOGÍSTICA</h4>

    <a href="home.html"><i class="bi bi-ui-checks-grid me-2"></i>Home</a>

    <!-- Botão do dropdown -->
    <button class="btn text-white w-100 text-start d-flex justify-content-between align-items-center" type="button"
      id="btnSetores">
      <span><i class="bi bi-diagram-3 me-2"></i> Setores</span>
      <i class="bi bi-chevron-down" id="iconeSetores"></i>
    </button>

    <!-- Conteúdo que expande -->
    <div class="collapse mt-2" id="setoresCollapse">
      <a class="d-block ms-3 my-1" href="#estoque">Estoque</a>
      <a class="d-block ms-3 my-1" href="#recebimento">Recebimento</a>
      <a class="d-block ms-3 my-1" href="#expedicao">Expedição</a>
      <a class="d-block ms-3 my-1" href="#transporte">Transporte</a>
      <a class="d-block ms-3 my-1" href="#devolucao">Devoluções</a>
    </div>


    <!-- Botão Importação -->
    <button class="btn text-white w-100 text-start d-flex justify-content-between align-items-center" type="button"
      id="btnImport">
      <span><i class="bi bi-calendar-check me-2"></i> Importação</span>
      <i class="bi bi-chevron-down" id="iconeImport"></i>
    </button>

    <div class="collapse mt-2" id="importCollapse">
      <a class="d-block ms-3 my-1 href=" #" data-bs-toggle="modal" data-bs-target="#modalImport">Agendar
        Importação</a>
      <a class="d-block ms-3 my-1" href="calendar.html">Consulta Programação</a>
    </div>


    <a href="#" data-bs-toggle="modal" data-bs-target="#modalChecklist"><i
        class="bi bi-card-checklist me-2"></i>Checklist</a>
    <a href="#" data-bs-toggle="modal" data-bs-target="#modalRelatorios"><i
        class="bi bi-bar-chart-line me-2"></i>Relatórios</a>
    <a href="#" data-bs-toggle="modal" data-bs-target="#modalSuporte"><i class="bi bi-headset me-2"></i>Suporte</a>
  </div>

  <!-- Perfil -->
  <div class="mt-4 pt-3 border-top text-white small">
    <div class="d-flex align-items-center mb-2">
      <i class="bi bi-person-circle fs-4 me-3"></i>
      <div>
        <div class="fw-bold">Usuário</div>
        <div class="text-primary small" style="font-size: 0.85rem;">usuario@email.com</div>
      </div>
    </div>


    <!-- Botão de Troca de Tema -->
    <div class="d-grid gap-2 mb-2">
      <button id="toggleTheme" class="btn btn-sm btn-outline-light">
        <i class="bi bi-moon-stars"></i> Trocar Tema
      </button>
    </div>

    <div class="d-grid gap-2">
      <button class="btn btn-sm btn-outline-light" onclick="trocarSenha()"><i class="bi bi-key me-1"></i> Trocar
        Senha</button>
      <button class="btn btn-sm btn-outline-light" onclick="trocarConta()"><i class="bi bi-arrow-left-right me-1"></i>
        Trocar Conta</button>
      <button class="btn btn-sm btn-danger" onclick="logout()"><i class="bi bi-box-arrow-right me-1"></i>
        Sair</button>
    </div>
  </div>
</div>

<!-- Modais -->
<!-- Modal -->
<div class="modal fade" id="modalChecklist" tabindex="-1" aria-labelledby="modalChecklistLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">

      <div class="modal-header bg-danger text-white">
        <h5 class="modal-title" id="modalChecklistLabel">Checklist</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>

      <div class="modal-body p-4">
        <div class="container-fluid py-4">

          <div class="card-body">
            <div class="row g-3">
              <!-- Primeira linha -->
              <div class="col-md-4">
                <label class="form-label">Status</label>
                <select class="form-select">
                  <option selected>Selecione</option>
                  <option value="ok">OK</option>
                  <option value="pendente">Pendente</option>
                </select>
              </div>

              <div class="col-md-4">
                <label class="form-label">Período</label>
                <select class="form-select">
                  <option selected>Data de início</option>
                  <option>Data de conclusão</option>
                </select>
              </div>

              <div class="col-md-2">
                <label class="form-label">De</label>
                <input type="date" class="form-control">
              </div>

              <div class="col-md-2">
                <label class="form-label">Até</label>
                <input type="date" class="form-control">
              </div>

              <!-- Segunda linha -->
              <div class="col-md-3">
                <label class="form-label">Processo</label>
                <input type="text" class="form-control">
              </div>

              <div class="col-md-3">
                <label class="form-label">Unidade</label>
                <select class="form-select">
                  <option selected>Selecione</option>
                  <option>Recebimento Inbound</option>
                  <option>Blue</option>
                  <option>Outbound G10</option>
                  <option>CD-ARUANA EXPEDIÇÃO</option>
                  <option>CD-ARUANA RECEBIMENTO</option>
                  <option>Entrega Cliente</option>
                  <option>Expedição Outbound</option>
                  <option>Pós venda DJI</option>
                  <option>WATTS EXPEDIÇÃO</option>
                  <option>WATTS RECEBIMENTO</option>
                </select>
              </div>

              <div class="col-md-3">
                <label class="form-label">Checklist</label>
                <select class="form-select">
                  <option selected>Selecione</option>
                  <option>Checklist Devolução</option>
                  <option>Checklist Inbound</option>
                  <option>Checklist Outbound - Telas</option>
                  <option>Compras Nacionais</option>
                  <option>Outbound G10</option>
                </select>
              </div>

              <div class="col-md-3">
                <label class="form-label">Item</label>
                <input type="text" class="form-control">
              </div>

              <div class="col-md-3">
                <label class="form-label">Usuário</label>
                <select class="form-select">
                  <option selected>Selecione</option>
                  <option>João</option>
                  <option>Maria</option>
                </select>
              </div>
            </div>

            <!-- Botões -->
            <div class="mt-4 text-end">
              <button class="btn btn-outline-secondary me-2" id="btnLimpar">Limpar</button>
              <button class="btn btn-outline-primary me-2" id="btnSalvarFiltrar">Salvar e Filtrar</button>
              <button class="btn btn-primary" id="btnFiltrar">Filtrar</button>
            </div>
          </div>
        </div>

        <!-- RESULTADOS - Começa oculto -->
        <div id="resultadoChecklist" class="card shadow-sm mt-3"
          style="max-height: 75%; overflow: hidden; display: none;">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0">Resultados do Checklist</h5>
          </div>
          <div class="card-body p-0" style="height: 100%; overflow-y: auto;">
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th scope="col">Status</th>
                    <th scope="col">Processo</th>
                    <th scope="col">Unidade</th>
                    <th scope="col">Checklist</th>
                    <th scope="col">Item</th>
                    <th scope="col">Usuário</th>
                    <th scope="col">Data</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><span class="badge bg-success">OK</span></td>
                    <td>Recebimento</td>
                    <td>CD-ARUANA EXPEDIÇÃO</td>
                    <td>Checklist Inbound</td>
                    <td>Item 1</td>
                    <td>João</td>
                    <td>28/04/2025</td>
                    <td>
                      <button class="btn btn-sm btn-primary">Visualizar</button>
                      <button class="btn btn-sm btn-danger">Excluir</button>
                    </td>
                  </tr>
                  <tr>
                    <td><span class="badge bg-success">OK</span></td>
                    <td>Recebimento</td>
                    <td>CD-ARUANA EXPEDIÇÃO</td>
                    <td>Checklist Inbound</td>
                    <td>Item 1</td>
                    <td>João</td>
                    <td>28/04/2025</td>
                    <td>
                      <button class="btn btn-sm btn-primary">Visualizar</button>
                      <button class="btn btn-sm btn-danger">Excluir</button>
                    </td>
                  </tr>
                  <!-- outros resultados -->
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

    </div>
  </div>
</div>


<!-- Modal Relatórios / Dashboards -->
<div class="modal fade" id="modalRelatorios" tabindex="-1" aria-labelledby="modalRelatoriosLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content fullscreen-modal">

      <!-- Header -->
      <div class="modal-header bg-primary text-white">
        <h5 class="modal-title" id="modalRelatoriosLabel">📈 Relatórios e Dashboards</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body p-4">
        <div class="container-fluid">
          <div class="row g-4 justify-content-start">

            <!-- CARD 1 -->
            <div class="col-12 col-md-6 col-lg-4 col-xl-2_4">
              <div class="card shadow-sm h-100">
                <img src="https://etz.com.br/wp-content/uploads/2018/11/Microsoft-Power-BI-ETZ-850x555.png"
                  class="card-img-top img-fluid" style="height:200px; object-fit:cover;" alt="Card 1">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">📊 Indicador 1</h5>
                  <p class="card-text text-muted">Dashboard de performance geral.</p>
                  <a href="#" class="btn btn-primary mt-auto">Ver Detalhes</a>
                </div>
              </div>
            </div>

            <!-- CARD 2 -->
            <div class="col-12 col-md-6 col-lg-4 col-xl-2_4">
              <div class="card shadow-sm h-100">
                <img src="https://etz.com.br/wp-content/uploads/2018/11/Microsoft-Power-BI-ETZ-850x555.png"
                  class="card-img-top img-fluid" style="height:200px; object-fit:cover;" alt="Card 2">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">📈 Indicador 2</h5>
                  <p class="card-text text-muted">Custos por departamento.</p>
                  <a href="#" class="btn btn-secondary mt-auto">Ver Detalhes</a>
                </div>
              </div>
            </div>

            <!-- CARD 3 -->
            <div class="col-12 col-md-6 col-lg-4 col-xl-2_4">
              <div class="card shadow-sm h-100">
                <img src="https://etz.com.br/wp-content/uploads/2018/11/Microsoft-Power-BI-ETZ-850x555.png"
                  class="card-img-top img-fluid" style="height:200px; object-fit:cover;" alt="Card 3">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">📉 Indicador 3</h5>
                  <p class="card-text text-muted">Dados de vendas mensais.</p>
                  <a href="#" class="btn btn-success mt-auto">Ver Detalhes</a>
                </div>
              </div>
            </div>

            <!-- CARD 4 -->
            <div class="col-12 col-md-6 col-lg-4 col-xl-2_4">
              <div class="card shadow-sm h-100">
                <img src="https://etz.com.br/wp-content/uploads/2018/11/Microsoft-Power-BI-ETZ-850x555.png"
                  class="card-img-top img-fluid" style="height:200px; object-fit:cover;" alt="Card 4">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">🧾 Indicador 4</h5>
                  <p class="card-text text-muted">Relatórios de auditoria interna.</p>
                  <a href="#" class="btn btn-danger mt-auto">Ver Detalhes</a>
                </div>
              </div>
            </div>

            <!-- CARD 5 -->
            <div class="col-12 col-md-6 col-lg-4 col-xl-2_4">
              <div class="card shadow-sm h-100">
                <img src="https://etz.com.br/wp-content/uploads/2018/11/Microsoft-Power-BI-ETZ-850x555.png"
                  style="height:200px; object-fit:cover;" alt="Card 5">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">📦 Indicador 5</h5>
                  <p class="card-text text-muted">Controle de estoque em tempo real.</p>
                  <a href="#" class="btn btn-dark mt-auto">Ver Detalhes</a>
                </div>
              </div>
            </div>

            <!-- CARD 6 -->
            <div class="col-12 col-md-6 col-lg-4 col-xl-2_4">
              <div class="card shadow-sm h-100">
                <img src="https://etz.com.br/wp-content/uploads/2018/11/Microsoft-Power-BI-ETZ-850x555.png"
                  class="card-img-top img-fluid" style="height:200px; object-fit:cover;" alt="Card 6">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">🚚 Indicador 6</h5>
                  <p class="card-text text-muted">Fluxo de transporte e entregas.</p>
                  <a href="#" class="btn btn-warning mt-auto">Ver Detalhes</a>
                </div>
              </div>
            </div>

            <!-- CARD 7 -->
            <div class="col-12 col-md-6 col-lg-4 col-xl-2_4">
              <div class="card shadow-sm h-100">
                <img src="https://etz.com.br/wp-content/uploads/2018/11/Microsoft-Power-BI-ETZ-850x555.png"
                  class="card-img-top img-fluid" style="height:200px; object-fit:cover;" alt="Card 7">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">🛻 Indicador 7</h5>
                  <p class="card-text text-muted">Roteirização de frotas.</p>
                  <a href="#" class="btn btn-info mt-auto">Ver Detalhes</a>
                </div>
              </div>
            </div>

            <!-- CARD 8 -->
            <div class="col-12 col-md-6 col-lg-4 col-xl-2_4">
              <div class="card shadow-sm h-100">
                <img src="https://etz.com.br/wp-content/uploads/2018/11/Microsoft-Power-BI-ETZ-850x555.png"
                  class="card-img-top img-fluid" style="height:200px; object-fit:cover;" alt="Card 8">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">📊 Indicador 8</h5>
                  <p class="card-text text-muted">Comparativo de produção.</p>
                  <a href="#" class="btn btn-primary mt-auto">Ver Detalhes</a>
                </div>
              </div>
            </div>

            <!-- CARD 9 -->
            <div class="col-12 col-md-6 col-lg-4 col-xl-2_4">
              <div class="card shadow-sm h-100">
                <img src="https://etz.com.br/wp-content/uploads/2018/11/Microsoft-Power-BI-ETZ-850x555.png"
                  class="card-img-top img-fluid" style="height:200px; object-fit:cover;" alt="Card 9">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">💼 Indicador 9</h5>
                  <p class="card-text text-muted">Resumo financeiro mensal.</p>
                  <a href="#" class="btn btn-secondary mt-auto">Ver Detalhes</a>
                </div>
              </div>
            </div>

            <!-- CARD 10 -->
            <div class="col-12 col-md-6 col-lg-4 col-xl-2_4">
              <div class="card shadow-sm h-100">
                <img src="https://etz.com.br/wp-content/uploads/2018/11/Microsoft-Power-BI-ETZ-850x555.png"
                  class="card-img-top img-fluid" style="height:200px; object-fit:cover;" alt="Card 10">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">📦 Indicador 10</h5>
                  <p class="card-text text-muted">Armazenamento por setor.</p>
                  <a href="#" class="btn btn-success mt-auto">Ver Detalhes</a>
                </div>
              </div>
            </div>

            <!-- CARD 11 -->
            <div class="col-12 col-md-6 col-lg-4 col-xl-2_4">
              <div class="card shadow-sm h-100">
                <img src="https://etz.com.br/wp-content/uploads/2018/11/Microsoft-Power-BI-ETZ-850x555.png"
                  class="card-img-top img-fluid" style="height:200px; object-fit:cover;" alt="Card 11">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">📋 Indicador 11</h5>
                  <p class="card-text text-muted">Checklist de conformidade.</p>
                  <a href="#" class="btn btn-danger mt-auto">Ver Detalhes</a>
                </div>
              </div>
            </div>

            <!-- CARD 12 -->
            <div class="col-12 col-md-6 col-lg-4 col-xl-2_4">
              <div class="card shadow-sm h-100">
                <img src="https://etz.com.br/wp-content/uploads/2018/11/Microsoft-Power-BI-ETZ-850x555.png"
                  class="card-img-top img-fluid" style="height:200px; object-fit:cover;" alt="Card 12">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">📎 Indicador 12</h5>
                  <p class="card-text text-muted">Relatório de não conformidades.</p>
                  <a href="#" class="btn btn-dark mt-auto">Ver Detalhes</a>
                </div>
              </div>
            </div>

            <!-- CARD 13 -->
            <div class="col-12 col-md-6 col-lg-4 col-xl-2_4">
              <div class="card shadow-sm h-100">
                <img src="https://etz.com.br/wp-content/uploads/2018/11/Microsoft-Power-BI-ETZ-850x555.png"
                  class="card-img-top img-fluid" style="height:200px; object-fit:cover;" alt="Card 13">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">🧪 Indicador 13</h5>
                  <p class="card-text text-muted">Monitoramento de qualidade.</p>
                  <a href="#" class="btn btn-warning mt-auto">Ver Detalhes</a>
                </div>
              </div>
            </div>

            <!-- CARD 14 -->
            <div class="col-12 col-md-6 col-lg-4 col-xl-2_4">
              <div class="card shadow-sm h-100">
                <img src="https://etz.com.br/wp-content/uploads/2018/11/Microsoft-Power-BI-ETZ-850x555.png"
                  class="card-img-top img-fluid" style="height:200px; object-fit:cover;" alt="Card 14">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">📠 Indicador 14</h5>
                  <p class="card-text text-muted">Documentação automatizada.</p>
                  <a href="#" class="btn btn-info mt-auto">Ver Detalhes</a>
                </div>
              </div>
            </div>

            <!-- CARD 15 -->
            <div class="col-12 col-md-6 col-lg-4 col-xl-2_4">
              <div class="card shadow-sm h-100">
                <img src="https://etz.com.br/wp-content/uploads/2018/11/Microsoft-Power-BI-ETZ-850x555.png"
                  class="card-img-top img-fluid" style="height:200px; object-fit:cover;" alt="Card 15">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">📂 Indicador 15</h5>
                  <p class="card-text text-muted">Arquivamento e histórico.</p>
                  <a href="#" class="btn btn-primary mt-auto">Ver Detalhes</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Modal Suporte -->
<div class="modal fade" id="modalSuporte" tabindex="-1" aria-labelledby="modalSuporteLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content border-0 shadow">

      <!-- Header -->
      <div class="modal-header bg-dark text-white">
        <h5 class="modal-title" id="modalSuporteLabel">📞 Suporte & Feedback</h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
      </div>

      <!-- Body -->
      <div class="modal-body">
        <form id="formSuporte" class="needs-validation" novalidate>
          <!-- Tipo de solicitação -->
          <div class="mb-3">
            <label for="tipoSolicitacao" class="form-label fw-semibold">Tipo de Solicitação</label>
            <select class="form-select" id="tipoSolicitacao" required>
              <option value="" disabled selected>Selecione uma opção</option>
              <option value="erro">Erro no sistema</option>
              <option value="duvida">Dúvida de uso</option>
              <option value="sugestao">Sugestão de melhoria</option>
              <option value="elogio">Elogio</option>
              <option value="outro">Outro</option>
            </select>
            <div class="invalid-feedback">Por favor, selecione uma opção.</div>
          </div>

          <!-- Assunto -->
          <div class="mb-3">
            <label for="assunto" class="form-label fw-semibold">Assunto</label>
            <input type="text" class="form-control" id="assunto" placeholder="Ex: Problema ao agendar importação"
              required>
            <div class="invalid-feedback">Descreva o assunto.</div>
          </div>

          <!-- Descrição detalhada -->
          <div class="mb-3">
            <label for="descricao" class="form-label fw-semibold">Descrição Detalhada</label>
            <textarea class="form-control" id="descricao" rows="4"
              placeholder="Descreva detalhadamente o ocorrido ou sua sugestão..." required></textarea>
            <div class="invalid-feedback">Preencha com mais detalhes.</div>
          </div>

          <!-- Urgência -->
          <div class="mb-3">
            <label for="urgencia" class="form-label fw-semibold">Nível de Urgência</label>
            <select class="form-select" id="urgencia" required>
              <option value="" disabled selected>Selecione</option>
              <option value="baixa">Baixa (Pode esperar)</option>
              <option value="media">Média (Importante)</option>
              <option value="alta">Alta (Crítico ou impede operação)</option>
            </select>
            <div class="invalid-feedback">Informe a urgência.</div>
          </div>

          <!-- Feedback de usabilidade -->
          <div class="mb-3">
            <label class="form-label fw-semibold">Como você avalia a usabilidade da plataforma?</label>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="usabilidade" value="excelente" required>
              <label class="form-check-label">Excelente</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="usabilidade" value="boa">
              <label class="form-check-label">Boa</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="usabilidade" value="regular">
              <label class="form-check-label">Regular</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="usabilidade" value="ruim">
              <label class="form-check-label">Ruim</label>
            </div>
            <div class="invalid-feedback">Selecione uma opção.</div>
          </div>

          <!-- Deseja ser contatado -->
          <div class="mb-3">
            <label class="form-label fw-semibold">Deseja receber retorno?</label>
            <select class="form-select" id="retorno" required>
              <option value="" disabled selected>Escolha uma opção</option>
              <option value="email">Sim, por e-mail</option>
              <option value="telefone">Sim, por telefone</option>
              <option value="nao">Não é necessário</option>
            </select>
          </div>

          <!-- E-mail -->
          <div class="mb-3" id="emailContainer" style="display: none;">
            <label for="email" class="form-label fw-semibold">Seu E-mail</label>
            <input type="email" class="form-control" id="email" placeholder="exemplo@empresa.com">
          </div>

          <!-- Telefone -->
          <div class="mb-3" id="telContainer" style="display: none;">
            <label for="tel" class="form-label fw-semibold">Seu Telefone</label>
            <input type="tel" class="form-control" id="tel" placeholder="(00) 0 0000-0000">
          </div>

          <!-- Botão -->
          <div class="text-end mt-4">
            <button type="submit" class="btn btn-primary">
              <i class="bi bi-send"></i> Enviar
            </button>
          </div>
        </form>
      </div>

    </div>
  </div>
</div>

<!-- Modal Agendar Importação -->
<div class="modal fade" id="modalImport" tabindex="-1" aria-labelledby="modalImportLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content rounded-4 shadow-lg border-0">
      <!-- Header -->
      <div class="modal-header bg-primary text-white rounded-top-4 px-4 py-3">
        <h5 class="modal-title d-flex align-items-center gap-2" id="modalImportLabel">
          📦 Agendamento de Importação
        </h5>
        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Fechar"></button>
      </div>

      <!-- Body -->
      <div class="modal-body">
        <h4 class="text-center fw-semibold text-primary mb-4">📋 Formulário de Agendamento</h4>

        <!-- Horários -->
        <section class="mb-4">
          <h6 class="fw-bold mb-2 text-secondary">⏰ Horários Disponíveis</h6>
          <div class="table-wrapper">
            <table class="table table-bordered text-center align-middle mb-0">
              <thead class="table">
                <tr>
                  <th>08:00</th>
                  <th>11:00</th>
                  <th>14:00</th>
                  <th>18:00</th>
                  <th>22:00</th>
                  <th>23:00</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody id="tabelaHorarios">
                <!-- preenchido via JS -->
              </tbody>
            </table>
          </div>
        </section>

        <!-- Formulário -->
        <form id="formInserir">
          <div class="row g-3 align-items-end">
            <div class="col-md-4">
              <label for="horario" class="form-label">Horário</label>
              <select class="form-select shadow-sm" id="horario" name="horario" required>
                <option value="" selected disabled hidden>Selecione um horário</option>
                <option>08:00</option>
                <option>11:00</option>
                <option>14:00</option>
                <option>18:00</option>
                <option>22:00</option>
                <option>23:00</option>
              </select>
            </div>

            <div class="col-md-5">
              <label for="processo" class="form-label">Processo</label>
              <textarea class="form-control shadow-sm" id="processo" name="processo" rows="1"
                placeholder="Digite o processo..." required></textarea>
            </div>

            <div class="col-md-3 d-grid">
              <button type="button" class="btn btn-primary shadow-sm" id="btnInserir">
                <i class="fas fa-plus-circle me-2"></i> Inserir
              </button>
            </div>
          </div>
        </form>

        <!-- Tabela de Processos -->
        <section class="mt-5">
          <h6 class="fw-bold mb-2 text-secondary">📑 Processos Agendados</h6>
          <div class="table-wrapper">
            <table class="table table-bordered text-center align-middle mb-0">
              <thead class="table">
                <tr>
                  <th>Horário</th>
                  <th>Processo</th>
                  <th>Complexidade</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody id="tabelaProcessos">
                <!-- preenchido via JS -->
              </tbody>
            </table>
          </div>
        </section>

        <!-- Botões finais -->
        <div class="d-flex flex-column flex-md-row gap-3 mt-4">
          <button type="button" class="btn btn-outline-danger w-100 shadow-sm" id="btnExcluirTudo">
            <i class="fas fa-trash-alt me-2"></i> Excluir Tudo
          </button>

          <button type="button" class="btn btn-success w-100 shadow-sm" id="btnEnviar">
            <i class="fas fa-file-export me-2"></i> Enviar para Planilha
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

`;

setTimeout(() => {
const toggleBtn = document.getElementById('toggleTheme');

const html = document.documentElement;
const temaSalvo = localStorage.getItem('tema');

// Aplica o tema salvo no carregamento da página
if (temaSalvo) {
html.setAttribute('data-bs-theme', temaSalvo);
if (toggleBtn) {
toggleBtn.innerHTML = `<i class="bi bi-${temaSalvo === 'light' ? 'moon-stars' : 'sun'}"></i> Trocar Tema`;
}
}

if (toggleBtn) {
toggleBtn.addEventListener('click', () => {
const temaAtual = html.getAttribute('data-bs-theme');
const novoTema = temaAtual === 'light' ? 'dark' : 'light';

html.setAttribute('data-bs-theme', novoTema);
localStorage.setItem('tema', novoTema); // Salva o novo tema

toggleBtn.innerHTML = `<i class="bi bi-${novoTema === 'light' ? 'moon-stars' : 'sun'}"></i> Trocar Tema`;

// Ajuste de classe opcional (se seu botão precisa disso)
toggleBtn.classList.remove('btn-outline-dark', 'btn-outline-light');
toggleBtn.classList.add(novoTema === 'light' ? 'btn-outline-dark' : 'btn-outline-light');
});
}


// Controle do botão Setores
const setoresCollapse = document.getElementById('setoresCollapse');
const iconSetores = document.getElementById('iconeSetores');
const bsSetores = new bootstrap.Collapse(setoresCollapse, { toggle: false });

setoresCollapse.addEventListener('show.bs.collapse', () => {
iconSetores.classList.remove('bi-chevron-down');
iconSetores.classList.add('bi-chevron-up');
iconSetores.style.transition = 'transform 0.3s ease';
iconSetores.style.transform = 'rotate(360deg)';
});

setoresCollapse.addEventListener('hide.bs.collapse', () => {
iconSetores.classList.remove('bi-chevron-up');
iconSetores.classList.add('bi-chevron-down');
iconSetores.style.transition = 'transform 0.3s ease';
iconSetores.style.transform = 'rotate(0deg)';
});

document.getElementById('btnSetores').addEventListener('click', () => {
bsSetores.toggle();
});


// Controle do botão Importação
const importCollapse = document.getElementById('importCollapse');
const iconImport = document.getElementById('iconeImport');
const bsImport = new bootstrap.Collapse(importCollapse, { toggle: false });

importCollapse.addEventListener('show.bs.collapse', () => {
iconImport.classList.remove('bi-chevron-down');
iconImport.classList.add('bi-chevron-up');
iconImport.style.transition = 'transform 0.3s ease';
iconImport.style.transform = 'rotate(360deg)';
});

importCollapse.addEventListener('hide.bs.collapse', () => {
iconImport.classList.remove('bi-chevron-up');
iconImport.classList.add('bi-chevron-down');
iconImport.style.transition = 'transform 0.3s ease';
iconImport.style.transform = 'rotate(0deg)';
});

document.getElementById('btnImport').addEventListener('click', () => {
bsImport.toggle();
});

}, 100);

document.addEventListener('DOMContentLoaded', () => {
const retorno = document.getElementById('retorno');
const emailContainer = document.getElementById('emailContainer');
const telContainer = document.getElementById('telContainer');
const emailInput = document.getElementById('email');
const telInput = document.getElementById('tel');

retorno.addEventListener('change', () => {
const valor = retorno.value;

emailContainer.style.display = valor === 'email' ? 'block' : 'none';
telContainer.style.display = valor === 'telefone' ? 'block' : 'none';

if (valor === 'email') {
emailInput.setAttribute('required', 'required');
telInput.removeAttribute('required');
} else if (valor === 'telefone') {
telInput.setAttribute('required', 'required');
emailInput.removeAttribute('required');
} else {
emailInput.removeAttribute('required');
telInput.removeAttribute('required');
}
});

// Validação do formulário
const form = document.getElementById('formSuporte');
form.addEventListener('submit', function (e) {
if (!form.checkValidity()) {
e.preventDefault();
e.stopPropagation();
}
form.classList.add('was-validated');
});
});

// CHECKLIST

// Botão Filtrar
document.getElementById('btnFiltrar').addEventListener('click', function() {
document.getElementById('resultadoChecklist').style.display = 'block';
});

// Botão Salvar e Filtrar
document.getElementById('btnSalvarFiltrar').addEventListener('click', function() {
document.getElementById('resultadoChecklist').style.display = 'block';
});

// Opcional: Botão Limpar para esconder de novo (se quiser)
document.getElementById('btnLimpar').addEventListener('click', function() {
document.getElementById('resultadoChecklist').style.display = 'none';
});