import { useContext } from "react";
import { EscrowContext } from "../context/escrowContext";
import Escrow from "./Escrow";

const ExistingContracts = function () {
  const escrowContext = useContext(EscrowContext);
  return (
    <div className="existing-contracts">
      <h1>Existing Deployed Contracts</h1>
      <div id='container'>
        {escrowContext.escrow.map(es => {
          return <Escrow key={es.address} {...es}/>;
        })}
      </div>
    </div>
  );
};

export default ExistingContracts;