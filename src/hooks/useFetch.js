import { useState, useEffect } from "react";
import axios from "axios";

/**
 * Hook personalizado useFetch: Consume APIs de forma reutilizable
 * @param {string} url - URL de la API a consultar
 * @returns {Object} {data, loading, error} - Estados de la petición
 */
export function useFetch(url) {
  // Estado inicial: array vacío (nunca null para evitar errores en .map())
  const [data, setData] = useState([]);
  
  // Loading inicia en true para mostrar spinner en primera carga
  const [loading, setLoading] = useState(true);
  
  // Error inicia en null (sin errores)
  const [error, setError] = useState(null);

  // useEffect se ejecuta cuando cambia la URL (optimización)
  useEffect(() => {
    // AbortController: cancela petición si componente se desmonta
    const controller = new AbortController();

    // Función async que maneja toda la lógica de fetch
    const fetchData = async () => {
      try {
        // Indica que está cargando (reinicia cada fetch)
        setLoading(true);
        
        // Petición GET con AbortSignal para cancelación
        const response = await axios.get(url, { 
          signal: controller.signal  // Permite abortar la petición
        });
        
        // Guarda datos de la API (asume array)
        setData(response.data);
        
        // Limpia errores previos
        setError(null);
        
      } catch (err) {
        // Ignora errores de cancelación (limpieza normal)
        if (err.name === 'CanceledError') {
          console.log("Request canceled:", err.message);
          return;  // No setea error ni data
        }
        
        // Otros errores: guarda error y array vacío
        setError(err);
        setData([]);  // Mantiene consistencia (siempre array)
        
      } finally {
        // SIEMPRE termina loading, pase lo que pase
        setLoading(false);
      }
    };

    // Ejecuta el fetch
    fetchData();

    // Cleanup: cancela petición si componente se desmonta
    // Evita memory leaks y setState en componente desmontado
    return () => {
      controller.abort();
    };
    
  }, [url]);  // Solo refetch si cambia la URL

  // Devuelve estados para usar en componentes
  return { data, loading, error };
}