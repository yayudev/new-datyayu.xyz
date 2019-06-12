[//]: # 'title   - Browser API: Fetch                '
[//]: # 'tags    - javascript, es6, browserApi, ajax '
[//]: # 'id      - 37                                '
[//]: # 'date    - 2017.09.03                        '
[//]: # 'url     - fetch-api                         '
[//]: # 'excerpt - Aprende la manera moderna de hacer ajax de forma nativa en el navegador con Fetch API. '

Uno de los problemas al hacer AJAX por mucho tiempo fue que la unica manera de hacerlo de forma nativa era por medio de XMLHttpRequest que, si lo haz usado directamente, seguro sabras que no es tan fácil ni bonito. Pero estos inconvenientes ya no son necesarios pues hoy en día los navegadores nos ofrecen una opción mucho más sencilla para hacer AJAX de una forma moderna y sencilla: Fetch API.

> Nota: Fetch API depende del uso de promesas, así que te recomiendo que, si nunca las haz usado, aprendas como usarlas primero para que no te confundas al usar fetch. Si ocupas ayuda, puedes revisar [este post que escribí acerca de Promesas](https://datyayu.dev/blog/posts/es6-promesas) para aprender qué son y cómo usarlas.

## ¿Qué es Fetch API?

La Fetch API es un estandar usado por los navegadores para permitirnos realizar peticiones AJAX de manera sencilla.

Fetch API es una respuesta a lo complicado que resultaba hacer AJAX usando `XMLHttpRequest`. El problema era que era muy complejo de utilizar y lo más común se volvió depender de librerías para hacer peticiones AJAX, como en el caso de request o jQuery con `$.getJSON` / `$.ajax`.

La ventaja que tiene fetch con respecto a estas es que es completamente nativa, por lo que obtienes tienes un mejor rendimiento y a la vez haces más ligera tu aplicación al no tener que agregar una librería extra.

## Cómo usar (`GET`)

Lo más común es usar AJAX para pedir datos por medio de GET para actualizar el contenido de una página, así que empezemos por ver como hacer peticiones con fetch usando el método GET.

Fetch tiene 3 pasos.

1. Pide los datos al servidor
2. Procesa los datos
3. Nos entrega el resultado final

En codigo luce algo como asi:

```js
// Pide datos
fetch(url)
  // Procesa los datos
  .then(respuesta => {
    /* ... */
  })
  // Resultado final
  .then(datos => {
    /* ... */
  });
```

Si te das cuenta, fetch trabaja con promesas. Esto es mejor, más moderno y fácil de entender que tener que lidiar con callbacks o eventos para manejar la petición.

En un caso real sería algo así:

```js
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(res => res.json())
  .then(post => console.log(post));
```

Revisemos parte por parte lo que hace.

```js
fetch('https://jsonplaceholder.typicode.com/posts/1');
```

Primero pedimos data de `https://jsonplaceholder.typicode.com/posts/1`. jsonplaceholder es un servicio gratis para hacer pruebas con ajax, así que es una buena fuente para probar fetch.

```js
  .then(res => res.json())
```

Después procesamos la respuesta. Como queremos la respuesta sea procesada como json, retornamos `res.json()`. También hay otros métodos bastante utiles como `res.text()` para procesar como texto plano o `res.arrayBuffer()` para procesar la respuesta como un ArrayBuffer (bastante útil cuando trabajas con audio!).

```js
  .then(post => console.log(post))
```

Ya que procesamos la respuesta, somos libres de hacer con ella lo que querramos. En este caso lo mostramos en la consola.

Si corres esto en tu navegador (puedes hacerlo desde la consola de las devtools), deberias obtener algo como esto:

![Ejemplo de GET](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/037-01-ejemplo-get.jpg)

Esto quiere decir que la petición se realizó de manera exitosa, y fetch funcionó tal y como esperabamos.

Aquí hay un ejemplo un poco más complejo por si quieres tenerlo de referencía para usar fetch para peticiones GET.

<iframe height='265' scrolling='no' title='WEmEWP' src='//codepen.io/datyayu/embed/WEmEWP/?height=265&theme-id=0&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/datyayu/pen/WEmEWP/'>WEmEWP</a> by Arturo Coronel (<a href='https://codepen.io/datyayu'>@datyayu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

## Cómo usar (`POST`)

Ya que sabemos cómo usar fetch para hacer peticiones GET, veamos cómo hacerlo para POST.

Usar fetch para realizar peticiones POST es un poco más elaborado que GET, pero sigue siendo bastante sencillo:

```js
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'hello',
    body: 'world'
  })
};

fetch('https://jsonplaceholder.typicode.com/posts/', options)
  .then(response => response.json())
  .then(post => {
    console.log(post);
  });
```

La parte de usar fetch es la misma que con GET, con la diferencia de que ocupamos obligatoriamente pasarle un objeto de opciones como segundo argumento. Veamos en este caso que hace cada propiedad en nuestras opciones.

```js
  method: 'POST',
```

Esto nos dice que método vamos usar. Por defecto usa GET así que cuando usamos GET no es necesario especificarlo pero para el resto (POST, PUT, DELETE...) si ocupamos especificarlo.

```js
  headers: {
    'Content-Type': 'application/json'
  },
```

Cuando usamos fetch podemos especificar los headers de la petici´øn pasandole un objeto en las opciones con todos los que queremos incluir. Entonces si quisiéramos agregarle otro header, sólo hace falta agregarle otra propiedad a la parte de headers como `'x-mi-header': 'holamundo'`.

```js
body: JSON.stringify({
  title: 'hello',
  body: 'world'
});
```

`body` representa el cuerpo de nuestra petición. En este caso, queremos enviar un objeto `{ title: 'hello', body: 'world' }` en formato json, así que lo pasamos por `JSON.stringify` para transformarlo a su equivalente en json.

```js
fetch(url, options)
  .then(response => response.json())
  .then(post => {
    console.log(post);
  });
```

El resto es lo mismo que con GET; pedimos la información, lo procesamos y después lo mostramos en consola. Si todo salió bien deberías ver algo así en tu consola:

![Ejemplo de POST](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/037-02-ejemplo-post.jpg)

La respuesta es casi lo mismo que enviamos, con la diferencia de que regresó con una propiedad extra (`id`), la cual es creada por jsonplaceholder. Si tu respuesta incluye esa propiedad, entonces quiere decir que tu petición fue exitosa.

Aquí hay un ejemplo más elaborado:

<iframe height='265' scrolling='no' title='XaGVGb' src='//codepen.io/datyayu/embed/XaGVGb/?height=265&theme-id=0&default-tab=js,result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/datyayu/pen/XaGVGb/'>XaGVGb</a> by Arturo Coronel (<a href='https://codepen.io/datyayu'>@datyayu</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>

---

El resto de los métodos (PUT, PATCH, DELETE) son básicamente lo mismo que con POST, con la unica diferencia de que hay que cambiar la propiedad `method` en las opciones al método que querramos usar.

## Errores

Ya sabemos como usar fetch para pedir y enviar datos, y actuar una vez que la petición se haya cumplido. Ahora el problema es: ¿qué hacemos cuando no se cumple la petición?

La respuesta es: atrapar el error.

Debido a que lo que fetch retorna es una promesa normal, para atrapar errores sólo hace falta usar `.catch`. Por ejemplo:

```js
fetch(url, options)
  .then(response => response.json())
  .then(post => {
    console.log(post);
  })
  .catch(error => {
    console.log(error);
  });
```

Esto nos permitira tratar con casos, por ejemplo, como cuando el servidor no responda o el usuario no tenga conexión.

Sin embargo, en todos los casos donde el servidor responda, aún si NO es con un status 200 o similar **NO son atrapados por catch**. Esto puede pasar cuando el servidor regrese un 404 o un 500, que aunque no nos regresan algo útil, técnicamente la petición se realizó completamente y el servidor sí mandó una respuesta, así que no hay necesidad de disparar un error pues puede que ese sea el comportamiento deseado.

Para tratar estos casos ocupamos revisar el status de la respuesta. Por ejemplo:

```js
fetch('https://jsonplaceholder.typicode.com/posts/9999999999')
  .then(res => {
    if (res.status === 404) {
      return new Promise.resolve({
        title: 'Error',
        body: 'El post que solicitó no existe'
      });
    }

    return res.json();
  })
  .then(post => {
    $title.innerText = post.title;
    $body.innerText = post.body;
  })
  .catch(error => {
    $title.innerText = 'ERROR';
    $body.innerText = 'Algo salio mal.';
  });
```

En este caso despues de realizar la petición procesamos la respuesta viendo primero que status tuvo (usando `res.status`) y si la respuesta fue un 404, renderizamos un mensaje de error; de lo contrario procesamos la respuesta normalmente.

Hay que tener cuidado con esto pues si no tratamos esos casos puede que el servido nos esté retornando algo incorrecto y no nos demos cuenta ya que fetch no te lo va a mostrar como error.

# Compatibilidad

Fetch API ya lleva bastante tiempo siendo soportada en los navegadores modernos. Pero siendo más especifico, puedes usar fetch a partir de:

- Edge 14+
- Firefox 39+
- Safari 10.1+
- Chrome 42+

Pero si ocupas soportar versiones más viejas o IE, puedes usarlo por medio de polyfill.io:

```html
<script src="https://cdn.polyfill.io/v2/polyfill.js?features=fetch"></script>
```

O si ocupas usar fetch en el servidor (incluido para server-side rendering) te recomiendo usar [isomorphic-fetch](https://github.com/matthew-andrews/isomorphic-fetch).

---

Como siempre, [los ejemplos de este post están disponible en github](https://github.com/datyayu-xyz/fetch-api) para cualquier duda que tengas o mejora que quieras agregar, ¡así que no dudes en hacerlo!
