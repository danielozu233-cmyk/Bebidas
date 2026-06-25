(() => {
  window.refreshPremiumCatalog = () => {};

  const progressSteps = document.querySelectorAll(".checkout-progress span");
  const deliveryFields = ["nombre", "direccion", "codigo", "residencial", "pago"];
  deliveryFields.forEach(id => {
    document.getElementById(id)?.addEventListener("focus", () => {
      progressSteps[0]?.classList.add("active");
      progressSteps[1]?.classList.add("active");
    });
  });
  document.querySelector(".btn-submit[onclick='confirmarPedido()']")?.addEventListener("mouseenter", () => {
    progressSteps.forEach(step => step.classList.add("active"));
  });

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.animate(
        [{ opacity: 0, transform: "translateY(22px)" }, { opacity: 1, transform: "translateY(0)" }],
        { duration: 620, easing: "cubic-bezier(.2,.7,.2,1)", fill: "both" }
      );
      revealObserver.unobserve(entry.target);
    });
  }, { threshold: .12 });
  document.querySelectorAll(".menu-heading, .experience-strip, #ofertas-wrapper").forEach(el => revealObserver.observe(el));

  const catalogObserver = new MutationObserver(() => window.refreshPremiumCatalog());
  const products = document.getElementById("products");
  const offers = document.getElementById("ofertas");
  if (products) catalogObserver.observe(products, { childList: true });
  if (offers) catalogObserver.observe(offers, { childList: true });

  window.refreshPremiumCatalog();
})();
