export const LoggingMessages = {
  users: {
    info: {
        create: (id: string)=> `User with id ${id} has been created successfully`,
        createUser: (id: string)=> `User with id ${id} has been created successfully`,
        createStudent: (id: string)=> `Student with id ${id} has been created successfully`,
        forgotPasswordSuccess: (email: string)=> `Password has been changed successfully and new password sent to ${email}`,
        courseAssignedtoInstructorSuccessfully: (courseId: string , instructorId: string)=> `Course with id ${courseId} has been Assigned to Instructor with id ${instructorId} successfully.`,
        updateUserSuccess: (id: string)=> `User With id ${id} Updated Successfully.`,
        deleteUserSuccess: (id: string)=> `User with id ${id} deleted Successfully`
    },
    error: {
        userCreationError: 'Error while creating user ',
        studentCreationError: 'Error while creating student ',
        forgotPasswordFailed: (email: string)=>  `Error while sending new password to email: ${email}`,
        courseAssignedtoInstructorFailed: (courseId: string , instructorId: string)=> `Error while assigning course with id ${courseId} to instructor with id ${instructorId}.`,
        updateUserFailed: (id: string)=> `Error while updating user with id ${id} Failed`,
        deleteUserFailed: (id: string)=> `Error while deleting User with id ${id} Failed`


    },
    warn: 'This is warn log',
    debug: 'This is Debug Log'
  },
  courses: {
    info: 'This is courses Info Log',
    error: 'This is error log',
    warn: 'This is warn log',
    debug: 'This is Debug Log'
  },
  auth: {
    info: 'This is auth Info Log',
    error: 'This is error log',
    warn: 'This is warn log',
    debug: 'This is Debug Log'
  },
  subject: {
    info: 'This is subject Info Log',
    error: 'This is error log',
    warn: 'This is warn log',
    debug: 'This is Debug Log'
  },
  course: {
    info: 'This is course Info Log',
    error: 'This is error log',
    warn: 'This is warn log',
    debug: 'This is Debug Log'
  },
  booking: {
    info: 'This is booking Info Log',
    error: 'This is error log',
    warn: 'This is warn log',
    debug: 'This is Debug Log'
  },
  onsiteCourseBooking: {
    info: 'This is onsiteCourseBooking Info Log',
    error: 'This is error log',
    warn: 'This is warn log',
    debug: 'This is Debug Log'
  },
  evaluation: {
    info: 'This is evaluation Info Log',
    error: 'This is error log',
    warn: 'This is warn log',
    debug: 'This is Debug Log'
  },
  durations: {
    info: 'This is durations Info Log',
    error: 'This is error log',
    warn: 'This is warn log',
    debug: 'This is Debug Log'
  },
  timeslots: {
    info: 'This is timeslot Info Log',
    error: 'This is error log',
    warn: 'This is warn log',
    debug: 'This is Debug Log'
  },
  attendance: {
    info: 'This is attendance Info Log',
    error: 'This is error log',
    warn: 'This is warn log',
    debug: 'This is Debug Log'
  },
};
