import './globals.css';
import ApolloWrapper from './ApolloWrapper';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <ApolloWrapper>
          <div className="container mx-auto px-4 py-8">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-center text-gray-800">
                Employee Directory
              </h1>
              <p className="text-center text-gray-600 mt-2">
                SPACEAI Employee Management System
              </p>
            </header>
            {children}
          </div>
        </ApolloWrapper>
      </body>
    </html>
  );
}