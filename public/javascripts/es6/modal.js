function getModal() {
  const url = window.location.href
	return nanoModal(`
    Anyone who goes to<br>
    <input id="copyURL" size="${url.length}" value="${url}"></input><br>
    will join this real-time doodle.
    `, {
		overlayClose: false,
		buttons: [{
			text: "Copy URL to clipboard",
      handler: function(modal) {
        const urlEl = document.getElementById('copyURL')
        urlEl.select()
        document.execCommand('copy')
        document.querySelector('.nanoModalBtnPrimary').innerText = 'Copied'
			},
			primary: true
		}, {
			text: "Cancel",
      handler: "hide"
		}]
	})
}
