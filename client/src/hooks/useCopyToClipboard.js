import { useState, useCallback, useEffect } from 'react'
import copy from 'copy-to-clipboard'

const useCopyToClipboard = (reserInterval = null) => {
	const [isCopied, setIsCopied] = useState(false)

	const handleCopy = useCallback(text => {
		if(typeof text === 'string' || typeof text == 'number') {
			copy(text.toString())
			setIsCopied(true)
		} else {
			setIsCopied(false)
			console.error(
				`Cannot copy typeof ${typeof text} to clipboard, must be a string or number.`,
			)
		}
	}, [])

	useEffect(() => {
		let timeout
		if(isCopied && reserInterval)
			timeout = setTimeout(() => setIsCopied(false), reserInterval)
		return () => {
			clearTimeout(timeout)
		}
	}, [isCopied, reserInterval])

	return [isCopied, handleCopy]
}

export default useCopyToClipboard
