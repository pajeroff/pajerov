let currentSlide = 0;
const slides = document.querySelectorAll('.experience-slide');
const slider = document.getElementById('experienceSlider');
const totalSlides = slides.length;

let startX = 0;
let isDragging = false;
let currentX = 0; // Для отслеживания текущего сдвига мыши

// Инициализация слайдера
function initSlider() {
    updateSlider();
    setupTouchEvents();
    setupMouseEvents(); // Добавляем обработчики мыши
}

// Обновление позиции слайдера
function updateSlider() {
    // Используем translateX для сдвига
    slider.style.transform = `translateX(calc(-${currentSlide * 100}% - ${currentX}px))`;
}

// Изменение слайда
function changeSlide(direction) {
    currentSlide += direction;
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    } else if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    currentX = 0; // Сбрасываем сдвиг при смене слайда
    updateSlider();
}

// Настройка сенсорных событий (свайп)
function setupTouchEvents() {
    slider.addEventListener('touchstart', handleTouchStart, { passive: true });
    slider.addEventListener('touchmove', handleTouchMove, { passive: false });
    slider.addEventListener('touchend', handleTouchEnd, { passive: true });
}

// Настройка событий мыши
function setupMouseEvents() {
    slider.addEventListener('mousedown', handleMouseDown, { passive: true });
    slider.addEventListener('mousemove', handleMouseMove, { passive: false });
    slider.addEventListener('mouseup', handleMouseUp, { passive: true });
    // Важно: mouseup может произойти за пределами слайдера, поэтому добавим его на document
    document.addEventListener('mouseup', handleMouseUp, { passive: true });
}

// --- Обработчики для мыши ---
function handleMouseDown(e) {
    startX = e.clientX; // Запоминаем начальную координату мыши
    isDragging = true;
    slider.style.cursor = 'grabbing'; // Меняем курсор на "перетаскивание"
}

function handleMouseMove(e) {
    if (!isDragging) return;
    // Предотвращаем выделение текста при перетаскивании
    e.preventDefault();
    const currentXPos = e.clientX;
    currentX = currentXPos - startX; // Вычисляем сдвиг

    // Ограничиваем сдвиг, чтобы не уйти слишком далеко
    // Максимальный сдвиг влево: -ширина_слайдера (крайний правый слайд)
    // Максимальный сдвиг вправо: ширина_слайдера (крайний левый слайд)
    const maxShift = slider.offsetWidth; // Примерное ограничение
    if (currentX > maxShift) {
        currentX = maxShift;
    } else if (currentX < -maxShift) {
        currentX = -maxShift;
    }

    updateSlider(); // Обновляем позицию слайдера при движении
}

function handleMouseUp(e) {
    if (!isDragging) return;

    const endX = e.clientX;
    const diffX = startX - endX; // Разница координат

    const threshold = 50; // Минимальное расстояние для срабатывания смены слайда

    if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
            // Перетаскивание влево - следующий слайд
            changeSlide(1);
        } else {
            // Перетаскивание вправо - предыдущий слайд
            changeSlide(-1);
        }
    } else {
        // Если сдвиг был небольшим, возвращаем к текущему слайду
        currentX = 0;
        updateSlider();
    }

    isDragging = false;
    slider.style.cursor = 'grab'; // Возвращаем курсор "хваталку"
}

// --- Обработчики для сенсора (свайп) ---
function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    isDragging = true;
    // Не вызываем e.preventDefault() здесь, чтобы не мешать прокрутке страницы
}

function handleTouchMove(e) {
    if (!isDragging) return;
    // Предотвращаем вертикальный скролл при горизонтальном свайпе внутри слайдера
    e.preventDefault();
    const currentXPos = e.touches[0].clientX;
    currentX = currentXPos - startX; // Вычисляем сдвиг

    // Ограничиваем сдвиг, как и для мыши
    const maxShift = slider.offsetWidth; // Примерное ограничение
    if (currentX > maxShift) {
        currentX = maxShift;
    } else if (currentX < -maxShift) {
        currentX = -maxShift;
    }

    updateSlider(); // Обновляем позицию слайдера при движении
}

function handleTouchEnd(e) {
    if (!isDragging) return;
    const endX = e.changedTouches[0].clientX;
    const diffX = startX - endX;

    const threshold = 50;

    if (Math.abs(diffX) > threshold) {
        if (diffX > 0) {
            changeSlide(1);
        } else {
            changeSlide(-1);
        }
    } else {
        currentX = 0; // Возвращаем слайдер к текущему слайду
        updateSlider();
    }
    isDragging = false;
}

// Функция для открытия модального окна опыта
function openExperienceModal(modalId) {
    const modalElement = document.getElementById(modalId);
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initSlider);
