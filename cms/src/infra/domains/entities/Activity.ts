export interface IBodyActivitySearch {
  disciplineSubject: string
  disciplines: (number | string)[]
  isStartYear: string
  keyword: string
  schoolYears: (number | string)[]
  trafficContent: string
}

export class bodyActivitySearch {
  disciplineSubject: string
  disciplines: (number | string)[]
  isStartYear: string
  keyword: string
  schoolYears: (number | string)[]
  trafficContent: string

  constructor(data?: any) {
    this.disciplineSubject = data?.disciplineSubject || null
    this.disciplines = data?.disciplines || []
    this.isStartYear = data?.isStartYear || null
    this.keyword = data?.keyword || ''
    this.schoolYears = data?.schoolYears || []
    this.trafficContent = data?.trafficContent || null
  }
}
