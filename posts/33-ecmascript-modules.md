[//]: # (title   - Módulos de ECMAScript en el navegador        )
[//]: # (tags    - javascript, es6, browsers, rendimiento, html )
[//]: # (id      - 33                                           )
[//]: # (date    - 2017.06.01                                   )
[//]: # (url     - ecmascript-modulos                           )
[//]: # (excerpt - Los módulos de ECMAScript ya están por llegar a los mayores navegadores, ¡aprende qué son y como usarlos!. )

 Durante mucho tiempo, los módulos de ECMAScript han sido una de las caracteristicas de ES2015 con menor soporte ya que habia diferencias de opiniones respecto a como implementarlos en los navegadores. Pero actualmente ya son casí una realidad y aquí revisaremos cómo puedes usarlos, qué ventajas tienen y cómo tratar la compatibilidad con navegadores viejos para que estés listo en el momento en el que sean soportados por defecto.


## Cómo usarlos
La forma en que puedes utilizar módulos en tu aplicación desde html es simplemente agregando `type="module"` a la etiqueta de script.

```html
<script type="module">
  import { mostrarTexto } from './utils.js';

  mostrarTexto('¡Hola desde un módulo!');
</script>
```

```js
// utils.js
export function mostrarTexto(texto) {
  const div = document.createElement('div');
  div.textContent = texto;
  document.body.appendChild(div);
}
```

Y con sólo eso puedes gozar de las caracteristicas de los módulos, como `import` y `export`.

Por supuesto, esto también podemos usarlo referenciando un archivo.

```html
<script type="module" src="/mostrarTexto.js"></script>
```

```js
// mostrarTexto.js
import { mostrarTexto } from './utils.js';

mostrarTexto('¡Hola desde un módulo!');
```

Si quieres revisar la parte de la sintaxis para importar o exportar desde módulos, [existe otro post que te lo explica con mucho detalle](/blog/posts/es6-modulos).


## Ventajas de usar módulos
Algunas de las ventajas que los módulos nos ofrecen son:

#### Código modularizable
Obviamente, el usar módulos permite que tu código puede ser organizado de mejor manera, exponiendo sólo lo necesario.

Esto es especialmente importante ya que HTTP/2 es también un estandard que se está adoptando cada vez más y el cuál favorece la descarga de multiples archivos o módulos debido a como funciona la conexión con el servidor, por lo que usar módulos no sólo puede beneficiar tu código sino también el rendimiento de tu aplicación.

#### Import y Export

También, los módulos te permiten cargar archivos usnado la sintáxis de ES2015. Esto quiere decir que ahora puedes usar `import algo from './algun-archivo.js'` para importar recursos de otros archivos y `export` para exportar variables, constantes o funciones.

Si no estás familiarizado con esta sintáxis, puedes [revisar este post donde explico a detalle como usarla](/blog/posts/es6-modulos).

#### Strict-mode por defecto
Los módulos de ECMAScript se ejecutan bajo `strict-mode`. Esto quiere decir que el interprete es más estricto a la hora de parsear el codigo. Por ejemplo:

```js
miVariable = 3;
```

Es javascript perfectamente valido, pero como no declaramos `miVariable` antes usando `var`, `let` o `const` esto va a ser considerado un error.

Este modo nos permite código más seguro y evitar malas practicas que pueden ocasionar errores.

Si quieres saber más acerca de strict-mode, [puedes revisar la MDN](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Modo_estricto).

#### Variables locales
Uno de los mejores aspectos de usar módulos, en mi opinión, es el hecho de que las variables no contaminan el contexto global.

Normalmente si en un script declaras algo así:

```js
// miScript.js
var miVariable = 3;
```

Esa `miVariable` quedará expuesto como una variable global que puede ocasionar problemas con otros scripts que también usen una variable con el mismo nombre, además de que dejar nuestras variables expuestas no es la mejor idea en lo que respecta a seguridad.

Con los módulos, esto no pasa pues por defecto limitan el alcance de las variables a unicamente el módulo donde son declaradas. Entonces, `miVariable` puede ser usada como quieras en `miScript.js` pero si otro script intenta usarla, no va a poder pues no esta definida globalmente.


#### Scripts deferidos por defecto.

Algo importante para el rendimiento de los módulos es que son `defer` por defecto. Esto quiere decir que se descargan sin bloquear el parseo del html y sólo son ejecutados una vez que el parseo ha terminado, por lo que no afecta el rendimiento del first paint de nuestro sitio.

Lo interesante es que esto aplica también a scripts inline, por lo que incluso scripts como este serán ejecutados como `defer`, sin bloquear el parseo:

```html
<script type="module">
  alert('Hey, soy un módulo!');
</script>
```

También, si así lo deseas, puedes volver un script tipo módulo en `async` agregandole `async`

```html
<script type="module" src="./app.js" async></script>
```

Si quieres saber más acerca de async y defer para cargar scripts, [checa el post acerca de como optimizar tu first paint](/blog/posts/rendimiento-web-101-first-paint).


## Fallbacks

Para tratar con casos en los que el navegador no soporte módulos podemos usar la propiedad `nomodule`.

```html
<script type="module" src="modulo.js"></script>
<script nomodule src="fallback.js"></script>
```

En un navegador con soporte para módulos, cargará `modulo.js` e ignorará `fallback.js`
ya que tiene el atributo `nomodule`.

Por el caso contrario, en un navegador sin soporte para módulos, se ignorará `modulo.js` ya que `module` no es un tipo de script valido en esa versión, y sólo cargará `fallback.js` ya que, al no reconocer `nomodule` simplemente hara caso omiso de ese atributo y lo tratará como un script normal.

De esta manera podemos utilizar módulos y a la vez darles otra opción a los usuarios con navegadores que aún no soporten la caracteristica para que no se pierdan de las caracteristicas de nuestro sitio.

## Soporte
Como dije en un inicio, los módulos de ECMAScript son un caracteristica que se viene a futuro. Por lo tanto, actualmente (01/junio/2017) aún no es soportada por defecto en la versiones actuales de los mayores navegadores, a excepción de Safari.

Sin embargo, puedes comenzar a probarla activando el flag correspondiente:
- **Chrome Canary 60**: `chrome:flags` > `Experimental Web Platform`.
- **Firefox 54**: `about:config` > `dom.moduleScripts.enabled`.
- **Edge 15**: `about:flags` > `Experimental JavaScript Features`.
- **Safari 10.1**: ya viene implementado por defecto.

Aun con el poco soporte actual, los módulos de ECMAScript son un estandard que es importante conocer ya que son el futuro y estoy seguro de que se volverán más populares conforme HTTP/2 vaya siendo adoptado cada vez más.
