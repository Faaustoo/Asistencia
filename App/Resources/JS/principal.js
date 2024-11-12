document.getElementById('crear-institucion').addEventListener('click', function() {
    const formularioCrear = document.getElementById('formularioCrearInstitucion');
    formularioCrear.style.display = 'block';
    document.getElementById('formularioEliminarInstitucion').style.display = 'none'; 
    document.getElementById('formularioEditarInstitucion').style.display = 'none';
});

document.getElementById('eliminar-institucion').addEventListener('click', function() {
    const formularioEliminar = document.getElementById('formularioEliminarInstitucion');
    formularioEliminar.style.display = 'block';
    document.getElementById('formularioCrearInstitucion').style.display = 'none';
    document.getElementById('formularioEditarInstitucion').style.display = 'none';
});

document.getElementById('cerrar-institucion').addEventListener('click', function() {
    const formularioCrear = document.getElementById('formularioCrearInstitucion');
    formularioCrear.style.display = 'none';
    document.getElementById('nombre_institucion').value = '';
    document.getElementById('direccion_institucion').value = '';
    document.getElementById('cue_institucion').value = ''; 
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('error').innerHTML = '';
});

document.getElementById('cerrar-eliminar-institucion').addEventListener('click', function() {
    const formularioEliminar = document.getElementById('formularioEliminarInstitucion');
    formularioEliminar.style.display = 'none';
    document.getElementById('nombre_eliminar').value = '';
    document.getElementById('resultado-eliminar').innerHTML = '';
    document.getElementById('error-eliminar').innerHTML = '';
});


let formularioCrear = document.getElementById('formDatosInstitucion');
formularioCrear.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    let datos = new FormData(formularioCrear);
    datos.append('id_profesor', id);

    fetch('App/instituciones/registroInstitucion.php', { 
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
        console.log(data);  

        document.getElementById('resultado').innerHTML = '';
        document.getElementById('error').innerHTML = '';

        if (data.estado === 'exito') {
            document.getElementById('resultado').innerHTML = data.mensaje;
            setTimeout(() => {location.reload();}, 1500);
        } else if (data.estado === 'error') {
            if (data.errores) {
                data.errores.forEach(error => {
                    document.getElementById('error').innerHTML += error + '<br>';
                });
                setTimeout(() => {document.getElementById('error').innerHTML='';}, 1500);
            } else {
                document.getElementById('error').innerHTML = data.mensaje;
                setTimeout(() => {document.getElementById('error').innerHTML='';}, 2000)
            }
        }
    }).catch(error => {
        document.getElementById('error').innerHTML = 'Error al usar fetch: ' + error;
    });
});


let formularioEliminar = document.getElementById('formDatosEliminarInstitucion');

formularioEliminar.addEventListener('submit', function(e) {
    e.preventDefault(); 
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    let datos = new FormData(formularioEliminar);
    datos.append('id_profesor', id);

    fetch('App/instituciones/eliminarInstitucion.php', { 
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('resultado-eliminar').innerHTML = '';
        document.getElementById('error-eliminar').innerHTML = '';
    
        if (data.estado === 'exito') {
            document.getElementById('resultado-eliminar').innerHTML = data.mensaje; 
            setTimeout(() => {
                location.reload();
            }, 1500);
        } else if (data.estado == 'error') {
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



function cargarInstituciones() {
    fetch('App/instituciones/obtenerInstituciones.php') 
    .then(res => res.json())
    .then(data => {
        const listaInstituciones = document.getElementById('lista-instituciones');
        listaInstituciones.innerHTML = ''; 
        if (data.estado === 'exito') {
            idProfesor = data.id_profesor;
            data.instituciones.forEach(institucion => {
                listaInstituciones.innerHTML += `
                <div class="institucion-item" style="margin: 5px 0;">
                    <a href="paginaSecundaria.html?id=${institucion.id_institucion}" class="institucion-nombre">${institucion.nombre}</a>
                    <button class="editar-institucion" data-id="${institucion.id_institucion}">Editar</button>
                </div>
                `;
                document.querySelectorAll('.editar-institucion').forEach(btn => {
                btn.addEventListener('click', (event) => {
                    const institucionId = event.target.getAttribute('data-id');
                    editarInstitucion(institucionId, data.instituciones);
                });

                });
            });
        } else {
            listaInstituciones.innerHTML = `<p>${data.mensaje}</p>`;
        }
    }).catch(error => {
        console.error('Error al cargar instituciones:', error);
    });
}

function editarInstitucion(institucionId, listaInstituciones) {
    const formularioEditar = document.getElementById('formularioEditarInstitucion');
    formularioEditar.style.display = 'block';
    document.getElementById('formularioCrearInstitucion').style.display = 'none';
    document.getElementById('formularioEliminarInstitucion').style.display = 'none';
    
    // Limpiar los campos del formulario
    const inputs = formularioEditar.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = ''; 
    });
    
    document.getElementById('error-editar').innerHTML = '';
    document.getElementById('resultado-editar').innerHTML = '';

    // Buscar la institución que tenga el id igual al que se pasa por parámetro
    const institucion = listaInstituciones.find(inst => inst.id_institucion == institucionId);
    if (institucion) {
        document.getElementById('nombre_institucion_editar').value = institucion.nombre;
        document.getElementById('direccion_institucion_editar').value = institucion.direccion;
        document.getElementById('cue_institucion_editar').value = institucion.CUE;
    }

    const botonCerrarEditar = document.getElementById('cerrar-institucion-editar');
    botonCerrarEditar.addEventListener('click', () => {
        formularioEditar.style.display = 'none';
        listaAlumnosDiv.style.display = 'block'; 
    });


    const botonEnviarEditar = document.getElementById('enviar-institucion-editar');
    botonEnviarEditar.addEventListener('click', (event) => {
        event.preventDefault();
        
        const urlParams = new URLSearchParams(window.location.search);
        const idProfesor = urlParams.get('id');
    
        const datos = new FormData(formDatosEditarInstitucion);
        datos.append('id_profesor', idProfesor); 
        datos.append('id_institucion',institucionId)

        fetch('App/instituciones/editarInstitucion.php', {
            method: 'POST',
            body: datos
        })
        .then(res => res.json())
        .then(data => {
            document.getElementById('resultado-editar').innerHTML = '';
            document.getElementById('error-editar').innerHTML = '';
    
            if (data.estado === 'exito') {
                document.getElementById('resultado-editar').innerHTML = data.mensaje;
                cargarInstituciones(); 
                setTimeout(() => {formularioEditar.style.display = 'none'; }, 1000);
            } else if (data.estado === 'error') {
                if (data.errores && Array.isArray(data.errores)) {
                    data.errores.forEach(error => {
                        document.getElementById('error-editar').innerHTML += error + '<br>';
                    });
                    setTimeout(() => {document.getElementById('error-editar').innerHTML='';}, 2000)
                } else {
                    document.getElementById('error-editar').innerHTML = data.mensaje;
                    setTimeout(() => {document.getElementById('error-editar').innerHTML='';}, 2000)
                }
            }
        })
        .catch(error => {
            document.getElementById('error-editar').innerHTML = 'Error al usar fetch: ' + error;
        });
    });
}
document.addEventListener('DOMContentLoaded', cargarInstituciones);

