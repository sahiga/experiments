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
            carouselWindow.scrollLeft = viewportWidth * currentCardIdx;
        }
    });

    rightArrow.addEventListener('click', () => {
        if (currentCardIdx < cards.length - 1) {
            currentCardIdx++;
            carouselWindow.scrollLeft = viewportWidth * currentCardIdx;
        }
    });

    // Keep track of the current active navigation button
    const ACTIVE_NAV_BUTTON_CLASSNAME = 'active';
    let activeNavButton = navButtons[0];

    navButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            activeNavButton.classList.remove(ACTIVE_NAV_BUTTON_CLASSNAME);
            currentCardIdx = index;
            carouselWindow.scrollLeft = viewportWidth * index;
            button.classList.add(ACTIVE_NAV_BUTTON_CLASSNAME);
            activeNavButton = button;
        });
    });
})();
