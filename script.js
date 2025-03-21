const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let frame = 0;

const animations = {
    punch: [/* Array of punch frames */],
    kick: [/* Array of kick frames */],
    backflip: [/* Array of backflip frames */],
};

function playAnimation(action) {
    const frames = animations[action];
    frame = 0;
    const interval = setInterval(() => {
        if (frame >= frames.length) {
            clearInterval(interval);
            return;
        }
        drawStickman(frames[frame]);
        frame++;
    }, 100);
}

function drawStickman(frameData) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Logic to draw stickman based on `frameData`
}
