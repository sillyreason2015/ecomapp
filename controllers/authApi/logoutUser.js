export const logoutUser = (req, res) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      sameSite: 'strict',
      secure: false,  // Must match what was used in login
      path: '/',      // Required to match the cookie exactly
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
