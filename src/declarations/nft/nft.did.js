export const idlFactory = ({ IDL }) => {
  const NFT = IDL.Service({
    'getCanisterId' : IDL.Func([], [IDL.Principal], ['query']),
    'im' : IDL.Func([], [IDL.Vec(IDL.Nat8)], ['query']),
    'itn' : IDL.Func([], [IDL.Text], ['query']),
    'nf' : IDL.Func([], [IDL.Principal], ['query']),
    'transferOwnership' : IDL.Func([IDL.Principal], [IDL.Text], []),
  });
  return NFT;
};
export const init = ({ IDL }) => {
  return [IDL.Text, IDL.Principal, IDL.Vec(IDL.Nat8)];
};
