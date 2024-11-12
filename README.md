Nexo - Sistema de Gestión de Asistencias


Nexo es un sistema sencillo para gestionar las asistencias, materias, alumnos y notas. 

 
 Funcionalidades como Profesor:

 
Como profesor, tienes acceso a varias herramientas para gestionar todo lo relacionado con tus clases. Primero, podrás registrarte y entrar con tu usuario para acceder a todas las opciones. Una de las primeras cosas que podrás hacer es gestionar las instituciones, creando, eliminando o editando según sea necesario. Luego, podrás ajustar los parámetros de promoción, que definen qué tiene que cumplir un alumno para pasar al siguiente nivel, todo según las políticas de la institución.


También tendrás control sobre las materias, permitiéndote agregar o eliminar asignaturas cuando lo necesites. En cuanto a los alumnos, podrás dar de alta, baja o modificar su información con facilidad.


Con la gestión de asistencias, podrás marcar la presencia de todos los alumnos de una vez y, si es necesario, cambiar la asistencia de un alumno de "presente" a "ausente" individualmente.

Por último, podrás registrar notas, ingresando las calificaciones de los alumnos y verificando si aprobaron, regularizaron o quedaron libres en base a su rendimiento.

Nexo está diseñado para hacer todo esto más sencillo, dándote control total sobre lo que necesites para gestionar a tus estudiantes y el curso.



Versión de Laragon: Full 6.0


Versión de PHP: 8.2.23



Pasos para Descargar, Configurar y Ejecutar el Proyecto con Laragon:


Instalar Laragon :
    
    https://laragon.org/download/
Ejecuta el instalador y sigue los pasos.
Inicia Laragon y asegúrate de que Apache y MySQL estén activados. Si no lo están, ve a Configuración > Servicios y Puertos y selecciona las casillas correspondientes.


 
Descargar el Proyecto:



  -Descarga el archivo ZIP del proyecto desde el repositorio de GitHub:

  
Haz clic en el botón 'Code' y selecciona 'Download ZIP'. Luego, extrae el archivo ZIP en una carpeta, a la que podrás cambiarle el nombre según prefieras. Después, mueve la carpeta del proyecto extraído a la carpeta 'www' en Laragon, cuya ruta usualmente es:
    
    C:\laragon\www
  Si la carpeta del proyecto se llama 'Asistencia', la ruta final será :
  
    C:\laragon\www\Asistencia
    
Cargar la Base de Datos :

Para cargar la base de datos de manera más sencilla en Laragon, sigue estos pasos:

1-Abrir Laragon y asegúrate de que MySQL esté funcionando.


2-Haz clic en "Base de datos" en el panel de Laragon.


3-Haz doble click en laragon.MySQL.


4-Haz clic en "cargar archivo SQL"(icono de la carpeta) para seleccionar tu archivo .sql.


5-Haz clic en "Ejecutar" para cargar el archivo.

Una vez que hayas hecho esto, la base de datos se cargará automáticamente y podrás ver las tablas y datos en la base de datos seleccionada



 
  
Ejecutar el Programa:


En la Terminal, navega a la carpeta del proyecto:
    
    cd Asistencia;
  Inicia el servidor PHP usando el comando:  
     
     php -S localhost:80;
  Esto te proporcionará un enlace local,Copia el enlace en el navegador y estará listo para usar. 
   
   
    http://localhost:80. 


El programa ya tiene un Usuario y contraseña cargados para poder evaluarse:  
 - Email :

       javier@gmail.com
 - contraseña:
 
        javier123
