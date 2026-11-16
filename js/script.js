// ===== MENU RESPONSIVO (mostra/esconde  no celular) ===== 
const btnMenu = document.getElementById('btn-menu');
const menu = document.getElementById('menu');

btnMenu.addEventListener('click', () => {
    const aberto = menu.classList.toggle('aberto');
    btnMenu.setAttribute('aria-expanded', aberto);
})

// Fecha o menu ao clicar em um link (melhorando a navegação no celular)
menu.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => menu.classList.remove('aberto'))
);

// ===== TEMA CLARO / ESCURO =====
const btnTema = document.getElementById('btn-tema');

// Aplica o tema e atualiza o icone do botão
function aplicarTema(escuro) {
    document.body.classList.toggle('escuro', escuro);
    btnTema.textContent = escuro ? '☀️' : '🌙';
}

// Recupera sempre a preferencia de tema salva no navegador (via localStorage)
aplicarTema(localStorage.getItem('tema') === 'escuro');

btnTema.addEventListener('click', () => {
    const escuro = !document.body.classList.contains('escuro');
    aplicarTema(escuro);
    localStorage.setItem('tema', escuro ? 'escuro' :  'claro');
});