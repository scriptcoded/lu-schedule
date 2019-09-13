import Schedule from '../src'

const schedule = Schedule.fromUrl('https://cloud.timeedit.net/lu/web/m1/ri14750Yg50003Q0g2QY61l4Z762X653760Y540yZ05QZ5Q6Qu496ZpQc.html')

;(async () => {
  await schedule.load()

  console.log(schedule.lessons[28])
})()
