export interface IActivity {
  year: string
  discipline: string
  trafficContent: string
  knowledgeObject: string
  activity: string
}

export interface ITeacher {
  regionalSuperintendences: string
  dnitLocalUnit: string
  institution: string
  user: string
}

export interface IBodySurvey {
  type: string
  situation: string
  period: string
  periodStart: Date
  periodEnd: Date
  activity: IActivity
  teacher: ITeacher
}

export class bodySurvey {
  type: string
  situation: string
  period: string
  periodStart: Date
  periodEnd: Date
  activity: IActivity
  teacher: ITeacher

  constructor(data?: any) {
    this.type = data?.type || '1'
    this.situation = data?.situation || '1'
    this.period = data?.period || '3'
    this.periodStart = data?.periodStart || null
    this.periodEnd = data?.periodEnd || null
    this.activity = data?.activity || {
      year: null,
      discipline: null,
      trafficContent: null,
      knowledgeObject: null,
      activity: null
    }
    this.teacher = data?.teacher || {
      regionalSuperintendences: null,
      dnitLocalUnit: null,
      institution: null,
      user: null
    }
  }
}
