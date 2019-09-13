// Type definitions for lu-schedule
// Project: lu-schedule
// Definitions by: Malcolm Nihlén <https://github.com/scriptcoded>

// Note that ES6 modules cannot directly export class objects.
// This file should be imported using the CommonJS-style:
//   import x = require('lu-schedule')
//
// Alternatively, if --allowSyntheticDefaultImports or
// --esModuleInterop is turned on, this file can also be
// imported as a default import:
//   import x from 'lu-schedule'
//
// Refer to the TypeScript documentation at
// https://www.typescriptlang.org/docs/handbook/modules.html#export--and-import--require
// to understand common workarounds for this limitation of ES6 modules.

export = Schedule

declare class GroupCollection {
    groups: Group[]
    groupNumbers?: number[]

    constructor (groups: Group [], groupNumbers?: number[])

    static fromGroupString (course: string, groupString: string): GroupCollection
}

declare class Group {
    course: string
    groupName: string

    groupNumbers?: number[]

    static fromGroupString (course: string, groupString: string): Group[]
}

declare class Lesson {
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

declare class Schedule {
    programmeId: string
    id: string
    issuer: string
    filter: string
    span: string

    lessons: Lesson[]

    constructor (programmeId: string, id: string)

    load (): Promise<null>

    static fromUrl (url: string): Schedule
}
