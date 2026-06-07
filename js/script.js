document.addEventListener('DOMContentLoaded', () => {

    // 1. MOBIEL MENU LOGICA
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileNav.classList.toggle('open');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileNav.classList.remove('open');
            });
        });
    }

    // 2. FILTER LOGICA (CATEGORIEËN)
    const filterButtons = document.querySelectorAll('.filter-btn');
    const gridItems = document.querySelectorAll('.grid-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            gridItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hide');
                } else {
                    item.classList.add('hide');
                }
            });
        });
    });

    // 3. POP-UP LOGICA (MODAL)
    const modal = document.getElementById('projectModal');
    const closeBtn = document.getElementById('closeBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    const modalMainImg = document.getElementById('modalMainImg');
    const modalTitle = document.getElementById('modalTitle');
    const modalCategory = document.getElementById('modalCategory');
    const modalDesc = document.getElementById('modalDesc');

    let visibleProjects = [];
    let currentProjectIndex = 0;

    // GEOPTIMALISEERDE INSTELLINGSFUNCTIE VOOR MODAL
    function fillModal(element) {
        const img = element.querySelector('.project-img');
        const title = element.querySelector('.item-info h3');
        const cat = element.querySelector('.category');
        const desc = element.querySelector('.project-desc');

        if (modalMainImg) {
            modalMainImg.setAttribute('decoding', 'async');
            if (img) modalMainImg.src = img.src;
        }
        
        if (modalTitle && title) modalTitle.textContent = title.textContent;
        if (modalCategory && cat) modalCategory.textContent = cat.textContent;
        if (modalDesc && desc) modalDesc.textContent = desc.textContent;
    }

    // CLICK EVENT VOOR HET OPENEN VAN DE POP-UP
    gridItems.forEach(gridItem => {
        gridItem.addEventListener('click', function() {
            visibleProjects = Array.from(gridItems).filter(item => !item.classList.contains('hide'));
            currentProjectIndex = visibleProjects.indexOf(this);

            if (modal) modal.classList.add('active');
            fillModal(this);
        });
    });

    // SLUITEN VAN DE POP-UP
    if (closeBtn && modal) {
        closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }

    // 4. PIJLTJES NAVIGATIE
    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (visibleProjects.length > 0) {
                currentProjectIndex = (currentProjectIndex + 1) % visibleProjects.length;
                fillModal(visibleProjects[currentProjectIndex]);
            }
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (visibleProjects.length > 0) {
                currentProjectIndex = (currentProjectIndex - 1 + visibleProjects.length) % visibleProjects.length;
                fillModal(visibleProjects[currentProjectIndex]);
            }
        });
    }
});