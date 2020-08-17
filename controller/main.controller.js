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
   *  Get the whole account data
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
};
