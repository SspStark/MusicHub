import axios from 'axios';

export const loginUser = async (loginData: {username: string, password: string}) => {
    const response = await fetch('https://musichub-backend-2e5p.onrender.com/login',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data?.error || 'Login Failed');
    return data;
}

export const signUpUser = async (signUpData: {email: string, username: string, password: string}) => {
    try{
        const response = await axios.post('https://musichub-backend-2e5p.onrender.com/sign-up',
            signUpData,
            {
                headers: {
                'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    }catch(error: any){
        throw new Error(error.response?.data?.error || 'Sign-up Failed');
    }
}