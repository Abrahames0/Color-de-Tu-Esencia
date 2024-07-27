import React from 'react';
import Logo from "../assets/img/Logo footer 2.png";

function Footer() {
  return (
    <div>
      <footer className="bg-customColor">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center">
                <img src={Logo} className="me-4" alt="Color de tu asencia Logo" />
              </a>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-950 uppercase dark:text-dark">Legal</h2>
                <ul className="text-gray-950 dark:text-gray-950 font-medium">
                  <li className="mb-4">
                    <a href="/privacy-policy" className="hover:underline dark:text-gray-600" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="/terms-conditions" className="hover:underline dark:text-gray-600" target="_blank" rel="noopener noreferrer">Terms &amp; Conditions</a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-dark">Contacto</h2>
                <ul className="text-gray-600 dark:text-gray-400 font-medium">
                  <li className="mb-4">
                    <a href="mailto:noreplyworklinker@gmail.com" className="break-all hover:underline dark:text-gray-900">noreplyworklinker@gmail.com</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-600 sm:text-center dark:text-gray-600">
              © {new Date().getFullYear()} <a href="https://colordetuesencia.com/" className="hover:underline">Color de tu esencia</a>. Todos los derechos reservados, Página con fines educativos.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
