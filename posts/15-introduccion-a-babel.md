[//]: # (title   - Introducción a babel            )
[//]: # (tags    - javascript, es6, babel, tooling )
[//]: # (id      - 15                              )
[//]: # (date    - 2016.03.19                      )
[//]: # (url     - introduccion-a-babel            )
[//]: # (excerpt - Babel es una herramienta bastante popular últimamente y que toda la comunidad de javascript está usando. Es por ello que si quieres aprender todo lo nuevo que te ofrece ES6, es mejor que conozcas como usar babel. )


Babel es una herramienta bastante popular últimamente y que toda la comunidad de javascript está usando. Es por ello que si quieres aprender todo lo nuevo que te ofrece ES6, es mejor que conozcas como usar babel.

### ¿Por qué babel?
Babel se ha vuelto ya en el estándar por defecto para transpilar de ES6 a ES5 para poder correrlo donde queramos. Básicamente lo que hace es tomar tu código escrito en ES6 y remplaza todas esas partes que contienen funcionalidades nuevas (promises, generators, let, const, arrow functions... ) por código equivalente en ES5. De esta manera puedes usar ES6 sin preocuparte porque algún navegador aun no haya implementado el nuevo estándar.

Además, babel utiliza un sistema de plugins por lo que nos permite no sólo convertir código de ES6 a ES5, sino que también podemos usar plugins para incluir funcionalidades experimentales (como decoradores o Async/Await) de manera sencilla.


### Instalando babel
Hay muchas maneras de instalar y utilizar babel en nuestros proyectos. Entra las más populares se encuentran webpack, gulp y browserify. Aun así, la manera mas sencilla y directa de hacerlo es usando *babel-cli* para transformar nuestro código desde la linea de comandos.

Para instalar babel-cli sólo ocupamos usar npm.
```bash
$ npm install -g babel-cli
```

Para probar que se halla instalado correctamente podemos usar.

```bash
$ babel --version
6.2.0 (babel-core 6.2.0)
```

### Plugins y presets
La forma en que babel funciona es por medio de [plugins](http://babeljs.io/docs/plugins/). Por ejemplo, si queremos usar arrow functions en nuestro código, podemos incluir el plugin [transform-es2015-arrow-functions](http://babeljs.io/docs/plugins/transform-es2015-arrow-functions/).

Los plugins son cool y funcionales, pero si quieres usar todas las funcionalidades de ES6 tendrías que incluir como 20 plugins diferentes y el proceso sería bastante cansado. Debido a esto, en la mayoría de los casos lo que utilizamos son *presets*.

Los presets son colecciones de plugins y configuraciones con una orientación o tema en común.

El preset más popular es el [preset-es2015](http://babeljs.io/docs/plugins/preset-es2015/), que incluye todas las funcionalidades incluidas en el estándar ES2015 (conocido más popularmente como ES6). También tenemos otros como [preset-react](http://babeljs.io/docs/plugins/preset-react/), para incluir JSX y trabajar mejor con flow; y [preset-airbnb](https://github.com/airbnb/babel-preset-airbnb), que es el que utiliza [airbnb](https://www.airbnb.com/) para sus productos.

En este caso, sólo utilizaremos el de ES2015. Lo podemos instalar con:
```bash
$ npm install babel-preset-es2015
```

### Configuración
Babel por defecto no realiza ninguna transformación, así que para especificar que queremos transpilar ES6 ocupamos crear un archivo `.babelrc` en la raíz de nuestro proyecto o en el folder en el que estemos trabajando.

Este archivo `.babelrc` utiliza el formato *json*, así que utilizaremos este para especificar los `presets` que ocuparemos dentro de un array. En este caso, sólo ocupamos `"es2015"`.

```json
{
  "presets": [
    "es2015"
  ]
}
```
Aquí no hace falta especificar el nombre completo del paquete, ya que por convención todos los presets comienzan con `babel-preset-`, así que babel buscará los presets que especifiquemos usando ese formato.

### Uso

Ahora que ya tenemos todo listo, podemos usar babel para transformar nuestro código.

Primero, para probar la transformación, creemos un archivo en javascript que utilice sintaxis de ES6 y ES5. Por ejemplo, este `es6.js`:
```js
// es6.js
const english = (word = 'world') =>
  `hello ${word}`
;

function espanol() {
  return 'hola mundo';
}

console.log(english());
console.log(espanol());

```

Tenemos `const`, una arrow function, un string literal y un parámetro por defecto. Justo lo que ocupamos para probarlo.

Para transformar nuestro código podemos usar el comando.
```bash
$ babel es6.js
```
Donde `es6.js` es el nombre del archivo a transformar.

Si lo corremos nos debería de mostrar el resultado de la transformación.

```js
'use strict';

var english = function english() {
  var word = arguments.length <= 0 || arguments[0] === undefined ? 'world' : arguments[0];
  return 'hello ' + word;
};

function espanol() {
  return 'hola mundo';
}

console.log(english());
console.log(espanol());
```

De la nada se ha generado un montón de código en tu consola. Para entender que pasó, hay que analizar el resultado más de cerca.

```js
var english = function english() {
```
`const` se ha cambiado a `var` y el arrow function se ha convertido a una función normal.

```js
var word = arguments.length <= 0 || arguments[0] === undefined ? 'world' : arguments[0];
```
El argumento por defecto se ha remplazado por una implementación que hace exactamente lo mismo pero que es totalmente valida en ES5.

```js
return 'hello ' + word;
```
Nuestro string literal se cambio para usar concatenación normal.

```js
function espanol() {
  return 'hola mundo';
}

console.log(english());
console.log(espanol());
```
Las partes del código que ya eran compatibles se mantienen sin cambios, ya que no los necesitan.

Lo que pasa aquí es que babel analiza tu código, decide que partes requieren cambios de acuerdo a la configuración en tu `.babelrc` y las remplazan por algo equivalente, pero sin afectar la funcionalidad.

En el caso de `const` y el arrow function pareciera que no respecta esto, pues `const` no es lo mismo que `var` y `() => {}` no es lo mismo que `function() {}`. Sin embargo, babel realizó un análisis del código y decidió que no había necesidad de bindear la función pues no estamos haciendo uso de ello; y `word` nunca la cambiamos en todo el código, así que igual no hay necesidad de protegerla (aunque si la hubiera, babel lo hace mostrándote un error al compilar).

### Transpilación a un archivo.
Ahora que sabemos como funciona babel de manera practica, hay que usarlo de manera útil. Por lo general, cuando transpilamos es para que el navegador o el runtime donde vamos a correr nuestro javascript no tenga problemas por no soportar ES6. Así que lo más importante ahora es saber cómo tomar un archivo en ES6 y convertirlo en un archivo en ES5.

Esto es bastante sencillo y sólo ocupamos agregar el flag `-o` (out-file) al comando de babel.

```bash
$ babel es6.js -o es5.js
```

Babel hará la misma transformación y nos dará el mismo resultado que tuvimos antes pero esta vez lo guardará en el archivo que le especifiquemos (en este caso `es5.js`).

---

¡Y eso es todo! Ahora podemos usar ES6 en todos nuestros proyectos sin tener que preocuparnos por que el runtime no soporte la sintaxis.

Si quieres saber más de babel, checa [babeljs.io](http://babeljs.io/).
