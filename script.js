// ====== EDIT THESE ======
const WHATSAPP_NUMBER = "919999999999";   // country code + number, no + or spaces
const EMAIL = "you@example.com";
// ========================

// Mobile menu
const btn = document.querySelector(".menu-btn");
const menu = document.getElementById("menu");
btn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  btn.setAttribute("aria-expanded", open);
});
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("open")));

// Pre-select program from schedule "Enquire" buttons
document.querySelectorAll("[data-program]").forEach(a => {
  a.addEventListener("click", () => {
    document.querySelector("select[name=program]").value = a.dataset.program;
  });
});

// Contact form -> WhatsApp or email (no server needed)
const form = document.getElementById("form");
const status = document.getElementById("status");
let mode = "whatsapp";
form.querySelectorAll("button[type=submit]").forEach(b =>
  b.addEventListener("click", () => (mode = b.dataset.mode))
);
form.addEventListener("submit", e => {
  e.preventDefault();
  const d = Object.fromEntries(new FormData(form));
  if (!d.name.trim()) { status.textContent = "Please enter your name."; return; }
  const text =
`Hello, I'd like to join a yoga class.
Name: ${d.name}
Phone: ${d.phone || "-"}
Email: ${d.email || "-"}
Program: ${d.program}
Message: ${d.message || "-"}`;
  if (mode === "whatsapp") {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, "_blank");
  } else {
    location.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Yoga class enquiry")}&body=${encodeURIComponent(text)}`;
  }
  status.textContent = "Thank you! Your message is ready to send.";
});

document.getElementById("year").textContent = new Date().getFullYear();
