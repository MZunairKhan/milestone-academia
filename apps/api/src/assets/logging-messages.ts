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
        deleteUserFailed: (id: string)=> `Error while deleting User with id ${id} Failed`,
        errorGettingPaginatedUser: `Error while getting paginated users`,
        errorGettingInstructorById: (id:string)=> `Error while getting Instructor by id ${id} `,
        errorGettingUserById: (id:string)=> `Error while getting User by id ${id} `,
        errorGettingUserData: (id: string)=> `Error while getting UserData by id ${id}`,
        errorGettingAllUsers: `Error while getting All Users`,



    },
    warn: 'This is warn log',
    debug: 'This is Debug Log'
  },
  auth: {
    info: {
      loginSuccess: (userName: string)=> `User with userName ${userName} Logged In Successfully`,
      resetPasswordSuccess: (id: string)=> `User with id ${id} resets password Successfully `
    },
    error: {
      loginFailed: (userName: string)=> `User with username ${userName} logged in failed`,
      refreshTokenFailed: (id: string)=> `Refresh Token Failed for UserId ${id} `,
      resetPasswordFailed: (id: string)=> `User with id ${id} resets password Failed `

    },
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
    info: {
      create: (id: string)=> `Course with id ${id} created successfully`,
      delete: (id: string)=> `Course with id ${id} deleted successfully`
    },
    error: {
      courseCreationError: `Error while Course Creation `,
      errorFindingAll: `Error while getting all courses`,
      errorfindPaginatedCourses: `Error While getting paginated courses`,
      errorFinfingOneById: (id: string)=> `Error while getting course with id  ${id}`,
      deleteCourseFailed: (id: string)=> `Course with id ${id} deleted Failed`
    },
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
    info: {
      create: (id: string)=> `onsiteCourseBooking with id ${id} has been created successfully`,
    },
    error: {
      onsiteCourseBookingCreationError: 'Error while creating onsiteCourseBooking ',
      errorGettingAllonsiteCourseBooking: `Error while getting All onsiteCourseBooking`,
      errorGettingById: (id: string)=>  `Error while getting onsiteCourseBooking with id ${id}`,
      errorGettingByStudentId: (studentId: string)=>  `Error while getting onsiteCourseBooking with StudentId ${studentId}`,
      errorGettingByUserId: (userId: string)=>  `Error while getting onsiteCourseBooking with userId ${userId}`,
      errorGettingByCourseId: (courseId: string)=>  `Error while getting onsiteCourseBooking with courseId ${courseId}`,


    },
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
