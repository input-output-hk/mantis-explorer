import moment from 'moment';
import BigNumber from 'bignumber.js'

export function maxLength(length, str, ellipsis = true) {
  if(!str) return;
  return str.slice(0, length) + (ellipsis ? "..." : "")
}

export function bigNumber(n) {
  return new BigNumber(n).toString(10);
}

export function hexToDec(n) {
  return parseInt(n, 16);
}

export function hexToAscii(x) {
  const hex  = x.toString();
  let str = '';
  for (let n = 0; n < hex.length; n += 2) {
     str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
  }
  return str;
}

export function decToHex(n) {
  return n && `0x${n.toString(16)}`
}

export function formatTimestamp(timestamp) {
  return moment.unix(timestamp).format()
}

export function isCheckpointBlock(block) {
  // FIXME Implement this in a better way
  return !! block && block.miner === "0x0000000000000000000000000000000000000000";
}
