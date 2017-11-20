
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
        tab.firstElementChild.classList.add('article.dataset.tabIcon');
        tabsMenu.appendChild(tab);
    }
}

const menuPoints = tabsMenu.children;

for(const article of articleList) {
    article.classList.add('hidden');
}

tabsMenu.firstElementChild.classList.add('ui-tabs-active');
articleList[0].classList.remove('hidden');

function tabSwitcher(event) {
    if(event.target.classList.contains('ui-tabs-active')) {
        return;
    } 
    let currentArticleClass = this.querySelector('a').textContent; 
    for(const tab of menuPoints) {
        tab.classList.remove('ui-tabs-active');
    }
    for(const article of articleList) {
        article.classList.add('hidden');
        if(article.dataset.tabTitle === currentArticleClass) {
            article.classList.remove('hidden');
        }
    }
    this.classList.add('ui-tabs-active');
}


for(const tab of menuPoints) {
    tab.addEventListener('click', tabSwitcher);
}