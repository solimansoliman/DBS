window.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('neural-bg');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let nodes = [];
    let NODE_COUNT = window.innerWidth < 600 ? 40 : 80;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    function createNodes() {
        nodes = [];
        for (let i = 0; i < NODE_COUNT; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 200) {
                    ctx.strokeStyle = `rgba(0,255,200,${1 - dist / 200})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
        for (let node of nodes) {
            ctx.beginPath();
            ctx.arc(node.x, node.y, 3, 0, 2 * Math.PI);
            ctx.fillStyle = '#00ffc8';
            ctx.fill();
        }
    }

    function update() {
        for (let node of nodes) {
            node.x += node.vx;
            node.y += node.vy;
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        }
    }

    function animate() {
        update();
        draw();
        requestAnimationFrame(animate);
    }

    window.addEventListener('resize', () => {
        NODE_COUNT = window.innerWidth < 600 ? 20 : 40;
        resizeCanvas();
        createNodes();
    });

    resizeCanvas();
    createNodes();
    animate();
});




 