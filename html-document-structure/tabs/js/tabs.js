
const content = document.querySelector('.tabs-content');
const articleList = content.childNodes;
const tabsMenu = document.querySelector('.tabs-nav');
const itemNav = tabsMenu.querySelector('li');
const demoTab = itemNav.cloneNode(true);
itemNav.parentNode.removeChild(itemNav);

for(const article of articleList) {
    if(article.dataset) {
        let tab = demoTab.cloneNode(true);
        tab.firstChild.textContent = article.dataset.tabTitle;
        tab.firstChild.className = article.dataset.tabIcon;
        tabsMenu.appendChild(tab);
    }
}

content.firstElementChild.classList.add('ui-tabs-active');

const menuPoints = tabsMenu.querySelectorAll('li');
for(const tab of menuPoints) {
    tab.addEventListener('click', () => {   
       
        tab.classList.remove('hidden');
        tab.classList.add('ui-tabs-active');

    });
}

// Для того чтобы задать текущий таб добавьте ему класс ui-tabs-active. 
// При открытии текущим должен быть выбран первый таб.

// Для скрытия неактивных статей используйте класс hidden.