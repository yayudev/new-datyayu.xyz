[//]: # (title   - Extender create-react-app con react-app-rewire     )
[//]: # (tags    - javascript, tooling, react, node, npm, babel, sass )
[//]: # (id      - 35                                                 )
[//]: # (date    - 2017.06.16                                         )
[//]: # (url     - extender-create-react-app                          )
[//]: # (excerpt - Extiende CRA y agrega funcionalidades extra sin necesidad de hacer eject y perder la conveniencia que te ofrece. )

Hace tiempo escribí [un post acerca de create-react-app (CRA)](https://datyayu.xyz/blog/posts/create-react-app) donde puedes revisar a detalle qué es y cómo usarlo para crear aplicaciones sin preocuparte por configurar las herramientas de desarrollo. Aún cuando considero que es una herramienta genial y mi primera opción a la hora de trabajar con react, una de las limitantes que he encontrado usandolo para crear aplicaciones es que si tu caso de uso está fuera de lo que CRA te ofrece por defecto toca usar `eject`, lo cual termina quitandole esa simplicidad que es el lado fuerte de la herramienta. Sin embargo, en este post te mostraré cómo puedes extender la funcionalidad de CRA manteniendo tu proyecto simple y sin tanta configuración.


## `eject`

`eject` o `npm run eject` es la manera que CRA nos ofrece por defecto para poder personalizar nuestro proceso de build y tener acceso directo a la configuración de webpack.


Una vez, que haces eject, puedes modificar los archivos de webpack y agregar plugins y loaders a tu gusto. La desventaja de esto es que terminas con un monton de archivos y dependencias que puede que no tengas ni idea de por que están en tu proyecto.

<img src="https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/035-1-archivos-despues-de-eject.jpg" alt="Archivos despues de eject" height="400px" width="220px" style="width:220px;height:400px;" />

Puedes ignorar estos problemas al inicio pero a medida que el tiempo pasa, mantener todas esas dependencias y scripts actualizados y funcionando se vuelve cada vez peor. Además de que al usar `eject` nos perdemos de las nuevas funcionalidades que CRA vaya agregando conforme salgan nuevas versiones.

<img src="https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/035-2-dependencias-despues-de-eject.jpg" alt="Dependencias despues de eject" />

Por eso quiero presentarte una alternativa para poder extender nuestro proyecto sin caer en estos problemas: [react-app-rewired](https://github.com/timarney/react-app-rewired).


# react-rewire-app

[react-app-rewired](https://github.com/timarney/react-app-rewired) es una extensión encima de CRA (o más bien, encima de `react-scripts`, el nucleo de la herramienta) y que nos permite tener acceso a la configuración de webpack y hacer cambios sin la necesidad de usar `eject`. De esta manera sigues teniendo todos los beneficios de CRA pero sin las limitantes de "cero configuración".

La manera en que esto funciona es mediante un archivo `config-overrides.js` en la raíz del proyecto. Dentro de este, se exporta una función la cual recibe como parametros la configuración de webpack por defecto y el tipo de ambiente (desarrollo/producción), y regresa la configuración una vez que la hayas modificado.

```js
/* config-overrides.js */
module.exports = function override(config, env) {
  // Modifica la config de webpack.
  return config;
}
```

Con sólo este archivo, puedes realizar los cambios que quieras y seguir teniendo todos los beneficios de usar CRA. Pero para entenderlo mejor, aquí hay dos ejemplos de cómo puedes usarlo.


## Agregar plugins a babel.

Uno de los mayores casos de uso de react-app-rewired es para extender babel. CRA ya viene con muchos plugins populares para poder usar funcionalidades de ES6+ pero obviamente hay muchisimos más plugins experimentales que nos pueden resultar utiles y no vienen incluidos por defecto. Con react-app-rewired podemos incluirlos de manera bastante sencilla:

Primero instalamos `react-app-rewired` y el plugin que querramos. (En este caso, queremos agregarle decoradores usando el plugin [transform-decorators-legacy](https://github.com/loganfsmyth/babel-plugin-transform-decorators-legacy)).

```sh
$ yarn add --dev react-app-rewired babel-plugin-transform-decorators-legacy
```

O si prefieres npm:

```sh
$ npm install --save-dev react-app-rewired babel-plugin-transform-decorators-legacy
```


Despues, creamos un archivo `config-overrides.js` en la raíz del proyecto.

```js
// config-overrides.js
const babelLoader = function(rule) {
  return rule.loader && rule.loader.endsWith("/babel-loader/lib/index.js");
};

module.exports = function override(config, env) {
  const babelrc = config.module.rules.find(babelLoader).options;

  babelrc.plugins = ["transform-decorators-legacy"].concat(babelrc.plugins || []);

  return config;
};
```
En este caso, primero buscamos el plugin de babel dentro de las reglas (`rules`) de la configuración. Recuerda que `module.rules` es la lista de loaders que webpack 2 usa para transformar tu código.

Una vez que lo encontramos, accedemos a sus opciones (`options`), que es basicamente un `babelrc` o un objecto de configuración de babel. Dentro de ese `babelrc`, a la lista de plugins le agregando al inicio `"transform-decorators-legacy"`.

Una vez modificada la configuración de webpack, simplemente la retornamos para que `react-app-rewired` la pueda utilizar.

Por último, sólo falta remplazar los scripts en `package.json` para usar `react-app-rewired` en lugar de `react-scripts`.

```json
...
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test --env=jsdom"
}
...
```

Y listo, ahora al usar `yarn start` o `npm run start` tendrás los mismos beneficios de antes pero con soporte también para los plugins que agregaste.


## Agregar soporte para Sass

Para poder usar Sass con create-react-app, el proceso es basicamente el mismo que con babel.

Primero ocupamos las dependencias. Para transformar sass ocupamos:

1. **node-sass** para poder correr las transformaciones.
2. **sass-loader** para realizar la transformación los archivos de sass.
3. **css-loader** para cargar el resultado de `sass-loader`.
4. **style-loader** para cargar el css como estilos.
5. **react-app-rewired** para evitar tener que usar `eject`.

Las podemos instalar todas usando:

```sh
$ yarn add --dev react-app-rewired node-sass sass-loader css-loader style-loader
```
O con npm:

```sh
$ npm install --save-dev react-app-rewired node-sass sass-loader css-loader style-loader
```

Una vez instalados, agregamos el `config-overrides.js`.

```js
const findFileLoader = function(rule) {
  return rule.loader && rule.loader.endsWith("/file-loader/index.js");
};

module.exports = function override(config, env) {
  // Exclude sass files from the file-loader
  const fileLoader = config.module.rules.find(findFileLoader);
  fileLoader.exclude.push(/\.scss$/);

  config.module.rules.push({
    test: /\.scss$/,
    loader: ["style-loader", "css-loader", "sass-loader"]
  });

  return config;
};
```

Primero buscamos el `file-loader` en la lista de reglas y excluimos los archivos `.scss`. Esto es para evitar que `file-loader` intente procesar ese tipo de archivos, pues queremos que sea `sass-loader` quien lo haga.

Despues agregamos otra regla a `module.rules` diciendole a webpack que los archivos `.scss` los pase por los loaders que instalamos antes.

Por último, regresamos la configuración ya modificada.

Ahora sólo queda remplazar los scripts en el `package.json`.

```json
...
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test --env=jsdom"
}
...
```


Y con esto ya podremos usar sass sin problemas.

---

Como siempre, [los ejemplos de este post están disponible en github](https://github.com/datyayu-xyz/extender-create-react-app) para cualquier duda que tengas o mejora que quieras agregar, ¡así que no dudes en hacerlo!
