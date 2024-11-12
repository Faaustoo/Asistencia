<?php 
session_start();
require_once __DIR__ . '/../autoLoader.php';

$database = new Database();
$conn = $database->connect();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = Materia::obtenerDatosMateria(); 
    $erroresValidar = Materia::validarDatosMateria($data);
    
    if (empty($erroresValidar)) {
        $materia = new Materia($data['nombre_materia'], $data['id_institucion']); 
        if ($materia->crearMateria($conn)) {
            echo json_encode(['estado' => 'exito', 'mensaje' => 'Materia creada con éxito.']);
        } else {
            echo json_encode(['estado' => 'error', 'mensaje' => 'Error al crear la materia.']);
        }
    } else {
        echo json_encode(['estado' => 'error', 'errores' => $erroresValidar]);
    }
} else {
    echo json_encode(['estado' => 'error', 'mensaje' => 'Método no permitido.']);
}

