[//]: # (title   - React: Componentes funcionales puros )
[//]: # (tags    - javascript, react, es2015+           )
[//]: # (id      - 05                                   )
[//]: # (date    - 2016.03.09                           )
[//]: # (url     - react-componentes-funcionales-puros  )
[//]: # (excerpt - Aprende a crear componentes presentacionales de la manera correcta y mejora tu código de react con componentes puros. )


Desde que React apareció en el mundo del frontend, ha existido una gran tendencia por tratar de crear código de una manera más declarativa. La idea de poder expresar de manera sencilla como queremos que se vea una UI, en lugar de tener que especificar cada paso para llegar a esa vista, es algo en lo que React sobresale y que ha ayudado a popularizar esta librería cada vez más.

Si bien en React existen componentes que dependen de cierto estado de la aplicación, la realidad es que la mayoría de los componentes que utilizamos en React son meramente de presentación y no tienen estado alguno, todo lo que muestran son representaciones de props que les pasa otro componente.

Debido a esto, desde v0.14, React incluye la opción para definir nuestros componentes como funciones puras, las cuales siempre regresan la misma representación de la vista si les pasamos las mismas propiedades.


### Componentes funcionales
Este tipo de componentes básicamente son funciones que reciben como parámetro las props y retorna un elemento. Pero una mejor manera de entenderlo es mostrándolo en código. Usando clases de js podemos definir un componente sencillo de la siguiente forma:
```js
class Saludo extends Component {
  render() {
    return (
      <h1> Hola, {this.props.name}! </h1>;
  }
}
```
Como puedes ver, el componente no contiene estado alguno. Solamente toma las props que le pasemos y nos retorna una representación en base a eso. Aun así, escribimos bastante código que no forma parte de la representación que deseamos. Por eso, es preferible mostrar este componente como un componente funcional.

``` js
function Saludo(props) {
  return <h1> Hola, {props.name}! </h1>;
}
```
O si prefieres utilizar funcionalidades de es2015+:
``` js
const Saludo = ({ name }) =>
  <h1> Hola, {name}! </h1>
;
```

Es bastante menos código que usando clases o `React.createClass`, y también es más fácil de entender pues lo único que tenemos es el nombre del componente, las props y el elemento que regresamos.


#### PropTypes
Para especificar propTypes, hacemos lo mismo que al crear componentes con clases: primero definimos el componente y después los propTypes.

```js
const Saludo = ({ name }) =>
  <h1> Hola, {name}! </h1>
;

Saludo.propTypes = { name: PropTypes.string };
Saludo.defaultProps = { name: 'amigo' };
```

#### Contexto
Los componentes también reciben un segundo parámetro que representa el contexto. Para requerirlo, utilizamos el mismo método que al definir props pero con `contextTypes`.

```js
const Saludo = ({ name }, context) =>
  <h1 style={context}> Hola, {name}!</h1>;
;
...
Saludo.contextTypes = {
  fontFamily: React.PropTypes.string
};
```


### Ventajas
Ahora que sabemos como utilizar estos componentes, podemos revisar que ventajas nos ofrecen en comparación con usar clases o `React.createClass`.

- **React de la manera correcta.** El mismo equipo detrás de React [ha declarado que este tipo de componentes es la manera apropiada de crear componentes sin estado](https://facebook.github.io/react/docs/reusable-components.html) y que en un futuro se le dará mayor atención y mejoras a los mismos.

- **Mas componentes, menos código.** Al tener que usar tan poco código, este método promueve el uso de micro-componentes sin tener que aumentar la base de código considerablemente.

- **Mayor legibilidad.** Usando componentes funcionales podemos simplificar partes de la aplicación y reducir el código. Además, quitamos un poco de la "magia" que agrega el usar clases.

- **Mejor testeabilidad.** Al no tener estado garantizamos que el componente es una función pura que siempre nos regresara lo mismo dados los mismos props, por lo que nuestras pruebas unitarias son más sencillas y seguras.

- **Código agnóstico a React.** Digamos que en un futuro queremos remplazar React por otra librería que nos ofrece mejor rendimiento. Si usamos `React.Component` y métodos como `render()`, tenemos que modificar todo el componente para acomodarse a cualquier otro nombre de método que utilice esa librería. En cambio, con componentes funcionales podemos utilizar cualquier librería que emplee JSX sin tener que reescribir por completo nuestro componente.


### Desventajas.
Aunque los componentes funcionales son geniales, tienen algunas desventajas que puede que sean relevantes para algunos (aunque la mayoría se planean resolver en un futuro).

- **No hay métodos de ciclo de vida.** Este es un arma de doble filo. Si bien en la mayoría de los componentes es mejor que no tengamos estado, hay algunos en los que ocupamos si o si tener estado o realizar ciertas acciones al montar un componente (por ejemplo, en [los componentes de orden superior](http://datyayu.xyz/componentes-de-orden-superior/)). Para estos casos actualmente tenemos que regresar a usar clases, aunque [en un futuro se planea permitir estado en estos tipos de componentes](https://twitter.com/sebmarkbage/status/658713924607606784).

- **Difícil de optimizar.** Debido a que no tenemos métodos del ciclo de vida del componente, no podemos utilizar `shouldComponentUpdate` para optimizar el diff en la aplicación. [Probablemente en un futuro tengamos algo para compensarlo](https://github.com/facebook/react/issues/5677#issuecomment-165457596) pero por ahora no hay manera de hacerlo.

- **No son compatibles con Hot-Reload.** Probablemente la mayor de las razones por las que personalmente no he adoptado por completo los componentes funcionales es que actualmente ni [react-hot-loader](https://github.com/gaearon/react-hot-loader) ni [react-transform-hmr](https://github.com/gaearon/react-transform-hmr) permiten usar hot-reload con componentes funcionales (debido a que no son tan fácil de identificar en comparación a los componentes propiamente instanciados). Por el lado positivo, [se está trabajando continuamente en ello](https://github.com/gaearon/babel-plugin-react-transform/issues/57).


### Conclusión
Los componentes funcionales son parte importante del futuro de React. Debido a que son algo reciente, aún tienen varias  aspectos negativos que arreglar pero en un futuro se volverán más prácticos y relevantes así que es importante conocerlos y familiarizarnos con ellos, pues son un patrón que nos ayudará a mejorar la calidad del código de nuestras aplicaciones.
