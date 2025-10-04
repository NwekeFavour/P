import React from 'react';
import RegisterComp from '../../../components/registerComp';
import AuthLayout from '../layout';

function Register(props) {
    return (
        <AuthLayout>
            <RegisterComp/>
        </AuthLayout>
    );
}

export default Register;