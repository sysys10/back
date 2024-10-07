import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./User.js";

@Entity("refresh_tokens")
export class RefreshToken {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ length: 255 })
    token: string;

    @Column()
    expiresAt: Date;

    @Column({ default: false })
    isRevoked: boolean;

    @ManyToOne("User", "refreshTokens")
    @JoinColumn({ name: "user_id" })
    user: User;

    @Column()
    user_id: string;
}