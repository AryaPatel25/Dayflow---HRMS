/**
 * Script to initialize the Attendance collection in MongoDB
 * This will create the collection with proper indexes when the first document is saved
 * Run this once to ensure the collection structure is set up correctly
 */

import mongoose from 'mongoose';
import { config } from '../config/config.js';
import Attendance from '../models/Attendance.js';

const initializeAttendanceCollection = async () => {
  try {
    // Connect to database
    await mongoose.connect(config.databaseUrl);
    console.log('Connected to MongoDB');

    // Create indexes (Mongoose will create the collection automatically)
    await Attendance.createIndexes();
    console.log('Attendance collection indexes created successfully');

    // Verify collection exists
    const collections = await mongoose.connection.db.listCollections().toArray();
    const attendanceCollection = collections.find(col => col.name === 'attendances');
    
    if (attendanceCollection) {
      console.log('✓ Attendance collection exists');
      console.log('✓ Collection name: attendances');
      
      // Get collection stats
      const stats = await mongoose.connection.db.collection('attendances').stats();
      console.log(`✓ Document count: ${stats.count}`);
      console.log(`✓ Index count: ${stats.nindexes}`);
    } else {
      console.log('⚠ Attendance collection will be created on first document save');
    }

    console.log('\n✅ Attendance collection is ready to use!');
    console.log('The collection will be automatically created when you:');
    console.log('  - Clock in an employee');
    console.log('  - Create an attendance record via API');
    
    process.exit(0);
  } catch (error) {
    console.error('Error initializing Attendance collection:', error);
    process.exit(1);
  }
};

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  initializeAttendanceCollection();
}

export default initializeAttendanceCollection;

