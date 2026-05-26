export const sendEmail = async (email, subject, text) => {
  // 🚀 DUMMY OTP INTERCEPTOR
  // Since you are using Option 1, we are disabling real emails.
  // The OTP is hardcoded to 123456 in the controller.
  console.log(`\n=========================================`);
  console.log(`📧 MOCK EMAIL INTERCEPTED`);
  console.log(`To: ${email}`);
  console.log(`Subject: ${subject}`);
  console.log(`Message: ${text}`);
  console.log(`=========================================\n`);
  
  // We return immediately to avoid any API errors or delays.
  return;
};