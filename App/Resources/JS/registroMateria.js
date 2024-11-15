
const url = new URLSearchParams(window.location.search);
const institucionId = url.get('id');

document.getElementById('crear-materia').addEventListener('click', function () {
    const formulario = document.getElementById('formularioMateria');
    const formularioEliminar = document.getElementById('formularioEliminarMateria');
    const formularioRam = document.getElementById('formularioEditarRam');
    const tablaRam = document.getElementById('ram');
    formularioEliminar.style.display = 'none'; 
    formulario.style.display = 'block'; 
    tablaRam.style.display = 'none'; 
    formularioRam.style.display = 'none'; 
    document.getElementById('nombre_materia').value = '';
    document.getElementById('resultado').innerHTML = ''; 
    document.getElementById('error').innerHTML = ''; 
});

document.getElementById('eliminar-materia').addEventListener('click', function () {
    const formulario = document.getElementById('formularioMateria');
    const formularioEliminar = document.getElementById('formularioEliminarMateria');
    const formularioRam = document.getElementById('formularioEditarRam');
    const tablaRam = document.getElementById('ram');
    formularioRam.style.display = 'none'; 
    tablaRam.style.display = 'none';
    formularioEliminar.style.display = 'block'; 
    formulario.style.display = 'none'; 
});

document.getElementById('cerrar-materia').addEventListener('click', function () {
    console.log('click');
    const formularioMateria=document.getElementById('formularioMateria');
    const tablaRam = document.getElementById('ram');
    
    formularioMateria.style.display='none';
    tablaRam.style.display = 'block';
    document.getElementById('resultado-eliminar').innerHTML = ''; 
    document.getElementById('error-eliminar').innerHTML = ''; 
});

document.getElementById('cerrar-eliminar').addEventListener('click', function () {
    console.log('click');
    formularioMateria=document.getElementById('formularioMateria');
    const formularioEliminar = document.getElementById('formularioEliminarMateria');
    const tablaRam = document.getElementById('ram');
    formularioMateria.style.display='none';
    formularioEliminar.style.display = 'none'; 
    tablaRam.style.display = 'block';
    document.getElementById('nombre_materia_eliminar').value = ''; 
    document.getElementById('resultado-eliminar').innerHTML = ''; 
    document.getElementById('error-eliminar').innerHTML = ''; 
});

let formularioMateria =document.getElementById('formDatosMateria');
formularioMateria.addEventListener('submit', function (event) {
    event.preventDefault();
    const datos = new FormData(formularioMateria); 
    datos.append('id_institucion', institucionId);

    
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('error').innerHTML = '';

    fetch('App/materias/registroMateria.php', {
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
        if (data.estado === 'exito') {
            document.getElementById('resultado').innerHTML = data.mensaje;
            setTimeout(() => {location.reload();}, 1500);
        } else if (data.estado === 'error') {
            if (data.errores) {
                data.errores.forEach(error => {
                    document.getElementById('error').innerHTML += error + '<br>';
                    setTimeout(() => {document.getElementById('error').innerHTML='';}, 2000)
                });
            } else {
                document.getElementById('error').innerHTML = data.mensaje;
                setTimeout(() => {document.getElementById('error').innerHTML='';}, 2000)
            }
        }
    })
    .catch(error => {
        document.getElementById('error').innerHTML = 'Error al usar fetch: ' + error;
    });
});

let formularioElimiarMateria =document.getElementById('formDatosEliminarMateria');
formularioElimiarMateria.addEventListener('submit', function (e) {
    e.preventDefault();
    let datos = new FormData(formularioElimiarMateria); 
    datos.append('id_institucion', institucionId);

    fetch('App/materias/eliminarMateria.php', { 
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('resultado-eliminar').innerHTML = '';
        document.getElementById('error-eliminar').innerHTML = '';

        if (data.estado === 'exito') {
            document.getElementById('resultado-eliminar').innerHTML = data.mensaje;
            setTimeout(() => {location.reload();}, 1500);
        } else if (data.estado === 'error') {
            if (data.errores) {
                data.errores.forEach(error => {
                    document.getElementById('error-eliminar').innerHTML += error + '<br>'; 
                });
                setTimeout(() => {document.getElementById('error-eliminar').innerHTML='';}, 2000)
            } else {
                document.getElementById('error-eliminar').innerHTML = data.mensaje;
                setTimeout(() => {document.getElementById('error-eliminar').innerHTML='';}, 2000)
            }
        }
    })
    .catch(error => {
        document.getElementById('error-eliminar').innerHTML = 'Error al usar fetch: ' + error;
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const url = new URLSearchParams(window.location.search);
    const institucionId = url.get('id');

    function cargarMaterias() {
        const datos = new FormData();
        datos.append('id_institucion', institucionId);

        fetch('App/materias/obtenerMaterias.php', { 
            method: 'POST',
            body: datos
        })
        .then(res => res.json())
        .then(data => {
            const listaMaterias = document.getElementById('lista-materias');
            if (listaMaterias) {
                listaMaterias.innerHTML = '';
                if (data.estado === 'exito') {
                    if (Array.isArray(data.materias)) {
                        data.materias.forEach(materia => {
                            listaMaterias.innerHTML += `
                            <div style="margin: 5px 0;">
                            <a href="tercerPagina.html?id=${materia.id_materia}" style="display: block; margin: 5px 0;" class="materia-link">
                            ${materia.nombre}</a></div>
                            `;
                        });
                    } else {
                        listaMaterias.innerHTML = '<p>No hay materias disponibles.</p>';
                    }
                }
            }
        })
        .catch(error => {
            listaMaterias.innerHTML = 'Error al usar fetch: ' + error;
        });
    }

    cargarMaterias();
});
