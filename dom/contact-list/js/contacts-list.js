const getContacts = () => {
	try {
		const extractParseContactsList = JSON.parse(loadContacts());
		return extractParseContactsList;
	}
	catch(err) {
		console.error(err.name, err.message);
	}
};
const contacts = getContacts();
const createMarkUp =  () => {
	let markUp = '';
	const x = '<li><strong></strong></li>';
	for(let i = 0; i < contacts.length; i++) {
		markUp += x;
	}
	return markUp;
};

const contactList = document.getElementsByClassName('contacts-list')[0];
contactList.innerHTML = createMarkUp();
const profileItems = contactList.querySelectorAll('li');

contacts.forEach((profile, index) => {
	profileItems[index].dataset.email = profile.email;
	profileItems[index].dataset.phone =  profile.phone;
	profileItems[index].querySelector('strong').innerHTML = profile.name;
});