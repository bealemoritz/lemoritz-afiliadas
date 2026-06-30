# Le Moritz Afiliadas | Portal

Portal mobile-first das criadoras Le Moritz. Site estático (HTML/CSS/JS), sem dependências, pronto pra GitHub Pages.

```
index.html   → estrutura e todos os textos das páginas
styles.css   → design system (cores, fontes, layout)
app.js       → navegação, personalização, banco de refs, FAQ
assets/      → imagens da marca (ver abaixo)
```

## Imagens (salve nesta pasta `assets/`)
O portal já procura por estes arquivos. Enquanto não estão lá, aparece um espaço-reserva discreto.

| Arquivo | Onde aparece | Observação |
|---|---|---|
| `assets/lm-symbol.png` | Símbolo LM no topo (header) | quadrado, fundo roxo. Se faltar, mostra um "LM" estilizado |
| `assets/hero.jpg` | Imagem de destaque na Home | de preferência horizontal/banner (fica com ~168px de altura) |
| `assets/logo.png` | Logo completo no rodapé | "LE MORITZ \| SCIENCE & BEAUTY", de preferência fundo transparente |

## O que customizar (rápido)

| O quê | Onde |
|---|---|
| **Roxo oficial da marca** | `styles.css` → variável `--roxo` |
| **Link do grupo de WhatsApp** | `app.js` → `CONFIG.whatsapp` |
| **Banco de Refs** | Integrado do seu repo `banco-de-refs` (`app.js` → `CONFIG.banco`). Atualiza só lá e o portal reflete sozinho. |
| **Histórico de treinamentos** | `app.js` → `CONFIG.trainings` |
| **Próximo treinamento** | `index.html` → seção `id="treinamentos"` |
| **Desafio do mês** | `index.html` → seção `id="desafio"` |
| **Trocar imagem da Home por vídeo** | `index.html` → bloco `.hero-img` (substitua o `<img>` por um `<video>`/`<iframe>`) |

## Boas-vindas personalizadas
Adicione `?nome=Bia` ao final do link e a saudação + título mostram o nome.
Ex: `.../index.html?nome=Camila` → saudação "Oi, Camila :)" e título "Camila, seja bem-vinda ao nosso espaço".
Esse é o link que você cola no 1x1 do WhatsApp pra cada criadora.

## Aceite dos termos
O termo é validado automaticamente pela participação no programa (sem formulário).

## Publicar no GitHub Pages
1. Crie um repositório (ex: `lemoritz-afiliadas`) e suba estes arquivos.
2. Settings → Pages → Branch `main` / `/root` → Save.
3. Pronto: `https://bealemoritz.github.io/lemoritz-afiliadas`.
