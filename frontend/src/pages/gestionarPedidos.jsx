import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../layouts/desktopHeader";
import MobileHeader from "../layouts/mobileHeader";
import EditarEstadoPedido from "../components/editarEstadoPedido";
import VerDetallesPedidoAdmin from "../components/verDetallesPedidoAdmin";
import EliminarPedido from "../components/eliminarPedido";
import Footer from "../layouts/footer";
import { motion } from "framer-motion";

const PaginasPedidos = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    // Fetch orders from API
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get(
                    "https://comunitech.onrender.com/api/pedidos/todos",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                setOrders(response.data.pedidos);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setError("Error al cargar los pedidos.");
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    // Actualizar estado en vivo
    const updateOrderStatus = (orderId, newStatus) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id_pedido === orderId ? { ...order, estado: newStatus } : order
            )
        );
    };

    return (
        <><motion.div
            className="min-h-screen p-6 bg-gray-100 dark:bg-[#1A1A1A] text-gray-900 dark:text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
        >
            <div className="hidden xl:block">
                <Header />
            </div>
            <div className="xl:hidden">
                <MobileHeader />
            </div>
            <h1 className="text-3xl font-bold mb-8 text-center">Gestión de Pedidos</h1>

            {loading ? (
                <p className="text-center">Cargando pedidos...</p>
            ) : error ? (
                <p className="text-red-500 text-center">{error}</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {orders.map((order, index) => (
                        <motion.div
                            key={order.id_pedido}
                            className="p-4 relative bg-white dark:bg-[#1E1E1E] rounded-lg shadow-lg border border-gray-300 dark:border-gray-700"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                            <div className="absolute top-2 right-2 flex space-x-5">
                                <VerDetallesPedidoAdmin pedidoId={order.id_pedido} />
                                <EliminarPedido
                                    pedidoId={order.id_pedido} // ID del pedido
                                    onPedidoEliminado={(idEliminado) => setOrders((prevOrders) => prevOrders.filter((pedido) => pedido.id_pedido !== idEliminado))} />
                            </div>
                            <div className="mb-4">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200">
                                    Pedido #{order.id_pedido}
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 ">
                                    Cliente: {order.usuario_nombre}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Fecha: {new Date(order.fecha_pedido).toLocaleDateString()}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    <span className="font-bold">Dirección:</span>{" "}
                                    {order.direccion && `${order.direccion}, `}
                                    {order.ciudad && `${order.ciudad}, `}
                                    {order.estado_direccion && `${order.estado_direccion}, `}
                                    {order.pais && `${order.pais} `}
                                    {order.codigo_postal && `(${order.codigo_postal})`}
                                </p>

                            </div>

                            <div className="mb-4">
                                <span
                                    className={`px-3 py-1 rounded-full text-sm font-semibold ${order.estado === "Pendiente"
                                        ? "bg-yellow-500 text-white"
                                        : order.estado === "Enviado"
                                            ? "bg-blue-500 text-white"
                                            : order.estado === "Entregado"
                                                ? "bg-green-500 text-white"
                                                : "bg-red-500 text-white"}`}
                                >
                                    {order.estado}
                                </span>
                            </div>

                            <EditarEstadoPedido
                                orderId={order.id_pedido}
                                currentStatus={order.estado}
                                onStatusUpdate={updateOrderStatus} />
                        </motion.div>
                    ))}
                </div>
            )}
        </motion.div>
        <Footer />
        </>
    );
};

export default PaginasPedidos;
