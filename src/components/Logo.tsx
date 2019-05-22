import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => (
    <Link to='/'>
        <h1 className='heading heading--level1'>Adrian's Music Collection</h1>
    </Link>
);

export { Logo };
