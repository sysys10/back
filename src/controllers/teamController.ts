import { Request, Response } from 'express';
import * as TeamService from '../services/teamService.js';

export const createTeamHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { teamName } = req.body;
    const team = await TeamService.createTeam(userId, teamName);
    res.status(201).json(team);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create team', error: error });
  }
};

export const inviteToTeamHandler = async (req: Request, res: Response) => {
  try {
    const inviterId = req.user.id;
    const { teamId, inviteeEmail } = req.body;
    const result = await TeamService.inviteToTeam(teamId, inviterId, inviteeEmail);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: 'Failed to invite to team', error: error });
  }
};

export const acceptInvitationHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { teamId } = req.body;
    const result = await TeamService.acceptInvitation(userId, teamId);
    res.json(result);
  } catch (error) {
    res.status(400).json({ message: 'Failed to accept invitation', error: error });
  }
};

export const getTeamMembersHandler = async (req: Request, res: Response) => {
  try {
    const userId = req.user.id;
    const { teamId } = req.params;
    const members = await TeamService.getTeamMembers(teamId, userId);
    res.json(members);
  } catch (error) {
    res.status(400).json({ message: 'Failed to get team members', error: error });
  }
};