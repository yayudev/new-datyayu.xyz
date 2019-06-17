[//]: # (title   - Animacion de trazo en SVG                      )
[//]: # (tags    - javascript, animaciones, css, rendimiento, svg )
[//]: # (id      - 34                                             )
[//]: # (date    - 2017.06.08                                     )
[//]: # (url     - svg-trazos                                     )
[//]: # (excerpt - Aprende a recrear una animación de trazado usando SVGs y CSS. )

CSS nos permite hacer cosas increibles pero hay ocasiones en las que por más que lo intentemos no hay una manera de replicar cierto tipo de efectos usando sólo CSS o simplemente es demasiado trabajo hacerlo. Para mucho de esos casos, lo mejor es usar svg. En este caso, veremos como replicar el efecto de que estamos dibujando un trazo usando un SVG.

### Paths en SVG

En SVG, los caminos que se dibujan son definidos usando la etiqueta `path`.

```html
<path
  fill="#fffff"
  d=" M250, 500 C388.071187,
      500 500, 388.071187 500, 250 C500,
      111.928813 388.071187, 2.84217094e-14 250,
      2.84217094e-14 C111.928813,
      2.84217094e-14 2.84217094e-14,
      111.928813 2.84217094e-14, 250 C2.84217094e-14,
      388.071187 111.928813, 500 250, 500 Z"
>
</path>
```

El atributo `d` de especifica la forma del trazo y `fill` nos dice de que color será el trazo. Si bien cambiar el `fill` no es problema pues usa un formato estandar para colores, `d` es más complicado y por lo general su contenido es auto-generado por Illustrator, Inkscape, Sketch o cualquier otra herramienta que uses para crear el SVG.

### `dasharray` y `dashoffset`

Para generar el efecto que queremos, usaremos dos propiedades de path: `stroke-dasharray` y `dashoffset`.

`stroke-dasharray` nos dice si el trazo debe ser discontinuo, y que tanto espacio debe haber entre cada parte del trazo.

`stroke-dashoffset` especifica que tanto se debe desplazar el inicio del patron que creamos con `stroke-dashoarray`.

Puedes probar ambas propiedades aqui:

<iframe height='570' scrolling='no' title='SVG Line Drawing' src='//codepen.io/datyayu/embed/WOeOqx/?height=570&theme-id=dark&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/datyayu/pen/WOeOqx/'>SVG Line Drawing</a> by Arturo Coronel (<a href='https://codepen.io/datyayu'>@datyayu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Ahora que viste como funciona intenta poner ambos sliders al máximo, y disminiye gradualmente el `dashoffset`. Si realizas esto deberias obtener un efecto como este:

<iframe height='384' scrolling='no' title='SVG Line Drawing animation' src='//codepen.io/datyayu/embed/yXeYbq/?height=384&theme-id=dark&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/datyayu/pen/yXeYbq/'>SVG Line Drawing animation</a> by Arturo Coronel (<a href='https://codepen.io/datyayu'>@datyayu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

Y con sólo esas dos propiedades tenemos el efecto deseado.

Ahora que sabes como crear ese efecto de trazado, veamos un par de ejemplos de cómo puedes aplicarlo.

### Animaciones ciclicas

Usando css podemos utilizar `@keyframes` para crear una animación que se repita infinitamente. Por ejemplo, aquí tenemos un SVG con un trazo con circulos.

<svg width="250px" height="250px" viewBox="0 0 250 250" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
    <g id="Artboard-1" stroke="#5c5ffd" stroke-width="2">
      <g id="Group" transform="translate(24.000000, 24.000000)">
        <path id="path" d="M101.5,203 C157.556902,203 203,157.556902 203,101.5 C203,45.4430979 157.556902,0 101.5,0 C45.4430979,0 0,45.4430979 0,101.5 C0,157.556902 45.4430979,203 101.5,203 Z M101,178 C143.525926,178 178,143.525926 178,101 C178,58.4740743 143.525926,24 101,24 C58.4740743,24 24,58.4740743 24,101 C24,143.525926 58.4740743,178 101,178 Z M100.5,145 C124.524387,145 144,125.524387 144,101.5 C144,77.4756134 124.524387,58 100.5,58 C76.4756134,58 57,77.4756134 57,101.5 C57,125.524387 76.4756134,145 100.5,145 Z"></path>
      </g>
    </g>
  </g>
</svg>

Usando `stroke-dasharray` y `stroke-dashoffset` podemos crear un efecto de carga.

```css
svg path {
  stroke-dasharray: 493 493;
  animation: 1500ms loading-animation linear infinite;
}

@keyframes loading-animation {
  from {
    stroke-dashoffset: 0;
  }
  to {
    stroke-dashoffset: 1000;
  }
}
```

Simplemente ponemos `dasharray` a un numero que genere suficiente espacio entre trazos (como `493`) y le decimos a css que anime el `offset` desde 0 hasta 1000. Con esto, podemos generar un efecto de carga:

<iframe height='325' scrolling='no' title='Loading svg draw' src='//codepen.io/datyayu/embed/jwNaBE/?height=265&theme-id=dark&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/datyayu/pen/jwNaBE/'>Loading svg draw</a> by Arturo Coronel (<a href='https://codepen.io/datyayu'>@datyayu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

### Animaciones en eventos.

Por supuesto, la mayoría de las animaciones en una aplicación no son ciclicas, sino que se ejecutan sólo como respuesta a una interacción del usuario. Por ejemplo, mostrar una confirmación:

<svg width="200px" height="200px" viewBox="0 0 500 500" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="container">
  <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
    <path d="M250,500 C388.071187,500 500,388.071187 500,250 C500,111.928813 388.071187,2.84217094e-14 250,2.84217094e-14 C111.928813,2.84217094e-14 2.84217094e-14,111.928813 2.84217094e-14,250 C2.84217094e-14,388.071187 111.928813,500 250,500 Z" fill="#B2F48C"></path>
    <path d="M115,250 C115,250 142.971917,284.964896 177.470284,328.087856 L215,375 L385,150" id="check" stroke="#FFFFFF" stroke-width="25"></path>
  </g>
</svg>

La manera en que animamos esto es con javascript:

```js
var path = document.getElementById('check');
var button = document.getElementById('button');

button.addEventListener('click', function() {
  // Reset
  path.style.transition = 'none';
  path.style.transitionDelay = '0';
  path.style.strokeDashoffset = 500;

  // Reflow
  path.getBoundingClientRect();

  // Animación
  path.style.transition = 'stroke-dashoffset 300ms cubic-bezier(0.07,-0.01, 1, 0.07)';
  path.style.transitionDelay = '300ms';
  path.style.strokeDashoffset = 0;
});
```

Lo que hacemos en esta interacción es escuchar el boton y cuando el usuario haga click ejecutamos la animación.

La manera en que animamos esto es mediante 3 pasos:

1. Reseteamos la animación, para asegurarnos de que la secuencia sea animada completamente.

```js
path.style.transition = 'none';
path.style.transitionDelay = '0';
path.style.strokeDashoffset = 500;
```

2. Forzamos al navegador a que haga un "reflow", es decir, realice el calculo del "layout" y aplique los estilos que especificamos antes. En este caso, nos aprovechamos de que el metodo `getBoundingClientRect()` forza esto, así que lo ejecutamos para que el navegador aplique los cambios.

```js
path.getBoundingClientRect();
```

3. Agregamos la animación.

```js
path.style.transition = 'stroke-dashoffset 300ms cubic-bezier(0.07,-0.01, 1, 0.07)';
path.style.transitionDelay = '300ms';
path.style.strokeDashoffset = 0;
```

Aquí podemos ver la animación en acción.

<iframe height='394' scrolling='no' title='Animate SVG Line Draw with js' src='//codepen.io/datyayu/embed/dRbmEQ/?height=394&theme-id=dark&default-tab=html,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/datyayu/pen/dRbmEQ/'>Animate SVG Line Draw with js</a> by Arturo Coronel (<a href='https://codepen.io/datyayu'>@datyayu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

> NOTA: Cabe aclar que sólo ocupamos realizar el reflow porque queremos realizar un reinicio antes de ejecutar la animación. Si no realizaramos el reflow antes de la animación, la parte de la animación sobreescribiria los valores iniciales y nunca se reiniciría de la animación. Aqui un ejemplo de esto (intenta presionar el boton más de una vez):

> <iframe height='394' scrolling='no' title='Animate SVG Line Draw with js (invalid reset)' src='//codepen.io/datyayu/embed/NgxrLY/?height=265&theme-id=dark&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/datyayu/pen/NgxrLY/'>Animate SVG Line Draw with js (invalid reset)</a> by Arturo Coronel (<a href='https://codepen.io/datyayu'>@datyayu</a>) on <a href='https://codepen.io'>CodePen</a>.

</iframe>

---

Y eso es todo! Ahora puedes animar SVGs ya sea con JS o con sólo CSS y crear animaciones geniales de manera nativa y sin tantos problemas.

Como siempre, [los ejemplos de este post están disponible en github](https://github.com/datyayu-xyz/svg-trazos) para cualquier duda que tengas o mejora que quieras agregar, ¡así que no dudes en hacerlo!
