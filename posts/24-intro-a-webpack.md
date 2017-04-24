[//]: # (title   - Introducción a Webpack                       )
[//]: # (tags    - javascript, tooling, webpack, sass, css, es6 )
[//]: # (id      - 24                                           )
[//]: # (date    - 2016.09.28                                   )
[//]: # (url     - intro-a-webpack                           )
[//]: # (excerpt - Aprende a usar webpack, mejora tu experiencia al desarrollar y crea assets optimizados para tus aplicaciones con un minimo esfuerzo. )


Webpack es la herramienta para frontend más popular desde hace mucho tiempo. Webpack es una utilidad que se encarga de realizar todo el procesamiento de nuestros assets y de brindarnos una buena experiencia de desarrollo, y que debido a su versatilidad y rendimiento ha pasado a formar parte central de diferentes proyectos importantes, como [angular-cli](https://github.com/angular/angular-cli) o [create-react-app](https://github.com/facebookincubator/create-react-app).

Conocer webpack no sólo te ayudara a mejorar tu experiencia al desarrollar, sino que también te ayudará a crear assets optimizados para tus aplicaciones sin tener que realizar mucho esfuerzo.

En este post prepararemos un proyecto que use webpack en conjunto con herramientas modernas como [babel](http://babeljs.io/) y [sass](http://sass-lang.com/), para entender como podemos usar webpack en nuestros propios proyectos.

Si tienes algún problema siguiendo este post o encuentras algo que esté incorrecto, [el repo de este setup está disponible en github](https://github.com/datyayu-xyz/intro-a-webpack).

### ¿Qué es webpack?

Webpack es una herramienta que te permite empaquetar todo tu código y dependencias en un archivos optimizados y listos para usarse. Si conoces browserify, webpack es algo similar pero con muchas más funcionalidades.

Lo interesante de webpack es que no sólo funciona con archivos de javascript, sino que también te permite incluir archivos de otros tipos, como css e imágenes.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/024-1-webpack.png)

Webpack ha ganado gran popularidad debido a que te permite optimizar tus assets, separar tu código en módulos de diferentes tipos y al mismo tiempo automatizar tareas. Todo esto, con una gran facilidad.

### Instalación
Como siempre, lo primero antes de empezar a crear el proyecto es inicializarlo via npm:

```sh
$ npm init
```

Una vez inicializado, puedes instalar webpack usando

```sh
$ npm install --save-dev webpack
```

Pero también te recomiendo que lo instales globalmente, para poder usarlo directamente en tu terminal, con

```sh
$ npm install -g webpack
```

### Configuración

Para usar webpack, ocupamos configurarlo usando un archivo `webpack.config.js`. Por ejemplo, para transformar de es6 a es5 con babel y de sass a css, una configuración sencilla sería:

```js
// webpack.config.js
module.exports = {
    entry: './src/app.js',
    output: {
        path: './dist',
        filename: 'bundle.js',
    },

    resolve: {
        extensions: ['', '.js', '.css', '.scss', '.sass'],
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                query: {
                    presets: ['es2015', 'es2016'],
                },
            },
            {
                test: /\.css$|\.scss$|\.sass$/,
                loader: 'style!css!sass',
            },
        ],
    },
};
```

Parece mucho código pero la verdad es que es bastante simple, y ahora lo revisaremos cada linea para entender como funciona.


#### Entradas y salidas
```js
entry: './src/app.js',
```

Nuestro `entry` representa al archivo de entrada. Este será el archivo base de nuestro proyecto. Lo importante a resaltar aquí es que webpack incluirá automáticamente en el proceso todos los módulos que se requieran dentro este modulo (y en los módulos que importen esos módulos...).

```js
output: {
    path: './dist',
    filename: 'bundle.js',
},
```

`output` representa el archivo de salida de nuestro proceso. Una vez que nuestros archivos hayan sido procesados, queremos que el resultado lo ponga en un archivo `bundle.js` y que lo ponga en la ruta `./dist`.

```js
resolve: {
    extensions: ['', '.js', '.css', '.scss', '.sass'],
},
```

Con esto le decimos a webpack que tipo de archivos vamos a importar. Esto no es necesario pero nos brinda la ventaja de poder importar, por ejemplo, un archivo `estilos.scss` usando sólo `import './estilos'` en vez de `import './estilos.scss'`.

#### Loaders

Esta es la parte más destacable dentro de la configuración, ya que esta nos dice de que manera webpack va a procesar nuestros archivos.

Los loaders son módulos que le permiten a webpack hacer transformaciones a nuestro de forma especifica. Por ejemplo, `babel-loader` le pasa el código a babel para que este lo procese antes de escribir el resultado en el bundle final.

En nuestro caso, queremos que babel convierta de ES6 a ES5 y que incluya nuestros archivos de sass, así que primero instalamos lo que ocupamos.

Para babel ocupamos:

```sh
$ npm install --save babel-loader babel-preset-es2015
```
Sólo es el loader de babel y el preset para que sepa como convertir de ES6 (ES2015) a ES5.

Para sass, ocupamos un par más de paquetes:

```sh
$ npm install --save node-sass sass-loader css-loader style-loader
```

Como puedes ver, en el caso de sass ocupamos mas de un loader. Esto es debido a que en webpack te permite combinar loaders pero esto lo explicaré a detalle un poco más adelante.

Una vez instalados todos los paquetes, los incluimos en nuestro `webpack.config.js` de la siguiente manera

```js
module: {
    loaders: [
        {
            test: /\.js$/,
            loader: 'babel',
            query: {
                presets: ['es2015'],
            },
        },
        {
            test: /\.css$|\.scss$|\.sass$/,
            loader: 'style!css!sass',
        },
    ],
},
```

Como puedes ver, `module.loaders` es un arreglo de objetos que muestran los loaders a incluir en nuestro proceso de transformación.

Basicamente, cada loader en la lista se compone minimo de dos propiedades: `test` y `loader`.

```js
{
    test: /\.js$/,
    loader: 'babel',
    query: {
        presets: ['es2015', 'es2016'],
    },
},
```

`test` es una expresión regular (RegExp) para filtrar el tipo de archivo al que le vamos a aplicar el loader. Obviamente, no queremos que babel trate de interpretar los archivos de css así que usamos `/\.js$/` para que sólo use los archivos que terminan en `.js`.

`loader` indica el nombre del loader que vamos a usar en ese tipo de archivos. Puedes ponerlo con o sin el sufijo `-loader` (como `babel` / `babel-loader`), no importa.

En el caso de babel, incluimos una propiedad más para especificar los presets de babel que queremos usar:

```js
query: {
    presets: ['es2015'],
}
```

Esta es opcional, y puede ser remplazada incluyendo los presets en tu `package.json` o (de preferencia) en un `.babelrc`. En este caso, lo dejamos aquí por motivos
ilustrativos.

Otra cosa un poco extraña es la manera en que  especificamos el loader en los estilos:

```js
{
    test: /\.css$|\.scss$|\.sass$/,
    loader: 'style!css!sass',
},
```

`style!css!sass` le dice a webpack que tome el resultado de pasar el código por el `sass-loader`, lo pase por `css-loader` y ese resultado a su vez por `style-loader`. Esta es una de las partes geniales de webpack y es que
puedes componer distintos loaders para obtener el resultado que quieres. Así pues, si quisieras incluir algo como postcss en un futuro, puedes hacerlo simplemente agregando en medio del proceso como  `style!css!postcss!sass`.


### Ejemplo

Ya que tenemos lista la configuración de webpack, ahora creemos un pequeño "hola mundo" para comprobar que nuestro setup funciona.

Primero creamos nuestro archivo de entrada en `src/app.js`.

```js
// src/app.js
import alertLog from './modulos/alert';
import './estilos';


alertLog("Hola desde alert");
```

Como puedes ver, usamos sintaxis de ES6 para importar modulos sin preocuparnos por el soporte, ya que webpack la transformará usando el loader de babel que le especificamos antes.

Ahora ocupamos incluir el modulo que importamos, este se debe localizar en `src/modulos/alert.js`.

```js
// src/modulos/alert.js
function alertMessage(message) {
    setTimeout(function() {
        alert(message);
    }, 1000);
}

export default alertMessage;
```

Bastante simple, solo exporta una función para mostrar un alert después de un segundo.

También ocupamos incluir algo de estilos, usando sass para mayor conveniencia.

```css
// src/estilos.scss

body {
    margin: 0;
}

.app {
    padding: 4em;
    background: #333;
    color: white;
    text-align: center;

    h1 {
        margin: 0;
    }
}
```

Estos son sólo un poco de estilos para la pagina. Lo interesante aquí es la manera en la que importamos el css directamente en javascript.

```js
//src/app.js
...
import './estilos';
...
```

Con esto webpack sabrá que debe incluir los estilos dentro de ese archivo en nuestro bundle final, gracias a los loaders de estilos que usamos en la configuración.

Por ultimo, para probar que el archivo final funcione, creamos un archivo `index.html` super sencillo en la raíz del proyecto.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Introducción a webpack</title>
</head>
<body>
    <div class="app">
        <h1>Hola Mundo</h1>
    </div>

    <script src="dist/bundle.js"></script>
</body>
</html>
```

Una vez agregados estos archivos, deberias tener algo así

```sh
mi-app
  + node_modules
  + src
  |  + modulos
  |  |    | alert.js
  |  |
  |  | app.js
  |  | estilos.scss
  |
  | index.html
  | webpack.config.js
  | package.json
```

Si te hace falta algo, puedes checar [el repo de este post](https://github.com/datyayu-xyz/intro-a-webpack) para orientarte.

### Uso

Ya que tenemos nuestra app preparada. Podemos finalmente usar webpack para construir nuestro bundle final. Sólo ocupamos correr el comando

```sh
$ webpack
```

Y eso es todo! Así de sencillo webpack tomará nuestros archivos y los combinara en un sólo archivo `bundle.js` en la carpeta que le especificamos (`./dist`).

Si abres el archivo `index.html` en tu navegador, podrás ver como tanto el código como nuestros estilos funcionan.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/024-2-hola-mundo.jpg)


### Optimización.

Webpack nos brinda una manera fácil y sencilla de optimizar nuestro bundle.

Corriendo webpack con la bandera `--optimize-minimize` o simplemente `-p`, nuestro `bundle.js` será optimizado, eliminando código que no se utilize y minificandolo usando [UglifyJS](https://github.com/mishoo/UglifyJS).

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/024-3-bundle-minificado.jpg)

Como dije, todo lo que ocupas hacer es usar

```sh
$ webpack -p
```


### Observar cambios.

Nuestra configuración de webpack ahora funciona sin problemas, el unico inconveniente es que tenemos que correr el comando `webpack` cada vez que hagamos un cambio a la aplicación. Para evitar tener que hacer eso podemos correr webpack con la bandera `-w` o `--watch`, que basicamente creará un nuevo `bundle.js` cada vez que hagamos un cambio al código, así no tenemos que preocuparnos por tener que hacerlo manualmente.

```sh
$ webpack -w
```


### Webpack como servidor de desarrollo.

Una de las ventajas al desarrollar con webpack es que aparte de observar los archivos por cambios, también puede ser utilizado como servidor de desarrollo, brindando la ventaja de tener recompilación en cada cambio, live reload (recarga automática del navegador cuando modificamos el código) y brindarte un servidor de archivos estáticos listo para usarse.

Para poder usarlo sólo ocupas instalar

```sh
$ npm install --save-dev webpack-dev-server
```

Y, para poder usarlo sin problemas con un solo comando desde tu terminal, te recomiendo instalarlo también de manera global.

```sh
$ npm install -g webpack-dev-server
```

Una vez instalado, para iniciar el server solo ocupas usar el comando

```sh
$ webpack-dev-server
```

Y ya podrás accesar a http://localhost:8080 donde tu app estará corriendo sin problemas.

Sin embargo, de esta manera no obtienes el beneficio del live reload ya que el servidor de desarrollo de webpack no escribe el resultado en un archivo, sino que lo sirve desde memoria.

Para poder obtener este beneficio, ocupamos agregar dos lineas a nuestro `webpack.config.js`.

En output, agregamos `/dist/` como la ruta para acceder al bundle final desde el servidor de desarrollo. Así simularemos que el resultado es en memoria es el que está en el disco.

```js
output: {
    path: './dist',
    filename: 'bundle.js',
    publicPath: '/dist/', // <-- Agrega esta linea
},
```

Y al final de nuestro config agregamos lo siguiente:

```js
module.exports = {
    // ...

    devServer: {
        inline: true,
    },
};
```

Esto sólo le dice a webpack que empuje los cambios y refresque el navegador en cada cambio.

Y eso es todo. Ahora ya estas listo para trabajar en tu aplicación haciendo uso de las ventajas de webpack.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/024-4-live-reload.gif)

---

El repo con todo el código de este post [está disponible en github](https://github.com/datyayu-xyz/intro-a-webpack) para cualquier duda que tengas o mejora que quieras agregar, así que no dudes en hacerlo!
