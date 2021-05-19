import React, { useState } from 'react'

import { Button, Input } from 'components'

import s from './style.module.scss'

const Colors = ({ colors, onChange }) => {
    const [color, setColor] = useState('grey')
    const [price, setPrice] = useState(10)

    const keys = Object.keys(colors)
    const entries = Object.entries(colors)

    const onAddColor = () => {
        if (color.length > 0 && price) {
            onChange('add', color, price)
            setColor('grey')
            setPrice(10)
        }
    }

    return (
        <div className={s.colors}>
            {keys && keys.length > 0 && entries.map(([key, value], index) => (
                <div key={index} className={s.colors_item}>
                    <Input
                        type='text'
                        name='color'
                        title='Колір товару'
                        value={key}
                        onChange={e => setColor(e.target.value)}
                        disabled
                        isRequired />
                    <Input
                        type='text'
                        name='color'
                        title='Колір товару'
                        value={value}
                        onChange={e => setColor(e.target.value)}
                        disabled
                        isRequired />
                    <Button type="button" transparent handleClick={() => onChange('remove', key)}>Видалити</Button>
                </div>
            ))}
            <div className={s.fields}>
                <Input
                    type='text'
                    name='color'
                    title='Колір товару'
                    styleName={s.field}
                    onChange={e => setColor(e.target.value)}
                    isRequired />
                <Input
                    type='number'
                    name='price'
                    title='Ціна товару'
                    styleName={s.field}
                    onChange={e => setPrice(Number(e.target.value))}
                    isRequired />
                <Button type="button" transparent handleClick={onAddColor}>Додати</Button>
            </div>
        </div>
    )
}

export default Colors