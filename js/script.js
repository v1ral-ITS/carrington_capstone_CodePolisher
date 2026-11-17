// Shared navigation setup: locate the menu and button after the page loads.
// Checking both elements prevents errors if the shared markup changes later.
const menuButton = document.querySelector(".menu-toggle");
const navigation = document.getElementById("site-nav");

// Progressive enhancement: only collapse the mobile menu if JavaScript can
// control it. Without JavaScript, visitors can still access all five links.
if (menuButton && navigation) {
    document.documentElement.classList.add("js-enabled");

    // Menu interaction: toggle the visible class and communicate the state
    // with aria-expanded so visual and screen-reader behavior stay in sync.
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("is-open");
        menuButton.setAttribute("aria-expanded", String(isOpen));
    });

    // Escape shortcut: close an open menu and return focus to its control.
    // This gives keyboard users a predictable way to dismiss navigation.
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && navigation.classList.contains("is-open")) {
            navigation.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.focus();
        }
    });

    // Current-page indicator: compare the filename with each relative link.
    // aria-current identifies the active page while keeping HTML nav identical.
    const currentPage = location.pathname.split("/").pop() || "index.html";
    navigation.querySelectorAll("a").forEach((link) => {
        if (link.getAttribute("href") === currentPage) {
            link.setAttribute("aria-current", "page");
        }
    });
}
