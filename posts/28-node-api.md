[//]: # (title   - Crea un API RESTful con Express y Mongoose   )
[//]: # (tags    - javascript, node, backend, mongoose, express )
[//]: # (id      - 28                                           )
[//]: # (date    - 2016.10.20                                   )
[//]: # (url     - node-api                                     )
[//]: # (excerpt - Aprende a crear un API REST usando express y mongoose, y conoce lo necesario para poder empezar a desarrollar tus aplicaciones a la medida y desde 0. )


La tendencia actual en el mundo web es la de separar al cliente del servidor. Esto nos provee de gran libertad pues podemos usar el mismo servidor, por ejemplo, para una pagina web, una aplicación móvil y una de escritorio al mismo tiempo, sin tener que hacer cambios al servidor. Esto es gracias al uso de un API, que nos ofrece una manera determinada para comunicar nuestras aplicaciones con el servidor, independientemente de donde se encuentre o como este configurada esa aplicación.

En esto Node se destaca, pues crear este tipo de servidores basados en micro-servicios es super fácil y rápido en esta plataforma. Y para demostrarte que tan sencillo y simple es hacerlo, crearemos un API usando express y mongoose, en la cuál veremos lo necesario para poder crear nuestras propias APIs.

Si quieres ver el código final o tienes alguna duda, puedes checar el [repo en github de este post.](https://github.com/datyayu-xyz/node-api)


# ¿Qué vamos a crear?

En este post vamos a crear un API que nos sirva para llevar un registro de pingüinos. ¿Por qué pingüinos? Porque los pingüinos son FUCKING AWESOME.

![PENGUIN MOTHERFUCKER](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/028-01-penguin.jpg)

Como sea, los requisitos para nuestro API son:

- Un CRUD para administrar pingüinos (Poder crear, ver, editar y eliminar pingüinos).
- Uso propio de los verbos de HTTP siguiendo el estilo RESTful (GET, POST, PUT y DELETE).
- Use JSON para comunicarse.


## Inciando el proyecto con npm.

Primero que nada, y como siempre que trabajamos con Node, inicializamos nuestro proyecto con

```sh
$ npm init
```

Nos preguntará un par de cosas acerca de nuestro proyecto para crear un `package.json` con el cual podemos comenzar a trabajar en la aplicación.


## Express
[Express](https://expressjs.com/) es un mini-framework de NodeJS que nos permite crear aplicaciones web de manera sencilla. Debido a lo minimalista y simple que es express, es una opción perfecta para crear nuestro API.

Para instalar express, sólo hace falta usar

```sh
$ npm install --save express
```

También instalaremos [body-parser](https://github.com/expressjs/body-parser), un módulo que nos permite que express entienda peticiones con un JSON como cuerpo sin problema.

```sh
$ npm install --save body-parser
```

Una vez instalado, podemos empezar a escribir nuestro servidor. En un archivo `index.js`, escribimos lo siguiente:

```js
var express = require('express');
var app = express();

app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('hola');
});

app.listen(3000, function() {
    console.log('Escuchando en el puerto 3000');
});
```

Repasemos lo que hace este código.

```js
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
```

Importamos `express` y `body-parser`, los paquetes instalamos antes. Express lo usamos para generar un objeto `app`, el cual es el núcleo de nuestra aplicación y en el definiremos las configuraciones y acciones que nuestra aplicación realizará.

```js
app.use(bodyParser.json());
```

Como nuestra API será se comunicará mediante JSON, le especificamos a express que use `body-parser` para que pueda leer los contenidos enviados en formato JSON.

```js
app.get('/', function(req, res) {
    res.send('hola');
});
```

Aquí es donde empieza lo interesante. `app.get('/', ...)` le dice a express que cuando una petición llegue por el método `GET` y la ruta sea `'/'`, entonces ejecute la función que le pasamos.

Esta función al ser llamada va a recibir dos parámetros: la petición (`req`) y la respuesta que regresaremos (`res`). Por ahora no nos importa revisar la información de la petición, así que sólo regresamos un `hola`, usando el método `res.send`.

Por ultimo tenemos:

```js
app.listen(3000, function() {
    console.log('Escuchando en el puerto 3000');
});
```

Simplemente arrancamos la aplicación usando `app.listen` y le decimos en que puerto queremos que corra el servidor (`3000`) y que queremos que haga al iniciarlo (en este caso, que nos haga un `console.log` avisándonos que ya esta corriendo).

Ya que sabemos como funciona esto, sólo queda correrlo

```sh
$ node index.js
```

Y si visitamos [http://localhost:3000/](http://localhost:3000/), verás como recibes un "hola" como respuesta.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/028-02-hello-world.jpg)

## Postman
Para probar nuestro API utilizaremos [Postman](https://www.getpostman.com/), aunque puedes usar cualquier herramienta que te permita hacer peticiones HTTP, como [curl](https://curl.haxx.se/) o [httpie](https://github.com/jkbrzt/httpie).

Si ya conoces como usar alguna de estas herramientas, puedes saltarte a la siguiente sección. Si no, no te preocupes que ya te explico como usarla.

Postman es una herramienta que se encarga de hacer más fácil el trabajo de simular peticiones HTTP, así como modificarlas y analizar su resultado.

Puedes descargar desde su pagina oficial: [https://www.getpostman.com/](https://www.getpostman.com/).

Una vez instalada, probemos una petición de tipo `GET` en nuestro servidor para ver si funciona. Recuerda que le especificamos que nos retornara un "hola", así que eso es lo que debería hacer también en este caso.

Todo lo que tienes que hacer aquí es escribir el url a la que quieres enviar la petición (en nuestro caso, `http://localhost:3000/`), el método HTTP por el cual lo enviaremos (`GET`) y enviamos haciendo click en *send*.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/028-03-postman-get.jpg)

Y listo, recibimos nuestro "hola" justo como esperábamos :D


## Rutas

Regresando a nuestro aplicación es hora de ver como crear distintas rutas.

En nuestro API hay dos formas en la que puede ser consultada: podemos pedir la información muchos pingüinos o solo la de un pingüino individual. Para esto, remplacemos nuestra ruta actual ('/') por estas dos:

```js
app.get('/penguin', function(req, res) {
    res.send('Pediste un pingüino');
});

app.get('/penguins', function(req, res) {
    res.send('Pediste muchos pingüinos');
});
```

La estructura de cada ruta es la misma que la que teníamos, lo único diferente es la dirección de cada ruta y el mensaje que nos regresan. Comprobemos que esto funciona haciendo peticiones a esas rutas.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/028-04-ruta-individual.jpg)

Al usar `http://localhost:3000/penguin`, obtenemos de respuesta "Pediste un pingüino".

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/028-05-ruta-plural.jpg)

Por otro lado, al usar `http:/localhost:3000/penguins` obtenemos "Pediste muchos pingüinos". Esto quiere decir que ambas rutas están funcionando correctamente.

# Enviando información

Ya que podemos obtener información de nuestro servidor usando rutas, ahora ocupamos una manera para nosotros poder leer la información que recibimos y poder así crear nuevos pingüinos.

La manera correcta para crear nuevos pingüinos (o cualquier otro recurso) de acuerdo al estilo RESTful es usando una petición de tipo POST.

Si te diste cuenta todas las rutas que hicimos hasta ahora han usado solamente el método GET. Para crear una ruta que use el método POST, usamos la función `app.post`.

Intenta agregar lo siguiente después de las rutas que ya teníamos.

```js
app.post('/penguins', function(req, res) {
    res.send('Creando un pingüino');
});
```

Para probarlo, en Postman sólo cambia el método `GET` por `POST` y envía la petición.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/028-06-post-test.jpg)

Listo, ya tenemos una ruta de tipo POST en nuestra aplicación. Ahora queremos leer la información de la petición para saber que nombre le pondremos al pingüino que crearemos.

Recordemos que nuestra aplicación es un JSON API, por lo que va a recibir JSON. Para enviar JSON desde postman, en la pestaña de `Headers` agregamos un header `Content-Type` con valor `application/json`. Esto dice al server que lo que enviamos será un JSON, así él podrá entenderlo correctamente.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/028-07-content-type.jpg)

También, en `body`, seleccionamos `raw` y `JSON (application/json)`; y escribimos un JSON sencillo en el cuerpo. De esta manera postman sabrá de que manera codificar correctamente el cuerpo de nuestra petición.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/028-08-post-json.jpg)

Podemos comprobar que esto funciona imprimiendo en la consola el cuerpo de la petición. Para esto modificamos nuestra ruta para que imprima el cuerpo (`body`) dentro de la petición (`req`), es decir, que imprima `req.body`.

```js
app.post('/penguins', function(req, res) {
    console.log(req.body); // <--- Agrega esta linea
    res.send('Creando un pingüino');
});
```

Y con esto deberías obtener algo así al enviar la petición:

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/028-09-console-log.jpg)

Y con esto ya podemos empezar a agregarle funcionalidad de verdad a nuestra aplicación.

## Base de datos
Primero que nada ocupamos generar el modelo, o la forma en la que se verá la información que guardaremos en la base de datos. En nuestro caso para esto usaremos [mongodb](https://www.mongodb.com/) y [mongoose](http://mongoosejs.com/) para esto.

Puedes descargar mongo desde su pagina oficial ([https://www.mongodb.com](https://www.mongodb.com)) pero no me voy a meter a detalle en como instalar mongo, ya que depende del sistema operativo en el que trabajes. Una vez instalado no te olvides de iniciar el servidor de mongo usando

```sh
$ mongod
```

o en windows con:

```sh
$ /ruta/de/tu/instalacion/de/mongo/mongod.exe
```


### Mongoose
Mongoose es un paquete que nos permite modelar objetos y guardarlos en mongodb. Piensa en mongoose como un ORM o una utilidad que se encarga se interactuar con la base de datos por nosotros.

Para instalarlo puedes usar npm.

```js
$ npm install --save mongoose
```

Una vez instalado, lo primero es decirle a mongoose que base de datos debe usar.

```js
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose'); // <-- Importa mongoose
var app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/penguin-api'); // <-- conexión

...
```

En el `server.js` importamos `mongoose` y usamos `mongoose.connect` para conectarnos a la base de datos. En nuestro string de conexión, `mongodb://localhost` le dice la url donde está el servidor de mongo y el `/penguin-api` es el nombre que tendrá la base de datos que usaremos.

## Modelos
Ya sólo nos queda configurar los campos que va a tener el modelo. Intenta agregar lo siguiente antes de las rutas.

```js
var mongoose = require('mongoose')

var penguinSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    tipo: String,
});

var Penguin = mongoose.model('Penguin', penguinSchema);
```

En este archivo de definimos el esquema, o la forma que va a tener el modelo de un pingüino. Para eso usamos `mongoose.Schema`, que es un objeto que nos ayuda a definir los esquemas de mongoose.

```js
var penguinSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    tipo: String,
});
```

Nuestro pingüino va a tener dos propiedades, el nombre y el tipo de pingüino. Como vez, le decimos que el `tipo` va a estar representado por un `String`. En el caso de `nombre`, queremos que sea obligatorio incluirlo, así que en lugar de sólo pasarle `String` como valor, le pasamos un objeto diciendo el que tipo es un `String` (`type: String`) y que es requerido obligatoriamente (`required: true`).

```js
var Penguin = mongoose.model('Penguin', penguinSchema);
```

Ya que definimos el esquema, lo siguiente es registrarlo con mongoose. Lo que hacemos para esto es que usamos `mongoose.model`, pasándole el nombre que va a tener esa colección de pingüinos que guardemos en la base de datos (`'Penguin'`) y el esquema que va a a tener (`penguinSchema`).

## Acciones
Con el modelo ya definido, sólo queda definir las acciones que pueden realizarse con ese modelo. En este caso haremos un simple CRUD, es decir, que seamos capaces de consultar, crear, modificar y borrar pingüinos.

Para hacer esto, ocupamos una forma para hacerlo. En la actualidad, lo más popular para esto es hacerlo usando acciones con estilo RESTful. Básicamente consiste en tener una ruta para el recurso (en nuestro caso, pingüinos) y dependiendo del método HTTP por el que se realice la petición, sabremos que cosa hacer con ese recurso.

Para nuestro caso, esto quedaría así:

<table style="margin: 0 auto;">
<thead>
    <th style="padding-right: 1em;text-align:left;">Ruta</th>
    <th style="padding-right: 1em;text-align:left;">Método HTTP</th>
    <th style="text-align:left;">Descripción</th>
</thead>
<tbody>
    <tr>
        <td style="padding-right: 1em;">/penguins</td>
        <td style="padding-right: 1em;">POST</td>
        <td style="padding-right: 1em;">Crea un nuevo pingüino.</td>
    </tr>
    <tr>
        <td style="padding-right: 1em;">/penguins</td>
        <td style="padding-right: 1em;">GET</td>
        <td>Obtiene todos los pingüinos.</td>
    </tr>
    <tr>
        <td style="padding-right: 1em;">/penguins/:id</td>
        <td style="padding-right: 1em;">GET</td>
        <td>Obtiene un sólo pingüino.</td>
    </tr>
    <tr>
        <td style="padding-right: 1em;">/penguins/:id</td>
        <td style="padding-right: 1em;">PUT</td>
        <td>Actualiza la información de un pingüino.</td>
    <tr>
    </tr>
        <td style="padding-right: 1em;">/penguins/:id</td>
        <td style="padding-right: 1em;">DELETE</td>
        <td>Borra un pingüino.</td>
    </tr>
</tbody>
</table>

Nota como todos usan la misma ruta base (`/penguins`), pero es el verbo HTTP lo que define que es lo que queremos hacer. Esto es la base para que nuestro API sea RESTful.

Ahora que definimos la manera en la que va a funcionar el API, es hora de comenzar a crear cada una de las acciones.

### Crear un pingüino <small>(POST /penguins)</small>

Lo primero que vamos a hacer es definir la manera en la que podemos crear un pingüino.

```js
app.post('/penguins', function(req, res) {
    var penguin = new Penguin();
    penguin.nombre = req.body.nombre;
    penguin.tipo = req.body.tipo || 'No especificado';

    penguin.save(function(error, savedPenguin) {
        if (error) return res.status(500).send(error);

        res.json(savedPenguin);
    });
});
```

Aquí definimos un acción a usar en la ruta `/penguins` con el método `POST`.

```js
var penguin = new Penguin();
penguin.nombre = req.body.nombre;
penguin.tipo = req.body.tipo;
```

Creamos un nuevo pingüino usando `new Penguin()` y después le asignamos un nombre y un tipo en base a la información que el usuario envía (usando `req.body`).

```js
penguin.save(function(error, savedPenguin) {
    if (error) return res.status(500).send(error);

    res.status(201).json(savedPenguin);
});
```

Ya que llenamos los datos del pingüino, sólo falta guardarlo. Esto lo hacemos usando el método `save()`, el cual puede recibir una función como parámetro, la cual se ejecutará después de que el documento haya sido guardado en la base de datos. En nuestro caso, queremos enviar el pingüino ya que se haya creado en la base de datos, así que dentro de esa función de callback usamos `res.status(201).json` para hacerlo.

Como nuestro API se basa en el uso de JSON, usamos el método `.json` para enviar la información. A diferencia de `res.send` que envia solamente texto plano, `res.json` se encarga de que la respuesta que enviamos desde el servidor vaya codificada propiamente en formato JSON.

La parte de `status(201)` hace que la petición regrese con un status 201, o "Creado". Esto no es necesario hacerlo, pero es buena practica incluir los status de http correctos en cada caso, pues así el que use nuestro API puede saber que su petición se cumplió exitosamente con sólo revisar el numero del status.

```js
if (error) return res.status(500).send(error);
```

Si hubo algún error al crear el pingüino, enviamos un error con status `500`, pues esto significa que hubo un error en el servidor, así el que use nuestro API sabe porque falló la petición.

Si lo probamos usando Postman, deberías ver el objeto creado ya con un `_id`. Este id es generado al azar y asignado automáticamente por mongo al guardar el documento, así que no ocupamos preocuparnos por eso.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/028-10-create.jpg)

### Obtener todos los pingüinos <small>(GET /api/penguins)</small>

Lo siguiente es definir la acción para consultar todos los pingüinos.

```js
app.get('/penguins', function(req, res) {
    Penguin.find({}, function(error, penguin) {
        if (error) return res.status(500).send(error);

       res.json(penguin);
    });
});
```

Esta acción usa la ruta `/penguins` y el método GET.

```js
Penguin.find({}, function(error, penguin) {
    if (error) return res.status(500).send(error);

    res.json(penguin);
});
```

Usamos la función `find` para buscar entre todos los documentos en la base de datos. Dentro, simplemente regresamos el resultado de esa búsqueda o, si ocurrió, un error. Observa como aquí no usamos `.status`, esto es debido a por defecto `res.json` regresa un status 200, o "OK", que es el adecuado para esta situación.

El primer parámetro de `find` es un objeto con filtros o propiedades a buscar en los registros de la base de datos. Por ejemplo, si le pasamos `{ nombre: 'pingu' }`, va a buscar sólo los pingüinos que tengan como `nombre` el string `'pingu'`. En nuestro caso queremos todos los pingüino, sin excepción así que usamos un objeto vacío (`{}`).

Puedes probarlo directamente en Postman usando el verbo GET.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/028-11-index.jpg)


### Obtener un pingüino <small>(GET /api/penguins/:id)</small>

La siguiente acción es aquella para consultar un pingüino en especifico. La manera en que esta funcionará es usando el id del pingüino del cual queremos la información.

```js
app.get('/penguins/:id', function(req, res) {
    Penguin.findById(req.params.id, function(error, penguin) {
        if (error) return res.status(500).send(error);

       res.json(penguin);
    });
});
```

En este caso usamos el método GET en la ruta `/penguin/:id`. La parte de `:id`, debido a que comienza con `:`, puede representar cualquier valor. Esto quiere decir que esta acción funcionará tanto si usamos `/penguin/1` como si usamos `/penguin/21221e1e12e12e12`.

```js
Penguin.findById(req.params.id, function(error, penguin) {
    if (error) return res.status(500).send(error);

    res.json(penguin);
});
```

En este caso, debido a que queremos buscar por id usamos el método `findById`, el cual en lugar de recibir un objeto, recibe un id, que es el pingüino que ira a buscar en la base de datos. En este caso, nuestro id es `req.params.id`.

Los parámetros que recibimos por el url podemos accederlos usando `req.params`. En la ruta nosotros usamos `/penguins/:id`, esto quiere decir que lo que contenga la parte de `:id` de la ruta se va a almacenar en el atributo `id` de `req.params`. Entonces, por ejemplo, si alguien visita `/penguins/abc`, el valor de `req.params.id` va a ser `'abc'`.

Este nombre `:id` no es algo reservado y puedes sustituirlo si así lo deseas, pero el nombre que uses es el nombre de atributo de `req.params` en el que se almacenará esa información. Ese decir, si en lugar de `:id` hubiésemos escrito `:penguin`, entonces ese valor se encontraría en `req.params.penguin`.

Fuera de esa parte del id, no hay mucho que explicar, pues la función de callback es lo mismo que ya vimos en las otras acciones.

Sólo queda probarlo con Postman.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/028-12-show.jpg)


### Editar un pingüino <small>(PUT /penguin/:id)</small>

Ya podemos ver y crear pingüinos, ahora veremos como modificar un pingüino. En esta acción, vamos a modificar el pingüino que el usuario nos especifique mediante su id.

```js
app.put('/penguins/:id', function(req, res) {
    Penguin.findById(req.params.id, function(error, penguin) {
        if (error) return res.status(500).send(error);

        penguin.nombre = req.body.nombre;
        penguin.tipo = req.body.tipo || 'No especificado';

        penguin.save(function(savingError, savedPenguin) {
            if (savingError) return res.status(500).send(savingError);

            res.json(savedPenguin);
        });
    });
});
```

Así como tenemos `app.get` para el método `GET` y `app.post` para el método `POST`, para el método `PUT` tenemos `app.put`. Este método funciona exactamente como los demás, le pasamos el url en el que queremos que funcione y una función diciéndole que hacer.


```js
...

Penguin.findById(req.params.id, function(error, penguin) {
    if (error) return res.send(error);

    ...
});

...
```

Para modificar algo en la base de datos, lo primero es obtener la información de documento. Ya que queremos obtener un pingüino y sabemos su id pues nos lo pasarán en el url, podemos utilizar `findById`, como lo hicimos en el método anterior para buscar el pingüino que queremos modificar.

```js
...
penguin.nombre = req.body.nombre;
penguin.tipo = req.body.tipo;
...
```

Una vez que ya tenemos el pingüino que vamos a modificar, sólo queda modificarlo. La manera en que lo hacemos es como con cualquier variable, simplemente le asignamos otro valor, por ejemplo `penguin.nombre = req.body.nombre`. En este caso lo que hacemos es tomar los valores de `req.body`, que son los nuevos valores que el usuario nos envió, y se los asignamos al pingüino que estamos modificando.

```js
penguin.save(function(savingError, savedPenguin) {
    if (savingError) return res.status(500).send(savingError);

    res.json(savedPenguin);
});
```

Ya que los valores del pingüino fueron actualizados, sólo queda guardar esos cambios en la base de datos, para lo que usamos el método `save` de nuestro modelo. Le pasamos una función de callback para que ya que haya actualizado la base de datos le envíe los valores actualizados usando `res.json()`, no sin antes prevenirnos en caso de error.

En postman, cambia el método a `PUT` e intenta modificar un pingüino para ver como funciona.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/028-13-update.jpg)


### Eliminar un pingüino <small>(DELETE /penguin/:id)</small>

Ya por último para completar nuestro API, sólo falta crear una forma para poder eliminar pingüinos (D:). Recuerda que en este caso vamos a hacer una petición por el método `DELETE` a `/penguin/:id`.

```js
app.delete('/penguins/:id', function(req, res) {
    Penguin.findById(req.params.id, function(error, penguin) {
        if (error) return res.status(500).send(error);

        penguin.remove(function(removingError) {
            if (removingError) return res.status(500).send({ error: removingError });

           res.json({ message: "Pingüino removido exitosamente" });
        });
    });
});
```

Para eliminar un pingüino hacemos casi lo mismo que para editarlo. Primero obtenemos el id del url, luego buscamos ese pingüino y lo removemos de la base de datos.

```js
app.delete('/penguins/:id', function(req, res) {
    Penguin.findById(req.params.id, function(error, penguin) {
        if (error) return res.status(500).send({ error: error });
        ...
    });
});
```

Esto ya le hemos visto un par de veces, lo único diferente es que usamos `app.delete` porque la petición va a ser por medio del método `DELETE`. También obtenemos el pingüino usando `findById` y nos aseguramos de que no hayan surgido errores.

```js
penguin.remove(function(removingError) {
    if (removingError) return res.send(removingError);

    res.json({ message: "Pingüino removido exitosamente" });
});
```

Lo que hace diferente a esta acción es que usamos el método `.remove` para eliminar el documento de la base de datos. Le pasamos un callback para que lo ejecute una vez que haya actualizado la base datos, diciéndole que nos envíe un mensaje una vez que haya eliminado al pingüino y eso es todo.

Ya sólo queda probar eliminando un pingüino. Intenta borrarlo usando el método `DELETE`.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/028-14-destroy.jpg)

Luego intenta obtener todos los pingüinos usando `GET /penguins`, verás que ya no existe más en nuestra lista de pingüinos.

![RIP PINGU ;_;](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/028-15-show-all.jpg)

---

Y eso es todo.

Como puedes ver es super sencillo y rápido desarrollar un API con node y express. Te recomiendo que intentes agregar más modelos y agregar un par de validaciones para que entiendas mejor el concepto general de este post. Aún así, con este conocimiento es más que suficiente para que intentes desarrollar un API REST personalizada para tus proyectos.

---
El repo con los ejemplos este post [está disponible en github](https://github.com/datyayu-xyz/node-api) para cualquier duda que tengas o mejora que quieras agregar, así que no dudes en hacerlo!
