export default {
  en: {
    projects: {
      title: 'PROJECTS',
      subtitle: 'A collection of my favorite side-projects I\'ve created.',
      projects: [
        {
          name: 'datyayu.xyz',
          date: '2017',
          imagePrefix: 'datyayu-xyz',
          url: 'https://datyayu.xyz',
          description: `
            This site :D. Created originally using pug and Sass but later on
            replaced by simple Vue.js components and plain css. It features routes
            transitions, vuex's state management, i18n support for multilanguage
            (spanish and english), rendering optimization and server-side rendering.

            This is also an example of how JAMStack sites can work using Wordpress as
            an API only and a CDN for static files, resulting in a almost-serverless architecture
            (My server is only used for the server-side rendering).`
        },
        {
          name: 'raji',
          date: '2016',
          imagePrefix: 'datyayu-xyz',
          url: 'http://raji-demo.herokuapp.com',
          description: `
             SPA music player, targeted for anisongs. Build using react,
             redux, RWD, Sass y webpack. The backend is written using .NET
             core and Web API Core. It also features responsive design, rendering
             layers optimization and screen-size-based experience. This project also
             ended up generating a separate project, a small Web Audio API module called
             ongaku which is now available on github and npm.
          `
        },
        {
          name: 'Weetrack 2.0',
          date: '2016 - Current',
          imagePrefix: 'weetrack2',
          url: 'http://track.datyayu.xyz/',
          description: `
            An automated anime release tracker build using react,
            redux, SASS and Gulp for the frontend. The backend is written
            in node.js using ES6, and part of the logic for listening
            the rss feeds which uses as data source, was extracted
            onto a published npm module (feed-watcher) to help other
            people to deal with that problem.`
        },
        {
          name: 'fbot-mk2',
          date: '2016',
          imagePrefix: 'fbot',
          url: 'https://github.com/datyayu/fbot',
          description: `
            Second version of fbot. It uses node as the first one does,
            but this version uses the Messenger Bot API. This was an experiment
            created the same day facebook launched the Messenger Platform API, as
            a way to see how it was going to work.
          `
        },
        {
          name: 'fbot',
          date: '2016',
          imagePrefix: 'fbot',
          url: 'https://github.com/datyayu/fbot',
          description: `
            A facebook bot who google things. Build using node and the
            facebook messenger API.`
        },
        {
          name: 'color-blind',
          date: '2016',
          imagePrefix: 'color-blind',
          url: 'https://github.com/datyayu/color-blind',
          description: `
            A small platform game with mechanics ala Color Symphony.
            Build from scratch using java.
          `
        },
        {
          name: 'YayuJS',
          date: '2016',
          imagePrefix: 'yayujs',
          url: 'http://old.datyayu.xyz',
          description: `
            Blog powered with ghost, deployed using a custom theme created from
            scratch for this site (It's available at github at datyayu/yayul-theme).
            It was the first version of datyayu.xyz, but focused only on the blogging
            side of this site.
          `
        },
        {
          name: 'rental',
          date: '2016',
          imagePrefix: 'rental',
          url: 'http://datyayu.github.io/rental-frontend/views/home.html',
          description: `
            A demo concept for a rental site. Build as a part of an internship
            to prove my skills using already existing frameworks (like materialize.css)
            and basic js libraries like jQuery.
          `
        },
        {
          name: 'Weeselect (No longer mantained)',
          date: '2015',
          imagePrefix: 'weeselect',
          url: 'http://weeselect.herokuapp.com/',
          description: `
            A Single-page application build using angular 1.3 and node.
            It picks you a character for League of Legends from your custom pool
            and automatically it gives you a optimal item set for that character
            based on real match data (via Champion.gg API).
          `
        },
        {
          name: 'Weesong',
          date: '2015',
          imagePrefix: 'weesong',
          url: 'https://github.com/datyayu/weesong',
          description: `
            Frontend-only SPA music player, targeted for anisongs. Build using angular
            1.3, node and gulp. It uses advanced responsive web design techniques and
            also dom-api interactions via Audio API.
          `
        },
        {
          name: 'Weetrack Mobile (No longer mantained)',
          date: '2015',
          imagePrefix: 'weetrack-mobile',
          url: 'https://github.com/datyayu/weetrack-mobile',
          description: `
            A mobile client for the original version of weetrack created using the ionic
            framework and angular 1.3. It reuses the logic from the web version but the
            styles and some scripts are mobile-specific for a more responsive experience.
          `
        },
        {
          name: 'Weetrack (Replaced for v2)',
          date: '2014 - 2015',
          imagePrefix: 'weetrack',
          url: 'https://github.com/datyayu/weetrack/tree/ae836bff72f7c9782c3086c5e8f799e07baa75dc',
          description: `
            An automated anime release tracker build stylus, angular 1.3 and gulp.
            The backend was written in node.js using coffescript.`
        },
        {
          name: 'StartPage',
          date: '2010ish',
          imagePrefix: 'start-page',
          url: 'http://datyayu.github.io/StartPage/index.html',
          description: `
            Nothing really cool here. Just and old broken static page. However this was the
            first site I've ever created and I still love to come back and look at it.
            Isn't it beautiful?`
        }
      ]
    }
  },

  es: {
    projects: {
      title: 'PROYECTOS',
      subtitle: 'Una colección de mis proyectos favoritos que he creado.',
      projects: [
        {
          name: 'datyayu.xyz',
          date: '2017',
          imagePrefix: 'datyayu-xyz',
          url: 'https://datyayu.xyz',
          description: `
            Este sitio :D. Creado originalmente usando pug y Sass, pero posteriormente
            remplazado por simples componentes de Vue.js y css. Incluye transiciones entre
            rutas, manejo de estado con Vuex, soporte de i18n para multiples lenguajes
            (espanol e ingles), optimizacion de renderizado y server-side rendering.

            Este tambien es un ejemplo de como un sitio creado con el JAMStack puede funcionar usando
            Wordpress unicamente como un API y un CDN para archivos estaticos, resultando en una arquitectura
            casi sin servidor (En mi caso, mi servidor solo es para server-side rendering).`
        },
        {
          name: 'raji',
          date: '2016',
          imagePrefix: 'datyayu-xyz',
          url: 'http://raji-demo.herokuapp.com',
          description: `
            Aplicacion de musica, orientada para anisongs. Creado usando react,
            redux, RWD, Sass y webpack. El backend esta escrito usando .NET Core yayujs
            Web API Core. Tambien incluye diseno responsivo, optimizacion de renderizado
            y experiencias basada en el tamano de pantalla.

            Esta aplicacion tambien termino generando un proyecto separado, un modulo para
            usar el Web Audio API de manera sencilla llamado ongaku, el cual esta disponible
            libremente en github y npm.`
        },
        {
          name: 'Weetrack 2.0',
          date: '2016',
          imagePrefix: 'weetrack2',
          url: 'http://track.datyayu.xyz/',
          description: `
            Un rastreador automatico de lanzamientos de anime creado react, redux,
            SASS y Gulp para el frontend. Tanto el frontend como el backend estan
            escritos usando ES6. Parte de la logica para escuchar a los feeds de rss
            que se usan de fuente de datos fue extraida en un modulo separado publicado
            libremente en github y npm (feed-watcher) para ayudar a otros a resolver ese
            problema.`
        },
        {
          name: 'fbot-mk2',
          date: '2016',
          imagePrefix: 'fbot',
          url: 'https://github.com/datyayu/fbot',
          description: `
            Second version of fbot. It uses node as the first one does,
            but this version uses the Messenger Bot API. This was an experiment
            created the same day facebook launched the Messenger Platform API, as
            a way to see how it was going to work.
          `
        },
        {
          name: 'fbot',
          date: '2016',
          imagePrefix: 'fbot',
          url: 'https://github.com/datyayu/fbot',
          description: `
            Un bot de facebook que googlea cosas. Creado usando node y el
            API de messenger de facebook.`
        },
        {
          name: 'color-blind',
          date: '2016',
          imagePrefix: 'color-blind',
          url: 'https://github.com/datyayu/color-blind',
          description: `
            Un pequeno juego de plataforma con mecanicas similares a Color Symphony.
            Creado desde 0 usando java.
          `
        },
        {
          name: 'YayuJS',
          date: '2016',
          imagePrefix: 'yayujs',
          url: 'http://old.datyayu.xyz',
          description: `
            Blog construido con ghost, publicado usando un tema personalizado creado
            desde 0 para este sitio (disponible libremente en github como datyayu/yayul-theme).
            Fue la primera version de datyayu.xyz, pero enfocado unicamente en la parte de
            blogging del sitio.
          `
        },
        {
          name: 'rental',
          date: '2016',
          imagePrefix: 'rental',
          url: 'http://datyayu.github.io/rental-frontend/views/home.html',
          description: `
            Un concepto demo para un sitio de rentas. Creado como parte de mis
            practicas profesionales para provar mis skills usando frameworks de css
            (como materialize.css) y librerias de javascript (como jQuery).
          `
        },
        {
          name: 'Weeselect',
          date: '2015',
          imagePrefix: 'weeselect',
          url: 'http://weeselect.herokuapp.com/',
          description: `
            Una aplicacion construida usando angular 1.3 y node.
            Selecciona un personaje para league of legends al azar de tu lista de
            seleccionado y automaticamente te da un set de items optimo para ese
            personaje basado en data de partidas reales (via Champion.gg). Ya no es mantenido.
          `
        },
        {
          name: 'Weesong',
          date: '2015',
          imagePrefix: 'weesong',
          url: 'https://github.com/datyayu/weesong',
          description: `
            Reproductor de musica, dirigido en especifico para anisongs. Creado usando
            angular 1.3, node, stylus y gulp. Utiliza tecnicas avanzadas de diseno
            responsivo e interacciones con APIs del navegador como local-storage y
            Audio API.
          `
        },
        {
          name: 'Weetrack Mobile',
          date: '2015',
          imagePrefix: 'weetrack-mobile',
          url: 'https://github.com/datyayu/weetrack-mobile',
          description: `
            Un cliente movil para la version original de weetrack, creado usando el
            framework ionic, angular 1.3 y SASS. Incluye estilos y logica especificas
            para garantizar una experience mas amigable para movil. Ya no es mantenida.
          `
        },
        {
          name: 'Weetrack',
          date: '2014',
          imagePrefix: 'weetrack',
          url: 'https://github.com/datyayu/weetrack/tree/ae836bff72f7c9782c3086c5e8f799e07baa75dc',
          description: `
            Un rastreador automatico de lanzamientos de anime creado usando stylus, angular 1.3 y gulp.
            El backend fue escrito en node.js usando coffescript. Replazado por weetrack 2.0`
        },
        {
          name: 'StartPage',
          date: '2010',
          imagePrefix: 'start-page',
          url: 'http://datyayu.github.io/StartPage/index.html',
          description: `
            Nada fancy aqui. Solo una vieja pagina rota. Sin embargo, este fue
            el primer sitio que cree y aun me encanta regresar y mirarlo. Acaso no es hermoso?`
        }
      ]
    }
  }
}
