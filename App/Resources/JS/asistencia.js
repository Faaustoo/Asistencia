document.addEventListener("DOMContentLoaded", () => {
    const btnTomarAsistencia = document.getElementById('asistencia-alumno');
    const divAsistencia = document.getElementById('asistencia-Alumnos');
    const formularioTomarAsistencia = document.getElementById("formularioTomarAsistencia");

    const btnCerrarAsistencia = document.getElementById("cerrar-asistencia");
    const btnEnviarAsistencia = document.getElementById("enviar-asistencia");
    const formularioEliminarAsistencia = document.getElementById("formularioEliminarAsistencia");
    
    
    const tomarAsistenciaDiv = document.getElementById("tomar-Asistencia");
    const listaAlumnosDiv = document.getElementById("Listalumnos");
    const condicionAlumnosDiv = document.getElementById("condicion-Alumnos");
    const formularioAlumnoDiv = document.getElementById('formularioAlumno'); 
    const formularioEditar = document.getElementById('formularioeditarAlumno');
    const formularioEliminar = document.getElementById('formularioAlumnoEliminar');


    btnTomarAsistencia.addEventListener("click", () => {
        listaAlumnosDiv.style.display = "none";
        condicionAlumnosDiv.style.display = "none";
        formularioAlumnoDiv.style.display = "none";
        formularioEditar.style.display = "none";
        formularioEliminar.style.display = "none";
        divAsistencia.style.display = "block"; 
        formularioTomarAsistencia.style.display = 'none';
        formularioEliminarAsistencia.style.display = 'none'; 

        cargarAlumnosAsistencia();
    });


    btnCerrarAsistencia.addEventListener("click", () => {
        tomarAsistenciaDiv.style.display = "none"; 
        formularioTomarAsistencia.style.display = "none"; 
    });


   function cargarAlumnosAsistencia() {
    const url = new URLSearchParams(window.location.search);
    const idMateria = url.get('id'); 
    const datos = new FormData();
    datos.append('id_materia', idMateria);

    fetch('App/alumnos/obtenerAlumnos.php', {
        method: 'POST',
        body: datos
    })
    .then(res => res.json())
    .then(data => {
        if (data.estado === 'exito') {
            const listaAlumnos = document.getElementById('tomar-Asistencia');
            listaAlumnos.innerHTML = ''; 

            if (data.alumnos.length > 0) {
                let tablaHTML = `
                    <div class="fecha-asistencia">
                        <label for="fecha">Seleccione la fecha:</label>
                        <input type="date" id="fecha" name="fecha">
                        <button class="todos" type="button" id="seleccionar-todos">Seleccionar Todos</button>
                    </div>

                    <table class="tabla-alumnos">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Apellido</th>
                                <th>Id alumno</th>
                                <th>Asistencia</th>
                            </tr>
                        </thead>
                        <tbody>
                `;
                data.alumnos.forEach(alumno => {
        
                    tablaHTML += `
                        <tr>
                            <td>${alumno.nombre}</td>
                            <td>${alumno.apellido}</td>
                            <td>${alumno.id_alumno}</td>
                            <td>
                                <input type="checkbox" class="asistencia-checkbox" data-id="${alumno.id_alumno}">
                            </td>
                        </tr>
                    `;
                });
                tablaHTML += `
                    </tbody>
                </table>
                <div class="container-btn">
                    <button id="eliminarAsistencia">Eliminar Asistencia</button>
                    <button id="guardarAsistencia">Guardar Asistencia</button>
                </div>
                `;

                listaAlumnos.innerHTML = tablaHTML;

                const seleccionarTodos = document.getElementById('seleccionar-todos');
                seleccionarTodos.addEventListener('click', () => {
                    const checkboxes = document.querySelectorAll('.asistencia-checkbox');
                    checkboxes.forEach(checkbox => {
                        checkbox.checked = !checkbox.checked;
                    });
                });

                const btnGuardarAsistencia = document.getElementById("guardarAsistencia");
                    btnGuardarAsistencia.addEventListener("click", () => {
                        const fecha = document.getElementById('fecha').value;
                        let mensajes = [];  

                        document.getElementById('resultado-asistencia').innerHTML = ''; 
                        document.getElementById('error-asistencia').innerHTML = '';
                        formularioTomarAsistencia.style.display = 'block';
                        formularioEliminarAsistencia.style.display = 'none'; 

                        if (fecha) {
                            const fechaSeleccionada = fecha.split('-');
                            const diaSeleccionado = fechaSeleccionada[2];
                            const mesSeleccionado = fechaSeleccionada[1];

                            data.alumnos.forEach(alumno => {
                                const partes = alumno.fecha_nacimiento.split('-');
                                const dia = partes[2];  
                                const mes = partes[1]; 

                                if (dia == diaSeleccionado && mes == mesSeleccionado) {
                                    mensajes.push(`Es el cumpleaños de ${alumno.nombre} ${alumno.apellido}`);
                                }
                            });

                            if (mensajes.length > 0) {
                                alert(mensajes.join('\n')); 
                            }
                        }

                        // Si presiono "sí", guardo la asistencia en la BD
                        document.getElementById('si-asistencia').onclick = () => {
                            guardarAsistencia();
                        };

                        // Si presiono "no", cierro el formulario
                        document.getElementById('no-asistencia').onclick = () => {
                            formularioTomarAsistencia.style.display = 'none'; 
                        };

                        // Cerrar el formulario de asistencia
                        document.getElementById('cerrar-asistencia').onclick = () => {
                            formularioTomarAsistencia.style.display = 'none';
                            tomarAsistenciaDiv.style.display = 'block';
                            document.getElementById('fecha').value = '';
                            const checkboxes = document.querySelectorAll('.asistencia-checkbox');
                            checkboxes.forEach(checkbox => {
                                checkbox.checked = false;
                            });
                        };
                    });
                // Mostrar formulario para eliminar
                const botonEliminarAsistencia = document.getElementById('eliminarAsistencia');
                botonEliminarAsistencia.addEventListener('click', () => {
                    
                    formularioEliminarAsistencia.style.display = 'block'; 
                    formularioTomarAsistencia.style.display = 'none';
                    document.getElementById('resultado-eliminarAsistencia').innerHTML = ''; 
                    document.getElementById('error-eliminarAsistencia').innerHTML = '';

                    // Confirmar la asistencia que quiero eliminar
                    document.getElementById('enviar-asistencia-eliminar').onclick = () => {
                        console.log('click')
                        eliminarAsistencia(); 
                    };

                    // Cerrar el formulario de eliminar
                    document.getElementById('cerrar-a-eliminar').onclick = () => {
                        formularioEliminarAsistencia.style.display = 'none'; 
                        document.getElementById('id-asistencia').value='';
                        document.getElementById('fecha-asistencia').value='';
                    };
                });
            } else {
                alert(data.mensaje);
            }  
        } else if (data.estado == 'error'){
            document.getElementById('tomar-Asistencia').innerHTML= data.mensaje;
        }
    })
    .catch(error => {
        document.getElementById('tomar-Asistencia').innerHTML =  'Error al usar fetch: ' + error;
    });
}

    
    function guardarAsistencia() {
        const fecha = document.getElementById('fecha').value;
        if (!fecha) {
            alert('Seleccione una fecha antes de guardar la asistencia.');
            return;
        }
    
        const url = new URLSearchParams(window.location.search);
        const idMateria = url.get('id');
        const checkboxes = document.querySelectorAll('.asistencia-checkbox');
        const asistenciaDatos = [];
    
        checkboxes.forEach(checkbox => {
            let estado;
            if (checkbox.checked) {
                estado = 1;
            } else {
                estado = 0;
            }
            asistenciaDatos.push({id_alumno: checkbox.dataset.id, estado});
        });
    
        const datos = new FormData();
        datos.append('fecha', fecha); 
        datos.append('id_materia', idMateria);
        datos.append('asistencias', JSON.stringify(asistenciaDatos));
    
        fetch('App/asistencia/guardarAsistencia.php', {
            method: 'POST',
            body: datos
        })
        .then(res => res.json())
        .then(data => {
            const resultadoAsistencia = document.getElementById('resultado-asistencia');
            const errorAsistencia = document.getElementById('error-asistencia');
    
            if (data.estado === 'exito') {
                resultadoAsistencia.innerHTML = data.mensaje;
                setTimeout(() => {
                    formularioTomarAsistencia.style.display = 'none'; 
                    divAsistencia.style.display = "block"; 
                    document.getElementById('fecha').value = '';
                }, 1500);
                checkboxes.forEach(checkbox => checkbox.checked = false);
            } else {
                errorAsistencia.innerHTML = data.mensaje;
                setTimeout(() => { errorAsistencia.innerHTML = ''; }, 1500);
            }
        })
        .catch(error => {
            document.getElementById('error-asistencia').innerHTML=  'Error al usar fetch: ' + error;
        });
    }
    
    
    

    function eliminarAsistencia() {
        const fechaEliminar = document.getElementById('fecha-asistencia').value;
        const idEliminar = document.getElementById('id-asistencia').value;
    
        const datos = new FormData();
        datos.append('fecha', fechaEliminar); 
        datos.append('id', idEliminar)

        fetch('App/asistencia/eliminarAsistencia.php', { 
            method: 'POST',
            body: datos
        })
        .then(res => res.json())
        .then(data => { 
            document.getElementById('resultado-eliminarAsistencia').innerHTML = ''; 
            document.getElementById('error-eliminarAsistencia').innerHTML = ''; 
    
            if (data.estado === 'exito') {
                document.getElementById('resultado-eliminarAsistencia').innerHTML = data.mensaje;
                setTimeout(() => {
                    document.getElementById('resultado-eliminarAsistencia').innerHTML = '';
                    formularioEliminarAsistencia.style.display = 'none'; }, 3000);
            } else if (data.estado === 'error') {
                document.getElementById('error-eliminarAsistencia').innerHTML = data.mensaje; 
                if (data.errores.length > 0) {
                    data.errores.forEach(error => {
                        document.getElementById('error-eliminarAsistencia').innerHTML += error + '<br>'; 
                    });
                }
                setTimeout(() => {
                    document.getElementById('error-eliminarAsistencia').innerHTML = '';}, 1500);
            }
        })
        .catch(error => {
            document.getElementById('error-asistencia').innerHTML = 'Error al usar fetch: ' + error;
        });
    }
    

});





