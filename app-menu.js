(function () {
  "use strict";
  function bindMenu() {
    var toggle = document.getElementById("appMenuToggle");
    var panel = document.getElementById("appMenuPanel");
    var signIn = document.getElementById("appMenuSignIn");
    var gate = document.getElementById("memoryAccessLock");
    if (!toggle || !panel || toggle.dataset.auroreMenuReady === "1") return;
    toggle.dataset.auroreMenuReady = "1";

    var activeSession = null;
    function closeMenu() {
      panel.hidden = true;
      toggle.setAttribute("aria-expanded", "false");
      document.body.classList.remove("eneles-sidebar-open");
    }
    function positionMenu() {
      if (panel.hidden) return;
      var vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
      var vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
      panel.style.setProperty("position", "fixed", "important");
      panel.style.setProperty("left", "0", "important");
      panel.style.setProperty("right", "auto", "important");
      panel.style.setProperty("top", "0", "important");
      panel.style.setProperty("bottom", "0", "important");
      panel.style.setProperty("width", Math.min(320, vw * 0.88) + "px", "important");
      panel.style.setProperty("max-width", "88vw", "important");
      panel.style.setProperty("height", vh + "px", "important");
      panel.style.setProperty("max-height", vh + "px", "important");
      panel.style.setProperty("overflow-x", "hidden", "important");
      panel.style.setProperty("overflow-y", "auto", "important");
      panel.style.setProperty("z-index", "1000", "important");
    }
    function updateAuthMenu(session) {
      activeSession = session && session.user ? session : null;
      if (!signIn) return;
      signIn.textContent = activeSession ? "Se déconnecter" : "Se connecter";
      signIn.dataset.action = activeSession ? "signout" : "signin";
      signIn.setAttribute("aria-label", activeSession
        ? "Se déconnecter de Eneles Mémoire"
        : "Se connecter avec Eneles ID");
    }
    toggle.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      var opening = panel.hidden;
      panel.hidden = !opening;
      toggle.setAttribute("aria-expanded", opening ? "true" : "false");
      document.body.classList.toggle("eneles-sidebar-open", opening);
      if (opening) {
        positionMenu();
        requestAnimationFrame(positionMenu);
      }
    });
    panel.addEventListener("click", function (event) { event.stopPropagation(); });
    document.addEventListener("click", function (event) {
      if (!event.target.closest(".app-menu-wrap")) closeMenu();
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", positionMenu, { passive: true });
    window.addEventListener("orientationchange", function () {
      requestAnimationFrame(positionMenu);
    }, { passive: true });
    if (signIn) signIn.addEventListener("click", async function (event) {
      event.preventDefault();
      closeMenu();
      var auth = window.auroreAuth;
      try {
        if (window.auroreAuthReady) auth = await window.auroreAuthReady;
        if (signIn.dataset.action === "signout" || (activeSession && activeSession.user)) {
          signIn.disabled = true;
          if (!auth || typeof auth.signOut !== "function") throw new Error("Le service de déconnexion n’est pas disponible.");
          var result = await auth.signOut();
          if (result && result.error) throw result.error;
          updateAuthMenu(null);
          if (typeof window.auroreToast === "function") window.auroreToast("Vous êtes déconnecté d’Eneles Mémoire.");
          return;
        }
        if (typeof window.auroreShowAccessGate === "function") {
          window.auroreShowAccessGate();
        } else if (gate) {
          gate.hidden = false;
          document.body.classList.add("memory-access-open");
        }
      } catch (error) {
        if (typeof window.auroreToast === "function") {
          window.auroreToast(error && error.message ? error.message : "L’action sur votre compte a échoué.");
        }
      } finally {
        if (signIn) signIn.disabled = false;
      }
    });

    window.addEventListener("aurore:auth-changed", function (event) {
      updateAuthMenu(event && event.detail ? event.detail.session : null);
    });
    (async function restoreMenuSession() {
      try {
        var auth = window.auroreAuth;
        if (window.auroreAuthReady) auth = await window.auroreAuthReady;
        if (auth && typeof auth.getSession === "function") updateAuthMenu(await auth.getSession());
        else updateAuthMenu(null);
      } catch (error) {
        updateAuthMenu(null);
        console.warn("Eneles Mémoire : état du menu de compte indisponible.", error);
      }
    })();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bindMenu, { once: true });
  } else {
    bindMenu();
  }
})();
