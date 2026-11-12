(function () {
  var root = document.documentElement, btn = document.getElementById('theme');
  function apply(t) {
    root.setAttribute('data-theme', t);
    btn.setAttribute('aria-pressed', String(t === 'dark'));
    btn.textContent = t === 'dark' ? 'Light mode' : 'Dark mode';
    btn.setAttribute('aria-label', btn.textContent);
  }
  var saved = null;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  apply(saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
  btn.addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  var form = document.getElementById('contact');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var status = document.getElementById('status'), bad = null;
    ['name', 'email', 'msg'].forEach(function (id) {
      var f = document.getElementById(id), ok = f.checkValidity() && f.value.trim() !== '';
      f.setAttribute('aria-invalid', String(!ok));
      if (!ok && !bad) bad = f;
    });
    if (bad) { status.textContent = 'Please fill in the highlighted fields with valid details.'; bad.focus(); return; }
    status.textContent = 'Thanks! Your message is ready to send.';
    form.reset();
  });
})();
