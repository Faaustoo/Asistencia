<?php
namespace App\Traits;

trait Validaciones {
    
    public static function clean_input($data) {
        $data = trim($data);
        $data = stripslashes($data);
        $data = htmlspecialchars($data);
        return $data;
    }

    public static function obtenerDatos() {
        $datos = [];
        if (isset($_POST['nombre'])) {
            $datos['nombre'] = self::clean_input($_POST['nombre']);
        } else {
            $datos['nombre'] = '';
        }

        if (isset($_POST['apellido'])) {
            $datos['apellido'] = self::clean_input($_POST['apellido']);
        } else {
            $datos['apellido'] = '';
        }

        if (isset($_POST['dni'])) {
            $datos['dni'] = self::clean_input($_POST['dni']);
        } else {
            $datos['dni'] = '';
        }

        if (isset($_POST['email'])) {
            $datos['email'] = self::clean_input($_POST['email']);
        } else {
            $datos['email'] = '';
        }

        if (isset($_POST['numero_legajo'])) {
            $datos['numero_legajo'] = self::clean_input($_POST['numero_legajo']);
        } else {
            $datos['numero_legajo'] = '';
        }

        if (isset($_POST['contrasena'])) {
            $datos['contrasena'] = self::clean_input($_POST['contrasena']);
        } else {
            $datos['contrasena'] = '';
        }

        if (isset($_POST['confirmar_contrasena'])) {
            $datos['confirmar_contrasena'] = self::clean_input($_POST['confirmar_contrasena']);
        } else {
            $datos['confirmar_contrasena'] = '';
        }

        return $datos;
    }

    public static function validarDatos($data) {
        $errores = [];
    
        $numeros = "/^\d+$/";
        $email = "/^[^\s@]+@[^\s@]+\.[^\s@]+$/";
        $letrasEspacios = "/^[a-zA-Z\s]+$/";
    
        if (empty($data['nombre'])) {
            $errores[] = "El nombre es obligatorio.";
        } elseif (!preg_match($letrasEspacios, $data['nombre'])) {
            $errores[] = "El nombre solo puede contener letras y espacios.";
        } elseif (strlen($data['nombre']) > 20) {
            $errores[] = "El nombre no puede tener mas de 20 caracteres.";
        }
    
        if (empty($data['apellido'])) {
            $errores[] = "El apellido es obligatorio.";
        } elseif (!preg_match($letrasEspacios, $data['apellido'])) {
            $errores[] = "El apellido solo puede contener letras y espacios.";
        } elseif (strlen($data['apellido']) > 20) {
            $errores[] = "El apellido no puede tener mas de 20 caracteres.";
        }
    
        if (empty($data['dni'])) {
            $errores[] = "El DNI es obligatorio.";
        } elseif (!preg_match($numeros, $data['dni'])) {
            $errores[] = "El DNI solo puede contener numeros.";
        } elseif (strlen($data['dni']) != 8) {
            $errores[] = "El DNI debe tener  8 caracteres.";
        }
    
        if (empty($data['numero_legajo'])) {
            $errores[] = "El numero de legajo es obligatorio.";
        } elseif (!preg_match($numeros, $data['numero_legajo'])) {
            $errores[] = "El numero de legajo solo puede contener numeros.";
        } elseif (strlen($data['numero_legajo']) > 20) {
            $errores[] = "El numero de legajo no puede tener mas de 20 caracteres.";
        }
    
        if (empty($data['email'])) {
            $errores[] = "El correo es obligatorio.";
        } elseif (!preg_match($email, $data['email'])) {
            $errores[] = "El formato del correo no es válido.";
        } elseif (strlen($data['email']) > 30) {
            $errores[] = "El correo no puede tener mas de 30 caracteres.";
        }
    
        if (empty($data['contrasena'])) {
            $errores[] = "La contraseña es obligatoria.";
        } elseif (strlen($data['contrasena']) > 20) {
            $errores[] = "La contraseña no puede tener mas de 20 caracteres.";
        }
    
        if (empty($data['confirmar_contrasena'])) {
            $errores[] = "Confirmar la contraseña es obligatorio.";
        } elseif ($data['contrasena'] !== $data['confirmar_contrasena']) {
            $errores[] = "Las contraseñas no coinciden.";
        }
    
        return $errores;
    }
    

    public static function obtenerDatosLogin() {
        $datos = [];
    
        if (isset($_POST['email'])) {
            $datos['email'] = self::clean_input($_POST['email']);
        } else {
            $datos['email'] = '';
        }
    
        if (isset($_POST['contrasena'])) {
            $datos['contrasena'] = self::clean_input($_POST['contrasena']);
        } else {
            $datos['contrasena'] = '';
        }
    
        return $datos;
    }
    

    public static function validarDatosLogin($data) {
        $errores = [];
        $email = "/^[^\s@]+@[^\s@]+\.[^\s@]+$/";

        if (empty($data['email'])) {
            $errores[] = "El correo es obligatorio.";
        } elseif (!preg_match($email, $data['email'])) {
            $errores[] = "El formato del correo no es valido.";
        }

        if (empty($data['contrasena'])) {
            $errores[] = "La contraseña es obligatoria.";
        }

        return $errores;
    }

    
}
?>
