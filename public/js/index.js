// Scroll Top Button
window.onscroll = () => scrollFunction();

const scrollFunction = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("scrollTopBtn").style.display = "block";
  } else {
    document.getElementById("scrollTopBtn").style.display = "none";
  }
}

const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

const topBtn = document.getElementById("scrollTopBtn");
topBtn.addEventListener('click', () => window.scrollTo({
  top: 0,
  behavior: 'smooth',
}));

// END Scroll Top Button
