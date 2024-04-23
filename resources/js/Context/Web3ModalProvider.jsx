import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import { generateNonce, SiweMessage } from 'siwe'
import { createSIWEConfig } from '@web3modal/siwe'
import { router } from '@inertiajs/react';

// 1. Get projectId
const projectId = '1b706ddc929e1e5cae2f575aea0f964d'

// 2. Set chains
const mainnet = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create a metadata object
const metadata = {
    name: 'Bloak',
    description: 'Share content with Bloak',
    url: 'https://mywebsite.com', // origin must match your domain & subdomain
    icons: ['https://avatars.mywebsite.com/']
}

// 4. Create Ethers config
const ethersConfig = defaultConfig({
    /*Required*/
    metadata,

    /*Optional*/
    enableEIP6963: true, // true by default
    enableInjected: true, // true by default
    enableCoinbase: true, // true by default
    rpcUrl: 'https://eth-goerli.g.alchemy.com/v2/5zq9gpq2LhQb40vWq_ArwT1D7gpZkpoF', // used for the Coinbase SDK
    defaultChainId: 1, // used for the Coinbase SDK
})

// SIWE

function createMessage({ nonce, address, chainId }){
    const message = new SiweMessage({
        version: '1',
        domain: window.location.host,
        uri: window.location.origin,
        address,
        chainId,
        nonce,
        statement: 'Sign in With Ethereum on Bloak.io'
    })

    return message.prepareMessage()
}

async function getBackendSession() {
    try {
        const response = await axios.post(route('siwe.session'), {});
        const { isValid, address, chainId } = response.data;
        if(!isValid) return false;
        return { address, chainId };
    } catch (error) {
        console.error('Error validating message:', error);
        return false;
    }
}

async function validateMessage(data){
    try {
        const response = await axios.post(route('siwe.verify'), {
            message: data.message,
            signature: data.signature
        });
        return response.data.isValid;
    } catch (error) {
        console.error('Error validating message:', error);
        return false;
    }
}

async function getSession(){
    const session = await getBackendSession()
    if (!session) throw new Error('Failed to get session!')

    const { address, chainId } = session

    return { address, chainId }
}


async function verifyMessage({ message, signature }){
    try {
        const isValid = await validateMessage({ message, signature })

        return isValid
    } catch (error) {
        return false
    }
}

async function getNonce(){
    try {
        const response = await axios.get(route('siwe.nonce'));
        return response.data.nonce;
    } catch (error) {
        return false;
    }
}

async function signOut(){
    try {
        const response = await axios.post(route('siwe.signout'), {});
        console.log(response.data.isSignOut)
        return response.data.isSignOut;
    } catch (error) {
        console.error('Error signOut message:', error);
        return false;
    }
}


const siweConfig = createSIWEConfig({
    createMessage,
    getNonce,
    getSession,
    verifyMessage,
    signOut,
    onSignIn: (session) => {
        // Handle sign-in event
        router.reload();
        console.log('User signed in:', session);
        // You can perform additional actions here, such as updating UI, storing session data, etc.
    },
    onSignOut: () => {
        // Handle sign-out event
        router.reload();
        console.log('User signed out');
        // You can perform additional actions here, such as updating UI, clearing session data, etc.
    },
    signOutOnDisconnect: true
})


// 5. Create a Web3Modal instance
createWeb3Modal({
    ethersConfig,
    chains: [mainnet],
    projectId,
    enableAnalytics: true,
    siweConfig
})

export function Web3ModalProvider({ children }) {
    return children;
}
