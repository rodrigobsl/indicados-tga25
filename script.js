const searchInput = document.querySelector('.search-container input');
const clearSearchBtn = document.querySelector('.clear-search');
const emptySearchEl = document.querySelector('.empty-search');
const cardCont = document.querySelector('.card-container');
const loadScreen = document.querySelector('.loading');

let dados = [];

let cardContainer = document.querySelector(".card-container");

async function carregarCards() {
    try {
        const resposta = await fetch("data.json");
        if (!resposta.ok) {
            throw new Error(`HTTP error! status: ${resposta.status}`);
        }
        dados = await resposta.json();
        renderizarCards(dados);
    } catch (error) {
        console.error("Falha ao carregar os dados dos cards:", error);
        cardContainer.innerHTML = `<p style="text-align: center; color: var(--primary-color);">Não foi possível carregar os jogos. Tente recarregar a página.</p>`;
    } finally {
        // Garante que a tela de loading seja escondida mesmo se houver erro
        setTimeout(() => {
            loadScreen.style.opacity = '0';
            loadScreen.addEventListener('transitionend', () => loadScreen.style.display = 'none', { once: true });
        }, 2000); // Tempo mínimo de exibição do loading
    }
}

function removerAcentos(texto) {
    return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

function filtrarCards() {
    const termoBusca = removerAcentos(searchInput.value);

    if (termoBusca.length > 0) {
        clearSearchBtn.style.display = 'block';
    } else {
        clearSearchBtn.style.display = 'none';
    }
    const cardsFiltrados = dados.filter(dado => {
        const nomeJogo = removerAcentos(dado.nome);
        const correspondeNome = nomeJogo.includes(termoBusca);

        let correspondeIndicacao = false;
        if (Array.isArray(dado.indicacoes)) {
            correspondeIndicacao = dado.indicacoes.some(indicacao => removerAcentos(indicacao).includes(termoBusca));
        } else if (typeof dado.indicacoes === 'string') {
            correspondeIndicacao = removerAcentos(dado.indicacoes).includes(termoBusca);
        }

        return correspondeNome || correspondeIndicacao;
    });

    renderizarCards(cardsFiltrados);
}

function criarCardElement(dado, index) {
    let nominationsHTML = '';
    if (Array.isArray(dado.indicacoes)) {
        nominationsHTML = dado.indicacoes.map(indicacao =>
            `<span class="nomination-tag" onclick="criarFiltro('${indicacao}')">${indicacao}</span>`
        ).join('');
    } else if (typeof dado.indicacoes === 'string' && dado.indicacoes) {
        nominationsHTML = `<span class="nomination-tag" onclick="criarFiltro('${dado.indicacoes}')">${dado.indicacoes}</span>`;
    }

    const plataformaHTML = dado.plataformas.map(plataforma =>
        `<img class="platform-icon" src="imagens/svg-plataformas/${plataforma}.svg" alt="Ícone da plataforma ${plataforma}">`
    ).join('');

    const article = document.createElement("article");
    article.classList.add("game-card", "card-enter-animation");
    article.style.animationDelay = `${index * 0.05}s`;

    article.innerHTML = `
    <div class="game-image-container">
        <img src="${dado.imagem}" alt="Capa do jogo ${dado.nome}" class="game-image">
    </div>
    <div class="game-info">
        <h2 class="game-title">${dado.nome}</h2>
        <p class="game-dev"><i>${dado.dev}</i></p>
        <p class="game-data"><strong>Lançamento: </strong>${dado.data}</p>
    </div>
    <div class="platform-icon-container">
        ${plataformaHTML}
    </div>
    <div class="game-nominations-container">
        ${nominationsHTML}
    </div>
    <a href="${dado.link}" rel="noopener noreferrer" target="_blank" class="game-link" title="Visitar site oficial">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"><path id="Vector" d="M10.0002 5H8.2002C7.08009 5 6.51962 5 6.0918 5.21799C5.71547 5.40973 5.40973 5.71547 5.21799 6.0918C5 6.51962 5 7.08009 5 8.2002V15.8002C5 16.9203 5 17.4801 5.21799 17.9079C5.40973 18.2842 5.71547 18.5905 6.0918 18.7822C6.5192 19 7.07899 19 8.19691 19H15.8031C16.921 19 17.48 19 17.9074 18.7822C18.2837 18.5905 18.5905 18.2839 18.7822 17.9076C19 17.4802 19 16.921 19 15.8031V14M20 9V4M20 4H15M20 4L13 11" stroke="#ffffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
    </a>`;

    return article;
}

function renderizarCards(dados) {
    cardContainer.innerHTML = ''; // Limpa os cards visíveis antes de renderizar os novos

    if (dados.length === 0) {
        emptySearchEl.classList.add('visible');
        cardCont.style.display = 'none';
    } else {
        emptySearchEl.classList.remove('visible');
        cardCont.style.display = 'flex';
    }

    dados.forEach((dado, index) => {
        const cardElement = criarCardElement(dado, index);
        cardContainer.appendChild(cardElement);
    });
}

function criarFiltro(filtro) {
    searchInput.value = filtro;
    filtrarCards();
}

function clearSearch() {
    searchInput.value = '';
    clearSearchBtn.style.display = 'none';
    filtrarCards();
    searchInput.focus();
}

function rollup(ev) {
    const isScrolled = window.scrollY > 60;
    const isUp = document.body.classList.contains("up");
    if (isScrolled && !isUp) {
        document.body.classList.add("up");
    } else if (!isScrolled && isUp) {
        document.body.classList.remove("up");
    }
}

const debounce = func => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, 300);
    };
}; 

function topFunction() {
  document.body.scrollTop = 0; // Safari
  document.documentElement.scrollTop = 0; // Chrome, Firefox, IE e Opera
};

// Ouvinte de evento que aguarda o carregamento completo do DOM
// para então chamar a função que busca e renderiza os cards dos jogos
document.addEventListener('DOMContentLoaded', carregarCards);

//Ouvinte para o evento debounce que impede loops nas animações do header
window.addEventListener('scroll', debounce(rollup));

// Ouvinte de evento ao campo de busca para filtrar os cards em tempo real
searchInput.addEventListener('input', debounce(filtrarCards));

// Ouvinte de evento ao botão de limpar
clearSearchBtn.addEventListener('click', clearSearch);