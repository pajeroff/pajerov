// Устанавливаем текущий год в футер
document.getElementById('currentYear').textContent = new Date().getFullYear();

function openModal(event) {
    event.preventDefault();
    event.stopPropagation();
    const avatarSrc = document.querySelector('.avatar-frame img').src;
    // Устанавливаем src для модального изображения при открытии
    document.getElementById('modalImage').src = avatarSrc;
    document.getElementById("avatarModal").style.display = "flex";
}
function closeModal(event) {
    const modal = document.getElementById("avatarModal");
    if (event.target === modal || event.target.classList.contains('close') || event.target.id === 'modalImage') {
        modal.style.display = "none";
    }
}
window.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.getElementById("avatarModal").style.display = "none";
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const title = document.querySelector('.hero-title');
    const subtitle = document.querySelector('.hero-subtitle');
    const nameElement = document.querySelector('.name-text');
    const aboutTextElement = document.getElementById('about-text');
    // Скрываем текст "Обо мне" изначально
    aboutTextElement.textContent = '';
    // Начальные стили для скрытия
    title.style.opacity = '0';
    title.style.transform = 'translateY(20px)';
    subtitle.style.opacity = '0';
    subtitle.style.transform = 'translateY(20px)';
    nameElement.style.opacity = '0';
    nameElement.textContent = '';
    // Плавное появление заголовка
    setTimeout(() => {
        title.style.transition = 'opacity 1s ease, transform 1s ease';
        title.style.opacity = '1';
        title.style.transform = 'translateY(0)';
    }, 500);
    // Плавное появление подзаголовка после заголовка
    setTimeout(() => {
        subtitle.style.transition = 'opacity 1s ease, transform 1s ease';
        subtitle.style.opacity = '1';
        subtitle.style.transform = 'translateY(0)';
         // Начинаем анимацию печати имени после появления подзаголовка
        setTimeout(() => {
            typeWriterEffectWithCursor(nameElement, 'Павел Тихомиров', 150);
        }, 1100);
    }, 1600);
     // Начинаем анимацию печати текста "Обо мне" после завершения печати имени
    function startAboutTextTyping() {
        typeWriterEffectWithoutCursor(aboutTextElement, 'Привет! Меня зовут Павел, и я создаю цифровые продукты, которые вдохновляют и приносят пользу. Я увлекаюсь разработкой, дизайном и всем, что связано с созданием чего-то нового и значимого. Этот сайт — моя визитная карточка и пространство, где я делюсь своими проектами, мыслями и контактами.', 8); // Более быстрая печать для абзаца
    }
    function typeWriterEffectWithCursor(element, text, delay) {
        element.style.opacity = '1';
        element.style.position = 'relative';
        let cursor = document.createElement('span');
        cursor.innerHTML = '|';
        cursor.style.animation = 'blink 1s infinite';
        cursor.id = 'typewriter-cursor';
        let i = 0;
        element.textContent = '';
        function type() {
            if (i <= text.length) {
                element.innerHTML = text.substring(0, i) + '<span style="animation: blink 1s infinite;" id="typewriter-cursor">|</span>';
                i++;
                if (i <= text.length) {
                     setTimeout(type, delay);
                } else {
                    // После завершения печати имени, запускаем печать текста "Обо мне"
                    setTimeout(startAboutTextTyping, 500); // Небольшая пауза перед началом
                }
            }
        }
        type();
    }
    function typeWriterEffectWithoutCursor(element, text, delay) {
        // element.style.opacity = '1'; // Уже видимо благодаря .card-block
        let i = 0;
        element.textContent = ''; // Очищаем перед началом
        function type() {
            if (i < text.length) {
                element.textContent = text.substring(0, i + 1);
                i++;
                setTimeout(type, delay);
            }
            // Курсор не добавляем, анимация завершается с последним символом
        }
        type();
    }
});
 // Добавляем стили для мигания курсора
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
    }
`;
document.head.appendChild(style);

// Скрипт для копирования номера
function copyPhone(phoneNumber) {
    navigator.clipboard.writeText(phoneNumber).then(() => {
        showNotification(phoneNumber + ' скопировано!', 'success');
    }).catch(err => {
        console.error('Ошибка копирования: ', err);
        showNotification('Не удалось скопировать телефон', 'error');
    });
}
function showNotification(message, type) {
    const button = document.getElementById('phone-button');
    const rect = button.getBoundingClientRect();
    const iconClass = type === 'success' ? 'bi bi-check-circle-fill' : 'bi bi-x-circle-fill';
    const textColor = type === 'success' ? '#d8b4fe' : '#ff6b6b';
    const bgColor = '#0a0a0a';
    let notification = document.createElement('div');
    notification.id = 'phone-notification';
    notification.innerHTML = `<i class="${iconClass}" style="margin-right: 6px;"></i> ${message}`;
    notification.style.cssText = `
        position: fixed;
        top: ${rect.bottom + 5}px;
        left: ${rect.left}px;
        background: ${bgColor};
        color: ${textColor};
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        z-index: 10000;
        opacity: 0;
        display: flex;
        align-items: center;
        transition: opacity 0.3s ease;
        pointer-events: none;
        box-shadow: 0 0 10px ${textColor.replace('rgb', 'rgba').replace(')', ', 0.5)')};
        white-space: nowrap;
    `;
    document.body.appendChild(notification);
    setTimeout(() => { notification.style.opacity = '1'; }, 10);
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => { document.body.removeChild(notification); }, 300);
    }, 2500);
}

// Скрипт для изменения стиля топ-бара при прокрутке
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.contact-wrapper');
    if (window.scrollY > 10) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// particles.js
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#d8b4fe" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#a78bfa",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "out",
            bounce: false
        }
    },
    interactivity: {
        detect_on: "window",
        events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            grab: { distance: 140, line_linked: { opacity: 1 } },
            push: { particles_nb: 4 }
        }
    },
    retina_detect: true
});

// Инициализация тултипов для элементов с классом skill-item
document.addEventListener('DOMContentLoaded', function () {
    // Инициализируем тултипы только для элементов с классом skill-item
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('.skill-item[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            trigger: 'hover' // Убедимся, что триггер - hover
        });
    });
});

