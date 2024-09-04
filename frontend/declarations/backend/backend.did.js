export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'addArticle' : IDL.Func([IDL.Text, IDL.Text], [], []),
    'clearArticles' : IDL.Func([], [], []),
    'getArticle' : IDL.Func([IDL.Text], [IDL.Opt(IDL.Text)], ['query']),
    'getArticles' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text))],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
