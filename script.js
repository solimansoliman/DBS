document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const navItems = document.querySelectorAll('#nav-links li a');
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    // القائمة الجانبية للموبايل
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function(event) {
            event.stopPropagation();
            navLinks.classList.toggle('active');
            menuToggle.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
        });

        navItems.forEach(item => {
            item.addEventListener('click', function() {
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.innerHTML = '☰';
                }
            });
        });

        document.addEventListener('click', function(event) {
            const isClickInsideNav = navLinks.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            if (!isClickInsideNav && !isClickOnToggle && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                menuToggle.innerHTML = '☰';
            }
        });
    }

    // Smooth scroll
    document.querySelectorAll('#nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // تفعيل active على أزرار القائمة عند الضغط أو عند التمرير (scroll)
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.pageYOffset;
        const offset = window.innerWidth < 900 ? 70 : 120; // هامش الهيدر للجوال والديسكتوب

        sections.forEach(section => {
            const sectionTop = section.offsetTop - offset;
            const sectionHeight = section.offsetHeight;
            const id = section.getAttribute('id');
            const link = document.querySelector(`#nav-links a[href="#${id}"]`);
            if (link) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            }
        });
    }

    // تفعيل عند التمرير
    window.addEventListener('scroll', updateActiveNavLink);

    // تفعيل عند الضغط
    document.querySelectorAll('#nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('#nav-links a').forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // استدعاء أولي عند تحميل الصفحة
    updateActiveNavLink();

    // Scroll with mouse wheel between sections
    let isScrolling = false;
    window.addEventListener('wheel', function(e) {
        if (isScrolling) return;
        const sections = Array.from(document.querySelectorAll('section[id]'));
        const current = sections.findIndex(sec => {
            const rect = sec.getBoundingClientRect();
            return rect.top <= 10 && rect.bottom > 10;
        });
        if (current === -1) return;

        let nextIndex = current;
        if (e.deltaY > 0 && current < sections.length - 1) {
            nextIndex = current + 1;
        } else if (e.deltaY < 0 && current > 0) {
            nextIndex = current - 1;
        }
        if (nextIndex !== current) {
            isScrolling = true;
            sections[nextIndex].scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => { isScrolling = false; }, 800);
            e.preventDefault();
        }
    }, { passive: false });

    // Scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});