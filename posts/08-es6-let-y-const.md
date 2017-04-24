[//]: # (title   - Aprendiendo ES6: let y const              )
[//]: # (tags    - javascript, es6, aprendiendo-es6, es2015+ )
[//]: # (id      - 08                                        )
[//]: # (date    - 2016.03.12                                )
[//]: # (url     - es6-let-y-const                           )
[//]: # (excerpt - Una tendencia muy importante que ha surgido con la adopción ES6/ES2015 es el dejar de usar completamente `var` para declarar variables. Esto parece totalmente exagerado y sin sentido si no conoces es6, en especial porque `var` era la única manera que teníamos de declarar variables en ES5. Pero una vez que conoces `let` y `const`, todo es más hermoso.)


Una tendencia muy importante que ha surgido con la adopción ES6/ES2015 es el dejar de usar completamente `var` para declarar variables. Esto parece totalmente exagerado y sin sentido si no conoces es6, en especial porque `var` era la única manera que teníamos de declarar variables en ES5. Pero una vez que conoces `let` y `const`, todo es más hermoso.


### let
`let` es básicamente una versión mejorada de `var`, siendo la única diferencia que `let` es más definida en cuanto al alcance (scope) que tiene la variable.

Por ejemplo, usando var
```js
var msg = 'fuera';

if (x > 0) {
  var msg = 'dentro';
  console.log(msg); // 'dentro'
}

console.log(msg); // 'dentro'
```

A pesar de que `var msg = 'dentro'` es declarado dentro del bloque `if`, aún podemos usar la variable fuera del bloque en el cual fue declarada, sobre-escribiendo incluso la variable que ya teníamos. Esto puede llevarnos a errores inesperados, por lo que `let` se encarga de arreglar ese comportamiento.
```js
let msg = 'fuera';

if (x > 0) {
  let msg = 'dentro';
  console.log(msg); // 'dentro'
}

console.log(msg); // 'fuera'
```

De esta manera, `let` y `var` pueden usarse de forma similar pero al usar `let` evitamos comportamientos extraños y aseguramos que las variables sólo sean validas dentro del bloque en el cual las declaremos.

### const
Como su nombre lo dice, `const` sirve para declarar una constante, es decir, un valor que no va a cambiar. Esto significa que una vez que declares un valor con `const` no va a poder ser **asignado** de nuevo después.

```js
const num = 3;
num = 4; // Error!
```

Aun así, la parte importante a entender con `const` es que el valor declarado **solamente está protegido contra asignaciones, no contra mutaciones**. Por ejemplo, en el caso de un array, este no puede ser re-asignado pero sí modificado y extendido.
```js
const arr = [1, 2, 3];

arr = ['a', 'b', 'c']; // Error!
console.log(arr); // [1, 2, 3]

arr[0] = 'a'; // Valido.
console.log(arr); // ['a', 2, 3]

arr.push('d'); // Valido.
console.log(arr); // ['a', 2, 3, 'd']
```

Esto es debido a que la variable `arr` sólo mantiene la referencia en memoria del arreglo, no el valor del mismo. Por ende, esto también aplica a los objetos , ya que funcionan de la misma manera.

```js
const obj = {
  nombre: 'pepe',
  edad: 20
};

obj = {}; // Error!
console.log(obj); // { nombre: 'pepe', edad: 20 }

obj.nombre = 'mario'; // Valido.
console.log(obj); // { nombre: 'mario', edad: 20 }

obj.nivel = 5; // Valido.
console.log(obj); // { nombre: 'mario', edad: 20, nivel: 5 }
```

Por cierto, `const` sigue las mismas reglas que `let`, así que usar `const` también te garantiza que tus variables sólo estarán dentro del bloque en cual fueron declaradas.

### var vs let vs const
Una duda bastante común al comenzar a entender estos nuevos "tipos" de variables es cuándo y donde usar cada uno. Realmente no hay una regla estricta que nos obligue a usar uno u otro, así que es más consideración del desarrollador. Aun así, la mayoría de las personas que han adoptado este estándar están de acuerdo en que `var` debe ser remplazado por `let` o `const`, según dependa el caso, para evitar problemas o errores a futuro.

Personalmente, yo prefiero mantener todas mis variables con `const`, a menos que tenga una razón válida para cambiar el valor de la variable después de su asignación, en ese caso las declaro con `let`. Si te agrada la idea, te recomiendo que sigas este patron que a mí me ha dado buenos resultados; si no, encuentra el que a ti más te funcione y compartelo para que más gente pueda mejorar su código.


---

*Este post es parte de la serie ["Aprendiendo ES6"](/blog/tags/aprendiendo-es6), donde explico la mayoría de las funcionalidades nuevas que se han incluido con las nuevas especificaciones de ECMAScript. Si tienes dudas o hay alguna funcionalidad que aun no haya cubierto, no dudes en [avisarme](/about).*
