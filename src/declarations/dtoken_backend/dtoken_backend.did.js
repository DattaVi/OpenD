export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'cb' : IDL.Func([IDL.Principal], [IDL.Nat], ['query']),
    'pao' : IDL.Func([], [IDL.Text], []),
    'sym' : IDL.Func([], [IDL.Text], ['query']),
    'transfer' : IDL.Func([IDL.Principal, IDL.Nat], [IDL.Text], []),
  });
};
export const init = ({ IDL }) => { return []; };
