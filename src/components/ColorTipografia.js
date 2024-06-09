/**
 * @author Noh Ah Kim Kwon
 * Component that defines the typography and colors of the company Qualitas
 */

import { createContext } from 'react';

/* Context for colors and typography */
export const ColorTipografiaContexto = createContext();

/* Provider of colors and typography */
export const ColorTipografiaProveedor = ({ children }) => {
    /* Palette of colors */
    const colores = {
        primarioM: '#941B80',
        primarioA: '#0096AE',
        secundarioM: 'rgb(111,28,117)',
    };

    /* Typography */
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