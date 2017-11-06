var secretCounter = 0;
function showSecret(event) {
	const codeToAccessEng = [78, 69, 84, 79, 76, 79, 71, 89];//NETOLOGY
	const codeToAccessRus = [89, 84, 78, 74, 75, 74, 85, 66, 90];//НЕТОЛОГИЯ
	const secret = document.getElementsByClassName('secret')[0];
	if(event.keyCode == codeToAccessRus[secretCounter]) {
		if(secretCounter === codeToAccessRus.length - 1) {
			secret.classList.add('visible');
		}
		secretCounter++;
	} else if(event.keyCode == codeToAccessEng[secretCounter]){
		if(secretCounter === codeToAccessEng.length - 1) {
			secret.classList.add('visible');
		}
		secretCounter++;
	} else {
		return;
	}
}

function showMenu(event) {
	const menu = document.getElementsByTagName('nav')[0];
	if(event.ctrlKey && event.altKey && event.code == 'KeyT') {
		if(!menu.classList.contains('visible')) {
			menu.classList.add('visible');
			document.addEventListener('keydown', showSecret);
		} else {
			menu.classList.remove('visible');
		}
		
	}
}

document.addEventListener('keydown', showMenu);