// Opens project screenshots in an overlay. Without JavaScript the links
// still open the full-size image, so this is only an enhancement.
(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll('.shot-frame'));
  if (!links.length || typeof HTMLDialogElement !== 'function') return;

  var dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Bildvisning');
  dialog.innerHTML =
    '<figure class="lightbox-figure"><img alt=""><figcaption></figcaption></figure>' +
    '<button class="lightbox-close" type="button" aria-label="Stäng">×</button>' +
    '<button class="lightbox-prev" type="button" aria-label="Föregående bild">‹</button>' +
    '<button class="lightbox-next" type="button" aria-label="Nästa bild">›</button>' +
    '<p class="lightbox-count" aria-live="polite"></p>';
  document.body.appendChild(dialog);

  var img = dialog.querySelector('img');
  var caption = dialog.querySelector('figcaption');
  var count = dialog.querySelector('.lightbox-count');
  var current = 0;

  function show(index) {
    current = (index + links.length) % links.length;
    var link = links[current];
    var thumb = link.querySelector('img');
    img.src = link.getAttribute('href');
    img.alt = thumb ? thumb.alt : '';
    var figcaption = link.parentNode.querySelector('figcaption');
    caption.textContent = figcaption ? figcaption.textContent : '';
    count.textContent = links.length > 1 ? (current + 1) + ' / ' + links.length : '';
  }

  links.forEach(function (link, index) {
    link.addEventListener('click', function (event) {
      if (event.metaKey || event.ctrlKey || event.shiftKey) return;
      event.preventDefault();
      show(index);
      dialog.showModal();
      document.documentElement.classList.add('lightbox-open');
    });
  });

  dialog.classList.toggle('single', links.length < 2);
  dialog.querySelector('.lightbox-close').addEventListener('click', function () { dialog.close(); });
  dialog.querySelector('.lightbox-prev').addEventListener('click', function () { show(current - 1); });
  dialog.querySelector('.lightbox-next').addEventListener('click', function () { show(current + 1); });

  // Close when clicking the backdrop, but not the image itself.
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog || event.target.classList.contains('lightbox-figure')) dialog.close();
  });

  dialog.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });

  // Swipe between images on touch screens.
  var touchX = null;
  dialog.addEventListener('touchstart', function (event) { touchX = event.touches[0].clientX; }, { passive: true });
  dialog.addEventListener('touchend', function (event) {
    if (touchX === null) return;
    var distance = event.changedTouches[0].clientX - touchX;
    if (Math.abs(distance) > 50) show(current + (distance < 0 ? 1 : -1));
    touchX = null;
  });

  dialog.addEventListener('close', function () {
    document.documentElement.classList.remove('lightbox-open');
    links[current].focus();
  });
})();
