import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { CalendarEvent, CalendarView, CalendarMonthViewBeforeRenderEvent, CalendarWeekViewBeforeRenderEvent, CalendarDayViewBeforeRenderEvent } from 'angular-calendar';
import { EventColor, ViewPeriod } from 'calendar-utils'

import { setHours, setMinutes, setSeconds } from 'date-fns';
import * as moment from 'moment-timezone';
import RRule from 'rrule';
import { LectureService } from 'src/app/services/lecture.service';
import { RegularLecture, WEEKDAYS } from 'src/app/model/lecture';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import * as iCal from 'ical-generator';
import { CalendarData, EventData, repeatingFreq } from 'ical-generator'
import downloadjs from 'downloadjs'

interface RecurringEvent {
  title: string;
  color: any;
  start: Date;
  end: Date;
  location: string;
  professor: string;
  rrule?: {
    freq: any;
    bymonth?: number;
    bymonthday?: number;
    byweekday?: any;
  };
}
moment.tz.setDefault('Utc');

@Component({
  selector: 'calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: 'calendar.component.html',
  encapsulation: ViewEncapsulation.None, // hack to get the styles to apply locally
  styleUrls: ['calendar.component.scss'],
  styles: [
    `
      .my-custom-class span {
        color: black !important;
        font-size: 14px;
        overflow-wrap: break-word;
      }
      .my-custom-class {
        overflow-wrap: break-word;
      }
    `,
  ],
})

export class CalendarComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef, private lectureService: LectureService, private authService: AuthService) { }
  user: User;

  view: CalendarView = CalendarView.Week;
  viewDate: Date = new Date();
  viewPeriod: ViewPeriod;
  events: CalendarEvent[] = [];
  colors = [
    "#ff6b6b",
    "#ffa96b",
    "#ffd86b",
    "#e9ff6b",
    "#9aff6b",
    "#6bffa1",
    "#6bffee",
    "#6bbaff",
    "#726bff",
    "#b76bff",
    "#ff6bfa",
    "#ff6bae"
  ];

  recurringEvents: RecurringEvent[] = [

  ]

  ngOnInit(): void {


    this.user = this.authService.getCurrentUser();

    this.lectureService.getLectures().valueChanges().subscribe((lectures) => {
      this.recurringEvents = [];
      let firstSemesterLectures = lectures.filter((lecture) => {
        return this.user.scheduledSemesters[0].scheduledCourses.map(c => c.name).includes(lecture.course.name);
      });

      firstSemesterLectures.forEach((lec: RegularLecture) => {
        let weekday;
        switch (lec.weekday) {
          case WEEKDAYS.MONDAY: weekday = RRule.MO; break;
          case WEEKDAYS.TUESDAY: weekday = RRule.TU; break;
          case WEEKDAYS.WEDNESDAY: weekday = RRule.WE; break;
          case WEEKDAYS.THURSDAY: weekday = RRule.TH; break;
          case WEEKDAYS.FRIDAY: weekday = RRule.FR; break;
        }

        const randomColor = this.randomColor();
        this.recurringEvents.push(
          {
            title: lec.course.name,
            color: { primary: randomColor, secondary: randomColor },
            location: lec.location,
            professor: lec.course.professor,
            start: setSeconds(setHours(setMinutes(new Date(), lec.startMinute), lec.startHour), 0),
            end: setSeconds(setHours(setMinutes(new Date(), lec.endMinute), lec.endHour), 0),
            rrule: {
              freq: RRule.WEEKLY,
              byweekday: [weekday]
            }
          }
        );
      })
    })
  }

  updateCalendarEvents(viewRender: CalendarMonthViewBeforeRenderEvent | CalendarWeekViewBeforeRenderEvent | CalendarDayViewBeforeRenderEvent): void {
    if (!this.viewPeriod ||
      !moment(this.viewPeriod.start).isSame(viewRender.period.start) ||
      !moment(this.viewPeriod.end).isSame(viewRender.period.end)
    ) {
      this.viewPeriod = viewRender.period;
      this.events = [];

      this.recurringEvents.forEach((event) => {

        const rule: RRule = new RRule({
          ...event.rrule,
          dtstart: moment(viewRender.period.start).startOf('day').toDate(),
          until: moment(viewRender.period.end).endOf('day').toDate(),
        });

        const { title, color, start, end, location, professor } = event;

        rule.all().forEach((date: Date) => {
          console.log(date)
          this.events.push({
            title:
              `<h4><b>${title}</b></h4>
              <p> Raum: ${location}</p>
              <p>${professor}</p>
              <p>${start.toLocaleTimeString().slice(0, 5)} - ${end.toLocaleTimeString().slice(0, 5)}</p>`,
            color,
            cssClass: 'my-custom-class',
            start: setHours(setMinutes(setSeconds(date, 0), start.getMinutes()), start.getHours()),
            end: setHours(setMinutes(setSeconds(date, 0), end.getMinutes()), end.getHours()),
          });
        });
      });

      this.cdr.detectChanges();
    }
  }

  randomColor() {
    console.log("randomcolor")
    let index = Math.floor(Math.random() * this.colors.length);
    let color = this.colors[index];
    this.colors.splice(index, 1);
    return color;
  }

  downloadiCal() {
    let cal = iCal({
      domain: 'elka.de',
      prodId: { company: 'PDISSDTeam', product: 'ELKA' },
      method: 'PUBLISH',
      name: 'Elka Events'
    });

    this.recurringEvents.forEach((rec: RecurringEvent) => {
      const startFix = this.getNextDayOfWeek(rec.start, rec.rrule.byweekday[0].weekday + 1);
      const endFix = this.getNextDayOfWeek(rec.end, rec.rrule.byweekday[0].weekday + 1);
      let repeatingData: iCal.RepeatingData = {
        freq: 'WEEKLY',
        byDay: rec.rrule.byweekday,
        interval: 1,
      }
      cal.createEvent({
        start: startFix,
        end: endFix,
        summary: rec.title,
        organizer: {
          name: rec.professor,
          email: "example@university-domain.com"
        },
        location: rec.location,
        description: "Vorlesung",
        repeating: repeatingData,
      });
    })

    console.log(cal.toJSON())

    downloadjs(cal.toString(), "Vorlesung.ics", "text/calendar")
  }

  getNextDayOfWeek(date: Date, dayOfWeek) {
    var resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
    return resultDate;
}

}
