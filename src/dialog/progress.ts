export const progressBar = () => {
	let el: any
	const api = {
		open() {
			if (el) {
				el.open()
				return
			}
			el = document.createElement('saki-dialog-progress-bar')

			el.open()
			el.addEventListener('close', () => {
				// console.log('el', el)
				document.body.contains(el) && document.body.removeChild(el)
				el = null
			})
			document.body.appendChild(el)
		},
		setProgress({
			progress,
			tipText,
			tipColor,
			onAnimationEnd,
		}: {
			progress: number
			tipText?: string
			tipColor?: string
			onAnimationEnd?: () => void
		}) {
			el['progress'] = progress
			el['tipText'] = tipText || ''
			el['tipColor'] = tipColor || ''
			onAnimationEnd &&
				setTimeout(() => {
					onAnimationEnd()
				}, 500)
		},
		close() {
			el?.close && el?.close()
		},
	}
	return api
}
