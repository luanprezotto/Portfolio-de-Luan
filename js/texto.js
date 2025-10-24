const words = [
    { text: 'Olá, eu sou o Luan!', className: 'font1' },
    { text: 'Olá, eu sou o Luan!', className: 'font2' },
    { text: 'Olá, eu sou o Luan!', className: 'font3' },
  ];
  
  let current = 0;
  const span = document.getElementById('typed-text');
  
  const typingSpeed = 100;
  const eraseSpeed = 80;
  
  function typeWord() {
    const { text, className } = words[current];
    span.className = className;
    span.textContent = '';
  
    let i = 0;
  
    function type() {
      if (i < text.length) {
        span.textContent += text[i];
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
          span.textContent = text.slice(0, j - 1);
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
  