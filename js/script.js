// Script do meu portfólio
// Aqui eu fiz 3 coisas: menu do celular, tema claro/escuro e o formulário de contato


// ---------- MENU DO CELULAR ----------
// no celular o menu fica escondido e o botão ☰ abre e fecha ele

// pego o botão e o menu pelo id que coloquei no HTML
const btnMenu = document.getElementById('btn-menu');
const menu = document.getElementById('menu');

// quando clicar no botão, liga/desliga a classe "aberto" (no CSS é essa classe que faz o menu aparecer)
btnMenu.addEventListener('click', () => {
  const aberto = menu.classList.toggle('aberto');
  btnMenu.setAttribute('aria-expanded', aberto); // pra acessibilidade
});

// quando clicar num link do menu, fecha ele senão no celular ele ficava aberto em cima do conteúdo
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => menu.classList.remove('aberto'));
});


// ---------- TEMA CLARO / ESCURO ----------
// o CSS usa variáveis de cor, então basta colocar a classe "escuro" no body que as cores do site todo mudam

const btnTema = document.getElementById('btn-tema');

// função que liga ou desliga o tema escuro e troca o ícone do botão
function aplicarTema(escuro) {
  document.body.classList.toggle('escuro', escuro);
  btnTema.textContent = escuro ? '☀️' : '🌙';
}

// ao abrir o site, vejo no localStorage qual tema a pessoa tinha escolhido usei try/catch porque alguns navegadores bloqueiam o localStorage
try {
  aplicarTema(localStorage.getItem('tema') === 'escuro');
} catch (erro) {
  aplicarTema(false); // se der erro fica no claro
}

// clicou no botão: inverte o tema e salva a escolha
btnTema.addEventListener('click', () => {
  const escuro = !document.body.classList.contains('escuro');
  aplicarTema(escuro);
  try {
    localStorage.setItem('tema', escuro ? 'escuro' : 'claro');
  } catch (erro) {
    // se não conseguir salvar, não tem problema, só não lembra na próxima vez
  }
});


// ---------- FORMULÁRIO DE CONTATO ----------
// valida os campos, mostra os erros e, se estiver tudo certo, limpa o formulário e mostra a mensagem de sucesso (envio simulado)

const form = document.getElementById('form-contato');
const modal = document.getElementById('modal');
const modalTexto = document.getElementById('modal-texto');

// regex pra conferir se o e-mail tem formato válido (algo@dominio.com)
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// mostra o erro embaixo do campo (ou limpa, se passar texto vazio)
function mostrarErro(campo, mensagem) {
  document.getElementById('erro-' + campo.id).textContent = mensagem;
  // a classe "invalido" deixa a borda vermelha
  campo.classList.toggle('invalido', mensagem !== '');
}

// roda quando clicar em "Enviar"
form.addEventListener('submit', (evento) => {
  // evita que a página recarregue, já que o envio é só simulado
  evento.preventDefault();

  const nome = form.nome;
  const email = form.email;
  const mensagem = form.mensagem;
  let valido = true; // começa true e vira false se achar algum erro

  // nome não pode ficar vazio (o trim tira os espaços, então "   " também dá erro)
  if (nome.value.trim() === '') {
    mostrarErro(nome, 'Informe seu nome.');
    valido = false;
  } else {
    mostrarErro(nome, '');
  }

  // e-mail: tem que preencher e ter formato válido
  if (email.value.trim() === '') {
    mostrarErro(email, 'Informe seu e-mail.');
    valido = false;
  } else if (!regexEmail.test(email.value.trim())) {
    mostrarErro(email, 'E-mail inválido (ex.: usuario@dominio.com).');
    valido = false;
  } else {
    mostrarErro(email, '');
  }

  // mensagem não pode ficar vazia
  if (mensagem.value.trim() === '') {
    mostrarErro(mensagem, 'Escreva uma mensagem.');
    valido = false;
  } else {
    mostrarErro(mensagem, '');
  }

  // se teve algum erro, para aqui
  if (!valido) return;

  // deu tudo certo: limpa o formulário e mostra o modal de sucesso
  form.reset();
  modalTexto.textContent = 'Mensagem enviada com sucesso!';
  modal.hidden = false;
});


// ---------- FECHAR O MODAL ----------

// botão OK fecha
document.getElementById('modal-fechar').addEventListener('click', () => {
  modal.hidden = true;
});

// clicar no fundo escuro (fora da caixa) também fecha. uma pratica legal, pois nem sempre alguem apeta no fechar
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.hidden = true;
});
