document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.card-header').forEach(function (header) {
        header.addEventListener('click', function () {
            let icon = header.querySelector('i');
            let isCollapsed = header.getAttribute('aria-expanded') === 'true';
            icon.classList.toggle('fa-chevron-up', !isCollapsed);
            icon.classList.toggle('fa-chevron-down', isCollapsed);
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.card-header').forEach(function (header) {
        header.addEventListener('click', function () {
            let icon = header.querySelector('i');
            let isCollapsed = header.getAttribute('aria-expanded') === 'true';
            icon.classList.toggle('fa-chevron-up', !isCollapsed);
            icon.classList.toggle('fa-chevron-down', isCollapsed);
        });
    });
});

function eliminarContenedor1() {
    var contenedor = document.getElementById('contenedorFicha1');
    contenedor.parentNode.removeChild(contenedor);
}

function eliminarContenedor2() {
    var contenedor = document.getElementById('contenedorFicha2');
    contenedor.parentNode.removeChild(contenedor);
}

function eliminarContenedor3() {
    var contenedor = document.getElementById('contenedorFicha3');
    contenedor.parentNode.removeChild(contenedor);
}

function eliminarContenedor4() {
    var contenedor = document.getElementById('contenedorFicha4');
    contenedor.parentNode.removeChild(contenedor);
}

function eliminarContenedor5() {
    var contenedor = document.getElementById('contenedorFicha5');
    contenedor.parentNode.removeChild(contenedor);
}

function eliminarContenedor6() {
    var contenedor = document.getElementById('contenedorFicha6');
    contenedor.parentNode.removeChild(contenedor);
}

function eliminarContenedor7() {
    var contenedor = document.getElementById('contenedorFicha7');
    contenedor.parentNode.removeChild(contenedor);
}

function eliminarContenedor(elementId) {
    var contenedor = document.getElementById(elementId);
    contenedor.parentNode.removeChild(contenedor);
}