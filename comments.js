// Create web server
const http = require('node:http'); //Es el import de java, importamos un paquete
//el "./" quiere decir que el archivo esta en la misma carpeta que el documento
const dt = require('./date_module');
const url = require('url');

const ruta_url = 'http://127.0.0.1:3000/acceso.html?user=Roxana&pass=1234';

const hostname = '127.0.0.1';
const port = 3000;
// const port = 8080;

//Creacion del servidor
const server = http.createServer((req, res) => {
    res.statusCode = 200; //cuando la solititud del servidor se encontro satisfactoriamente
    //ponerle un encabezado a la página, lo que aparece en el navegador y te dice que tipo 
    //de recurso es. Tambien te permite saber como debe interpretarlo el navegador.
    //Aqui le perdimos que el servidor me entregue un recurso de texto plano, aunque tambien 
    //puedo usar el html u otro tipo de archivo
    //res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Type', 'text/html');

    var q = url.parse(ruta_url, true); // el link es ?user=Roxana&pass=1234

    var host = q.host; //  127.0.0.1:3000
    var recurso = q.pathname; //  /acceso.html
    var params = q.search; // ?user=Roxana&pass=1234
    var query = q.query; //{user='Roxana', pass='1234'}
    var txt = "Usuario: " + query.user + " Contraseña: " + query.pass;

    //Aqui finalizamos el servior con un mensaje de texto plano
    res.end('Hola, node js!<br>La fecha actual es: ' + dt.myDateTime()
        + '<br>Bienvenido(a) ' + query.user + ' a mi sitio web ' + host
        + '<br>Estas ingresando a la página: ' + recurso
        + '<br>Con estas credenciales: ' + txt)
});

//Cuando habra el navegador en esa direccion y puerto, se lanzara este mensaje.
server.listen(port, hostname, () => {
    console.log(`Servidor ejecutandose en http://${hostname}:${port}/`);
});