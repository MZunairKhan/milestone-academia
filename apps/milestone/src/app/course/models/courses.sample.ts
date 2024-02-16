import { Course, CourseBooking, CourseContent, CourseFeatures } from "./course.model";

const subText = `dalkv lkasdc alsfkamfdslamf svsa dfmaslfmsadklc laf safdklmsaf msdafjkasndf kjsnadf`


const sampleText = `Sloshed faff about me old mucker blatant bubble and squeak staple dank some
dodgy chav bevvy arse chimney pot I, ruddy plastered buggered smashing blow off
I'm telling up the kyver he legged it bleeder jolly good,`;


const sampleTextV2 = `Sloshed faff about me old mucker blatant bubble and squeak staple dank some
dodgy chav bevvy arse chimney pot I, ruddy plastered buggered smashing blow off
I'm telling up the kyver he legged it bleeder jolly good, Sloshed faff about me old mucker blatant bubble and squeak staple dank some
dodgy chav bevvy arse chimney pot I, ruddy plastered buggered smashing blow off
I'm telling up the kyver he legged it bleeder jolly good,`

const features: CourseFeatures[] = [
  {
    name: 'Lectures',
    value: 26,
    icon: 'group'
  },
  {
    name: 'Assesments',
    value: 12,
    icon: 'description'
  },
  {
    name: 'Quizzes',
    value: 12,
    icon: 'info_outline'
  },
  {
    name: 'Notes',
    value: 30,
    icon: 'format_list_numbered'
  },
];

const booking: CourseBooking = {
  days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
  slots:  [
    "2 pm - 3 pm",
    "3 pm - 4 pm",
    "4 pm - 5 pm",
    "5 pm - 6 pm",
    "6 pm - 7 pm",
    "7 pm - 8 pm",
    "8 pm - 9 pm",
    "9 pm - 10 pm"
  ],
  startDate: new Date('02-12-2024'),
  endDate: new Date('05-15-2024'),
}

const courseContent: CourseContent[] = [
  {heading: 'First Heading', points: ['First point of First Heading','Second point of First Heading','Third point of First Heading','Fourth point of First Heading']},
  {heading: 'Second Heading', points: ['First point of Second Heading','Second point of Second Heading','Third point of Second Heading','Fourth point of Second Heading']},
  {heading: 'Third Heading', points: ['First point of Third Heading','Second point of Third Heading','Third point of Third Heading','Fourth point of Third Heading']},
  {heading: 'Fourth Heading', points: ['First point of Fourth Heading','Second point of Fourth Heading','Third point of Fourth Heading','Fourth point of Fourth Heading']},
]

export const sampleCourses: Course[] = [
    {id: '1', price: 199, title: 'One', cols: 1, rows: 1, subText, availableBookings: booking , color: 'lightblue', details: sampleText, features: features, content: courseContent},
    {id: '2', price: 299, title: 'Two', cols: 1, rows: 1, subText, availableBookings: booking, color: 'lightgreen', details: sampleTextV2, features: features, content: courseContent},
    {id: '3', price: 199, title: 'Three', cols: 1, rows: 1, subText, availableBookings: booking, color: 'lightpink', details: sampleText, features: features, content: courseContent},
    {id: '4', price: 299, title: 'Four', cols: 1, rows: 1, subText, availableBookings: booking, color: '#DDBDF1', details: sampleTextV2, features: features, content: courseContent},
    {id: '5', price: 199, title: 'Five', cols: 1, rows: 1, subText, availableBookings: booking, color: 'lightblue', details: sampleText, features: features, content: courseContent},
    {id: '6', price: 299, title: 'Six', cols: 1, rows: 1, subText, availableBookings: booking, color: 'lightgreen', details: sampleTextV2, features: features, content: courseContent},
    {id: '7', price: 199, title: 'Seven', cols: 1, rows: 1, subText, availableBookings: booking, color: 'lightpink', details: sampleText, features: features, content: courseContent},
    {id: '8', price: 299, title: 'Eight', cols: 1, rows: 1, subText, availableBookings: booking, color: '#DDBDF1', details: sampleTextV2, features: features, content: courseContent},
  ];