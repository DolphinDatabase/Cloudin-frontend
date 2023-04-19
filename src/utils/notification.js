import {Error} from '@/assets/notification/Error.svg'
import {Complete} from '@/assets/notification/Complete.svg'
import {Warning} from '@/assets/notification/Warning.svg'

export default async function notify(data) {
    if (!("Notification" in window)) {
        console.warn("Este navegador não suporta notificações do HTML5");
        return;
    }

    var permission = await Notification.requestPermission()
    if (permission === "granted") {
        let icon
        switch (data.icon) {
            case ("Erro"):
                icon = Error
                break;
            case ("Concluido"):
                icon = Complete
                break;
            case ("Em andamento"):
                icon = Warning
        }
        new Notification(data.title, {
            body: data.text,
            icon: icon
        })
    }
}
