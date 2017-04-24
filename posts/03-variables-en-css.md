[//]: # (title   - Variables en CSS               )
[//]: # (tags    - javascript, html5, css, design )
[//]: # (id      - 03                             )
[//]: # (date    - 2016.02.17                     )
[//]: # (url     - variables-en-css               )
[//]: # (excerpt - ¿Sabias que ahora puedes usar variables en css y modificarlas dinamicamente? Así es, CSS variables es un nuevo estandar que te permitirá darle mayor consistencia y flexibilidad a tus estilos de manera nativa. )


Con el próximo lanzamiento nueva versión de Chrome (Chrome 49), ha empezado a hacerse notar el tema de las variables en css. Este nuevo estándar, que ya tenía tiempo en Firefox y ahora esta siendo implementado en Chrome, ayuda a evitar repeticiones y poder crear css mucho más dinámico de manera nativa.

<a name="preprocesadores"></a>
## Preprocesadores

Desde hace tiempo existen herramientas de desarrollo como [Sass](http://sass-lang.com/) o [Less](http://lesscss.org/) que nos permiten reutilizar código y usar variables para establecer ciertos valores como colores o tamaños de fuente. Esto es bastante cool pero existe algo que estos preprocesadores no son capaces de lograr y eso es la habilidad para cambiar su valor durante la ejecución del programa.

Si bien podemos cambiar las clases de un elemento para darle otro estilo, esto es bastante complicado, por ejemplo, para modificar todo el tema de la página ya que para poder lograrlo tienes que cambiar bastantes elementos y saber de antemano exactamente que elementos son los que tienes que cambiar.

Esto es diferente con las nuevas variables de CSS, ya que solamente ocupas saber que es lo que quieres cambiar y con una sola función puedes realizar un cambio a los estilos de tu página.
¿No es genial?

---

<a name="sintaxis"></a>
## Sintaxis
La sintaxis de variables en css es bastante sencilla. Para declarar el valor de una variable lo hacemos de la siguiente manera.
```css
--mi-color: #06c;
```

Mientras que para acceder al valor de la variable hay que utilizar la función var().

```css
background-color: var(--mi-color);
```

También podemos utilizar fallbacks en caso de que por alguna razón no se haya declarado la variable que usamos.

```css
background-color: var(--mi-color, 'red');
```

En este caso, `'red'` es el valor por defecto que se usará si `--mi-color` no tiene un valor asignado.

---

<a name="scopes-mq"></a>
## Scopes y media queries.
Una buena practica es mantener las variables en el nivel de raíz de nuestro css, de esta forma:

```css
:root {
  --mi-color: #0c0c0c;
}
```

Aunque es totalmente posible declarar o sobreescribir los valores en cualquier parte o elemento, por ejemplo:

```css
div {
  --mi-color: #d3d3d3;
}
```

Algo bastante cool es que podemos utilizar diferentes valores dependiendo del media query, por ejemplo:

```css
:root {
  --mi-margen: 4px;
}

section {
  margin: var(--mi-margen);
}

@media (min-width: 600px) {
  :root {
    --mi-margen: 16px;
  }
}
```

Y de esta forma, el valor del `margin` en el `section` se actualizará automáticamente cuando cambiemos el tamaño de la página.

---

<a name="uso-con-js"></a>
## Usando las variables con Javascript
Si todo esto no fuera lo suficientemente genial, ahora podemos modificar todo el tema de la página usando sólo un par de líneas de JS.

Primero, si queremos obtener el valor de una de nuestras variables de css, podemos usar algo como

```js
var styles = getComputedStyle(document.documentElement);
var miColor = String(styles.getPropertyValue('--color-primario')).trim();
```

Y para cambiar el valor tenemos

```js
var styles = document.documentElement.style;
styles.setProperty('--color-primario', 'red');
```

Esto se me hace bastante útil para tener algo como `--color-primario`, `--color-secundario`, `--text-color`, etc. que simbolicen los colores del tema del sitio y usar estos métodos para personalizar la página dinámicamente de acuerdo a las preferencias del usuario. Un ejemplo de esto en el siguiente pen (al momento de escribir este post, febrero del 2016, sólo funciona en firefox y chrome canary).

<p data-height="268" data-theme-id="0" data-slug-hash="mVgWxb" data-default-tab="result" data-user="datyayu" class='codepen'>See the Pen <a href='http://codepen.io/datyayu/pen/mVgWxb/'>CSS Variables theme demo</a> by Arturo Coronel (<a href='http://codepen.io/datyayu'>@datyayu</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

---

<a name="compatibilidad"></a>
## Compatibilidad

Lamentablemente, no todo es felicidad con las variables de css, y lo malo es la compatibilidad actual. Por ahora (a 17 de febrero del 2016) sólo Firefox tiene soporte para esta funcionalidad, pero a finales de éste mes Chrome 49 incluirá ya css variables y dentro de poco también Safari. Tristemente, en [Microsoft Edge apenas está bajo consideración.](https://dev.windows.com/en-us/microsoft-edge/platform/status/cssvariables)
