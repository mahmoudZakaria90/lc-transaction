/**
 * @param {number} offset.
 * 
 * @return {string} Return value description.
 */

export function callAPI(offset) {
    return `https://testnet.lisk.io/api/transactions?limit=30&offset=${offset}&sort=timestamp%3Adesc&senderIdOrRecipientId=5201600508578320196L`;
}