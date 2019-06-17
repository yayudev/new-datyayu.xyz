[//]: # (title   - Docker: Dockerizando una aplicación de node )
[//]: # (tags    - javascript, tutorial, node, docker, devOps  )
[//]: # (id      - 10                                          )
[//]: # (date    - 2016.03.14                                  )
[//]: # (url     - dockerizando-una-aplicacion-de-node         )
[//]: # (excerpt - Así que ya tienes lista tu app para mostrar un gatito bailado hecha en node. Ahora quieres compartirla para que la gente pueda disfrutar de la imagen que tanto esfuerzo te tomó roba-... ehm, hacer, pero no sabes como convertirla a docker para ponerla en producción... Bueno no te preocupes, yo te enseño a crear un imagen de docker para que puedas hacerlo.)


Así que ya tienes lista tu app para mostrar un gatito bailado hecha en node. Ahora quieres compartirla para que la gente pueda disfrutar de la imagen que tanto esfuerzo te tomó ~~robar~~ hacer, pero no sabes como convertirla a docker para ponerla en producción... Bueno no te preocupes, yo te enseño a crear un imagen de docker para que puedas hacerlo.

*Nota: Para este tutorial asumiré que ya tienes instalado docker en tu maquina o sabes como hacerlo por tu cuenta. En linux es bastante fácil pero en Windows y OSX hay varios gotchas que tener en cuenta así que no lo cubiré en este post para no hacerlo tan largo. Más info en https://docs.docker.com/engine/installation/*

### Creando la aplicación en node.
Espera, ¿todavía no tienes el código de la aplicación? Bueno, tendremos que improvisar.

Hay que iniciar nuestro projecto y llenar todos los datos usando
```bash
$ npm init
```

Ahora instalamos las dependencias via npm. En este caso sólo ocuparemos de express. No te olvides de guardarla en tu `package.json` usando el flag `--save`.

```bash
$ npm install --save express
```
OK. Para empezar a crear el archivo de nuestra app creamos un archivo `app.js` en la raíz de nuestro proyecto y en el importamos las dependencias que ocuparemos.

```js
var path = require('path');
var express = require('express');
```

Después declaramos las variables que vamos a utilizar.

```js
var app = express();
var port = 3000;
var gatoFile = path.resolve(__dirname, 'gato.gif');
```

Por cierto, aquí utilicé `path.resolve(__dirname, 'gato.gif')`. Esta es la ruta de nuestra imagen que queremos compartir. Si no tienes una, [puedes usar esta](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/010-1-gato.gif).

Queremos siempre mostrar nuestro gato así que declaramos que sin importar la ruta de la aplicación siempre envíe la image.

```js
app.get('*', function(req, res) {
  res.sendFile(gatoFile);
})
```

Por último, ponemos el servidor a escuchar con `app.listen`.

```js
app.listen(port, function() {
  console.log('App corriendo en el puerto ' + port)
})
```

Al final deberiamos tener un archivo como este.
```js
// app.js
var path = require('path');
var express = require('express');

var app = express();
var port = 3000;
var gatoFile = path.resolve(__dirname, 'gato.gif');


app.get('*', function(req, res) {
  res.sendFile(gatoFile);
})


app.listen(port, function() {
  console.log('App corriendo en el puerto ' + port)
})
```

Antes de empezar a escribir nuestro Dockerfile, probamos nuestra aplicación haciendo

```bash
$ node app.js
```

Checamos `http://localhost:3000` y listo, un gato ahora debería estar bailando en nuestro navegador.


### Escribiendo un dockerfile.
¡Lo logramos! Ahora tenemos nuestra aplicación y estamos listos para dockerizar el proyecto.

El primer paso es crear un archivo `Dockerfile` (yep, con ese nombre exacto) donde especificaremos lo que docker hará con nuestra aplicación.

Al principio del `Dockerfile` declaramos nuestra imagen base usando `FROM`. Ya que esta es un app de node, usaremos `node:4.2`.

```docker
FROM node:4.2
```

Después copiamos los archivos de nuestra aplicación usando `COPY`. El primer parámetro es que queremos copiar y el segundo a que directorio, en nuestro caso copiamos todo en el directorio actual (`.`) al directorio `/app`.

```docker
COPY . /app
```

Después de copiar los archivos, queremos que docker instale nuestras dependencias. Para esto nos movemos al directorio donde esta nuestro `package.json` usando `WORKDIR`.

```docker
WORKDIR /app
```

Y ahora si podemos usar `npm install`.

```docker
RUN npm install
```

Para terminar, podemos iniciar la aplicación usando `CMD` para ejecutar node.

```docker
CMD ["node", "app.js"]
```

También es importante que no olvidemos exponer el puerto en el que funciona el app, de lo contrario no podríamos acceder a ella.

```docker
EXPOSE 3000
```

Y esto es todo lo que ocupamos. Si seguiste todos los pasos, ahora deberías tener algo similar a esto.
```docker
# Dockerfile
FROM node:4.2

# Copia los archivos.
COPY . /app

# Instala dependencias.
WORKDIR /app
RUN npm install

# Inicia la aplicación.
CMD ["node", "app.js"]
EXPOSE 3000
```

### .dockerignore
Nuestro Dockerfile ya está listo para crear una imagen pero antes de crearla debemos decirle a docker ignore los archivos que no queremos que copie.

Para esto usamos un archivo `.dockerignore`. Esto es parecido a lo que hace git con `.gitignore`, los archivos que le pasemos docker no los va a tomar en cuenta durante sus procesos.

En este caso, queremos evitar la carpeta `node_modules`, ya que no hace falta copiarla pues igual docker va a correr `npm install` después.

```docker
# .dockerignore
node_modules
```

### Creando una imagen de docker.
Ahora que ya tenemos todo listo podemos crear una imagen de docker. Las imágenes de docker son plantillas o bases que docker utiliza para crear contenedores (que es donde corre la aplicación).

Para crear una imagen a partir de un Dockerfile basta con correr
```bash
$ docker build -t <nombre_de_la_imagen> <directorio_del_dockerfile>
```

En nuestro caso sería algo así:
```bash
$ docker build -t gato-app .
```

Entendamos paso por paso que es lo que hace el comando.

- `docker build` Es el comando base para crear una imagen.
- `-t gato-app` Le pasamos el nombre de imagen. En nuestro caso se llamará `gato-app`.
- `.` Le decimos donde está nuestro Dockerfile. Ya que yo estaba ya en el directorio del Dockerfile sólo tengo que poner `.`. Puede que tu tengas que especificar algo diferente aquí dependiendo de en que directorio te encuentres.

Al correr el comando vamos a ver un output que nos dice los pasos que docker está realizando para crear nuestra imagen, y al final nos dará el id de esta diciendo algo como:
```bash
Successfully built 5c6f59dbde70
```
Donde `5c6f59dbde70` es un id generado al azar, así que lo más probable es que te dé un valor diferente.

Para verificar que se instalo correctamente la imagen podemos usar `docker images`.
```bash
$ docker images
REPOSITORY  TAG     IMAGE ID      CREATED        SIZE
node-cat    latest  5c6f59dbde70  2 minutes ago  646.4 MB
```
Y nuestra imagen debería aparecer en la lista del output.

### Corriendo la aplicación en un contenedor.
Ahora viene la parte importante que es correr la aplicación en un contenedor. Para ello sólo tenemos que usar el siguiente comando:

```bash
$ docker run -P node-cat
```

- `docker run` Es el comando para correr contenedores. a partir de una imagen.
- `-P` Es un flag que nos permite acceder a los puertos del contenedor de docker. En nuestro caso lo ocupamos para poder acceder al puerto 3000 (donde corre la aplicación).
- `node-cat` Es el nombre de la imagen con la cual queremos crear el contenedor. También podemos usar el id pero el nombre es más fácil de recordar.

Y listo, ¡nuestra aplicación de node ahora está corriendo en docker!

Para verificar que nuestro contenedor esté activo podemos usar (en otra terminal) `docker ps`.

```bash
$ docker ps
CONTAINER ID  IMAGE  COMMAND  CREATED  STATUS  PORTS  NAMES
8522aba44ee5  node-cat  "node app.js"  2 minutes ago  Up 2 minutes  0.0.0.0:32793->3000/tcp  reverent_mestorf
```

También este comando nos dice la dirección en la que está nuestra aplicación: `0.0.0.0:32793`. Este puerto se genera al azar así que revísalo cada vez que corras un contenedor.

*Nota: Si estas en linux, puedes acceder directamente a la aplicación usando `0.0.0.0` o `localhost` como host. Si estás en Windows o en OSX, ocupas usar la dirección ip de la maquina virtual de docker como host. Puedes obtener esa dirección usando `$ docker-machine ip default`.*

Si vamos a la dirección correspondiente en el navegador en nuestro navegador deberíamos tener a nuestro gatito bailando.

<video style="display:block; margin:0 auto;" src="https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/videos/docker+cat.webm" width="500px" volume=0 autoplay loop>

### Deteniendo nuestro aplicación.
Digamos que la gente ya pasó suficiente tiempo apreciando a nuestro gato bailar, es hora de detener la aplicación.

Para ello, en otra terminal diferente a la cual está corriendo la aplicación usamos `$ docker kill <id-del-contenedor>`.

Para conocer el id del contenedor podemos usar `docker ps`.

```bash
$ docker ps
CONTAINER ID  IMAGE  COMMAND  CREATED  STATUS  PORTS  NAMES
8522aba44ee5  node-cat  "node app.js"  5 minutes ago  Up 5 minutes  0.0.0.0:32793->3000/tcp  reverent_mestorf
```

Y después podemos usar `docker kill` con el id del contenedor. El tuyo probablemente sea diferente al id de mi contenedor así que no olvides de correr `docker ps` para conocer el tuyo.

```bash
$ docker kill 8522aba44ee5
```

Y ¡listo! Ya cubrimos todo lo necesario para dockerizar una aplicación y correrla usando de docker. Ahora es tu turno de experimentar con esto y dockerizar tus propias aplicaciones. Si tuviste algún problema puedes [checar los archivos en github](https://github.com/datyayu/docker-node-cat) o [preguntarme directamente](/about)
