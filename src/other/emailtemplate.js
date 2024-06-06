// templates.js

function generateOTPEmailTemplate(otp) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>OTP for Verification</title>
  
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          style="
            margin: 0;
            font-family: 'Poppins', sans-serif;
            background: #ffffff;
            font-size: 14px;
          "
        >
          <div
            style="
              max-width: 680px;
              margin: 0 auto;
              padding: 45px 30px 60px;
              background: #f4f7ff;
              background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);
              background-repeat: no-repeat;
              background-size: 800px 452px;
              background-position: top center;
              font-size: 14px;
              color: #434343;
            "
          >
            <main>
              <div
                style="
                  margin: 0;
                  margin-top: 70px;
                  padding: 92px 30px 115px;
                  background: #ffffff;
                  border-radius: 30px;
                  text-align: center;
                "
              >
                <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                  <h1
                    style="
                      margin: 0;
                      font-size: 24px;
                      font-weight: 500;
                      color: #1f1f1f;
                    "
                  >
                    Your OTP
                  </h1>
                  <p
                    style="
                      margin: 0;
                      margin-top: 17px;
                      font-weight: 500;
                      letter-spacing: 0.56px;
                    "
                  >
                    Thank you for Registering on Submify. Use the following OTP
                    to complete the procedure to verify your email address. OTP is
                    valid for <span style="font-weight: 600; color: #1f1f1f;">5 minutes</span>.
                    Do not share this code with others.
                  </p>
                  <p
                    style="
                      margin: 0;
                      margin-top: 60px;
                      font-size: 40px;
                      font-weight: 600;
                      letter-spacing: 25px;
                      color: #ba3d4f;
                    "
                  >
                    ${otp}
                  </p>
                </div>
              </div>
  
              <p
                style="
                  max-width: 400px;
                  margin: 0 auto;
                  margin-top: 90px;
                  text-align: center;
                  font-weight: 500;
                  color: #8c8c8c;
                "
              >
                Need help? Ask at <a href="mailto:archisketch@gmail.com" style="color: #499fb6; text-decoration: none;">sarthak25ic049@satiengg.in</a>
                or visit our <a href="" target="_blank" style="color: #499fb6; text-decoration: none;">Help Center</a>
              </p>
            </main>
  
            <footer
              style="
                width: 100%;
                max-width: 490px;
                margin: 20px auto 0;
                text-align: center;
                border-top: 1px solid #e6ebf1;
              "
            >
              <p style="margin: 0; margin-top: 40px; font-size: 16px; font-weight: 600; color: #434343;">Submify</p>
              <p style="margin: 0; margin-top: 8px; color: #434343;">The Official Automatic Grading Software of SATI.</p>
              <div style="margin: 0; margin-top: 16px;">
                <a href="https://www.instagram.com/sarthak_io/" target="_blank" style="display: inline-block; margin-left: 8px;">
                  <img width="36px" alt="Instagram" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram" />
                </a>
                <a href="https://twitter.com/SARTHAK92256597" target="_blank" style="display: inline-block; margin-left: 8px;">
                  <img width="36px" alt="Twitter" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter" />
                </a>
              </div>
              <p style="margin: 0; margin-top: 16px; color: #434343;">Copyright © 2024 Submify. All rights reserved.</p>
            </footer>
          </div>
        </body>
      </html>
    `;
  }


  function resetOTPEmailTemplate(otp) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>OTP for Verification</title>
  
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap"
            rel="stylesheet"
          />
        </head>
        <body
          style="
            margin: 0;
            font-family: 'Poppins', sans-serif;
            background: #ffffff;
            font-size: 14px;
          "
        >
          <div
            style="
              max-width: 680px;
              margin: 0 auto;
              padding: 45px 30px 60px;
              background: #f4f7ff;
              background-image: url(https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661497957196_595865/email-template-background-banner);
              background-repeat: no-repeat;
              background-size: 800px 452px;
              background-position: top center;
              font-size: 14px;
              color: #434343;
            "
          >
            <main>
              <div
                style="
                  margin: 0;
                  margin-top: 70px;
                  padding: 92px 30px 115px;
                  background: #ffffff;
                  border-radius: 30px;
                  text-align: center;
                "
              >
                <div style="width: 100%; max-width: 489px; margin: 0 auto;">
                  <h1
                    style="
                      margin: 0;
                      font-size: 24px;
                      font-weight: 500;
                      color: #1f1f1f;
                    "
                  >
                    Your OTP
                  </h1>
                
                  <p style="margin: 0; margin-top: 17px; font-weight: 500; letter-spacing: 0.56px;">
                  You've requested to reset your password on Submify. Use the following OTP
                  to complete the reset process. This OTP is valid for 
                  <span style="font-weight: 600; color: #1f1f1f;">5 minutes</span>. 
                  For your security, do not share this code with anyone.
                </p>
                
                  
                  <p
                    style="
                      margin: 0;
                      margin-top: 60px;
                      font-size: 40px;
                      font-weight: 600;
                      letter-spacing: 25px;
                      color: #ba3d4f;
                    "
                  >
                    ${otp}
                  </p>
                </div>
              </div>
  
              <p
                style="
                  max-width: 400px;
                  margin: 0 auto;
                  margin-top: 90px;
                  text-align: center;
                  font-weight: 500;
                  color: #8c8c8c;
                "
              >
                Need help? Ask at <a href="mailto:sarthak25ic049@satiengg.in" style="color: #499fb6; text-decoration: none;">sarthak25ic049@satiengg.in</a>
                or visit our <a href="" target="_blank" style="color: #499fb6; text-decoration: none;">Help Center</a>
              </p>
            </main>
  
            <footer
              style="
                width: 100%;
                max-width: 490px;
                margin: 20px auto 0;
                text-align: center;
                border-top: 1px solid #e6ebf1;
              "
            >
              <p style="margin: 0; margin-top: 40px; font-size: 16px; font-weight: 600; color: #434343;">Submify</p>
              <p style="margin: 0; margin-top: 8px; color: #434343;">The Official Automatic Grading Software of SATI.</p>
              <div style="margin: 0; margin-top: 16px;">
                <a href="https://www.instagram.com/sarthak_io/" target="_blank" style="display: inline-block; margin-left: 8px;">
                  <img width="36px" alt="Instagram" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram" />
                </a>
                <a href="https://twitter.com/SARTHAK92256597" target="_blank" style="display: inline-block; margin-left: 8px;">
                  <img width="36px" alt="Twitter" src="https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter" />
                </a>
              </div>
              <p style="margin: 0; margin-top: 16px; color: #434343;">Copyright © 2024 Submify. All rights reserved.</p>
            </footer>
          </div>
        </body>
      </html>
    `;
  }
export { generateOTPEmailTemplate, resetOTPEmailTemplate};
  