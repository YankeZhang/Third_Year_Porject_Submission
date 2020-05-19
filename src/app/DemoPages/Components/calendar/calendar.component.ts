import {
  Component,
  ChangeDetectionStrategy,
  ViewChild,
  TemplateRef
} from '@angular/core';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {Subject} from 'rxjs';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView
} from 'angular-calendar';
import { HttpClient } from '@angular/common/http';
import { CalendarService } from 'src/app/services/calendar.service';

import { map, timeout } from 'rxjs/operators';
const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class CalendarComponent {

  heading = 'Calendar';
  subheading = 'You can view your recent events.';
  icon = 'pe-7s-car icon-gradient bg-warm-flame';
  request;
  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData: {
    action: string;
    event: CalendarEvent;
  };

  
  actions: CalendarEventAction[] = [
    // {
    //   label: '<i class="fa fa-fw fa-pencil"></i>',
    //   onClick: ({event}: { event: CalendarEvent }): void => {
    //     this.handleEvent('Edited', event);
    //   }
    // },
    // {
    //   label: '<i class="fa fa-fw fa-times"></i>',
    //   onClick: ({event}: { event: CalendarEvent }): void => {
    //     this.events = this.events.filter(iEvent => iEvent !== event);
    //     this.handleEvent('Deleted', event);
    //   }
    // }
  ];

  getData(){
    var result = [];
    this.service.getAllRequests().pipe(map((req:Array<any>)=>{
      if (req) {
          req.forEach((erg) => {
            var color = colors.red
            switch(erg.type){
              case "Lecture":{
                color = colors.green;
              } break;
              case "Hachathon":{
                color = colors.yellow;
              } break;
              case "Student Support":{
                color = colors.blue;
              } break;
              case "General Event":{
                color = colors.red;
              } break;
            }
                result.push({
                  start: new Date(erg.start),
                  end: new Date(erg.end),
                  title: erg.first_name+" from:"+erg.university+", event:"+erg.type+" location: "+erg.postcode,
                  color: color,
                  actions: this.actions,
                  allDay: false,
                  resizable: {
                    beforeStart: false,
                    afterEnd: false
                  },
                  draggable: false
                },);
              });
              }
              return result
              //this.dayClicked({date:new Date(),events : [] })
    })).subscribe(post=>{
      this.refresh.next()
      console.log(this.events);
      return result;
    })
    return result;

  }

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = this.getData()
  

  activeDayIsOpen = true;

  constructor(private modal: NgbModal, private http: HttpClient, private service: CalendarService) {
    console.log("constructer")
    timeout(200)
    
    this.setView(CalendarView.Week)
    this.setView(CalendarView.Month)
    
  }
  ngOnInit(){
    
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    console.log({date, events})
    if (isSameMonth(date, this.viewDate)) {
      this.viewDate = date;
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
    }
  }

  eventTimesChanged({
                      event,
                      newStart,
                      newEnd
                    }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = {event, action};
    this.modal.open(this.modalContent, {size: 'lg'});
  }

  // addEvent(): void {
  //   this.events = [
  //     ...this.events,
  //     {
  //       title: 'New event',
  //       start: startOfDay(new Date()),
  //       end: endOfDay(new Date()),
  //       color: colors.red,
  //       draggable: true,
  //       resizable: {
  //         beforeStart: true,
  //         afterEnd: true
  //       }
  //     }
  //   ];
  // }

  

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }
}
