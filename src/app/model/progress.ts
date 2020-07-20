export class Progress {
  refDegreeShortName: string;
  currentSemester: number;

  setRefDegreeShortName(degreeShortName: string): Progress {
    this.refDegreeShortName = degreeShortName;
    return this;
  }

  setCurrentSemester(currentSemester: number): Progress {
    this.currentSemester = currentSemester;
    return this;
  }

}
