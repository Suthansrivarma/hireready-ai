const mongoose = require('mongoose');

const jobApplicationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    jobTitle: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true
    },
    company: {
      type: String,
      required: [true, 'Company name is required'],
      trim: true
    },
    location: {
      type: String,
      default: 'Remote'
    },
    salary: {
      type: String,
      default: ''
    },
    status: {
      type: String,
      enum: ['Wishlist', 'Applied', 'Interviewing', 'Offer', 'Rejected'],
      default: 'Wishlist'
    },
    jobDescription: {
      type: String,
      default: ''
    },
    notes: {
      type: String,
      default: ''
    },
    appliedDate: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('JobApplication', jobApplicationSchema);
