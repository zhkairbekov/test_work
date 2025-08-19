$(document).ready(function() {
    const menuToggle = $('#menuToggle');
    const nav = $('#nav');
    const body = $('body');
    
    menuToggle.on('click', function() {
        nav.toggleClass('site-header__nav--active');
        body.toggleClass('no-scroll');
    });
    
    // Закрытие меню при клике на ссылку
    $('.site-header__nav-link').on('click', function() {
        if (window.innerWidth <= 1100) {
            nav.removeClass('site-header__nav--active');
            body.removeClass('no-scroll');
        }
    });
    
    // Слайдер горячих событий
    let currentSlide = 0;
    const slides = [
        {
            title: "Заголовок ближайшего мероприятия",
            date: "12-15 сентября"
        },
        {
            title: "Концерт симфонического оркестра",
            date: "18-20 сентября"  
        },
        {
            title: "Выставка современного искусства",
            date: "25-30 сентября"
        }
    ];
    
    function updateSlide() {
        const slide = slides[currentSlide];
        $('.hot-events__featured-title').text(slide.title);
        $('.hot-events__featured-date').text(slide.date);
    }
    
    $('.hot-events__control-btn').on('click', function() {
        const isNext = $(this).text() === '›';
        
        if (isNext) {
            currentSlide = (currentSlide + 1) % slides.length;
        } else {
            currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        }
        
        updateSlide();
    });
    
    // Календарь
    $('.calendar__day').on('click', function() {
        $('.calendar__day').removeClass('calendar__day--active');
        $(this).addClass('calendar__day--active');
    });
    
    // Переключение месяца в календаре
    $('.calendar__month-selector').on('click', function() {
        console.log('Переключение месяца');
    });
    
    // Фильтры
    $('.filters__checkbox input').on('change', function() {
        updateFilters();
    });
    
    function updateFilters() {
        const activeFilters = [];
        $('.filters__checkbox input:checked').each(function() {
            const label = $(this).next('span').text();
            activeFilters.push(label);
        });
        
        // Обновление активных фильтров
        updateFilterPills(activeFilters);
        
        // Добавить логику фильтрации событий
        console.log('Активные фильтры:', activeFilters);
    }
    
    function updateFilterPills(filters) {
        const pillsContainer = $('.filters__pills');
        pillsContainer.find('.filters__pill:not(:last-child)').remove();
        
        filters.forEach(filter => {
            const pill = $(`<a href="#" class="filters__pill filters__pill--active">${filter}</a>`);
            pill.insertBefore(pillsContainer.find('.filters__pill:last-child'));
        });
    }
    
    // Сброс фильтров
    $('.filters__pills').on('click', 'button', function() {
        $('.filters__checkbox input').prop('checked', false);
        $('.filters__pill:not(button)').remove();
    });
    
    // Переключение табов новостей
    $('.news__tab').on('click', function() {
        const tabId = $(this).data('tab');
        
        $('.news__tab').removeClass('news__tab--active');
        $(this).addClass('news__tab--active');
        
        loadNewsContent(tabId);
    });
    
    function loadNewsContent(tabId) {
        const content = getContentByTab(tabId);
        updateNewsGrid(content);
    }
    
    function getContentByTab(tabId) {
        const contents = {
            news: [
                {
                    title: "Заголовок новости",
                    excerpt: "Краткое описание"
                },
                {
                    title: "Заголовок новости",
                    excerpt: "Краткое описание"
                },
                {
                    title: "Заголовок новости",
                    excerpt: "Краткое описание"
                }
            ],
            articles: [
                {
                    title: "Заголовок авторской статьи",
                    excerpt: "Краткое описание"
                },
                {
                    title: "Заголовок авторской статьи",
                    excerpt: "Краткое описание"
                },
                {
                    title: "Заголовок авторской статьи",
                    excerpt: "Краткое описание"
                }
            ],
            reviews: [
                {
                    title: "Заголовок меры поддержки",
                    excerpt: "Краткое описание"
                },
                {
                    title: "Заголовок меры поддержки",
                    excerpt: "Краткое описание"
                },
                {
                    title: "Заголовок меры поддержки",
                    excerpt: "Краткое описание"
                }
            ]
        };
        
        return contents[tabId] || contents.news;
    }
    
    function updateNewsGrid(content) {
        const grid = $('.news__grid');
        grid.empty();
        
        content.forEach(item => {
            const card = $(`
                <article class="news-card">
                    <div class="news-card__image"></div>
                    <div class="news-card__content">
                        <h3 class="news-card__title">${item.title}</h3>
                        <p class="news-card__excerpt">${item.excerpt}</p>
                        <a href="#" class="news-card__link">Читать подробнее</a>
                    </div>
                </article>
            `);
            grid.append(card);
        });
    }
    
    // Пагинация
    $('.pagination').on('click', '.pagination__page, .pagination__btn', function(e) {
        e.preventDefault();
        
        if ($(this).hasClass('pagination__page--active')) {
            return;
        }
        
        $('.pagination__page').removeClass('pagination__page--active');
        if ($(this).hasClass('pagination__page')) {
            $(this).addClass('pagination__page--active');
        }
        
        // Добавить логику загрузки данных для новой страницы
        console.log('Переход на страницу:', $(this).text());
    });
    
    // Сортировка
    $('.filters__sort').on('change', function() {
        const sortType = $(this).val();
        console.log('Сортировка по:', sortType);
        sortEvents(sortType);
    });
    
    function sortEvents(sortType) {        
        // Добавить логику сортировки
        console.log('Сортировка событий по:', sortType);
    }
    
    // Поиск
    let searchTimeout;
    $('.site-header__search-input').on('input', function() {
        const query = $(this).val();
        
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(function() {
            performSearch(query);
        }, 300);
    });
    
    $('.site-header__search-btn').on('click', function() {
        const query = $('.site-header__search-input').val();
        performSearch(query);
    });
    
    function performSearch(query) {
        if (query.length < 2) return;
        
        console.log('Поиск по запросу:', query);
        
        // Добавить логику поиска
    }
    
    // Lazy loading изображений
    function lazyLoadImages() {
        const images = $('img[data-src]');
        
        images.each(function() {
            const img = $(this);
            const src = img.attr('data-src');
            
            if (isInViewport(this)) {
                img.attr('src', src);
                img.removeAttr('data-src');
            }
        });
    }
    
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    // Запуск lazy loading при скролле
    $(window).on('scroll', function() {
        lazyLoadImages();
    });
    
    lazyLoadImages();
});