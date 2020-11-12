export default function validarCrearProducto(valores) {

    let errores = {};

    // Validar el nombre del usuario
    if(!valores.nombre) {
        errores.nombre = "El Nombre es obligatorio";
    }

    // Validar la empresa
    if(!valores.empresa) {
        errores.empresa = "El Nombre de la Empresa es obligatorio";
    }

    // Validar la url
    if(!valores.url) {
        errores.url = "La URL del producto es obligatoria";
    } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(valores.url)) {
        errores.url = "URL no válida";
    }

    // Validar la descripcion
    if(!valores.descripcion) {
        errores.descripcion = "La descripcion es obligatoria";
    }

    return errores;
}
