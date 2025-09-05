// script.js
// Этот файл будет загружать данные из data.json

// Функция анимации счетчика
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString('ru-RU');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Загружаем данные из data.json
async function loadStats() {
    try {
        const response = await fetch('data.json'); // Загружаем данные из файла в том же каталоге
        const data = await response.json();

        console.log("Данные загружены:", data);

        // Запускаем анимацию счетчиков
        animateValue(document.getElementById('stat-users'), 0, data.total_users, 2000);
        animateValue(document.getElementById('stat-transactions'), 0, data.total_transactions, 2000);
        animateValue(document.getElementById('stat-volume'), 0, data.total_volume, 2000);

    } catch (error) {
        console.error('Не удалось загрузить статистику:', error);
        // Заглушки на случай ошибки
        document.getElementById('stat-users').textContent = "Много";
        document.getElementById('stat-transactions').textContent = "Тысячи";
        document.getElementById('stat-volume').textContent = "Миллионы";
    }
}

// Загружаем данные при старте
document.addEventListener('DOMContentLoaded', loadStats);