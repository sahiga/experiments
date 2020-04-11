(function () {
    const carouselWindow = document.querySelector('.carousel-window');
    const carousel = document.querySelector('.carousel');
    const cards = Array.from(document.getElementsByClassName('carousel-card'));
    const leftArrow = document.querySelector('.carousel-pointer-left');
    const rightArrow = document.querySelector('.carousel-pointer-right');
    const navButtons = Array.from(document.getElementsByClassName('nav-button'));

    // Set widths of carousel elements based on viewport width
    const viewportWidth = window.innerWidth;

    cards.forEach(card => {
        card.style.width = (viewportWidth * .6) + 'px';
    });
    carousel.style.width = viewportWidth * cards.length + 'px';
    carouselWindow.style.width = viewportWidth + 'px';

    // Attach event listeners for navigating through cards
    let currentCardIdx = 0;

    leftArrow.addEventListener('click', () => {
        if (currentCardIdx > 0) {
            currentCardIdx--;
            carouselWindow.scrollLeft -= viewportWidth;
        }
    });

    rightArrow.addEventListener('click', () => {
        if (currentCardIdx < cards.length - 1) {
            currentCardIdx++;
            carouselWindow.scrollLeft += viewportWidth;
        }
    });

    navButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            carouselWindow.scrollLeft = viewportWidth * index;
        });
    });
})();
