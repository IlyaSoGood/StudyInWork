// import Swiper from "swiper";

export default function initCard() 
{ 
 //Module code goes here 
    
    // Модальное окно из карточки товара
    const modalRequest = $('[data-link="#modal-request"]');
    if(modalRequest.length > 0) {
        let src = document.querySelector('[data-link="#modal-request"]').getAttribute('data-link');
    
        modalRequest.fancybox({
            // Options will go here
                src: src,
                type: 'inline'
        });
    }

    // Всплытие карточки товара
    const card = {
        slider: $('[data-role="card-slider"]'),
        sliderMobile: $('[data-role="card-slider-mobile"]'),

        image: '[data-role="card-image"]',
        imageActiveClass: 'active',
        imageParent: '[data-role="card-image-parent"]',
        imageHover: $('[data-hover= \'card-hover\']'),
        item: '[data-role="card-item"]'
    },
    isMobile = $(window).width() < 768,
    isDesktop = $(window).width() + 17 > 991;

    if (isDesktop && card.imageHover) {
        card.imageHover.on('mouseenter',  function () {
            let $this = $(this);
            $this.parents('.card').css('z-index', '5');
            $this.addClass('active');
            setTimeout(function () {
                if ($this.hasClass('active')){
                    $this.addClass('hover');
                }
            },150);
        });
        card.imageHover.on('mouseleave', function () {
            let $this = $(this);
            $this.removeClass('active');
            $this.parents('.card').css('z-index', '0');
            if ($this.hasClass('hover')){
                $this.removeClass('hover');
            }
        });
    }
    
    // Создание своего слайдера Switcher внутри элемента по наведению через расчет координат курсора мыши

    // функция загрузки изображений и только после этого работа слайдера
    function loadImg(item, callback) {
        const source = item.querySelectorAll('source');
        source.forEach((solo) => {
            let dataSrcSet = solo.getAttribute('data-srcset');
            if (solo.srcset !== dataSrcSet) {
                solo.srcset = dataSrcSet;
            }
            callback();
        });
    }
    const cardSwitchers = document.querySelectorAll('[data-switcher="card-switcher"]');
    if(cardSwitchers.length > 0) {

        cardSwitchers.forEach((inner, i) => {
            const image = inner.querySelector('.card__image'),
                  imgs = inner.querySelectorAll('.card__img'); 

            //Показ 1-ой фотографии
            function hideImg() {
                imgs.forEach((item, j) => {
                    if (j !== 0) {
                        item.classList.add('hide');
                        item.classList.remove('show');
                    }
                });
            }
            hideImg();

            if(isDesktop) {
                let imageRect = image.getBoundingClientRect(),
                numArea, widthArea;
                // Расчет количества невидимых областей
                numArea = imgs.length;
                // console.log(widthArea);
                // console.log(image.clientWidth);
            
                // Создание полоски-индикатора фото
                const bottomLine = document.createElement('div');
                bottomLine.classList.add('card-image__bottom-line');
                image.append(bottomLine);
                
                const timerId = setTimeout(function () {
                    widthArea = image.clientWidth / numArea;
                    bottomLine.style.width = widthArea - 10 + 'px';
                    // console.log(`${widthArea} = ${image.clientWidth} / ${numArea}`);
                }, 1000);

                // Получение прямоугольника-координат при скролле страницы
                window.addEventListener('resize', function(){
                    imageRect = image.getBoundingClientRect();
                });
                window.addEventListener('scroll', function(){
                    imageRect = image.getBoundingClientRect();
                });

                let sliderOnMove = function () {
                    image.addEventListener('mousemove', (e) => {
                        imageRect = image.getBoundingClientRect();
                        // let x = e.pageX,
                        //     y = e.pageY;
                        // console.log(`${image.offsetLeft}:${iamge.offsetTop}`);  Смещение img относительно контейнера col
                        // console.log(`${x}:${y}`);  Положение курсора мыши относительно документа
                        // 1. Получение координат мыши относительно image
                            // 1.1 Координаты image относительно document
                        let top = imageRect.top + window.pageYOffset,
                            left = imageRect.left + window.pageXOffset,
                            // 1.2 Координаты мыши относительно img
                            relX = e.pageX - left,
                            relY = e.pageY - top;
                        // 2. Устранение отрицательных значений relX при вычитании, так как left(imageRect.left) принимает дробное большее значение (696px  - 696.3125 px)
                        if (relX < 0) {relX = 0;}
                        // 3. Проверка на соответствие области и задание идентификатора img
                        let count = Math.floor(relX/widthArea);
                        // 4. Отображение нужного img
                        function showImg() {
                            if (count < 4) {
                                imgs.forEach((item, j) => {
                                    if (j !== count) {
                                        item.classList.add('hide');
                                        item.classList.remove('show');
                                    }
                                });
                                imgs[count].classList.remove('hide');
                                imgs[count].classList.add('show');
                            }
                        }
                        showImg();                
                        // 5. Перемещение полоски-индикатора в нужную область
                        bottomLine.style.marginLeft = widthArea * count + 'px';
                        // Использование консоли при разработке функции
                            // console.log(JSON.stringify(imageRect));
                            // console.log(window.pageXOffset);
                            // console.log(`(relX)${relX} = ${e.pageX} - ${left}`);
                            // console.log(`left = ${imageRect.left} + ${window.pageXOffset}`);
                            // console.log(`${numArea}:${widthArea}`);
                            // console.log(image.clientWidth);
                            // console.log(widthArea);
                            // console.log(count);
                    });
                };
                // image.addEventListener('mouseenter', loadImg(image, sliderOnMove));
                image.addEventListener('mouseenter', sliderOnMove);
                // sliderOnMove();
            }
        });
    }

    //Переменные для swiper-слайдера
    const swiperPagination = document.querySelectorAll('.swiper-pagination');
    const swiperParents = document.querySelectorAll('[data-swiper="swiper"]');
    let swipers = [];
    window.addEventListener('DOMContentLoaded', sliderPagination);
    // window
    window.addEventListener('DOMContentLoaded', sliderSwiper);

    //Функция отображения/скрытия пагинации при смене размера окна браузера
    function sliderPagination () {
        const isMobile = window.innerWidth < 576;
        const isDesktop = window.innerWidth > 576;
        if (isMobile) {
        swiperPagination.forEach(item => {
            item.style.visibility = "visible";
        });
        } else if (isDesktop) {
        swiperPagination.forEach(item => {
            item.style.visibility = "hidden";
    
        });
        }
    }
    //Функция подстройки ширины полоски под количество изображений
    function paginationResponsive () {
        const swipers = document.querySelectorAll("[data-swiper='swiper']");
        swipers.forEach(item => {
            const swiperBullets = item.querySelectorAll('.swiper-pagination-bullet');
            swiperBullets.forEach((pagin, i) => {
                if (swiperBullets.length === 1) {pagin.style.width = 0; return;}
                pagin.style.width = ((item.offsetWidth - 20) / swiperBullets.length) + 'px';
                pagin.style.marginLeft = ((item.offsetWidth - 20) / swiperBullets.length)*i + 'px';
            });
        });
    }
    //Функция смены отображения 
    function switchViewThreeSlides (el) {
        const isMobile = window.innerWidth < 576;
        const elPagination = el.querySelector('.swiper-pagination')
        if (isMobile && !(el.classList.contains('three-slide-mod'))) {
            el.classList.add('three-slide-mod');
            elPagination.style.display = 'none';
            el.parentNode.style.overflowX = 'scroll';
            // console.log(el.classList.contains('three-slide-mod'));
        } else if(!isMobile && el.classList.contains('three-slide-mod')) {
            el.classList.remove('three-slide-mod');
            elPagination.style.display = 'block';
            el.parentNode.style.overflowX = '';
            // console.log(el.classList.contains('three-slide-mod'));
        }
    }

    //Настройки объекта-настроек слайдера
    let breaks = {
        0: {
            slidesPerView: '',
            slidesPerGroup: '',
        },
        576: {
            spaceBetween: 8,
            slidesPerView: '',
            slidesPerGroup: '',
        },
        768: {
            spaceBetween: 20
        },
        992: {
            slidesPerView: '',
            slidesPerGroup: '',
        },
        1200: {
            slidesPerView: '',
            slidesPerGroup: '',
        }
    };
    //Объект глубокой копии breaks
    let newBreaks = {};
 
    //Создание слайдеров-swiper для различных блоков на странице
    function sliderSwiper () {
        if(swiperParents.length > 0) {
            swiperParents.forEach((swiperParent, i) => {
                function swiperCreator (data, number) {
                    swipers[number] = new Swiper(swiperParent, {
                        spaceBetween: 8,
                        navigation: {
                          nextEl: swiperParent.parentNode.querySelector('.swiper__button_next'),
                          prevEl: swiperParent.parentNode.querySelector('.swiper__button_prev'),
                        },
                        pagination: {
                            el: '.swiper-pagination',
                            renderBullet: function (index, className) {
                              return '<span class="' + className + '">' + "</span>";
                            }
                        },
                        on: {
                            resize: function () {
                                paginationResponsive();
                                sliderPagination();
                            },
                          },
                        breakpoints: data
                    });
                }
                if (swiperParent.dataset.swiperType === 'oneSlide') {
                    newBreaks = JSON.parse(JSON.stringify(breaks));
                    newBreaks[0].slidesPerGroup = 1;
                    newBreaks[0].slidesPerView = 1;
                    newBreaks[576].slidesPerGroup = 1;
                    newBreaks[576].slidesPerView = 1;
                    newBreaks[992].slidesPerGroup = 1;
                    newBreaks[992].slidesPerView = 1;
                    newBreaks[1200].slidesPerGroup = 1;
                    newBreaks[1200].slidesPerView = 1;
                    swiperCreator(newBreaks, i);
                }
                if (swiperParent.dataset.swiperType === 'twoSlides') {
                    newBreaks = JSON.parse(JSON.stringify(breaks));
                    newBreaks[0].slidesPerGroup = 1;
                    newBreaks[0].slidesPerView = 1;
                    newBreaks[576].slidesPerGroup = 2;
                    newBreaks[576].slidesPerView = 2;
                    newBreaks[768].slidesPerGroup = 2;
                    newBreaks[768].slidesPerView = 2;
                    newBreaks[992].slidesPerGroup = 2;
                    newBreaks[992].slidesPerView = 2;
                    newBreaks[1200].slidesPerGroup = 2;
                    newBreaks[1200].slidesPerView = 2;
                    swiperCreator(newBreaks, i);
                }
                if(swiperParent.dataset.swiperType === 'threeSlides') {
                    newBreaks = JSON.parse(JSON.stringify(breaks));
                    newBreaks[0].slidesPerGroup = 1;
                    newBreaks[0].slidesPerView = 2;
                    newBreaks[576].slidesPerGroup = 2;
                    newBreaks[576].slidesPerView = 2;
                    newBreaks[768].slidesPerGroup = 1;
                    newBreaks[768].slidesPerView = 3;
                    newBreaks[992].spaceBetween = 0;
                    newBreaks[992].slidesPerGroup = 1;
                    newBreaks[992].slidesPerView = 3;
                    newBreaks[1200].spaceBetween = 0;
                    newBreaks[1200].slidesPerGroup = 1;
                    newBreaks[1200].slidesPerView = 3;
                    window.addEventListener('resize', () => {
                        switchViewThreeSlides(swiperParent);
                    });
                    window.addEventListener('load', () => {
                        switchViewThreeSlides(swiperParent);
                    });
                    swiperCreator(newBreaks, i);
                }  

            });
        }
    }


    







    
    //фиксированные размеры для карточек с эффектом наведения
    // function imageHoverInit() {
    //     if (isDesktop){
    //         card.imageHover.each(function () {
    //             let $this = $(this),
    //                 image = $this.find('.card__img'),
    //                 imageHeight = image.outerHeight(),
    //                 imageWidth = image.innerWidth(),
    //                 paramsHeight = $this.find('.card__params').outerHeight(),
    //                 // priceHeight = $this.find('.card__price').outerHeight(),
    //                 height = imageHeight + paramsHeight/*  + priceHeight */,
    //                 parent = $this.parent(),
    //                 padding = parseInt($this.css('padding-top')) + parseInt($this.css('padding-bottom'));
    //             parent.css('height', height + padding);
    //             image.css('width', imageWidth);
    //             // Для раскрытых карточек при наведении в слайдере
    //             if(parent.parents().hasClass('slick-list') && isDesktop){
    //                 parent.parents('.slick-list').css('overflow', 'visible');
    //             }
    //         });
    //     }
    // }
    // let actualWindowWidth;
    // $(window).on('load',function(){
    //     actualWindowWidth = $(window).width();
    // });

    // if(card.imageHover.length>0){
    //     $(window).on('load',function () {
    //         imageHoverInit();
    //     });
    //     $(window).on('resize', function(){
    //         if (actualWindowWidth !== $(window).width()) {
    //             imageHoverInit();
    //         }
    //     });
    // }
}