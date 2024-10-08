import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'addArticle' : ActorMethod<[string, string], undefined>,
  'clearArticles' : ActorMethod<[], undefined>,
  'getArticle' : ActorMethod<[string], [] | [string]>,
  'getArticles' : ActorMethod<[], Array<[string, string]>>,
  'searchArticles' : ActorMethod<[string], Array<[string, string]>>,
  'updateArticle' : ActorMethod<[string, string], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
