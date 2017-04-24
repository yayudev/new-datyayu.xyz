[//]: # (title   - Aprendiendo ES6: Object literals          )
[//]: # (tags    - javascript, es6, aprendiendo-es6, es2015+ )
[//]: # (id      - 16                                        )
[//]: # (date    - 2016.03.20                                )
[//]: # (url     - es6-object-literals                       )
[//]: # (excerpt - Seguro ya conoces los objects literals, es decir, la declaración de objetos en javascript usando `{ }`. Pues revisaremos lo nuevo que ES6 tiene para mejorar el uso de object literals. )



Seguro ya conoces los objects literals, es decir, la declaración de objetos en javascript usando `{ }`. Hoy revisaremos lo nuevo que ES6 tiene para mejorar el uso de object literals.


### Valores abreviados.

Normalmente cuando definimos una propiedad en un objeto, lo hacemos lo hacemos con el formato `{ propiedad: valor }`. Aunque muchas veces ocurre que queremos agregar un variable como valor a una propiedad con el mismo nombre que la variable. Por ejemplo:
```js
var nombre = 'pepe';
var edad = 20;

var info = {
  nombre: nombre,
  edad: edad,
  cool: true,
};

console.log(info); // { nombre: "pepe", edad: 20, cool: true }
```

Si te das cuenta, estamos repitiendo lo mismo dos veces (`nombre: nombre`, `edad: edad`).

Ahora con ES6 podemos evitar eso y ahorrar un par de palabras.

```js
var nombre = 'pepe';
var edad = 20;
var esCool = true;

var info = {
  nombre,
  edad,
  cool: esCool,
};

console.log(info); // { nombre: "pepe", edad: 20, cool: true }
```

Si sólo incluimos una variable dentro del objeto, el interprete le dará el mismo nombre a la propiedad que el que tiene la variable. Y además podemos mezclar ambos tipos de declaraciones si por alguna razón lo ocupamos.


### Nombres de propiedades computables.
Cuando creamos object literals podemos decidir el valor de las propiedades usando variables, pero si queremos darle nombre a una propiedad usando una variable tenemos que hacer una asignación aparte.

```js
var propiedad = 'edad';
var valor = 20;

var info = { nombre: 'pepe' };
info[propiedad] = valor;

console.log(info); //  { nombre: "pepe", edad: 20 }
```

Gracias a ES6, ya no tenemos que hacer opeaciones extras, pues podemos usar variables para el nombre de las propiedades, siempre y cuando las rodeemos con `[ ]`.

```js
var propiedad = 'edad';
var valor = 20;

var info = {
  nombre: 'pepe',
  [propiedad]: valor,
};

console.log(info); //  { nombre: "pepe", edad: 20 }
```

La única desventaja que tiene este método es que no podemos usar nombres abreviados.

```js
var propiedad = 'edad';

var info = { [propiedad] };
// SyntaxError
```

### Métodos.

Normalmente al definir un objeto con métodos usamos funciones anónimas como valor para una propiedad.
```js
var pepe = {
  nombre: 'pepe',

  saludar: function() {
    console.log('hola! soy ' + this.nombre);
  },
};

pepe.saludar();
```

Con ES6, podemos usar la misma sintaxis que en al crear clases para definir nuestros métodos.

```js
var pepe = {
  nombre: 'pepe',

  saludar() {
    console.log('hola! soy ' + this.nombre);
  },
};

pepe.saludar();
```

---

*Este post es parte de la serie ["Aprendiendo ES6"](/blog/tags/aprendiendo-es6), donde explico la mayoría de las funcionalidades nuevas que se han incluido con las nuevas especificaciones de ECMAScript. Si tienes dudas o hay alguna funcionalidad que aun no haya cubierto, no dudes en [avisarme](/about).*
