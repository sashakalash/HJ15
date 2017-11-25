
const content = document.querySelector('.tabs-content');
const articleList = content.children;
const tabsMenu = document.querySelector('.tabs-nav');
const itemNav = tabsMenu.querySelector('li');
const demoTab = itemNav.cloneNode(true);
itemNav.parentNode.removeChild(itemNav);

for (const article of articleList) {
    if (article.dataset) {
        let tab = demoTab.cloneNode(true);
        tab.firstElementChild.textContent = article.dataset.tabTitle;
        tab.firstElementChild.classList.add(article.dataset.tabIcon);
        tabsMenu.appendChild(tab);
    }
    article.classList.add('hidden');
}

const menuPoints = tabsMenu.children;
var currentTab = tabsMenu.firstElementChild;
currentTab.classList.add('ui-tabs-active');
var currentArticle = articleList[0];
currentArticle.classList.remove('hidden');

function tabSwitcher(event) {
    if (currentTab != event.currentTarget) {
        const activedTab = event.currentTarget;
        const activedArticleName = event.currentTarget.querySelector('a').textContent;
        currentTab.classList.remove('ui-tabs-active');
        currentArticle.classList.add('hidden');
        activedTab.classList.add('ui-tabs-active');
        Array.from(articleList).find(article => {
            article.classList.toggle('hidden', article.dataset.tabTitle !== activedArticleName);
            currentArticle = article;
        });
        currentTab = activedTab;
    }    
}

for (const tab of menuPoints) {
    tab.addEventListener('click', tabSwitcher);
}