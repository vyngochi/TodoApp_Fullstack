import confetti from "canvas-confetti";

export const fireConfetti = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect();
  const x = (rect.left + rect.width / 2) / window.innerWidth;
  const y = (rect.top + rect.height / 2) / window.innerHeight;

  confetti({
    particleCount: 100,
    spread: 100,
    origin: { x, y },
    zIndex: 9999,
    colors: ["#3b82f6", "#22c55e", "#ef4444", "#eab308"],
    shapes: ["star", "circle", "square"],
  });
};
