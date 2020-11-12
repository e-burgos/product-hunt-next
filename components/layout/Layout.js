import React from 'react';
import Header from './Header';
import { Global, css } from '@emotion/core';
import Head from 'next/head';

const Layout = (props) => {
    return ( 
        <>
            <Global
                styles = {css`
                    :root {
                        --gris: #3d3d3d;
                        --gris2: #6f6f6f;
                        --gris3: #efefef;
                        --naranja: #da552f;
                    }
                    html {
                        font-size: 62.5%;
                        box-sizing: border-box;
                    }
                    *, *:before, *:after {
                        box-sizing: inherit;
                    }
                    body {
                        font-size: 1.6rem;
                        line-height: 1.5;
                        font-family: 'Roboto', serif;
                    }
                    h1, h2, h3 {
                        margin:  0 02rem 0;
                        line-height: 1.5;
                    }
                    h1, h2 {
                        font-family: 'Poppins', serif;
                        font-weight: 700;
                    }
                    h3 {
                        font-family: 'Poppins', sans-serif;
                        font-weight: 400;
                    }
                    p {
                        font-family: 'Poppins', sans-serif;
                        font-weight: 400;
                    }    
                    ul {
                        list-style: none;
                        margin: 0;
                        padding: 0; 
                    }
                    a {
                        text-decoration: none;
                    }

                    img {
                        max-width: 100%;
                    }
                `}
                
            />
            <Head>
                <html lang="es"/>
                <title>Product Hunt Firebase y Next.js</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossorigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@200;400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
                <link href="/static/css/app.css" rel="stylesheet" />

            </Head>

            <Header />

            <main>
                {props.children}
            </main>
        </>
     );
}
 
export default Layout;