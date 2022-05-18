/*Lógica para el formulario*/
//Expresiones regulares que acepta cada uno de los campos del formulario
const expresiones = {
	nombre: /^[a-zA-Z]{1,20}$/, // Letras y espacios, pueden llevar acentos.
	password: /^.{4,20}$/, // 4 a 20 digitos.
    repeatPass: /^.{4,20}$/
}
//Eventlistener para comprobar o validar las acciones del formulario
var formulario = document.getElementById('formulario');
//Obtención del valor ingresado en el campo destinado para el nombre
var input_nombre = document.getElementById('nombre');
//Obtención del valor ingresado en el campo destinado para la contraseña
var input_password = document.getElementById('password');
var repeat_password = document.getElementById('Valpassword');
//Se concatenan las entradas de datos ingresados -> [nombre, contraseña]
var inputs = [input_nombre, input_password, repeat_password];
/*Función para validar cada campo en tiempo real la cual envia a la función val_field
las expresiones regulares que permite el campo, el valor ingresado y el tipo de dato.*/
const val_form = (e)=>{
    switch(e.target.name){
        case "Nombre":
            val_field(expresiones.nombre, e.target, 'name');
        break;
        case "password":
            val_field(expresiones.password, e.target, 'pass');
        break;
        case "val_password":
            val_field(expresiones.repeatPass, e.target, 'Rpass');
        break;
        default:
        break;
    }
}
const campos = {
    name: false,
    pass: false,
    Rpass: false
}
/*Función para cambiar el estilo de cada campo y poner la imagen de check si los datos son
correctos o cancel si los datos son erroneos.*/
const val_password = (campo)=>{
    document.getElementById(`group_${campo}`).classList.add('form_group_correcto');
    document.getElementById(`group_${campo}`).classList.remove('form_group_incorrecto');
    document.querySelector(`#group_${campo} p`).classList.remove('form_input_error-activo');
    campos[campo] = true;
};
//Función para validar que los datos ingresados en el campo del nombre y de la contraseña son correctos
const val_field = (expresion, input, campo)=>{
    if(expresion.test(input.value) && campo == "pass" && input.value == "estefania921"){
        val_password(campo);
    }else if(expresion.test(input.value) && campo == 'name'){
        val_password(campo);
    }else if(expresion.test(input.value) && campo == 'Rpass' && input.value == document.getElementById("password").value){
        val_password(campo);
    }else{
        document.getElementById(`group_${campo}`).classList.add('form_group_incorrecto');
        document.getElementById(`group_${campo}`).classList.remove('form_group_correcto');
        document.querySelector(`#group_${campo} p`).classList.add('form_input_error-activo');
        campos[campo] = false;
    }
};
//Empieza a obtener datos del formulario cuando clickeamos encima del campo o el campo ha perdido su foco
inputs.forEach((input)=>{
    input.addEventListener('keyup', val_form);
    input.addEventListener('blur', val_form);
});
/*Si los datos ingresados son correctos entonces se resetea el formulario y se redirección a la aplicación 
para el movimiento del brazo*/
//Si no son correctos los datos arroja un mensaje de advertencia
formulario.addEventListener('submit', (e)=>{
    if(campos.name && campos.pass && campos.Rpass){
        formulario.reset();
        alert("¡Hemos recibido todos tus datos!, gracias por confiar en nosotros.")
        document.getElementById('form_mensaje').classList.remove('form_mensaje-activo');
        document.querySelectorAll('.form_group_correcto').forEach((icono)=>{
            icono.removeAttribute('class');
        });
    }else{
        document.getElementById('form_mensaje').classList.add('form_mensaje-activo');
        e.preventDefault();
    }
});