[//]: # (title   - Aprendiendo ES6: Promesas                 )
[//]: # (tags    - javascript, es6, aprendiendo-es6, es2015+ )
[//]: # (id      - 18                                        )
[//]: # (date    - 2016.04.09                                )
[//]: # (url     - es6-promesas                              )
[//]: # (excerpt - ¿Cansado de tener que lidiar con callback hells y pyramids of doom? ¡No te preocupes! Javascript ahora tiene una mejor manera de organizar tu código asíncrono: Promesas. )


¿Cansado de tener que lidiar con [callback hells y pyramids of doom](http://i.imgur.com/MByWioX)? ¡No te preocupes! Javascript ahora tiene una mejor manera de organizar tu código asíncrono: Promesas.


### Callbacks
En javascript (y en especial en node) generalmente realizamos varías operaciones que quisiéramos realizar una después de otra, pero debido a la naturaleza asíncrona de javascript es complicado hacerlo. La primera solución y más fácil de entender son los callbacks, funciones que se llaman dentro de una función después de que esta termina su ejecución.

```js
function funcionAsincrona(segundos, callback) {
  var texto = "Hola";

  setTimeout(function() {
    callback(texto);
  }, segundos)
}

funcionAsincrona(2000, function(texto) {
  console.log(texto)
});
```

Un ejemplo más real y común de esto se presenta en node.
```js
function actualizaUsuarioPorId(id, nuevaInfo) {
  User.findById(id, function(error, usuario) {
    if (error) { console.log(error); }

    usuario.info = nuevaInfo;
    usuario.save(function(error, usuarioActualizado) {
      if (error) { console.log(error); }

      console.log(usuarioActualizado);
    });
  });
}
```

Hay varios problemas con este patrón. No sólo complica la lectura del código, ya que tienes que leerlo completo para entender que hace, sino que tenemos forzosamente que tratar los errores de manera individual, aún si queremos hacer lo mismo.

### Promesas
Las promesas son una manera más sencillas de organizar y trabajar con funcionalidades asíncronas. Usando promesas podemos pasar de los callbacks que teniamos a algo como esto:
```js
function actualizaUsuarioPorId(id, nuevaInfo) {
  User
    .findByIdAsync(id)
    .then(function(usuario) {
      usuario.info = nuevaInfo;
      return usuario.saveAsync();
    })
    .then(function(usuario) {
      console.log(usuario);
    })
    .catch(function(error) {
      console.log(error);
    });
}
```

Y si usamos funciones con nombre en lugar de anónimas...
```js
function actualizaUsuarioPorId(id, nuevaInfo) {
  User
    .findByIdAsync(id)
    .then(actualizaInfo)
    .then(loggeaInfo)
    .catch(loggeaErrores);
}
```

De repente todo se vuelve hermoso y ahora podemos saber que pasos realiza nuestra función sin necesidad de leer todos los detalles de cada uno, lo cuál es genial para localizar funcionalidades y pasos en la aplicación de manera rápida.


### Creando promesas.
Cuando creas una promesa, debes saber que las promesas tienen 3 estados en los cuales pueden estar:

- **Pendiente.** La promesa aún no tiene un valor asignado. Esto es debido a que la operación asíncrona aún se está ejecutando.
- **Resuelta (resolve).** La promesa terminó de ejecutarse exitosamente y ahora tiene un valor que podemos usar.
- **Rechazada (reject).** Hubo un error o algo interrumpió la promesa de tal forma que falló en ser completado.

Para crear una promesa instanciamos `Promise` con `new` y le pasamos una función describiendo el comportamiento de la promesa.
```js
var promesa = new Promise(function(resolve, reject) {
  // ...cosas.
});
```

Por defecto, cuando creamos una promesa, esta se encuentra en estado **pendiente**. Para cambiar su estado, la función que la pasamos a `new Promise` recibe dos funciones de parámetro. La primera (`resolve`) es un callback que ejecutaremos para decir que la promesa ya se **resolvió**. La segunda (`reject`) es una función que usaremos para decir que la promesa fue **rechazada**.

Por ejemplo, usando una función sencilla de node.
```js
fs.readFile('/etc/passwd', function(err, data) {
  if (err) throw err;
  console.log(data);
});
```

Podemos convertirla en una función que regrese una promesa para poder tratarla más fácilmente:
```js
function leerArchivo(archivo) {
  return new Promise(function(resolve, reject) {
    fs.readFile('/etc/passwd', function(err, data) {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  })
}
```

"Espera un momento, ¡ahora tengo más código que antes!". Yep, tienes razón en la creación de promesas por lo general envolvemos a una función con callback en la promesa, pero la razón por lo que esto es beneficioso es por el API y la simpleza que ganamos en el resto del código al hacer esto.


### Consumiendo promesas.
Al usar una promesa tenemos dos métodos que tomar en cuenta: `then` y `catch`.

`Promise.then` toma una función que se ejecutará cuando la promesa se realice de manera exitosa.

```js
var miPromesa = new Promise(function(resolve) {
  setTimeout(resolve, 100, "foo");
});

miPromesa.then(function(resultado) {
  console.log(resultado); // "foo"
});
```
Si queremos protegernos de potenciales errores tenemos `Promise.catch` para tratarlos. Cuando una promesa falla, se brinca todo los `.then` y ejecuta sólo `.catch`.

```js
var miPromesa = new Promise(function(resolve, reject) {
  setTimeout(function(){ reject("NOPE"); },100)
});

miPromesa
  .then(function(resultado) {
    console.log(resultado); // No se ejecuta.
  })
  .catch(function(error){
    console.log("Oops! Algo se rompió");
    console.log(error); // NOPE
  })
```

Probablemente a simple vista no se note mucha mejora con  respecto a usar sólo callbacks. Cuando realmente se nota el cambio es cuando tenemos multiples promesas y usar funciones como variables en lugar de anónimas.

```js
function actualizaUsuarioPorId(id) {
  User
    .findByIdAsync(id)
    .then(actualizaInfo)
    .then(loggeaUsuario)
    .catch(loggeaErrores);
}
```
Ahora podemos leer más fácil y cada parte de la lógica de nuestra aplicación queda divida en funciones más fáciles de entender y que sólo realizan una tarea especifica.


### Promesas síncronas.
Las promesas son un patron que se utilize para lidiar con tareas asíncronas, pero también puedes crear una promesa que se resuelva de manera síncrona. Para ello, podemos usar directamente `Promise.resolve`.

```js
var miPromesa = Promise.resolve(42);

miPromesa.then(function(valor) {
  console.log(valor); // 42
});
```


### Multiples promesas.
Hay veces en las que ocupamos realizar varias promesas, pero no existe dependencias entre ellas. Para esos casos es mejor utilizar `Promise.all` para optimizar y ahorrar tiempo.

`Promise.all` toma como argumento un array de promesas y retorna una promesa que se resuelve sólo cuando todas las promesas que le pasamos ya tienen un valor. Cuando esto ocurre, ejecuta `.then` pasándole un arreglo con todos los valores que regresaron las promesas en el orden el que se las pasamos.

```js
var p1 = Promise.resolve(3);
var p2 = new Promise(function(resolve) {
  setTimeout(resolve, 100, "foo");
});
var p3 = 1337;
var p4 = new Promise(function(resolve) {
  setTimeout(resolve, 300, "bar");
});

Promise.all([p1, p2, p3, p4])
  .then(function(values) {
    console.log(values); // [3, "foo", 1337, "bar"]
  });
```


### Promesas simultáneas.
Una de las cosas geniales de las promesas es que podemos poner a competir promesas y usar sólo la que se ejecute más rápido. `Promise.race` toma un array de promesas y retorna una promesa que se resuelve en cuanto una de las promesas se completa.

```js
var p1 = new Promise(function(resolve) {
  setTimeout(resolve, 100, "uno");
});
var p2 = new Promise(function(resolve) {
  setTimeout(resolve, 200, "dos");
});
var p3 = new Promise(function(resolve) {
  setTimeout(resolve, 300, "tres");
});

Promise.race([p1, p2, p3])
  .then(function(resultado) {
    console.log(resultado); // "uno"
  });
```


### Promisify.
Ya viste la utilidad de las promesas, ahora el problema ahora es que no todas los APIs que utilizamos utilizan promesas y tener que envolver cada función en un `new Promise(...)` es algo pesado y se vuelve tedioso eventualmente.

Para estos casos tenemos un concepto conocido como *Promisify*. Lo que promisify hace es tomar una función que recibe un callback y retorna una copia de la función que realiza exactamente lo mismo pero que retorna una promesa en lugar de tener que pasarle un callback, así puedes disfrutar de los beneficios de las promesas sin tener que complicarte la vida.

Algunas librerias que recomiendo para esto son [promisify](https://www.npmjs.com/package/promisify), [es6-promisify](https://www.npmjs.com/package/es6-promisify) o si quieres convertir muchas funciones de una sola vez [Bluebird (usando `Promise.promisifyAll`)](http://bluebirdjs.com/docs/api/promise.promisifyall.html).

### Conclusión
Sea como quieras usarlas, las promesas son bastante cool y tienen muchas utilidades que ayudan a tener un mejor flujo asíncrono. En ES6, las promesas pasan a formar parte del lenguaje y ahora podemos escribir código mucho más fácil de entender sin tener que sacrificar funcionalidades.

---

*Este post es parte de la serie ["Aprendiendo ES6"](/blogs/tags/aprendiendo-es6), donde explico la mayoría de las funcionalidades nuevas que se han incluido con las nuevas especificaciones de ECMAScript. Si tienes dudas o hay alguna funcionalidad que aun no haya cubierto, no dudes en [avisarme](/about).*
