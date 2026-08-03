import { Router } from 'express';
import mongoose, { type Model } from 'mongoose';
import Activity from '../models/activity.js';
import LeaderboardEntry from '../models/leaderboardEntry.js';
import Team from '../models/team.js';
import User from '../models/user.js';
import Workout from '../models/workout.js';

const routes = Router();

const resources = [
  { path: '/users', name: 'users', model: User },
  { path: '/teams', name: 'teams', model: Team },
  { path: '/activities', name: 'activities', model: Activity },
  { path: '/leaderboard', name: 'leaderboard', model: LeaderboardEntry },
  { path: '/workouts', name: 'workouts', model: Workout },
];

for (const resource of resources) {
  routes.get(`${resource.path}/`, async (_request, response, next) => {
    try {
      const items = mongoose.connection.readyState === 1
        ? await (resource.model as Model<unknown>).find().lean()
        : [];

      response.json({ resource: resource.name, items });
    } catch (error) {
      next(error);
    }
  });
}

export default routes;