# lu-schedule

[![npm version](https://img.shields.io/npm/v/lu-schedule.svg?style=flat-square)](https://www.npmjs.org/package/lu-schedule)

Node.js API for interacting with Lunds Universitets TimeEdit schedule

## Features

- Get schedule from URL
- Automatically parses student groups
- Zero dependencies
- Cross platform - Runs on both Node.js and in the browser

## Installing

Using npm:

```bash
$ npm install lu-schedule
```

Using yarn:

```bash
$ yarn add lu-schedule
```

Using script tag:

```html
<script src="lu-schedule.min.js"></script>
```

## Example

Retrieving a schedule from URL

```js
const { Schedule } = require('lu-schedule')

const schedule = Schedule.fromUrl('https://cloud.timeedit.net/lu/web/m1/ri14750Yg50003Q0g2QY61l4Z762X653760Y540yZ05QZ5Q6Qu496ZpQc.html')

// ES6 async await. Remember to use the `async` keyword.
async function myFunction () {
  try {
    await schedule.load()
    console.log(schedule.lessons)
  } catch (error) {
    console.error(error)
  }
}

// Standard promises
schedule.load()
  .then(function (schedule) {
    console.log(schedule)
  })
  .catch(function (error) {
    console.error(error)
  })

```

## Schedule object data (with data from the example above)

```js
{
  programmeId: 'm1',
  id: 'ri14750Yg50003Q0g2QY61l4Z762X653760Y540yZ05QZ5Q6Qu496ZpQc',
  issuer: 'Lunds universitet',
  filter: 'M-RoN, RoN',
  span: '2019-09-02 - 2020-01-19 v 36-3',
  lessons: [
    {
      start: '2019-09-05T11:00:00.000Z', // Date object
      end: '2019-09-05T13:00:00.000Z', // Date object
      course: 'M-RoN',
      studentGroups: {
        groups: []
      },
      subGroups: {
        groups: [
          { course: 'M-RoN', groupName: 'gr.09-10', groupNumbers: [9, 10] },
          { course: 'M-RoN', groupName: 'gr.13-14', groupNumbers: [13, 14] }
        ],
        // All group numbers combined. Will only be set if any of the sub groups have groupNumbers.
        groupNumbers: [9, 10, 13, 14]
      },
      student: '',
      subCourse: '',
      educationalType: 'GrpDemo',
      title: 'CNS 1',
      location: 'BMC I 1129 Mod 2, BMC I 1136 Mod 4',
      locationComment: '',
      locationBooking: '',
      educator: '',
      externalEducator: '',
      comment: '',
      url: '',
      reason: '',
      count: '',
      id: '2037000'
    },
    ... // Only showing one lesson here.
  ]
}
```

## TypeScript

lu-schedule comes with TypeScript definitions.

## Licence

MIT