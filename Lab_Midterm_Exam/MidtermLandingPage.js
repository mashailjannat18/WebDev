document.addEventListener('DOMContentLoaded', function() {
    const trigger = document.querySelector('.mega-menu-trigger');
    const megaMenu = document.querySelector('.mega-menu');
    const megaMenuContent = document.querySelector('.mega-menu-content');

    trigger.addEventListener('click', function(e) {
        e.preventDefault();
        megaMenu.classList.toggle('active');
    });

    document.addEventListener('click', function(e) {
        const isClickInsideContent = megaMenuContent.contains(e.target);
        const isClickOnTrigger = e.target === trigger;

        if (!isClickInsideContent && !isClickOnTrigger && megaMenu.classList.contains('active')) {
            megaMenu.classList.remove('active');
        }
    });

    megaMenuContent.addEventListener('click', function(e) {
        e.stopPropagation();
    });
});