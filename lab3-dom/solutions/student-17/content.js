'use strict'

let originalStyles = new Map(); // Храним оригинальные стили

function ChaosStyles() {
    const style = document.createElement('style');
    style.id = 'Chaos-styles';
    
    // Функция для случайных цветов
    const getRandomColor = () => {
        const primaryColors = ['#FF0000', '#FFFF00', '#0000FF', '#FF6B6B', '#FFD700', '#1E90FF'];
        return primaryColors[Math.floor(Math.random() * primaryColors.length)];
    };
    
    const getRandomRotation = () => Math.random() * 10 - 5;
    
    // Генерируем динамические значения
    const randomHue = Math.floor(Math.random() * 360);
    const chaoticRotation = getRandomRotation();
    const chaoticScale = (0.9 + Math.random() * 0.2).toFixed(2);
    
    // Случайные цвета для разных элементов
    const headerColor = getRandomColor();
    const footerColor = getRandomColor();
    const buttonColor = getRandomColor();
    const titleColor = getRandomColor();
    const navColor = getRandomColor();

    // ИСПОЛЬЗОВАНИЕ DOM-МЕТОДОВ ДЛЯ ПОИСКА ЭЛЕМЕНТОВ
    console.log("🔧 Using DOM methods to find elements:");
    
    // 1. getElementById - поиск основного контейнера
    const pageWrapper = document.getElementById('page_wrapper');
    if (pageWrapper) {
        console.log("✅ getElementById: Found page_wrapper");
        // Сохраняем оригинальный стиль перед изменением
        originalStyles.set(pageWrapper, {
            transform: pageWrapper.style.transform
        });
        // Применяем стили
        pageWrapper.style.transform = `rotate(${chaoticRotation}deg)`;
    }
    
    // 2. querySelector с СЛОЖНЫМ СЕЛЕКТОРОМ (два класса + псевдокласс)
    const complexElement = document.querySelector('.institutes_slider_box.institutes_box.cf.disable-user-actions:hover');
    if (complexElement) {
        console.log("✅ querySelector (complex): Found institutes box with complex selector");
    }
    
    // 3. querySelectorAll - поиск всех элементов навигации
    const navElements = document.querySelectorAll('nav .menu-item, .navigation li');
    console.log(`✅ querySelectorAll: Found ${navElements.length} navigation elements`);
    
    // 4. parentElement и children - работа с иерархией элементов
    const header = document.querySelector('header');
    if (header) {
        const headerParent = header.parentElement;
        if (headerParent) {
            console.log(`✅ parentElement: Header parent is ${headerParent.tagName}`);
            
            // Использование children для дочерних элементов
            const headerChildren = header.children;
            console.log(`✅ children: Header has ${headerChildren.length} direct children`);
            
            // Применяем стили к дочерним элементам и сохраняем оригиналы
            for (let i = 0; i < headerChildren.length; i++) {
                const child = headerChildren[i];
                if (child.tagName === 'NAV' || child.classList.contains('navigation')) {
                    originalStyles.set(child, {
                        transform: child.style.transform
                    });
                    child.style.transform = `skewY(${Math.random() * 3}deg)`;
                }
            }
        }
    }

    style.textContent = ` 
        /* СТИЛЬ ДЛЯ КНОПКИ */
        #Chaos-toggle {
            position: fixed !important;
            top: 20px !important;
            right: 20px !important;
            z-index: 100000 !important;
            background: #FF0000 !important;
            color: white !important;
            border: 3px solid #FFFF00 !important;
            border-radius: 5px !important;
            padding: 12px 18px !important;
            font-size: 14px !important;
            font-weight: bold !important;
            cursor: pointer !important;
            box-shadow: 
                0 0 20px #FF0000,
                0 0 40px #FFFF00 !important;
            transform: none !important;
            animation: buttonPulse 2s infinite alternate !important;
        }
        
        #Chaos-toggle:hover {
            background: #0000FF !important;
            box-shadow: 
                0 0 30px #0000FF,
                0 0 60px #FFFF00 !important;
            transform: scale(1.1) !important;
        }

        /* 1. цвет текста */
        body {
            color: #ffffffff !important;
            background: linear-gradient(45deg, #000000, #330000, #000033) !important;
            transform: rotate(${chaoticRotation}deg) !important;
            transition: all 0.5s ease !important;
        }
        
        /* 2. шапка - случайный цвет */
        header, .header, #header {
            background-color: ${headerColor} !important;
            border: none !important;
            box-shadow: 
                0 0 20px ${headerColor},
                0 0 40px ${getRandomColor()} !important;
            margin-bottom: 40px !important;
            transform: skewX(-${Math.random() * 5}deg) rotate(${getRandomRotation()}deg) !important;
            animation: headerPulse 3s infinite alternate !important;
        }
        
        /* 3. ссылки - случайные цвета */
        a {
            color: ${getRandomColor()} !important;
            text-shadow: 0 0 10px ${getRandomColor()}, 0 0 20px ${getRandomColor()}, 0 0 30px #ffffffff !important;
            font-weight: 600 !important;
            transform: scale(${chaoticScale}) !important;
            display: inline-block !important;
            transition: all 0.3s ease !important;
        }
        
        /* 4. ссылки при наведении - случайные цвета */
        a:hover {
            color: ${getRandomColor()} !important;
            background-color: ${getRandomColor()}33 !important;
            border: none !important;
            box-shadow: 
                0 0 20px ${getRandomColor()},
                0 0 40px ${getRandomColor()} !important;
            transform: scale(1.2) rotate(${getRandomRotation()}deg) !important;
        }
        
        /* 5. кнопки - случайные цвета */
        button, .button, input[type="submit"] {
            background-color: ${buttonColor} !important; 
            border-radius: 1px !important;
            border: 2px solid ${getRandomColor()} !important;
            transform: rotate(${getRandomRotation()}deg) scale(${0.9 + Math.random() * 0.3}) !important;
            transition: all 0.4s ease !important;
            color: #000 !important;
            font-weight: bold !important;
        }
        
        /* кнопки при наведении */
        button:hover, .button:hover, input[type="submit"]:hover {
            box-shadow: 
                0 0 20px ${getRandomColor()},
                0 0 40px ${getRandomColor()} !important;
            transform: rotate(${getRandomRotation() * 2}deg) scale(1.3) !important;
            background-color: ${getRandomColor()} !important;
        }
        
        /* 6. заголовки - случайные цвета */
        h1, h2, h3 {
            color: ${titleColor} !important;
            text-shadow: 0 0 10px ${getRandomColor()}, 0 0 20px ${getRandomColor()}, 0 0 30px ${getRandomColor()} !important;
            font-weight: 900 !important;
            transform: rotate(${getRandomRotation()}deg) !important;
            animation: titleGlitch 2s infinite alternate !important;
        }
        
        /* 7. футер - случайный цвет */
        footer, .footer {
            background-color: ${footerColor} !important;
            box-shadow: 
                0 0 20px ${footerColor},
                0 0 40px ${getRandomColor()} !important;
            margin-top: 40px !important;
            transform: rotate(${chaoticRotation}deg) !important;
            border-top: 10px dashed ${getRandomColor()} !important;
        }
        
        /* 8. ссылки в футере */
        footer a, .footer a, footer a:visited, .footer a:visited {
            color: ${getRandomColor()} !important;
            text-decoration: none !important;
            text-shadow: 0 0 20px ${getRandomColor()}, 0 0 30px ${getRandomColor()}, 0 0 40px ${getRandomColor()} !important;
            transform: scale(${0.8 + Math.random() * 0.4}) !important;
        }
        
        /* 9. ссылки при наведении в футере */
        footer a:hover, .footer a:hover {
            color: ${getRandomColor()} !important;
            background-color: ${getRandomColor()}33 !important;
            border: none !important;
            box-shadow: 
                0 0 20px ${getRandomColor()},
                0 0 40px ${getRandomColor()} !important;
            transform: scale(1.4) rotate(${getRandomRotation() * 3}deg) !important;
        }
        
        /* 10. навигация в шапке - случайный цвет */
        nav, .navigation, .menu {
            background-color: ${navColor} !important;
            border: none !important;
            box-shadow: 
                0 0 20px ${navColor},
                0 0 40px ${getRandomColor()} !important;
            border-radius: 0px !important;
            padding: 10px !important;
            transform: skewY(${Math.random() * 3}deg) !important;
        }
        
        /* СЛОЖНЫЙ СЕЛЕКТОР - два класса + псевдокласс */
        .institutes_slider_box.institutes_box.cf:hover {
            transform: scale(1.05) rotate(${getRandomRotation()}deg) !important;
            border: 3px solid ${getRandomColor()} !important;
        }
        
        /* Дополнительные сложные селекторы */
        .news_box .title:first-child {
            color: ${getRandomColor()} !important;
            transform: rotate(-2deg) !important;
        }
        
        .portlet-content > .portlet-body {
            background: ${getRandomColor()}11 !important;
            padding: 10px !important;
        }

        /* Остальные стили остаются без изменений */
        .login_links{
            background-color: ${getRandomColor()} !important;
            border: none !important;
            box-shadow: 
                0 0 10px ${getRandomColor()},
                0 0 20px ${getRandomColor()} !important;
            border-radius: 0px !important;
            transform: rotate(${getRandomRotation()}deg) scale(${0.8 + Math.random() * 0.4}) !important;
        }
        
        .week_parity{
            background-color: ${getRandomColor()} !important;
            border: none !important;
            box-shadow: 
                0 0 10px ${getRandomColor()},
                0 0 20px ${getRandomColor()} !important;
            border-radius: 0px !important;
            animation: weekMadness 1s infinite alternate !important;
            transform: scale(${0.7 + Math.random() * 0.6}) !important;
        }
        
        .page_wrapper {
            background: linear-gradient(${randomHue}deg, #000000, #330000, #000033) !important;
            transform: rotate(${chaoticRotation}deg) !important;
        }
        
        .main_slider_holder {
            background: linear-gradient(45deg, #000, ${getRandomColor()}33) !important;
            transform: rotate(${getRandomRotation()}deg) !important;
            border: 3px dotted ${getRandomColor()} !important;
        }
        
        .news_box {
            background: linear-gradient(135deg, #000, ${getRandomColor()}44) !important;
            transform: rotate(${getRandomRotation()}deg) !important;
            border: 2px dashed ${getRandomColor()} !important;
        }
        
        .tab_items{
            background: linear-gradient(90deg, #000000, ${getRandomColor()}22) !important;
            transform: skewX(${Math.random() * 5}deg) !important;
        }
        
        .slick-track{
            background: linear-gradient(45deg, #000000, ${getRandomColor()}33) !important;
            margin-top: 40px !important;
            transform: rotate(${getRandomRotation()}deg) !important;
            border: 4px double ${getRandomColor()} !important;
        }
        
        .portlet-content{
            background: linear-gradient(180deg, #000000, ${getRandomColor()}28) !important;
            transform: scale(${0.95 + Math.random() * 0.1}) !important;
        }
        
        .events_nav{
            background: ${getRandomColor()} !important;
            box-shadow: 
                0 0 40px ${getRandomColor()},
                0 0 80px ${getRandomColor()} !important;
            margin-top: 100px !important;
            transform: rotate(${getRandomRotation()}deg) !important;
        }
        
        .institutes_slider_box.institutes_box.cf.disable-user-actions{
            box-shadow: 
                0 0 40px ${getRandomColor()},
                0 0 80px ${getRandomColor()} !important;
            margin-bottom: 120px !important;
            background: linear-gradient(45deg, #000000, ${getRandomColor()}44) !important;
            transform: rotate(${getRandomRotation()}deg) skewX(${Math.random() * 3}deg) !important;
            border: 5px groove ${getRandomColor()} !important;
        }
        
        .slick-prev, .slick-next{
            background: ${getRandomColor()} !important;
            box-shadow: 
                0 0 40px ${getRandomColor()},
                0 0 80px ${getRandomColor()} !important;
            transform: scale(1.5) rotate(${getRandomRotation() * 4}deg) !important;
        }
        
        .inst-slide.prev.cf, .inst-slide.next{
            background: #000000ff !important;
            z-index: 9999 !important;
            opacity: 1 !important;
            width: 5% !important;
            transform: scale(${0.8 + Math.random() * 0.4}) !important;
            border: 2px solid ${getRandomColor()} !important;
        }

        /* АНИМАЦИИ */
        @keyframes buttonPulse {
            0% { 
                box-shadow: 0 0 20px #FF0000, 0 0 40px #FFFF00;
                background: #FF0000;
            }
            100% { 
                box-shadow: 0 0 30px #FFFF00, 0 0 60px #0000FF;
                background: #0000FF;
            }
        }
        
        @keyframes headerPulse {
            0% { transform: skewX(-2deg) rotate(-2deg) scale(1); }
            50% { transform: skewX(2deg) rotate(2deg) scale(1.02); }
            100% { transform: skewX(-3deg) rotate(-3deg) scale(1.01); }
        }
        
        @keyframes titleGlitch {
            0% { transform: translateX(-2px) rotate(-1deg); }
            50% { transform: translateX(2px) rotate(1deg); }
            100% { transform: translateX(-1px) rotate(-0.5deg); }
        }
        
        @keyframes weekMadness {
            0% { transform: scale(0.9) rotate(-3deg); }
            100% { transform: scale(1.1) rotate(3deg); }
        }
        
        .main_slider_holder, .news_box, .portlet-content {
            animation: randomBlink ${5 + Math.random() * 10}s infinite alternate !important;
        }
        
        @keyframes randomBlink {
            0%, 100% { opacity: 1; }
            50% { opacity: ${0.7 + Math.random() * 0.3}; }
        }
    `;
    document.head.appendChild(style);
}

function removeChaosStyles() {
    // Удаляем CSS стили
    const style = document.getElementById('Chaos-styles');
    if (style) style.remove();
    
    // Восстанавливаем оригинальные стили элементов
    originalStyles.forEach((originalStyle, element) => {
        if (originalStyle.transform !== undefined) {
            element.style.transform = originalStyle.transform;
        }
    });
    
    // Очищаем хранилище
    originalStyles.clear();
    
    // Дополнительно: принудительно сбрасываем transform у body
    document.body.style.transform = '';
    
    // Сбрасываем transform у основных контейнеров
    const pageWrapper = document.getElementById('page_wrapper');
    if (pageWrapper) {
        pageWrapper.style.transform = '';
    }
}

function createToggleButton() {
    const button = document.createElement('button'); 
    button.id = 'Chaos-toggle';
    button.innerHTML = 'ТЫ УВЕРЕН????';

    Object.assign(button.style, {
        position: 'fixed',
        top: '15px',
        right: '15px',
        zIndex: '10000',
        background: '#00FBFF',
        color: 'white',
        border: '2px solid #b6feffff',
        borderRadius: '1px',
        padding: '10px 16px',
        fontSize: '14px',
        cursor: 'pointer',
        boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
        transition: 'all 0.2s ease'
    });

    button.onclick = function() {
        const isEnabled = localStorage.getItem('ChaosStyle') === 'true';
        if (isEnabled) {
            removeChaosStyles();
            localStorage.setItem('ChaosStyle', 'false');
            button.innerHTML = 'ТЫ УВЕРЕН????';
            button.style.background = '#00FBFF';
        } else {
            ChaosStyles();
            localStorage.setItem('ChaosStyle', 'true');
            button.innerHTML = 'ДАВАЙКА ОБРАТНО';
        }
    };

    document.body.appendChild(button);
}

function init() {
    console.log("🚀 Initializing KAI Chaos Style extension");

    createToggleButton();

    // Применяем стили если они были включены
    const isEnabled = localStorage.getItem('ChaosStyle') === 'true';
    if (isEnabled) {
        ChaosStyles();
        const btn = document.getElementById('Chaos-toggle');
        if (btn) btn.innerHTML = 'ДАВАЙКА ОБРАТНО';
    }

    console.log("✅ Extension initialization complete");
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}