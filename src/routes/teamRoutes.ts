import express from 'express';
import { createTeamHandler, inviteToTeamHandler, acceptInvitationHandler, getTeamMembersHandler } from '../controllers/teamController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createTeamHandler);
router.post('/invite', inviteToTeamHandler);
router.post('/accept-invitation', acceptInvitationHandler);
router.get('/:teamId/members', getTeamMembersHandler);

export default router;