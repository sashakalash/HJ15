'use strict';

function handleTableClick(event) {
    const table = document.querySelector('table');
    table.addEventListener('click', (event) => {
        if(event.target.className == 'prop__name') {
            table.dataset.sortBy = event.target.dataset.propName; 
            if (!event.target.dataset.dir || event.target.dataset.dir === '1') {
                sortTable(event.target.dataset.propName, - 1);
                event.target.dataset.dir = '- 1';
            } else if(event.target.dataset.dir === '- 1'){
                sortTable(event.target.dataset.propName, 1);
                event.target.dataset.dir = '1';
            }
        }
    });
}