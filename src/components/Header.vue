<template>
  <div class="header">
    <a href class="logo">OLI Systems</a>
    <input class="menu-btn" type="checkbox" id="menu-btn">
    <label class="menu-icon" for="menu-btn">
      <span class="navicon"></span>
    </label>
    <ul class="menu">
      <li>
        <a href="#">OLI Energy Browser</a>
      </li>
      <li>
        <a href="#">OLI Chain Explorer</a>
      </li>
      <li>
        <a href="#">OLI Tokenization</a>
      </li>
    </ul>
  </div>
</template>

<script>
import Explorer from "./Explorer.vue";
export default {
  name: "Header"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/* .title {
  overflow: auto;
  display: flex;
  justify-content: center;
  padding: 2rem 0 1rem;
}

.title > h1 {
  font-size: 2rem;
  color: white;
  margin: -9px 0 0 6px;
  text-align: center;
}
.search-bar {
  flex: 0 0 auto;
  border-left: 0;
  border-right: 0;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
}

.search-bar > input {
  border-radius: 2px;
}

.search-bar > input[type="text"] {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  flex-basis: 50%;
  max-width: 450px;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #e9e9e9;
  border-right: none;
}

.search-bar > input[type="submit"] {
  background-color: #fdd922;
  color: #333333;
  padding: 1rem;
  border: 1px solid #e0bc27;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  user-select: none;
}
.search-results {
  padding-bottom: 1rem;
}

.search-results,
.search-term {
  font-style: italic;
}

.header p {
  font-size: 0.8em;
  color: white;
  text-align: center;
}

.btn {
  background-color: #108bea;
  border-radius: 2px;
  color: white;
  user-select: none;
  border: none;
  cursor: pointer;
  opacity: 1;
}

.btn:hover {
  background-color: #0f6cb2;
}

.btn:active {
  opacity: 0.8;
} */

/* header */

.header {
  background-color: #154360;
  width: 100%;
}

.header ul {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
}

.header li a {
  display: block;
  padding: 0.5rem;
  text-decoration: none;
}

a {
  color: white;
}

.header li a:hover,
.header .menu-btn:hover,
.logo:hover {
  color: orange;
  transition: 0.3s;
}

.header .logo {
  float: left;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 15px 20px;
  text-decoration: none;
}
/* menu */
.header .menu {
  clear: both;
  max-height: 0;
  transition: max-height 0.2s ease-out;
}

/* menu icon */

.header .menu-icon {
  cursor: pointer;
  display: inline-block;
  float: right;
  padding: 28px 20px;
  position: relative;
  user-select: none;
}

.header .menu-icon .navicon {
  background: white;
  display: block;
  height: 2px;
  position: relative;
  transition: background 0.2s ease-out;
  width: 22px;
}

.header .menu-icon .navicon:before,
.header .menu-icon .navicon:after {
  background: white;
  content: "";
  display: block;
  height: 100%;
  position: absolute;
  transition: all 0.2s ease-out;
  width: 100%;
}

.header .menu-icon .navicon:before {
  top: 5px;
}

.header .menu-icon .navicon:after {
  top: -5px;
}

/* menu btn */

.header .menu-btn {
  display: none;
}

.header .menu-btn:checked ~ .menu {
  max-height: 240px;
}

.header .menu-btn:checked ~ .menu-icon .navicon {
  background: transparent;
}

.header .menu-btn:checked ~ .menu-icon .navicon:before {
  transform: rotate(-45deg);
}

.header .menu-btn:checked ~ .menu-icon .navicon:after {
  transform: rotate(45deg);
}

.header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:before,
.header .menu-btn:checked ~ .menu-icon:not(.steps) .navicon:after {
  top: 0;
}

div.header > ul {
  padding-left: 20px;
}

/* 48em = 768px */

@media (min-width: 48em) {
  .header li {
    float: left;
    margin-left: 0.3rem;
  }
  .header li a {
    padding: 20px;
  }
  .header .menu {
    clear: none;
    float: right;
    max-height: none;
    padding-right: 10px;
  }
  .header .menu-icon {
    display: none;
  }
}
</style>
