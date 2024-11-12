<?php 
session_start(); 
require_once __DIR__ . '/../autoLoader.php';

$database = new Database();
$conn = $database->connect();

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $id_institucion = $_POST['id_institucion'];
    
    $data = Institucion::obtenerDatosInstitucion(); 
    $erroresValidar = Institucion::validarDatosInstitucion($data);

    if (empty($erroresValidar)) {
    
        $institucion = new Institucion($data['nombre_institucion'], $data['direccion_institucion'], $data['cue_institucion'], $data['id_profesor']);
    
        if ($institucion->editarInstitucion($conn, $id_institucion)) {
            echo json_encode(['estado' => 'exito', 'mensaje' => 'Institución editada con éxito.']);
        } else {
            echo json_encode(['estado' => 'error', 'mensaje' => 'Error al editar la institución.']);
        }
    } else {
        echo json_encode(['estado' => 'error', 'mensaje' => 'Errores en la validación.', 'errores' => $erroresValidar]);
    }
} else {
    echo json_encode(['estado' => 'error', 'mensaje' => 'No se envió por POST.', 'errores' => []]);
}
