// Sets the date at the top of the screen
// Updates the date at the top of the screen
function updateDate() {
	var hijriDate = Intl.DateTimeFormat('en-US-u-ca-islamic-civil', {
		day: 'numeric',
		weekday: 'long',
		year: 'numeric',
		month: 'long',
	})
		.format(Date.now())
		.slice(0, -3);

	var gregDate = Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		year: 'numeric',
		month: 'long',
	}).format(Date.now());

	document.getElementById('aaaa').innerHTML =
		hijriDate + ' H     |     ' + gregDate + ' G';
}

// Updates the date on page load
updateDate();

// Creates new tasks
var ol = document.getElementsByTagName('ol')[0];

// Allows first intention to be generated
document.getElementById('originalAdder').addEventListener('focus', generate);

// Generates spots for new intentions
function generate(event) {
	document.activeElement.parentNode.insertAdjacentHTML(
		'afterend',
		'<div><li contenteditable="plaintext-only"></li><button tabindex="-1" onclick="deleteIntention(event)"></button></div>'
	);
	document
		.querySelector('div:last-child > li')
		.addEventListener('focus', generate);
	document
		.querySelector('div:nth-last-child(2) > li')
		.removeEventListener('focus', generate);
}

// Function to delete intentions from X
function deleteIntention(event) {
	try {var focusB = event.target.parentNode.previousSibling.getElementsByTagName('LI')[0];;} catch {console.log('broken')}
	event.target.parentNode.remove();
	console.log('i tried');
	selectText(focusB)
	console.log(focusB);
}

// shortcut to delete intentions
document.onkeydown = shortcuts;
function shortcuts(e) {
	console.log(e);
	if (document.activeElement.tagName == 'LI') {
		switch (e.key) {
			case 'Delete':
			case 'Backspace':
				
				var focusB =
					document.activeElement.parentNode.previousSibling.getElementsByTagName(
						'LI'
					)[0];

				if (document.activeElement.innerHTML == '') {
					document.activeElement.parentNode.remove();
					selectText(focusB);
					return false;
				}
				break;
			case 'Enter':
				generate();
				document.activeElement.parentNode.nextSibling.childNodes[0].focus();
				return false;
			default:
				break;
		}
	}
}

// selects text?
function selectText(text) {
	if (document.body.createTextRange) {
		var range = document.body.createTextRange();
		range.moveToElementText(text);
		range.select();
		console.log('a');
	} else if (window.getSelection) {
		var selection = window.getSelection();
		var range = document.createRange();
		try{
		range.selectNodeContents(text);
		selection.removeAllRanges();
		selection.addRange(range);
		} catch {
			console.log('broken')
		}
	}
}
