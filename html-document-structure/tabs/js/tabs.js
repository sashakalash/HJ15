
const content = document.querySelector('.tabs-content');
const articleList = content.children;
const tabsMenu = document.querySelector('.tabs-nav');
const itemNav = tabsMenu.querySelector('li');
const demoTab = itemNav.cloneNode(true);
itemNav.parentNode.removeChild(itemNav);

for(const article of articleList) {
    if(article.dataset) {
        let tab = demoTab.cloneNode(true);
        tab.firstElementChild.textContent = article.dataset.tabTitle;
        tab.firstElementChild.classList.add(article.dataset.tabIcon);
        tabsMenu.appendChild(tab);
    }
}

const menuPoints = tabsMenu.querySelectorAll('li');
const articles = tabsMenu.querySelectorAll('li > a');

for(const article of articles) {
    article.classList.add('hidden');
}

tabsMenu.firstElementChild.classList.add('ui-tabs-active');
articles[0].classList.remove('hidden');

function tabSwitcher(event) {
    if(event.target.classList.contains('ui-tabs-active')) {
        console.log('зашел')
        return;
    }
    for(const tab of menuPoints) {
        event.target.classList.remove('ui-tabs-active');
        event.target.classList.add('hidden');
    }
    this.classList.remove('hidden');
    this.classList.add('ui-tabs-active');
}


for(const tab of menuPoints) {
    console.log(tab)
    tab.addEventListener('click', tabSwitcher);
}