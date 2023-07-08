export class Obj{
  id: number;
  objectAddress: string;
  area: number;
  roomNumber: number;
  objectType: string;
  rooms: Array< { x: number, y: number, width: number, height: number, background: string }>;
  doors: Array< { x: number, y: number, width: number, height: number }>;
  client: string;
}