import mongoose from 'mongoose';

const Schema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },  
  lastname: {
    type: String,
    required: true
  }, 
  email: String,
  active: {
    type: Boolean,
    required: true
  },
});

export default mongoose.model('User', Schema);