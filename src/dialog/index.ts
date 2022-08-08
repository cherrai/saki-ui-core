export const alert = ({
	title,
	content,
	cancelText,
	confirmText,
	autoHideDuration = 0,
	flexButton = false,
	onCancel,
	onConfirm,
}: {
	title: string
	content: string
	cancelText?: string
	confirmText?: string
	autoHideDuration?: number
	flexButton?: boolean
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
			el['flexButton'] = flexButton
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
				onCancel?.()
			})
			el.addEventListener('confirm', () => {
				onConfirm?.()
			})
			document.body.appendChild(el)
		},
	}
	return api
}

export type Error = string

export const prompt = ({
	title,
	cancelText,
	confirmText,
	autoHideDuration,
	value,
	subtitle,
	placeholder,
	errorColor,
	errorFontSize,
	onChange,
	onCancel,
	onConfirm,
	autoCloseAfterButtonClick = true,
	flexButton = false,
}: {
	title: string
	cancelText?: string
	confirmText?: string
	autoHideDuration?: number
	value?: string
	subtitle?: string
	placeholder?: string
	errorColor?: string
	errorFontSize?: string
	onChange?: (value: string) => Error
	onCancel?: () => void
	onConfirm?: () => void
	autoCloseAfterButtonClick?: boolean
	flexButton?: boolean
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
			el['errorColor'] = errorColor || ''
			el['errorFontSize'] = errorFontSize || ''
			el['cancelText'] = cancelText || ''
			el['confirmText'] = confirmText || ''
			el['subtitle'] = subtitle || ''
			el['autoHideDuration'] = autoHideDuration || 0
			el['autoCloseAfterButtonClick'] = autoCloseAfterButtonClick
			el['flexButton'] = flexButton
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
				if (onChange) {
					const err = onChange(e.detail)
					el['error'] = err || ''
				}
			})
			el.addEventListener('confirm', () => {
				onConfirm && onConfirm()
			})
			document.body.appendChild(el)
		},
		setError(err: Error) {
			el['error'] = err
		},
		close() {
			el?.close && el?.close()
		},
	}
	return api
}

export const multiplePrompts = ({
	title,
	content,
	closeIcon,
	autoHideDuration,
	onOpen,
	onClose,
	multipleInputs,
	flexButton = false,
	buttons,
}: {
	title: string
	content?: string
	closeIcon?: boolean
	autoHideDuration?: number
	onClose?: () => void
	onOpen?: () => void

	multipleInputs: {
		label: string
		value?: string
		type?: 'Text' | 'Password' | 'Number' | 'Textarea' | 'Search'
		subtitle?: string
		placeholder?: string
		width?: string
		height?: string
		maxLength?: number
		error?: string
		errorColor?: string
		errorFontSize?: string
		disabled?: boolean
		onChange?: (value: string) => void
	}[]

	flexButton?: boolean
	buttons: {
		label: string
		text: string
		width?: string
		height?: string
		fontSize?: string
		border?: string
		bgHoverColor?: string
		bgActiveColor?: string
		bgColor?: string
		color?: string
		borderRadius?: string
		disabled?: boolean
		loading?: boolean
		loadingColor?: string
		loadingWidth?: string
		type?: 'Normal' | 'Primary'
		autoCloseAfterButtonTap?: boolean
		onTap?: () => void
	}[]
}) => {
	let el: any
	const api = {
		open() {
			if (el) {
				el.open()
				return
			}
			el = document.createElement('saki-dialog-multiple-prompts')
			el['title'] = title || ''
			el['content'] = content || ''
			el['autoHideDuration'] = autoHideDuration || 0
			el['flexButton'] = flexButton
			el['closeIcon'] = closeIcon
			el?.setMultipleInputs?.(multipleInputs)
			el?.setButton?.(buttons)
			// el.addEventListener('load', () => {
			// 	el.open()
			// })
			// el.onclose = () => {
			//   console.log("close")
			// 	document.body.removeChild(el)
			// }
			let timer: number
			el.addEventListener('close', () => {
				document.body.contains(el) && document.body.removeChild(el)
				el = null
				clearTimeout(timer)
				timer = setTimeout(() => {
					onClose?.()
				}, 50)
			})
			el.addEventListener('open', () => {
				clearTimeout(timer)
				timer = setTimeout(() => {
					onOpen?.()
				}, 50)
			})
			el.addEventListener('changevalue', (e: CustomEvent) => {
				// if (onChange) {
				// 	const err = onChange(e.detail)
				// 	el['error'] = err || ''
				// }
				multipleInputs?.some((v) => {
					if (v.label === e.detail?.label) {
						v?.onChange?.(e.detail.value)
						return true
					}
				})
			})
			el.addEventListener('tap', (e: CustomEvent) => {
				// onConfirm && onConfirm()
				buttons?.some((v) => {
					if (v.label === e.detail?.label) {
						v?.onTap?.()
						return true
					}
				})
			})
			document.body.appendChild(el)
		},
		setInput(params: { label: string; type: string; v: any }) {
			if (!multipleInputs) return
			multipleInputs.some((v) => {
				if (v.label === params.label) {
					v[params.type] = params.v
					return true
				}
			})
			el?.setMultipleInputs?.(multipleInputs)
		},
		setButton(params: { label: string; type: string; v: any }) {
			if (!buttons) return
			buttons.some((v) => {
				if (v.label === params.label) {
					v[params.type] = params.v
					return true
				}
			})
			el?.setButton?.(buttons)
		},
		close() {
			el?.close && el?.close()
		},
	}
	return api
}
