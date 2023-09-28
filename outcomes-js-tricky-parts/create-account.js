function createAccount(PIN, initialDeposit) {
  let balance = initialDeposit;

  return {
    checkBalance: function (inputPIN) {
      if (inputPIN !== PIN) return "Invalid PIN.";
      return `Current balance: $${balance}.`;
    },
    deposit: function (inputPIN, amount) {
      if (inputPIN !== PIN) return "Invalid PIN.";
      balance += amount;
      return `Successfully deposited $${amount}. Current balance: $${balance}.`;
    },
    withdraw: function (inputPIN, amount) {
      if (inputPIN !== PIN) return "Invalid PIN.";
      if (amount > balance)
        return "Withdrawal amount exceeds account balance. Transaction cancelled.";
      balance -= amount;
      return `Successfully withdrew $${amount}. Current balance: $${balance}.`;
    },
    changePin: function (oldPIN, newPIN) {
      if (oldPIN !== PIN) return "Invalid PIN.";
      PIN = newPIN;
      return "PIN successfully changed!";
    },
  };
}

module.exports = { createAccount };
