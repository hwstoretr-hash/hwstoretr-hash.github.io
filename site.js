// HW STORE TR – dil seçimi ve görünürken belirme animasyonu
(function () {
  var root = document.documentElement;

  function savedLang() {
    try { return localStorage.getItem('hw_lang'); } catch (e) { return null; }
  }
  function saveLang(l) {
    try { localStorage.setItem('hw_lang', l); } catch (e) {}
  }

  function setLang(l) {
    root.setAttribute('lang', l);
    var t = document.querySelector('meta[name="title-' + l + '"]');
    if (t) document.title = t.content;
    document.querySelectorAll('.lang button').forEach(function (b) {
      b.classList.toggle('on', b.dataset.set === l);
    });
    saveLang(l);
  }

  // ?lang=en ile gelen link > daha önce seçilen dil > tarayıcı dili
  var q = new URLSearchParams(location.search).get('lang');
  var start = (q === 'en' || q === 'tr') ? q
    : (savedLang() || ((navigator.language || 'tr').toLowerCase().indexOf('tr') === 0 ? 'tr' : 'en'));
  setLang(start);

  document.querySelectorAll('.lang button').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.dataset.set); });
  });

  // kaydırınca beliren bölümler
  var items = document.querySelectorAll('.rv');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
