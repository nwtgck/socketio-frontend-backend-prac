import * as t from 'io-ts';

export const events = {
  join_room: 'join_room',
  send_talk: 'send_talk',
  receive_talk: 'receive_talk'
};

export const joinRoomReqType = t.type({
  name: t.string
});
export type JoinRoomReq = t.TypeOf<typeof joinRoomReqType>;

export const talkType = t.type({
  roomName: t.string,
  body: t.string,
});
export type Talk = t.TypeOf<typeof talkType>;
