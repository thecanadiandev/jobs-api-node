const { get } = require("mongoose");

const getAllJobs = async (req, res) => {  
  res.send('getAllJobs')
};

const getJob = async (req, res) => {  
  res.send('getJob')
};

const createJob = async (req, res) => {  
  res.send('createJob')
};

const updateJob = async (req, res) => {  
  res.send('getAllJobs')
};

const deleteJob = async (req, res) => {  
  res.send('getAllJobs')
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob
}