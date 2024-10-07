import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.js";
import { Team } from "./Team.js";

@Entity("events")
export class Event {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne("User", "events")
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    userId: string;

    @Column({ length: 10 })
    eventType: string;

    @Column()
    start: Date;

    @Column()
    end: Date;

    @Column({ length: 10 })
    location: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @Column({ length: 30 })
    title: string;

 
    @Column({ default: true })
    allDay: boolean;

    @ManyToOne("Team", "events")
    @JoinColumn({ name: "team_id" })
    team: Team;

    @Column()
    teamId: string;
}