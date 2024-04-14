import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'
import { SiweMessage } from 'siwe'
import { createSIWEConfig } from '@web3modal/siwe'

// 1. Get projectId
const projectId = '1b706ddc929e1e5cae2f575aea0f964d'

// 2. Set chains
const mainnet = {
    chainId: 1,
    name: 'Ethereum',
    currency: 'ETH',
    explorerUrl: 'https://etherscan.io',
    rpcUrl: 'https://eth-goerli.g.alchemy.com/v2/5zq9gpq2LhQb40vWq_ArwT1D7gpZkpoF'
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
        statement: 'Sign in With Ethereum.'
    })

    return message.prepareMessage()
}

async function getBackendSession() {
    return true
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
    return 'nonceTest'
}

async function signOut(){
    return true;
}


const siweConfig = createSIWEConfig({
    createMessage,
    getNonce,
    getSession,
    verifyMessage,
    signOut
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
