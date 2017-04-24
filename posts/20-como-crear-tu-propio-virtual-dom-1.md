[//]: # (title   - Como crear tu propio DOM virtual. )
[//]: # (tags    - javascript, browser, dom          )
[//]: # (id      - 20                                )
[//]: # (date    - 2016.07.03                        )
[//]: # (url     - como-crear-tu-propio-virtual-dom  )
[//]: # (excerpt - El uso de un DOM virtual se ha vuelto parte esencial de la más reciente etapa de evolución del ecosistema de javascript, pero a pesar de si potencial, no es tan difícil de entender cómo funciona y en este post te mostraré como puedes crear tu propia versión de un virtual DOM.)


El uso de un DOM virtual se ha vuelto parte esencial de la más reciente etapa de evolución del ecosistema de javascript. React, Ember, Mithril, Cycle... todos usan su propio DOM virtual para mejorar el rendimiento y la consistencia del renderizado de las aplicaciones. Es tan genial la manera en que lo hacen que casi parece que hay un algoritmo super complicado y críptico detrás de todo estos; pero la realidad es que no es tan difícil de entender cómo funciona y en este post te mostraré como puedes crear tu propia versión de un virtual DOM.

Antes de continuar, quiero aclarar que este post está basado en [el post de @deathmod en Medium](https://medium.com/@deathmood/how-to-write-your-own-virtual-dom-ee74acc13060). Después de leerlo, me gustó tanto que sentí un impulso por acercar esta información a más gente, así que kudos a él por la inspiración.


### DOM
Como desarrolladores de JS, el concepto del DOM debe ser algo familiar para todos y con el que se trabaja constantemente. Básicamente es una representación con forma de árbol que contiene los nodos de html que se muestran en el navegador y que nos provee de bonitas APIs para trabajarlo de manera sencilla, con métodos como `document.getElementById('miId')` o `$el.appendChild(childEl)`

Si bien estas APIs nos permiten hacer sencillo el uso del DOM para interactuar con el usuario en nuestras aplicaciones, tienen el problema de que no son tan rápidas a la hora de hacerlo. Esto se ha vuelto notorio cada vez más conforme las SPAs (Single-page applications) se han vuelto populares, ya que en ellas se tiende a estar modificando el DOM constantemente durante toda la vida de la aplicación.


## Virtual DOM
El virtual DOM o DOM virtual es una solución al problema de rendimiento del DOM, la cual se hizo popular junto con [react](https://facebook.github.io/react/), ya que fue el primer proyecto de gran impacto que lo implementó como parte de su núcleo.

La idea es simple:

1. Primero creas una copia propia del DOM en memoria (**A**) al inicio de tu aplicación.
2. Cuando quieres hacerle un cambio generas otra copia desde 0 (**B**) pero que incluya los cambios.
3. Comparas ambas copias (**A** y **B**) y solamente haces los cambios necesarios para pasar de **A** a **B**.
4. Tu DOM ahora es idéntico a **B**.

Al principio esto parece totalmente sin sentido.

> *"¿Cómo es posible que esto sea mejor si ahora tengo que crear una copia nueva del DOM cada vez que quiera cambiar algo?"*

Y aquí es donde entra la parte "virtual".

Resulta que hacer comparaciones y crear representaciones del DOM usando objetos en JS es mucho más eficiente y rápido que usar el DOM real. Entonces, el consultar todo el DOM usando la copia en memoria que creaste en JS es más rápido que hacerlo usando el DOM montado en la pagina. Es por esto que muchas librerías lo están implementando, ya que permite tener mejor rendimiento y aplicar cambios de mejor manera.


### Implementando tu propio virtual DOM
Para entender mejor la idea de un virtual DOM crearemos nuestra propia versión. No está de más aclarar que nos enfocaremos más en demostrar el funcionamiento detrás del virtual DOM que en el rendimiento, así que puede que esta no sea la versión más eficiente.

Antes de hacer código, hay dos partes importantes que ocupa tener nuestro DOM:

1. Representaciones de nuestra información (los nodos del DOM).
2. Un algoritmo de diferenciación, el cual comparará los dos arboles (**A** y **B**) y hará los cambios mínimos para que el DOM real refleje el contenido del virtual.

Esto es lo mínimo que ocupamos implementar para tener nuestro DOM funcionando. Hay muchas otras cosas que podemos implementar, como manejo de eventos o el uso de props pero en esta ocasión lo mantendremos simple para entenderlo mejor.

Dicho eso, empecemos a crear nuestro virtual DOM.

#### Representación virtual del DOM
Normalmente, en el DOM real, tendríamos una estructura como la siguiente:

```html
  <ul id="lista">
    <li> Hola </li>
    <li> Mundo </li>
  </ul>
```

Si lo revisas, cada elemento o nodo tiene 3 cosas importantes:

1. El tipo de nodo (div, ul, li...).
2. Sus propiedades (id, class...).
3. Los nodos hijos de ese nodo (nuestro &lt;ul&gt; tiene 2 &lt;li&gt;'s).

Si lo representamos en un objeto tendríamos algo como lo siguiente:
```js
{ tipo: 'ul', props: {id: 'lista'}, hijos: [
    { tipo: 'li', props: {}, hijos: [ 'Hola' ] },
    { tipo: 'li', props: {}, hijos: [ 'Mundo' ] }
] }
```

La parte a resaltar aquí es que tenemos dos tipos de nodos:

- Los elementos regulares, que se representan como
```js
{ tipo: '...', props: {...}, hijos: [...] }
```
- Los nodos de texto, que simplemente se representan como un string como
```js
'hola'
'mundo'
```

Entonces, para empezar crearemos una función propia para crear nodos con ese formato de manera mas sencilla.

```js
function h(tipo, props, ...hijos) {
  return { tipo, props, hijos };
}
```

Esto nos permitirá crear nuestro DOM sin escribir tanto, por ejemplo:
```js
h('ul', {id: 'lista'},
  h('li', {}, 'Hola'),
  h('li', {}, 'Mundo')
);
```

Pero podemos hacerlo mucho mejor. Conoces JSX? Basicamente lo que hace es pasar este codigo:
```html
<ul id="lista">
  <li>Hola</li>
  <li>Mundo</li>
</ul>
```
A esto:
```js
  React.createElement('ul', { id: 'lista' },
    React.createElement('li', {}, 'Hola'),
    React.createElement('li', {}, 'Mundo)
  );
```

¿Te parece familiar? Yup, transforma una sintaxis similar a html a una función similar a la nuestra. Por suerte, puedes configurar jsx para que transforme con cualquier función. En nuestro caso, solo ocupamos poner una linea especificando la función a la que debe transformar al inicio del archivo.

```js
/** @jsx h */

const domA = (
  <ul id="lista">
    <li>Hola</li>
    <li>Mundo</li>
  </ul>
);
```

¡Y listo! Ahora en lugar de convertir a `React.createElement`, convertirá a `h`, dandonos de resultado

```js
const domA = (
  h('ul', {id: 'lista'},
    h('li', {}, 'Hola'),
    h('li', {}, 'Mundo')
  )
);
```

Lo cual a su vez se evaluará a:

```js
const domA = (
  { tipo: 'ul', props: {id: 'lista'}, hijos: [
    { tipo: 'li', props: {}, hijos: [ 'Hola' ] },
    { tipo: 'li', props: {}, hijos: [ 'Mundo' ] }
  ] }
);
```

Puedes comprobarlo revisando la consola en el siguiente JSFiddle.

<iframe width="100%" height="300" src="//jsfiddle.net/datyayu/95svwbjx/1/embedded/js,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Convirtiendo el virtual DOM a nodos reales.
Ya que sabemos como los nodos se representarán en nuestro virtual DOM, es hora de convertirlos en nodos del DOM real.

Primero, recordemos que teníamos dos tipos de nodos: los nodos regulares y los de texto. Entonces, para crear nuestros nodos reales ocupamos tener en cuenta ambos casos:

```js
function crearElemento(nodo) {
  if (typeof nodo === 'string') {
    return document.createTextNode(nodo);
  }

  return document.createElement(nodo.tipo);
}
```

De esta sencilla manera podemos crear nodo real en el DOM. El problema ahora es que sólo renderiza el nodo que le pasemos pero no a sus hijos. Entonces aquí utilizaremos recursividad, llamando de nuevo esta función con cada hijo para que también los convierta a nodos reales.

```js
function crearElemento(nodo) {
  if (typeof nodo === 'string') {
    return document.createTextNode(nodo);
  }

  const $el = document.createElement(nodo.tipo);

  nodo.hijos
    .map(nodoHijo => crearElemento(nodoHijo))
    .forEach(elementoHijo => $el.appendChild(elementoHijo));

  return $el;
}
```

En este cambio simplemente convertimos cada hijo en un nodo real usando de nuevo `crearElemento`, y ese nodo real se lo agregamos al padre usando `appendChild`.

¡Perfecto! Ahora ya podemos renderizar nuestro propio DOM sin problemas. Puedes comprobarlo aquí:

<iframe width="100%" height="300" src="//jsfiddle.net/datyayu/g851xq07/1/embedded/js,html,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

### Creando el algoritmo de diferenciación.

Ya tenemos una forma de representar y renderizar nuestro DOM, ahora ocupamos el segundo punto clave de todo virtual DOM: el algoritmo de diferenciación.

Para crear este algoritmo tenemos que tener en cuenta 4 posibles casos que pueden ocurrir al hacer las comparaciones:

* **Se agregó un nodo nuevo**. Ocupamos agregarlo usando `appendChild`.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/020-1-caso-1.jpg)

* **Se removió un nodo**. Ocupamos removerlo usando `removeChild`.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/020-2-caso-2.jpg)

* **Se remplazo un nodo por otro**. Usaremos `replaceChild` para sustituirlo.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/020-3-caso-3.jpg)

* **Comparar a los hijos** Si los nodos no cambiaron, entonces ocupamos inspeccionar más profundo y comparar los nodos hijos para encontrar si hubo cambios en ellos.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/020-4-caso-4.jpg)


Ahora que sabemos que ocupamos tomar en cuenta, escribamos nuestra función `actualizarElemento` para actualizar el dom.


### 1. Se agregó un nodo.

Primero vamos a implementar lo que sucede cuando se agrega un nodo.

```js
function actualizarNodo($padre, nodoNuevo, nodoViejo) {
  if (!nodoViejo) {
    $padre.appendChild(crearElemento(nodoNuevo));
  }
}
```

Bastante directo, sólo comprobamos si el nodo no existía antes y lo agregamos al padre.


### 2. Se removió un nodo.

En este caso surge un pequeño problema, `removeChild` toma como argumento un nodo del DOM real pero, debido a que nuestro algoritmo compara sólo nodos virtuales, no tenemos una referencia para pasársela a `removeChild`. Sin embargo, podemos conocer la posición del elemento (`indice`) y obtener la referencia usando `$padre.childNodes[indice]`.

Para que esto sea posible, ocupamos agregar el indice como argumento:

```js
function actualizarNodo($padre, nodoNuevo, nodoViejo, indice = 0) {
  ...
}
```

Y, actualizando nuestra función, quedaría algo como:
```js
function actualizarNodo($padre, nodoNuevo, nodoViejo, indice = 0) {
  if (!nodoViejo) {
    $padre.appendChild(crearElemento(nodoNuevo));
  } else if (!nodoNuevo) {
    $padre.removeChild($padre.childNodes[indice]);
  }
}
```

Como ves, sólo removemos el hijo si no se encuentra en la versión nueva.


### 3. Se remplazó un nodo por otro.
Para este paso, crearemos una función auxiliar para checar si un nodo ha cambiado o no.

```js
function haCambiado(nodoAnterior, nodoActual) {
  return (
    (typeof nodoActual !== typeof nodoAnterior) ||
    (typeof nodoActual === 'string' && nodoActual !== nodoAnterior) ||
    (nodoActual.tipo !== nodoAnterior.tipo)
  );
}
```

Aquí buscamos comprobar 3 cosas:

* Si el nodo cambio de un nodo regular a uno de texto o viceversa.
```js
(typeof nodoActual !== typeof nodoAnterior)
```
* Si el nodo sigue siendo de texto, comprobamos si ha cambiado.
```js
(typeof nodoActual === 'string' && nodoActual !== nodoAnterior)
```
* Si el nodo sigue siendo regular, verificamos si el tipo de nodo ('div', 'ul', 'button') ha cambiado.
```js
(nodoActual.tipo !== nodoAnterior.tipo)
```

Y ya sólo queda incluirlo en nuestra función principal para remplazar el nodo si cambió.
```js
function actualizarNodo($padre, nodoNuevo, nodoViejo, indice = 0) {
  if (!nodoViejo) {
    $padre.appendChild(crearElemento(nodoNuevo));
  } else if (!nodoNuevo) {
    $padre.removeChild($padre.childNodes[indice]);
  } else if (haCambiado(nodoViejo, nodoNuevo)) {
    $padre.replaceChild(
      crearElemento(nodoNuevo),
      $padre.childNodes[indice]
    );
  }
}
```

### 4. Comparar a los hijos.

Por ultimo, tenemos que revisar los hijos para comprobar si ellos tuvieron cambios. Si pensaste en usar recursión para esto, estás en lo correcto; utilizaremos `actualizarElemento` en cada hijo.

Antes de comenzar a escribir el código para este caso hay que tener lo siguiente en cuenta:

* Sólo inspeccionaremos los hijos si el nodo no es de texto (los nodos de texto no tienen hijos).
* El nodo actual será el padre que pasaremos al actualizar los nodos hijos.
* Debemos comparar TODOS los hijos, uno por uno. Incluso si en algún punto tenemos un `undefined` (como al acceder a un indice que no existe), nuestra función funcionará correctamente pues antes tenemos `if (!nodoViejo)` y `else if (!nodoNuevo)`.

Agregando esto a nuestra función principal terminaríamos con algo como:

```js
function actualizarNodo($padre, nodoNuevo, nodoViejo, indice = 0) {
  if (!nodoViejo) {
    $padre.appendChild(crearElemento(nodoNuevo));
  } else if (!nodoNuevo) {
    $padre.removeChild($padre.childNodes[indice]);
  } else if (haCambiado(nodoViejo, nodoNuevo)) {
    $padre.replaceChild(
      crearElemento(nodoNuevo),
      $padre.childNodes[indice]
    );
  } else if (nodoNuevo.tipo) {
    const nuevoTamano = nodoNuevo.hijos.length;
    const viejoTamano = nodoViejo.hijos.length;
    for (let i = 0; i < nuevoTamano || i < viejoTamano; i++) {
      actualizarElemento(
        $padre.childNodes[indice],
        nodoNuevo.hijos[i],
        nodoViejo.hijos[i],
        i
      );
    }
  }
}
```

En este caso, iteramos en todos los hijos de ambos nodos e intentamos actualizar cada uno. Como efecto secundario, puedes darte cuenta de que si no cumple con ninguna de las cuatro condiciones que pusimos, lo dejaremos intacto, por lo que no haremos actualizaciones innecesarias al DOM real.

### Acomodando todo.

Finalmente, sólo queda juntar todas las partes que hemos creado y ¡listo! Nuestro DOM virtual en menos de 50 lineas está terminado.

Puedes probarlo funcionando en el siguiente JSFiddle

<iframe width="100%" height="300" src="//jsfiddle.net/datyayu/s8gswb4L/1/embedded/js,html,result/" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

Puedes ver como sólo actualiza el nodo necesario si lo inspeccionas desde las DevTools.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/020-5-dom-actulizado.gif)


### Conclusión.
Ahora que haz creado tu propio DOM virtual, puedes ver que realmente lo que sucede detrás de todas esas geniales librerías no es magia ni un algoritmo super complejo sino que, como en todo problema, es sólo cuestión de identificar los posibles casos y atenderlos uno a uno.

Obviamente nuestra versión no es la más completa pero sirve para demostrar la funcionalidad núcleo de un virtual DOM. Aún falta agregarle cosas como props y eventos para hacerlo más similar al de React pero eso lo dejaremos para otros posts, ¡así que quédate pendiente por ellos!
