import React from 'react'
import PropTypes from 'prop-types';

import { ReactComponent as ArrowSort } from '../../assets/svg/arrow-sort.svg';
import { ReactComponent as Plus } from '../../assets/svg/plus.svg';
import { ReactComponent as Minus } from '../../assets/svg/minus.svg';
import { ReactComponent as Cart } from '../../assets/svg/cart.svg';

const SVGs = {
  arrowSort: ArrowSort,
  plus: Plus,
  minus: Minus,
  cart: Cart
};

const Icon = ({ name, ...props }) => {
  const Component = SVGs[name]
  return <Component {...props} />
}

Icon.propTypes = {
  name: PropTypes.oneOf(Object.keys(SVGs)),
}

export default Icon;