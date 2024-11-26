
// 'use client';
// import React, { useState } from 'react';
// import {
//     Container, FormContainer, Input, Button,
//     LinkContainer, Label, LabelText, Icon
// } from './login-style';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';



// const Login = () => {
//     const router = useRouter();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         // Envoi des données d'inscription au backend
//         axios.post('http://localhost:3001/login', { email, password })
//             .then(result => {
//                 console.log(result)
//                 if(result.data === "success") {
//                     router.push('/dashboard')
//                 }
//             })
//             .catch(err => console.error(err));
//     };

//     return (
//         <Container>
//             <Icon>
//                 <img src="/icon.png" alt="icon" />
//                 <h1>RED PRODUCT</h1>
//             </Icon>
//             <FormContainer onSubmit={handleSubmit}>
//                 <p>Connectez-vous en tant que Admin</p>
//                 <Input type="email" 
//                 placeholder="Email" 
//                 required 
//                 onChange={(e) => setEmail(e.target.value)} />
//                 <Input type="password" 
//                 placeholder="Mot de passe" 
//                 required 
//                 onChange={(e) => setPassword(e.target.value)}/>
//                 <Label>
//                     <Input type="checkbox" />
//                     <LabelText>Gardez-moi connecter</LabelText>
//                 </Label>
                
//                     <Button type="submit">Se connecter</Button>
//             </FormContainer>
//             <LinkContainer>
//                 <div>
//                     <Link href="/password">Mot de passe oublié</Link>
//                 </div>
//                 <div>
//                     Vous n'avez pas de compte ?{' '}
//                     <Link href="/register">S'inscrire</Link>
//                 </div>
//             </LinkContainer>
//         </Container>
//     );
// };

// export default Login;


'use client';
import React, { useState } from 'react';
import {
    Container, FormContainer, Input, Button,
    LinkContainer, Label, LabelText, Icon
} from './login-style';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Login = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:3001/login',
                { email, password },
                { timeout: 5000 } // Temps maximum pour éviter les blocages
            );

            console.log(response);
            if (response.data === "success") {
                router.push('/dashboard');
            } else {
                console.error('Authentication failed:', response.data);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.error('AxiosError:', error.message);
                console.error('Details:', error.response || error.request);
            } else {
                console.error('Unexpected error:', error);
            }
        }
    };

    return (
        <Container>
            <Icon>
                <img src="/icon.png" alt="icon" />
                <h1>RED PRODUCT</h1>
            </Icon>
            <FormContainer onSubmit={handleSubmit}>
                <p>Connectez-vous en tant que Admin</p>
                <Input
                    type="email"
                    placeholder="Email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder="Mot de passe"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Label>
                    <Input type="checkbox" />
                    <LabelText>Gardez-moi connecté</LabelText>
                </Label>
                <Button type="submit">Se connecter</Button>
            </FormContainer>
            <LinkContainer>
                <div>
                    <Link href="/password">Mot de passe oublié</Link>
                </div>
                <div>
                    Vous n'avez pas de compte ?{' '}
                    <Link href="/register">S'inscrire</Link>
                </div>
            </LinkContainer>
        </Container>
    );
};

export default Login;
