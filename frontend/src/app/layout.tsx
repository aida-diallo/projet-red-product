// layout.tsx
"use client";

import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <head>
        {/* Tu peux ajouter des métadonnées, liens vers des styles, etc. ici */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
      </head>
      <body>
        {/* Contenu principal de la page */}
        {children}
      </body>
    </html>
  );
};

export default Layout;
