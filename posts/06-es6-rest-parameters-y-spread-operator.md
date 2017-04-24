[//]: # (title   - Aprendiendo ES6: Rest parameters y spread operator. )
[//]: # (tags    - javascript, es6, aprendiendo-es6, es2015+           )
[//]: # (id      - 06                                                  )
[//]: # (date    - 2016.03.10                                          )
[//]: # (url     - es6-rest-parameters-y-spread-operator               )
[//]: # (excerpt - ¿Alguna vez has tenido una función que quieres que funcione para multiples argumentos, sin importar si sólo le pasan uno o si le pasan 1000? ¿Recuerdas lo poco comprensible que fue tener que usar `arguments` con algo como `[].prototype.slice.call` para poder acceder a todos esos valores que te pasaron? Pues esos días se acabaron: ¡rest operator al rescate! )


¿Alguna vez has tenido una función que quieres que funcione para multiples argumentos, sin importar si sólo le pasan uno o si le pasan 1000? ¿Recuerdas lo poco comprensible que fue tener que usar `arguments` con algo como `[].prototype.slice.call` para poder acceder a todos esos valores que te pasaron? Pues esos días se acabaron: ¡rest operator al rescate!

### Rest parameters.
Rest parameters es un nuevo concepto incluido en ES2015 que nos ayuda a poder separar los argumentos de una función en un array de manera rápida y sencilla.

Anteriormente ocupábamos hacer algo así para una función con argumentos variables.
```js
function sumar() {
  var valores = Array.prototype.slice.call(arguments);
  var total = 0;

  for (var i = 0; i < numeros.length; i++) {
    total += valores[i];
  }

  return total;
}

sumar(1, 2, 3, 4, 5); //15
```
Si bien la función es fácil de entender, tenemos un `Array.prototype.slice.call` que realmente se ve complicado y para programadores sin experiencia hasta puede resultar aterrador.

En cambio, usando rest parameters podemos simplificar esto con un operador bastante sencillo: `...`
```js
function sumar(...valores) {
  var total = 0;

  for (var i = 0; i < valores.length; i++) {
    total += args[i];
  }

  return total;
}

sumar(1, 2, 3, 4, 5); //15
```
¡Mucho mejor! Ahora no tenemos que hacer magia vudú en nuestras funciones para tener n argumentos.

Lo cool de esto es que podemos solamente aplicar el operador a los últimos parámetros de la función.
```js
function mostrarDeuda(nombre, deudaInicial, ...pagos) {
  var totalPagado = sumar(...pagos);
  var deudaActual = deudaInicial - totalPagado;

  console.log(nombre + ' debe $' + deudaActual);
}

mostrarDeuda('Pepe', 1000, 50, 100, 500, 200); // 'Pepe debe $150'
```

### Spread operator.
Si miras el ejemplo anterior con detenimiento, te darás cuenta de que al llamar `sumar`, lo hice de la misma manera que con los parámetros.

```js
var totalPagado = sumar(...pagos);
```

Esta vez estoy usando un nuevo operador llamado *spread operator*.

A pesar de que la sintaxis es la misma que con rest parameters, spread operators hace lo contrario: separa un array en sus elementos.

Entonces en lugar de tener que hacer algo como:
```js
sumar(pagos[0], pagos[1], pagos[2], pagos[etc])
```
Podemos simplemente resumirlo en
```js
sumar(...pagos)
```
Y nos evitamos el tener que sobre-complicar nuestro código y exponernos a errores.

Sin embargo, spread es más util que sólo eso, ya que podemos usarlo para también que concatenar arrays.
```js
var numeros = [2, 3, 4];

console.log([1, ...numeros, 5]); // [1, 2, 3, 4, 5]
```
Y así de sencillo, sin tener que usar métodos o tener que meter lógica confusa, podemos crear nuevos arrays de manera sencilla.


---

*Este post es parte de la serie ["Aprendiendo ES6"](/blog/tags/aprendiendo-es6), donde explico la mayoría de las funcionalidades nuevas que se han incluido con las nuevas especificaciones de ECMAScript. Si tienes dudas o hay alguna funcionalidad que aun no haya cubierto, no dudes en [avisarme](/about).*
