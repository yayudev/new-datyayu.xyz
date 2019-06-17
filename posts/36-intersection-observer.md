[//]: # (title   - Browser API: IntersectionObserver  )
[//]: # (tags    - javascript, es6, browserApi        )
[//]: # (id      - 36                                 )
[//]: # (date    - 2017.08.27                         )
[//]: # (url     - intersection-observer              )
[//]: # (excerpt - Dejate de hacks y métodos extraños para detectar si tus usuarios hicieron scroll hasta cierto contenido de tu pagina. Ahora es fácil con IntersectionObserver. )

En la web moderna hay varios tipos de interacciones, como el infinite scroll, lazy loading o la carga de anuncios; que requieren saber si el usuario llegó a cierta parte de la página. Para detectar esto actualmente la solución más común es una combinación de escuchar por eventos de scroll y resize y usar APIs como `getBoundingClientRect()` para conocer la posición exacta de un elemento con respecto al viewport o la pantalla del usuario. El problema es que esto no sólo es ineficiente sino que no es exacto, pues cosas como las imagenes, que al cargar pueden pasar de tener 0 height a cubrir toda la pantalla y desplazar el resto del contenido, hacen muy impreciso saber la posición de un elemento sin tener que calcularla constantemente.

Pues ahora existe una manera más sencilla de hacerlo de forma precisa y al más tiempo con un rendimiento nativo: `IntersectionObserver`.

## Intersection Observer

Intersection Observer (IO) es una API de los navegadores modernos que nos ofrece una manera bastante sencilla de detectar cuando un elemento se encuentra o no visible para el usuario y reaccionar ante ello.

Básicamente, mientras hacemos scroll por la pagina, IntersectionObserver nos avisa cuando cierto porcentaje de un objeto o elemento se encuentra visible para el usuario y en base a ello podemos realizar alguna tarea en especifico.

## Uso

Para ver su uso, reproduciremos un caso donde tenemos varios divs y queremos resaltar solo los elementos en base a que tanto porcentaje de ellos es visible para el usuario (color verde si están 100% visibles, amarillo si están >50% visibles o rojo de lo contrario).

Pues empezemos:

```html
<!-- Index.html -->
<style>
  div {
    align-items: center;
    background: blue;
    color: white;
    display: flex;
    font-size: 3em;
    height: 150px;
    justify-content: center;
    margin: .5em 0;
    text-align: center;
    width: 100%;
  }
</style>

<!--...-->

<div>1</div>
<div>2</div>
<div>3</div>
<div>4</div>
<div>5</div>
<div>6</div>

<!--...-->
```

Para crear un `IntersectionObserver` que se encargue de observar a los elementos, primero definimos su configuración.

```js
const ioConfig = {
  threshold: [0, 0.5, 0.999]
};
```

Queremos saber cuando el elemento esté completamente (100%) dentro de la pantalla, cuando este parcialmente pero mayor al 50% y cuando no lo esté; asi que en la config le pasamos los valores correspondientes a esos porcentajes donde queremos que nos notifique: `[0, .5, .999]`. La razón por la que usamos `.999` en lugar de `1` es porque en mi experiencia el `1` suele ser inexacto a la hora de disparar el evento (no siempre el ratio que regresa es 1, en algunos casos extraños está en el rango de .99 a 1).

Ya que tenemos la configuración toca definir la función que se ejecutará cuando los valores de intersección que especificamos se cumplan.

Debido a que un mismo IO se puede usar para observar multiples elementos, la función de callback que ejecuta IO te da como parámetro un array de eventos, uno por cada elemento que esté observando.

```js
function ioHandler(elementos) {
  for (let elemento of elementos) {
    //...
  }
}
```

Entonces, lo primero que hacemos es iterar por cada elemento en el array que recibimos usando un ciclo `for...of`, así podremos evaluar cada elemento que esté registrado.

```js
function ioHandler(elementos) {
  for (let elemento of elementos) {
    if (elemento.intersectionRatio >= 0.99) {
      elemento.target.style.background = 'green';
    } else if (elemento.intersectionRatio > 0.5) {
      elemento.target.style.background = 'yellow';
    } else {
      elemento.target.style.background = 'red';
    }
  }
}
```

Lo siguiente es bastante sencillo, simplemente checamos si el elemento está 100% dentro del viewport (`elemento.intersectionRatio >= .99`) y si es así lo ponemos verde. Si no está completamente dentro, revisamos si tiene un porcentaje de interseccion mayor al 50% (`elemento.intersectionRatio > 0.5`) y si lo es entonces le ponemos el fondo amarillo, de lo contrario lo ponemos rojo. De esta manera podremos notar de forma muy visual el funcionamiento de IO.

Ya que tenemos definida la configuración y el handler para el IO, entonces lo que sigue es instanciarlo.

```js
const io = new IntersectionObserver(ioHandler, ioConfig);
```

Y por ultimo, solo hay que registrar los elementos a observar usando `io.observe()`.

```js
const blocks = document.getElementsByTagName('div');

for (let block of blocks) {
  io.observe(block);
}

/* Nota:
En navegadores viejos que no soporten NodeList como iterable
puedes usar lo siguiente en vez de un ciclo for..of.

[].forEach.call(blocks, block => {
  io.observe(block)
})

*/
```

En nuestro caso queremos observar todos los divs en nuestra pagina así que registramos uno por uno después de obtenerlos con `document.getElementsByTagName`.

Y listo, si corres el ejemplo puedes ver como a medida que haces scroll los bloques cambian de color en base a que tanto porcentaje de ellos este dentro de la pantalla.

<iframe height='265' scrolling='no' title='IntersectionObserver' src='//codepen.io/datyayu/embed/brxPZy/?height=265&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/datyayu/pen/brxPZy/'>IntersectionObserver</a> by Arturo Coronel (<a href='https://codepen.io/datyayu'>@datyayu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Usos

Obviamente, este tipo de APIs puede tener un infinito número de usos pero aquí te dejo un cuantos usos populares para que te des una idea de cómo puedes usarlo en tus projectos:

### Lazy-loading de imágenes

Carga images cuando las ocupes mostrar.

<iframe height='265' scrolling='no' title='IntersectionObserver - Lazy loading images' src='//codepen.io/datyayu/embed/PKyYxK/?height=265&theme-id=dark&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/datyayu/pen/PKyYxK/'>IntersectionObserver - Lazy loading images</a> by Arturo Coronel (<a href='https://codepen.io/datyayu'>@datyayu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Infinite scroll

Carga más contenido mientras el usuario siga scrolleando. (Te recomiendo abrirlo en otra página para poder apreciar bien el efecto, puedes hacerlo <a href="https://codepen.io/datyayu/full/zdmOaQ/" target="_blank" rel="noopener"> haciendo click aqui</a>).

<iframe height='265' scrolling='no' title='IntersectionObserver - Infinite scroll' src='//codepen.io/datyayu/embed/zdmOaQ/?height=265&theme-id=dark&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/datyayu/pen/zdmOaQ/'>IntersectionObserver - Infinite scroll</a> by Arturo Coronel (<a href='https://codepen.io/datyayu'>@datyayu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Animaciones

Dispara animaciones conforme el usuario hace scroll en tu página.

<iframe height='400' scrolling='no' title='IntersectionObserver - animations' src='//codepen.io/datyayu/embed/xLyKmx/?height=265&theme-id=dark&default-tab=css,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/datyayu/pen/xLyKmx/'>IntersectionObserver - animations</a> by Arturo Coronel (<a href='https://codepen.io/datyayu'>@datyayu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Soporte para navegadores

Por último queda hablar de la parte díficil y es el soporte de navegadores.

Al momento de escribir este post (27.08.2017), IntersectionObserver es soportado de manera nativa en Edge 15+, Firefox 55+, Chrome 58+ y Opera 46+.

Para el resto de los navegadores, puedes usarlo incluyendo un polyfill disponible en [https://github.com/w3c/IntersectionObserver/tree/gh-pages/polyfill](https://github.com/w3c/IntersectionObserver/tree/gh-pages/polyfill) o via [polyfill.io](https://polyfill.io) incluyendo en tu página:

```html
<script src="https://polyfill.io/v2/polyfill.min.js?features=IntersectionObserver"></script>
```

---

Como siempre, [los ejemplos de este post están disponible en github](https://github.com/datyayu-xyz/intersection-observer) para cualquier duda que tengas o mejora que quieras agregar, ¡así que no dudes en hacerlo!

<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>
