function getShareModal() {
	const url = window.location.href
	return nanoModal(`
    Anyone who goes to<br>
    <input id="copyURL" size="${url.length}" value="${url}"></input><br>
    will join this real-time doodle.
    `, {
		overlayClose: false,
    classes: 'shareModal',
		buttons: [{
			text: 'Copy URL to clipboard',
			handler: function(modal) {
				const urlEl = document.getElementById('copyURL')
				urlEl.select()
				document.execCommand('copy')
				document.querySelector('.nanoModalBtnPrimary').innerText = 'Copied'
			},
			primary: true
		}, {
			text: 'Cancel',
			handler: 'hide'
		}]
	})
}

function getAboutModal() {
	return nanoModal(`
    Icons from the <a href="https://thenounproject.com/" target="_blank">Noun Project</a>.<br>
    <u><a href="https://thenounproject.com/term/share/1020875/" target="_blank">Share</a></u> and <u><a href="https://thenounproject.com/term/refresh/1020876/" target="_blank">refresh</a></u> icon created by <a href="https://thenounproject.com/pundimon/" target="_blank">Pundimon</a>.<br>
    <u><a href="https://thenounproject.com/term/erasing/1005575/" target="_blank">Erase</a></u> icon modified from icon created by <a href="https://thenounproject.com/madeleine.bennett/" target="_blank">Madeleine Bennett</a>.<br>
    All icons used under the <a href="https://creativecommons.org/licenses/by/3.0/us/legalcode" target="_blank">Creative Commons</a> License.
    `, {
		overlayClose: false,
    classes: 'aboutModal',
		buttons: [{
			text: 'Close',
			handler: 'hide',
			primary: true
		}]
	})
}
