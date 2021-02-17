import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as IconCheckbox } from '../../assets/svg/icon-checkbox.svg'
import { ReactComponent as IconDropdown } from '../../assets/svg/icon-dropdown.svg'
import { ReactComponent as IconPlus } from '../../assets/svg/icon-plus.svg'
import { ReactComponent as IconMinus } from '../../assets/svg/icon-minus.svg'
import { ReactComponent as IconCart } from '../../assets/svg/icon-cart.svg'

const SVGs = {
	checkbox: IconCheckbox,
	dropdown: IconDropdown,
	plus: IconPlus,
	minus: IconMinus,
	cart: IconCart,
}

const Icon = ({ name, ...props }) => {
	const Component = SVGs[name]
	return <Component {...props} />
}

Icon.propTypes = {
	name: PropTypes.oneOf(Object.keys(SVGs)),
}

export default Icon