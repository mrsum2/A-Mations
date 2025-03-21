const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let frame = 0; // Current animation frame

// Define animations for actions
const animations = {
    punch: [
        { armAngle: 45, legAngle: 90 },
        { armAngle: 10, legAngle: 90 }
    ],
    kick: [
        { armAngle: 90, legAngle: 45 },
        { armAngle: 90, legAngle: 10 }
    ],
    backflip: [
        { armAngle: 90, legAngle: 90, flip: 0 },
        { armAngle: 90, legAngle: 90, flip: 180 }
    ]
};

// Function to play animation
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
    }, 200);
}

// Function to draw a stickman for each frame
function drawStickman(frameData) {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

    // Draw head
    ctx.beginPath();
    ctx.arc(250, 70, 20, 0, Math.PI * 2); // Head at (250, 70)
    ctx.stroke();

    // Draw body
    ctx.beginPath();
    ctx.moveTo(250, 90); // From neck
    ctx.lineTo(250, 150); // To hips
    ctx.stroke();

    // Draw left arm
    ctx.beginPath();
    ctx.moveTo(250, 100); // From shoulder
    ctx.lineTo(250 - 50 * Math.cos((frameData.armAngle * Math.PI) / 180), 100 + 50 * Math.sin((frameData.armAngle * Math.PI) / 180)); // Rotates based on frameData
    ctx.stroke();

    // Draw right arm
    ctx.beginPath();
    ctx.moveTo(250, 100);
    ctx.lineTo(250 + 50 * Math.cos((frameData.armAngle * Math.PI) / 180), 100 + 50 * Math.sin((frameData.armAngle * Math.PI) / 180));
    ctx.stroke();

    // Draw left leg
    ctx.beginPath();
    ctx.moveTo(250, 150); // From hips
    ctx.lineTo(250 - 50 * Math.cos((frameData.legAngle * Math.PI) / 180), 150 + 50 * Math.sin((frameData.legAngle * Math.PI) / 180));
    ctx.stroke();

    // Draw right leg
    ctx.beginPath();
    ctx.moveTo(250, 150);
    ctx.lineTo(250 + 50 * Math.cos((frameData.legAngle * Math.PI) / 180), 150 + 50 * Math.sin((frameData.legAngle * Math.PI) / 180));
    ctx.stroke();
}
