// Abstract class: the blueprint for all content
abstract class Content {
  public readonly title: string;
  public readonly author: string;
  private published: boolean = false;

  constructor(title: string, author: string) {
    this.title = title;
    this.author = author;
  }

  public publish() {
    this.published = true;
  }

  protected isPublished(): boolean {
    return this.published;
  }

  // Every content type must say what type it is
  abstract getType(): string;
}



// created Assignment class extending Content
class Assignment extends Content {
  // Added dueDate property (private)
  private dueDate: string;

  constructor(title: string, author: string, dueDate: string) {
    super(title, author);
    this.dueDate = dueDate;
  }

  // Allowed only instructor to set dueDate before publishing
  public setDueDate(newDueDate: string, isInstructor: boolean) {
    if (!this.isPublished() && isInstructor) {
      this.dueDate = newDueDate;
    } else {
      throw new Error(
        "Cannot change dueDate after publishing or if not an instructor.",
      );
    }
  }

  public getDueDate(): string {
    return this.dueDate;
  }

  // implemented getType returning Assignment
  getType(): string {
    return "Assignment";
  }
}
