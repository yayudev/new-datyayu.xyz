[//]: # (title   - Aprendiendo ES6: arrow functions          )
[//]: # (tags    - javascript, es6, aprendiendo-es6, es2015+ )
[//]: # (id      - 07                                        )
[//]: # (date    - 2016.03.11                                )
[//]: # (url     - es6-arrow-functions                       )
[//]: # (excerpt - Si estás familiarizado con las lambdas de C# o Java 8, seguramente entiendas la mayor parte de este concepto.  Si no, puede que resulte algo extraño ver `users.map(user => user.name)`, pero en realidad esta nueva sintaxis es muy útil y puede mejorar bastante la legibilidad de nuestro código.)


Si estás familiarizado con las lambdas de C# o Java 8, seguramente entiendas la mayor parte de este concepto.  Si no, puede que resulte algo extraño ver `users.map(user => user.name)`, pero en realidad esta nueva sintaxis es muy útil y puede mejorar bastante la legibilidad de nuestro código.


## ¿Qué son las arrow functions?.
Las arrow functions son funciones anónimas que utilizan una flecha (`=>`) para ser declaradas, en lugar de la palabra `function`. Por ejemplo.

```js
var hello = function (name) {
  console.log('hello ' + name);
};
```

Usando arrow functions podemos reescribir esto como
```js
var hello = (name) => {
  console.log('hello ' + name);
};

```

No parece mucha diferencia, ¿verdad? Pero si la función sólo tiene una instrucción, podemos evitar los { } en la declaración.
```js
var hello = (name) => console.log('hello ' + name);
```

Y si sólo tienes un argumento, ¡puedes incluso evitar los paréntesis!
```js
var hello = name => console.log('hello ' + name);
```

## Retorno implicito.
Las arrow functions al ser usados sin un bloque ({}) tienen retorno implícito, por lo que funciones como
```js
var sumaDosNumeros = function(a, b) {
  return a + b;
}

sumaDosNumeros(2, 1); // 3
```
Es equivalente a
```js
var sumaDosNumeros = (a, b) => a + b;

sumaDosNumeros(2, 1); // 3
```

## Binding automático.
Otra característica, un poco más difícil de entender, es las arrow functions que automáticamente bindean el contexto de la función. Dicho de otra forma, las arrow functions agregan un `.bind(this)` a la función que creamos.

Por ello, estos dos códigos son equivalentes.
```js
var pepe = {
  nombre: "Pepe",
  amigos: ['Pedro', 'Jorge'],

  mostrarAmigos() {
    this.amigos.forEach(function(amigo) {
      console.log(this.nombre + " conoce a " + amigo)
    }.bind(this));
  }
};

pepe.mostrarAmigos();
```
```js
var pepe = {
  nombre: "Pepe",
  amigos: ['Pedro', 'Jorge'],

  mostrarAmigos() {
    this.amigos.forEach(amigo => {
      console.log(this.nombre + " conoce a " + amigo);
    });
  }
};

pepe.mostrarAmigos();
```


## Uso en callbacks.
Esta sintaxis es bastante conveniente para métodos que requieren callbacks, en especial si tu código tiene un paradigma funcional. Por ejemplo:
```js
users
  .filter(function(user) {
     return user.age > 18;
  })
  .map(function(user) {
    return user.name;
  })
  .forEach(function(username) {
    console.log(username);
  })
```

Puede ser re-escrito con mucho menos código usando arrow functions.
```js
users
  .filter(user => user.age > 18)
  .map(user => user.name)
  .forEach(username => console.log(username))
```

## Errores comunes.
* **Regresar objetos sin rodearlos en paréntesis.**
```js
// Incorrecto
var usuario = (nombre, edad) => { nombre: nombre, edad: edad }

// Correcto
var usuario = (nombre, edad) => ({ nombre: nombre, edad: edad })
```

* **Funciones sin parámetros.**
```js
// Incorrecto
var foo = => console.log('foooooo')

// Correcto
var foo = () => console.log('foooooo')
```

* **Usarlas con nombre.**
```js
// Incorrecto.
suma(a, b) => a + b

// Correcto
var suma = (a, b) => a + b
```


---

*Este post es parte de la serie ["Aprendiendo ES6"](/blog/tags/aprendiendo-es6), donde explico la mayoría de las funcionalidades nuevas que se han incluido con las nuevas especificaciones de ECMAScript. Si tienes dudas o hay alguna funcionalidad que aun no haya cubierto, no dudes en [avisarme](/about).*
