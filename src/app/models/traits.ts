import {Sets} from './sets';
export class Traits{
	constructor(
		public key:string,
		public name:string,
		public description:string,
		public type:string,
		public sets:Array<Sets>
		){}
}