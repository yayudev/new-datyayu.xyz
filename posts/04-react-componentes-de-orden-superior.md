[//]: # (title   - React: Componentes de Orden Superior )
[//]: # (tags    - javascript, react, es2015+           )
[//]: # (id      - 04                                   )
[//]: # (date    - 2016.03.07                           )
[//]: # (url     - react-componentes-de-orden-superior  )
[//]: # (excerpt - High-Order components o componentes de orden superior son un tema fundamental en el desarrollo moderno con React. Si no sabes como utilizarlos, ¡esta es tu oportunidad para crear componentes totalmente reutilizables independientemente de donde los uses y decirle adios a esos horribles mixins! )


Desde el lanzamiento de [v0.13](https://facebook.github.io/react/blog/2015/03/10/react-v0.13.html), React ha permitido y alentado el emplear clases nativas de javascript (extendiendo de `React.Component`) en lugar de `React.createClass()` para mantener el código más simple y fácil de entender. Sin embargo, con este nuevo método uno de los cambios más importantes es que no soporta el uso de mixins al usar clases, el cual era bastante común hasta ese release.

### Mixins
Si para algo era muy útiles los mixins, eso era para conectar un Component con nuestra Flux Store y obtener el estado de la aplicación de manera sencilla, sin tener que reescribir una y otra vez el mismo código para subscribirse al store en cada uno de los componentes, pues podíamos simplemente remplazar multiples lineas de código repetido por un
```js
mixins: [obtenerEstadoMixin]
```

Aun así, los mixins tienen varios problemas que aumentan la complejidad de una aplicación, por ejemplo:

- **Dependencias no explicitas**. Puede que tengamos mixins que dependan de que otros métodos sean implementados en el componente, pero viendo la definición del mixin no hay manera de saberlo.

- **Choque entre mixins**. Si utilizas el mismo mixin multiples veces (por ejemplo `[storeMixin(store1), storeMixin(store2)]`) puede provocar que React tire una excepción debido a que tu componente tiene dos versiones de métodos con el mismo nombre. Lo mismo pasa si dos mixins tratan de editar la misma propiedad del estado del componente.

- **Más estado**. Una buena practica, y la manera correcta de trabajar con React, es mantener el estado de tu aplicación en tan pocos componentes como puedas. Debemos de tratar de tener tan poco estado como sea posible para evitar que nuestra aplicación se vuelva demasiado compleja de mantener, y los mixins usualmente sólo agregan más estado a los componentes.

### Componentes de Orden Superior.
Una de las maneras mas adoptadas para remplazar los mixins es el uso de High-Order Components o componentes de orden superior, los cuales básicamente son funciones que toman un componente y regresan el mismo componente envuelto en otro.

Para entenderlo mejor, supongamos que tenemos un mixin para conectar un componente a un store. Algo sencillo seria esto:
```js
function conectarAStoreMixin(store) {
  const Mixin = {
    getInitialState() {
      return this.getStateFromStore(this.props);
    },

    componentDidMount() {
      store.addChangeListener(this.onStoreChange);
    },

    componentWillUnmount() {
      store.removeChangeListener(this.onStoreChange);
    },

    onStoreChange() {
      if (this.isMounted()) {
        this.setState(this.getStateFromStore(this.props));
      }
    }
  };

  return Mixin;
}
```
Si te has dado cuenta, en ningún lugar del mixin se declara el método `this.getStateFromStore()`. Este método toca implementarlo dentro del componente que use este mixin:

```js
const MiComponente = React.createClass({
  mixins: [conectarAStoreMixin(UserStore)],

  propTypes: {
    userId: React.PropTypes.number.isRequired,
  },

  getStateFromStore() {
    return { user: UserStore.get(props.userId) };
  }

  render() {
    const { user } = this.state;
    return <div>{user ? user.name : 'Cargando...'}</div>;
  }
});
```

Como ves, el método `getStateFromStore()` tiene que ser aplicado en el componente que usa el mixin, aunque el mixin no lo exprese directamente y tengamos que saberlo de antemano o leer el código para enterarnos.

Esto puede ser mejorado usando un componente de orden superior de la siguiente manera:

```js
function conectarAStore(Component, store, getStateFromStore) {
  const StoreConnection = React.createClass({
    getInitialState() {
      return getStateFromStore(this.props);
    }

    componentDidMount() {
      store.addChangeListener(this.onStoreChange);
    }

    componentWillUnmount() {
      store.removeChangeListener(this.onStoreChange);
    },

    onStoreChange() {
      if (this.isMounted()) {
        this.setState(getStateFromStore(this.props));
      }
    }

    render() {
      return <Component {...this.props} {...this.state} />;
    }
  });

  return StoreConnection;
}
```
Ciertamente es casi idéntico al mixin que teníamos antes pero, en lugar de modificar el estado del componente inicial, creamos otro componente que contendrá el estado que ocupemos y este se lo va a pasar a nuestro componente por medio de `props`.

Por ultimo, para usarlo simplemente creamos nuestro componente.
```js
let MiComponente = React.createClass({
  propTypes: {
    userId: React.PropTypes.number.isRequired,
    // `user` ahora es un prop en lugar de parte del state.
    user: React.PropTypes.object,
  },

  render() {
    const { user } = this.props;
    return <div>{user ? user.name : 'Cargando...'}</div>;
  }
});
```

Y lo conectamos con el Store usando el componente de orden superior. En este caso, le pasamos `obtenerUsuarioDeStore` para elegir que parte del estado ocupamos.

```js
function obtenerUsuarioDeStore() {
  return { user: UserStore.get(props.userId) };
}

MiComponente = conectarAStore(MiComponente, UserStore, obtenerUsuarioDeStore);
```

Al hacerlo de esta manera, evitamos las colisiones que teníamos con los mixins pues cada componente de orden superior tendrá su propio estado y métodos independientes; expresamos de una manera mas explicita que ocupamos `conectarAStore`, pues es un parámetro de nuestra función; y ademas de que nuestros componentes ahora pueden ser componentes sin estado, lo cual mejora la mantenibilidad y testeabilidad de nuestro código.

Como dije al principio, los componentes de orden superior tienen como ventaja que también pueden ser utilizados con clases de javascript, por ejemplo:

```js
class MiComponente extends React.Component {
  render() {
    const { user } = this.props;
    return <div>{user ? user.name : 'Cargando...'}</div>;
  }
}

MiComponente.propTypes = {
  userId: React.PropTypes.number.isRequired,
  user: React.PropTypes.object,
};

function obtenerUsuarioDeStore() {
  return { user: UserStore.get(props.userId) };
}

MiComponente = conectarAStore(MiComponente, UserStore, obtenerUsuarioDeStore);
```

Sencillo, ¿verdad? Si quieres probar cómo esto funciona te recomiendo leer [el post de Dan Abramov acerca de componentes de orden superior](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.tvprt0ocw), el cual toca más a fondo este tema; y además te dejo un pen con una versión simplificada del código de este post para que puedes experimentar y entiendas mejor como funciona este método.

<p data-height="268" data-theme-id="0" data-slug-hash="dMGNLK" data-default-tab="js" data-user="datyayu" class="codepen">See the Pen <a href="http://codepen.io/datyayu/pen/dMGNLK/">React: Componentes de Alto Orden </a> by Arturo Coronel (<a href="http://codepen.io/datyayu">@datyayu</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>
