[//]: # (title   - Aprendiendo ES6: Módulos                  )
[//]: # (tags    - javascript, es6, aprendiendo-es6, es2015+ )
[//]: # (id      - 13                                        )
[//]: # (date    - 2016.03.17                                )
[//]: # (url     - es6-modulos                               )
[//]: # (excerpt - Desde hace bastante tiempo el uso de módulos ha sido algo común en creación de aplicaciones de javascript. El problema hasta ahora es que no había un estándar oficial que utilizar. Require.js, AMD, CommonJS... cada quién ofrecía su propia forma de crear módulos pero, a pesar de lo común que era su uso, todos eran hacks encima de javascript. Pues esta pelea se acabo ahora que ES6 tiene su propio sistema de módulos nativos.)


Desde hace bastante tiempo el uso de módulos ha sido algo común en creación de aplicaciones de javascript. El problema hasta ahora es que no había un estándar oficial que utilizar. Require.js, AMD, CommonJS... cada quién ofrecía su propia forma de crear módulos pero, a pesar de lo común que era su uso, todos eran hacks encima de javascript. Pues esta pelea se acabo ahora que ES6 tiene su propio sistema de módulos nativos.


### Módulos.
Los separación en módulos es un patrón usual en la mayoría de las aplicaciones de javascript. Estos nos ayudan a resolver distintos problemas, entre los cuales destacan:

- Evitar colisiones de variables por nombres repetidos.
- Separar la lógica de la aplicación en partes específicas y definidas.
- Mantener nuestras variables lejos del scope global.
- Aumentar la comprensibilidad y reusabilidad del código.

Aún así, el lenguaje no ofrecía una manera nativa de modularizar nuestra aplicación y tuvimos que usar "hacks" como AMD y CommonJS.

Pero esto ahora ha cambiado pues ES6 establece ahora sí una sintaxis y funcionalidad nativa para trabajar con módulos.

Por cierto, debido a que ES5 no tiene un equivalente nativo a ES6 modules, en este post usaré ejemplos en CommonJS para hacer comparaciones, debido a que es el sistema de módulos más popular y es el que se usa en NodeJS, así que lo más seguro es que ya lo conozcas.

### Exports.

Los exports de un modulo son las variables, objetos o funciones que el modulo expone para que otros módulos puedan consumir.

Si has trabajado con node, entonces ya estarás familiarizado con la forma en que funcionan los exports.

```js
// modulo1.js
module.exports = "Hola soy un modulo";

// modulo2.js
module.exports = function suma(a, b) {
  return a + b;
}
```

En ES6, cuando vamos a exportar algo por defecto, remplazamos esta sintaxis de `module.exports = cosaAExportar` por `export default cosaAExportar`.

```js
// modulo1.js
export default "Hola soy un modulo";

// modulo2.js
export default function suma(a, b) {
  return a + b;
}
```

### Exports con nombre.
En CommonJS también teníamos exports con nombres, o específicos, los cuales exportábamos con `module.exports.cosa`.
```js
// modulo.js
module.exports.SECRETO = "Me gustan los robots";

module.exports.opciones = {
  color: 'rojo',
  imagen: false,
};

module.exports.suma = function(a, b) {
  return a + b;
}
```

En ES6 también podemos hacer esto usando `export` seguido de una definición estándar de lo que vamos a exportar.

```js
// modulo.js
export const SECRETO = "Me gustan los robots";

export var opciones = {
  color: 'rojo',
  imagen: false,
};

export function suma(a, b) {
  return a + b;
}
```

Lo interesante es que el nombre que le des será el mismo usara para importar esa parte del módulo.

Por cierto, este ultimo ejemplo con exports nombrados es equivalente a exportarlos todos dentro de un objeto:

```js
// modulo.js
const SECRETO = "Me gustan los robots";

var opciones = {
  color: 'rojo',
  imagen: false,
};

function suma(a, b) {
  return a + b;
}

export default {
  SECRETO,
  opciones,
  suma,
};
```


### Imports.
De nada nos sirve los `export`'s sin una manera de usar lo que nos ofrecen los módulos, y aquí es donde `import` entra en juego.

Puedes pensar en `import` como la contraparte de `export`. `export` hace variables o funciones de un módulo accesible por otros módulos e `import` se encarga de tomar un modulo y darnos acceso a esas variables y funciones que el módulo expone.

En CommonJS si queremos importar un modulo usamos `require`.

```js
// suma.js
module.exports = function suma(a, b) {
  return a + b;
};

// modulo.js
var suma = require('./suma');

suma(1, 2); // 3
```

Esto mismo puede ser replicado usando ES6 modules y la sintaxis es sencilla. Si en CommonJS es `var miModulo = require('./archivoDelModulo')`, en ES6 lo escribimos como `import miModulo from './archivoDelModulo`.

```js
//suma.js
export default function suma(a, b) {
  return a + b;
};

// modulo.js
import suma from './suma';

suma(1, 2); // 3
```

### Imports con nombre.
¿Recuerdas los exports con nombre? Algo cool de los módulos en ES6 es que podemos importar sólo una parte del modulo.

Por ejemplo, algo común en express (node) es usar el  `express.Router` para modularizar nuestra aplicación.
```js
var express = require('express');

var router = express.Router();
...
```

Con ES6, podríamos realizarlo de una manera similar.
```js
import express from 'express';

var router = express.Router();
...
```

Mientras esto funciona, podemos hacerlo mejor usando imports por nombre. De esta manera, no tendremos que importar todo el modulo de completo sino sólo lo que ocupemos.

```js
import { Router } from 'express;

var router = Router();
```
¿Se te hace familiar este concepto de obtener una sola propiedad de un objeto? ¡Así es, esto es [desestructuración](/es6-desestructuracion/)! Por lo que podemos usarlo tanto para exports nombrados como para objetos exportados.
```js
// numero.js
export const numero = 2;

// nombre.js
export default {
  nombre: 'pepe',
};

// modulo.js
import { numero } from './numero';
import { nombre } from './nombre';

console.log(numero); // 2
console.log(nombre); // "pepe"
```

Algo importante a tomar en consideración es que, debido a la naturaleza de la desestructuración y javascript, si tratamos de importar mediante imports con nombre una variable que no existe o escribimos mal el nombre de la propiedad, JS **no tirará un error**, sino que nos devolverá `undefined`.

```js
// numero.js
export const numero = 2;

// modulo.js
import { numerow } from './numero';

console.log(numerow); // undefined
```
### Importa todo.
Si bien funciona hacer un `import` normal (sin nombre), este sólo nos regresa lo que contiene `export default`. Si tenemos un modulo que importa un `default` y otra variable; o un modulo con sólo exports con nombre no nos regresará nada.

Para estos casos, podemos obtener todos los exports de un módulo usando `import * as`.

```js
// modulo1.js
export default 'Hola';
export const numero = 42;
export const nombre = 'pepe';

// modulo2js
import * as modulo1 from './modulo1';

console.log(modulo1.default); // "Hola"
console.log(modulo1.numero); // 42
console.log(modulo1.nombre); // "pepe"
```

Y yep, si te diste cuenta, lo que exportemos con `export default` será accesible mediante la propiedad `default`.


---

*Este post es parte de la serie ["Aprendiendo ES6"](/blog/tags/aprendiendo-es6), donde explico la mayoría de las funcionalidades nuevas que se han incluido con las nuevas especificaciones de ECMAScript. Si tienes dudas o hay alguna funcionalidad que aun no haya cubierto, no dudes en [avisarme](/about).*
