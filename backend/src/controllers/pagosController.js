const db = require('../config/db');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const jwt = require('jsonwebtoken');

// Crear una sesión de Stripe Checkout
const crearCheckoutSession = async (req, res) => {
    const { usuario_id, direccion_id } = req.body; // Recoger usuario y dirección

    try {
        // Obtener los productos del carrito del usuario
        const [productos] = await db.query(
            `SELECT c.cantidad, p.nombre, p.precio, p.imagen_url
             FROM carrito c
             JOIN productos p ON c.producto_id = p.id_producto
             WHERE c.usuario_id = ?`,
            [usuario_id]
        );

        if (productos.length === 0) {
            return res.status(400).json({ mensaje: 'El carrito está vacío.' });
        }

        // Crear los elementos de la sesión de Stripe a partir del carrito
        const line_items = productos.map((item) => ({
            price_data: {
                currency: 'cop', // Moneda en pesos colombianos
                product_data: {
                    name: item.nombre,
                    images: [item.imagen_url || 'https://via.placeholder.com/150'], // URL de la imagen
                },
                unit_amount: Math.round(item.precio * 100), // Convertir a centavos
            },
            quantity: item.cantidad,
        }));

        // Crear la sesión de Stripe Checkout
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'], // Métodos de pago admitidos
            line_items,
            mode: 'payment', // Modo de pago completo
            cancel_url: 'http://localhost:5173/carrito', // URL de cancelación
            success_url: 'http://localhost:5173/', // URL de éxito
            metadata: {
                usuario_id: usuario_id, // Pasar el ID del usuario como metadato
                direccion_id: direccion_id, // Pasar el ID de la dirección como metadato
            },
        });

        // Devolver el URL de la sesión de Stripe
        res.status(200).json({ url: session.url });
    } catch (error) {
        console.error('Error al crear la sesión de checkout:', error);
        res.status(500).json({ mensaje: 'Error al crear la sesión de checkout.', error });
    }
};

const verPagos = async (req, res) => {
    try {
        // Obtener todos los pagos con la información del usuario
        const [pagos] = await db.query(
            `SELECT p.id_pago, p.fecha_pago, p.monto, p.metodo_pago, p.estado_pago, p.referencia_transaccion, 
                    u.nombre AS usuario
             FROM pagos p
             JOIN usuarios u ON p.id_usuario = u.id_usuario`
        );

        res.status(200).json(pagos);
    } catch (error) {
        console.error('Error al obtener los pagos:', error);
        res.status(500).json({ mensaje: 'Error al obtener los pagos.', error });
    }
};

const obtenerIngresos = async (req, res) => {
    try {
        const { periodo } = req.query; // Captura el parámetro de la URL

        // Validar que el período sea válido
        const periodosValidos = {
            "ultimo_mes": "1 MONTH",
            "ultimos_3_meses": "3 MONTH",
            "ultimo_ano": "1 YEAR",
            "todos": null // Para ingresos totales
        };

        if (!periodosValidos[periodo]) {
            return res.status(400).json({ mensaje: "Período no válido. Usa: ultimo_mes, ultimos_3_meses, ultimo_ano, todos." });
        }

        let consultaSQL = `SELECT SUM(monto) AS ingresos FROM pagos WHERE estado_pago = 'Exitoso'`;

        // Agregar filtro de fecha si no es "todos"
        if (periodo !== "todos") {
            consultaSQL += ` AND fecha_pago >= DATE_SUB(NOW(), INTERVAL ${periodosValidos[periodo]})`;
        }

        const [resultado] = await db.query(consultaSQL);

        res.status(200).json({ periodo, ingresos: resultado[0].ingresos || 0 });
    } catch (error) {
        console.error("Error al obtener los ingresos:", error);
        res.status(500).json({ mensaje: "Error al obtener los ingresos.", error });
    }
};

const eliminarPago = async (req, res) => {
    const { id_pago } = req.params;

    try {
        // Eliminar el pago de la base de datos
        await db.query('DELETE FROM pagos WHERE id_pago = ?', [id_pago]);

        res.status(200).json({ mensaje: 'Pago eliminado correctamente.' });
    } catch (error) {
        console.error('Error al eliminar el pago:', error);
        res.status(500).json({ mensaje: 'Error al eliminar el pago.', error });
    }
}




module.exports = { crearCheckoutSession, verPagos, obtenerIngresos, eliminarPago };