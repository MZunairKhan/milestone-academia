export function randomPasswordString(length: number, chars : string) {
    let result = '';
    for (let i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}


export function getCurrentDateTime() {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString('en-US', options);

    return formattedDate;
}

const currentDateTime = getCurrentDateTime();



  //Welcome user Template

 export  const WelcomeUserTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <style>
          body {
              font-family: Arial, sans-serif;
              padding: 20px;
          }
  
          .logo {
              text-align: center;
          }
  
          .logo img {
              height: 100px;
              border-radius: 10%;
          }
  
          .colorful-line {
              margin-top: 30px;
              margin-bottom: 30px;
              width: 100%;
              height: 20px;
              background: linear-gradient(45deg, #ff8c00, #000000);
              border-radius: 10px;
          }
  
          .email-container {
              width: 520px;
              margin: auto;
          }
  
         
  
          .dateAndTime {
              font-size: smaller;
              font-weight: 10;
              float: right;
              padding-right: 10px;
          }
  
          .message {
              font-size: 20px;
              color: #030303;
          }
  
          .buttonContainer {
              text-align: center;
              margin-top: 30px;
          }
  
          .visitButton {
              background: #ff8c00;
              color: aliceblue;
              width: 150px;
              height: 30px;
              border-radius: 10%;
              border: none;
              cursor: pointer;
          }
      </style>
  </head>
  <body>
  <div class="email-container">
      <div class="logo">
          <img src="https://milestoneacademia.com/wp-content/uploads/2024/02/Milestone_Academia2-removebg-preview-removebg-preview.png" alt="Logo"/>
      </div>
      <div class="colorful-line"></div>
      <div class="message">
          <div class="welcomeAndDate">
              <span>Hi!</span>
              <span class="dateAndTime">${currentDateTime}</span>
          </div>
          <p>Welcome to MileStone Academia.</p>
          <p>We are thrilled to have you on board!</p>
      </div>
      <div class="buttonContainer">
          <a href="https://milestoneacademia.com" target="_blank" style="text-decoration: none; color: black;">
              <button class="visitButton">Visit Site</button>
          </a>
      </div>
  </div>
  </body>
  </html>
  
`;

export function getResetPasswordTemplate(password: string) {
    return  `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <style>
            body {
                font-family: Arial, sans-serif;
                padding: 20px;
            }
    
            .logo {
                text-align: center;
            }
    
            .logo img {
                height: 100px;
                border-radius: 10%;
            }
    
            .colorful-line {
                margin-top: 30px;
                margin-bottom: 30px;
                width: 100%;
                height: 20px;
                background: linear-gradient(45deg, #ff8c00, #000000);
                border-radius: 10px;
            }
    
            .email-container {
                width: 520px;
                margin: auto;
            }
    
           
    
            .dateAndTime {
                font-size: smaller;
                font-weight: 10;
                float: right;
                padding-right: 10px;
            }
    
            .message {
                font-size: 20px;
                color: #030303;
            }
    
            .buttonContainer {
                text-align: center;
                margin-top: 30px;
            }
    
            .visitButton {
                background: #ff8c00;
                color: aliceblue;
                width: 150px;
                height: 30px;
                border-radius: 10%;
                border: none;
                cursor: pointer;
            }
        </style>
    </head>
    <body>
    <div class="email-container">
        <div class="logo">
            <img src="https://milestoneacademia.com/wp-content/uploads/2024/02/Milestone_Academia2-removebg-preview-removebg-preview.png" alt="Logo"/>
        </div>
        <div class="colorful-line"></div>
        <div class="message">
            <div class="welcomeAndDate">
                <span>Hi!</span>
                <span class="dateAndTime">${currentDateTime}</span>
            </div>
            <p>You have Successfully Reset your password use below password to login</p>
            <h3>${password}</h3>
        </div>
        <div class="buttonContainer">
            <a href="https://milestoneacademia.com" target="_blank" style="text-decoration: none; color: black;">
                <button class="visitButton">Visit Site</button>
            </a>
        </div>
    </div>
    </body>
    </html>
    
    `;

}


