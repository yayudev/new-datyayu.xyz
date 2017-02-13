<template>
  <div>
    <site-header
      bg-image="/images/bg.png"
      header-title="BLOG"
      header-subtitle="Frontend is cool"
      header-color="green"
    ></site-header>

    <blog-post
        :title="blogPost.title"
        :date="blogPost.date"
        :tags="blogPost.tags"
        :content="blogPost.content"
    ></blog-post>
  </div>
</template>


<script>
  import SiteHeader from '~components/SiteHeader/SiteHeader.vue'
  import BlogPost from '~components/BlogPost/BlogPost.vue'

  export default {
    components: {
      SiteHeader,
      BlogPost
    },

    data () {
      const blogPost = {
        title: 'Blog post about an interesting topic that is longer than one line',
        date: '2017.02.03',
        tags: ['javascript', 'vue', 'dom'],
        content: `
        <div>
          <p>
            Howl uncontrollably for no reason find empty spot in cupboard
            and sleep all day or going to catch the red dot today
            <strong>going to catch the red dot</strong> today ignore the squirrels,
            you'll never catch them anyway <a href='#'>climb a tree, wait for a
            fireman</a> jump to fireman then scratch his face. Nap all day the dog
            smells bad a nice warm <em>laptop for me to sit on kitty</em> loves pigs but
            scratch the furniture.
          </p>

          <p>
           Put butt in owner's face jump launch to pounce upon little yarn mouse,
           bare fangs at toy run hide in litter box <code> until  treats are fed</code>.
           Have my breakfast spaghetti yarn. Playing with balls of wool damn that dog so
           scratch the box playing with balls of wool.
          </p>


          <h2>TOPIC #140</h2>

          <p>
            Cat snacks stare at ceiling light purr or kitty loves pigs and scream at teh bath.
            Sit in box climb leg, so poop on grasses yet stare at ceiling chew iPad power cord.
            Run outside as soon as door open.
          </p>

          <pre>
            <code class="lang-js">
              function sayHello() {
                  alert('hello world');
              }
              sayHello();
            </code>
          </pre>
        </div>
        `
      }

      return { blogPost }
    }
  }
</script>
