[//]: # (title   - Aprendiendo ES6: for ... of               )
[//]: # (tags    - javascript, es6, aprendiendo-es6, es2015+ )
[//]: # (id      - 17                                        )
[//]: # (date    - 2016.03.21                                )
[//]: # (url     - es6-for-of                                )
[//]: # (excerpt - Los ciclos `for` son de los primeros temas que aprendemos al comenzar en el mundo de la programación, y también de los más útiles. En muchos de los casos sólo los usamos para acceder a un valor usando el indice. Para estos casos, ES6 nos tiene algo preparado: For ... of.)


Los ciclos `for` son de los primeros temas que aprendemos al comenzar en el mundo de la programación, y también de los más útiles. En muchos de los casos sólo los usamos para acceder a un valor usando el indice. Para estos casos, ES6 nos tiene algo preparado: For ... of.


### Ciclos for
Seguramente ya has utilizado el ciclo `for` para acceder a los valores de un array. Normalmente sería algo así:
```js
var array = [10, 11, 12];

for (var i = 0; i < array.length; i++) {
  console.log(array[i]);
}

// 10 11 12
```

Esto funciona bien pero honestamente tenemos que usar demasiado código para una tarea tan sencilla.


### for in
Una manera de mejorar esto usando un ciclo `for in`.
```js
var array = [10, 11, 12];

for (var i in array) {
  console.log(array[i]);
}

// 10 11 12
```

Nos ahorramos bastante espacio haciendo esto pero aun nuestro código no es tan explícito como pudiera ser, el `array[i]` realmente no nos dice mucho acerca de lo que estamos loggeando.

### Array.forEach
Una manera más explícita de iterar sobre un array es usando `forEach`, un método incluido en el prototipo de `Array`.
```js
var array = [10, 11, 12];

array.forEach(function(numero) {
  console.log(numero)
});

// 10 11 12
```

Aunque esto nos ayuda a entender mejor lo que estamos haciendo, introduce el problema de no poder romper el ciclo.

Digamos que sólo queremos imprimir hasta que encontremos el número 11. Con `for in` lo haríamos así:

```js
var array = [10, 11, 12];

for (var i in array) {
  if (array[i] === 11) {
    break;
  }

  console.log(array[i]);
}

// 10
```
Con un `for` normal haríamos algo similar. Pero con `forEach` no podemos romper el ciclo, ya que cada función se ejecuta independiente de otra.


### for of
¿No sería genial si pudiéramos tener todo lo bueno de cada ciclo? ¡Con ES6 es posible!

ES6 introduce el ciclo `for of`, cuya sintaxis es similar a `for in`, con la diferencia que la variable que usas representa un valor, no un indice.

```js
var array = [10, 11, 12];

for (var element of array) {
  console.log(element);
}

// 10 11 12
```
De esta manera tenemos una sintaxis compacta, legible y podemos romper el ciclo cuando queramos.

Por cierto, `for of` no sólo funciona con arrays sino también con `String`, `NodeList`, `Set`, `Map`, generators  y basicamente cualquier otro iterable.

---

*Este post es parte de la serie ["Aprendiendo ES6"](/blog/tags/aprendiendo-es6), donde explico la mayoría de las funcionalidades nuevas que se han incluido con las nuevas especificaciones de ECMAScript. Si tienes dudas o hay alguna funcionalidad que aun no haya cubierto, no dudes en [avisarme](/about).*
