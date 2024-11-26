//  "use client";
//  import Login from './login/pages'; 
//  import { BrowserRouter, Routes, Route } from 'react-router-dom';
//  import Register from './register/pages';
//  import Password from './password/pages';
//  import { Navigate } from 'react-router-dom';


//  const HomePage = () => {
//      return (
//          <BrowserRouter>
//          <Routes>
//              <Route path="/login" element={<Login />} />
//              <Route path="/register" element={<Register />} />
//              <Route path="/password" element={<Password />} />
//          </Routes>
//      </BrowserRouter>
//      );
//  };


//  export default HomePage;


'use client';

import React, { useReducer } from 'react';
import '../../src/app/globals.css';
import { Container, Main } from './style'; // Assurez-vous que ces styles sont définis correctement
import Register from '../app/register/pages';
import Login from '../app/login/pages';

export default function HomePage() {
    return (
        <Container>
            <Main>
                {/* <h1>Bienvenue sur le Dashboard</h1>
                
                {/* Formulaire d'inscription */}
                {/* <Register /> */} 

                {/* Formulaire de connexion */}
                <Login />
            </Main>
        </Container>
    );
};

