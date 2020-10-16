import React, { useState, useEffect } from 'react';
import promisify from 'es6-promisify';
import _ from 'lodash';
import { AsyncBlocksTable } from '../blockchain/BlocksTable';
import { loadBlocks } from '../../utils/blockchain-utils';

const MAX_HISTORY = 50;

const Main = ({ web3: { eth }}) => {

  const [ latestBlocks, setLatestBlocks ] = useState({
    blocks: [],
    loading: true,
    error: false
  });
  const [ pendingTxs, setPendingTxs ] = useState({
    transactions: [],
    loading: true,
    error: false
  })

  const getLatestBlockKnown = () => {
    if (latestBlocks.blocks.length === 0) return 0;
    else return latestBlocks.blocks[0].number;
  }

  const getLatestBlocks = async () => {
    const latestBlockNumber = await promisify(eth.getBlockNumber)();
    const latestBlockKnown = getLatestBlockKnown();
    const fromBlock = Math.max(latestBlockNumber - MAX_HISTORY, latestBlockKnown);    
    return _.compact(
      await Promise.all(
        // Range doesn't influde the end!
        _.range(latestBlockNumber, fromBlock - 1, -1).map(blockNumber => {
          return loadBlocks(eth, blockNumber)
        })
      )
    )
  }

  // FIXME: Query for pending txs!
  const getPendingTxs = async () => {
    // const pendingTxsHashes = await promisify(eth.???.getPendingTransactions)();
    //const pendingTxs = await loadTransactions(eth, pendingTxsHashes)
    //return pendingTxs;
    return [];
  }

  useEffect(() => {
    async function fetchBlocks() {
      console.info("[Main::useEffect::fetchBlocks] About to fetch blocks");
      setLatestBlocks({
        blocks: latestBlocks.blocks,
        loading: true,
        error: false
      });
      try {
        const initialBlocks = await getLatestBlocks();
        setLatestBlocks({
          blocks: initialBlocks.concat(latestBlocks.blocks).splice(0, MAX_HISTORY),
          loading: false,
          error: false,
        });
      }
      catch (error) {
        console.error("[Main::useEffect::fetchBlocks]", error);
        setLatestBlocks({
          blocks: [],
          loading: false,
          error: true
        });
      }
    }
    fetchBlocks();
  }, []);

  useEffect(() => {
    async function fetchPendingTxs() {
      console.info("[Main::useEffect::fetchPendingTxs] About to fetch pending txs");
      setPendingTxs({
        transactions: pendingTxs.transactions,
        loading: true,
        error: false
      });
      try {
        const newPendingTxs = await getPendingTxs();
        setPendingTxs({
          transactions: newPendingTxs,
          error: false,
        });
      }
      catch (error) {
        console.error("[Main::useEffect::fetchPendingTxs]", error);
        setPendingTxs({
          transactions: [],
          loading: false,
          error: true
        });
      }
    }
    fetchPendingTxs();
  }, []);

  // TODO: Check if this still works as expected
  useEffect(() => {
    const latestBlockEvent = eth.subscribe("newBlockHeaders", async function() {
      console.info("[Main::useEffect::latestBlockEvent] New blocks arrived");
      try {
        const blocks = await getLatestBlocks();
        setLatestBlocks({
          blocks: blocks.concat(latestBlocks.blocks).splice(0, MAX_HISTORY),
          loading: false,
          error: false,
        });
        const pendingTxs = await getPendingTxs();
        setPendingTxs({
          transactions: pendingTxs,
          loading: false,
          error: false,
        });
      } catch (error) {
        console.error("[Main::useEffect::latestBlockEvent] Error loading new blocks or pending transactions", error);
      }
    });
    return () => {
      eth.clearSubscriptions();
    }
  }, []);

  // TODO: Check if this still works as expected
  useEffect(() => {
    const pendingTxsEvent = eth.subscribe("pendingTransactions", async function() {
      console.info("[Main::useEffect::pendingTxsEvent] New pending txs arrived");
      try {
        // We just refresh all the set!
        const pendingTxs = await getPendingTxs();
        setPendingTxs({
          transactions: pendingTxs,
          loading: false,
          error: false,
        });
      } catch (error) {
        console.error("[Main::useEffect::pendingTxsEvent] Error loading new pending txs", error);
      }
    })
    return () => {
      eth.clearSubscriptions();
    }
  }, []);

  return (
    <div className="content">
      <div className="pure-g main-container">
        <div className="pure-u-1-1 container">
          <h2>Latest blocks</h2>
          <AsyncBlocksTable {...latestBlocks} />
        </div>
      </div>
    </div>
  );
}

export default Main;
