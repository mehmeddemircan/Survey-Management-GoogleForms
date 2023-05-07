const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const sendToken = require("../utils/sendToken");
const crypto = require("crypto");

exports.register = catchAsyncErrors(async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;

  // Checks if email and password is entered by user
  if (!firstname || !lastname || !email || !password) {
    res.status(400).json({
      success: false,
      error: "Lütfen bütün alanları doldurun",
    });
  }

  const _user = await User.findOne({ email });

  if (_user) {
    res.status(400).json({
      success: false,
      error: "Bu Email zaten kullanılmakta Lütfen başka email giriniz ",
    });
  }

  const user = await User.create({
    firstname,
    lastname,
    email,
    password,
  });

  sendToken(user, 201, res, "Başarılı şekilde hesap oluşturuldu ");
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Checks if email and password is entered by user
  if (!email || !password) {
    res.status(400).json({
      success: false,
      error: "Lütfen email ve şifre alanlarını doldurunuz ",
    });
  }

  // Finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    res.status(400).json({
      success: false,
      error: "Geçersiz email veya şifre tekrar deneyiniz",
    });
  }

  // Check if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    res.status(400).json({
      success: false,
      error: "Geçersiz şifre",
    });
  }

  sendToken(user, 201, res, "Başarılı Şekilde hesaba girildi ");
});

exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(404).json({
        success: false,
        error: "Email Bulunamadı tekrar deneyiniz lütfen",
      });
    }
    const resetToken = user.getResetPasswordToken();

    await user.save();

    const resetUrl = `https://akinsoftanket-admin.onrender.com/password/reset/${resetToken}`;

    const message = `
          <h1>Sifre yenilemek için istek attınız </h1>
          <p>Merhaba ${user.email}</p>
          <p>Sifrenizi yenilemek için alttaki linke tıklayınız lütfen</p>
          
          <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
          `;

    try {
      await sendEmail({
        to: user.email,
        subject: "Şifre Yenileme isteği",
        text: message,
      });
      res.status(200).json({
        success: true,
        message: `Email başarılı şekilde gönderildi ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      res.status(500).json({
        error: "Maalesef Email gönderilemedi ",
      });
    }
  } catch (error) {
    next(error);
  }
});
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      res.status(400).json({
        success: false,
        error: "Geçersiz reset Token , lütfen tekrar mail hesabinizi girin",
      });
    }

    if (req.body.password !== req.body.confirmPassword) {
      res.status(400).json({
        success: false,
        error: "Şifreler uyuşmuyor",
      });
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(201).json({
      success: true,
      message: "Şifreniz Başariyla güncellendi ",
    });
  } catch (error) {
    next(error);
  }
});
