(function () {

    const shell = document.querySelector('.app-shell');
    const btn = document.getElementById('btnSidebarToggle');
    const overlay = document.getElementById('sidebarOverlay');

    if (!shell || !btn) return;

    const BP = 992;
    const isMobile = () => window.innerWidth <= BP;

    const openDesktop = () => {
        shell.classList.remove('is-sidebar-collapsed');
        shell.classList.remove('sidebar-closed-desktop');
        shell.classList.add('sidebar-open-desktop');
    };

    const closeDesktop = () => {
        shell.classList.add('is-sidebar-collapsed');
        shell.classList.remove('sidebar-open-desktop');
        shell.classList.add('sidebar-closed-desktop');
    };

    const openMobile = () => {
        shell.classList.add('is-sidebar-open');
    };

    const closeMobile = () => {
        shell.classList.remove('is-sidebar-open');
    };

    const toggle = () => {
        if (isMobile()) {
            shell.classList.contains('is-sidebar-open') ? closeMobile() : openMobile();
        } else {
            shell.classList.contains('is-sidebar-collapsed') ? openDesktop() : closeDesktop();
        }
    };

    // Clique no botão (desktop e mobile)
    btn.addEventListener('click', toggle);

    // Clique no overlay fecha (mobile)
    overlay?.addEventListener('click', () => {
        if (!isMobile()) return;
        closeMobile();
    });

    // ESC fecha (mobile)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMobile()) {
            closeMobile();
        }
    });

    /* Estado inicial + ajuste ao redimensionar */
    const init = () => {
        // limpa todos os estados antes de aplicar o correto
        shell.classList.remove(
            'is-sidebar-open',
            'is-sidebar-collapsed',
            'sidebar-open-desktop',
            'sidebar-closed-desktop'
        );

        if (isMobile()) {
            // ✅ mobile inicia fechado
            closeMobile();
        } else {
            // ✅ desktop inicia aberto (botão em 210px via CSS)
            openDesktop();
        }
    };

    // debounce simples para resize (evita tremedeira)
    let t = null;
    window.addEventListener('resize', () => {
        clearTimeout(t);
        t = setTimeout(init, 120);
    });

    init();

})();
