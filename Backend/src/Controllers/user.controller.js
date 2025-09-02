import { User } from "../Models/UserModel.js";
import crypto from 'crypto';
import bcrypt from 'bcryptjs';


export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const user = await User.create({ name, email, password });
    const createdUser = await User.findById(user._id).select("-password -refreshToken");

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: createdUser
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Registration failed"
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const t0 = process.hrtime.bigint();
    const { email, password } = req.body;
    const t1 = process.hrtime.bigint();
    
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email }).select("+password +refreshToken");
    const t2 = process.hrtime.bigint();
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);
    const t3 = process.hrtime.bigint();
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    const t4 = process.hrtime.bigint();

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");
    const t5 = process.hrtime.bigint();

    res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 15 * 60 * 1000 // 15 minutes
  });

    res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'None',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

    const ms = (a,b) => Number(b - a) / 1_000_000;
    res.setHeader('X-Login-ParseBody', `${ms(t0, t1).toFixed(1)}ms`);
    res.setHeader('X-Login-FindUser', `${ms(t1, t2).toFixed(1)}ms`);
    res.setHeader('X-Login-VerifyPassword', `${ms(t2, t3).toFixed(1)}ms`);
    res.setHeader('X-Login-SaveRefresh', `${ms(t3, t4).toFixed(1)}ms`);
    res.setHeader('X-Login-FetchUser', `${ms(t4, t5).toFixed(1)}ms`);
    res.setHeader('X-Login-Total', `${ms(t0, t5).toFixed(1)}ms`);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      user: loggedInUser
    });
  } catch (error) {
    try { res.setHeader('X-Login-Error-At', process.hrtime.bigint().toString()); } catch {}
    return res.status(500).json({
      success: false,
      message: error.message || "Login failed"
    });
  }
};

export const logoutUser = async (req, res) => {

  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } }
  );

  // Clear both cookies
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");

  return res.json({ success: true });
};

export const getCurrentUser = async (req, res) => {
  try {
    // console.log(req.user);
    
    const user = await User.findById(req.user._id).select("-password -refreshToken");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Failed to retrieve current user"
    });
  }
};

// Forgot Password - Request Reset
export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            // Don't reveal if user exists or not for security
            return res.status(200).json({ 
                message: 'If an account with that email exists, a password reset link has been sent.' 
            });
        }

        // Generate reset token (valid for 1 hour)
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        // Save reset token to user
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = resetTokenExpiry;
        await user.save();

        // Create reset URL
        const resetUrl = `${req.protocol}://${req.get('host')}/reset-password/${resetToken}`;
        
        // Email content
        const emailContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
                    <h1 style="margin: 0; font-size: 28px;">Password Reset Request</h1>
                </div>
                <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
                    <p style="color: #333; font-size: 16px; line-height: 1.6;">
                        Hello ${user.name || 'there'},
                    </p>
                    <p style="color: #333; font-size: 16px; line-height: 1.6;">
                        You recently requested to reset your password for your ResumeIt account. Click the button below to reset it.
                    </p>
                    <div style="text-align: center; margin: 30px 0;">
                        <a href="${resetUrl}" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; font-weight: bold; font-size: 16px;">
                            Reset Password
                        </a>
                    </div>
                    <p style="color: #666; font-size: 14px; line-height: 1.6;">
                        If you didn't request this password reset, please ignore this email. Your password will remain unchanged.
                    </p>
                    <p style="color: #666; font-size: 14px; line-height: 1.6;">
                        This password reset link will expire in 1 hour.
                    </p>
                    <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
                    <p style="color: #999; font-size: 12px; text-align: center;">
                        If the button above doesn't work, copy and paste this link into your browser:<br>
                        <a href="${resetUrl}" style="color: #667eea;">${resetUrl}</a>
                    </p>
                </div>
            </div>
        `;

        // For now, we'll just log the email content since we don't have a real email service
        // In production, you would use a service like SendGrid, Nodemailer, etc.
        console.log('=== PASSWORD RESET EMAIL ===');
        console.log('To:', email);
        console.log('Subject: Password Reset Request');
        console.log('Reset URL:', resetUrl);
        console.log('============================');

        // TODO: Integrate with real email service
        // Example with Nodemailer:
        // await sendEmail({
        //     to: email,
        //     subject: 'Password Reset Request',
        //     html: emailContent
        // });

        res.status(200).json({ 
            message: 'Password reset email sent successfully. Check your email for the reset link.',
            resetUrl: resetUrl // Remove this in production - only for development/testing
        });

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Reset Password - Set New Password
export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        
        if (!token || !newPassword) {
            return res.status(400).json({ message: 'Token and new password are required' });
        }

        // Find user with valid reset token
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired reset token' });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update user password and clear reset token
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successfully' });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};



