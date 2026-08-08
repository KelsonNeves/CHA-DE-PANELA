# Site do Casamento — Kelson & Evellyn

Site estático (HTML/CSS/JS puro), sem necessidade de build ou instalação. Basta abrir `index.html` no navegador, ou subir a pasta inteira em qualquer serviço de hospedagem estática (Netlify, Vercel, GitHub Pages, Hostinger, etc.).

## Estrutura de arquivos

```
index.html       → página principal (Início, Contagem, Nossa História, Cerimônia, Esperamos você)
presentes.html    → Lista de Presentes
album.html        → Álbum de Fotos
styles.css        → todo o estilo visual do site
script.js         → contador, menus, carrossel, animações, copiar chave Pix
images/           → pasta para colocar as fotografias reais
```

## O que falta personalizar

### 1. Fotografias
Todas as fotos foram deixadas como **placeholders elegantes** (moldura com ícone) para você substituir por fotos reais do casal. Em cada arquivo `.html`, procure os comentários `<!-- Substitua por: ... -->` — eles indicam exatamente qual tag `<img>` colocar no lugar do placeholder, e o nome de arquivo sugerido dentro da pasta `images/`.

Fotos usadas no site:
- `images/casal-hero.jpg` — foto de fundo da tela inicial (retrato, boa resolução, formato paisagem)
- `images/casal-principal.jpg` — foto grande da seção "Nossa História" (retrato)
- `images/kelson-crianca.jpg` e `images/evellyn-crianca.jpg` — fotos de infância (quadradas)
- `images/carrossel-01.jpg` até `carrossel-05.jpg` — fotos do carrossel (pode adicionar quantas quiser, copiando o bloco `.carousel-item`)
- `images/casal-final.jpg` — foto horizontal grande da seção "Esperamos você"
- `images/qrcode-pix.png` — QR Code da chave Pix (gerar em qualquer app do banco)
- `images/qrcode-album.png` — QR Code do link do álbum do Google Fotos

### 2. Data e horário do casamento
No arquivo `script.js`, na função `initCountdown()`, ajuste a linha:
```js
const targetDate = new Date("2027-05-16T16:00:00-03:00").getTime();
```

### 3. Endereço completo e link do mapa
Em `index.html`, na seção "Informações da Cerimônia":
- Atualize o texto do cartão **Endereço**.
- Atualize o link `href` do botão **Ver localização** com o endereço exato (ou copie o link direto do Google Maps).

### 4. Chave Pix
Em `presentes.html`, troque o conteúdo de:
```html
<code data-pix-key>kelson.evellyn@pix.com.br</code>
```

### 5. Álbum de fotos (Google Fotos)
Em `album.html`, troque o `href` do botão "Adicionar minhas fotos" pelo link real do álbum compartilhado.

## Notas técnicas
- Fontes usadas: **Great Vibes** (caligráfica), **Cormorant Garamond** (serif), **Jost** (sans-serif) — via Google Fonts.
- O site é totalmente responsivo (mobile, tablet, desktop) e respeita `prefers-reduced-motion`.
- Nenhuma dependência externa além das fontes do Google — não requer build, npm ou servidor.
