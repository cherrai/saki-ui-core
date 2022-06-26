export const alert = ({
	title,
	content,
	cancelText,
	confirmText,
	autoHideDuration = 0,
	onCancel,
	onConfirm,
}: {
	title: string
	content: string
	cancelText?: string
	confirmText?: string
	autoHideDuration?: number
	onCancel?: () => void
	onConfirm?: () => void
}) => {
	const el: any = document.createElement('saki-dialog-alert')
	const api = {
		open() {
			el['title'] = title
			el['content'] = content
			el['cancelText'] = cancelText
			el['confirmText'] = confirmText
			el['autoHideDuration'] = autoHideDuration
			el.addEventListener('load', () => {
				el.open()
			})
			// el.onclose = () => {
			//   console.log("close")
			// 	document.body.removeChild(el)
			// }
			el.addEventListener('close', () => {
				document.body.removeChild(el)
			})
			el.addEventListener('cancel', () => {
				onCancel()
			})
			el.addEventListener('confirm', () => {
				onConfirm()
			})
			document.body.appendChild(el)
		},
	}
	return api
}
export const prompt = ({
	title,
	cancelText,
	confirmText,
	autoHideDuration,
	value,
	placeholder,
	onChange,
	onCancel,
	onConfirm,
}: {
	title: string
	cancelText?: string
	confirmText?: string
	autoHideDuration?: number
	value?: string
	placeholder?: string
	onChange?: (value: string) => void
	onCancel?: () => void
	onConfirm?: () => void
}) => {
	let el: any
	const api = {
		open() {
			if (el) {
				el.open()
				return
			}
			el = document.createElement('saki-dialog-prompt')
			el['title'] = title || ''
			el['value'] = value || ''
			el['placeholder'] = placeholder || ''
			el['cancelText'] = cancelText || ''
			el['confirmText'] = confirmText || ''
			el['autoHideDuration'] = autoHideDuration || 0
			// el.addEventListener('load', () => {
			// 	el.open()
			// })
			// el.onclose = () => {
			//   console.log("close")
			// 	document.body.removeChild(el)
			// }
			el.addEventListener('close', () => {
				document.body.contains(el) && document.body.removeChild(el)
				el = null
			})
			el.addEventListener('cancel', () => {
				onCancel && onCancel()
			})
			el.addEventListener('changevalue', (e: CustomEvent) => {
				onChange && onChange(e.detail)
			})
			el.addEventListener('confirm', () => {
				onConfirm && onConfirm()
			})
			document.body.appendChild(el)
		},
		close() {
			el?.close && el?.close()
		},
	}
	return api
}
