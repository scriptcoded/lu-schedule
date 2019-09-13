import { GroupCollection } from './GroupCollection'

export class Lesson {
  start: Date
  end: Date
  course: string
  studentGroups?: GroupCollection
  subGroups?: GroupCollection
  student: string
  subCourse: string
  educationalType: string
  title: string
  location: string
  locationComment: string
  locationBooking: string
  educator: string
  externalEducator: string
  comment: string
  url: string
  reason: string
  count: string
  id: string
}
