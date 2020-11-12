import styled from '@emotion/styled';

export const Formulario = styled.form`
    max-width: 600px;
    width: 95%;
    margin: 5rem auto 0 auto;
    margin-bottom: 5rem;

    fieldset {
        margin: 2rem 0;
        border: 1px solid #e1e1e1;
        border-radius: 1rem;
        font-size: 2rem;
        padding: 2rem;
    }
`;

export const Campo = styled.div`
    margin-bottom: 2rem;
    display: flex;
    align-items: center;

    label {
        flex: 0 0 150px;
        font-size: 1.8rem;
        font-family: 'Poppins', sans-serif;
    }

    input,
    textarea {
        flex: 1;
        padding: 1rem;
        border: 1px solid #d1d1d1;
        border-radius: .5rem;
        font-family: 'Poppins', sans-serif;
        font-size: 1.5rem;
    }
    textarea {
        height: 250px;
    }
`;

export const InputSubmit = styled.input`
    font-weight: 700;
    font-family: 'Roboto', sam-serif;
    text-transform: uppercase;
    text-align: center;
    font-size:1.8rem;
    border: none;
    border-radius: .5rem;
    padding: 1rem;
    width: 100%;
    background-color: var(--naranja);
    color: white;
    margin-top: 1rem;

    &:hover {
        cursor: pointer;
        background-color: green;
        border: 1px solid #d1d1d1;
        border-radius: .5rem; 
    }
`;

export const Error = styled.p`
    background-color: red;
    padding: 1rem;
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
    font-size: 1.4rem;
    color: #fff;
    text-align: center;
    text-transform: uppercase;
    margin: 2rem 0;
    border-radius: .5rem;
`;