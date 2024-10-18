// Navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        document.querySelector('nav li.active').classList.remove('active');
        this.parentElement.classList.add('active');
    });
});

const mainContent = document.querySelector('.main-content');
mainContent.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (mainContent.scrollTop >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute('id');
        }
    });

    document.querySelectorAll('nav li').forEach(li => {
        li.classList.toggle('active', li.querySelector('a').getAttribute('href') === `#${currentSection}`);
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

    mouseFollower.style.left = `${followerX - 500}px`;
    mouseFollower.style.top = `${followerY - 500}px`;

    requestAnimationFrame(animate);
}

animate();

function animateSkills() {
    const skills = [
        { id: 'html', value: 80 },
        { id: 'css', value: 75 },
        { id: 'javascript', value: 75 }
    ];

    skills.forEach(skill => {
        const progressBar = document.querySelector(`#${skill.id} .skill-progress`);
        const percentageSpan = document.querySelector(`#${skill.id} .skill-percentage`);
        const startTime = performance.now();
        const duration = 1500;

        function updateSkill(currentTime) {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < duration) {
                const progress = elapsedTime / duration;
                const currentValue = Math.round(progress * skill.value);
                progressBar.style.width = `${currentValue}%`;
                percentageSpan.textContent = `${currentValue}%`;
                percentageSpan.style.opacity = 1;
                requestAnimationFrame(updateSkill);
            } else {
                progressBar.style.width = `${skill.value}%`;
                percentageSpan.textContent = `${skill.value}%`;
            }
        }

        requestAnimationFrame(updateSkill);
    });
}

const observerOptions = { threshold: 0.5 };

const experienceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSkills();
            experienceObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

experienceObserver.observe(document.getElementById('experience'));

const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animationDelay = `${index * 0.1}s`;
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-item').forEach(skill => skillsObserver.observe(skill));

function handleAnimations() {
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in, .slide-in, .scale-in').forEach(el => animationObserver.observe(el));

    document.querySelectorAll('.stagger-animation').forEach(container => {
        Array.from(container.children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.1}s`;
            animationObserver.observe(child);
        });
    });
}

handleAnimations();