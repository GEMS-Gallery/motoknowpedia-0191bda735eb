import Func "mo:base/Func";

import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Text "mo:base/Text";
import Option "mo:base/Option";

actor {
  // Stable variable to store articles
  stable var articles : [(Text, Text)] = [];

  // Function to add a new article
  public func addArticle(title : Text, content : Text) : async () {
    articles := Array.append<(Text, Text)>(articles, [(title, content)]);
    Debug.print("New article added: " # title);
  };

  // Query function to get all articles
  public query func getArticles() : async [(Text, Text)] {
    articles
  };

  // Function to get a specific article
  public query func getArticle(title : Text) : async ?Text {
    Option.map(
      Array.find<(Text, Text)>(articles, func(article) { article.0 == title }),
      func ((_, content) : (Text, Text)) : Text { content }
    )
  };

  // Function to search articles
  public query func searchArticles(searchTerm : Text) : async [(Text, Text)] {
    Array.filter<(Text, Text)>(articles, func (article) {
      let (title, content) = article;
      Text.contains(Text.toLowercase(title), #text(Text.toLowercase(searchTerm))) or
      Text.contains(Text.toLowercase(content), #text(Text.toLowercase(searchTerm)))
    })
  };

  // Function to clear all articles
  public func clearArticles() : async () {
    articles := [];
    Debug.print("All articles cleared");
  };
}