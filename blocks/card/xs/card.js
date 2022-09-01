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

    

    if(isDesktop) {
        const images = document.querySelectorAll('.card__img');
        images.forEach((item) => {
            item.addEventListener('mousemove', (e) => {
                let x = e.pageX,
                y = e.pageY;
                console.log(`${x - item.offsetLeft}:${y - item.offsetTop}`);
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