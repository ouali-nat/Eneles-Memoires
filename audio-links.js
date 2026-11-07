(function () {
"use strict";
/* Ajoute une carte « Mes audios » dans Ma bibliothèque, au même format que « Ma bibliothèque » et « Mes cartes ». */
var KEY = "aurore-audio-manifest-v1";
function count() { try { var m = JSON.parse(localStorage.getItem(KEY) || "{}"); return Array.isArray(m.records) ? m.records.length : 0; } catch (_) { return 0; } }
function inject() {
  var host = document.getElementById("memoryLibrary");
  if (!host || host.querySelector("[data-audio-card]")) return;
  var tpl = host.querySelector(".library-choice-card");
  if (!tpl || !tpl.parentNode) return;
  var a = document.createElement("a");
  a.className = tpl.className.replace(/\bis-active\b/g, "").trim();
  a.href = "mes-audios.html";
  a.setAttribute("data-audio-card", "1");
  a.innerHTML = tpl.innerHTML;
  var w = document.createTreeWalker(a, NodeFilter.SHOW_TEXT), n, nodes = [];
  while ((n = w.nextNode())) { if (n.nodeValue.trim()) nodes.push(n); }
  var c = count(), icon = a.querySelector(".chooser-icon,.library-choice-icon,.memory-row-mark");
  if (icon) icon.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 13v-2a8 8 0 0 1 16 0v2"/><rect x="3" y="12" width="4" height="7" rx="2"/><rect x="17" y="12" width="4" height="7" rx="2"/><path d="M17 19a5 5 0 0 1-5 3h-1"/></svg>';
  nodes.forEach(function (t) {
    var value = t.nodeValue.trim();
    if (/^[▤▧◎]$/.test(value) || /^[↗→]$/.test(value)) t.nodeValue = "";
    else if (/\d/.test(value) && value.length < 30) t.nodeValue = c + (c > 1 ? " audios" : " audio");
    else if (value.length > 22) t.nodeValue = "Enregistrements, textes lus et séquences d’écoute.";
    else t.nodeValue = "Mes audios";
  });
  tpl.parentNode.appendChild(a);
}
var host = document.getElementById("memoryLibrary");
if (host && window.MutationObserver) {
  new MutationObserver(function () { inject(); }).observe(host, { childList: true, subtree: true });
}
inject();
})();
