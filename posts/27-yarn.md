[//]: # (title   - Mejor manejo de dependencias con Yarn )
[//]: # (tags    - javascript, node, tooling, yarn, npm  )
[//]: # (id      - 27                                    )
[//]: # (date    - 2016.10.15                            )
[//]: # (url     - yarn                                  )
[//]: # (excerpt - Conoce Yarn, un cliente de npm, creado por el equipo de Facebook que permite disminuir los tiempos de instalación de paquetes y te permite tener un versionamiento más controlado y seguro. )

[NPM](https://www.npmjs.com/) es el manejador de dependencias por defecto en el mundo de javascript. Otros manejadores, como bower, han intentado sobreponerse a la popularidad de npm pero ninguno lo ha logrado. Sin embargo, ahora esto podría cambiar, ya que gente de empresas grandes de tecnología como Google y Facebook se han unido para crear una nueva alternativa diseñada para mejorar donde npm había estado fallando: [Yarn](https://yarnpkg.com/), un nuevo manejador de paquetes para javascript.

---

Si tienes algún problema siguiendo este post, o no tienes algún proyecto para probar yarn, puedes revisar [el repo que preparé para este post](https://github.com/datyayu-xyz/yarn-demo).

## ¿Qué es Yarn?

Yarn es un cliente para usar npm creado por el equipo de Facebook en colaboración con gente de Google, Exponent y Tilde. El objetivo de esta herramienta es mejorar los puntos débiles que tiene actualmente npm.

La parte importante a entender es que sólo es un cliente, por debajo sigue descargando los paquetes del registro de npm, así que todos las librerías de npm pueden ser instaladas con yarn.

Ahora, si yarn usa npm, ¿para qué ocupas yarn? Para empezar, yarn te brinda una reducción drástica en el tiempo de instalación. Por ejemplo, para un [proyecto con 44 dependencias](https://github.com/datyayu/weetrack/blob/master/package.json), los tiempos de instalación en mi maquina fueron:

<table style="margin: 0 auto;">
<thead>
    <td><strong>Opción</strong></td>
    <td><strong>Tiempo de instalación</strong></td>
<thead>
    <tr>
       <td style="padding-right: 1em;">npm </td>
       <td style="text-align:center">1m19s</td>
    <tr>
    <tr>
       <td style="padding-right: 1em;"> Yarn (sin lockfile) </td>
       <td style="text-align:center">57s</td>
    <tr>
    <tr>
       <td style="padding-right: 1em;"> Yarn (con lockfile)</td>
       <td style="text-align:center">29s</td>
    <tr>
</table>

Cómo vez, yarn realmente mejora el rendimiento de npm por mucho. Pasar de 1m19s a 29s es algo realmente significativo, en especial cuando trabajas en proyectos con 50+ dependencias y los tiempos de instalación se vuelven eternos.

Yarn también incluye otros beneficios importantes como:

- Modo offline - si ya instalaste una dependencia antes, puedes volver a instalarla sin internet.
- Las dependencias son exactamente las mismas en donde sea que las instales, sin importar el orden de instalación.
- Mejoras de rendimiento de red y resiste fallos de conexión.
- No está atado a npm, puedes usarlo con otro registro de paquetes (como bower) sin cambiar tu flujo de trabajo.
- Dependencias planas, en lugar de anidarlas como lo hacia npm 2.x. Esto es excelente en sistemas como windows donde tener rutas largas te puede provocar errores.
- Menores tiempos de instalación.
- TIENE EMOJIS :D

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/027-1-yarn-install.jpg)

Ya que vimos porque deberíamos de usar Yarn, es hora de comenzar a usarlo.

## Instalación

Hay distintas maneras de instalar yarn, y puedes revisarlas a fondo en el [sitio oficial](https://yarnpkg.com/en/docs/install). Sin embargo, a mí parecer la más sencilla de todas es hacerlo mediante npm. Si ya tienes node instalado en tu sistema sólo ocupas correr:

```sh
$ npm install -g yarn
```

Una vez instalado, puedes revisar que funcione correctamente usando

```sh
$ yarn --version
```

Y deberías obtener un resultado similar a esto:

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/027-2-yarn-version.jpg)

## Inicialización

Una vez instalado Yarn, podemos comenzar a usarlo en un proyecto y, como en todo proyecto de node, lo primero es crear el `package.json`.

En npm, lo que hacemos para esto es usar el comando `npm init`. En Yarn, tenemos algo similar:

```sh
$ yarn init
```

Al usar este comando, nos preguntara por los datos del proyecto.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/027-3-yarn-init.jpg)

Si checamos el `package.json` que se generó, veras que es exactamente igual al que generaría `npm init`.

```json
{
  "name": "yarn-demo",
  "version": "1.0.0",
  "description": "Un ejemplo de como usar yarn",
  "main": "index.js",
  "author": "Arturo Coronel <aoitsu3@gmail.com> (https://datyayu.dev)",
  "license": "MIT"
}
```

Este formato estándar permite utilizar yarn sin preocuparnos por compatibilidades con npm, y a la vez hace posible que empecemos a usar Yarn inmediatamente en proyectos ya existentes.

### Instalar todas las dependencias.

Si ya tienes un `package.json` con dependencias especificadas pero no las has instalado aun, basta con usar

```sh
$ yarn install
```

Y con eso yarn instalará todos los paquetes que el proyecto ocupa de manera similar a como lo haría `npm install`.

### Agregar una dependencia.

Digamos que tenemos un script sencillo como este:

```js
var express = require('express');
var app = express();

app.get('*', function(req, res) {
  res.send('Hola');
});

app.listen(3000, function() {
  console.log('Escuchando en el puerto 3000');
});
```

Este es pequeño server que regresa 'Hola' al visitar alguna pagina. Lo importante a notar aquí es que el programa requiere del paquete `express` para poder funcionar. Como este paquete es parte de la funcionalidad de nuestra aplicación, se considera como una "dependencia". La manera en que instalamos estas dependencias en Yarn es con:

```sh
$ yarn add <nombre-del-paquete>
```

En este caso, sería:

```sh
$ yarn add express
```

Lo que Yarn hace aquí es que busca la última versión del paquete y la instala en tu proyecto, además agrega el paquete a la sección de `"dependencies"` de tu `package.json`.

```sh
"dependencies": {
    "express": "^4.14.0"
},
```

En la mayoría de los casos, lo mejor es mantenerse usando la ultima versión de un paquete, pero si por alguna razón ocupas una versión especifica, puedes especificarla usando

```sh
$ yarn add <paquete>@<version>
```

Por ejemplo:

```sh
$ yarn add express@4.0.0
```

### Dependencias de desarrollo.

Muchas de las dependencias de un proyecto forman parte de la funcionalidad del mismo, pero hay algunas que no se utilizan en la versión final de la aplicación sino que sólo nos ayudan a agilizar el desarrollo de la misma, a estás se les conoce como "dependencias de desarrollo".

Algunos ejemplos de este tipo de dependencias son [Sass](https://sass-lang.com/), para facilitar el manejo de css; [webpack](https://webpack.github.io/), para optimizar los archivos de javascript y [mocha](https://mochajs.org), para realizar pruebas unitarias.

Las dependencias de desarrollo se instalan en Yarn usando:

```sh
$ yarn add --dev <paquete>
```

Por ejemplo:

```sh
$ yarn add --dev mocha
```

Esto instalará la última versión del paquete que espeficamos pero en vez de agregarlo a `"dependencies"` en el `package.json`, lo agregará a `"devDependencies"`.

```json
"devDependencies": {
    "mocha": "^3.1.2"
}
```

El motivo de la separación entre `dependencies` y `devDependencies` es que por lo general las `devDependencies` no se usan en producción, así que al hacer el deploy de tu aplicación en un servidor real puedes sólo instalar las de `dependencies` y te ahorras el tener que instalar dependencias innecesarias.

### Actualizar

Para actualizar un paquete ya instalado a la versión más reciente existe el comando:

```sh
$ yarn upgrade <paquete>
```

Por ejemplo

```sh
$ yarn upgrade express
```

O si quieres actualizarlo a una versión especifica, `yarn upgrade <paquete>@<version>` de la misma manera que funciona de la misma manera que `yarn add`.

### Desinstalar

Hay veces en las que queremos borrar una dependencia pues ya no la ocupamos. Para hacer esto, tienes el comando

```sh
$ yarn remove <paquete>
```

Por ejemplo, si quisieramos remover `express`.

```sh
$ yarn remove express
```

Y con esto, yarn removerá el paquete de la carpeta `node_modules` y de tu `package.json`.

### Lockfile

Cada vez que instalas, actualizas o remueves alguna dependencia, yarn actualiza un archivo en la raíz de tu proyecto llamado `yarn.lock`.

Honestamente no es necesario comprender su contenido pues, salvo casos excepcionales, tu NO deberías de modificarlo manualmente. Esto es debido a que en ese archivo yarn guarda metadata que le ayuda a garantizar que, cada vez que corres `yarn install`, descargue siempre la misma versión exacta de todos los paquetes.

Debido a esto, es importante que lo agregues a tu sistema de control de versiones (como git) pues así te aseguras que la próxima vez que instales el proyecto, aún si es en una maquina diferente, funcionará exactamente igual.

### Scripts

Al igual que npm, yarn te permite correr scripts que especifiques en tu `package.json`. Por ejemplo, si tienes un script para tests como este

```json
"scripts": {
    "test": "mocha"
},
```

Puedes correrlo usando:

```sh
$ yarn run test
```

Y yarn ejecutara el comando que haz especificado.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/027-4-yarn-test.jpg)

### Actualizar yarn

Por último, yarn también incluye un comando para actualizarse a si mismo. Si quieres actualizar yarn basta con correr

```sh
$ yarn self-update
```

Y yarn buscará si existe una versión más reciente y, si así es, se auto-actualizará mágicamente.

### Conclusión

Al momento de escribir este post, Yarn es bastante reciente (< 1 semana) pero creo que en un futuro va a poder competir con el cli de npm como la herramienta por defecto para instalar cosas en node, especialmente para proyectos grandes.

Además, el hecho de que esté respaldado por empresas como Google y Facebook, y que al mismo tiempo sea un proyecto regido por la comunidad, es un buen indicio del potencial que tiene.

Dicho esto, aún recomiendo aprender a usar npm si no lo has hecho, pues no hay garantía de que yarn vaya a remplazarlo pronto y yarn aun carece de ciertas cosas, como la instalación de paquetes directamente de github, lo cual puede ser malo para algunos casos de uso.

Por cierto, perdón a los usuarios de windows, ustedes no obtienen emojis :/

---

El repo con los ejemplos este post [está disponible en github](https://github.com/datyayu-xyz/yarn-demo) para cualquier duda que tengas o mejora que quieras agregar, así que no dudes en hacerlo!
