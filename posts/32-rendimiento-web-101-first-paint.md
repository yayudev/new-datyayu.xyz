[//]: # (title   - Rendimiento web 101: First paint             )
[//]: # (tags    - javascript, rendimiento, browsers, html, css )
[//]: # (id      - 99                                           )
[//]: # (date    - 2017.04.05                                   )
[//]: # (url     - rendimiento-web-101-first-paint              )
[//]: # (excerpt - Aprende como optimizar los tiempos de carga de tus sitios web y mejora la experiencia de tus usuarios dandoles una impresion más fluida y accessible. )


En el mundo web actual, donde [los móviles se han vuelto más populares que los desktops](http://gs.statcounter.com/press/android-overtakes-windows-for-first-time) y la mayoría de los usuarios esperan una experiencia fluida y casi nativa de las aplicaciones web, aun cuando la mayoría cuenta con dispositivos de gama-baja, el rendimiento de los sitios se ha vuelto cada vez más importante e imprescindible para garantizar una experiencia buena a nuestros usuarios. Aun asi, una gran parte de los desarrolladores web ignoran este tema y con las buenas practicas cambiando constantemente, se vuelve complicado en ocasiones saber que podemos hacer para mejorar en ese aspecto. Por eso, en esta serie de posts acerca de rendimiento quiero enfocarme en temas importantes y soluciones actuales que pueden ayudarte a que tus usuarios tengan una experiencia optima y accesible al usar tu sitio.

*El repo con los ejemplos este post está disponible en [github](https://github.com/datyayu-xyz/rendimiento-101-first-paint) para cualquier duda que tengas o mejora que quieras agregar, así que no dudes en hacerlo!*


## Carga progresiva
Actualmente, hacer esperar a un usuario es perder a ese usuario. Nuestros usuarios necesitan recibir algún tipo de información rápidamente o se aburrirán y dejaran el sitio. [Un estudio de Google del año pasado](https://www.doubleclickbygoogle.com/articles/mobile-speed-matters/) reveló que **el 53% de los usuarios abandonan sitios que tardan más de 3 segundos en cargar**. Yep, sólo toma 3 segundos para que perdamos a un posible cliente o usuario. Así de impacientes nos hemos vuelto al consumir contenido.

Una de las estrategias más populares para atacar este problema es la carga progresiva.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/032-1-carga-normal-vs-progresiva.png)

En la la parte de arriba tenemos la manera "tradicional" de cargar sitios. Básicamente el navegador descarga todos los archivos que necesita y, ya que los tiene todos, renderiza toda la página de golpe.

El segundo ejemplo es la manera "progresiva" de cargar sitios o aplicaciones. En este caso, el navegador solamente obtiene una parte del contenido del sitio, lo muestra y conforme va obteniendo el resto, lo va renderizando.

La diferencia entre estas dos formas de cargar es la percepción del usuario. Ciertamente puede que ambas versiones tomen el mismo tiempo antes de estar "completas", pero **el hecho de que el usuario obtenga información desde mucho antes, ayuda a disminuir la percepción de tiempo del usuario y con ello su frustración**, por lo que es más susceptible a esperar a que termine de cargar la página si continuamente ve que hay algún tipo de progreso.

Hay distintos factores que se involucran en la carga progresiva de un sitio, pero en este post nos enfocaremos en el que probablemente tiene el mayor impacto: **el first paint**.


## First paint
El first paint, o primera pintada, es la primera vez que se muestra contenido en la pantalla cuando se está cargando una página. Este es muy importante ya que mantiene el enfoque del usuario en el sitio cuando lo visita. Si tu first paint toma mucho tiempo el usuario solamente verá una pantalla vacía, lo que puede producir cierta frustración y termine por alejar al usuario de tu sitio. Es por esto que siempre **debes procurar que tu first paint tome tan poco tiempo como sea posible.**


## ¿Por qué es lento?
Aquí hay un ejemplo sencillo del formato de una página tipica:

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <title>Test</title>

  <link rel="stylesheet" href="./estilos.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
</head>
<body>

  <script src="./app.js"></script>
</body>
</html>
```

 Si revisamos esto con las devtools de chrome puedes ver el tiempo que toma el navegador antes de realizar el first paint.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/032-2-first-paint-timeline-normal.jpg)

Si revisas, solamente cargamos 4 archivos: el html, el css, javascript y una imagen. Sin embargo, el navegador espera hasta que tenga tanto el javascript como el css antes de comenzar a renderizar la página. Esto es bastante malo ya que si tenemos archivos de css y js pesados, significa que el navegador va a tardar más en empezar a renderizar el sitio.

Es debido a este comportamiento que se dice que **css y js bloquean el renderizado**. Pero ahora que sabemos cuál es el problema y el por qué sucede, podemos ver como solucionarlo.


## Cómo desbloquear css
La mejor manera de desbloquear css es siguiendo dos reglas:

- **Incrustar el css crítico en el html.**
- **Inyectar el resto de manera dinámica.**

La manera en que esto funciona es que separas los estilos más importantes o "críticos" de tu aplicación y los pones directamente en la cabecera del html:
```html
<head>
    ...
    <style>
        body {
            background-color: gray;
        }

        .header {
            color: white;
            background-color: red;
            height: 5em;
            width: 100vw;
        }
    </style>
</head>
```

De esta manera, cuando el navegador descargue el archivo de html tendrá acceso directo al css más importante sin tener que esperar a que otras peticiones se realicen. Por lo que al mostrar el contenido inicialmente puede hacerlo ya con estilos pero sin tardar más de lo necesario.

¿Pero qué pasa con el resto del css, la parte que no es "crítica"? Bueno, la mejor manera de tratar con esto es inyectarlo dinámicamente usando javascript. Hay muchas maneras de hacer esto pero aquí hay un ejemplo:

```html
<script>
    function loadCSS(url, targetChild, mediaType){
        var linkElement = window.document.createElement("link");
        var targetElement = targetChild || window.document.getElementsByTagName("script")[0];

        linkElement.rel = "stylesheet";
        linkElement.href = url;
        linkElement.media = "only x";

        targetElement.parentNode.insertBefore(linkElement, targetElement);

        setTimeout(function(){ linkElement.media = mediaType || "all" })
    }

    loadCSS('estilos/estilos-no-criticos.css');
</script>
```

Básicamente lo que sucede aquí es que creamos un elemento `link` y le agregamos los atributos `rel`, `href` y `media`; dando como resultado:

```html
<link rel="stylesheet" href="TU_URL" media="only x">
```

y lo montamos en el DOM.

El truco aquí es que, al renderizar, el navegador ignora los estilos que tengan `media` con un valor que no aplique a la situación actual. Aprovechando esto, usamos `media="only x"`, sabiendo que `only x` no es un valor correcto de `media`, por lo que va a ser ignorado y no va a bloquear el renderizado. Pero inmediatamente (usando `setTimeout`) ponemos ese valor de manera asíncrona a `all`, lo cual va a hacer que lo tome en cuenta para posteriores repintadas pero no bloqueamos la inicial, lo cual es excelente ya que ahora no tenemos que esperar a que descargue el css no-crítico para mostrarle algo al usuario.

Por supuesto, esta es la manera manual de aplicar estas técnicas pero existen herramientas como [critical](https://github.com/addyosmani/critical) y [grunt-critical](https://github.com/bezoerb/grunt-critical) que pueden hacer estas tareas automáticamente como parte de tu proceso de build.


## Cómo desbloquear javascript

El problema al cargar javascript es que tambien bloquea el parseo de html hasta que termina de descargar y ejecutar el javascript, de la siguiente manera:

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/032-4-script-normal.png)

Por suerte, desbloquear javascript es super sencillo y no hace falta hacer más que agregar un atributo a tu etiqueta de script. Sin embargo, existen dos métodos, cada uno con sus ventajas y desventajas:

### Async
El primer método es agregarle async a tu etiqueta de script:

```html
<script src="./mi-script-1.js" async></script>
<script src="./mi-script-2.js" async></script>
```

Lo que sucede es que el navegador realiza peticiones por los scripts pero continua sin bloquear al documento y ejecuta los scripts en cuanto terminan de descargarse.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/032-5-script-async.png)

Esto es bueno ya que podemos ejecutar los scripts inmediatamente bloqueando lo menos posible el renderizado inicial de la página. Sin embargo, esto tiene un problema y es que debido a que ejecuta los scripts inmediatamente después de terminar de descargarlos, pudieran ser ejecutados en un orden diferente al que están especificados en el documento de html. Es decir, `mi-script-2.js` puede que se ejecute antes que `mi-script-1.js`. Esto es particularmente malo si un script depende de otro (por ejemplo, tu código puede depender de jQuery haya sido cargado antes).

Por el problema anterior, solamente es recomendado usar este método para scripts que son totalmente independientes de otros. Un ejemplo claro de esta situación es el script Google Analytics, ya que es totalmente auto-contenido y no lo usamos en nuestra aplicación.

# Defer

Para los casos en los que dependemos de otros scripts tenemos `defer`.
```html
<script src="./mi-script-1.js" defer></script>
<script src="./mi-script-2.js" defer></script>
```

`defer` funciona similar a sync, en el sentido que realiza peticiones paralelas y no bloquea el renderizado del navegador, la diferencia es que `defer` espera a que se termine de ejecutar el parseo y después ejecuta los scripts en el orden que están especificados en el documento.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/032-6-script-defer.png)

Este método es por lo general más practico y garantiza el hecho de que jamas bloqueara el parser de html, a diferencia de `async`. Por lo que por lo general es mejor utilizar este método ya que es más seguro.

---

# Comparacion contra normal

Una vez aplicados los pasos anteriores, podemos ver como un sitio pasa de
tardar casi 2 segundos para hacer el first paint:

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/032-2-first-paint-timeline-normal.jpg)

A menos de 650ms:

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/032-3-first-paint-timeline-optimizada.jpg).

Cabe aclarar que este test fue hecho restringuiendo la velocidad del navegador a 2G/regular para ver de forma más clara el efecto, pero toma en cuenta que este es un ejemplo muy simple y estas metodologías puede impactar aun más en un sitio real. Si quieres revisarlo por tu cuenta, ambas versiones están disponibles en [github]((https://github.com/datyayu-xyz/rendimiento-101-first-paint)).


# Single Page Applications y Server-Side rendering.
Cabe aclarar que los consejos anteriores sólo aplican cuando el contenido es renderizado desde el servidor. Si tu página, utiliza algún un framework como AngularJS o una librería como React para todo su contenido, el navegador aún tiene que esperar a que ejecute tus scripts ya que ellos son los que crean y montan ese contenido dinámicamente en el DOM. Apesar de todas las ventajas que este tipo de sistemas nos brindan, también pueden terminar siendo inclusive peor para nuestra experiencia inicial ya que el navegador no sólo tiene que esperar hasta que termine de descargar y parsear el contenido antes de comenzar a renderizarlo, sino que también tiene que ejecutar el javascript antes de que el usuario pueda ver algo en la pantalla.

Para estos casos, lo mejor es utilizar Server-side rendering (renderizado en el servidor), que básicamente lo que hace es pre-renderizar el contenido que va a generarse por javascript desde el servidor y nos envía un html con ese contenido ya inyectado. No quiero entrar en detalles en este tema, ya que cada framework o librería tiene una manera distinta de hacerlo, pero si quieres optimizar el first paint de tu single-page application lo más seguro es que este sea uno de los puntos más importantes a tener en cuenta.

---

Resumiendo:
- Coloca tu css critico directo en el html.
- Carga el resto del css de manera asíncrona.
- Asegurate de que tus scripts utilicen `async` o `defer`.
- De ser necesario, utiliza server-side rendering.

Siguiendo estos pasos, tu first paint tomará menos tiempo y la experiencia de usuario será mejor y más rápida.


El repo con los ejemplos este post está disponible en [github](https://github.com/datyayu-xyz/rendimiento-101-first-paint) para cualquier duda que tengas o mejora que quieras agregar, así que no dudes en hacerlo!
