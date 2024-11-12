<?php
namespace App\Traits;

trait ValidarMateria {
    
    public static function clean_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    public static function obtenerDatosMateria() {
        $datos = [];
        
        if (isset($_POST['nombre_materia'])) {
            $datos['nombre_materia'] = self::clean_input($_POST['nombre_materia']);
        } else {
            $datos['nombre_materia'] = '';
        }

        if (isset($_POST['id_institucion'])) {
            $datos['id_institucion'] = self::clean_input($_POST['id_institucion']);
        } else {
            $datos['id_institucion'] = '';
        }

        return $datos;
    }

    public static function validarDatosMateria($data) {
        $errores = [];
        $letrasEspaciosNumeros = "/^[a-zA-Z0-9\s]+$/";
        $numeros = "/^[0-9]+$/";
    
        if (empty($data['nombre_materia'])) {
            $errores[] = "El nombre es obligatorio.";
        } elseif (!preg_match($letrasEspaciosNumeros, $data['nombre_materia'])) {
            $errores[] = "El nombre solo puede contener letras, espacios y numeros.";
        } elseif (strlen($data['nombre_materia']) > 30) {
            $errores[] = "El nombre no puede tener mas de 30 caracteres.";
        }
    
        if (empty($data['id_institucion'])) {
            $errores[] = "El ID de la institucion es obligatorio.";
        } elseif (!preg_match($numeros, $data['id_institucion'])) {
            $errores[] = "El ID debe ser un numero.";
        }
    
        return $errores;
    }
    

    public static function obtenerDatosEliminar() {
        $datos = [];
        if (isset($_POST['nombre_materia'])) {
            $datos['nombre_materia'] = self::clean_input($_POST['nombre_materia']);
        } else {
            $datos['nombre_materia'] = '';
            
        }
        if (isset($_POST['id_institucion'])) {
            $datos['id_institucion'] = self::clean_input($_POST['id_institucion']);
        } else {
            $datos['id_institucion'] = '';
        }
        
        return $datos; 
    }
    
    public static function validarDatosEliminar($data) {
        $letrasEspaciosNumeros = "/^[a-zA-Z0-9\s]+$/";
        $numeros = "/^[0-9]+$/";
        $errores = []; 
        
        if (empty($data['nombre_materia'])) {
            $errores[] = "El nombre es obligatorio.";
        } elseif (!preg_match($letrasEspaciosNumeros, $data['nombre_materia'])) {
            $errores[] = "El nombre solo puede contener letras, espacios y numeros.";
        } elseif (strlen($data['nombre_materia']) > 30) {
            $errores[] = "El nombre no puede tener mas de 30 caracteres.";
        }
    
        if (empty($data['id_institucion'])) {
            $errores[] = "El ID de la institucion es obligatorio.";
        } elseif (!preg_match($numeros, $data['id_institucion'])) {
            $errores[] = "El ID debe ser un numero.";
        }
    
        return $errores; 
    }
    
}
?>
