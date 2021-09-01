import React from 'react';

const Confirmation = () => {
    const url = window.location.href;
    const worlds = url.split('/');
    const token = worlds[worlds.length-1];
    return (
        <div>
            confirmation token : {token}
        </div>
    );
};

export default Confirmation;