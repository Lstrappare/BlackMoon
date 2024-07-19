# Software BlackMoon

## Dependencias (Front-end)
### React

```
npx create-react-app app
cd app
npm start
```
### React Router

```
npm install react-router-dom

```
### Tailwind

```
npm install -D tailwindcss
npx tailwindcss init
npx tailwindcss -i ./src/input.css -o ./src/output.css --watch
```
### Axios

```
npm install axios
```

## Base de datos

### Querys


```
-- Clientes
CREATE TABLE clientes (
    id INT NOT NULL AUTO_INCREMENT,
    nombre VARCHAR(255) NOT NULL,
    correo VARCHAR(255) NOT NULL UNIQUE,
    contrasenia VARCHAR(255) NOT NULL,
    dia_de_cumpleanos INT NOT NULL,
    mes_de_cumpleanos INT NOT NULL,
    PRIMARY KEY (id)
);

-- Alimentos
CREATE TABLE alimentos (
    alimento_id INT AUTO_INCREMENT PRIMARY KEY,
    nombreAlimento VARCHAR(255) UNIQUE NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    seccionMenu VARCHAR(255) NOT NULL,
    imagenUrl VARCHAR(255)
);

-- Sucursales
CREATE TABLE sucursales (
    sucursal_id INT AUTO_INCREMENT PRIMARY KEY,
    nombreSucursal VARCHAR(100) NOT NULL,
    estado VARCHAR(50) NOT NULL,
    calle VARCHAR(100) NOT NULL,
    numeroCalle VARCHAR(10) NOT NULL,
    codigoPostal VARCHAR(10) NOT NULL,
    delegacion VARCHAR(50) NOT NULL,
    horaApertura INT NOT NULL,
    minutoApertura INT NOT NULL,
    horaCierre INT NOT NULL,
    minutoCierre INT NOT NULL
);
-- Ordenes
CREATE TABLE ordenes (
    orden_id INT AUTO_INCREMENT PRIMARY KEY,
    delegacion VARCHAR(50) NOT NULL,
    calle VARCHAR(100) NOT NULL,
    numeroCalle VARCHAR(10) NOT NULL,
    codigoPostal VARCHAR(10) NOT NULL,
    palabraSecreta VARCHAR(50) NOT NULL,
    fechaOrden TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Detalles de orden
CREATE TABLE detalles_orden (
    detalle_id INT AUTO_INCREMENT PRIMARY KEY,
    orden_id INT NOT NULL,
    alimento_id INT NOT NULL,
    FOREIGN KEY (orden_id) REFERENCES ordenes(orden_id),
    FOREIGN KEY (alimento_id) REFERENCES alimentos(alimento_id)
);

-- Promociones
CREATE TABLE promociones (
    promocion_id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL
);

-- Empleados

CREATE TABLE empleados (
  empleado_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  dni VARCHAR(20) NOT NULL UNIQUE,
  correo VARCHAR(100) NOT NULL UNIQUE,
  contrasena VARCHAR(100) NOT NULL,
  rol ENUM('Administrador', 'Mesero', 'Cocinero', 'Repartidor') NOT NULL
);

-- Ventas
CREATE TABLE ventas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fecha DATE NOT NULL,
    total DECIMAL(10, 2) NOT NULL
);

--blackmoon
CREATE TABLE IF NOT EXISTS BlackMoon (
  id INT PRIMARY KEY AUTO_INCREMENT,
  saldoTotal DECIMAL(10, 2) NOT NULL
);



```

### Procedimientos Almacenados

```
DELIMITER $$

-- Guardar Cliente
CREATE PROCEDURE Cafeteria.GuardarCliente (
    IN p_nombre VARCHAR(255),
    IN p_correo VARCHAR(255),
    IN p_contrasenia VARCHAR(255),
    IN p_dia_de_cumpleanos INT,
    IN p_mes_de_cumpleanos INT
)
BEGIN
    INSERT INTO clientes (nombre, correo, contrasenia, dia_de_cumpleanos, mes_de_cumpleanos)
    VALUES (p_nombre, p_correo, p_contrasenia, p_dia_de_cumpleanos, p_mes_de_cumpleanos);
END $$

DELIMITER ;

-- Obtener Alimentos
DELIMITER //
CREATE PROCEDURE ObtenerAlimentos()
BEGIN
    SELECT * FROM alimentos;
END //
DELIMITER ;

-- Guardar Orden
DELIMITER //

CREATE PROCEDURE GuardarOrden(
    IN p_delegacion VARCHAR(50),
    IN p_calle VARCHAR(100),
    IN p_numeroCalle VARCHAR(10),
    IN p_codigoPostal VARCHAR(10),
    IN p_palabraSecreta VARCHAR(50),
    IN p_alimentos JSON
)
BEGIN
    DECLARE last_orden_id INT;
    START TRANSACTION;

    INSERT INTO ordenes (delegacion, calle, numeroCalle, codigoPostal, palabraSecreta) 
    VALUES (p_delegacion, p_calle, p_numeroCalle, p_codigoPostal, p_palabraSecreta);

    SET last_orden_id = LAST_INSERT_ID();

    INSERT INTO detalles_orden (orden_id, alimento_id)
    SELECT last_orden_id, alimento_id 
    FROM JSON_TABLE(p_alimentos, '$[*]' COLUMNS (alimento_id INT PATH '$')) AS jt;

    COMMIT;
END //

DELIMITER ;

// Obtener Promociones
DELIMITER //

CREATE PROCEDURE obtener_promociones()
BEGIN
    SELECT * FROM promociones WHERE CURDATE() BETWEEN fecha_inicio AND fecha_fin;
END //

DELIMITER ;


-- Insertar Empleado
DELIMITER //

CREATE PROCEDURE InsertarEmpleado(
  IN nombre VARCHAR(50),
  IN apellido VARCHAR(50),
  IN dni VARCHAR(20),
  IN correo VARCHAR(100),
  IN contrasena VARCHAR(100),
  IN rol ENUM('Administrador', 'Mesero', 'Cocinero', 'Repartidor')
)
BEGIN
  INSERT INTO empleados (nombre, apellido, dni, correo, contrasena, rol)
  VALUES (nombre, apellido, dni, correo, contrasena, rol);
END//

DELIMITER ;

-- Agregar Sucursal
CREATE PROCEDURE AgregarSucursal (
    IN p_nombreSucursal VARCHAR(100),
    IN p_estado VARCHAR(50),
    IN p_calle VARCHAR(100),
    IN p_numeroCalle VARCHAR(10),
    IN p_codigoPostal VARCHAR(10),
    IN p_delegacion VARCHAR(50),
    IN p_horaApertura INT,
    IN p_minutoApertura INT,
    IN p_horaCierre INT,
    IN p_minutoCierre INT
)
BEGIN
    INSERT INTO sucursales (nombreSucursal, estado, calle, numeroCalle, codigoPostal, delegacion, horaApertura, minutoApertura, horaCierre, minutoCierre)
    VALUES (p_nombreSucursal, p_estado, p_calle, p_numeroCalle, p_codigoPostal, p_delegacion, p_horaApertura, p_minutoApertura, p_horaCierre, p_minutoCierre);
END;

-- Modificar Sucursal
CREATE PROCEDURE ModificarSucursal (
    IN p_sucursal_id INT,
    IN p_nombreSucursal VARCHAR(100),
    IN p_estado VARCHAR(50),
    IN p_calle VARCHAR(100),
    IN p_numeroCalle VARCHAR(10),
    IN p_codigoPostal VARCHAR(10),
    IN p_delegacion VARCHAR(50),
    IN p_horaApertura INT,
    IN p_minutoApertura INT,
    IN p_horaCierre INT,
    IN p_minutoCierre INT
)
BEGIN
    UPDATE sucursales
    SET nombreSucursal = p_nombreSucursal,
        estado = p_estado,
        calle = p_calle,
        numeroCalle = p_numeroCalle,
        codigoPostal = p_codigoPostal,
        delegacion = p_delegacion,
        horaApertura = p_horaApertura,
        minutoApertura = p_minutoApertura,
        horaCierre = p_horaCierre,
        minutoCierre = p_minutoCierre
    WHERE sucursal_id = p_sucursal_id;
END;

-- Eliminar Sucursal
CREATE PROCEDURE EliminarSucursal (
    IN p_sucursal_id INT
)
BEGIN
    DELETE FROM sucursales
    WHERE sucursal_id = p_sucursal_id;
END;

-- Obtener Sucursales
CREATE PROCEDURE ObtenerSucursales()
BEGIN
    SELECT * FROM sucursales;
END;


DELIMITER //

CREATE PROCEDURE AgregarAlimento(
    IN nombreAlimento VARCHAR(255),
    IN precio DECIMAL(10, 2),
    IN seccionMenu VARCHAR(255),
    IN imagenUrl VARCHAR(255)
)
BEGIN
    INSERT INTO alimentos (nombreAlimento, precio, seccionMenu, imagenUrl)
    VALUES (nombreAlimento, precio, seccionMenu, imagenUrl);
END//

DELIMITER ;
DELIMITER //

CREATE PROCEDURE EliminarAlimento(
    IN alimento_id INT
)
BEGIN
    DELETE FROM alimentos WHERE alimento_id = alimento_id;
END//

DELIMITER ;
DELIMITER //

CREATE PROCEDURE ModificarAlimento(
    IN alimento_id INT,
    IN nombreAlimento VARCHAR(255),
    IN precio DECIMAL(10, 2),
    IN seccionMenu VARCHAR(255),
    IN imagenUrl VARCHAR(255)
)
BEGIN
    UPDATE alimentos 
    SET nombreAlimento = nombreAlimento,
        precio = precio,
        seccionMenu = seccionMenu,
        imagenUrl = imagenUrl
    WHERE alimento_id = alimento_id;
END//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE EliminarCliente(
    IN id_cliente INT
)
BEGIN
    DELETE FROM clientes WHERE id = id_cliente;
END//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE ModificarCliente(
    IN id_cliente INT,
    IN nombre VARCHAR(255),
    IN correo VARCHAR(255),
    IN contrasenia VARCHAR(255),
    IN dia_de_cumpleanos INT,
    IN mes_de_cumpleanos INT
)
BEGIN
    UPDATE clientes 
    SET nombre = nombre,
        correo = correo,
        contrasenia = contrasenia,
        dia_de_cumpleanos = dia_de_cumpleanos,
        mes_de_cumpleanos = mes_de_cumpleanos
    WHERE id = id_cliente;
END//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE AgregarEmpleado(
    IN nombre VARCHAR(50),
    IN apellido VARCHAR(50),
    IN dni VARCHAR(20),
    IN correo VARCHAR(100),
    IN contrasena VARCHAR(100),
    IN rol ENUM('Administrador', 'Mesero', 'Cocinero', 'Repartidor')
)
BEGIN
    INSERT INTO empleados (nombre, apellido, dni, correo, contrasena, rol)
    VALUES (nombre, apellido, dni, correo, contrasena, rol);
END//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE EliminarEmpleado(
    IN empleado_id INT
)
BEGIN
    DELETE FROM empleados WHERE empleado_id = empleado_id;
END//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE ModificarEmpleado(
    IN empleado_id INT,
    IN nombre VARCHAR(50),
    IN apellido VARCHAR(50),
    IN dni VARCHAR(20),
    IN correo VARCHAR(100),
    IN contrasena VARCHAR(100),
    IN rol ENUM('Administrador', 'Mesero', 'Cocinero', 'Repartidor')
)
BEGIN
    UPDATE empleados 
    SET nombre = nombre,
        apellido = apellido,
        dni = dni,
        correo = correo,
        contrasena = contrasena,
        rol = rol
    WHERE empleado_id = empleado_id;
END//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE AgregarPromocion(
    IN titulo VARCHAR(255),
    IN descripcion TEXT,
    IN imagen VARCHAR(255),
    IN fecha_inicio DATE,
    IN fecha_fin DATE
)
BEGIN
    INSERT INTO promociones (titulo, descripcion, imagen, fecha_inicio, fecha_fin)
    VALUES (titulo, descripcion, imagen, fecha_inicio, fecha_fin);
END//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE EliminarPromocion(
    IN promocion_id INT
)
BEGIN
    DELETE FROM promociones WHERE promocion_id = promocion_id;
END//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE ModificarPromocion(
    IN promocion_id INT,
    IN titulo VARCHAR(255),
    IN descripcion TEXT,
    IN imagen VARCHAR(255),
    IN fecha_inicio DATE,
    IN fecha_fin DATE
)
BEGIN
    UPDATE promociones 
    SET titulo = titulo,
        descripcion = descripcion,
        imagen = imagen,
        fecha_inicio = fecha_inicio,
        fecha_fin = fecha_fin
    WHERE promocion_id = promocion_id;
END//

DELIMITER ;


```
### Total Procedimientos
```
mysql> SELECT ROUTINE_NAME, ROUTINE_TYPE
    -> FROM information_schema.ROUTINES
    -> WHERE ROUTINE_SCHEMA = 'Cafeteria' AND ROUTINE_TYPE = 'PROCEDURE';
+---------------------+--------------+
| ROUTINE_NAME        | ROUTINE_TYPE |
+---------------------+--------------+
| AgregarSucursal     | PROCEDURE    |
| EliminarSucursal    | PROCEDURE    |
| GuardarCliente      | PROCEDURE    |
| GuardarOrden        | PROCEDURE    |
| ModificarSucursal   | PROCEDURE    |
| ObtenerAlimentos    | PROCEDURE    |
| ObtenerSucursales   | PROCEDURE    |
| obtener_promociones | PROCEDURE    |
+---------------------+--------------+
8 rows in set (0.00 sec)
```
