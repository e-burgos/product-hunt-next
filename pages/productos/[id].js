import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { FirebaseContext } from '../../firebase/index';
import Layout from '../../components/layout/Layout';
import Error404 from '../../components/layout/404';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { Campo, InputSubmit } from '../../components/ui/Formulario';
import Boton from '../../components/ui/Boton';

const ContenedorProducto = styled.div`
   @media (min-width:768px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        column-gap: 2rem;
   }
`;
const CreadorProducto = styled.p`
    padding: .5rem 2rem;
    background-color: #DA552F;
    color: #fff;
    text-transform: uppercase;
    font-weight: bold;
    display: inline-block;
    text-align: center;
    border-radius: 5px;
`;
const ContenedorInfo = styled.div`
    padding: 3rem;
    border: 1px solid #D1D1D1;
    border-radius: 5px;
    margin-bottom: 2rem;
`;

const ContenedorVotos = styled.div`
    padding: 3rem;
    border: 1px solid #D1D1D1;
    border-radius: 5px;
    margin-bottom: 2rem;
    background-color: #F3F3F3;
`;

const Producto = () => {

    // State del producto
    const [ producto, guardarProducto ] = useState({});
    const [ error, guardarError ] = useState(false);
    const [comentario, guardarComentario ] = useState({});
    const [ consultarDB, guardarConsultarDB ] = useState(true);

    // Usamos routing para obtener el id actual
    const router = useRouter();
    const { query: {id} } = router;

    // Context de firebase
    const { firebase, usuario } = useContext(FirebaseContext);

    useEffect(() => {
        if(id && consultarDB){
            const obtenerProducto = async () => {
                const productoQuery = await firebase.db.collection('productos').doc(id);
                const producto = await productoQuery.get();
                if(producto.exists){
                    guardarProducto(producto.data());
                    guardarConsultarDB(false);
                } else {
                    guardarError(true);
                    guardarConsultarDB(false);
                }
            }
            obtenerProducto();
        }
    }, [id]);

    if(Object.keys(producto).length === 0 && !error)  return 'Cargando...';

    const { comentarios, creado, descripcion, empresa, nombre, url, urlimagen, votos, creador, haVotado } = producto;

    // Verificar y validar los votos
    const votarProducto = () => {
        if(!usuario) {
            return router.push('/login')
        }
        // Obtener la suma de un nuevo voto
        const nuevoTotal = votos + 1;

        // Verificar si el usuario actual ha votado
        if(haVotado.includes(usuario.uid)) return;

        // Guardar id del usuario que ha votado
        const nuevoHaVotado = [ ...haVotado, usuario.uid]

        // Actualizar la DB
        firebase.db.collection('productos').doc(id).update({ 
            votos: nuevoTotal,
            haVotado: nuevoHaVotado
         })

        // Actualizar el state
        guardarProducto({
            ...producto,
            votos: nuevoTotal
        })

        // hay un voto por lo tanto consultar a la DB
        guardarConsultarDB(true);
    }

    // Funciones para crear comentarios
    const comentarioChange = e => {
        guardarComentario({
            ...comentario,
            [e.target.name] : e.target.value
        })
    }

    // Ientifica si el comentario es del creador del producto
    const esCreador = id => {
        if(creador.id == id) {
            return true;
        }
    }

    // Generando un id para el comentario 
    function generateUUID() {
        var d = new Date().getTime();
        var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
        return uuid;
    }

    const agregarComentario = e => {
        e.preventDefault();

        if(!usuario) {
            return router.push('/login')
        };

        // Informacion extra al comentario
        comentario.id = generateUUID();
        comentario.usuarioId = usuario.uid;
        comentario.usuarioNombre = usuario.displayName;

        // tomar copia de comentario y agregarlos al arreglo
        const nuevosComentarios = [ ...comentarios, comentario ];

        // Actualizar la DB
        firebase.db.collection('productos').doc(id).update({ 
            comentarios: nuevosComentarios 
        });

        // Actualizar el state
        guardarProducto({
            ...producto,
            comentarios: nuevosComentarios
        });

        // hay un comentario por lo tanto consultar a la DB
        guardarConsultarDB(true);
    };

    // Funcion que revisa que el creador del producto sea el mismo que esta autenticado
    const puedeBorrar = () => {
        if(!usuario) return false;

        if(creador.id === usuario.uid) {
            return true;
        }
    }

    // Eliminar todos los comentarios de la DB
    const eliminarComentarios = async() => {
        if(!usuario || creador.id !== usuario.uid) {
            return router.push('/login');
        };
        
        try {
            await firebase.db.collection('productos').doc(id).update({ 
            comentarios: [] 
        });
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    // Eliminar un comentario espesifico de la DB
    const eliminarComentario = (id) => {
        
        console.log(id);
    }

    // Eliminar un producto de la DB
    const eliminarProducto = async() => {
        if(!usuario || creador.id !== usuario.uid) {
            return router.push('/login');
        };

        try {
            await firebase.db.collection('productos').doc(id).delete();
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    }

    if(error) {
      return (
      <div>
        <Layout>
          <Error404 />
        </Layout>
      </div>
      )
    };

    return ( 
        <Layout>
            <div className="listado-productos">
                <div className="contenedor">
                    <div className="bg-white">
                         <div className="producto">
                            <h1 css={css`
                                text-align: center;
                                margin-top: 5rem;
                                margin-bottom: 5rem;
                            `}>{nombre} </h1>

                            <ContenedorProducto>
                                <div>
                                    <img css={css`border-radius: 2rem; margin-bottom: 2rem;`} src={urlimagen} />
                                </div>
                                <aside>
                                    <ContenedorInfo>
                                        <p css={css`font-size: 1.3rem;`}>Publicado hace: { formatDistanceToNow( new Date(creado), {locale: es} )} </p>
                                        <p css={css`font-size: 1.3rem; margin-bottom: 2rem;`}>Por {creador.nombre} de {empresa}</p>
                                        <hr></hr>
                                        <p>{descripcion}</p>
                                        <Boton
                                            target="_blank"
                                            bgColor="true"
                                            href={url}
                                        >Visitar URL</Boton>
                                    </ContenedorInfo>
                                    <ContenedorVotos>
                                        <h3 css={css`
                                            text-align: center;
                                            margin-bottom: 1rem;
                                            font-weight: bold;
                                        `}
                                        >{votos} Votos</h3>
                                        {usuario && (
                                            <Boton
                                            onClick={votarProducto}
                                            >
                                                Votar
                                            </Boton>
                                        )}
                                    </ContenedorVotos>
                                </aside>
                            </ContenedorProducto>
                            <div css={css`
                                        max-width: 600px;
                                        width: 95%;
                                        margin: 5rem auto 0 auto;
                                        margin-bottom: 5rem;
                                    `}>
                                { usuario && (
                                    <>
                                    <h2 css={css`
                                        text-align: center;
                                        margin-top: 5rem;
                                        margin-bottom: 5rem;
                                    `}>Agrega tu Comentario</h2>
                                    <form
                                        onSubmit={agregarComentario}
                                    >
                                        <Campo>
                                            <input 
                                                type="text"
                                                name="mensaje"
                                                onChange={comentarioChange}
                                            />
                                        </Campo>
                                        <InputSubmit 
                                            type="submit"
                                            value="Agregar Comentario"
                                        />
                                    </form>
                                    </>
                                )}
                                
                                { comentarios.length === 0 ? <p>Aún no hay comentarios.</p> : (
                                    <div>
                                        <h2 css={css`
                                            margin: 2rem 0; 
                                        `}
                                        >Comentarios</h2>
                                        <ul>
                                            {comentarios.map((comentario, i) => (
                                                <li
                                                    key={`${comentario.usuarioId}-${i}`}
                                                    css={css`
                                                        border: 1px solid #e1e1e1;
                                                        border-radius: 5px;
                                                        padding: 1rem;
                                                        margin-bottom: 0.8rem;
                                                    `}
                                                >
                                                    <p>{comentario.mensaje}</p>
                                                    <p>Escrito por: 
                                                        <span css={css`font-weight: bold;`}
                                                        >
                                                        {''} {comentario.usuarioNombre}
                                                        </span>
                                                    </p>
                                                    { esCreador( comentario.usuarioId ) && 
                                                        <CreadorProducto>Es Creador</CreadorProducto>
                                                    }
                                                    { puedeBorrar() && 
                                                        <Boton
                                                            onClick={() => eliminarComentario(comentario.id)}
                                                        >Eliminar Comentario</Boton>
                                                    }
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            { puedeBorrar() && 
                                <div css={css`
                                            display: flex;
                                            justify-content: center;
                                            margin-top: 5rem;
                                        `}>
                                    <Boton css={css`margin-right: 1rem;`}
                                        onClick={eliminarProducto}
                                    >Eliminar Producto</Boton>
                                    <Boton
                                        onClick={eliminarComentarios}
                                    >Eliminar Comentarios</Boton>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
           
        </Layout>
     );
}
 
export default Producto;