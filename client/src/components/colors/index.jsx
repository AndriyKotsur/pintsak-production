import React, {useState} from 'react'

import {Button, Input} from 'components'

import s from './style.module.scss'

const Colors = ({colors, onChange}) => {
    const [color, setColor] = useState('grey')
    const [price, setPrice] = useState(10)

    const keys = Object.keys(colors)
    const entries = Object.entries(colors)

    const onAddColor = () => {
        if (color.length > 0 && price) {
            onChange('add', color, price)
        }
    }

    return (
        <div className={s.colors}>
            {keys && keys.length > 0 && entries.map(([key, value], index) => (
                <div key={index} className={s.colors_fields}>
                    <Input
                        type='text'
                        name='color'
                        title='Колір товару'
                        value={key}
                        styleName={s.colors_field}
                        onChange={e => setColor(e.target.value)}
                        isRequired/>
                    <Input
                        type='text'
                        name='color'
                        title='Колір товару'
                        value={value}
                        styleName={s.colors_field}
                        onChange={e => setColor(e.target.value)}
                        isRequired />
                    <Button type="button" transparent handleClick={() => onChange('remove', key)}>
                        <span className={s.colors_remove}></span>
                    </Button>
                </div>
            ))}
            <div className={s.colors_fields}>
                <Input
                    type='text'
                    name='color'
                    title='Колір товару'
                    styleName={s.colors_field}
                    onChange={e => setColor(e.target.value)}
                    isRequired/>
                <Input
                    type='number'
                    name='price'
                    title='Ціна товару'
                    styleName={s.colors_field}
                    onChange={e => setPrice(Number(e.target.value))}
                    isRequired/>
                <Button type="button" transparent handleClick={onAddColor}>
                    <span className={s.colors_add}></span>
                </Button>
            </div>
        </div>
    )
}

export default Colors