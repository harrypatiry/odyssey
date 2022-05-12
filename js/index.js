window.onload = function() {
    const mobile = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav-links');
    mobile.addEventListener('click', function() {
        nav.classList.toggle('nav-active');
    })
}