export default {
    async notify(data){
        if (!("Notification" in window)) {
            console.warn("Este navegador não suporta notificações do HTML5");
            return;
        }

        var permission = await Notification.requestPermission()
        if (permission === "granted") {
            let icon
            switch(data.icon){
                case ("erro"):
                    icon = "@/assets/notification/Vector.svg"
                    break;
                case ("concluido"):
                    icon = "@/assets/notification/Complete.svg"
                    break; 
            }
            new Notification("Notificação", {
                body: data.text,
                icon: icon
            })
        }
    }       
}


