import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.js";
import { Team } from "./Team.js";

@Entity("team_users")
export class TeamUser {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne("Team", "teamUsers")
    @JoinColumn({ name: "team_id" })
    team: Team;

    @Column()
    teamId: string;

    @ManyToOne("User", "teamUsers")
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    userId: string;

    @Column({ length: 20 })
    role: string;

    @Column()
    joinedAt: Date;
}