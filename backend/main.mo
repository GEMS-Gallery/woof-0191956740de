import Hash "mo:base/Hash";
import Iter "mo:base/Iter";

import Text "mo:base/Text";
import Array "mo:base/Array";
import HashMap "mo:base/HashMap";
import Time "mo:base/Time";
import Int "mo:base/Int";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Option "mo:base/Option";
import Buffer "mo:base/Buffer";

actor DogWalkingBusiness {
  // Types
  type WalkerId = Nat;
  type ClientId = Nat;
  type BookingId = Nat;

  type Walker = {
    id: WalkerId;
    name: Text;
    experience: Text;
    availability: [Time.Time];
  };

  type Client = {
    id: ClientId;
    name: Text;
    dogName: Text;
    dogBreed: ?Text;
  };

  type Booking = {
    id: BookingId;
    clientId: ClientId;
    walkerId: WalkerId;
    time: Time.Time;
    duration: Nat; // in minutes
    status: BookingStatus;
  };

  type BookingStatus = {
    #scheduled;
    #completed;
    #cancelled;
  };

  // Stable storage
  stable var nextWalkerId: WalkerId = 0;
  stable var nextClientId: ClientId = 0;
  stable var nextBookingId: BookingId = 0;

  let walkers = HashMap.HashMap<WalkerId, Walker>(10, Nat.equal, Int.hash);
  let clients = HashMap.HashMap<ClientId, Client>(10, Nat.equal, Int.hash);
  let bookings = HashMap.HashMap<BookingId, Booking>(10, Nat.equal, Int.hash);

  // Walker Management
  public func addWalker(name: Text, experience: Text) : async WalkerId {
    let id = nextWalkerId;
    nextWalkerId += 1;
    let newWalker: Walker = {
      id;
      name;
      experience;
      availability = [];
    };
    walkers.put(id, newWalker);
    id
  };

  public query func getWalker(id: WalkerId) : async ?Walker {
    walkers.get(id)
  };

  public query func listWalkers() : async [Walker] {
    Buffer.toArray<Walker>(Buffer.fromIter<Walker>(walkers.vals()))
  };

  // Client Management
  public func registerClient(name: Text, dogName: Text, dogBreed: ?Text) : async ClientId {
    let id = nextClientId;
    nextClientId += 1;
    let newClient: Client = {
      id;
      name;
      dogName;
      dogBreed;
    };
    clients.put(id, newClient);
    id
  };

  public query func getClient(id: ClientId) : async ?Client {
    clients.get(id)
  };

  // Booking System
  public func createBooking(clientId: ClientId, walkerId: WalkerId, time: Time.Time, duration: Nat) : async Result.Result<BookingId, Text> {
    switch (clients.get(clientId), walkers.get(walkerId)) {
      case (null, _) { #err("Client not found") };
      case (_, null) { #err("Walker not found") };
      case (_, _) {
        let id = nextBookingId;
        nextBookingId += 1;
        let newBooking: Booking = {
          id;
          clientId;
          walkerId;
          time;
          duration;
          status = #scheduled;
        };
        bookings.put(id, newBooking);
        #ok(id)
      };
    }
  };

  public func cancelBooking(id: BookingId) : async Result.Result<(), Text> {
    switch (bookings.get(id)) {
      case (null) { #err("Booking not found") };
      case (?booking) {
        let updatedBooking = {
          booking with status = #cancelled
        };
        bookings.put(id, updatedBooking);
        #ok()
      };
    }
  };

  public query func getBooking(id: BookingId) : async ?Booking {
    bookings.get(id)
  };

  public query func listBookings() : async [Booking] {
    Buffer.toArray<Booking>(Buffer.fromIter<Booking>(bookings.vals()))
  };

  // Scheduling
  public func updateWalkerAvailability(walkerId: WalkerId, newAvailability: [Time.Time]) : async Result.Result<(), Text> {
    switch (walkers.get(walkerId)) {
      case (null) { #err("Walker not found") };
      case (?walker) {
        let updatedWalker = {
          walker with availability = newAvailability
        };
        walkers.put(walkerId, updatedWalker);
        #ok()
      };
    }
  };

  public query func getWalkerAvailability(walkerId: WalkerId) : async Result.Result<[Time.Time], Text> {
    switch (walkers.get(walkerId)) {
      case (null) { #err("Walker not found") };
      case (?walker) { #ok(walker.availability) };
    }
  };
}
