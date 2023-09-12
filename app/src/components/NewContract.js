import { useState, useContext, useReducer } from "react";
import { ethers } from "ethers";
import { EscrowContext } from "../context/escrowContext";
import deploy from "../utils/deployContract";
import request from "../utils/axiosRequest";

const init = {
  depositor: "",
  arbiter: "",
  recipient: "",
  amount: "",
};

const escrowReducer = (state, action) => {
  return action.type === "submit"
    ? { ...init }
    : {
        ...state,
        [action.type]: action.payload,
      };
};

export default function CreateNewContract() {
  const escrowContext = useContext(EscrowContext);
  const [newEscrow, createNewEscrow] = useReducer(escrowReducer, init);
  const [isDeploying, setIsDeploying] = useState(false);

  const inputFields = [
    {
      label: "Arbiter Address",
      id: "arbiter",
      value: newEscrow.arbiter,
    },
    {
      label: "Recipient Address",
      id: "recipient",
      value: newEscrow.recipient,
    },
    {
      label: "Deposit Amount (ETH)",
      id: "amount",
      value: newEscrow.amount,
    },
  ];

  async function newContractHandler(handle) {
    handle.preventDefault();
    setIsDeploying(true);
    try {
      const escrowContract = await deploy(
        escrowContext.signer,
        newEscrow.arbiter,
        newEscrow.recipient,
        ethers.utils.parseEther(newEscrow.amount)
      );

      const escrowInstance = {
        depositor: escrowContext.signer._address,
        address: escrowContract.address,
        arbiter: newEscrow.arbiter,
        recipient: newEscrow.recipient,
        amount: newEscrow.amount,
      };

      let res = await request.post("/createNewContract", escrowInstance);
      console.log(res);
      escrowContext.setEscrow([...escrowContext.escrow, escrowInstance]);
      createNewEscrow({ type: "submit", payload: null });
    } catch (error) {
      console.log("Error in CreateNewContract: newContractHandler", error);
      alert("neContractHandler", error.message);
    }
    setIsDeploying(false);
    console.log(isDeploying);
  }

  return (
    <form className="contract" onSubmit={newContractHandler}>
      <h1> Create New Escrow </h1>
      {inputFields.map((input) => (
        <label key={input.id}>
          {input.label}
          <input
            type="text"
            id={input.id}
            value={input.value}
            onChange={(e) => {
              createNewEscrow({
                type: e.target.id,
                payload: e.target.value,
              });
            }}
            required
          />
        </label>
      ))}
      <button
        className="button"
        id="deploy"
        type="submit"
        name="Create"
        disabled={isDeploying}
      >
        {isDeploying ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
