import Navigation from "./shared/navigation.js"
import Footer from "./shared/footer.js"

import Blog from "./pages/blog.js"
import Experiments from "./pages/experiments.js"
import Projects from "./pages/projects.js"
import Home from "./pages/home.js"
import About from "./pages/about.js"
import ErrorPage from "./pages/error.js"

export default {
  en: {
    ...Navigation.en,
    ...Footer.en,
    ...ErrorPage.en,

    ...About.en,
    ...Blog.en,
    ...Experiments.en,
    ...Projects.en,
    ...Home.en,
  },

  es: {
    ...Navigation.es,
    ...Footer.es,
    ...ErrorPage.es,

    ...About.es,
    ...Blog.es,
    ...Experiments.es,
    ...Projects.es,
    ...Home.es,
  },
}
