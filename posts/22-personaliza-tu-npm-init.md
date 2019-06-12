[//]: # 'title   - Personaliza tu npm init '
[//]: # 'tags    - node, npm               '
[//]: # 'id      - 22                      '
[//]: # 'date    - 2016.08.10              '
[//]: # 'url     - personaliza-tu-npm-init '
[//]: # 'excerpt - Algo interesante de npm como herramienta y que no muchos conocen es que es bastante personalizable. En este post, quiero enseñarte como configurar los valores por defecto de npm init, así podrás ahorrarte algo de tiempo cada vez que crees un nuevo proyecto.'

Algo interesante de npm como herramienta y que no muchos conocen es que es bastante personalizable. En este post, quiero enseñarte como configurar los valores por defecto de npm init, así podrás ahorrarte algo de tiempo cada vez que crees un nuevo proyecto.

Basicamente, todo lo que tienes que hacer es usar los siguiente comandos (obviamente, con tus propios datos).

```bash
$ npm config set init.author.name "Arturo Coronel"
$ npm config set init.author.email aoitsu3@gmail.com
$ npm config set init.author.url https://datyayu.dev
$ npm config set init.license MIT
```

Esto te generara un archivo `.npmrc`, con la configuración que tu estableciste, en tu directorio `$HOME`. Este archivo es el que usará npm para configurarse cada vez que lo utilices.

Y eso es todo lo que ocupas hacer.

Ahora, cada vez que corras `npm init` tus valores por defecto se mantendran.

Por ejemplo, mira como mi `package.json` generado incluye mis datos (en `author`) aun cuando no me los pidió durante la creación del mismo. Esto es gracias a la configuración que hicimos antes :D

<img src="https://s3-us-west-1.amazonaws.com/datyayu-xyz/blog/images/022-1-npm-init.jpg" width="500px" />

Si quieres checar más opciones para personalizar tu configuración de npm, puedes revisar la [documentación oficial](https://docs.npmjs.com/misc/config) o correr `npm help 7 config`.
