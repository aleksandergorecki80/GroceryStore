import React, { useState } from 'react';

const Register = () => {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    });

    const onChange = (event) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();

        validateName() ? console.log('ok') : console.log('not ok')
        
        
    }

    const regExPatterns = {
        name: /^[a-z\d ]{5,25}$/i, // d - meta character for digit
        //eslint-disable-next-line
        email: /^([a-z\d\.-]+)@([a-z\d\.-]+)\.([a-z]{2,8})(\.[a-z]{5,50})?$/,
        password: /^[\w@-]{8,20}$/i, // w - any character a-z, A-Z, 0-9, including the _
      };

    const validateName = () => {
        return regExPatterns.name.test(formData.name);
    }

    return (
        <div>
            <form onSubmit={(event) => onSubmit(event)}>
                <input
                    placeholder="Nnter Name"
                    type="text"
                    name="name"
                    onChange={(event) => onChange(event)}
                >
                </input>
                <input 
                    placeholder="Enter email"
                    type="email"
                    name="email"
                    onChange={(event) => onChange(event)}
                ></input>
                <input 
                    placeholder="Enter password"
                    type="password"
                    name="password"
                    onChange={(event) => onChange(event)}
                >
                </input>
                <input 
                    placeholder="Repeat password"
                    type="password"
                    name="repeatPassword"
                    onChange={(event) => onChange(event)}
                >
                </input>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Register;