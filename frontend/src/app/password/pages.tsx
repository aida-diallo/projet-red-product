'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { Container, FormContainer, Input, Button, LinkContainer, Icon } from './password-style'; 
import Link from 'next/link';

const Password = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation de l'email
        if (!/\S+@\S+\.\S+/.test(email)) {
            setMessage('Veuillez entrer une adresse e-mail valide.');
            return;
        }

        setLoading(true);
        setMessage('');
    
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/forgot-password`, { email });
            console.log(response.data); // Vérifiez la réponse du backend
            setMessage(response.data.message || 'Un e-mail a été envoyé avec succès.');
        } catch (error) {
            console.log(error); // Log de l'erreur pour déboguer
            if (axios.isAxiosError(error)) {
                setMessage(error.response?.data?.message || 'Erreur lors de l\'envoi de la demande.');
            } else {
                setMessage('Erreur réseau. Veuillez réessayer plus tard.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Icon>
                <img src="/icon.png" alt="icon" />
                <h1>RED PRODUCT</h1>
            </Icon>
            <FormContainer onSubmit={handleSubmit}>
                <h2>Mot de passe oublié ?</h2>
                <p>Entrez votre adresse e-mail ci-dessous et nous vous enverrons des instructions pour modifier votre mot de passe.</p>
                <Input 
                    type="email" 
                    placeholder="Votre e-mail" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                />
                <Button type="submit" disabled={loading}>
                    {loading ? 'Envoi...' : "Envoyer l'email"}
                </Button>
            </FormContainer>
            {message && (
                <p 
                    aria-live="polite" 
                    style={{ color: message.startsWith('Erreur') ? 'red' : 'green' }}
                >
                    {message}
                </p>
            )}
            <LinkContainer>
                <div>
                    Revenir à la {' '}
                    <Link href="/login">Connexion</Link>
                </div>
            </LinkContainer>
        </Container>
    );
};

export default Password;
