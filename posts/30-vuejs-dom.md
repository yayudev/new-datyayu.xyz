[//]: # (title   - Vue.js: Interacción con el DOM )
[//]: # (tags    - javascript, vuejs              )
[//]: # (id      - 30                             )
[//]: # (date    - 2017.02.01                     )
[//]: # (url     - vuejs-dom                      )
[//]: # (excerpt - Ya que hemos tenido una vista general de Vue.js, en este post revisaremos a detalle la manera en la que puedes utilizar Vue.js para crear interactuar con el dom y añadir interactividad a tu aplicación. )


[Ya que hemos tenido una vista general de Vue.js](/blog/posts/introduccion-a-vue-js), en este post revisaremos a detalle la manera en la que puedes utilizar Vue.js para crear interactuar con el dom y añadir interactividad a tu aplicación.


## Mostrar texto
Lo fundamental de toda aplicación es el como mostrar algo en la página. La manera más sencilla de mostrar datos en Vue es usando `{{ }}` para incluir texto en medio de nuestro html, lo cual también es conocido como interpolación.

Por ejemplo, si tenemos un mensaje (`msg`) en nuestra instancia de Vue como

```js
new Vue({
    el: '#app',
    data: {
        msg: 'Hola'
    }
})
```

Podemos mostrarlo en la aplicación usando la variable entre `{{ }}`.

```html
<span id="app">Mensaje: {{ msg }}</span>
```

Esto se evaluara y como resultado quedara:

```html
<span id="app">Mensaje: Hola</span>

```
Ademas, si esa variable llega a ser modificada, Vue automáticamente actualizara la aplicación para reflejar ese cambio.

<iframe width="100%" height="300" src="//jsfiddle.net/datyayu/p9e0ozm9/2/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


## Expresiones
Algo importante de esta interpolación es que también puede evaluar expresiones simples. Por ejemplo:

```html
<span>{{ 1 + 1 }}</span>
```
Resultará en :

```html
<span>2</span>
```
Esto es importante porque nos permite usar operadores ternarios como:

```html
<span>{{ esSaludo ? 'hola' : 'adios' }}</span>
```

O incluso ejecutar métodos y mostrar su resultado como:

```html
<span>{{ sumar(1, 1) }}</span>
```

Sin embargo, no recomiendo usar expresiones en tus templates, ya que Vue nos ofrece una mejor forma de hacerlo: computed properties.


## Computed properties
Las computed properties, o propiedades calculadas, son propiedades igual que las que declaramos en `data`, pero su valor no se especifica explícitamente, sino que se calcula en tiempo de ejecución.

Por ejemplo:

```html
<div id="app">
    <input type="text" v-model="mensaje">
    <p> {{ mensaje }} </p>
    <p> {{ mensajeInvertido }} </p>
</div>
```
```js
new Vue({
    el: '#app',
    data: {
        mensaje: 'Hola',
    },
    computed: {
        mensajeInvertido: function() {
            return this.mensaje.split('').reverse().join('');
        }
    }
})
```

En este caso tenemos una propiedad `mensaje`, la cual esta bindeada a un `input`. Como Vue se encarga de actualizar la aplicación para mostrar el valor actual de las propiedades, no es sorpresa que al cambiar el valor del input la parte de
`<p> {{ mensaje }} </p>` muestre el cambio también.

Lo interesante es que `<p> {{ mensajeInvertido }} </p>` también se actualiza al cambiar el input. Esto es debido a la computed property que declaramos.

<iframe width="100%" height="300" src="//jsfiddle.net/datyayu/p9e0ozm9/3/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

La manera en que esto funciona es que tu declaras una función con el valor que debería tener tu propiedad en todo momento. En nuestro caso, queremos mostrar el mensaje invertido así que declaramos esa propiedad dentro de `computed` en nuestra instancia de Vue.

```js
new Vue({
    // ...
    computed: {
        mensajeInvertido: function() {
            return this.mensaje.split('').reverse().join('');
        }
    }
})
```

Vue analiza tu función y detecta de que otras propiedades depende (en este caso, depende de la propiedad `mensaje`) y actualiza el valor de la computed property cada vez que esas propiedades de las que depende cambien, usando la función que declaramos.

Esto quiere decir que cada vez que `mensaje` cambie, Vue automáticamente ejecuta la función asociada a `mensajeInvertido` y le asigna el valor que retorne esa función.

Esto es bueno porque nos permite mantener un template limpio y además Vue es capaz de realizar optimizaciones internas usando las computed properties que de otra manera no sería capaz de hacer. Debido a esto, es recomendable que uses computed properties cuando puedas en lugar de expresiones en los templates.


## Atributos
En el caso de los atributos de html, no podemos usar la interpolación de texto. En su lugar, tenemos `v-bind`, el cual igual mantiene actualizado al atributo que le especifiquemos con el valor mas reciente de la variable.

La manera en que usamos `v-bind` es como `v-bind:atributo="variable"`. Por ejemplo:

```html
<button v-bind:disabled="botonDesabilitado">Boton</button>
```

En este caso, el atributo `disabled` tendrá siempre el valor de la variable `botonDesabilitado`. Por lo que si `botonDesabilitado` tiene un valor de `true`, el boton estará deshabilitado y funcionará sólo cuando `botonDesabilitado` sea igual a `false`.

<iframe width="100%" height="300" src="//jsfiddle.net/datyayu/p9e0ozm9/5/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Como extra, `v-bind` puede ser acortado simplemente como `:`. Así que podemos remplazar `v-bind:disabled="botonDesabilitado"` por `:disabled="botonDesabilitado"` y aun así funcionara igual.

```html
<button :disabled="botonDesabilitado">Boton</button>
```


## Eventos
La manera en que podemos escuchar por eventos en Vue en usando la directiva `v-on`. `v-on` se declara como una directiva con el formato `v-on:[evento]="[cosasAEjecutar]"`, donde el `[evento]` es el nombre del tipo de evento que queremos escuchar.

Por ejemplo:

```html
<div id="app">
    <button v-on:click="sumarUno">+1</button>
    <p> {{ contador }} </p>
</div>
```
```js
new Vue({
    el: '#app',
    data: {
        contador: 1
    },
    methods: {
        sumarUno: function() {
            this.contador++;
        }
    }
})
```

En este caso tenemos una propiedad `contador` y un método `sumarUno` que incrementa el `contador` en 1, el cual ejecutamos cuando se hace click en el botón.

La manera en que especificamos nuestro evento es con `v-on:click="sumarUno"`, lo cual escucha al evento `click` y al suceder ejecuta la función `sumarUno`.

<iframe width="100%" height="300" src="//jsfiddle.net/datyayu/p9e0ozm9/6/embedded/js,html,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

También, igual que con el binding a atributos, vue nos ofrece `@` como manera de acortar `v-on`. Entonces, podemos remplazar `v-on:` por `@` y seguirá funcionando igual.

```html
<div id="app">
    <button @click="sumarUno">+1</button>
    <p> {{ contador }} </p>
</div>
```


## Clases de css dinámicas
Vue nos ofrece diferentes maneras de tratar con los estilos y clases de css, pero la mas sencilla es usar computed properties para definir las clases que queremos que tenga un elemento, de la siguiente manera:

```css
.bloque {
    width: 200px;
    height: 200px;
}
.rojo { background: red; }
.azul { background: blue; }
```
```html
<div id="app">
    <div :class="claseBloque"></div>
    <button @click="cambiarColor">Cambiar color</button>
</div>
```
```js
new Vue({
    el: '#app',
    data: {
        color: 'rojo'
    },
    computed: {
         claseBloque: function() {
             return 'bloque ' + this.color;
         }
    },
    methods: {
        cambiarColor: function() {
            if (this.color === 'rojo') {
                this.color = 'azul';
            } else {
                this.color = 'rojo';
            }
        }
    }
})
```

En este caso, tenemos un método que simplemente cambia la clase que queremos aplicarle al bloque al hacer click en el botón.

```js
cambiarColor: function() {
    if (this.color === 'rojo') {
        this.color = 'azul';
    } else {
        this.color = 'rojo';
    }
}
```

Lo relevante aquí es que tenemos también una computed property la cual simplemente retorna un string con las dos clases que queremos que tenga nuestro elemento (En nuestro caso, `bloque rojo` o `bloque azul`).

```js
computed: {
    claseBloque: function() {
         return 'bloque ' + this.color;
    }
}
```

Esta computed property está ligada al atributo `class` de nuestro elemento, lo que permite que se actualice automáticamente cada vez que cambie.

```html
<div :class="claseBloque"></div>
```


Lo bueno de esta técnica es que nos permite incluir cuantas clases queramos sin complicar nuestro template y al mismo tiempo permite que Vue.js realice optimizaciones para hacer mejor la experiencia de nuestros usuarios.

<iframe width="100%" height="300" src="//jsfiddle.net/datyayu/p9e0ozm9/8/embedded/js,html,css,result/dark/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

---

Con esto ya tenemos el conocimiento base de Vue.js para interactuar con el DOM pero si quieres aprender puedes revisar [el siguiente post en la serie](/blog/posts/vuejs-listas) donde revisamos como trabajar con condicionales y listas para agregar mayor valor a tus aplicaciones.

Como siempre, [los ejemplos de este post están disponible en github](https://github.com/datyayu-xyz/vuejs-dom) para cualquier duda que tengas o mejora que quieras ¡así que no dudes en hacerlo!

---

*Este post es parte de [una serie acerca de VueJS](/blog/tags/vuejs/). Si tienes dudas o hay alguna funcionalidad que aun no haya cubierto, no dudes en avisarme.*
