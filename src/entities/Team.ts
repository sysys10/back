import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TeamUser } from "./TeamUser.js";
import { Event } from "./Event.js";

@Entity("teams")
export class Team {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 20 })
    teamName: string;

    @OneToMany("TeamUser", "team")
    teamUsers: TeamUser[];

    @OneToMany("Event", "team")
    events: Event[];
}