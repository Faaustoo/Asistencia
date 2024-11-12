<?php
namespace App\Traits;

trait ValidarInstitucion {
    
    public static function clean_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    public static function obtenerDatosInstitucion() {
        $datos = [];
    
        if (isset($_POST['nombre_institucion'])) {
            $datos['nombre_institucion'] = self::clean_input($_POST['nombre_institucion']);
        } else {
            $datos['nombre_institucion'] = '';
        }
    
        if (isset($_POST['direccion_institucion'])) {
            $datos['direccion_institucion'] = self::clean_input($_POST['direccion_institucion']);
        } else {
            $datos['direccion_institucion'] = '';
        }
    
        if (isset($_POST['cue_institucion'])) {
            $datos['cue_institucion'] = self::clean_input($_POST['cue_institucion']);
        } else {
            $datos['cue_institucion'] = '';
        }
    
        if (isset($_POST['id_profesor'])) {
            $datos['id_profesor'] = self::clean_input($_POST['id_profesor']);
        } else {
            $datos['id_profesor'] = '';
        }
    
        return $datos;
    }
    

    public static function validarDatosInstitucion($data) {
        $errores = [];
        $letrasEspaciosNumeros = "/^[a-zA-Z0-9\s]+$/";
        $letrasEspacios = "/^[a-zA-Z\s]+$/";
        $numeros = "/^[0-9]+$/";
    
        if (empty($data['nombre_institucion'])) {
            $errores[] = "El nombre de la institucion es obligatorio.";
        } elseif (!preg_match($letrasEspacios, $data['nombre_institucion'])) {
            $errores[] = "El nombre solo puede contener letras y espacios.";
        } elseif (strlen($data['nombre_institucion']) > 30) {
            $errores[] = "El nombre no puede tener mas de 30 caracteres.";
        }
    
        if (empty($data['direccion_institucion'])) {
            $errores[] = "La direccion de la institucion es obligatoria.";
        } elseif (!preg_match($letrasEspaciosNumeros, $data['direccion_institucion'])) {
            $errores[] = "La direccion solo puede contener letras, espacios y numeros.";
        } elseif (strlen($data['direccion_institucion']) > 30) {
            $errores[] = "La direccion no puede tener mas de 30 caracteres.";
        }
    
        if (empty($data['cue_institucion'])) {
            $errores[] = "El codigo CUE es obligatorio.";
        } elseif (!preg_match($numeros, $data['cue_institucion'])) {
            $errores[] = "El CUE solo puede contener numeros.";
        }
    
        if (empty($data['id_profesor'])) {
            $errores[] = "El ID del profesor es obligatorio.";
        } elseif (!preg_match($numeros, $data['id_profesor'])) {
            $errores[] = "El ID debe ser un numero.";
        }
    
        return $errores;
    }
    

    public static function obtenerDatosEliminarInstitucion() {
        $datos = [];
        if (isset($_POST['nombre_institucion'])) {
            $datos['nombre_institucion'] = self::clean_input($_POST['nombre_institucion']);
        } else {
            $datos['nombre_institucion'] = '';
        }

        if (isset($_POST['id_profesor'])) {
            $datos['id_profesor'] = self::clean_input($_POST['id_profesor']);
        } else {
            $datos['id_profesor'] = '';
        }
        
        return $datos; 
    }
    
    public static function validarDatosEliminarInstitucion($data) {
        $letrasEspacios = "/^[a-zA-Z\s]+$/";
        $numeros = "/^[0-9]+$/";
        $errores = []; 
    
        if (empty($data['nombre_institucion'])) {
            $errores[] = "El nombre de la institucion es obligatorio.";
        } elseif (!preg_match($letrasEspacios, $data['nombre_institucion'])) {
            $errores[] = "El nombre solo puede contener letras y espacios.";
        } elseif (strlen($data['nombre_institucion']) > 30) {
            $errores[] = "El nombre no puede tener mas de 30 caracteres.";
        }
    
        if (empty($data['id_profesor'])) {
            $errores[] = "El ID del profesor es obligatorio.";
        } elseif (!preg_match($numeros, $data['id_profesor'])) {
            $errores[] = "El ID debe ser un numero.";
        }
    
        return $errores; 
    }
    
}
