'use strict';

function unleashControlledChaos() {
    let isChaosActive = false;
    let originalStyles = new Map();
    
    // Функция поломки сайта
    function breakTheSite() {
        if (isChaosActive) return;
        isChaosActive = true;
        
        console.log('🚧 Начинаем ломать сайт KAI...');
        
        // Сохраняем оригинальные стили перед изменением
        saveOriginalStyles();
        
        // 1. Ломаем layout - случайные позиции
        document.querySelectorAll('div, header, footer, nav, section, article').forEach(element => {
            if (Math.random() > 0.6) {
                element.style.position = 'relative';
                element.style.left = `${Math.random() * 100 - 50}px`;
                element.style.top = `${Math.random() * 100 - 50}px`;
            }
        });
        
        // 2. Искажаем размеры элементов
        document.querySelectorAll('div, img, p, h1, h2, h3').forEach(element => {
            if (Math.random() > 0.7) {
                const scale = 0.5 + Math.random() * 1.5;
                element.style.transform = `scale(${scale})`;
            }
        });
        
        // 3. Рандомные цвета для основных блоков
        document.querySelectorAll('#page_wrapper, .main_slider_holder, .news_box, header, footer').forEach(element => {
            element.style.backgroundColor = getRandomPastelColor();
            element.style.color = getRandomDarkColor();
        });
        
        // 4. Ломаем текст - случайные шрифты и размеры
        document.querySelectorAll('p, span, a, li').forEach(element => {
            if (element.textContent && element.textContent.length > 10) {
                const fonts = ['Comic Sans MS', 'Papyrus', 'Times New Roman', 'Arial', 'Courier New'];
                element.style.fontFamily = fonts[Math.floor(Math.random() * fonts.length)];
                element.style.fontSize = `${12 + Math.random() * 10}px`;
                
                // Некоторые слова делаем перевернутыми
                if (Math.random() > 0.8) {
                    element.innerHTML = element.innerHTML.split(' ').map(word => {
                        return Math.random() > 0.7 ? `<span style="display:inline-block;transform:rotate(180deg)">${word}</span>` : word;
                    }).join(' ');
                }
            }
        });
        
        // 5. Ломаем изображения
        document.querySelectorAll('img').forEach(img => {
            if (Math.random() > 0.5) {
                img.style.filter = `hue-rotate(${Math.random() * 360}deg)`;
                img.style.opacity = 0.5 + Math.random() * 0.5;
            }
        });
        
        // 6. Рандомные отступы и границы
        document.querySelectorAll('div, section, article').forEach(element => {
            if (Math.random() > 0.6) {
                element.style.margin = `${Math.random() * 20}px`;
                element.style.padding = `${Math.random() * 30}px`;
                element.style.border = `${Math.random() * 5}px solid ${getRandomColor()}`;
            }
        });
        
        // 7. Ломаем навигацию - случайные ссылки
        document.querySelectorAll('a').forEach(link => {
            if (Math.random() > 0.8) {
                const originalHref = link.href;
                link.href = 'javascript:void(0)';
                link.title = 'Ссылка сломана!';
                link.style.textDecoration = 'line-through';
            }
        });
        
        updateButtonState();
    }
    
    // Функция восстановления сайта
    function fixTheSite() {
        if (!isChaosActive) return;
        isChaosActive = false;
        
        console.log('🔧 Восстанавливаем сайт KAI...');
        
        // Восстанавливаем оригинальные стили
        restoreOriginalStyles();
        
        updateButtonState();
    }
    
    // Сохранение оригинальных стилей
    function saveOriginalStyles() {
        document.querySelectorAll('*').forEach(element => {
            if (element.style.cssText) {
                originalStyles.set(element, element.style.cssText);
            }
        });
    }
    
    // Восстановление оригинальных стилей
    function restoreOriginalStyles() {
        document.querySelectorAll('*').forEach(element => {
            const originalStyle = originalStyles.get(element);
            if (originalStyle) {
                element.style.cssText = originalStyle;
            } else {
                element.style.cssText = '';
            }
        });
        originalStyles.clear();
    }
    
    // Генерация случайных цветов (более приятных)
    function getRandomColor() {
        return '#' + Math.floor(Math.random()*16777215).toString(16);
    }
    
    function getRandomPastelColor() {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 85%)`;
    }
    
    function getRandomDarkColor() {
        const hue = Math.floor(Math.random() * 360);
        return `hsl(${hue}, 70%, 20%)`;
    }
    
    // Создание кнопки управления
    function createControlButton() {
        if (document.getElementById('chaos-control-btn')) return;
        
        const button = document.createElement('button');
        button.id = 'chaos-control-btn';
        button.innerHTML = '🔧 Поломать сайт';
        
        // Стили для кнопки
        Object.assign(button.style, {
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: '10000',
            padding: '10px 15px',
            fontSize: '14px',
            fontWeight: 'bold',
            backgroundColor: '#ff4444',
            color: 'white',
            border: '2px solid #cc0000',
            borderRadius: '5px',
            cursor: 'pointer',
            boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease'
        });
        
        button.addEventListener('click', function() {
            if (!isChaosActive) {
                breakTheSite();
            } else {
                fixTheSite();
            }
        });
        
        button.addEventListener('mouseenter', function() {
            button.style.transform = 'translateY(-2px)';
            button.style.boxShadow = '0 4px 15px rgba(0,0,0,0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            button.style.transform = 'translateY(0)';
            button.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        });
        
        document.body.appendChild(button);
    }
    
    // Обновление состояния кнопки
    function updateButtonState() {
        const button = document.getElementById('chaos-control-btn');
        if (button) {
            if (isChaosActive) {
                button.innerHTML = '🛠️ Починить сайт';
                button.style.backgroundColor = '#44aa44';
                button.style.borderColor = '#228822';
            } else {
                button.innerHTML = '🔧 Поломать сайт';
                button.style.backgroundColor = '#ff4444';
                button.style.borderColor = '#cc0000';
            }
        }
    }
    
    // Добавляем базовые стили
    function injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            #chaos-control-btn {
                font-family: Arial, sans-serif;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Горячие клавиши для отладки
    function addKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Ctrl+Shift+L - поломать сайт
            if (e.ctrlKey && e.shiftKey && e.key === 'L') {
                e.preventDefault();
                if (!isChaosActive) {
                    breakTheSite();
                }
            }
            // Ctrl+Shift+F - починить сайт
            if (e.ctrlKey && e.shiftKey && e.key === 'F') {
                e.preventDefault();
                if (isChaosActive) {
                    fixTheSite();
                }
            }
        });
    }
    
    // Инициализация
    function initialize() {
        injectStyles();
        createControlButton();
        addKeyboardShortcuts();
        
        console.log('🎯 Расширение "Контролируемый хаос" загружено!');
        console.log('💡 Используйте кнопку в правом верхнем углу или горячие клавиши:');
        console.log('   Ctrl+Shift+L - поломать сайт');
        console.log('   Ctrl+Shift+F - починить сайт');
    }
    
    // Запуск
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
}

// Запускаем контролируемый хаос
unleashControlledChaos();