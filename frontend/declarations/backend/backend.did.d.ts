import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Booking {
  'id' : BookingId,
  'status' : BookingStatus,
  'duration' : bigint,
  'clientId' : ClientId,
  'time' : Time,
  'walkerId' : WalkerId,
}
export type BookingId = bigint;
export type BookingStatus = { 'scheduled' : null } |
  { 'cancelled' : null } |
  { 'completed' : null };
export interface Client {
  'id' : ClientId,
  'dogName' : string,
  'name' : string,
  'dogBreed' : [] | [string],
}
export type ClientId = bigint;
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : Array<Time> } |
  { 'err' : string };
export type Result_2 = { 'ok' : BookingId } |
  { 'err' : string };
export type Time = bigint;
export interface Walker {
  'id' : WalkerId,
  'name' : string,
  'experience' : string,
  'availability' : Array<Time>,
}
export type WalkerId = bigint;
export interface _SERVICE {
  'addWalker' : ActorMethod<[string, string], WalkerId>,
  'cancelBooking' : ActorMethod<[BookingId], Result>,
  'createBooking' : ActorMethod<[ClientId, WalkerId, Time, bigint], Result_2>,
  'getBooking' : ActorMethod<[BookingId], [] | [Booking]>,
  'getClient' : ActorMethod<[ClientId], [] | [Client]>,
  'getWalker' : ActorMethod<[WalkerId], [] | [Walker]>,
  'getWalkerAvailability' : ActorMethod<[WalkerId], Result_1>,
  'listBookings' : ActorMethod<[], Array<Booking>>,
  'listWalkers' : ActorMethod<[], Array<Walker>>,
  'registerClient' : ActorMethod<[string, string, [] | [string]], ClientId>,
  'updateWalkerAvailability' : ActorMethod<[WalkerId, Array<Time>], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
