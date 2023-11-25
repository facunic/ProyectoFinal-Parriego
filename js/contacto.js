const modoOscuroBtn = document.getElementById("modo-oscuro-btn");
const body = document.body;
const nav = document.querySelector("nav");

modoOscuroBtn.addEventListener("click", () => {
    body.classList.toggle("modo-oscuro");
    nav.classList.toggle("modo-oscuro");

    if (body.classList.contains("modo-oscuro")) {
        modoOscuroBtn.src = "../multimedia/bxs-moon.png";
        localStorage.setItem("modo-oscuro", "activo");
    } else {
        modoOscuroBtn.src = "../multimedia/bx-moon.png";
        localStorage.setItem("modo-oscuro", "inactivo");
    }
});

const modoOscuroGuardado = localStorage.getItem("modo-oscuro");
if (modoOscuroGuardado === "activo") {
    body.classList.add("modo-oscuro");
    nav.classList.add("modo-oscuro");
    modoOscuroBtn.src = "../multimedia/bx-moon.png";
}

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    const successMessage = document.getElementById("mensaje-exito");

    // Verifica si se debe mostrar el mensaje de éxito
    const showMessage = localStorage.getItem("showSuccessMessage");
    if (showMessage === "true") {
        successMessage.style.display = "block";
        // Limpia el mensaje de éxito después de un segundo (1000ms)
        setTimeout(() => {
            successMessage.style.display = "none";
            localStorage.removeItem("showSuccessMessage");
        }, 1000);
    }

    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const nombre = contactForm.nombre.value;
        const email = contactForm.email.value;
        const mensaje = contactForm.mensaje.value;

        document.getElementById("nombre-error").textContent = "";
        document.getElementById("email-error").textContent = "";
        document.getElementById("mensaje-error").textContent = "";

        let hasErrors = false;

        if (nombre.length < 3) {
            document.getElementById("nombre-error").textContent = "El nombre debe tener al menos 3 caracteres.";
            hasErrors = true;
        }

        if (!email.includes("@")) {
            document.getElementById("email-error").textContent = "El email debe ser válido.";
            hasErrors = true;
        }

        if (mensaje.length < 10) {
            document.getElementById("mensaje-error").textContent = "El mensaje debe tener al menos 10 caracteres.";
            hasErrors = true;
        }

        if (!hasErrors) {
            successMessage.style.display = "block";
            contactForm.reset();
            localStorage.setItem("showSuccessMessage", "true");
        }
    });
});


