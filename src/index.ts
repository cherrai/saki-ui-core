import { snackbar } from './snackbar'
import { prompt, multiplePrompts } from './dialog'
import { alert } from './dialog/alert'
import { progressBar } from './dialog/progress'
import { bindEvent } from './common/bindEvent'
import { CSR } from './common/common'
export { snackbar, prompt, progressBar, bindEvent, CSR, multiplePrompts, alert }
export default {
	snackbar,
	alert,
	prompt,
	progressBar,
	bindEvent,
	CSR,
	multiplePrompts,
}
