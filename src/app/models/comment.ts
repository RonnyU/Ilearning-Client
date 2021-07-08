export class Comment {
  constructor(
    public _id: String,
    public title: String,
    public content: String,
    public comments: any,
    public user: String,
    public createdAt: String,
    public updatedAt: String
  ) {}
}
