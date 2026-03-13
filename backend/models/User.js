const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, minlength: 6 },
  savedComparisons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' }],
  preferences: {
    dailyMileage: { type: Number, default: 40 },
    yearsOfUse: { type: Number, default: 8 },
    drivingPattern: { type: String, enum: ['City', 'Highway', 'Mixed'], default: 'Mixed' }
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
