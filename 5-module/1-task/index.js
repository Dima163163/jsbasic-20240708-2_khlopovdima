function hideSelf() {
  const btn = document.querySelector('.hide-self-button');

  btn.addEventListener('click', () => {
    if (!btn.hidden) {
      btn.hidden = true;
    } else {
      btn.hidden = false;
    }
  });
}
