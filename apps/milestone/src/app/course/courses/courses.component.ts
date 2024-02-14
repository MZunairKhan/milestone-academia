import { Component, OnInit } from '@angular/core';

export interface Course {
  id: string;
  color: string;
  cols: number;
  rows: number;
  text: string;
  details: string;
}

const sampleText = `Sloshed faff about me old mucker blatant bubble and squeak hanky panky some
dodgy chav bevvy arse chimney pot I, ruddy plastered buggered smashing blow off
I'm telling up the kyver he legged it bleeder jolly good,`;


const sampleTextV2 = `Sloshed faff about me old mucker blatant bubble and squeak hanky panky some
dodgy chav bevvy arse chimney pot I, ruddy plastered buggered smashing blow off
I'm telling up the kyver he legged it bleeder jolly good, Sloshed faff about me old mucker blatant bubble and squeak hanky panky some
dodgy chav bevvy arse chimney pot I, ruddy plastered buggered smashing blow off
I'm telling up the kyver he legged it bleeder jolly good,`

@Component({
  selector: 'milestone-academia-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  host: {
    class:'milestone-router-component'
  }
})
export class CoursesComponent implements OnInit {
  tiles: Course[] = [
    {id: '1', text: 'One', cols: 1, rows: 1, color: 'lightblue', details: sampleText},
    {id: '2', text: 'Two', cols: 1, rows: 1, color: 'lightgreen', details: sampleTextV2},
    {id: '3', text:  'Three', cols: 1, rows: 1, color: 'lightpink', details: sampleText},
    {id: '4', text:  'Four', cols: 1, rows: 1, color: '#DDBDF1', details: sampleTextV2},
    {id: '5', text:  'One', cols: 1, rows: 1, color: 'lightblue', details: sampleText},
    {id: '6', text:  'Two', cols: 1, rows: 1, color: 'lightgreen', details: sampleTextV2},
    {id: '7', text:  'Three', cols: 1, rows: 1, color: 'lightpink', details: sampleText},
    {id: '8', text:  'Four', cols: 1, rows: 1, color: '#DDBDF1', details: sampleTextV2},
  ];

  columns: 1 | 2 = 1;

  constructor() {}

  ngOnInit(): void {}

  buttonToggled = (value: any) => this.columns = value
}
