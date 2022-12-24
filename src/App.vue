<template>
  <div>
    <router-view/>
  </div>
</template>



<style>
@import url('https://fonts.googleapis.com/css2?family=Alike&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Balthazar&display=swap');

a:-webkit-any-link {
  text-decoration: none;
}

body{
  margin: 0;
  background: #1C1B1B;
}

input{
  border: 1px solid #6A6A6A;
  border-radius: 10px;
  background: none;
  height: 35px;
  padding: 0 0 0 16px;
  font-family: 'Alike', serif;
  font-size: 20px;
  color: #FFFFFF;
  outline: none;
}

h1{
  margin: 0;
  font-size: 36px;
  color: #FFFFFF;
}

h2{
  color: rgba(255, 255, 255, 0.5);
  text-shadow: 0 4px 2px rgba(0, 0, 0, 0.25);
  font-family: 'Balthazar', serif;
  font-size: 40px;
  padding-top: 50px;
  margin: 0;
}

h3{
  color: rgba(255, 255, 255, 0.3);
  font-size: 36px;
  margin: 25px 0 0;
}

h5{
  margin: 0;
  color: rgba(255, 255, 255, 0.5);
  font-size: 16px;
}



</style>
