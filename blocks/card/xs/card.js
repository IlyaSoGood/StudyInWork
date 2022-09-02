export default function initCard() 
{ 
 //Module code goes here 
    
    // Модальное окно из карточки товара
    const src = document.querySelector('[data-link="#modal-request"]').getAttribute('data-link');

    $('[data-link="#modal-request"]').fancybox({
        // Options will go here
            src: src,
            type: 'inline'
        });

    // Всплытие карточки товара
    const card = {
            slider: $('[data-role="card-slider"]'),
            sliderMobile: $('[data-role="card-slider-mobile"]'),

            image: '[data-role="card-image"]',
            imageActiveClass: 'active',
            imageParent: '[data-role="card-image-parent"]',
            imageHover: $('[data-role = \'card-hover\']'),
            item: '[data-role="card-item"]'
        },
        isMobile = $(window).width() < 768,
        isDesktop = $(window).width() > 991;

    if (isDesktop) {
        card.imageHover.on('mouseenter',  function () {
            let $this = $(this);
            $this.parents('.card').css('z-index', '5');
            $this.addClass('active');
            setTimeout(function () {
                if ($this.hasClass('active')){
                    $this.addClass('hover');
                }
            },300);
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

    
    // Попытка создания своего слайдера внутри элемента по наведению через расчет координат курсора мыши
    if(isDesktop) {
        const cardInners = document.querySelectorAll('.card__inner');
        
        cardInners.forEach((inner, i) => {
            const image = inner.querySelector('.card__image'),
                  imgs = inner.querySelectorAll('.card__img');
            
            let imageRect = image.getBoundingClientRect();

            window.addEventListener('resize', function(){
                imageRect = image.getBoundingClientRect();
            });
            window.addEventListener('scroll', function(){
                imageRect = image.getBoundingClientRect();
            });

            const bottomLine = document.createElement('div');
            bottomLine.classList.add('card-image__bottom-line');
            image.append(bottomLine);

            image.addEventListener('mousemove', (e) => {
                // let x = e.pageX,
                //     y = e.pageY;
                // console.log(`${image.offsetLeft}:${iamge.offsetTop}`);  Смещение img относительно контейнера col
                // console.log(`${x}:${y}`);  Положение курсора мыши относительно документа


                // Получение координат мыши относительно image
                let top = imageRect.top + window.pageYOffset,
                    left = imageRect.left + window.pageXOffset,
                // Координаты мыши
                    relX = e.pageX - left,
                    relY = e.pageY - top,
                // Расчет количества невидимых областей
                    numArea = imgs.length,
                // Расчет ширины невидимой области наведения
                    widthArea = imageRect.width / numArea;
                
                // Устранение отрицательных значений relX при вычитании, так как left(imageRect.left) принимает дробное большее значение (696px  - 696.3125 px)
                if (relX < 0) {
                    relX = 0;
                }

                // Проверка на соответствие области и задание идентификатора img
                let count = Math.floor(relX/widthArea);

                // Отображение нужного img
                function showImg() {
                    imgs.forEach((item, j) => {
                        if (j !== count) {
                            item.classList.add('hide');
                            item.classList.remove('show');
                        }
                    });
                    imgs[count].classList.remove('hide');
                    imgs[count].classList.add('show');

                }
                showImg();                
                
                bottomLine.style.width = widthArea + 'px';
                bottomLine.style.marginLeft = widthArea * count + 'px';
                // bottomLine.style.width = 200px;


                // Использование консоли при разработке функции
                // console.log(JSON.stringify(imageRect));
                // console.log(`(relX)${relX} = ${e.pageX} - ${left}`);
                // console.log(`left = ${imageRect.left} + ${window.pageXOffset}`);
                // console.log(`${numArea}:${widthArea}`);
                // console.log(count);


            });
        });
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