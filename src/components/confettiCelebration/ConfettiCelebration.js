import confetti from "canvas-confetti";

function ConfettiCelebration() {
  var end = Date.now() + 1.5 * 1000;
  const colors = ["#c084fc", "#e879f9", "#f472b6"];
  const shapes = ["star", "circle", "square"];

  (function frame() {
    confetti({
      particleCount: 3,
      angle: 30,
      spread: 60,
      origin: { x: 0 },
      colors,
      shapes,
    });
    confetti({
      particleCount: 3,
      angle: 150,
      spread: 60,
      origin: { x: 1 },
      colors,
      shapes,
    });
    confetti({
      particleCount: 3,
      angle: 90,
      spread: 60,
      startVelocity: 30,
      origin: { y: 1 },
      colors,
      shapes,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
}

export default ConfettiCelebration;
