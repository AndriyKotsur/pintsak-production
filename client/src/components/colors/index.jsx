import React, {Fragment, useState} from 'react'

import {Button, Input} from 'components'

const Colors = ({colors, onChange}) => {
    const [color, setColor] = useState('grey')
    const [price, setPrice] = useState(10)

    const onAddColor = () => {
        if (color.length > 0 && price) {
            onChange('add', color, price)
            setColor('grey')
            setPrice(10)
        }
    }

    return (
        <Fragment>
            {Object.keys(colors) && Object.keys(colors).length > 0 && Object.entries(colors).map(([key, value], idx) => (
                <div key={idx}>
                    <input className='input' value={key} disabled/>
                    <input className='input' value={value} disabled/>
                    <button
                        type="button"
                        onClick={() => onChange('remove', key)}>
                        Видалити
                    </button>
                </div>
            ))}
            <Input
                type='text'
                name='color'
                title='Колір товару'
                onChange={e => setColor(e.target.value)}
                isRequired/>
            <Input
                type='number'
                name='price'
                title='Ціна товару'
                onChange={e => setPrice(Number(e.target.value))}
                isRequired/>
            <Button type="button" transparent handleClick={onAddColor}>Додати</Button>
        </Fragment>
    )
}

export default Colors