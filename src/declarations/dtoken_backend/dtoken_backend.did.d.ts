import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface _SERVICE {
  'cb' : ActorMethod<[Principal], bigint>,
  'pao' : ActorMethod<[], string>,
  'sym' : ActorMethod<[], string>,
  'transfer' : ActorMethod<[Principal, bigint], string>,
}
