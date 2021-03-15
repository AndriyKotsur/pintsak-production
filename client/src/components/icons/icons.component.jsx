import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as IconLogo } from '../../assets/svg/icon-logo.svg'
import { ReactComponent as IconMobile } from '../../assets/svg/icon-logo-mobile.svg'
import { ReactComponent as IconPhone } from '../../assets/svg/icon-phone.svg'
import { ReactComponent as IconLocation } from '../../assets/svg/icon-location.svg'
import { ReactComponent as IconClock } from '../../assets/svg/icon-clock.svg'
import { ReactComponent as IconShopping } from '../../assets/svg/icon-shopping.svg'
import { ReactComponent as IconLanguage } from '../../assets/svg/icon-language.svg'
import { ReactComponent as IconPopular } from '../../assets/svg/icon-popular.svg'
import { ReactComponent as IconDescription } from '../../assets/svg/icon-description.svg'
import { ReactComponent as IconDelivery } from '../../assets/svg/icon-delivery.svg'
import { ReactComponent as IconApproach } from '../../assets/svg/icon-approach.svg'
import { ReactComponent as IconPrice } from '../../assets/svg/icon-price.svg'
import { ReactComponent as IconCatalogue } from '../../assets/svg/icon-catalogue.svg'
import { ReactComponent as IconRefresh } from '../../assets/svg/icon-refresh.svg'
import { ReactComponent as IconPagination } from '../../assets/svg/icon-pagination.svg'
import { ReactComponent as IconCarousel } from '../../assets/svg/icon-carousel.svg'
import { ReactComponent as IconClose } from '../../assets/svg/icon-close.svg'
import { ReactComponent as IconRequest } from '../../assets/svg/icon-request.svg'
import { ReactComponent as IconCheckbox } from '../../assets/svg/icon-checkbox.svg'
import { ReactComponent as IconDropdown } from '../../assets/svg/icon-dropdown.svg'
import { ReactComponent as IconPlus } from '../../assets/svg/icon-plus.svg'
import { ReactComponent as IconMinus } from '../../assets/svg/icon-minus.svg'
import { ReactComponent as IconCart } from '../../assets/svg/icon-cart.svg'
import { ReactComponent as IconArrow } from '../../assets/svg/icon-arrow.svg'

const SVGs = {
	logo: IconLogo,
	mobile: IconMobile,
	phone: IconPhone,
	location: IconLocation,
	clock: IconClock,
	shopping: IconShopping,
	language: IconLanguage,
	popular: IconPopular,
	description: IconDescription,
	delivery: IconDelivery,
	approach: IconApproach,
	price: IconPrice,
	catalogue: IconCatalogue,
	refresh: IconRefresh,
	pagination: IconPagination,
	carousel: IconCarousel,
	close: IconClose,
	request: IconRequest,
	checkbox: IconCheckbox,
	dropdown: IconDropdown,
	plus: IconPlus,
	minus: IconMinus,
	cart: IconCart,
	arrow: IconArrow,
}

const Icon = ({ name, ...props }) => {
	const Component = SVGs[name]
	return <Component {...props} />
}

Icon.propTypes = {
	name: PropTypes.oneOf(Object.keys(SVGs)),
}

export default Icon