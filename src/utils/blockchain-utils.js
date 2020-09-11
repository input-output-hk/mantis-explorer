import promisify from 'es6-promisify';
import _ from 'lodash';

export const loadTransactions = async (eth, transactionsHashes) => {
  const txsPromises = _.map(
    transactionsHashes,
    txHash => promisify(eth.getTransaction)(txHash)
  );
  const txsSettledPromises = await Promise.allSettled(txsPromises);
  const txs = _.reject(
    _.map(txsSettledPromises, result => {
      if (result.status === 'fulfilled') {
        return result.value;
      }
      return null;
    }),
    t => _.isNull(t)
  );
  return txs;
}

export const loadTransactionsFromBlock = async (eth, block) => {
  const txsPromises = _.map(
    block.transactions,
    txHash => promisify(eth.getTransaction)(txHash)
  );
  const txs = await Promise.all(txsPromises);
  return txs;
}

export const loadBlocks = (eth, blockNumber) => {
  return promisify(eth.getBlock)(blockNumber)
}

export const loadBlockWithTransactions = async (eth, blockNumber) => {
  const block = await loadBlocks(eth, blockNumber)
  if (block) {
    const transactions = await loadTransactionsFromBlock(eth, block)
    return {
      block,
      transactions
    }
  }
  return null;
}