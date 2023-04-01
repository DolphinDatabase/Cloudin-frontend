import {Vector} from '@/assets/notification/Vector.svg'
import {Complete} from '@/assets/notification/Complete.svg'

export default async function notify(data) {
    if (!("Notification" in window)) {
        console.warn("Este navegador não suporta notificações do HTML5");
        return;
    }

    var permission = await Notification.requestPermission()
    if (permission === "granted") {
        let icon
        switch (data.icon) {
            case ("erro"):
                icon = Vector
                break;
            case ("concluido"):
                icon = Complete
                break;
        }
        new Notification(data.title, {
            body: data.text,
            icon: icon
        })
    }
}


