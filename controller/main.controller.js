module.exports = {
  /*
   *  Reset the whole account data
   *    @param : no param
   *    @return : true
   */
  reset: function () {
    global.accounts = [];
    return true;
  },
  /*
   *  deposit the money to the account
   *    @param dest: the id of the account, destination on the request
   *    @param amount: the amount to deposit
   *
   *    @return : destination account data
   */
  deposit: function (dest, amount) {
    let __idx = global.accounts.findIndex((v) => v.id === dest);
    let balance = 0;
    if (__idx !== -1) {
      // Found
      global.accounts[__idx].balance += amount;
      balance = global.accounts[__idx].balance;
    } else {
      // Not found
      global.accounts.push({
        id: dest,
        balance: amount,
      });
      balance = amount;
    }
    return { id: dest, balance };
  },
  /*
   *  Withdraw money from the account
   *    @param origin: the id of the account, origin on the request
   *    @param amount: the amount to withdraw
   *
   *    @return : origin account data
   */
  withdraw: function (origin, amount) {
    let __idx = global.accounts.findIndex((v) => v.id === origin);
    let balance = 0;
    if (__idx === -1) {
      // Not found
      return "account_not_found";
    }
    // Found
    global.accounts[__idx].balance -= amount;
    return { id: origin, balance: global.accounts[__idx].balance };
  },
  /*
   *  Transfer money between the 2 accounts
   *    @param origin: the id of the origin account, origin on the request
   *    @param dest: the id of the destination account, destination on the request
   *    @param amount: the amount to transfer
   *
   *    @return : origin and destination account data
   */
  transfer: function (origin, dest, amount) {
    let orgIdx = global.accounts.findIndex((v) => v.id === origin);
    let destIdx = global.accounts.findIndex((v) => v.id === dest);
    let destBalance = 0;
    if (orgIdx === -1) {
      // Origin Not found
      return "account_not_found";
    }
    global.accounts[orgIdx].balance -= amount;

    if (destIdx === -1) {
      // Dest Not found
      global.accounts.push({
        id: dest,
        balance: amount,
      });
      destBalance = amount;
    } else {
      // Dest Found
      global.accounts[destIdx].balance += amount;
      destBalance = global.accounts[destIdx].balance;
    }
    return {
      origin: { id: origin, balance: global.accounts[orgIdx].balance },
      destination: { id: dest, balance: destBalance },
    };
  },
  /*
   *  Get the balance of the account
   *    @param id: the id of the account, account_id on the request
   *
   *    @return : the balance of the account
   */
  getBalance: function (id) {
    let __idx = global.accounts.findIndex((v) => v.id === id);

    if (__idx === -1) {
      // Not found
      return "account_not_found";
    }
    // Found
    return global.accounts[__idx].balance;
  },
};
