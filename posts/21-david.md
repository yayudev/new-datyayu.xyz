[//]: # (title   - David: ¡Mantén tus dependencias siempre al día! )
[//]: # (tags    - javascript, tooling, node, npm                  )
[//]: # (id      - 21                                              )
[//]: # (date    - 2016.08.07                                      )
[//]: # (url     - david                                           )
[//]: # (excerpt - Uno de los problemas más frecuentes al tener que mantener un proyecto es el de tratar de tener las dependencias siempre actualizadas. ero ya no hay que preocuparnos de más por si nuestro proyecto está o no al día, pues hay una herramienta que convierte este problema en algo bastante trivial: David. )

Uno de los problemas más frecuentes al tener que mantener un proyecto es el de tratar de tener las dependencias siempre actualizadas. Ya sea porque se nos olvida mantenerlas al día o simplemente porque no sabemos cuando una de las dependencias ha lanzado una nueva versión, eventualmente terminamos con un proyecto con muchas dependencias desactualizadas, lo cual puede resultar en problemas de mantenibilidad y seguridad.

En el caso de node.js este problema es aun mayor pues muchas veces tomamos ventaja de lo increible y modular que puede ser en combinación con npm y terminamos con decenas de dependencias en nuestro package.json. Pero ya no hay que preocuparnos de más por si nuestro proyecto está o no al día, pues hay una herramienta que convierte este problema en algo bastante trivial: [david](https://github.com/alanshaw/david).

### ¿Qué es david?

[david](https://github.com/alanshaw/david) es un modulo de node.js que te dice cuando tus dependencias de npm están desactualizadas.

Basicamente, david revisa tu package.json y compara las versiones que este incluye para cada dependencia contra las más actuales que tiene npm, y en base a ello te dice cuales ocupas actualizar.

Así de sencillo y simple.

### Cómo usar david.

Para usar david lo primero es instalarlo en nuestro sistema, lo cual podemos lograr usando

```bash
$ npm install -g david
```

Una vez instalado, podemos revisar el estado de las dependencias de un proyecto situándonos en el directorio del mismo y usando:

```bash
$ david
```

Esto nos mostrara una lista de las dependencias que están desactualizadas junto con cual es la versión actual de ese módulo en el proyecto, cual es la más reciente y el comando de npm que podemos usar para instalar las ultimas versiones.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/021-1-david-local.jpg)

Podemos copiar el comando de npm que nos ofrece para instalar las ultimas versiones de las dependencias, pero david nos ofrece una mejor manera de hacerlo.

```bash
$ david update [nombre-de-la-dependencia]
```

Por ejemplo `$ david update react` actualizaría sólo el módulo de react a la última versión, sin tocar los demás módulos. Esto es bastante útil para poder actualizar módulo por módulo y poder ir revisando que al actualizarlo no nos cause problemas de compatibilidad entre versiones.

También podemos actualizar todos los paquetes usando

```bash
$ david update
```

Sin embargo, no recomiendo hacerlo de esta manera ya que es probable es que haya diferencias entre las versiones que puedan romper nuestro código y al hacerlo de está manera podemos olvidarnos de cuales son los módulos que actualizamos y eso complicaría encontrar los problemas que pueden surgir.

### ¡Mantén al día tus dependencias globales también!

Algo bastante cool de david es que también funciona con tus dependencias globales. Para ello, sin importar el directorio en el que estés situado, puedes usar

```bash
$ david --global
```

Esto te mostrará una lista similar a la anterior, pero de tus dependencias globales.

![](https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/021-2-david-global.jpg)

Y para actualizar los módulos globales, lo hacemos de la misma manera que los locales pero agregando un `-g` o `--global` al comando.

```bash
$ david update -g ava
```

Y eso es todo, ahora podemos utilizar david para revisar que nuestros módulos estén siempre al día sin problemas ni trabajo de más.
