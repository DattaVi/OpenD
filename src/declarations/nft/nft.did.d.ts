import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface NFT {
  'getCanisterId' : ActorMethod<[], Principal>,
  'im' : ActorMethod<[], Uint8Array | number[]>,
  'itn' : ActorMethod<[], string>,
  'nf' : ActorMethod<[], Principal>,
  'transferOwnership' : ActorMethod<[Principal], string>,
}
export interface _SERVICE extends NFT {}
