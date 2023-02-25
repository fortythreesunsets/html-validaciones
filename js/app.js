import { validate } from "./validaciones.js";

// Seleccionar todos los elementos de tipo input, regresa un array
const inputs = document.querySelectorAll("input");

// Iterar el array de inputs y agrega a cada uno el evento y llamar a la función
inputs.forEach(input => {
    input.addEventListener('blur', (input) => {
        validate(input.target);
    });
})

