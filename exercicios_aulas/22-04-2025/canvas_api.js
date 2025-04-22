// canvas API

const canvas = document.getElementById("Canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "green";
ctx.fillRect(10, 10, 200, 200);

ctx.beginPath();
ctx.arc(100, 75, 50, 0, 2 * Math.PI);
ctx.fillStyle = "yellow";
ctx.fill();

ctx.beginPath();
ctx.moveTo(0, 0);
ctx.lineTo(300, 150);
ctx.strokeStyle = "blue";
ctx.stroke();