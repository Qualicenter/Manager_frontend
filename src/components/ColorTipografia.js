/**
 * Componente para definir la tipografía y colores de la empresa
 * Autor: Noh Ah Kim Kwon
 * Fecha: 2024-06-02
 */

import { createContext } from 'react';

// Contexto para los colores y tipografía
export const ColorTipografiaContexto = createContext();

// Proveedor de colores y tipografía
export const ColorTipografiaProveedor = ({ children }) => {
    // Paleta de colores
    const colores = {
        primarioM: '#941B80',
        primarioA: '#0096AE',
        secundarioM: 'rgb(111,28,117)',
    };

    // Tipografía
    const tipografia = {
        tipo1: 'Arial, sans-serif',
        tipo2: 'Century Gothic, sans-serif',
        tamanio: '16px',
    };

    return (
        <ColorTipografiaContexto.Provider value={{ colores, tipografia }}>
            {children}
        </ColorTipografiaContexto.Provider>
    );
};