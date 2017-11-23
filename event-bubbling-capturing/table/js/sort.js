'use strict';

function handleTableClick(event) {
    const tableHeaders = Array.from(document.querySelectorAll('th'));
    const table = document.querySelector('tr');
    tableHeaders.forEach((th) => {
        th.addEventListener('click', (event) => {
            table.dataset.sortBy = event.currentTarget.dataset.propName;         
            if (!event.currentTarget.dataset.dir || event.currentTarget.dataset.dir === '1') {
                sortTable(event.currentTarget.dataset.propName, - 1);
                event.currentTarget.dataset.dir = '- 1';
            } else if(event.currentTarget.dataset.dir === '- 1'){
                sortTable(event.currentTarget.dataset.propName, 1);
                event.currentTarget.dataset.dir = '1';
            }
        });
    });
}
