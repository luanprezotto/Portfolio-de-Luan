document.addEventListener('DOMContentLoaded', function() {
  const spans = [
    document.getElementById('typed-text-desktop'),
    document.getElementById('typed-text-mobile')
  ];

  spans.forEach(span => {
    if (span) {
      span.classList.add('intro-text-animated');
    }
  });
});