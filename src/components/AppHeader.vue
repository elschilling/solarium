<template>
  <div class="top">
    <router-link :to="{ name: 'Home' }">
      <div class="sunbar">
        <div class="sun">
          <font-awesome-icon :icon="['fas', 'tree-city']" />
        </div>
        <div class="titlebar">
         SOLARIUM
        </div>
      </div>
    </router-link>
    <nav>
      <ul>
        <router-link v-if="user" to="/me"><li><img :src=user.user_metadata.avatar_url>Profile</li></router-link>
        <router-link v-if="!user" to="/login"><li>Sign in</li></router-link>
        <router-link v-if="!user" to="/register"><li>Sign up for free</li></router-link>
        <router-link v-if="user" to="/new"><li>Create</li></router-link>
        <router-link v-if="user" to="/logout"><li>Logout</li></router-link>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import useAuthUser from "@/composables/UseAuthUser";
const { user, isLoggedIn } = useAuthUser();
// console.log('isLoggedIn', isLoggedIn.value)
// console.log('user', user.value)
</script>

<style>
/* .top {
  height: 220px;
} */
.top a:visited {
  color: black;
}
.sunbar {
  /* background: linear-gradient(to bottom, rgba(132, 185, 230, 1) 0%,rgba(157, 124, 115, 1) 100%); */
  height: 115px;
  z-index: -1;
}
.sun {
  padding-top: 5px;
  text-align: center;
  position: relative;
  width: 110px;
  height: 100px;
  background: #ff9244;
  border-radius: 100%;
  border: 5px solid black;
  margin: auto;
  top: 25px;
  font-size: 50px;
  transition: all 0.5s;
  z-index: 1;
}
.sunbar:hover .sun{
  background: #ffce00;
  top: 15px;
  filter: drop-shadow(0 0 5em orange);
}
.titlebar {
  position: relative;
  top: -30px;
  font-family: 'Sunflower', sans-serif;
  font-size: 25px;
  text-align: center;
  line-height: 45px;
  background: black;
  color: white;
  height: 45px;
  z-index: 2;
}
nav {
  position: relative;
  z-index: 10;
  font-family: 'Ubuntu', sans-serif;
  margin: auto;
  background: #4c4d50;
}
nav ul {
  padding: 0;
  text-align: center;
  margin: 0 auto;
  list-style-type: none;
}
nav li {
  z-index: 20;

  display: flex;
  justify-content: center;
  padding: 3px 50px;
  background: #2b2b2b;
  color: white;
  line-height: 37px;
  display: inline-block;
  transition: all 0.4s;
}
nav li:hover {
  color: black;
  background: #ff9244;
}
nav img {
  /* position: fixed; */
  vertical-align: middle;
  margin-left: -40px;
  margin-right: 30px;
  border-radius: 100%;
  width: 35px;
}
</style>