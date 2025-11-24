# Indicados TGA2025

## Repositório em página única de categorias e indicados do The Game Awards 2025.

Este projeto reúne, em um único espaço, todos os 75 jogos indicados ao The Game Awards 2025 em cards com visual limpo, responsivo e informativo.
Seu objetivo é facilitar o acesso às informações dos indicados, oferecendo uma experiência de navegação fluida e centrada no usuário. O foco principal é acessibilidade e usabilidade: apresentar todos os indicados em uma única página dinâmica, permitindo explorar jogos e categorias sem que o usuário precise interromper a navegação para ter acesso a informações adicionais.


*Desenvolvido por Rodrigo BSL durante a Imersão Dev #10 — Alura.*

---
### Funcionalidades

- **Cards visuais** de apresentação dos jogos com imagem, nome, informações de dev/publisher, data de lançamento, plataformas e link para o site oficial, renderizados de forma procedural via JavaScript a partir de uma base de dados estruturados em JSON;

- **Busca dinâmica** com filtragem de resultados em tempo real, campo de busca insensível a acentos e maiúsculas/minúsculas, botão para limpar o campo de busca e filtros por categorias de indicações (acessíveis tanto nos cards quanto na página de erro de busca);

- **Banner de contagem regressiva** para o evento em destaque na página;

- **Visual limpo e elegante**, com animações fluidas e integrando a identidade visual do The Game Awards

- **Design responsivo** e centrado no usuário, devidamente adaptado para desktops, tablets e smartphones.

### Estrutura do Projeto

```
├── index.html            # Arquivo principal da aplicação
├── style.css             # Folha de estilos
├── script.js             # Scripts gerais da aplicação
├── countdown.js          # Script do banner de contagem regressiva
├── data.json             # Dados dos jogos indicados
└── imagens/              # Arquivos gerais de imagem como bg, logos, etc.
    ├── cards-jogos/      # Imagens dos jogos
    └── svg-plataformas/  # Ícones das plataformas
```

>**Obs.:** por ser meu primeiro projeto e de caráter educativo, limitei o escopo para apresentar apenas os jogos indicados, omitindo alguns dos indicados como atores, times de eSports ou criadores de conteúdo (algumas dessas indicações ainda constam nos cards dos jogos correspondentes, no entanto). Para informações completas do evento, visite o site oficial: https://thegameawards.com/

###### *Este projeto foi criado exclusivamente para fins educacionais. Todo conteúdo, imagens e materiais relacionados ao The Game Awards pertencem aos seus respectivos proprietários. As propriedades intelectuais dos jogos apresentados são de propriedade de seus detentores legais. Nenhuma violação de direitos autorais é intencional.*
