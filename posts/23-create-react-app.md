[//]: # (title - Utiliza react sin preocuparte por la configuración con create-react-app )
[//]: # (tags    - javascript, react, tooling )
[//]: # (id      - 23                         )
[//]: # (date    - 2016.09.13                 )
[//]: # (url     - create-react-app           )
[//]: # (excerpt - Uno de los problemas que más suelen presentarse cuando empezamos a usar react es lo complejo que parece configurar un proyecto antes de poder escribir un "hello world" en react. Bueno, pues esos días se acabaron ya que el equipo de facebook ahora nos ofrece una manera simple y sencilla de crear proyectos con react: create-react-app.)


Uno de los problemas que más suelen presentarse cuando empezamos a usar react es lo complejo que parece configurar un proyecto antes de poder escribir un "hello world" en react. Configurar webpack, agregar presets y plugins para babel, incluir utilidades para desarrollo, integración de css, definir las reglas de eslint... Antes de darte cuenta, terminas el día sin haber siquiera escrito una sola linea de tu app (he estado ahí, sé lo que se siente ;_;). Bueno, pues esos días se acabaron ya que el equipo de facebook ahora nos ofrece una manera simple y sencilla de crear proyectos con react: [create-react-app](https://github.com/facebookincubator/create-react-app).


## ¿Qué es create-react-app?

[create-react-app](https://github.com/facebookincubator/create-react-app) es una herramienta que nos permite inicializar proyectos de react sin tener que preocuparnos por preparar nuestras herramientas de desarrollo, ya que ella se encarga de configurar todo por nosotros. Con sólo un comando podemos pasar de 0 a comenzar a trabajar en nuestra aplicación, manteniendo un ambiente de desarrollo moderno.

create-react-app incluye por defecto:

- Soporte para React, JSX y ES6.
- Plugins para babel como soporte para usar el [operador spread](/es6-rest-parameters) en objetos.
- ESLint para evitar errores de sintaxis.
- Soporte para importar CSS e imágenes directamente desde javascript.
- Autoprefixer para CSS.
- Servidor de desarrollo con hot-reload para componentes.
- Scripts para crear bundles de desarrollo y bundles de producción con sourcemaps.
- Testing con Jest.

Esto es todo lo que ocupas para tener una excelente experiencia de desarrollo y enfocarte en tu app en lugar de en las herramientas para crearla.


## Uso

Para utilizar este paquete, podemos instalarlo usando

```bash
$ npm install -g create-react-app
```

Y una vez instalado, podemos iniciar un proyecto con

```bash
$ create-react-app mi-app
```

donde `mi-app` es el nombre que le darás a tu proyecto.

Hecho esto, la utilidad creará el directorio `mi-app` e inicializara un pequeño proyecto en ese directorio.

Una vez que termine, nos mostrará un mensaje como el siguiente:
![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/023-1-create-react-app.jpg)

Básicamente es una lista de los comandos que puedes utilizar en tu nuevo proyecto:

- `npm start`. Inicia el server de desarrollo con todo las utilidades que mencionamos antes.
- `npm test`. Corre los tests que tengamos en nuestro proyecto.
- `npm run build`. Genera un bundle de nuestro app con todos los archivos y assets listos para producción.
- `npm run eject`. Desacopla el proyecto de create-react-app (explicación completa al final de este post!).



Ahora, si corremos `npm start` podremos ver en nuestro `http://localhost:3000` nuestra app base corriendo.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/023-1-demo-app.gif)

Y así de sencillo ya podemos empezar a trabajar en nuestra app.


# Estructura

Si bien ya estamos listos para trabajar, no está de más revisar la manera en que esta herramienta estructura el proyecto que genera para saber donde está cada cosa que ocupamos.

Basicamente es algo como:

```
mi-app
 |--- src
 |     |--- App.css
 |     |--- App.js
 |     |--- App.test.js
 |     |--- favicon.icon
 |     |--- index.css
 |     |--- index.js
 |     |--- logo.svg
 | .gitignore
 | index.html
 | package.json
 | README.md
```

En la raíz tenemos lo básico: un `.gitignore` para ignorar archivos en git, el `index.html` de nuestro app, el `package.json` del proyecto y un `README.md` con info acerca de create-react-app.

En `src` tenemos algo bastante simple también. `index.js` e `index.css` contienen lo base de nuestra app. `App.js`, `App.css` y `App.test.js` representan nuestro componente `<App />`, con sus estilos y tests. Los otros dos son el favicon de nuestra pagina y una imagen en svg.

Lo único a destacar aquí es que salvo por la presencia de un `index.js`, create-react-app no te fuerza a seguir una estructura predeterminada, tu puedes elegir la manera en la que quieres organizar tu código y create-react-app se adapta a ella sin tener que pensarlo.


## Importación de assets en javascript.

Si eres nuevo en react o ES6, y en especial si nunca has usado algo como webpack, puede que haya un par de imports que te resulten extraños.

Por ejemplo, en el `App.js` que se genera por defecto:

```js
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
```

Aquí tenemos dos imports que no son de javascript: `./App.css` y `./logo.svg`.

El primero (`./App.css`) simplemente especifica que queremos incluir esos estilos en nuestro archivo de css final. Esto se hace en base al tipo de archivo que sea, así que cualquier `*.css` que incluyas en cualquier archivo será procesado de esta manera. Esto es muy util para modularizar estilos, así puedes separar tu css por componentes  y que cada componente importe sólo sus estilos para que, al removerlo o incluirlo en otro proyecto, puedas asegurar que tu app tenga siempre lo necesario.

El segundo import es de una imagen.
```js
import logo from 'logo.svg';
```
De nuevo, create-react-app (a través de webpack) sabe como manejar las imágenes en base a la extensión del archivo. En este caso, nos procesará la imagen para optimizarla y la incluirá en nuestros archivos finales. A nivel de código, la variable `logo` de este import tendrá la ruta al archivo final, así que podemos usarlo directamente en nuestra app.

```js
<img src={logo} className="App-logo" alt="logo" />
```

## Abandonando create-react-app

Para la mayoría de los casos create-react-app funciona de maravilla, pero hay ocasiones en las que tienes que aplicar optimizaciones especificas al código, o simplemente te gusta personalizar la configuración y entiendes  bien como usar eslint, babel y webpack. Para esos casos en los que sientes que create-react-app ya no es suficiente puedes utilizar

```bash
$ npm run eject
```

Básicamente lo que hace es remplazar el paquete todo-en-uno que es `react-scripts` en tu `package.json` por todas las dependencias que incluye por separado, así como agregarte las configuraciones y scripts necesarios para mantener la misma experiencia pero permitiéndote personalizarlo a tu gusto.

Sin embargo hay que tener cuidado, pues **una vez que corres este comando, no hay vuelta atrás.** Así que asegúrate de que sabes lo que haces antes de hacerlo.

## Conclusión

create-react-app es una excelente respuesta al critica usual que suele haber en la comunidad de javascript con respecto a la complejidad que existe para poder iniciarte en el mundo moderno del frontend. Como alguien que pasó bastante tiempo aprendiendo distintas herramientas y tendencias alrededor del tema de tooling, se que tan complicado e intimidante puede llegar a parecer para los que aun no se familiarizan con el ecosistema.

Es por esto mismo es que create-react-app es una muy buena herramienta que logra abstraer todos esos problemas pero a la vez nos da una gran libertad y no nos fuerza a seguir un patrón o estructura, lo cual me parece es genial pues logra crear una experiencia transparente en la cual puedes desarrollar sin tener que pensar en tus herramientas, por lo que puedes enfocarte libremente en lo que importa: lo que quieres construir.
