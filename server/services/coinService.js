function addCoins(user, amount) {
    user.coins += amount;
}

function deductCoins(user, amount) {
    if (user.coins < amount) {
        return false;
    }

    user.coins -= amount;
    return true;
}

module.exports = {
    addCoins,
    deductCoins
};
