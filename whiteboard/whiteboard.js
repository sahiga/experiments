(function () {
    // State variables
    let drawing = false;
    let eraserSelected = false;

    // Constants
    const canvas = document.getElementById('whiteboard');
    const ctx = canvas.getContext('2d');
    const canvasSize = [800, 500];
    const lineWidths = [2, 20];
    const colors = [
        'palevioletred',
        'crimson',
        'salmon',
        'coral',
        'sandybrown',
        'gold',
        'turquoise',
        'teal',
        'skyblue',
        'deepskyblue',
        'cornflowerblue',
        'slateblue',
        'navy',
        'indigo',
        'darkmagenta',
        'plum',
    ];

    // Initial state
    ctx.lineWidth = lineWidths[0];
    ctx.strokeStyle = colors[13];

    // Create color picker
    let lastSelectedIndex = 13;
    const colorPicker = document.getElementById('color-picker');
    for (let i = 0; i < colors.length; i++) {
        const colorCircle = document.createElement('div');
        colorCircle.style.background = colors[i];
        colorCircle.className = 'color-circle';
        if (i === lastSelectedIndex) {
            colorCircle.classList.add('selected');
        }

        colorCircle.addEventListener('click', function () {
            if (!eraserSelected) {
                this.classList.add('selected');
                ctx.strokeStyle = this.style.backgroundColor;
                document.getElementsByClassName('color-circle')[lastSelectedIndex].classList.remove('selected');
                lastSelectedIndex = i;
            }
        });

        colorPicker.appendChild(colorCircle);
    }

    // Enable drawing/erasing functionality
    function startPath(event) {
        drawing = true;
        const { offsetX, offsetY } = event;
        ctx.beginPath();
        ctx.moveTo(Math.floor(offsetX), Math.floor(offsetY));
    }

    function continuePath(event) {
        if (drawing) {
            const { offsetX, offsetY } = event;
            ctx.lineTo(Math.floor(offsetX), Math.floor(offsetY));
            ctx.stroke();
        }
    }

    function endPath(event) {
        const { offsetX, offsetY } = event;
        ctx.lineTo(Math.floor(offsetX), Math.floor(offsetY));
        ctx.stroke();
        drawing = false;
    }

    canvas.addEventListener('mousedown', startPath);
    canvas.addEventListener('mousemove', continuePath);
    canvas.addEventListener('mouseup', endPath);
    canvas.addEventListener('touchstart', startPath);
    canvas.addEventListener('touchmove', continuePath);
    canvas.addEventListener('touchend', endPath);

    // Clear entire canvas
    const clearButton = document.getElementById('action-clear');
    clearButton.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvasSize[0], canvasSize[1]);
    });

    const saveButton = document.getElementById('action-save');
    saveButton.addEventListener('click', function () {
        const imageURL = canvas.toDataURL();
        this.setAttribute('href', imageURL);
    });

    // Set up pencil and eraser tools
    const pencilPath = 'url(icons/pencil-alt.svg) 0 21, auto';
    const eraserPath = 'url(icons/eraser.svg) 0 21, auto';
    const pencilButton = document.getElementById('tool-pencil');
    const eraserButton = document.getElementById('tool-eraser');

    const colorCircles = document.getElementsByClassName('color-circle');

    pencilButton.setAttribute('disabled', true);

    pencilButton.addEventListener('click', () => {
        eraserSelected = false;
        colorCircles[lastSelectedIndex].classList.add('selected');
        ctx.strokeStyle = colors[lastSelectedIndex];
        ctx.lineWidth = lineWidths[0];
        eraserButton.removeAttribute('disabled');
        pencilButton.setAttribute('disabled', true);
        canvas.style.cursor = pencilPath;
    });

    eraserButton.addEventListener('click', () => {
        eraserSelected = true;
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = lineWidths[1];
        eraserButton.setAttribute('disabled', true);
        pencilButton.removeAttribute('disabled');
        colorCircles[lastSelectedIndex].classList.remove('selected');
        canvas.style.cursor = eraserPath;
    });
})();
