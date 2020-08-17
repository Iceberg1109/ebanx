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
   *    @return : true
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
   *    @param amount: the amount to deposit
   *
   *    @return : true
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
};
