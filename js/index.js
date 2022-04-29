var worksShow = document.getElementById("works-show-btn");
var worksHide = document.getElementById("works-hide-btn");
var worksItems = document.getElementById("header-menu");

function openHeaderMenu() {
    worksShow.removeAttribute('class');
    worksShow.setAttribute('class', 'hidden mx-5');
    worksHide.removeAttribute('class');
    worksHide.setAttribute('class', 'flex mx-5');
    worksItems.removeAttribute('class');
    worksItems.setAttribute('class', 'grid grid-cols-2 tablet:flex laptop:flex flex-col tablet:flex-row laptop:flex-row place-items-center justify-between items-center w-full tablet:w-5/6 laptop:w-3/5 text-white text-lg font-open-sans');
}

function closeHeaderMenu() {
    worksShow.removeAttribute('class');
    worksShow.setAttribute('class', 'flex mx-5');
    worksHide.removeAttribute('class');
    worksHide.setAttribute('class', 'hidden mx-5');
    worksItems.removeAttribute('class');
    worksItems.setAttribute('class', 'hidden grid-cols-2 tablet:flex laptop:flex flex-col tablet:flex-row laptop:flex-row place-items-center justify-between items-center w-full tablet:w-5/6 laptop:w-3/5 text-white text-lg font-open-sans');
}