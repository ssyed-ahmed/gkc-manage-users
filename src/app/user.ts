export class User {
    constructor(
        public username: string,
        public firstName: string,
        public lastName: string,
        public interests: string[],
        public phoneNumber: number,
        public imagePath: string
    ){}
}