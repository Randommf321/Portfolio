document.addEventListener('DOMContentLoaded', (event) => {
    const projects = document.querySelectorAll('.project-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    projects.forEach(project => {
        project.style.animationPlayState = 'paused';
        observer.observe(project);
    });
});

const mouseFollower = document.querySelector('.mouse-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  let distX = mouseX - followerX;
  let distY = mouseY - followerY;
  
  followerX += distX * 0.1;
  followerY += distY * 0.1;

  mouseFollower.style.left = followerX - 500 + 'px';
  mouseFollower.style.top = followerY - 500 + 'px';

  requestAnimationFrame(animate);
}

animate();