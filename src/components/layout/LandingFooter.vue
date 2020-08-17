<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div>
      <nav>
        <ul>
          <li>
            <a href="#">Joobis Team</a>
          </li>
          <li>
            <a href="#">Sobre nós</a>
          </li>
          <li>
            <a href="#">Blog</a>
          </li>
        </ul>
      </nav>
      <div class="copyright">
        &copy; {{ year }}, Desenvolvido por
        <a
          href="#"
          target="_blank"
          rel="noopener"
        >Joobis Dev Team</a>
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  name:'landing-footer',
  props: {
    backgroundColor: String,
    type: String,
  },
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style lang="scss">

</style>
