// Мобильное меню
const menuToggle = document.querySelector('.menu_toggle');
const nav = document.querySelector('nav');
const dropdown_link = document.querySelector('.dropdown_link')
const dropdown_content = document.querySelector('.dropdown_content')
const body = document.body
menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    body.classList.toggle('no_scrol')

});
dropdown_link.addEventListener('click', () => {
    dropdown_content.toggle('active');
})