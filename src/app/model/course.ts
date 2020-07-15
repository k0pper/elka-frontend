import { ContentBlock } from './contentblock';

export class Course {
  name: string;
  ects: number;
  tags: string[];
  professor: string;
  mandatoryContentBlocks: ContentBlock[];

  public setName(name: string): Course {
    this.name = name;
    return this;
  }

  public setEcts(ects: number): Course {
    this.ects = ects;
    return this;
  }

  public setTags(tags: string[]): Course {
    this.tags = tags;
    return this;
  }

  public setProfessor(prof: string): Course {
    this.professor = prof;
    return this;
  }

  public addTag(tag: string): Course {
    this.tags.push(tag);
    return this;
  }
}
