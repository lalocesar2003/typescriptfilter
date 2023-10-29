"use strict";
class Seguro {
    constructor(marca, year, tipo) {
        this.marca = marca;
        this.year = year;
        this.tipo = tipo;
    }
    cotizarSeguro() {
        let cantidad = 0;
        const base = 2000;
        switch (this.marca) {
            case "1":
                cantidad = base * 1.15;
                break;
            case "2":
                cantidad = base * 1.05;
                break;
            case "3":
                cantidad = base * 1.35;
                break;
            default:
                break;
        }
        const diferencia = new Date().getFullYear() - this.year;
        cantidad -= ((diferencia * 3) * cantidad) / 100;
        if (this.tipo === 'basico') {
            cantidad *= 1.30;
        }
        else {
            cantidad *= 1.50;
        }
        console.log(cantidad);
        return cantidad;
    }
}
class UI {
    static llenarOpciones() {
        const max = new Date().getFullYear();
        const min = max - 20;
        const selectYear = document.querySelector('#year');
        if (selectYear) {
            for (let i = max; i > min; i--) {
                let option = document.createElement('option');
                option.value = i.toString();
                option.textContent = i.toString();
                selectYear.appendChild(option);
            }
        }
    }
    static mostrarMensaje(mensaje, tipo) {
        const div = document.createElement('div');
        if (tipo === 'error') {
            div.classList.add('error');
        }
        else {
            div.classList.add('correcto');
        }
        div.classList.add('mensaje', 'mt-10');
        div.textContent = mensaje;
        const formulario = document.querySelector('#cotizar-seguro');
        formulario === null || formulario === void 0 ? void 0 : formulario.insertBefore(div, document.querySelector('#resultado'));
        setTimeout(() => {
            div.remove();
        }, 3000);
    }
    static mostrarResultado(total, seguro) {
        const { marca, year, tipo } = seguro;
        let textoMarca;
        switch (marca) {
            case "1":
                textoMarca = 'americano';
                break;
            case "2":
                textoMarca = 'asiatico';
                break;
            case "3":
                textoMarca = 'europeo ';
                break;
            default:
                break;
        }
        const div = document.createElement('div');
        div.classList.add('mt-10');
        div.innerHTML = `
        <p class="header">Tu resumen<p>
        <p class="font-bold">Marca:<span class="font-normal">$ ${textoMarca}<span><p>
        <p class="font-bold">Año:<span class="font-normal">$ ${year}<span><p>
        <p class="font-bold">Tipo:<span class="font-normal capitalize">$ ${tipo}<span><p>
        <p class="font-bold">Total:<span class="font-normal">$ ${total}<span><p>
        `;
        const resultadoDiv = document.querySelector('#resultado');
        const spinner = document.querySelector('#cargando');
        if (spinner) {
            spinner.style.display = 'block';
            setTimeout(() => {
                spinner.style.display = 'none';
                resultadoDiv === null || resultadoDiv === void 0 ? void 0 : resultadoDiv.appendChild(div);
            }, 3000);
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    UI.llenarOpciones();
    console.log(UI);
});
eventListeners();
function eventListeners() {
    const formulario = document.querySelector('#cotizar-seguro');
    formulario === null || formulario === void 0 ? void 0 : formulario.addEventListener('submit', cotizarSeguro);
}
function cotizarSeguro(e) {
    e.preventDefault();
    const marca = document.querySelector('#marca').value;
    const year = Number(document.querySelector('#year').value);
    const tipo = document.querySelector('input[name="tipo"]:checked').value;
    if (marca === '' || year === 0 || tipo === '') {
        UI.mostrarMensaje('todos los campos son obligatorios', 'error');
        return;
    }
    UI.mostrarMensaje('cotizando...', 'exito');
    const resultados = document.querySelector('#resultado div');
    if (resultados != null) {
        resultados.remove();
    }
    const seguro = new Seguro(marca, year, tipo);
    const total = seguro.cotizarSeguro();
    UI.mostrarResultado(total, seguro);
}
