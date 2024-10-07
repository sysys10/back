import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { TeamUser } from "./TeamUser.js";
import { Event } from "./Event.js";
import { RefreshToken } from "./RefreshToken.js";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 12 })
    login_id: string;

    @Column({ length: 10 })
    username: string;

    @Column({ length: 60 })
    password: string;

    @Column({ length: 320 })
    email: string;

    @Column({ length: 20 })
    phone_number: string;

    @OneToMany("TeamUser", "user")
    teamUsers: TeamUser[];

    @OneToMany("Event", "user")
    events: Event[];

    @OneToMany("RefreshToken", "user")
    refreshTokens: RefreshToken[];
}