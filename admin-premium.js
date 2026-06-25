(() => {
  const clock = document.getElementById("admin-clock");
  const updateClock = () => {
    if (!clock) return;
    clock.textContent = new Intl.DateTimeFormat("es-GT", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false
    }).format(new Date());
  };
  updateClock();
  setInterval(updateClock, 30000);

  const orderList = document.getElementById("admin-orders-list");
  let previousPending = 0;
  if (orderList) {
    new MutationObserver(() => {
      const pending = orderList.querySelectorAll('.order-card[data-status="Pendiente"]').length;
      document.title = pending ? `(${pending}) Pedidos · Drinks & Relax` : "Control Room · Drinks & Relax";
      if (pending > previousPending && previousPending !== 0) {
        const header = document.querySelector(".admin-status strong");
        if (header) {
          header.textContent = "Nuevo pedido";
          setTimeout(() => header.textContent = "En línea", 3500);
        }
      }
      previousPending = pending;
    }).observe(orderList, { childList: true, subtree: true });
  }

  document.querySelectorAll(".tab-btn").forEach(button => {
    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
})();
