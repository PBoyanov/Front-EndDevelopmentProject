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
                controlNav: true,
                prevText: '<i class="fa fa-angle-left" aria-hidden="true">',
                nextText: '<i class="fa fa-angle-right" aria-hidden="true">'
            });
    }

    return {
        homePageFlex: homePageFlex
    }
})();

export { animations };