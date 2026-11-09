import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import { Activity, Leaderboard, Team, User, Workout } from '../models.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'ava.moves', email: 'ava@example.com', firstName: 'Ava', lastName: 'Chen', age: 28 },
      { username: 'liam.runs', email: 'liam@example.com', firstName: 'Liam', lastName: 'Patel', age: 34 },
      { username: 'mia.lifts', email: 'mia@example.com', firstName: 'Mia', lastName: 'Garcia', age: 25 },
      { username: 'noah.trails', email: 'noah@example.com', firstName: 'Noah', lastName: 'Kim', age: 31 },
    ]);

    const teams = await Team.create([
      {
        name: 'Morning Miles',
        description: 'A steady running crew that starts the day outdoors.',
        members: [users[0]._id, users[1]._id],
        points: 1840,
      },
      {
        name: 'Strength and Stride',
        description: 'A balanced mix of strength sessions and trail time.',
        members: [users[2]._id, users[3]._id],
        points: 1610,
      },
    ]);

    await User.updateOne({ _id: users[0]._id }, { team: teams[0]._id });
    await User.updateOne({ _id: users[1]._id }, { team: teams[0]._id });
    await User.updateOne({ _id: users[2]._id }, { team: teams[1]._id });
    await User.updateOne({ _id: users[3]._id }, { team: teams[1]._id });

    await Activity.create([
      { user: users[0]._id, type: 'running', durationMinutes: 32, distanceKm: 5.2, calories: 340, date: new Date('2025-03-10T07:15:00Z') },
      { user: users[1]._id, type: 'cycling', durationMinutes: 48, distanceKm: 18.4, calories: 510, date: new Date('2025-03-10T08:00:00Z') },
      { user: users[2]._id, type: 'strength', durationMinutes: 42, calories: 290, date: new Date('2025-03-09T17:30:00Z') },
      { user: users[3]._id, type: 'hiking', durationMinutes: 75, distanceKm: 6.8, calories: 620, date: new Date('2025-03-09T09:00:00Z') },
      { user: users[0]._id, type: 'yoga', durationMinutes: 25, calories: 105, date: new Date('2025-03-08T18:00:00Z') },
    ]);

    await Leaderboard.create([
      { user: users[0]._id, team: teams[0]._id, points: 980, rank: 1 },
      { user: users[1]._id, team: teams[0]._id, points: 860, rank: 2 },
      { user: users[2]._id, team: teams[1]._id, points: 830, rank: 3 },
      { user: users[3]._id, team: teams[1]._id, points: 780, rank: 4 },
    ]);

    await Workout.create([
      { name: 'Easy 5K', description: 'A relaxed conversational-pace run.', type: 'running', durationMinutes: 35, difficulty: 'beginner', calories: 320 },
      { name: 'Tempo Builder', description: 'A warm-up followed by three controlled tempo intervals.', type: 'running', durationMinutes: 40, difficulty: 'intermediate', calories: 430 },
      { name: 'Full Body Basics', description: 'Foundational pushing, pulling, and lower-body movements.', type: 'strength', durationMinutes: 45, difficulty: 'beginner', calories: 300 },
      { name: 'Recovery Flow', description: 'Gentle mobility and breathing for recovery days.', type: 'yoga', durationMinutes: 25, difficulty: 'beginner', calories: 110 },
      { name: 'Weekend Trail Ride', description: 'A sustained outdoor ride with rolling climbs.', type: 'cycling', durationMinutes: 60, difficulty: 'advanced', calories: 600 },
    ]);

    console.log('Database seeding complete');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
}

seedDatabase();
