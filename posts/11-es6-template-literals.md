[//]: # (title   - Aprendiendo ES6: Template Literals        )
[//]: # (tags    - javascript, es6, aprendiendo-es6, es2015+ )
[//]: # (id      - 11                                        )
[//]: # (date    - 2016.03.15                                )
[//]: # (url     - es6-template-literals                     )
[//]: # (excerpt - Una manera efectiva y sencilla de realizar interpolación de strings es algo de lo que javascript ha carecido por mucho tiempo, pero ES6 tiene algo para arreglar este problema: Template literals.)


Una manera efectiva y sencilla de realizar interpolación de strings es algo de lo que javascript ha carecido por mucho tiempo, pero ES6 tiene algo para arreglar este problema: Template literals.

### Template literals.
La interpolación de strings es básicamente una forma de meter variables a un string. En ES5, lo que haciamos era concatenar cadenas y variables, "sumando" las variables a la string que queríamos obtener.

```js
var nombre = 'pepe';
var edad = 20;

var mensaje = "Su nombre es " + nombre + " y tiene " + edad + " años.";

console.log(mensaje); // "Su nombre es pepe y tiene 20 años."
```

Aunque esto funciona, es bastante común que terminemos cometiendo errores con los espacios, además de que el código no es intuitivo visualmente.

ES6 nos soluciona estos problema con el empleo de Template literals. La sintaxis es bastante sencilla. En lugar de definirlos con `" "` o `' '` como las cadenas normales, usamos `` ` ` ``, y para usar variables simplemente las incluimos dentro de la cadena en la posición deseada pero envolviéndolas con `${ }`.

```js
var nombre = 'pepe';
var edad = 20;

var mensaje = `Su nombre es ${nombre} y tiene ${edad} años.`;

console.log(mensaje); // "Su nombre es pepe y tiene 20 años."
```

¡Mucho más legible! Y no sólo es mas fácil de entender  sino que al mismo tiempo nos evitamos errores de espaciado al ver la posición exacta donde se introducirá la variable.

### Operaciones.
Las template literals son tan cool que incluso puedes realizar operaciones y evaluar expresiones dentro de ellas en lugar de pasarle una variable.

```js
var ejemplo = `1 + 2 = ${1 + 2}`;
console.log(ejemplo); // "1 + 2 = 3"
```

Aunque en ese caso no parezca algo tan útil, lo es si quieres llamar métodos.

```js
var date = new Date();
var ejemplo = `La hora es ${date.getHours()}:${date.getMinutes()}.`;
console.log(ejemplo); // "La hora es 8:11" (o tu hora local!)
```

### Saltos de linea.
La última ventaja de usar template literals es que estos conservan los saltos de linea, así que facilitan la creación de strings con multiples lineas.

En ES5, haríamos algo así:
```js
var ejemplo = "\n" +
"Lista de cosas\n" +
"- Libro\n" +
"- Silla\n"+
"- Banana\n";
console.log(ejemplo);
//
// Lista de cosas
// - Libro
// - Silla
// - Banana
```

Pero usando template literals podemos simplemente escribirlo como queremos que se vea.
```js
var ejemplo = `
Lista de cosas
- Libro
- Silla
- Banana`;
console.log(ejemplo);
//
// Lista de cosas
// - Libro
// - Silla
// - Banana
```


---

*Este post es parte de la serie ["Aprendiendo ES6"](/blog/tags/aprendiendo-es6), donde explico la mayoría de las funcionalidades nuevas que se han incluido con las nuevas especificaciones de ECMAScript. Si tienes dudas o hay alguna funcionalidad que aun no haya cubierto, no dudes en [avisarme](/about).*
