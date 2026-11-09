import { Router } from 'express'
import { Activity, Leaderboard, Team, User, Workout } from './models.js'

export const apiRouter = Router()

apiRouter.get('/users/', async (_request, response) => {
  const users = await User.find().populate('team', 'name')
  response.json(users)
})

apiRouter.get('/teams/', async (_request, response) => {
  const teams = await Team.find().populate('members', 'username firstName lastName')
  response.json(teams)
})

apiRouter.get('/activities/', async (_request, response) => {
  const activities = await Activity.find()
    .sort({ date: -1 })
    .populate('user', 'username firstName lastName')
  response.json(activities)
})

apiRouter.get('/leaderboard/', async (_request, response) => {
  const leaderboard = await Leaderboard.find()
    .sort({ rank: 1 })
    .populate('user', 'username firstName lastName')
    .populate('team', 'name')
  response.json(leaderboard)
})

apiRouter.get('/workouts/', async (_request, response) => {
  const workouts = await Workout.find().sort({ name: 1 })
  response.json(workouts)
})