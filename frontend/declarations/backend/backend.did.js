export const idlFactory = ({ IDL }) => {
  const WalkerId = IDL.Nat;
  const BookingId = IDL.Nat;
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const ClientId = IDL.Nat;
  const Time = IDL.Int;
  const Result_2 = IDL.Variant({ 'ok' : BookingId, 'err' : IDL.Text });
  const BookingStatus = IDL.Variant({
    'scheduled' : IDL.Null,
    'cancelled' : IDL.Null,
    'completed' : IDL.Null,
  });
  const Booking = IDL.Record({
    'id' : BookingId,
    'status' : BookingStatus,
    'duration' : IDL.Nat,
    'clientId' : ClientId,
    'time' : Time,
    'walkerId' : WalkerId,
  });
  const Client = IDL.Record({
    'id' : ClientId,
    'dogName' : IDL.Text,
    'name' : IDL.Text,
    'dogBreed' : IDL.Opt(IDL.Text),
  });
  const Walker = IDL.Record({
    'id' : WalkerId,
    'name' : IDL.Text,
    'experience' : IDL.Text,
    'availability' : IDL.Vec(Time),
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Vec(Time), 'err' : IDL.Text });
  return IDL.Service({
    'addWalker' : IDL.Func([IDL.Text, IDL.Text], [WalkerId], []),
    'cancelBooking' : IDL.Func([BookingId], [Result], []),
    'createBooking' : IDL.Func(
        [ClientId, WalkerId, Time, IDL.Nat],
        [Result_2],
        [],
      ),
    'getBooking' : IDL.Func([BookingId], [IDL.Opt(Booking)], ['query']),
    'getClient' : IDL.Func([ClientId], [IDL.Opt(Client)], ['query']),
    'getWalker' : IDL.Func([WalkerId], [IDL.Opt(Walker)], ['query']),
    'getWalkerAvailability' : IDL.Func([WalkerId], [Result_1], ['query']),
    'listBookings' : IDL.Func([], [IDL.Vec(Booking)], ['query']),
    'listWalkers' : IDL.Func([], [IDL.Vec(Walker)], ['query']),
    'registerClient' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Opt(IDL.Text)],
        [ClientId],
        [],
      ),
    'updateWalkerAvailability' : IDL.Func(
        [WalkerId, IDL.Vec(Time)],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
