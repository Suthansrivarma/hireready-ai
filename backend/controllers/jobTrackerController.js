const JobApplication = require('../models/JobApplication');

// @desc    Get user's tracked job applications
// @route   GET /api/tracker
// @access  Private
const getJobs = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    let jobs = [];
    try {
      jobs = await JobApplication.find({ userId }).sort({ createdAt: -1 });
    } catch (err) {
      if (req.app.locals.inMemoryJobs) {
        jobs = Array.from(req.app.locals.inMemoryJobs.values()).filter(j => String(j.userId) === String(userId));
      }
    }
    return res.json({ success: true, count: jobs.length, data: jobs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new tracked job application
// @route   POST /api/tracker
// @access  Private
const createJob = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { jobTitle, company, location, salary, status, jobDescription, notes } = req.body;

    if (!jobTitle || !company) {
      return res.status(400).json({ success: false, message: 'Job title and company are required' });
    }

    let job;
    try {
      job = await JobApplication.create({
        userId,
        jobTitle,
        company,
        location: location || 'Remote',
        salary: salary || '',
        status: status || 'Wishlist',
        jobDescription: jobDescription || '',
        notes: notes || ''
      });
    } catch (err) {
      const mockId = 'job_' + Date.now();
      job = {
        _id: mockId,
        id: mockId,
        userId,
        jobTitle,
        company,
        location: location || 'Remote',
        salary: salary || '',
        status: status || 'Wishlist',
        jobDescription: jobDescription || '',
        notes: notes || '',
        createdAt: new Date()
      };
      if (!req.app.locals.inMemoryJobs) req.app.locals.inMemoryJobs = new Map();
      req.app.locals.inMemoryJobs.set(mockId, job);
    }

    return res.status(201).json({ success: true, data: job });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update job status or details
// @route   PUT /api/tracker/:id
// @access  Private
const updateJob = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id || req.user.id;

    let job;
    try {
      job = await JobApplication.findOneAndUpdate(
        { _id: id, userId },
        req.body,
        { new: true }
      );
    } catch (err) {
      if (req.app.locals.inMemoryJobs) {
        job = req.app.locals.inMemoryJobs.get(id);
        if (job) {
          Object.assign(job, req.body);
        }
      }
    }

    if (!job) {
      return res.status(404).json({ success: false, message: 'Job application not found' });
    }

    return res.json({ success: true, data: job });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a tracked job application
// @route   DELETE /api/tracker/:id
// @access  Private
const deleteJob = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id || req.user.id;

    try {
      await JobApplication.deleteOne({ _id: id, userId });
    } catch (err) {
      if (req.app.locals.inMemoryJobs) {
        req.app.locals.inMemoryJobs.delete(id);
      }
    }

    return res.json({ success: true, message: 'Job application removed' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getJobs,
  createJob,
  updateJob,
  deleteJob
};
