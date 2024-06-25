const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors'); // Importa el paquete cors
const app = express();
const port = 3001;

// Configura cors para permitir solicitudes desde cualquier origen
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '5673',
    database: 'Cafeteria'
});

connection.connect(err => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos MySQL');
});

// Middleware para parsear el cuerpo de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Endpoint para guardar un cliente
app.post('/guardar-cliente', (req, res) => {
    const { nombre, correo, contrasenia, dia_de_cumpleanos, mes_de_cumpleanos } = req.body;

    const query = `CALL GuardarCliente(?, ?, ?, ?, ?)`;
    connection.query(query, [nombre, correo, contrasenia, dia_de_cumpleanos, mes_de_cumpleanos], (error, results) => {
        if (error) {
            console.error('Error ejecutando la consulta:', error.stack);
            if (error.code === 'ER_DUP_ENTRY') {
                res.status(400).send('El correo ya está registrado');
            } else {
                res.status(500).send('Error al guardar el cliente');
            }
            return;
        }
        res.status(200).send('Cliente guardado exitosamente');
    });
});

// Endpoint para iniciar sesión
app.post('/iniciar-sesion', (req, res) => {
    const { correo, contrasenia } = req.body;

    const query = `SELECT contrasenia FROM clientes WHERE correo = ?`;
    connection.query(query, [correo], async (error, results) => {
        if (error) {
            console.error('Error ejecutando la consulta:', error.stack);
            res.status(500).send('Error al iniciar sesión');
            return;
        }

        if (results.length === 0) {
            res.status(400).send('Correo o contraseña incorrectos');
            return;
        }

        const storedPassword = results[0].contrasenia;

        // Comparar la contraseña ingresada con la contraseña almacenada usando bcrypt
        const match = await (contrasenia, storedPassword);

        if (!match) {
            res.status(400).send('Correo o contraseña incorrectos');
            return;
        }

        res.status(200).send('Inicio de sesión exitoso');
    });
});

// Endpoint para obtener los alimentos
app.get('/alimentos', (req, res) => {
    const query = 'CALL ObtenerAlimentos()';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error ejecutando la consulta:', error.stack);
            res.status(500).send('Error al obtener los alimentos');
            return;
        }
        res.status(200).json(results[0]);
    });
});

// Sucursales
app.get('/sucursales', (req, res) => {
    const query = 'SELECT * FROM sucursales';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener las sucursales:', error);
            res.status(500).send('Error al obtener las sucursales');
            return;
        }
        res.status(200).json(results);
    });
});

// Alimentos
app.get('/alimentos', (req, res) => {
    const query = 'SELECT * FROM alimentos';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener los alimentos:', error);
            res.status(500).send('Error al obtener los alimentos');
            return;
        }
        res.status(200).json(results);
    });
});

// Endpoint para realizar una orden
app.post('/ordenar', (req, res) => {
    const { direccion, pedidos } = req.body;
    const alimentos = JSON.stringify(pedidos.map(p => p.alimento_id));

    const query = `CALL GuardarOrden(?, ?, ?, ?, ?, ?)`;
    connection.query(query, [direccion.delegacion, direccion.calle, direccion.numeroCalle, direccion.codigoPostal, direccion.palabraSecreta, alimentos], (error, results) => {
        if (error) {
            console.error('Error al guardar la orden:', error);
            res.status(500).send('Error al guardar la orden');
            return;
        }
        res.status(200).send('Orden guardada exitosamente');
    });
});

// Promociones
app.get('/promociones', (req, res) => {
    const query = 'SELECT * FROM promociones';

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener las promociones:', error);
            res.status(500).send('Error al obtener las promociones');
            return;
        }
        res.status(200).json(results);
    });
});

// Endpoint para iniciar sesión como empleado
app.post('/login-admin', (req, res) => {
    const { correo, contrasena, rol } = req.body;

    const query = `SELECT contrasena, rol FROM empleados WHERE correo = ? AND rol = ?`;
    connection.query(query, [correo, rol], async (error, results) => {
        if (error) {
            console.error('Error ejecutando la consulta:', error.stack);
            res.status(500).send('Error al iniciar sesión');
            return;
        }

        if (results.length === 0) {
            res.status(400).send('Correo o rol incorrectos');
            return;
        }

        const storedPassword = results[0].contrasena;

        // Comparar la contraseña ingresada con la contraseña almacenada usando bcrypt
        const match = await (contrasena, storedPassword);

        if (!match) {
            res.status(400).send('Correo o contraseña incorrectos');
            return;
        }

        res.status(200).send({ success: true, rol: results[0].rol });
    });
});

// Ventas
app.get('/ventas', (req, res) => {
    const query = 'SELECT * FROM ventas';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener las ventas:', error);
            res.status(500).send('Error al obtener las ventas');
            return;
        }
        res.status(200).json(results);
    });
});

// Sucursales
app.get('/sucursales', (req, res) => {
    const query = 'SELECT * FROM sucursales';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener las sucursales:', error);
            res.status(500).send('Error al obtener las sucursales');
            return;
        }
        res.status(200).json(results);
    });
});

// Alimentos
app.get('/alimentos', (req, res) => {
    const query = 'SELECT * FROM alimentos';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener los alimentos:', error);
            res.status(500).send('Error al obtener los alimentos');
            return;
        }
        res.status(200).json(results);
    });
});

// Empleados
app.get('/empleados', (req, res) => {
    const query = 'SELECT * FROM empleados';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener los empleados:', error);
            res.status(500).send('Error al obtener los empleados');
            return;
        }
        res.status(200).json(results);
    });
});

// Clientes
app.get('/clientes', (req, res) => {
    const query = 'SELECT * FROM clientes';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener los clientes:', error);
            res.status(500).send('Error al obtener los clientes');
            return;
        }
        res.status(200).json(results);
    });
});

// Promociones
app.get('/promociones', (req, res) => {
    const query = 'SELECT * FROM promociones';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener las promociones:', error);
            res.status(500).send('Error al obtener las promociones');
            return;
        }
        res.status(200).json(results);
    });
});

app.get('/blackmoon', (req, res) => {
    const query = 'SELECT saldoTotal FROM BlackMoon';
    connection.query(query, (error, results) => {
        if (error) {
            console.error('Error al obtener blackmoon:', error);
            res.status(500).send('Error al obtener');
            return;
        }
        // Suponiendo que el saldoTotal se encuentra en la primera fila de resultados
        const saldoTotal = results[0] ? results[0].saldoTotal : 0;
        res.status(200).json({ saldoTotal });
    });
});




app.listen(port, () => {
    console.log(`Servidor backend corriendo en el puerto ${port}`);
});
