const toggleBtns = document.querySelectorAll('button[data-role="toggle"]');
const navToggle = document.querySelector('.toggle-button');

const handleToggleBtns = (e) => {
	const toggleBtn = e.target;
	const expanded = toggleBtn.getAttribute('aria-expanded') === 'true' ? true : false;
	const targetedNav = document.querySelector(toggleBtn.dataset.target);

	/* remove animation after entrace */
	const endEntrance = (e) => {
		e.target.classList.remove('slide-in');
		targetedNav.removeEventListener('animationend', endEntrance);
	};

	/* remove animation end hide element after exit */
	const endExit = (e) => {
		e.target.classList.remove('fade-out');
		targetedNav.removeEventListener('animationend', endExit);
		targetedNav.removeAttribute('data-expanded');
	};

	toggleBtn.setAttribute('aria-expanded', !expanded);

	/* choosing behaviour depending on whether the element is shown or hidden */
	if (!expanded) {
		/* element is shown */
		targetedNav.setAttribute('data-expanded', true);
		targetedNav.classList.add('slide-in');
		targetedNav.addEventListener('animationend', endEntrance);
	} else {
		/* element is hidden */
		targetedNav.classList.add('fade-out');
		targetedNav.addEventListener('animationend', endExit);
	}
};

const handleBodyScrollOnNavbarToggle = () => {
	const expanded = navToggle.getAttribute('aria-expanded') === 'true' ? true : false;
	document.body.style.overflowY = expanded ? 'hidden' : 'visible';
};

toggleBtns.forEach((button) => button.addEventListener('click', handleToggleBtns));
navToggle.addEventListener('click', handleBodyScrollOnNavbarToggle);
