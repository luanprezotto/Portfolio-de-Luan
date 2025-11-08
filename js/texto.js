const words = [
  { text: 'Dev Front-End!', className: 'font1' },
  { text: 'Dev Front-End!', className: 'font2' },
  { text: 'Dev Front-End', className: 'font3' },
];

let current = 0;
const spans = [
  document.getElementById('typed-text-desktop'),
  document.getElementById('typed-text-mobile')
];

const typingSpeed = 100;
const eraseSpeed = 80;

function typeWord() {
  const { text, className } = words[current];
  
  // Atualiza todos os elementos simultaneamente
  spans.forEach(span => {
    if (span) {
      span.className = className;
      span.textContent = '';
    }
  });

  let i = 0;

  function type() {
    if (i < text.length) {
      spans.forEach(span => {
        if (span) span.textContent += text[i];
      });
      i++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(eraseWord, 1000);
    }
  }

  function eraseWord() {
    let j = text.length;
    function erase() {
      if (j > 0) {
        spans.forEach(span => {
          if (span) span.textContent = text.slice(0, j - 1);
        });
        j--;
        setTimeout(erase, eraseSpeed);
      } else {
        current = (current + 1) % words.length;
        typeWord();
      }
    }
    erase();
  }

  type();
}

typeWord();