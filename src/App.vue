<template>
  <div id="app">
    <h1>It Projects Todo</h1>
    <router-view></router-view>
  </div>
</template>

<style>
body {
  margin: 0;
  overflow-x: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: cornflowerblue;
  background: radial-gradient(circle, rgba(52,192,255,1) 0%, rgba(2,92,131,1) 100%);
  width: 100vw;
  max-width: 1920px;
  margin: auto;
  min-height: 100vh;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
}
h1 {
  text-align: center;
  color: white;
}
h2, .card-title {
  color: #2F2768;
}
.card, #app .modal {
  background-color: lightskyblue;
  background: linear-gradient(185deg, rgba(135,206,250,1) 0%, rgba(91,164,209,1) 100%);
  border-radius: 5px;
}
input {
  background: none;
}
a, button {
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  background-color: darkslateblue;
  font-size: 0.9em;
  overflow: hidden;
  color: white;
  text-decoration: none;
  position: relative;
  transition: background-color 0.15s ease;
}
button:disabled {
  filter: contrast(0.7);
  cursor: default;
}
a::before, button::before:not(:disabled) {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(170deg, rgba(77,64,154,0) 30%, rgba(23, 14, 77, 0.5) 100%);
}
a:hover, button:hover:not(:disabled) {
  background-color: #2F2768;
}
#app input[type="checkbox"] {
  width: 18px;
  height: 18px;
  margin-top: 0;
  margin-left: 0;  
}
input[type="checkbox"]:not(:disabled) {
  cursor: pointer;
}
</style>