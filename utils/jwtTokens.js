export const generateToken = (user, message, statusCode, res) => {
  // Generate the JWT token, assuming user has a method `generateJsonWebToken()`
  const token = user.generateJsonWebToken();

  // Set the cookie and send the response
  res
    .status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true,  // Prevents client-side JS from accessing the cookie
      secure: process.env.NODE_ENV === "production",  // Only use secure cookies in production
      sameSite: "Strict",  // Recommended setting to prevent CSRF
    })
    .json({
      success: true,
      message,
      token,  // Send the token in the response body for client-side usage
      user,   // Send the user object
    });
};
