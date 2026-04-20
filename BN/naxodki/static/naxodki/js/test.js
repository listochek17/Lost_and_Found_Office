// === СМЕНА ТЕМЫ ===
const themeBtn = document.getElementById('themeBtn');
const body = document.body;
const icon = themeBtn.querySelector('i');

themeBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Меняем иконку
    if (body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
});

// === ПЕРЕКЛЮЧЕНИЕ ВКЛАДОК ===
function switchTab(type, btn) {
    // 1. Убираем класс active у всех кнопок
    document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
    // 2. Добавляем активной кнопке
    btn.classList.add('active');
    
    // 3. Меняем заголовок
    const title = document.getElementById('pageTitle');
    const desc = document.getElementById('pageDesc');
    
    if (type === 'found') {
        title.innerText = "Найденные вещи";
        desc.innerText = "Здесь список вещей, которые были найдены и ждут владельцев";
        // Тут можно добавить логику JS для загрузки "найденных" товаров
    } else {
        title.innerText = "Потерянные вещи";
        desc.innerText = "Объявления о том, что кто-то что-то потерял. Помогите найти!";
        // Тут логика для загрузки "потерянных" товаров
    }
}