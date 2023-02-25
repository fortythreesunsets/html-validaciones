const validators = {
    birthDate: (input) => birthValidation(input),
};

const errorMessages = {
    name: {
        valueMissing: "El campo nombre no puede estar vacío"
    },
    email: {
        valueMissing: "El campo email no puede estar vacío",
        typeMismatch: "El correo electrónico ingresado no es válido"
    },
    password: {
        valueMissing: "El campo password no puede estar vacío",
        patternMismatch: "Mínimo 6 caracteres y máximo 12. Debe contener una minúscula, una mayúscula y un número. No se permiten caracteres especiales"
    },
    birthDate: {
        valueMissing: "El campo fecha de nacimiento no puede estar vacío",
        customError: "Debes ser mayor de edad"
    },
    phoneNumber: {
        valueMissing: "El campo teléfono no puede estar vacío",
        patternMismatch: "El número telefónico debe ser de 10 dígitos"
    },
    address: {
        valueMissing: "El campo dirección no puede estar vacío",
        patternMismatch: "Mínimo 10 caracteres y máximo 40"
    },
    city: {
        valueMissing: "El campo ciudad no puede estar vacío",
        patternMismatch: "Mínimo 4 caracteres y máximo 30"
    },
    estate: {
        valueMissing: "El campo estado no puede estar vacío",
        patternMismatch: "Mínimo 4 caracteres y máximo 30"
    }
};

const errorTypes = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError"
];

export function validate(input) {
    const inputType = input.dataset.type;
    if(validators[inputType]) {
        validators[inputType](input);
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = showErrorMessage(inputType, input);
    }
}

function showErrorMessage(inputType, input) {
    let message = "";
    errorTypes.forEach( error => {
        if(input.validity[error]) {
            console.log(inputType, error);
            console.log(input.validity[error]);
            console.log(errorMessages[inputType][error]);
            
            message = errorMessages[inputType][error];
        }
    });
    return message;
}

function birthValidation(input) {
    const userDate = new Date(input.value);
    if(!ageMajority(userDate)) {
        input.setCustomValidity("customError");
        console.log(input.validity)
    } else {
        input.setCustomValidity("");
    }
}

function ageMajority(userDate) {
    const actualDate = new Date();
    const dateDifference = new Date(
        userDate.getUTCFullYear() + 18, 
        userDate.getUTCMonth(), 
        userDate.getUTCDate()
    );
    return dateDifference <= actualDate;
}