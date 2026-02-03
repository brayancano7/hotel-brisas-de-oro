// Formulario de reserva
const form = document.getElementById("formReserva");
const mensaje = document.getElementById("mensaje");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    mensaje.textContent = "✅ Reserva realizada con éxito. Pronto te contactaremos.";
    mensaje.style.color = "green";

    form.reset();
});


