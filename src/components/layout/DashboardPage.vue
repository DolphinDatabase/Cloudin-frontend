<template>
    <div id="dashboard">
      <div class="iframe-container">
        <iframe title="Report Section" src="https://app.powerbi.com/view?r=eyJrIjoiMWUyOTk2YjQtYTRhNy00ZGVmLWI1OGQtZjMyZGM4MDIyOTg4IiwidCI6IjM0YzA5YmM0LTVmYjQtNDc2Zi05NGVjLTYxMDcwZWE1MDE3OSJ9" frameborder="0" allowFullScreen="true"></iframe>
      </div>
    </div>
  </template>
  <style>
    .iframe-container {
      position: relative;
      height: 0;
      padding-bottom: 71.7%;
      width: 100%;
      margin: 0 auto;
    }
  
    .iframe-container iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    @media screen and (max-width: 768px) {
      .iframe-container {
        padding-bottom: 140%;
      }
    }
  </style>
  <script>
  export default {
    name: "DashboardPage",
    components: {},
  };
  </script>
  