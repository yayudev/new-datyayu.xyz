[//]: # (title   - Aprendiendo ES6: clases                   )
[//]: # (tags    - javascript, es6, aprendiendo-es6, es2015+ )
[//]: # (id      - 09                                        )
[//]: # (date    - 2016.03.13                                )
[//]: # (url     - es6-clases                                )
[//]: # (excerpt - ¿Eres un amante de OOP? Muchos de los programadores nuevos en javascript vienen con experiencia de un lenguaje orientado a objetos y les resulta confuso el darse cuenta de que javascript no tiene clases y la herencia y objetos se basa en prototypes. Pues si eres uno de esos, no te preocupes que ES6 ahora incluye clases para que no tengas que preocuparte y puedas programar como te sientas más cómodo.)


¿Eres un amante de OOP? Muchos de los programadores nuevos en javascript vienen con experiencia de un lenguaje orientado a objetos y les resulta confuso el darse cuenta de que javascript no tiene clases y la herencia y objetos se basa en prototypes. Pues si eres uno de esos, no te preocupes que ES6 ahora incluye clases para que no tengas que preocuparte y puedas programar como te sientas más cómodo.

### Clases
Anteriormente para crear una clase teníamos que definirlas usando funciones y extender su prototype para agregarle métodos.

```js
function Persona(nombre, edad) {
  this.nombre = nombre;
  this.edad = edad;
}

Persona.prototype.aumentarEdad = function() {
  this.edad += 1;
}

var pepe = new Persona('pepe', 20);
pepe.aumentarEdad();

console.log(pepe); // Persona { nombre: 'pepe', edad: 21 }
```

Pero esta sintaxis puede no ser comprendida por personas nuevas o que no entienden el concepto de *prototype*. Esto puede ser solucionado usando ES6.

```js
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  aumentarEdad() {
    this.edad += 1;
  }
}

var pepe = new Persona('pepe', 20);
pepe.aumentarEdad();

console.log(pepe); // Persona { nombre: 'pepe', edad: 21 }
```

Esto es mucho más fácil de entender para alguien nuevo a javascript, ya que la palabra `class` y `constructor` son conceptos casi universales con los que la mayoría de los desarrolladores que conocen OOP ya están familiarizados.

Aun así, no está de más aclarar que esta sintaxis sólo es una manera más bonita de hacer lo que teniamos antes, ya que por debajo realmente [está haciendo herencia prototipal](http://www.sitepoint.com/object-oriented-javascript-deep-dive-es6-classes/), pero ese es un tema para otro post.

### Herencia
La herencia entre "clases" también ha sido algo difícil de entender y cuya sintaxis es aún mas compleja para entender a primera vista.
```js
function Empleado(nombre, edad, ocupacion) {
  Persona.call(this, nombre, edad);
  this.ocupacion = ocupacion;
}

Empleado.prototype = Object.create(Persona.prototype);
Empleado.prototype.constructor = Empleado;
Empleado.prototype.aumentarEdad = function () {
  Persona.prototype.aumentarEdad.call(this);
  this.edad += 10;
};
```

Demasiados `prototype` y bastante uso de `call` que realmente no aportan mucho a la comprensión del código. Pero ES6 hace esto mucho más fácil de entender usando `extends` y `super`.

```js
class Empleado extends Persona {
  constructor(nombre, edad, ocupacion) {
    super(nombre, edad);
    this.ocupacion = ocupacion;
  }

  aumentarEdad() {
    super.aumentarEdad();
    this.edad += 10;
  }
}
```

`super` sencillo, ¿verdad? (Perdón, no pudo evitarlo). Ninguno de estos conceptos debería ser nuevo si has trabajado con OOP antes y la sintaxis es directa y más explicita y fácil de entender que usando `call` y `prototype`.

### static
Métodos estáticos también pueden ser incluidos dentro de las classes de ES6 usando la palabra `static` antes del método.

```js
class Persona {
  constructor(nombre, edad) {
    this.nombre = nombre;
    this.edad = edad;
  }

  static gritar() {
    return 'Aahhhhhh!';
  }
}

console.log(Persona.gritar()); // 'Aahhhhhh!'
```

Hay que tener en cuenta que estos métodos **no** serán instanciados al usar `new`, tenemos que usarlos directamente desde la clase como `Persona.empresa`.


---

*Este post es parte de la serie ["Aprendiendo ES6"](/blog/tags/aprendiendo-es6), donde explico la mayoría de las funcionalidades nuevas que se han incluido con las nuevas especificaciones de ECMAScript. Si tienes dudas o hay alguna funcionalidad que aun no haya cubierto, no dudes en [avisarme](/about).*
