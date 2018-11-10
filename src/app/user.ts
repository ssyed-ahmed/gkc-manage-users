export class User {
    constructor(
        public id: number,
        public username: string,
        public firstName: string,
        public lastName: string,
        public interests: string[],
        public phoneNumber: number,
        public imagePath: string
    ){}
}