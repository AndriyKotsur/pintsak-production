import React from 'react'
import PropTypes from 'prop-types'
import { ReactComponent as IconArrow } from '../../assets/svg/icon-arrow.svg'
import { ReactComponent as IconApproach } from '../../assets/svg/icon-approach.svg'
import { ReactComponent as IconCart } from '../../assets/svg/icon-cart.svg'
import { ReactComponent as IconCatalogue } from '../../assets/svg/icon-catalogue.svg'
import { ReactComponent as IconCarousel } from '../../assets/svg/icon-carousel.svg'
import { ReactComponent as IconCheckbox } from '../../assets/svg/icon-checkbox.svg'
import { ReactComponent as IconClose } from '../../assets/svg/icon-close.svg'
import { ReactComponent as IconClock } from '../../assets/svg/icon-clock.svg'
import { ReactComponent as IconDelivery } from '../../assets/svg/icon-delivery.svg'
import { ReactComponent as IconDescription } from '../../assets/svg/icon-description.svg'
import { ReactComponent as IconDropdown } from '../../assets/svg/icon-dropdown.svg'
import { ReactComponent as IconEmpty} from '../../assets/svg/icon-empty.svg'
import { ReactComponent as IconLanguage } from '../../assets/svg/icon-language.svg'
import { ReactComponent as IconLocation } from '../../assets/svg/icon-location.svg'
import { ReactComponent as IconLogo } from '../../assets/svg/icon-logo.svg'
import { ReactComponent as IconLogout } from '../../assets/svg/icon-logout.svg'
import { ReactComponent as IconMobile } from '../../assets/svg/icon-logo-mobile.svg'
import { ReactComponent as IconPagination } from '../../assets/svg/icon-pagination.svg'
import { ReactComponent as IconPhone } from '../../assets/svg/icon-phone.svg'
import { ReactComponent as IconPopular } from '../../assets/svg/icon-popular.svg'
import { ReactComponent as IconPrice } from '../../assets/svg/icon-price.svg'
import { ReactComponent as IconRefresh } from '../../assets/svg/icon-refresh.svg'
import { ReactComponent as IconRequest } from '../../assets/svg/icon-request.svg'
import { ReactComponent as IconShopping } from '../../assets/svg/icon-shopping.svg'

const SVGs = {
	arrow: IconArrow,
	approach: IconApproach,
	carousel: IconCarousel,
	checkbox: IconCheckbox,
	catalogue: IconCatalogue,
	cart: IconCart,
	clock: IconClock,
	close: IconClose,
	delivery: IconDelivery,
	description: IconDescription,
	dropdown: IconDropdown,
	empty: IconEmpty,
	language: IconLanguage,
	location: IconLocation,
	logo: IconLogo,
	logout: IconLogout,
	mobile: IconMobile,
	phone: IconPhone,
	popular: IconPopular,
	price: IconPrice,
	pagination: IconPagination,
	refresh: IconRefresh,
	request: IconRequest,
	shopping: IconShopping,
}

const Icon = ({ name, ...props }) => {
	const Component = SVGs[name]

	return <Component {...props} />
}

Icon.propTypes = {
	name: PropTypes.oneOf(Object.keys(SVGs)),
}

export default Icon
