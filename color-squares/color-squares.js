(function () {
    const NUM_CHILD_SQUARES = 4;

    function generateRandomColor() {
        const hue = Math.floor(Math.random() * 360 + 0);
        const saturation = Math.floor(Math.random() * 100 + 20);
        const lightness = Math.floor(Math.random() * 70 + 20);
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    function createChildSquares(event) {
        event.stopPropagation();
        const childSquareSize = Math.floor(this.clientWidth / 2) + 'px';

        for (let i = 0; i < NUM_CHILD_SQUARES; i++) {
            const childSquare = document.createElement('div');
            childSquare.className = 'child-square';
            childSquare.style.width = childSquareSize;
            childSquare.style.height = childSquareSize;
            childSquare.style.background = generateRandomColor();
            childSquare.addEventListener('click', createChildSquares);
            this.appendChild(childSquare);
        }

        this.style.background = '#fff';
    }

    const initialSquare = document.querySelector('.square');
    initialSquare.style.background = generateRandomColor();
    initialSquare.addEventListener('click', createChildSquares);
})();
