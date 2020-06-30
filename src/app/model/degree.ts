// Abschluss / Studiengang
export class Degree {
  name: string;
  shortName: string;
  description: string;
  ectsNeeded: number;

  constructor() {}

  setName(name: string): Degree {
    this.name = name;
    return this;
  }
  setShortName(shortName: string): Degree {
    this.shortName = shortName;
    return this;
  }
  setDescription(description: string): Degree {
    this.description = description;
    return this;
  }
  setEctsNeeded(ectsNeeded: number): Degree {
    this.ectsNeeded = ectsNeeded;
    return this;
  }
}
