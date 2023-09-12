import { useState, useEffect, useCallback, useContext } from "react";
import { EscrowContext } from "../context/escrowContext";
import contractInstance from "../utils/getContractInstance";

export default function Escrow({ address, arbiter, recipient, amount }) {
  const { signer } = useContext(EscrowContext);
  const [isApproving, setIsApproving] = useState(false);
  const [isApproved, setApproved] = useState(false);
  const checkState = useCallback(async () => {
    const escrowContract = contractInstance(address, signer);
    const approved = await escrowContract.isApproved();
    return { escrowContract, approved };
  }, [address, signer]);

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      console.log('Contract addresss:', address);
      console.log('Contract signer:', signer);

      const escrowContract = contractInstance(address, signer);
      const tx = await escrowContract.connect(signer).approve();
      let res = await tx.wait();
      console.log('res', res);
      setApproved(true);
    } catch (err) {
      console.log('Error in Escrow component: handleApprove', err);
      alert('handleApprove: -', err.message);
    }
    setIsApproving(false);
  };

  useEffect(() => {
    (async () => {
      const { approved } = await checkState();
      setApproved(approved);
    })();
  }, [checkState]);

  return (
    <div className="existing-contract">
      <ul className="fields">
        <li>
          <div> Arbiter </div>
          <div> {arbiter} </div>
        </li>
        <li>
          <div> Recipient </div>
          <div> {recipient} </div>
        </li>
        <li>
          <div> Value </div>
          <div> {amount} </div>
        </li>
        {!isApproved ? (
          <button
            className="button"
            id={address}
            onClick={async (e) => {
              e.preventDefault();
              await handleApprove();
            }}
            disabled={isApproving}
          >
            {isApproving ? "Processing..." : "Approve"}
          </button>
        ) : (
          <div id="approved" className="approved">
            <p className="approved-el">
              <strong>Approved Successfully!</strong>
            </p>
          </div>
        )}
      </ul>
    </div>
  );
}
