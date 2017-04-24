[//]: # (title   - Aprendiendo ES6: Desestructuración.       )
[//]: # (tags    - javascript, es6, aprendiendo-es6, es2015+ )
[//]: # (id      - 12                                        )
[//]: # (date    - 2016.03.16                                )
[//]: # (url     - es6-desestructuracion                     )
[//]: # (excerpt - La desestructuración o destructuring es uno de los conceptos más sencillos pero también uno de los más utilizados de ES6 y que ocupas aprender para poder utilizar modulos de ES6.)


Hoy tenia planeado tocar el tema ES6 modules (`import` y `export`) pero mientras escribía el post me di cuenta de que hay algo importante que conocer y entender antes de explicar como funcionan los módulos: la desestructuración en ES6.


### Desestructuración de arrays.
La desestructuración o destructuring es uno de los conceptos más sencillos pero también uno de los más utilizados de ES6. Básicamente es una forma sencilla de descomponer una colección en sus valores.

Por ejemplo, si queremos descomponer un array en sus elementos lo que normalmente haríamos es asignar cada posición del arreglo a una variable usando los indices.
```js
var numeros = [4, 2];
var primerNumero = numeros[0];
var segundoNumero = numeros[1];

console.log(primerNumero); // 4
console.log(segundoNumero); // 2
```

Pues esto en ES6 podemos hacerlo usando `[ ]` al declarar las variables.

```js
var numeros = [4, 2]
var [primerNumero, segundoNumero] = numeros;

console.log(primerNumero); // 4
console.log(segundoNumero); // 2
```

Algo bastante útil es que podemos obtener sólo los primeros valores y separarlos del resto usando `...`, sin importar el numero de elementos en el array.

```js
var numeros = [0, 1, 2, 3, 4, 5];
var [primerNumero, segundooNumero, ...otrosNumeros] = numeros;

console.log(primerNumero);  // 0
console.log(segundoNumero); // 1
console.log(otrosNumeros);  // [2, 3, 4, 5]
```

También un "truco" con la desestructuración de arrays es que puedes intercambiar los valores de dos variables sin ocupar de una tercera.
```js
var x = 3;
var y = 5;
[y, x] = [x, y];

console.log(x); // 5
console.log(y); // 3
```

### Desestructuración de objetos.
A pesar de lo genial que es la desestructuración de arrays, donde realmente brilla esta funcionalidad es en los objetos.

El concepto es el mismo, sólo que en lugar de obtener los elementos, aqui obtenemos las propiedades del objeto. Para ello usamos `{ }` y **se usa el nombre exacto** de la propiedad que queremos.

```js
var persona = {
  nombre: 'pepe',
  edad: 20,
};

var {nombre} = persona;
console.log(nombre); // "pepe"
```

Si queremos darle un nombre diferente a la variable, podemos hacerlo usando el formato `{propiedad: variable}`.


```js
var persona = {
  nombre: 'pepe',
  edad: 20,
};

var {nombre: name} = persona;
console.log(name); // "pepe"
```

También podemos usar valores por defecto, en caso de que el objeto no tenga la propiedad que buscamos.

```js
var persona = {
  nombre: 'pepe',
  edad: 20,
};

var {ocupacion='desempleado'} = persona;
console.log(ocupacion); // "desempleado"
```

### Desestructuración de parámetros.
Algo cool de la desestructuración es que puede ser utilizada incluso en los parámetros de una función. Por lo que podemos pasar de algo como
```js
function loggeaLaConfiguracion(config) {
  var color = config.color;
  var imagen = config.imagen || 'default.jpg';

  console.log(color);
  console.log(imagen);
}

loggeaLaConfiguracion({color: 'rojo'});
// "rojo"
// "default.jpg"
```

..a algo más sencillo:
```js
function loggeaLaConfiguracion({color, imagen='default.jpg'}) {
  console.log(color);
  console.log(imagen);
}

loggeaLaConfiguracion({color: 'rojo'});
// "rojo"
// "default.jpg"
```

Y ¡eso es todo! Este es uno de esos temas sencillos pero que una vez que lo entiendes y lo comienzas a aplicar te das cuenta de la gran diferencia que hacen en la calidad de tu código.


---

*Este post es parte de la serie ["Aprendiendo ES6"](/blog/tags/aprendiendo-es6), donde explico la mayoría de las funcionalidades nuevas que se han incluido con las nuevas especificaciones de ECMAScript. Si tienes dudas o hay alguna funcionalidad que aun no haya cubierto, no dudes en [avisarme](/about).*
