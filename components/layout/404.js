import React from 'react';
import { css } from '@emotion/core';

const Error404 = () => {
    return (
        <div 
        css={css`
                margin-top: 5rem;
                text-align: center;
            `}>
            <h1>No es posible mostrar el contenido</h1>
            <p>Talvez hubo un error, la url no existe o no iniciaste sesión.</p>
        </div> 
     );
}
 
export default Error404;