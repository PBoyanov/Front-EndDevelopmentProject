let animations = (() => {
    function homePageFlex() {
        $('#featured-flexslider').flexslider({
            slideshow: true,
            controlsContainer: '.flex-container',
            randomize: false,
            animation: 'fade',
            direction: 'horizontal',
            slideshowSpeed: 7000,
            pauseOnHover: true,
            animationSpeed: 400,
            smoothHeight: true,
            video: true,
            controlNav: false,
            prevText: '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            nextText: '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        });
    }

    function homePageCarousel() {
        $('#carousel-wrap').flexslider({
            animation: "slide",
            animationLoop: true,
            slideshow: true,
            controlsContainer: '.flex-container',
            slideshowSpeed: 4000,
            pauseOnHover: true,
            itemWidth: 300,
            itemMargin: 20,
            minItems: 3,
            maxItems: 3,
            controlNav: false,
            prevText: 'not-visible',
            nextText: 'not-visible'
        });
    }

    return {
        homePageFlex: homePageFlex,
        homePageCarousel: homePageCarousel
    }
})();

export { animations };