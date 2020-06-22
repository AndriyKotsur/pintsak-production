import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {

    return(
        <div>
            <h1>404</h1>
            <p>Сторінка, яку ви шукаєте більше не існує.</p>
            <Link to="/">Повернутися на головну сторінку</Link>
        </div>
    )
}

export default ErrorPage;