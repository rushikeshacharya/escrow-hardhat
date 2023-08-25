import { useContext } from 'react';
import { EscrowContext } from './context/escrowContext';
import CreateNewContract from './components/NewContract';
import ExistingContracts from './components/DeployedContracts';

export default function App() {
    const { provider, account } = useContext(EscrowContext);
    return provider ? (
        <main>
            <h1 className='text-center'>Decentralized Escrow Application</h1>
            <p className='text-end margin-right'>
                <strong>User Address:</strong> {account}
            </p>
            <div className='display-flex'>
                <CreateNewContract />
                <ExistingContracts />
            </div>
        </main>
    ) : (
        <div className='fixed-container'>
            <p>You need to install a browser wallet to use the DApp</p>
        </div>
    );
}
