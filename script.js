const words = ["Frontend Developer", "Backend Developer", "Designer"];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100;
  const deletingSpeed = 60;
  const delayBetweenWords = 1500;

  const typingText = document.getElementById("typing-text");

  function typeEffect() {
    const currentWord = words[wordIndex];

    if (!isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentWord.length) {
        setTimeout(() => isDeleting = true, delayBetweenWords);
      }
    } else {
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }

    setTimeout(typeEffect, isDeleting ? deletingSpeed : typingSpeed);
  }

  typeEffect();
