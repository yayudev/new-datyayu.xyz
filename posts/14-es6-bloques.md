[//]: # (title   - Aprendiendo ES6: Bloques                  )
[//]: # (tags    - javascript, es6, aprendiendo-es6, es2015+ )
[//]: # (id      - 14                                        )
[//]: # (date    - 2016.03.18                                )
[//]: # (url     - es6-bloques                               )
[//]: # (excerpt - En el post de let y const aprendimos acerca del alcance de las variables. Pero si queremos limitar el alcance a un bloque determinado tenemos algo más util que usar `if`s o funciones: Bloques. )



En el post de [let y const](/es6-let-const) aprendimos acerca del alcance de las variables. Pero si queremos limitar el alcance a un bloque determinado tenemos algo más util que usar `if`s o funciones: Bloques.


### IIFE
Un ejemplo común de porque querríamos limitar el alcance de las variables en un bloque es en el navegador. Por defecto, las variables en un script están disponibles como parte del objeto `window`. Para evitar colisiones y hacer una aplicación más modular, la técnica más popular es usar *Immediately Invoked Function Expressions* o **IIFE**.

Probablemente ya hayas visto esto antes, aún si no sabías como se llamaban.
```js
(function() {
  var fruta = 'banana';
  console.log('hey'); // "hey"
})()

console.log(fruta); // ReferenceError
```

Este patrón es de lo más común y la mayoría de las aplicaciones lo usan para no contaminar el objeto window y el alcance (scope) global con variables que pueden causar problemas.


### Bloques
En javascript podemos definir un bloque de código simplemente poniéndolo entre `{ }`. Esto de hecho es algo que ya teníamos en ES5 pero que debido a la manera en que funciona `var` realmente no nos servía mucho para limitar el alcance de las variables.
```js
{
  var fruta = 'banana';
  console.log('hey'); // "hey"
}

console.log(fruta); // "banana"
```

En ES6, ahora que tenemos `let` y `const`, podemos hacer uso de como estás se limitan al bloque que las contiene y remplazar las IIFEs por bloques.
```js
{
  const fruta = 'banana';
  console.log('hey'); // "hey"
}

console.log(fruta); // ReferenceError
```
¡Y eso es todo! Ahora puedes limitar el alcance de tus variables sin tener que complicar tu código e introducir IIFEs innecesarias.

*NOTA: ¡Recuerda que no funciona con `var` así que asegurate de no tener `var`s dentro de tu bloque si no quieres exponerlas!*



---

*Este post es parte de la serie ["Aprendiendo ES6"](/blog/tags/aprendiendo-es6), donde explico la mayoría de las funcionalidades nuevas que se han incluido con las nuevas especificaciones de ECMAScript. Si tienes dudas o hay alguna funcionalidad que aun no haya cubierto, no dudes en [avisarme](/about).*
