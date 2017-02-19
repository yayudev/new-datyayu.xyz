export default {
  en: {
    projects: {
      title: 'PROJECTS',
      subtitle: `
        A collection of my favorite side-projects I've
        created.`,
      projects: [
        {
          name: 'datyayu.xyz',
          date: '2017',
          imagePrefix: 'datyayu-xyz',
          url: 'https://datyayu.xyz',
          description: `
            This site :D. Created originally using pug and
            Sass but later on they were replaced by simple
            Vue.js components and plain css. It features
            route transitions, vuex with state management,
            i18n support for multilanguage (spanish and
            english), rendering optimization and
            server-side rendering.

            This is also an example of how JAMStack sites
            can work using Wordpress only as an API and a
            CDN for static files, resulting in a
            almost serverless architecture (My server it's
            only for adding server-side rendering).`
        },
        {
          name: 'raji',
          date: '2016',
          imagePrefix: 'datyayu-xyz',
          url: 'http://raji-demo.herokuapp.com',
          description: `
             Music player app for anisongs. Build
             using react, redux, RWD, Sass and webpack. The
             backend is written using .NET Core and Web API
             Core. It also features responsive design,
             rendering layers optimization and
             screen-size-based experience.

             This project also ended up generating a
             separate project, a module that makes easier
             to work with the Web Audio API called ongaku
             which is available on github and npm.

             Currently on development.`
        },
        {
          name: 'Weetrack 2.0',
          date: '2016 - Current',
          imagePrefix: 'weetrack2',
          url: 'http://track.datyayu.xyz/',
          description: `
            An automated anime release tracker build using
            react, redux, SASS and Gulp for the frontend.
            Both the frontend and the backend are written
            using ES6.

            Part of the logic for listening the rss feeds,
            which the application uses as data source, was
            extracted onto a separate module (feed-watcher)
            and published on Github and npm to help other
            people to deal with that problem.`
        },
        {
          name: 'fbot-mk2',
          date: '2016',
          imagePrefix: 'fbot',
          url: 'https://github.com/datyayu/fbot',
          description: `
            Second version of fbot. It uses node.js, as the
            first one does, but this version uses the
            Messenger Platform API instead of the old
            basic Messenger API.

            This was an experiment created on the same day
            facebook launched the Messenger Platform API
            during the F8 event, in order to understand
            how the platform was going to work.`
        },
        {
          name: 'fbot',
          date: '2016',
          imagePrefix: 'fbot',
          url: 'https://github.com/datyayu/fbot',
          description: `
            A facebook bot who google things. Build using
            node and the facebook messenger API.`
        },
        {
          name: 'color-blind',
          date: '2016',
          imagePrefix: 'color-blind',
          url: 'https://github.com/datyayu/color-blind',
          description: `
            A small platform game with similar mechanics
            than Color Symphony.
            Build from scratch using java.
          `
        },
        {
          name: 'YayuJS',
          date: '2016',
          imagePrefix: 'yayujs',
          url: 'http://old.datyayu.xyz',
          description: `
            Blog build with ghost, deployed using a custom
            theme created from scratch for this site
            (Available now at github at
            datyayu/yayul-theme).

            It was the first version of datyayu.xyz,
            but focused only on the blogging side of
            this site.`
        },
        {
          name: 'rental',
          date: '2016',
          imagePrefix: 'rental',
          url: 'http://datyayu.github.io/rental-frontend/views/home.html',
          description: `
            A demo concept for a rental site. Build as a
            part of an internship to prove my skills using
            existing css frameworks (like materialize)
            and javascript libraries (like jQuery).`
        },
        {
          name: 'Weeselect',
          date: '2015',
          imagePrefix: 'weeselect',
          url: 'http://weeselect.herokuapp.com/',
          description: `
            A Single-page application build using angular
            1.3 and node. It picks you a character for
            League of Legends from your custom pool
            and automatically it gives you a optimal
            item set for that character based on real
            match data (using Champion.gg).`
        },
        {
          name: 'Weesong',
          date: '2015',
          imagePrefix: 'weesong',
          url: 'https://github.com/datyayu/weesong',
          description: `
            Frontend-only SPA music player, targeted for
            anisongs. Build using angular 1.3, node, stylus
            and gulp. It uses advanced responsive web design
            techniques and browser APIs interaction like
            local-storage and Audio API.`
        },
        {
          name: 'Weetrack Mobile',
          date: '2015',
          imagePrefix: 'weetrack-mobile',
          url: 'https://github.com/datyayu/weetrack-mobile',
          description: `
            A mobile client for weetrack's original version
            created using the ionic framework angular
            1.3 and Sass. It includes styles and specific
            logic to ensure a more friendly
            mobile experience.

            No longer mantained.`
        },
        {
          name: 'Weetrack (Replaced for v2)',
          date: '2014',
          imagePrefix: 'weetrack',
          url: 'https://github.com/datyayu/weetrack/tree/ae836bff72f7c9782c3086c5e8f799e07baa75dc',
          description: `
            An automated anime release tracker build stylus,
            angular 1.3 and gulp. The backend was written
            in node.js using coffescript.

            Replaced by weetrack 2.0.`
        },
        {
          name: 'StartPage',
          date: '2010',
          imagePrefix: 'start-page',
          url: 'http://datyayu.github.io/StartPage/index.html',
          description: `
            Nothing really cool here. Just and old broken
            static page. However this was the first site
            I've ever created and I still love to come back
            and look at it. Isn't it beautiful?`
        }
      ]
    }
  },

  es: {
    projects: {
      title: 'PROYECTOS',
      subtitle: `
        Una colección de mis proyectos favoritos que
        he creado.`,
      projects: [
        {
          name: 'datyayu.xyz',
          date: '2017',
          imagePrefix: 'datyayu-xyz',
          url: 'https://datyayu.xyz',
          description: `
            Este sitio :D. Creado originalmente usando
            pug y Sass, pero posteriormente remplazados por
            simples componentes de Vue.js y css. Incluye
            transiciones entre rutas, manejo de estado con
            Vuex, soporte de i18n para multiples lenguajes
            (español e ingles), optimización de renderizado
            y server-side rendering.

            Este también es un ejemplo de como un sitio
            creado con el JAMStack puede funcionar usando
            Wordpress únicamente como un API y un CDN para
            archivos estaticos, resultando en una
            arquitectura casi sin servidor (Mi servidor
            sólo es para agregar server-side rendering).`
        },
        {
          name: 'raji',
          date: '2016',
          imagePrefix: 'datyayu-xyz',
          url: 'http://raji-demo.herokuapp.com',
          description: `
            Aplicación de musica para anisongs.
            Creado usando react, redux, RWD, Sass y webpack.
            El backend esta escrito usando .NET Core y
            Web API Core. También incluye diseño responsivo,
            optimización de renderizado y experiencias basada
            en el tamaño de pantalla.

            Esta aplicación también terminó generando un
            proyecto separado, un módulo para usar el Web
            Audio API de manera sencilla llamado ongaku,
            el cual está disponible en github y npm.

            Actualmente en desarrollo.`
        },
        {
          name: 'Weetrack 2.0',
          date: '2016',
          imagePrefix: 'weetrack2',
          url: 'http://track.datyayu.xyz/',
          description: `
            Un rastreador automático de lanzamientos de
            episodios de anime creado react, redux, SASS y
            Gulp para el frontend. Tanto el frontend como
            el backend están escritos usando ES6.

            Parte de la lógica para escuchar a los feeds
            de RSS, los cuáles usa la aplicación como
            fuente de datos, fue extraída en un módulo
            separado publicado libremente en github y
            npm (feed-watcher) para ayudar a otros a
            resolver ese problema.`
        },
        {
          name: 'fbot-mk2',
          date: '2016',
          imagePrefix: 'fbot',
          url: 'https://github.com/datyayu/fbot',
          description: `
            Segunda versión de fbot. Utiliza node.js, como
            su predecesor, pero esta versión usa el API de
            Messenger Platform en lugar del viejo API básico
            de Messenger.

            Este proyecto fue creado el mismo día que facebook
            lanzó la Messenger Platform durante el evento F8,
            para comprender como iba a funcionar la
            plataforma.`
        },
        {
          name: 'fbot',
          date: '2016',
          imagePrefix: 'fbot',
          url: 'https://github.com/datyayu/fbot',
          description: `
            Un bot de facebook que googlea cosas. Creado
            usando node y el API de Messenger de facebook.`
        },
        {
          name: 'color-blind',
          date: '2016',
          imagePrefix: 'color-blind',
          url: 'https://github.com/datyayu/color-blind',
          description: `
            Un pequeño juego de plataforma con mecánicas
            similares a Color Symphony.
            Creado desde cero usando java.`
        },
        {
          name: 'YayuJS',
          date: '2016',
          imagePrefix: 'yayujs',
          url: 'http://old.datyayu.xyz',
          description: `
            Blog construido con ghost, publicado usando
            un tema personalizado creado desde cero para
            este sitio (disponible actualmente en github
            como datyayu/yayul-theme).

            Fue la primera versión de datyayu.xyz, pero
            enfocado sólo en la parte de blogging
            del sitio.`
        },
        {
          name: 'rental',
          date: '2016',
          imagePrefix: 'rental',
          url: 'http://datyayu.github.io/rental-frontend/views/home.html',
          description: `
            Un concepto demo para un sitio de rentas.
            Creado como parte de mis prácticas profesionales
            para provar mis skills usando frameworks de css
            (como materialize) y librerías de javascript
            (como jQuery).`
        },
        {
          name: 'Weeselect',
          date: '2015',
          imagePrefix: 'weeselect',
          url: 'http://weeselect.herokuapp.com/',
          description: `
            Una aplicacion construida usando angular 1.3
            y node. Selecciona un personaje para League of
            Legends al azar de tu lista de seleccionados y
            automáticamente te da un set de items óptimo
            para ese personaje basado en datos de partidas
            reales (usando Champion.gg). Ya no es mantenido.
          `
        },
        {
          name: 'Weesong',
          date: '2015',
          imagePrefix: 'weesong',
          url: 'https://github.com/datyayu/weesong',
          description: `
            Reproductor de música, dirigido en especifico
            para anisongs. Creado usando angular 1.3, node,
            stylus y gulp. Utiliza tecnicas avanzadas de
            diseño responsivo e interacciones con APIs del
            navegador como local-storage y Audio API.`
        },
        {
          name: 'Weetrack Mobile',
          date: '2015',
          imagePrefix: 'weetrack-mobile',
          url: 'https://github.com/datyayu/weetrack-mobile',
          description: `
            Un cliente móvil para la versión original de
            weetrack, creado usando el framework Ionic,
            angular 1.3 y Sass. Incluye estilos y lógica
            especificas para garantizar una experiencia más
            amigable para móvil.

            Ya no es mantenida.`
        },
        {
          name: 'Weetrack',
          date: '2014',
          imagePrefix: 'weetrack',
          url: 'https://github.com/datyayu/weetrack/tree/ae836bff72f7c9782c3086c5e8f799e07baa75dc',
          description: `
            Un rastreador automático de lanzamientos de
            anime creado usando stylus, angular 1.3 y gulp.
            El backend fue escrito en node.js usando
            coffescript.

            Replazado por weetrack 2.0.`
        },
        {
          name: 'StartPage',
          date: '2010',
          imagePrefix: 'start-page',
          url: 'http://datyayu.github.io/StartPage/index.html',
          description: `
            Nada fancy aqui. Sólo una vieja página rota.
            Sin embargo, este fue el primer sitio que
            creé y aún me encanta regresar y mirarlo.
            ¿Acaso no es hermoso?`
        }
      ]
    }
  }
}
