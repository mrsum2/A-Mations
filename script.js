const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let frame = 0;

// Define smoother animations with finer frame transitions
const animations = {
    punch: [
        { armAngle: 90, legAngle: 90 },
        { armAngle: 60, legAngle: 90 },
        { armAngle: 30, legAngle: 90 },
        { armAngle: 0, legAngle: 90 }, // Full punch extension
        { armAngle: 30, legAngle: 90 },
        { armAngle: 60, legAngle: 90 },
        { armAngle: 90, legAngle: 90 } // Return to neutral
    ],
    kick: [
        { armAngle: 90, legAngle: 90 },
        { armAngle: 90, legAngle: 70 },
        { armAngle: 90, legAngle: 50 },
        { armAngle: 90, legAngle: 30 }, // Full kick extension
        { armAngle: 90, legAngle: 50 },
        { armAngle: 90, legAngle: 70 },
        { armAngle: 90, legAngle: 90 } // Return to neutral
    ],
    backflip: [
        { flip: 0 },
        { flip: 30 },
        { flip: 60 },
        { flip: 90 },
        { flip: 120 },
        { flip: 150 },
        { flip: 180 }, // Full flip
        { flip: 150 },
        { flip: 120 },
        { flip: 90 },
        { flip: 60 },
        { flip: 30 },
        { flip: 0 } // Return to neutral
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
        drawStickman(frames[frame], action);
        frame++;
    }, 100); // Reduced interval for smoother animation
}

// Function to draw the stickman for each frame
function drawStickman(frameData, action) {
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

    // Draw left arm (Punch uses arm angle)
    ctx.beginPath();
    ctx.moveTo(250, 100);
    ctx.lineTo(
        250 - 50 * Math.cos((frameData.armAngle * Math.PI) / 180),
        100 + 50 * Math.sin((frameData.armAngle * Math.PI) / 180)
    );
    ctx.stroke();

    // Draw right arm (Punch uses arm angle)
    ctx.beginPath();
    ctx.moveTo(250, 100);
    ctx.lineTo(
        250 + 50 * Math.cos((frameData.armAngle * Math.PI) / 180),
        100 + 50 * Math.sin((frameData.armAngle * Math.PI) / 180)
    );
    ctx.stroke();

    // Draw left leg
    ctx.beginPath();
    ctx.moveTo(250, 150);
    ctx.lineTo(
        250 - 50 * Math.cos((frameData.legAngle * Math.PI) / 180),
        150 + 50 * Math.sin((frameData.legAngle * Math.PI) / 180)
    );
    ctx.stroke();

    // Draw right leg
    ctx.beginPath();
    ctx.moveTo(250, 150);
    ctx.lineTo(
        250 + 50 * Math.cos((frameData.legAngle * Math.PI) / 180),
        150 + 50 * Math.sin((frameData.legAngle * Math.PI) / 180)
    );
    ctx.stroke();

    // Optional: Draw the rotation for backflip (if applicable)
    if (action === "backflip" && frameData.flip !== undefined) {
        ctx.save();
        ctx.translate(250, 150); // Center of rotation
        ctx.rotate((frameData.flip * Math.PI) / 180);
        ctx.translate(-250, -150);
        ctx.restore();
    }
}
