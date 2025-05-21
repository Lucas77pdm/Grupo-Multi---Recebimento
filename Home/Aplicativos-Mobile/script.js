// ========== GERAR ITENS DO CHECKLIST DINAMICAMENTE ==========
const checklist = document.getElementById('checklist');

const items = [
{ id: '#12754821', date: '26/04/2025', status: 'red' },
{ id: '#12754822', date: '26/04/2025', status: 'green' },
{ id: '#12754823', date: '26/04/2025', status: 'green' },
{ id: '#12754824', date: '26/04/2025', status: 'red' },
{ id: '#12754825', date: '26/04/2025', status: 'green' },
{ id: '#12754826', date: '26/04/2025', status: 'red' },
{ id: '#12754827', date: '26/04/2025', status: 'green' },
{ id: '#12754828', date: '26/04/2025', status: 'red' },
{ id: '#12754829', date: '26/04/2025', status: 'red' },
{ id: '#12754830', date: '26/04/2025', status: 'red' },
{ id: '#12754831', date: '26/04/2025', status: 'red' },
{ id: '#12754832', date: '26/04/2025', status: 'red' },
{ id: '#12754833', date: '26/04/2025', status: 'red' },
{ id: '#12754834', date: '26/04/2025', status: 'red' },
];

items.forEach(item => {
const div = document.createElement('div');
div.className = 'checklist-item d-flex align-items-center';

const status = document.createElement('div');
status.className = 'status-indicator';
status.style.backgroundColor = item.status === 'red' ? '#e63946' : '#2a9d8f';

const info = document.createElement('div');
info.className = 'item-info d-flex flex-column';
info.innerHTML = `
<span class="item-number">${item.id}</span>
<span class="item-date">${item.date}</span>
`;

const arrow = document.createElement('div');
arrow.className = 'arrow-icon';
arrow.innerHTML = '<i class="bi bi-chevron-right"></i>';

div.appendChild(status);
div.appendChild(info);
div.appendChild(arrow);

checklist.appendChild(div);

div.addEventListener('click', () => {
document.getElementById('modal-id').textContent = item.id;
document.getElementById('modal-date').textContent = item.date;

const statusSpan = document.getElementById('modal-status');
statusSpan.textContent = item.status === 'green' ? 'Aprovado' : 'Reprovado';

statusSpan.classList.remove('bg-success', 'bg-danger');
statusSpan.classList.add('badge', 'rounded-pill');
statusSpan.classList.add(item.status === 'green' ? 'bg-success' : 'bg-danger');

const modal = new bootstrap.Modal(document.getElementById('checklistModal'));
modal.show();
});
});




function mostrarChecklist() {
const tipo = document.getElementById("tipoChecklist").value;
const container = document.getElementById("formChecklistContainer");

let html = "";

switch (tipo) {
case "importacao":
html = `
<h5>Checklist de Importação</h5>

<!-- Nome do Motorista -->
<div class="mb-3">
  <label class="form-label">Motorista:</label>
  <select id="selectMotorista" class="form-select" onchange="preencherCamposImportacao()">
    <option value="">Selecione o motorista</option>
    <option value="12345|Carlos da Silva|ABC-1234">Carlos da Silva</option>
    <option value="67890|Maria Souza|XYZ-5678">Maria Souza</option>
  </select>
</div>

<!-- Transportadora -->
<div class="mb-3">
  <label class="form-label">Transportadora:</label>
  <input type="text" id="transportadora" class="form-control" disabled>
</div>

<!-- Número do Processo -->
<div class="mb-3">
  <label class="form-label">Número do processo:</label>
  <input type="text" id="numeroProcesso" class="form-control" disabled>
</div>

<!-- Anexar Fotos (etapas) -->
<div class="mb-3">
  <label class="form-label">Anexar fotos - início do carregamento:</label>
  <input type="file" accept="image/*" capture="environment" class="form-control" multiple>
</div>

<div class="mb-3">
  <label class="form-label">Anexar fotos - 50% do carregamento:</label>
  <input type="file" accept="image/*" capture="environment" class="form-control" multiple>
</div>

<div class="mb-3">
  <label class="form-label">Anexar fotos - término do carregamento:</label>
  <input type="file" accept="image/*" capture="environment" class="form-control" multiple>
</div>

<div class="mb-3">
  <label class="form-label">Anexar fotos - descarregado no BUFFER:</label>
  <input type="file" accept="image/*" capture="environment" class="form-control" multiple>
</div>

<!-- Houve Avaria? -->
<div class="mb-3">
  <label class="form-label">Houve alguma avaria?</label>
  <select id="houveAvaria" class="form-select" onchange="mostrarCamposAvaria()">
    <option value="">Selecione</option>
    <option value="sim">Sim</option>
    <option value="nao">Não</option>
  </select>
</div>

<!-- Seção de Avarias (inicialmente oculta) -->
<div id="secaoAvarias" style="display: none;">
  <div class="mb-3">
    <label class="form-label">Qual foi a avaria?</label><br>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="molhadas" id="avariaMolhadas">
      <label class="form-check-label" for="avariaMolhadas">Molhadas</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="rasgadas" id="avariaRasgadas">
      <label class="form-check-label" for="avariaRasgadas">Rasgadas</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="amassadas" id="avariaAmassadas">
      <label class="form-check-label" for="avariaAmassadas">Amassadas</label>
    </div>
    <div class="form-check">
      <input class="form-check-input" type="checkbox" value="outras" id="avariaOutras">
      <label class="form-check-label" for="avariaOutras">Outras</label>
    </div>
  </div>

  <div class="mb-3">
    <label class="form-label">Anexar fotos das avarias:</label>
    <input type="file" accept="image/*" capture="environment" class="form-control" multiple>
  </div>

  <div class="mb-3">
    <label class="form-label">Códigos e quantidades dos materiais avariados:</label>
    <textarea class="form-control" rows="3" placeholder="Ex: Código XYZ123 - 5 unidades danificadas"></textarea>
  </div>
</div>

<!-- Assinatura -->
<div class="mb-3">
  <label class="form-label">Assinatura:</label>
  <canvas id="assinaturaImportacao" class="border" width="320" height="150"></canvas>
</div>
`;
break;

case "transferencia":
html = `
<h5>Checklist de Transferência</h5>

<!-- Motorista -->
<div class="mb-3">
  <label class="form-label">Motorista:</label>
  <select id="selectMotorista" class="form-select" onchange="preencherCamposTransferencia()">
    <option value="">Selecione o motorista</option>
    <option value="12345|Carlos da Silva|ABC-1234|DEF-5678">Carlos da Silva</option>
    <option value="67890|Maria Souza|XYZ-5678|GHI-9012">Maria Souza</option>
    <!-- Mais opções podem ser adicionadas -->
  </select>
</div>

<!-- Transportadora -->
<div class="mb-3">
  <label class="form-label">Transportadora:</label>
  <input type="text" id="transportadora" class="form-control" disabled>
</div>

<!-- Placa da Carreta -->
<div class="mb-3">
  <label class="form-label">Placa da carreta:</label>
  <input type="text" id="placaCarreta" class="form-control" disabled>
</div>

<!-- Placa do Cavalo -->
<div class="mb-3">
  <label class="form-label">Placa do cavalo:</label>
  <input type="text" id="placaCavalo" class="form-control" disabled>
</div>

<!-- Ordem de Coleta -->
<div class="mb-3">
  <label class="form-label">Ordem de Coleta:</label>
  <input type="text" class="form-control">
</div>

<!-- Modelo / Polegada -->
<div class="mb-3">
  <label class="form-label">Modelo (Polegada) carregado:</label>
  <input type="text" class="form-control" placeholder="Ex: 32”, 43”, 50” etc.">
</div>

<!-- Código e Quantidade -->
<div class="mb-3">
  <label class="form-label">Código das telas carregadas:</label>
  <textarea class="form-control" placeholder="Ex: MOD12345"></textarea>
</div>

<!-- Quantidade total -->
<div class="mb-3">
  <label class="form-label">Quantidade de telas carregadas:</label>
  <input type="number" class="form-control">
</div>

<!-- Conferência de Integridade -->
<div class="mb-3">
  <label class="form-label">Conferência de integridade:</label>
  <textarea class="form-control"></textarea>
</div>

<!-- Fotos do Container -->
<div class="mb-3">
  <label class="form-label">Foto do container fechado (antes do carregamento):</label>
  <input type="file" accept="image/*" capture="environment" class="form-control" multiple>
</div>

<div class="mb-3">
  <label class="form-label">Foto do início do carregamento:</label>
  <input type="file" accept="image/*" capture="environment" class="form-control" multiple>
</div>

<div class="mb-3">
  <label class="form-label">Foto com 50% do carregamento:</label>
  <input type="file" accept="image/*" capture="environment" class="form-control" multiple>
</div>

<div class="mb-3">
  <label class="form-label">Foto do término do carregamento:</label>
  <input type="file" accept="image/*" capture="environment" class="form-control" multiple>
</div>

<div class="mb-3">
  <label class="form-label">Foto do container lacrado após carregamento:</label>
  <input type="file" accept="image/*" capture="environment" class="form-control" multiple>
</div>

<div class="mb-3">
  <label class="form-label">Foto do lacre:</label>
  <input type="file" accept="image/*" capture="environment" class="form-control" multiple>
</div>

<div class="mb-3">
  <label class="form-label">Foto da Nota Fiscal (NF):</label>
  <input type="file" accept="image/*" capture="environment" class="form-control" multiple>
</div>

<!-- Assinatura -->
<div class="mb-3">
  <label class="form-label">Assinatura:</label>
  <canvas id="assinaturaTransferencia" class="border" width="320" height="150"></canvas>
</div>
`;
break;

case "devolucao":
html = `
<h5>Checklist de Devolução</h5>

<!-- Seleção do motorista -->
<div class="mb-3">
  <label class="form-label">Motorista:</label>
  <select id="selectMotorista" class="form-select" onchange="preencherCamposDevolucao()">
    <option value="">Selecione o motorista</option>
    <option value="12345|Transportadora Rápida|ABC-1234|DEF-5678">Carlos da Silva</option>
    <option value="67890|Transportes União|XYZ-5678|GHI-9012">Maria Souza</option>
    <!-- Mais opções podem ser adicionadas -->
  </select>
</div <!-- Dados preenchidos automaticamente -->
<div class="mb-3">
  <label class="form-label">Transportadora:</label>
  <input type="text" id="transportadora" class="form-control" disabled>
</div>
<div class="mb-3">
  <label class="form-label">Placa da carreta:</label>
  <input type="text" id="placaCarreta" class="form-control" disabled>
</div>
<div class="mb-3">
  <label class="form-label">Placa do cavalo:</label>
  <input type="text" id="placaCavalo" class="form-control" disabled>
</div>

<!-- Dados específicos da devolução -->
<div class="mb-3"> <label class="form-label">Nome do conferente:</label>
  <select class="form-select"">
    <option value="">Selecione o Conferente responsável</option>
    <option>Carlos da Silva</option>
    <option>Maria Souza</option>
  </select>
  </div>
<div class="mb-3"><label class="form-label">Motivo da devolução:</label><textarea class="form-control"></textarea></div>
<div class="mb-3"><label class="form-label">Condições do produto:</label><textarea class="form-control"></textarea>
</div>

<!-- Fotos obrigatórias -->
<div class="mb-3"><label class="form-label">Foto da doca onde está sendo feita a devolução:</label><input type="file"
    accept="image/*" class="form-control"></div>
<div class="mb-3"><label class="form-label">Imagens da abertura do veículo:</label><input type="file" accept="image/*"
    class="form-control" multiple></div>
<div class="mb-3"><label class="form-label">Imagens após a devolução da mercadoria:</label><input type="file"
    accept="image/*" class="form-control" multiple></div>
<div class="mb-3"><label class="form-label">Imagens da mercadoria no buffer:</label><input type="file" accept="image/*"
    class="form-control" multiple></div>

<!-- Paletização -->
<div class="mb-3">
  <label class="form-label">A carga é paletizada?</label><br>
  <div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="paletizada"
      value="sim"><label class="form-check-label">Sim</label></div>
  <div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="paletizada"
      value="nao"><label class="form-check-label">Não</label></div>
</div>

<!-- Paletes tombados -->
<div class="mb-3">
  <label class="form-label">Possui paletes tombados?</label><br>
  <div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="tombados"
      value="sim"><label class="form-check-label">Sim</label></div>
  <div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="tombados"
      value="nao"><label class="form-check-label">Não</label></div>
</div>

<!-- Divergência de quantidade -->
<div class="mb-3">
  <label class="form-label">Houve falta ou sobra?</label><br>
  <div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="faltaSobra" value="sim"
      onclick="document.getElementById('divergenciaInfo').style.display='block'"><label
      class="form-check-label">Sim</label></div>
  <div class="form-check form-check-inline"><input class="form-check-input" type="radio" name="faltaSobra" value="nao"
      onclick="document.getElementById('divergenciaInfo').style.display='none'"><label
      class="form-check-label">Não</label></div>
</div>
<div id="divergenciaInfo" style="display:none">
  <div class="mb-3"><label class="form-label">Descreva a divergência (códigos, quantidades etc):</label><textarea
      class="form-control"></textarea></div>
  <div class="mb-3"><label class="form-label">Fotos da divergência:</label><input type="file" accept="image/*"
      class="form-control" multiple></div>
</div>

<!-- Avaliação da transportadora -->
<h6 class="mt-4">Avaliação da Transportadora</h6>
<div class="mb-3"><label class="form-label">Pontualidade:</label><input type="range" class="form-range" min="1" max="5">
</div>
<div class="mb-3"><label class="form-label">Paletização:</label><input type="range" class="form-range" min="1" max="5">
</div>
<div class="mb-3"><label class="form-label">Organização dos documentos:</label><input type="range" class="form-range"
    min="1" max="5"></div>
<div class="mb-3"><label class="form-label">Identificação dos volumes:</label><input type="range" class="form-range"
    min="1" max="5"></div>
<div class="mb-3"><label class="form-label">Acompanhamento do conferente:</label><input type="range" class="form-range"
    min="1" max="5"></div>
<div class="mb-3"><label class="form-label">Devolução recebida em sua totalidade?</label><input type="range"
    class="form-range" min="1" max="5"></div>

<!-- Assinatura -->
<div class="mb-3"><label class="form-label">Assinatura do responsável:</label><canvas id="assinaturaDevolucao"
    class="border" width="320" height="150"></canvas></div>
`;
break;

case "compras":
html = `
<h5>Checklist de Compras</h5>

<!-- Motorista -->

<!-- Conferente e Transportadora -->
<div class="mb-3"><label class="form-label">Conferente responsável:</label><input type="text" class="form-control"></div>
<div class="mb-3"><label class="form-label">Transportadora:</label><input type="text" class="form-control"></div>

<!-- Imagens -->
<div class="mb-3"><label class="form-label">Imagem da doca onde está descarregando:</label><input type="file" accept="image/*" class="form-control"></div>
<div class="mb-3"><label class="form-label">Imagem da abertura do veículo:</label><input type="file" accept="image/*" class="form-control"></div>
<div class="mb-3"><label class="form-label">Imagem do início da carga após a abertura:</label><input type="file" accept="image/*" class="form-control"></div>

<div class="mb-3">
 <label class="form-label">A carga é paletizada?</label>
    <select class="form-select">
    <option value="">Selecione</option>
    <option>Sim</option>
    <option>Não</option>
  </select>
</div>

<div class="mb-3">
 <label class="form-label">Possui pallets tombados?</label>
   <select class="form-select">
    <option value="">Selecione</option>
    <option>Sim</option>
    <option>Não</option>
  </select>
</div>

<!-- Notas tipo devolução -->
<div class="mb-3">
  <label class="form-label">As caixas estão em boas condições?</label>
  <select class="form-select">
    <option value="">Selecione</option>
    <option>Sim</option>
    <option>Não</option>
  </select>
</div>
<div class="mb-3">
  <label class="form-label">As caixas estão devidamente identificadas?</label>
  <select class="form-select">
    <option value="">Selecione</option>
    <option>Sim</option>
    <option>Não</option>
  </select>
</div>
<div class="mb-3">
  <label class="form-label">Produto tem aderência à cinta?</label>
  <select class="form-select">
    <option value="">Selecione</option>
    <option>Sim</option>
    <option>Não</option>
  </select>
</div>

<!-- Pallets no buffer -->
<div class="mb-3"><label class="form-label">Imagens dos pallets descarregados no buffer:</label><input type="file" accept="image/*" multiple class="form-control"></div>

<!-- Divergência -->
<div class="mb-3">
  <label class="form-label">Possui falta ou sobra?</label>
  <select class="form-select" id="possuiDivergencia" onchange="mostrarCamposDivergencia(this.value)">
    <option value="">Selecione</option>
    <option value="Sim">Sim</option>
    <option value="Não">Não</option>
  </select>
</div>
<div id="divergenciaCampos" style="display: none;">
  <div class="mb-3"><label class="form-label">Código do item:</label><input type="text" class="form-control"></div>
  <div class="mb-3"><label class="form-label">Quantidade divergente:</label><input type="number" class="form-control"></div>
</div>

<!-- Documentação -->
<div class="mb-3"><label class="form-label">Imagens da documentação assinada:</label><input type="file" accept="image/*" multiple class="form-control"></div>

<!-- Assinatura -->
<div class="mb-3"><label class="form-label">Assinatura do conferente:</label><canvas id="assinaturaCompras" class="border" width="320" height="150"></canvas></div>
`;
break;

default:
html = "";
}

container.innerHTML = html;
}

// ========== MOSTRAR CAMPO DE AVARIAS DO CHECKLIST DE IMPORTAÇÃO ==========

function mostrarCamposAvaria() {
const select = document.getElementById("houveAvaria");
const secao = document.getElementById("secaoAvarias");
secao.style.display = (select.value === "sim") ? "block" : "none";
}

function mostrarCamposDivergencia(valor) {
  const campos = document.getElementById("divergenciaCampos");
  campos.style.display = (valor === "Sim") ? "block" : "none";
}

// ========== TEMA ==========
function toggleTheme() {
document.body.classList.toggle('dark-mode');
}

// ========== PREENCHIMENTO DE CAMPOS ==========
function preencherCamposImportacao() {
const valor = document.getElementById("selectMotorista").value;
const [id, nome, placa] = valor.split("|");

// Preenchendo os campos automaticamente
document.getElementById("transportadora").value = "Transportadora XYZ"; // Exemplo de transportadora
document.getElementById("numeroProcesso").value = id; // O número do processo pode ser preenchido com o ID ou outro
valor
}

function preencherCamposTransferencia() {
const select = document.getElementById("selectMotorista");
const value = select.value;
const [id, nome, carreta, cavalo] = value.split("|");

document.getElementById("transportadora").value = nome;
document.getElementById("placaCarreta").value = carreta;
document.getElementById("placaCavalo").value = cavalo;
}

function preencherCamposDevolucao() {
const select = document.getElementById("selectMotorista");
const value = select.value;

if (value) {
const [id, transportadora, carreta, cavalo] = value.split("|");

document.getElementById("transportadora").value = transportadora;
document.getElementById("placaCarreta").value = carreta;
document.getElementById("placaCavalo").value = cavalo;
} else {
document.getElementById("transportadora").value = "";
document.getElementById("placaCarreta").value = "";
document.getElementById("placaCavalo").value = "";
}
}


// ========== AVARIAS ==========
function toggleAvariaDetails(value) {
const detalhes = document.getElementById("avaria-details");
const foto = document.getElementById("fotoAvaria");
const descricao = document.getElementById("descricaoAvaria");

if (value === "sim") {
detalhes.style.display = "block";
foto.required = true;
descricao.required = true;
} else {
detalhes.style.display = "none";
foto.required = false;
descricao.required = false;
foto.value = "";
descricao.value = "";
}
}

// ========== ASSINATURA ==========
function isCanvasBlank(canvas) {
const blank = document.createElement('canvas');
blank.width = canvas.width;
blank.height = canvas.height;
return canvas.toDataURL() === blank.toDataURL();
}

function setupCanvas(canvasId, hiddenInputId) {
const canvas = document.getElementById(canvasId);
if (!canvas) {
console.error(`Canvas com id ${canvasId} não encontrado.`);
return;
}
const hiddenInput = document.getElementById(hiddenInputId);
const ctx = canvas.getContext('2d');
let drawing = false;

const getPos = (e) => {
const rect = canvas.getBoundingClientRect();
return e.touches ? {
x: e.touches[0].clientX - rect.left,
y: e.touches[0].clientY - rect.top
} : {
x: e.offsetX,
y: e.offsetY
};
};

const startDraw = (e) => {
drawing = true;
const pos = getPos(e);
ctx.beginPath();
ctx.moveTo(pos.x, pos.y);
};

const draw = (e) => {
if (!drawing) return;
const pos = getPos(e);
ctx.lineTo(pos.x, pos.y);
ctx.stroke();
hiddenInput.value = canvas.toDataURL();
};

const stopDraw = () => drawing = false;

canvas.addEventListener("mousedown", startDraw);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDraw);
canvas.addEventListener("mouseout", stopDraw);

canvas.addEventListener("touchstart", (e) => {
e.preventDefault();
startDraw(e);
});
canvas.addEventListener("touchmove", (e) => {
e.preventDefault();
draw(e);
});
canvas.addEventListener("touchend", (e) => {
e.preventDefault();
stopDraw(e);
});
}

function limparCanvas(canvasId, hiddenInputId) {
const canvas = document.getElementById(canvasId);
const ctx = canvas.getContext("2d");
ctx.clearRect(0, 0, canvas.width, canvas.height);
document.getElementById(hiddenInputId).value = "";
}

function enviarCanvas(canvasId, hiddenInputId, offcanvasId) {
const canvas = document.getElementById(canvasId);

if (isCanvasBlank(canvas)) {
Swal.fire({
icon: 'warning',
title: 'Assinatura ausente',
text: 'Por favor, assine antes de enviar.',
});
return;
}

Swal.fire({
icon: 'success',
title: 'Assinatura enviada!',
showConfirmButton: false,
timer: 1500
});

const offcanvasEl = document.getElementById(offcanvasId);
const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvasEl);
if (bsOffcanvas) bsOffcanvas.hide();

limparCanvas(canvasId, hiddenInputId);
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener("DOMContentLoaded", () => {
setupCanvas("assinaturaGestor", "assinaturaDataGestor");
setupCanvas("assinaturaConferente", "assinaturaDataConferente");
});