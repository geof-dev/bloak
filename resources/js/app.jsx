import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Web3ModalProvider } from "@/Context/Web3ModalProvider.jsx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Flowbite } from "flowbite-react";

const appName = import.meta.env.VITE_APP_NAME || 'Bloak';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Web3ModalProvider>
                <Flowbite>
                    <App {...props} />
                    <ToastContainer />
                </Flowbite>
            </Web3ModalProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
