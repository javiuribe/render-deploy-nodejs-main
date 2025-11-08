const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

// Lista de productos
const productos = [
  // 🧥 CHAQUETAS
  {
    "id": 1,
    "nombre": "Chaqueta Invierno",
    "marca": "NorthWear",
    "precioInicial": 89.99,
    "talla": "L",
    "color": "NEGRO",
    "botones": 2,
    "bolsillos": 4,
    "conCapucha": true,
    "nivelAbrigo": 5,
    "tipo": "chaqueta"
  },
  {
    "id": 2,
    "nombre": "Chaqueta de Cuero",
    "marca": "RiderStyle",
    "precioInicial": 119.99,
    "talla": "M",
    "color": "NEGRO",
    "botones": 1,
    "bolsillos": 3,
    "conCapucha": false,
    "nivelAbrigo": 4,
    "tipo": "chaqueta"
  },
  {
    "id": 3,
    "nombre": "Chaqueta Vaquera",
    "marca": "DenimPro",
    "precioInicial": 74.99,
    "talla": "L",
    "color": "AZUL",
    "botones": 6,
    "bolsillos": 2,
    "conCapucha": false,
    "nivelAbrigo": 3,
    "tipo": "chaqueta"
  },
  {
    "id": 4,
    "nombre": "Chaqueta Ligera de Primavera",
    "marca": "FreshWind",
    "precioInicial": 59.99,
    "talla": "M",
    "color": "VERDE",
    "botones": 0,
    "bolsillos": 2,
    "conCapucha": true,
    "nivelAbrigo": 2,
    "tipo": "chaqueta"
  },

  // 👕 CAMISETAS
  {
    "id": 5,
    "nombre": "Camiseta Casual",
    "marca": "UrbanLife",
    "precioInicial": 19.99,
    "talla": "M",
    "color": "AZUL",
    "botones": 0,
    "bolsillos": 0,
    "conCapucha": false,
    "nivelAbrigo": 1,
    "tipo": "camiseta"
  },
  {
    "id": 6,
    "nombre": "Camiseta Básica",
    "marca": "Adidas",
    "precioInicial": 14.99,
    "talla": "L",
    "color": "BLANCO",
    "botones": 0,
    "bolsillos": 0,
    "conCapucha": false,
    "nivelAbrigo": 1,
    "tipo": "camiseta"
  },
  {
    "id": 7,
    "nombre": "Camiseta Deportiva",
    "marca": "Nike",
    "precioInicial": 24.99,
    "talla": "S",
    "color": "ROJO",
    "botones": 0,
    "bolsillos": 0,
    "conCapucha": false,
    "nivelAbrigo": 1,
    "tipo": "camiseta"
  },
  {
    "id": 8,
    "nombre": "Camiseta Oversize",
    "marca": "Zara",
    "precioInicial": 22.50,
    "talla": "XL",
    "color": "NEGRO",
    "botones": 0,
    "bolsillos": 0,
    "conCapucha": false,
    "nivelAbrigo": 1,
    "tipo": "camiseta"
  },

  // 👖 PANTALONES
  {
    "id": 9,
    "nombre": "Pantalón Deportivo",
    "marca": "FitZone",
    "precioInicial": 39.99,
    "talla": "S",
    "color": "ROJO",
    "botones": 1,
    "bolsillos": 2,
    "conCapucha": false,
    "nivelAbrigo": 2,
    "tipo": "pantalon"
  },
  {
    "id": 10,
    "nombre": "Pantalón Vaquero Slim",
    "marca": "Levi’s",
    "precioInicial": 59.99,
    "talla": "M",
    "color": "AZUL",
    "botones": 1,
    "bolsillos": 4,
    "conCapucha": false,
    "nivelAbrigo": 2,
    "tipo": "pantalon"
  },
  {
    "id": 11,
    "nombre": "Pantalón Chino",
    "marca": "Springfield",
    "precioInicial": 49.99,
    "talla": "L",
    "color": "VERDE",
    "botones": 1,
    "bolsillos": 2,
    "conCapucha": false,
    "nivelAbrigo": 2,
    "tipo": "pantalon"
  },
  {
    "id": 12,
    "nombre": "Pantalón Cargo",
    "marca": "H&M",
    "precioInicial": 44.99,
    "talla": "XL",
    "color": "NEGRO",
    "botones": 2,
    "bolsillos": 6,
    "conCapucha": false,
    "nivelAbrigo": 3,
    "tipo": "pantalon"
  }
];

// Ruta para obtener productos
app.get('/productos', (req, res) => {
  res.send(productos);  // Enviar solo la lista de productos
});

// Lista de clientes
let clientes = [
    {
        id: 1,
        dni: "12345678A",
        nombre: "Juan Pérez",
        direccion: "Calle Falsa 123",
        telefono: "555123456",
        email: "juan@gmail.com",
        password: "1234",
        pedidos: [] 
      }
]
app.get('/clientes', (req, res) => {
  res.send(clientes);
});

// Ruta para agregar un nuevo cliente
app.post('/clientes/registro', (req, res) => {
  console.log("Datos recibidos:" + req.body); 
  const { dni, nombre, direccion, telefono, email, password } = req.body;
  // Verificar si ya existe un cliente con el mismo email
  const clienteExistente = clientes.find(c => c.email === email);
  if (clienteExistente) {
    // Si el email ya está registrado, devolver un error
    return res.status(400).send({ message: 'El usuario con el email ${email} ya existe.' });
  }
  // Crear un nuevo cliente
  const nuevoCliente = {
    id: clientes.length + 1, // Generar un nuevo ID
    dni,
    nombre,
    direccion,
    telefono,
    email,
    password,
    pedidos: [] // Inicialmente vacío
  };

  // Agregar el nuevo cliente a la lista
  clientes.push(nuevoCliente);

  // Responder con el nuevo cliente
  res.status(201).send(nuevoCliente);
});

// Ruta para login de un cliente
app.post('/clientes/login', (req, res) => {
  const { email, password } = req.body;

  // Buscar el cliente por email
  const cliente = clientes.find(c => c.email === email);

  // Verificar si el cliente existe y si la contraseña coincide
  if (cliente && cliente.password === password) {
    res.status(200).send(cliente);
  } else {
    res.status(401).send({ message: 'Email o contraseña incorrectos' });
  }
});

// Servidor escuchando
app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto: ${port}`);
});
