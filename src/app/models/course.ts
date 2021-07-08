export class Course {
  constructor(
    public _id: String,
    public title: String,
    public courseDesc: String,
    public imagePath: String,
    public coursePrice: String,
    public activeCourse: Boolean,
    public deleted: Boolean,
    public chapter: any,
    public subcategory: any,
    public user: String,
    public purchases: number,
    public Profits: number,
    public createdAt: String,
    public updatedAt: String
  ) {}
}
