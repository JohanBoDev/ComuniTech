import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Header from "../layouts/desktopHeader";
import MobileHeader from "../layouts/mobileHeader";
import { useAuth } from "../context/AuthContext";
import noPermiso from "../assets/admin_no_permiso.svg";
import Footer from "../layouts/footer";

const GestionarPagos = () => {
    const [pagos, setPagos] = useState([]);
    const [ingresos, setIngresos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    const { isAdmin } = useAuth();

    const obtenerPagos = async () => {
        try {
            setLoading(true);
            const response = await axios.get(
                "https://comunitech.onrender.com/api/pagos/ObtenerPagos",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setPagos(response.data);
        } catch (error) {
            console.error("Error al obtener los pagos:", error);
            setError("No se pudieron obtener los pagos.");
        } finally {
            setLoading(false);
        }
    };

    const obtenerIngresos = async (periodo) => {
        try {
            const response = await axios.get(
                `https://comunitech.onrender.com/api/pagos/reporteIngresos?periodo=${periodo}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            setIngresos(response.data.ingresos || 0);
        } catch (error) {
            console.error("Error al obtener los ingresos:", error);
            setError("No se pudieron obtener los ingresos.");
        }
    };

    const eliminarPago = async (id_pago) => {
        try {
            await axios.delete(
                `https://comunitech.onrender.com/api/pagos/eliminarPago/${id_pago}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            obtenerPagos();
        } catch (error) {
            console.error("Error al eliminar el pago:", error);
            setError("No se pudo eliminar el pago.");
        }
    };

    useEffect(() => {
        obtenerPagos();
    }, []);

    return (
        <>
            {/* Header */}
            <div className="hidden xl:block">
                <Header />
            </div>
            <div className="xl:hidden">
                <MobileHeader />
            </div>
            {isAdmin ? (
                <motion.div
                    className="min-h-screen p-6 bg-gray-100 dark:bg-[#1A1A1A] text-gray-900 dark:text-gray-200"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                >


                    {/* Título */}
                    <h1 className="text-3xl font-bold mb-8 text-center">Gestión de Pagos</h1>

                    {/* Botones para consultar ingresos */}
                    <motion.div
                        className="flex flex-col items-center justify-center gap-4 mb-6"
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
                    >
                        <p className="text-lg font-medium text-gray-700 dark:text-gray-300 text-center">
                            Consulta los ingresos generados por Comunitech en diferentes períodos:
                        </p>

                        <div className="flex flex-wrap justify-center gap-4">
                            {[
                                { key: "ultimo_mes", label: "Último mes" },
                                { key: "ultimos_3_meses", label: "Últimos 3 meses" },
                                { key: "ultimo_ano", label: "Último año" }
                            ].map(({ key, label }) => (
                                <button
                                    key={key}
                                    onClick={() => obtenerIngresos(key)}
                                    className="px-5 py-2.5 text-base font-medium text-white bg-black 
                            rounded-lg shadow-md hover:bg-gray-800 
                            transition duration-300 transform hover:scale-105"
                                >
                                    {label}
                                </button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Mostrar ingresos obtenidos */}
                    {ingresos !== null && (
                        <motion.div
                            className="text-center mb-6 text-lg font-semibold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            Ingresos: <span className="text-green-600 dark:text-green-400 font-bold">
                                ${(ingresos / 1).toLocaleString("es-CO")}
                            </span>
                        </motion.div>
                    )}

                    {/* Cards de pagos */}
                    {loading ? (
                        <p className="text-center">Cargando pagos...</p>
                    ) : error ? (
                        <p className="text-red-500 text-center">{error}</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {pagos.map((pago, index) => (
                                <motion.div
                                    key={pago.id_pago}
                                    className="p-4 relative bg-white dark:bg-[#1E1E1E] rounded-lg shadow-lg border border-gray-300 dark:border-gray-700"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                >
                                    {/* Estado del pago */}
                                    <div className="absolute top-2 right-2">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${pago.estado_pago === "Exitoso"
                                                    ? "bg-green-500 text-white"
                                                    : "bg-red-500 text-white"}`}
                                        >
                                            {pago.estado_pago}
                                        </span>
                                    </div>

                                    {/* Información del pago */}
                                    <div className="mb-4">
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-200">
                                            Pago #{pago.id_pago}
                                        </h2>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Usuario: {pago.usuario}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Método: {pago.metodo_pago}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Fecha: {new Date(pago.fecha_pago).toLocaleString()}
                                        </p>
                                        <button
                                            onClick={() => eliminarPago(pago.id_pago)}
                                            className="text-sm text-red-500 dark:text-red-400 hover:underline"  >
                                            <span className="text-red-500 dark:text-red-400">Eliminar</span>
                                        </button>
                                    </div>

                                    {/* Monto y referencia */}
                                    <div className="mb-4">
                                        <p className="text-lg font-bold text-gray-900 dark:text-gray-200">
                                            Monto: <span className="text-green-600 dark:text-green-400">
                                                ${Math.floor(pago.monto).toLocaleString("es-CO")}
                                            </span>
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 break-all">
                                            Referencia: {pago.referencia_transaccion}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            ) : (
                <div className="flex-grow dark:bg-black bg-white container mx-auto  p-4 md:p-8 ">
                    <img src={noPermiso} alt="No tienes permisos" className="mx-auto size-96 mb-10 " />
                    <h1 className="text-3xl dark:text-white text-black font-bold mb-6 text-center">¡Ups! No tienes permisos para acceder a esta página</h1>
                </div>
            )}

            <Footer />
        </>
    );
};

export default GestionarPagos;

