[//]: # (title   - Vue.js: Condicionales y listas )
[//]: # (tags    - javascript, vuejs              )
[//]: # (id      - 31                             )
[//]: # (date    - 2017.02.07                     )
[//]: # (url     - vuejs-listas                   )
[//]: # (excerpt - Ya hemos revisado como usar Vue.js para interactuar con el DOM de manera sencilla pero ahora toca ver cómo mostrar contenido basado en una o varias condiciones y cómo trabajar con listas de la manera correcta. )


Ya hemos revisado como usar Vue.js para [interactuar con el DOM de manera sencilla](/blog/posts/vuejs-dom/) pero ahora toca ver cómo mostrar contenido basado en una o varias condiciones y cómo trabajar con listas de la manera correcta.

---

*Este post es parte de [una serie acerca de VueJS](/blog/tags/vuejs/). Si eres nuevo usando Vue.js y no has leido los post anteriores, te recomiendo leer la [Introduccion a Vue.js](/blog/posts/introduccion-a-vue-js/) y [como interactuar con el DOM usando Vue](/blog/posts/vuejs-dom) para que tengas una mejor comprension de este post*

---


## Condicionales
Muchas veces ocurre que queremos mostrar cierto contenido sólo si se cumple una condición. La manera en que podemos lograr esto en Vue es con `v-if`.

```html
<div id="app">
    <button @click="cambiarEstado">Mostrar/Ocultar</button>
    <h1 v-if="mostrar"> Hola </h1>
</div>
```
```js
new Vue({
    el: '#app',
    data: {
        mostrar: true
    },
    methods: {
        cambiarEstado: function() {
            this.mostrar = !this.mostrar;
        }
    }
})
```
Aquí tenemos que el `h1` utiliza una directiva de Vue, `v-if`, y lo que hace es que sólo renderizará el contenido cuando la variable `mostrar` dentro de la instancia de Vue sea `true`. También tenemos un botón que al ser clickeado ejecuta el método `cambiarEstado`, el cual únicamente invierte el valor de `mostar`, cambiándolo a `false` si era `true` y viceversa.

<iframe width="100%" height="300" src="//jsfiddle.net/datyayu/pn7fmk3g/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Además, Vue nos ofrece una manera bastante sencilla de manejar situaciones en los que queremos mostrar uno de varios casos usando `v-else` y `v-else-if`.

```html
<div id="app">
    <button @click="sumarUno">+1</button>
    <h1 v-if="numero === 1"> Uno </h1>
    <h1 v-else-if="numero === 2"> Dos </h1>
    <h1 v-else-if="numero === 3"> Tres </h1>
    <h1 v-else> No 1, 2 o 3 :( </h1>
</div>
```
```js
new Vue({
    el: '#app',
    data: {
        numero: 1
    },
    methods: {
        sumarUno: function() {
            this.numero++;
        }
    }
})
```

Es bastante sencillo de entender, estas directivas funcionan como cualquier `if/else` normal en javascript. Al clickear el botón, se cambia el valor de la variable `numero` y Vue se encarga de mostrar el caso que corresponda al valor actual, o utiliza `v-else` si ninguno de los casos se cumple.

<iframe width="100%" height="300" src="//jsfiddle.net/datyayu/pn7fmk3g/1/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


## v-show
`v-if` es bueno ya que no renderiza el contenido al cargar la pagina si la propiedad es `false` al inicio, mejorando el tiempo de carga inicial. Sin embargo, si ese `v-if` tiende a cambiar mucho durante el transcurso de tu aplicación, lo mejor es usar `v-show`.

```html
<h1 v-show="mostrar"> Hola </h1>
```

`v-show` es igual a `v-if` en el sentido de que ambos se usan igual y ocultan o muestran el contenido basado en la condición que les pasemos. Sin embargo, `v-if` remueve por completo el elemento del DOM mientras que `v-show` solo le aplica un `display: none;` al estilo del elemento.

<iframe width="100%" height="300" src="//jsfiddle.net/datyayu/pn7fmk3g/2/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Por lo anterior, la recomendación es utilizar `v-show` si el elemento va a cambiar constantemente y `v-if` si lo más seguro es que no cambie durante el transcurso de la aplicación, de esta manera evitamos hacer cambios al DOM lo mejora el rendimiento de la aplicacion.


## Iterando un array
Parte fundamental de la mayoría de las aplicaciones es el trabajar con listas de datos. Ya sea un array sencillo o algo más complejo como una lista de objetos, su uso con Vue es bastante sencillo. La manera en que lo hacemos es usando la directiva `v-for`.

```html
<ul id="app">
    <li v-for="nombre in nombres">
        {{ nombre }}
    </li>
</ul>
```
```js
new Vue({
    el: '#app',
    data: {
        nombres: [ 'pepe', 'beto', 'max' ]
    }
})
```
El valor de `v-for` tiene el formato `[elemento] in [lista_de_elementos]`. Lo que hace Vue es iterar la `[lista_de_elementos]`; y `[elemento]` representa al elemento actual que va recorriendo. Por cierto, el nombre del `[elemento]` puede ser cualquiera que tú quieras ponerle.

<iframe width="100%" height="300" src="//jsfiddle.net/datyayu/pn7fmk3g/3/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


## Iterando con indice
Muchas veces ademas del valor, también queremos obtener el índice de la iteración en la que vamos. Para hacer esto con Vue, sólo hace falta usar la sintaxis

```html
<li v-for="(nombre, indice) in nombres">
    {{ indice }} - {{ nombre }}
</li>
```

Donde en lugar de guardar solo el valor del elemento, declaramos una tupla `(nombre, indice)` en la que la primera posición (`nombre`) es el valor actual del elemento y la segunda (`indice`) el índice del mismo.

<iframe width="100%" height="300" src="//jsfiddle.net/datyayu/pn7fmk3g/4/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## Iterando una lista de objetos
Iterar sobre una lista de objetos es exactamente lo mismo que hacerlo en un array sencillo.

```html
<ul id="app">
    <li v-for="persona in personas">
        {{ persona.nombre }} ({{ persona.edad }})
    </li>
</ul>
```
```js
new Vue({
    el: '#app',
    data: {
        personas: [
            { nombre: 'pepe', edad: 30 },
            { nombre: 'beto', edad: 25 },
            { nombre: 'max',  edad: 20 },
        ]
    }
})
```

La sintaxis es exactamente la misma, lo único que cambia es que, como es un objeto, debemos acceder a sus propiedades usando `objeto.propiedad` (como `persona.nombre`), pero fuera de eso funciona exactamente igual que como ya lo hemos visto.

<iframe width="100%" height="300" src="//jsfiddle.net/datyayu/pn7fmk3g/6/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## Como modificar un array.
Cuando modificas un array en los métodos de tu instancia de Vue, debes utilizar los métodos genéricos de un array, como

- `push`
- `pop`
- `shift`
- `unshift`
- `splice`
- `sort`
- `reverse`.

Esto es debido a que Vue tiene optimizaciones internas que le permiten detectar estos métodos y revisar los cambios para así modificar el DOM de la manera más eficiente posible.

Entonces, para agregar un elemento utilizarías algo como:

```js
new Vue({
    //...
    methods: {
        agregarPersona: function() {
            this.personas.push({ nombre: 'jorge', edad: 28 })
        }
    }
})
```

De esta manera Vue internamente reconocerá que el array de `personas` cambió y actualizará el DOM para reflejarlo.

<iframe width="100%" height="300" src="//jsfiddle.net/datyayu/pn7fmk3g/8/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


Vue también reconoce cuando re-asignas el valor a un nuevo array, como al usar `filter`, `concat`, `reduce`, `slice` o `map`.

Por ejemplo:

```js
new Vue({
    //...
    methods: {
        filtrarPersonas: function() {
            this.personas = this.personas.filter(function(persona) {
                return persona.edad > 18;
            });
        }
    }
})
```

Contrario a lo que parecería, a pesar de que estás creando un nuevo array al usar `filter` en lugar de modificar el que ya tenías, Vue.js es inteligente y sólo realizará las operaciones mínimas requeridas, dejando intactos los elementos que ya estaban presentes originalmente y sólo removiendo los que ya no quieres mostrar.

<iframe width="100%" height="300" src="//jsfiddle.net/datyayu/pn7fmk3g/5/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


## Como **NO** modificar un array
Debido a las optimizaciones internas que Vue realiza para ser más rápido y eficiente, hay que tener cuidado pues hay dos casos en los que Vue puede que no detecte tus cambios y genere errores en tu aplicación. Por ello, las recomendaciones son:

#### 1. **NO modificar accediendo con el índice**.
Por ejemplo:

```js
this.personas[indice] = nuevoValor;
```
En su lugar, puedes remplazarlo por:
```js
this.personas.splice(indice, 1, nuevoValor);
```
Que realiza exactamente lo mismo pero sí es registrado por el detector de cambios de Vue.

#### 2. **NO modificar el tamaño del array directamente**.
Por ejemplo:

```js
this.personas.length = nuevoTamano;
```
Como remplazo, puedes usar
```js
this.personas.splice(nuevoTamano);
```

## Uso de &lt;template&gt;'s
Una de las limitaciones al usar `v-if`, `v-show` o `v-for` es que sólo se declaran en un elemento, por lo que si queremos mostrar y ocultar un bloque de contenido nos vemos obligados a agregar un `div` que los contenga.

Por ejemplo, teniendo:

```html
<!-- Login con usuario -->
<label>Usuario</label>
<input type="text" placeholder="Introduce tu usuario">

<!-- Login con correo -->
<label>Email</label>
<input type="email" placeholder="Introduce tu email">
```

En este caso, lo lógico sería agruparlos en `div` para poder usar `v-if`.

```html
<div v-if="tipoDeLogin === 'usuario'">
    <label>Usuario</label>
    <input type="text" placeholder="Introduce tu usuario">
</div>
<div v-else>
    <label>Email</label>
    <input type="email" placeholder="Introduce tu email">
</div>
```

Esto no parece tan malo, pero agregar un `div` puede que llegue a romper tus estilos de css.

Para evitar esto, podemos usar la etiqueta `<template>` en lugar de `<div>`.

```html
<template v-if="tipoDeLogin === 'usuario'">
    <label>Usuario</label>
    <input type="text" placeholder="Introduce tu usuario">
</template>
<template v-else>
    <label>Email</label>
    <input type="email" placeholder="Introduce tu email">
</template>
```

La ventaja aquí es que la etiqueta de `<template>` no se renderiza, sólo su contenido, por lo que obtenemos el mismo resultado que con `div` pero sin tener que envolver a todos los elementos en un contenedor extra.

<iframe width="100%" height="300" src="//jsfiddle.net/datyayu/pn7fmk3g/5/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

---

Con todo este conocimiento ya tienes más que suficiente para crear aplicaciones usando Vue, ¡felicidades! En el siguiente post crearemos una pequeña app para poner a prueba estos conceptos y ver como todo se complementa para hacer algo funcional.

Como siempre, [los ejemplos de este post están disponible en github](https://github.com/datyayu-xyz/vuejs-listas) para cualquier duda que tengas o mejora que quieras agregar, ¡así que no dudes en hacerlo!

---

*Este post es parte de [una serie acerca de VueJS](/blog/tags/vuejs/). Si tienes dudas o hay alguna funcionalidad que aun no haya cubierto, no dudes en avisarme.*
