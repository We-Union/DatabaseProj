<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/>
</template>

<style>
:root {
  --base-font : "Glow Sans",
  --base-color : #42b983,
  --base-font-size : 16px,
}

@font-face {
  font-family: "Glow Sans";
  src: url("@/assets/font/GlowSansSC-Normal-Book.woff2");
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

.route-wrapper {
  width: 90%;
  min-height: 1500px;
  overflow-x: scroll;
}

</style>
