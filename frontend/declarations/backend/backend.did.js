export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'addMessage' : IDL.Func([IDL.Text], [], []),
    'clearMessages' : IDL.Func([], [], []),
    'getMessages' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
