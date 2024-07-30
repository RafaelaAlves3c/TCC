// script.js
document.addEventListener('DOMContentLoaded', () => {
    const imagensDisponiveis = [
      { id: 1, url: 'img/abelha.png' },
      { id: 2, url: 'img/cachorro.png' },
      { id: 3, url: 'img/cavalo.png' },
      { id: 4, url: 'img/cobra.png' },
      { id: 5, url: 'img/gato.png' },
      { id: 6, url: 'img/elefante.png' }, 
      // Adicione mais imagens aqui
    ];
  
    const pares = [
        { id: 5, url: 'img/gato_sombra.png' },
        { id: 6, url: 'img/elefante_sombra.png' },
        { id: 3, url: 'img/cavalo_sombra.png' },
        { id: 4, url: 'img/cobra_sombra.png' },
        { id: 1, url: 'img/abelha_sombra.png' },
        { id: 2, url: 'img/cachorro_sombra.png' },
      // Adicione mais pares aqui
    ];

    const imagensDisponiveisContainer = document.getElementById('imagens-disponiveis');
    const imagensParesContainer = document.getElementById('imagens-pares');
    const totalPares = pares.length;
  
    function criarImagemElement(imagem, draggable = false) {
      const imgElement = document.createElement('div');
      imgElement.classList.add('imagem');
      imgElement.dataset.id = imagem.id;
      if (draggable) {
        imgElement.draggable = true;
        imgElement.addEventListener('dragstart', (e) => handleDragStart(e, imagem.id));
      }
      imgElement.innerHTML = `<img src="${imagem.url}" alt="imagem">`;
      return imgElement;
    }
  
    imagensDisponiveis.forEach(imagem => {
      const imgElement = criarImagemElement(imagem, true);
      imagensDisponiveisContainer.appendChild(imgElement);
    });
  
    pares.forEach(par => {
      const imgElement = criarImagemElement(par);
      imgElement.addEventListener('drop', handleDrop);
      imgElement.addEventListener('dragover', handleDragOver);
      imagensParesContainer.appendChild(imgElement);
    });
  
    function handleDragStart(e, id) {
      e.dataTransfer.setData('text/plain', id);
    }
  
    function handleDrop(e) {
      e.preventDefault();
      const id = e.dataTransfer.getData('text/plain');
      const imagemArrastada = document.querySelector(`.imagens-disponiveis .imagem[data-id='${id}']`);
  
      if (imagemArrastada) {
        const dropTarget = e.target.closest('.imagem');
        if (dropTarget && dropTarget.dataset.id) {
          const idDestino = dropTarget.dataset.id;
  
          // Verifica se o par de imagens é correto
          if (id === idDestino) {
            dropTarget.innerHTML = imagemArrastada.innerHTML;
            dropTarget.dataset.id = id;
            dropTarget.classList.add('imagem'); // Garante que a classe 'imagem' seja aplicada
            verificarConclusao();
          }
        }
      }
    }
  
    function handleDragOver(e) {
      e.preventDefault();
    }
  
    function verificarConclusao() {
      const imagensParesArrastadas = imagensParesContainer.querySelectorAll('.imagem img');
      if (imagensParesArrastadas.length === totalPares) {
        const todosCorretos = Array.from(imagensParesArrastadas).every(img => {
          const src = img.src;
          const nomeArquivo = src.split('/').pop(); // Obtém o nome do arquivo da URL
          const idDaImagem = nomeArquivo.split('.')[0].replace('imagem', ''); // Extrai o ID
          return idDaImagem === img.parentElement.dataset.id; // Verifica se o ID está correto
        });
  
        if (todosCorretos) {
          mostrarProximaFase();
        }
      }
    }
  
    function mostrarProximaFase() {
      alert("Parabéns! Você completou a fase. Próxima fase será carregada.");
      // Aqui você pode redirecionar para outra página ou carregar a próxima fase
      // Exemplo: window.location.href = 'proxima_fase.html';
    }
  });