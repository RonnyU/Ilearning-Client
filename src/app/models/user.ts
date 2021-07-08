export class User {
  constructor(
    public _id: String,
    public identity: String,
    public name: String,
    public surname: String,
    public gender: String,
    public phone: Number,
    public email: String,
    public password: String,
    public location: String,
    public profesion: String,
    public userDesc: String,
    public imagePath: String,
    public role: String,
    public activeProfile: Boolean,
    public mycourses: any,
    public createdAt: String,
    public updatedAt: String
  ) {}
}
