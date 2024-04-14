import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Web3ModalProvider } from "@/Context/Web3ModalProvider.jsx";

const appName = import.meta.env.VITE_APP_NAME || 'Bloak';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <Web3ModalProvider>
                <App {...props} />
            </Web3ModalProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
