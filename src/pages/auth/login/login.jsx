import React from 'react';
import Authlayout from '../layout';
import LoginComp from '../../../components/loginComp';

function Login({setUser}) {
    return (
        <Authlayout>
            <LoginComp setUser={setUser}/>
        </Authlayout>
    );
}

export default Login;  