'use strict'

function Rainbow_Chaos_Mode() {
    const STYLE_ENABLED_KEY = 'RainbowChaosModeEnabled';
    const themePalette = {
        rainbow: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'],
        neon: ['#FF00FF', '#00FFFF', '#FFFF00', '#FF00FF', '#00FF00', '#FF8000'],
        pastel: ['#FFB6C1', '#87CEEB', '#98FB98', '#DDA0DD', '#F0E68C', '#FFA07A'],
        light_grey: '#F0F0F0',
        piglet: '#FFE6E6',
        red: '#FF0000'
    };
    
    let toggleButton;
    let chaosInterval = null;
    const icon_on = chrome.runtime.getURL('images/icon_on.png');
    const icon_off = chrome.runtime.getURL('images/icon_off.png');

    function getRandomColor() {
        const palette = themePalette.rainbow;
        return palette[Math.floor(Math.random() * palette.length)];
    }

    function getRandomRotation() {
        return Math.random() * 10 - 5;
    }

    function applyChaosStyle() {
        if (chaosInterval) clearInterval(chaosInterval);
        
        // Устанавливаем флаг что режим активен
        isEnabled = true;
        
        // Даем время на полную загрузку страницы
        setTimeout(() => {
            safeApplyStyles();
            applySpecificStyles();
        }, 1000);
    }

        // Основной фон - градиент
        document.body.style.background = `linear-gradient(45deg, ${getRandomColor()}, ${getRandomColor()})`;

        // Хэдер - разноцветный
        const pageWrapper = document.getElementById('page_wrapper');
        if (pageWrapper) {
            pageWrapper.style.background = `repeating-linear-gradient(45deg, ${getRandomColor()}, ${getRandomColor()} 10px, ${getRandomColor()} 10px, ${getRandomColor()} 20px)`;
            pageWrapper.style.transform = `rotate(${getRandomRotation()}deg)`;
        }

        // Меню - радуга
        const menu = document.getElementById('menu');
        if (menu) {
            menu.style.background = `linear-gradient(90deg, ${themePalette.rainbow.join(', ')})`;
            menu.style.transform = 'skewX(-5deg)';
        }

        // Пункты меню - разноцветные с анимацией
        const menuLinks = document.querySelectorAll('.lfr-nav-item > a'); 
        menuLinks.forEach((link, index) => {
            link.style.background = themePalette.rainbow[index % themePalette.rainbow.length];
            link.style.color = '#000';
            link.style.transform = `rotate(${getRandomRotation()}deg)`;
            link.style.transition = 'all 0.3s ease';
            
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'scale(1.1) rotate(0deg)';
                this.style.filter = 'brightness(1.2)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = `rotate(${getRandomRotation()}deg)`;
                this.style.filter = 'brightness(1)';
            });
        });

        // Футер - неоновый
        const footer = document.querySelector('footer');
        if (footer) {
            footer.style.background = `linear-gradient(90deg, ${getRandomColor()}, ${getRandomColor()})`;
            footer.style.borderTop = `15px dashed ${getRandomColor()}`;
            footer.style.transform = 'rotate(-1deg)';
        }

        // Основной контент - пастельные тона с наклоном
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.style.background = `linear-gradient(135deg, ${getRandomColor()}, ${getRandomColor()})`;
            mainContent.style.transform = 'rotate(0.3deg)';
            mainContent.style.padding = '20px';
            mainContent.style.borderRadius = '15px';
        }

        // Блоки с новостями - разные цвета и повороты
        const newsBlocks = document.querySelectorAll('.news_box, .main_slider_holder, .events_box, .research_box');
        newsBlocks.forEach(block => {
            block.style.background = getRandomColor();
            block.style.transform = `rotate(${getRandomRotation()}deg)`;
            block.style.margin = '10px';
            block.style.padding = '15px';
            block.style.borderRadius = '10px';
            block.style.border = `3px dotted ${getRandomColor()}`;
        });

        // Третий раздел - institutes_slider_box
        const institutesSlider = document.querySelector('.institutes_slider_box');
        if (institutesSlider) {
            const institutesParent = institutesSlider.parentElement;
            if (institutesParent) {
                institutesParent.style.borderTop = `10px solid ${themePalette.light_grey}`;
            }
            institutesSlider.style.backgroundColor = themePalette.piglet;
            const sliderContent = institutesSlider.querySelector('.slick-track');
            if (sliderContent) {
                for (const child of sliderContent.children) {
                    child.style.border = `8px double ${themePalette.red}`;
                    child.style.borderRadius = '50px';
                    child.style.padding = '10px';
                    child.style.margin = '0 10px';
                }
            }
        }

        // Переворачиваем случайные текстовые элементы
        const textElements = document.querySelectorAll('p, h1, h2, h3, span, div');
        let flippedCount = 0;
        textElements.forEach(element => {
            if (element.textContent && element.textContent.trim().length > 5 && Math.random() > 0.7 && flippedCount < 10) {
                element.style.transform = 'scaleY(-1)';
                element.style.display = 'inline-block';
                element.style.margin = '5px';
                flippedCount++;
            }
        });

        // Слайдеры - разноцветные границы
        const sliders = document.querySelectorAll('.slick-track, .institutes_slider_box');
        sliders.forEach(slider => {
            slider.style.border = `5px groove ${getRandomColor()}`;
            slider.style.borderRadius = '20px';
        });

        // Кнопки - радужные
        const buttons = document.querySelectorAll('a.kai-btn-block, button.kai-btn-block, .kai-btn');
        buttons.forEach(button => {
            button.style.background = `linear-gradient(45deg, ${getRandomColor()}, ${getRandomColor()})`;
            button.style.color = '#000';
            button.style.border = `2px solid ${getRandomColor()}`;
            button.style.transform = `rotate(${getRandomRotation()}deg)`;
        });

        // Табы в research box - анимированные
        function animateTabs() {
            const allTabs = document.querySelectorAll('.research_box .tab_items .nav a');
            allTabs.forEach(tab => {
                const isActive = tab.classList.contains('active');
                tab.style.background = isActive ? getRandomColor() : getRandomColor();
                tab.style.color = '#000';
                tab.style.border = `3px wavy ${getRandomColor()}`;
                tab.style.transform = `scale(${isActive ? 1.1 : 1}) rotate(${getRandomRotation()}deg)`;
            });
        }
        
        chaosInterval = setInterval(animateTabs, 2000);

        // Стрелки слайдера
        const arrows = document.querySelectorAll('span.slick-prev, span.slick-next');
        arrows.forEach(arrow => {
            arrow.style.background = getRandomColor();
            arrow.style.borderRadius = '50%';
            arrow.style.transform = 'scale(1.2)';
        });

        // Добавляем мерцание некоторым элементам
        const blinkElements = document.querySelectorAll('.main_slider_holder, .news_box h2, .events_box h2');
        blinkElements.forEach(element => {
            element.style.animation = 'blink 2s infinite';
        });

        // Добавляем радужный текст некоторым заголовкам
        const headings = document.querySelectorAll('h1, h2, h3');
        headings.forEach(heading => {
            heading.classList.add('rainbow-text');
        });
    }

    function removeChaosStyle() {
        if (chaosInterval) {
            clearInterval(chaosInterval);
            chaosInterval = null;
        }

        // Убираем все кастомные стили
        document.body.style.marginLeft = '';
        document.body.style.transform = '';
        document.body.style.background = '';
        
        const elementsToReset = [
            document.body,
            document.getElementById('header'),
            document.getElementById('page_wrapper'),
            document.getElementById('main-content'),
            document.getElementById('menu'),
            document.querySelector('footer'),
            document.querySelector('.main_slider_holder'),
            document.querySelector('.news_box'),
            document.querySelector('.events_box'),
            document.querySelector('.research_box'),
            document.querySelector('.institutes_slider_box'),
            ...document.querySelectorAll('.lfr-nav-item > a'),
            ...document.querySelectorAll('a.kai-btn-block, button.kai-btn-block, .kai-btn'),
            ...document.querySelectorAll('span.slick-prev, span.slick-next'),
            ...document.querySelectorAll('.research_box .tab_items .nav a'),
            ...document.querySelectorAll('p, h1, h2, h3, span, div')
        ];

        elementsToReset.forEach(element => {
            if (element) {
                element.style.cssText = '';
                element.classList.remove('rainbow-text');
            }
        });

        // Особенная обработка для institutes_slider_box
        const institutesSlider = document.querySelector('.institutes_slider_box');
        if (institutesSlider) {
            if (institutesSlider.parentElement) {
                institutesSlider.parentElement.setAttribute('style', '');
            }
            institutesSlider.setAttribute('style', '');
            const sliderContent = institutesSlider.querySelector('.slick-track');
            if (sliderContent) {
                for (const child of sliderContent.children) {
                    child.setAttribute('style', '');
                }
            }
        }
    }

    function updateToggleButton(isEnabled) {
        if (!toggleButton) return;
        
        toggleButton.innerHTML = `<img 
            src="${isEnabled ? icon_on : icon_off}" 
            style="width:100%; height:100%; border-radius:50%;" 
            alt="Переключатель хаоса">`;
        
        toggleButton.style.background = isEnabled ? 
            'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1)' : 
            '#786262';
        toggleButton.style.transform = isEnabled ? 'rotate(180deg)' : 'rotate(0deg)';
        toggleButton.style.transition = 'all 0.5s ease';
    }

    function setStyleState(isEnabled) {
        if (isEnabled) {
            applyChaosStyle();
        } else {
            removeChaosStyle();
        }
        updateToggleButton(isEnabled);
    }

    function setupChaosController() {
        if (document.getElementById('kai-chaos-toggle-btn')) return;
        
        toggleButton = document.createElement('button');
        toggleButton.id = 'kai-chaos-toggle-btn';
        
        Object.assign(toggleButton.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: '9999',
            width: '60px',
            height: '60px',
            padding: '0',
            background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
            border: '3px solid #fff',
            borderRadius: '50%',
            cursor: 'pointer',
            boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
            transition: 'all 0.5s ease'
        });

        toggleButton.addEventListener('click', () => {
            const currentState = (localStorage.getItem(STYLE_ENABLED_KEY) === 'true');
            const newState = !currentState;
            localStorage.setItem(STYLE_ENABLED_KEY, newState);
            setStyleState(newState);
        });

        toggleButton.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 6px 20px rgba(0,0,0,0.4)';
        });

        toggleButton.addEventListener('mouseleave', function() {
            const isEnabled = (localStorage.getItem(STYLE_ENABLED_KEY) === 'true');
            this.style.transform = isEnabled ? 'rotate(180deg)' : 'scale(1)';
        });

        document.body.appendChild(toggleButton);

        // Восстанавливаем состояние при загрузке
        const savedState = localStorage.getItem(STYLE_ENABLED_KEY) === 'true';
        setStyleState(savedState);
    }

    // Запускаем когда DOM готов
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', setupChaosController);
    } else {
        setupChaosController();
    }

Rainbow_Chaos_Mode();