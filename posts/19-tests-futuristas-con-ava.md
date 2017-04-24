[//]: # (title   - Tests futuristas con AVA.    )
[//]: # (tags    - javascript, tooling, testing )
[//]: # (id      - 19                           )
[//]: # (date    - 2016.04.11                   )
[//]: # (url     - tests-futuristas-con-ava     )
[//]: # (excerpt - En el mundo de javascript, mocha ha sido el framework estándar para correr tests desde hace mucho tiempo, pero últimamente ha comenzado a surgir un nuevo framework que está mejorando nuestra experiencia al hacer tests: AVA.)


En el mundo de javascript, [mocha](https://mochajs.org/) ha sido el framework estándar para correr tests desde hace mucho tiempo, pero últimamente ha comenzado a surgir un nuevo framework que está mejorando nuestra experiencia al hacer tests: [AVA](https://github.com/sindresorhus/ava).


### ¿Qué es AVA?
*AVA* es simplemente una herramienta que nos permite correr tests de manera similar a como lo haríamos con cualquier otro framework, como mocha.

La principal ventaja que nos brinda AVA con respecto a las herramientas tradicionales para correr tests es que permite correr nuestros tests de manera paralela en procesos aislados. Dicho de una manera más simple, ayuda a que nuestros tests corran más rápido y elimina el concepto del estado global, por lo que los tests no se afectan entre sí. Esta decisión de aislar cada test nos permite tener tests más atómicos y no tener que preocuparnos por arreglar los efectos de otros tests.

Una de las mejores cosas de AVA son los errores, ya que su reporter por defecto te muestra el texto de la linea donde hubo un error, los valores que tenían las variables en ese momento y el archivo y numero de linea en el cual localizarlo, ahorrando mucho tiempo sin tener que configurar nada.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/019-1-test-fail-example.jpg)

Además, AVA es soporta la sintaxis de ES6/ES2015 por defecto, así que podemos usar las nuevas funcionalidades de javascript para escribir nuestros tests sin tener que preocuparnos por configurar nuestro ambiente de desarrollo.


### Instalación.
Para usar AVA recomiendo instalarlo de manera global usando
```bash
$ npm install -g ava
```

Si queremos usar AVA en un proyecto local normalmente haríamos algo como `npm install --save-dev ava` para agregarlo a nuestras dependencias, pero AVA nos incluye una mejor manera de hacerlo. Para esto, basta con posicionarse en la raíz del proyecto y correr
```bash
$ ava --init
```

Y automagicamente ava será instalado como dependencia de desarrollo en nuestro `package.json` y además configura nuestro npm script `test` para que corra AVA.

### Creando nuestro primer test.

Para comprobar que todo se haya instalado correctamente, creamos un archivo `test.js` en la raíz del proyecto.
```js
import test from 'ava';

test('Primer test', t => {
    t.pass();
});

test('Segundo test', async t => {
    const bar = Promise.resolve('bar');

    t.is(await bar, 'bar');
});
```
<center> *Que hermoso es poder hacer tests usando async/await*</center>

Y para correr nuestro test usamos
```bash
$ npm test
```

Si todo salió bien, deberías tener algo así en tu terminal.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/019-2-test-passing.jpg)


### Aserciones.
Cuando hacemos testing, las aserciones es lo más fundamental de todo, ya que es lo que nos permite verificar si nuestro código funciona o no. AVA nos provee bastantes métodos para esto, pero algunos de los más importantes son:

- **t.true()** Asegura que un valor sea `true`.
```js
test(t => {
  const foo = true;

  t.true(foo);
});
```
- **t.false()** Asegura que un valor sea `false`.
```js
test(t => {
  const foo = false;

  t.false(foo);
});
```
- **t.is()** Asegura que los dos valores sean iguales.
```js
test(t => {
  const foo = 'hola';

  t.is(foo, 'hola');
});
```
- **t.not()** Asegura que los dos valores no sean iguales.
```js
test(t => {
  const foo = 'hola';

  t.not(foo, 'hello');
});
```
- **t.deepEqual()** Asegura que dos valores sean recursivamente iguales.
```js
test(t => {
  const foo = {
    nombre: 'pepe',
    calificaciones: {
      espanol: 8,
      ingles: 9,
    },
  };
  const bar = {
    nombre: 'pepe',
    calificaciones: {
      espanol: 8,
      ingles: 9,
    },
  };

  t.deepEqual(foo, bar);
});
```

Si quieres ver todos los métodos que AVA provee, puedes revisar [su documentación.](https://github.com/sindresorhus/ava#assertions)


### Preparando / desmontando tests.
AVA también nos permite preparar y desmontar tests. Para esto nos da varios métodos como `before` y `after`. Pero como dije al principio, los cambios no se guardan de manera global así que no hay necesidad de limpiar el estado global en after.
```js
import test from 'ava';

test.before(t => {
  console.log("Comenzando los tests");
});

test.beforeEach(t => {
  console.log("Comenzando un test");
});

test.after(t => {
  console.log("Terminaron todos los tests");
});

test.afterEach(t => {
  console.log("Termino un test");
});


test(t => {
  const foo = true;

  t.true(foo);
});

test(t => {
  const bar = false

  t.false(bar);
});
```
Si corremos esto, obtendremos algo como:
![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/019-3-test-hooks.jpg)

Debido a que no queremos depender de un estado global para inicializar variables que usaremos en nuestros test, tenemos que especificar estas en `beforeEach` usando `t.context` de la siguiente manera:

```js
import test from 'ava';

test.beforeEach(t => {
  t.context.foo = true;
  t.context.bar = true;
});

test(t => {
  t.true(t.context.foo);
});

test(t => {
  t.true(t.context.bar);
});
```
![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/019-4-test-passing-2.jpg)

### Enfocando tests.
A veces, cuando hacemos cambios a nuestro código, los tests tienden a fallar y entonces tenemos que repararlos uno por uno. Debido a esto, no tiene sentido que corramos todos los tests mientras iteramos tratando de arreglar sólo uno. Para estos casos podemos usar `test.only`, que le indica a AVA que sólo queremos que nos muestre el resultado de ese test.

Por ejemplo, estos dos tests fallaran al inicio pero, si queremos resolverlos fácilmente, es mejor arreglarlos uno por uno y ver cuál es el problema usando `test.only`.
```js
import test from 'ava';

test.only('Primer test', t => {
  const foo = false;

  t.true(foo);
});

test('Segundo test', t => {
  const bar = true;
  t.false(bar);
});
```
![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/019-5-test-only.jpg)

Ahora podemos ver donde cual es el problema y ahora podemos arreglarlo.

```js
import test from 'ava';

test.only('Primer test', t => {
  const foo = true;

  t.true(foo);
});

test('Segundo test', t => {
  const bar = true;
  t.false(bar);
});
```

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/019-6-test-passing-3.jpg)
Si te das cuenta, el segundo test aún no está correcto pero debido a que usamos `.only` podemos enfocarnos en el que estábamos arreglando y así solucionar problemas de manera gradual.

### TODOs

Algo genial de AVA es que te da la oportunidad de registrar tests sin tener que implementarlos.

Digamos que queremos testear un modulo pero aún no está terminado o no tienes tiempo para escribir el test ahora. Para estos casos usamos `test.todo`. Si usas esto, AVA te avisara que tienes pendientes cuando corras tus tests. Por ejemplo:
```js
import test from 'ava';

test('Primer test', t => {
  const foo = true;
  t.true(foo);
});

test.todo('Agregar segundo test');
```
Al correrlo nos mostrará que tenemos un pendiente, así no se nos olvidara.
![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/019-7-test-todo.jpg)


### Watch.
Por último, AVA también nos da la oportunidad de observar por cambios. Esto es útil cuando estamos arreglando algo, ya que el resultado se actualizará con los cambios que hagamos. También AVA corre sólo los tests en el archivo que modifiquemos, así que este proceso es bastante rápido.

Para activarlo podemos correr nuestro npm script usando:
```bash
$ npm test -- --watch
```

Lo que yo recomiendo es crear un nuevo npm script especifico para esto, así no tenemos que recordar poner el `-- --watch` al final del comando.

Para esto, modificamos nuestro `package.json`.
```json
  ...
  "scripts": {
    "test": "ava",
    "test:watch": "ava --watch"
  },
  ...
```

Y podemos correrlo directamente con:
```bash
$ npm run test:watch
```


### Conclusión.
AVA es una herramienta que, aunque es joven, está ganando mucha tracción últimamente. No sólo corre nuestros tests de una forma más rápida y eficiente, sino que también nos permite escribir tests de manera mas sencilla y sin mucha configuración. Probablemente no vaya a destronar a mocha como el framework de testing más popular, pero es un proyecto bastante interesante y al que no hay que dejar de prestarle atención.

Si quieres saber más de AVA, puedes leer [su documentación en su github](https://github.com/sindresorhus/ava) o checar el podcast [JavaScript Air #15](https://www.youtube.com/watch?v=YRvrPkXBwdo), donde los desarrolladores a cargo de AVA explican sus ventajas más a fondo.
