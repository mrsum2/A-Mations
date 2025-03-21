const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
let frame = 0;

// Define smoother animations with enhanced realism
const animations = {
    punch: [
        { armUpperAngle: 45, armLowerAngle: 90, lean: 10 },
        { armUpperAngle: 30, armLowerAngle: 120, lean: 15 },
        { armUpperAngle: 0, armLowerAngle: 150, lean: 20 }, // Full extension
        { armUpperAngle: 30, armLowerAngle: 120, lean: 15 },
        { armUpperAngle: 45, armLowerAngle: 90, lean: 10 } // Return to neutral
    ],
    kick: [
        { legUpperAngle: 90, legLowerAngle: 45, lean: -10 },
        { legUpperAngle: 60, legLowerAngle: 90, lean: -15 },
        { legUpperAngle: 30, legLowerAngle: 120, lean: -20 }, // Full kick
        { legUpperAngle: 60, legLowerAngle: 90, lean: -15 },
        { legUpperAngle: 90, legLowerAngle: 45, lean: -10 } // Return to neutral
    ],
    backflip: [
        { flip: 0, lean: 0 },
        { flip: 45, lean: 10 },
        { flip: 90, lean: 15 },
        { flip: 135, lean: 20 },
        { flip: 180, lean: 25 }, // Full rotation
        { flip: 135, lean: 20 },
        { flip: 90, lean: 15 },
        { flip: 45, lean: 10 },
        { flip: 0, lean: 0 } // Return to neutral
    ],
    block: [
        { armUpperAngle: 90, armLowerAngle: 0, lean: -5 }, // Defense position
        { armUpperAngle: 90, armLowerAngle: 10, lean: -5 }, // Subtle movement
        { armUpperAngle: 90, armLowerAngle: 0, lean: -5 }
    ],
    jump: [
        { lean: 0, height: 0 },
        { lean: 0, height: 30 },
        { lean: 0, height: 60 },
        { lean: 0, height: 30 },
        { lean: 0, height: 0 }
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
    ctx.arc(250, 70 - (frameData.height || 0), 20, 0, Math.PI * 2); // Head moves during jump
    ctx.stroke();

    // Draw body with leaning
    ctx.beginPath();
    ctx.moveTo(250 + frameData.lean, 90 - (frameData.height || 0));
    ctx.lineTo(250 + frameData.lean, 150 - (frameData.height || 0));
    ctx.stroke();

    // Draw left arm (upper and lower segments)
    ctx.beginPath();
    ctx.moveTo(250 + frameData.lean, 100 - (frameData.height || 0)); // Shoulder
    const elbowX = 250 + frameData.lean - 30 * Math.cos((frameData.armUpperAngle * Math.PI) / 180);
    const elbowY = 100 - (frameData.height || 0) + 30 * Math.sin((frameData.armUpperAngle * Math.PI) / 180);
    ctx.lineTo(elbowX, elbowY); // Elbow
    ctx.lineTo(
        elbowX - 30 * Math.cos((frameData.armLowerAngle * Math.PI) / 180),
        elbowY + 30 * Math.sin((frameData.armLowerAngle * Math.PI) / 180)
    ); // Hand
    ctx.stroke();

    // Draw right arm (upper and lower segments)
    ctx.beginPath();
    ctx.moveTo(250 + frameData.lean, 100 - (frameData.height || 0));
    const elbowX2 = 250 + frameData.lean + 30 * Math.cos((frameData.armUpperAngle * Math.PI) / 180);
    const elbowY2 = 100 - (frameData.height || 0) + 30 * Math.sin((frameData.armUpperAngle * Math.PI) / 180);
    ctx.lineTo(elbowX2, elbowY2); // Elbow
    ctx.lineTo(
        elbowX2 + 30 * Math.cos((frameData.armLowerAngle * Math.PI) / 180),
        elbowY2 + 30 * Math.sin((frameData.armLowerAngle * Math.PI) / 180)
    ); // Hand
    ctx.stroke();

    // Draw legs (upper and lower segments)
    ctx.beginPath();
    ctx.moveTo(250 + frameData.lean, 150 - (frameData.height || 0)); // Hip
    const kneeX = 250 + frameData.lean - 30 * Math.cos((frameData.legUpperAngle * Math.PI) / 180);
    const kneeY = 150 - (frameData.height || 0) + 30 * Math.sin((frameData.legUpperAngle * Math.PI) / 180);
    ctx.lineTo(kneeX, kneeY); // Knee
    ctx.lineTo(
        kneeX - 30 * Math.cos((frameData.legLowerAngle * Math.PI) / 180),
        kneeY + 30 * Math.sin((frameData.legLowerAngle * Math.PI) / 180)
    ); // Foot
    ctx.stroke();

    // Repeat for right leg
    ctx.beginPath();
    ctx.moveTo(250 + frameData.lean, 150 - (frameData.height || 0));
    const kneeX2 = 250 + frameData.lean + 30 * Math.cos((frameData.legUpperAngle * Math.PI) / 180);
    const kneeY2 = 150 - (frameData.height || 0) + 30 * Math.sin((frameData.legUpperAngle * Math.PI) / 180);
    ctx.lineTo(kneeX2, kneeY2); // Knee
    ctx.lineTo(
        kneeX2 + 30 * Math.cos((frameData.legLowerAngle * Math.PI) / 180),
        kneeY2 + 30 * Math.sin((frameData.legLowerAngle * Math.PI) / 180)
    ); // Foot
    ctx.stroke();

        // Add motion blur (optional)
        if (action === "punch" || action === "kick") {
            ctx.strokeStyle = "rgba(0, 0, 0, 0.2)"; // Semi-transparent trail
            ctx.lineWidth = 2; // Thinner for a blur effect

            // Draw a blurred trail for the arm
            ctx.beginPath();
            ctx.moveTo(250 + frameData.lean, 100 - (frameData.height || 0));
            ctx.lineTo(elbowX, elbowY);
            ctx.lineTo(
                elbowX - 30 * Math.cos((frameData.armLowerAngle * Math.PI) / 180),
                elbowY + 30 * Math.sin((frameData.armLowerAngle * Math.PI) / 180)
            );
            ctx.stroke();

            // Reset stroke style and width for other parts
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
        }
    }
