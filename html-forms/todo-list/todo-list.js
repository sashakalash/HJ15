const checkboxes = document.querySelectorAll('.list-block input');
const output = document.querySelector('.list-block output');
const completeShower = document.querySelector('.list-block');

function taskComplete() {
	let countTask = 0;
	for(const checkbox of checkboxes) {
		if(checkbox.checked) {
			countTask++;
		}
	}
	if(countTask === checkboxes.length) {
		completeShower.classList.add('complete');
	} else {
		completeShower.classList.remove('complete');
	}
	output.innerHTML = countTask + ' из ' + checkboxes.length;
}

taskComplete();

checkboxes.forEach(checkbox => {
	checkbox.addEventListener('click', taskComplete)
	});


