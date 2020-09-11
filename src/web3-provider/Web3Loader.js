import Web3 from 'web3';

const USE_INJECTED_WEB3 = false;
const FALLBACK_PROVIDER = process.env.WEB3_PROVIDER || 'http://127.0.0.1:8546';

const asyncWeb3 = new Promise(function(resolve, _) {
  // Wait for loading completion to avoid race conditions with web3 injection timing.
  window.addEventListener('load', function() {
    const windowWeb3 = window.web3;
    // Checking if Web3 has been injected by the browser (Mist/MetaMask)
    if (typeof windowWeb3 !== 'undefined' && USE_INJECTED_WEB3) {
      // Use Mist/MetaMask's provider
      console.info('[loadWeb3] Injected web3 detected.');
      const web3 = new Web3(windowWeb3.currentProvider);
      resolve(web3);
    } else {
      // Fallback to localhost if no web3 injection.
      console.info('[loadWeb3] No web3 instance injected, using Local web3.');
      const provider = new Web3.providers.HttpProvider(FALLBACK_PROVIDER);
      const web3 = new Web3(provider)
      resolve(web3);
    }
  });
})

export {
  asyncWeb3
};
