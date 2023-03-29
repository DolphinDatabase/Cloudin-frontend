<template>
    <div>
      <button @click="exibirNotificacao()">Exibir notificação</button>
    </div>
</template>

<script>
    export default {
        name:'NotificationComponent',
        data() {
            return {

            }
        },
        methods: {
    exibirNotificacao(e) {
      if (!("Notification" in window)) {
        console.warn("Este navegador não suporta notificações do HTML5");
        return;
      }

      Notification.requestPermission().then(function(permission) {
        if (permission === "granted") {
          let notification = new Notification("Notificação", {
            body: e,
            icon: "caminho/para/o/ícone.png"
          });
          notification.onclick = function(event) {
            event.preventDefault();
            window.open("https://www.exemplo.com");
          }
        }
      });
    }
  }
}
</script>