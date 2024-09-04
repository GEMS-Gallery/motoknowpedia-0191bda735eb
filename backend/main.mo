import Func "mo:base/Func";

import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Text "mo:base/Text";

actor {
  // Stable variable to store messages
  stable var messages : [Text] = [];

  // Function to add a new message
  public func addMessage(message : Text) : async () {
    messages := Array.append<Text>(messages, [message]);
    Debug.print("New message added: " # message);
  };

  // Query function to get all messages
  public query func getMessages() : async [Text] {
    messages
  };

  // Function to clear all messages
  public func clearMessages() : async () {
    messages := [];
    Debug.print("All messages cleared");
  };
}