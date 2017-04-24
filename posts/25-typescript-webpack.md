[//]: # (title   - Configurar TypeScript con Webpack               )
[//]: # (tags    - javascript, tooling, webpack, typescript, react )
[//]: # (id      - 25                                              )
[//]: # (date    - 2016.10.04                                      )
[//]: # (url     - typescript-webpack                              )
[//]: # (excerpt - Los tipos de datos estáticos son una tendencia que está ganando popularidad en la comunidad de javascript. No sólo porque te brinda garantías al compilar tu código sino también porque genera código más legible y mantenible a largo plazo. TypeScript es sin duda el proyecto más popular en este ámbito y en este post revisaremos cómo puedes configurar un proyecto para poder usar typescript con webpack. )


Los tipos de datos estáticos son una tendencia que está ganando popularidad en la comunidad de javascript. No sólo porque te brinda garantías al compilar tu código sino también porque genera código más legible y mantenible a largo plazo. TypeScript es sin duda el proyecto más popular en este ámbito y en este post revisaremos cómo puedes configurar un proyecto para poder usar typescript con webpack.

Si tienes algún problema siguiendo este post o encuentras algo que esté incorrecto, [el repo de este setup está disponible en github](https://github.com/datyayu-xyz/typescript-webpack).

### Creando la estructura

Primero crearemos una estructura de carpetas bastante sencilla, con un directorio `src` para nuestro código fuente y  `dist` para los archivos compilados.

Primero creamos un directorio base:
```sh
$ mkdir typescript-webpack
$ cd typescript-webpack
```

Luego creamos los subdirectorios que ocupamos
```sh
$ mkdir dist
$ mkdir src
$ mkdir src/components
```

Hecho esto, tenemos nuestra estructura básica.
```sh
typescript-webpack
    |--- dist
    |--- src
          |--- components
```

### Inicializando el proyecto

Como todo proyecto de javascript, lo primero es inicializarlo con npm.
```sh
$ npm init
```

Te preguntará un par de cosas para configurar el proyecto, puedes elegir las opciones por defecto o  personalizarlo como quieras, pero te recomiendo que pongas `./dist/bundle.js` como el entry point de tu proyecto, ya que ese será el archivo final que crearemos con webpack y que contendrá la aplicación.


### Instalando dependencias

Comenzaremos por las dependencias de producción, aquellas que se usan dentro de la aplicación. En este caso, para demostrar la flexibilidad de typescript lo usaremos en conjunto con react, así que ocupamos los siguientes paquetes.

```sh
$ npm install --save react react-dom
```

Después instalamos las herramientas de desarrollo. En este caso ocuparemos webpack para crear el bundle final y webpack-dev-server para mejorar la experiencia de desarrollo.

```sh
$ npm install --save-dev webpack webpack-dev-server
```

También ocupamos incluir las dependencias para poder compilar typescript:

```sh
$ npm install --save-dev typescript ts-loader source-map-loader
```

`typescript` es el núcleo del lenguaje, `ts-loader` es el loader para compilar TS desde webpack, y `source-map-loader` toma los source-maps de typescript y le dice a webpack que utilice esos, así podemos debuggear en typescript directamente.

Por ultimo, ocupamos instalar los typings, o definiciones que ayudan a que typescript conozca los tipos de datos que maneja una librería.

Desde typescript 2.0, la manera correcta de adquirir las definiciones es mediante npm. Esto lo puedes hacer instalando `@types/[nombre-del-paquete]`. En nuestro caso, para instalar las definiciones de `react` y `react-dom` lo hacemos usando

```sh
$ npm install --save-dev @types/react @types/react-dom
```

Con esto, el compilador de typescript incluirá las definiciones automáticamente cada vez que importemos react o react-dom en nuestro código.


### Configuración de typescript.

Lo siguiente es crear la configuración para nuestros archivos de typescript en un archivo `tsconfig.json` en la raíz del proyecto.

```json
{
    "compilerOptions": {
        "outDir": "./dist/",
        "sourceMap": true,
        "noImplicitAny": true,
        "module": "commonjs",
        "target": "es5",
        "jsx": "react"
    },
    "files": [
        "./src/index.tsx"
    ]
}
```

La configuración es bastante estándar, lo único importante a resaltar es la ruta en `files : [ "./src/index.tsx" ]`, que es el archivo de entrada a nuestra aplicación; y el `"jsx": "react"`, que le dice al compilador que en los archivos `.tsx` convierta el jsx a funciones de react. Si tu proyecto no ocupa jsx, no hace falta que incluyas esto en tu configuración.


### Escribiendo código.

Ya que tenemos configurado typescript, podemos empezar a escribir código.

Primero creamos un componente bastante simple haciendo uso de distintas caracteristicas de typescript en `src/components/HolaMundo.tsx`.
```js
import * as React from 'react';


export interface HolaMundoProps {
    nombre: string;
    herramienta: string;
};


export class HolaMundo extends React.Component<HolaMundoProps, any> {
    render() {
        const { nombre, herramienta } = this.props;

        return <h1> Hola {nombre}! Tu {herramienta} funciona :D </h1>;
    }
}
```

Por supuesto, también ocuparemos el punto de entrada a nuestra aplicación, `src/index.tsx`.

```js
import * as React from 'react';
import { render } from 'react-dom';

import { HolaMundo } from './components/HolaMundo';

declare const document: any;


render(
    <HolaMundo nombre="Yayu" herramienta="TypeScript" />,
    document.getElementById('app')
);
```

Lo cool de usar react con typescript es que tienes la garantía de que los tipos de dato de los props de tus componentes se respetarán aún si incluir `PropTypes`. Por ejemplo, si intentas pasar un número a una propiedad que debería ser un string.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/025-1-jsx.jpg)

Por supuesto, para poder mostrar la aplicación ocupamos tener un archivo `index.html` en la raíz del proyecto.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>TypeScript con webpack</title>
</head>
<body>
    <div id="app"></div>

    <script src="./dist/bundle.js"></script>
</body>
</html>
```


### Configurando webpack

Antes de poder usar nuestra aplicación, obviamente ocupamos compilarla para pasar de typescript a javascript.

Para esto, creamos un archivo `webpack.config.js`.
```js
module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "./dist/bundle.js",
    },

    devtool: "source-map",

    resolve: {
        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
    },

    module: {
        preLoaders: [
            { test: /\.js$/, loader: "source-map-loader" }
        ],
        loaders: [
            { test: /\.tsx?$/, loader: "ts-loader" }
        ],
    },
};
```

La configuración de webpack es muy simple, tomamos el archivo `./src/index.tsx`, lo pasamos por los loaders de `ts` y `source-maps`, y el resultado se guarda en `./dist/bundle.js`.


### Configurando las tareas.

En este punto ya podemos correr webpack, pero para hacerlo más profesional y fácil de usar utilizaremos npm scripts. Sólo ocupas agregar

```json
...
  "main": "./dist/bundle.js",
  "scripts": {
    "start": "webpack-dev-server --inline",
    "build": "webpack"
  },
...
```

Ahora si puedes usar `$ npm start` para correr el servidor de desarrollo.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/025-2-hello-world.jpg)

También puedes correr `$ npm run build` para generar el archivo estático de javascript, así puedes mostrar el resultado sin ocupar el servidor de desarrollo.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/025-3-hello-world-static.jpg)

---
El repo con tódo el código de este post [está disponible en github](https://github.com/datyayu-xyz/typescript-webpack) para cualquier duda que tengas o mejora que quieras agregar, así que no dudes en hacerlo!
