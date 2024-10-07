import { AppDataSource } from "../config/typeorm.config.js";
import { Team } from "../entities/Team.js";
import { User } from "../entities/User.js";
import { TeamUser } from "../entities/TeamUser.js";

export const createTeam = async (userId: string, teamName: string) => {
  const teamRepository = AppDataSource.getRepository(Team);
  const userRepository = AppDataSource.getRepository(User);
  const teamUserRepository = AppDataSource.getRepository(TeamUser);

  const user = await userRepository.findOne({ where: { id: userId } });
  if (!user) {
    throw new Error("User not found");
  }

  const newTeam = teamRepository.create({ teamName });
  await teamRepository.save(newTeam);

  const teamUser = teamUserRepository.create({
    user,
    team: newTeam,
    role: "owner",
  });
  await teamUserRepository.save(teamUser);

  return newTeam;
};

export const inviteToTeam = async (
  teamId: string,
  inviterId: string,
  inviteeEmail: string
) => {
  const teamRepository = AppDataSource.getRepository(Team);
  const userRepository = AppDataSource.getRepository(User);
  const teamUserRepository = AppDataSource.getRepository(TeamUser);

  const team = await teamRepository.findOne({ where: { id: teamId } });
  if (!team) {
    throw new Error("Team not found");
  }

  const inviter = await teamUserRepository.findOne({
    where: { teamId, userId: inviterId },
  });
  if (!inviter || inviter.role !== "owner") {
    throw new Error("You do not have permission to invite members");
  }

  const invitee = await userRepository.findOne({
    where: { email: inviteeEmail },
  });
  if (!invitee) {
    throw new Error("Invitee not found");
  }

  const existingMember = await teamUserRepository.findOne({
    where: { teamId, userId: invitee.id },
  });
  if (existingMember) {
    throw new Error("User is already a member of this team");
  }

  const teamUser = teamUserRepository.create({
    user: invitee,
    team,
    role: "member",
  });
  await teamUserRepository.save(teamUser);

  return { message: "Invitation sent successfully" };
};

export const acceptInvitation = async (userId: string, teamId: string) => {
  const teamUserRepository = AppDataSource.getRepository(TeamUser);

  const teamUser = await teamUserRepository.findOne({
    where: { teamId, userId },
  });
  if (!teamUser) {
    throw new Error("Invitation not found");
  }

  await teamUserRepository.save(teamUser);

  return { message: "Invitation accepted successfully" };
};

export const getTeamMembers = async (teamId: string, userId: string) => {
  const teamUserRepository = AppDataSource.getRepository(TeamUser);

  const userTeam = await teamUserRepository.findOne({
    where: { teamId, userId },
  });
  if (!userTeam) {
    throw new Error("You are not a member of this team");
  }

  const members = await teamUserRepository.find({
    where: { teamId },
    relations: ["user"],
  });

  return members.map((member:any) => ({
    id: member.user.id,
    username: member.user.username,
    email: member.user.email,
    role: member.role,
  }));
};
