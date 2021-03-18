import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Branches } from "./Branches";
import { Roles } from "./Roles";

@Index("users_email_unique", ["email"], { unique: true })
@Index("users_role_id_foreign", ["roleId"], {})
@Index("users_branch_id_foreign", ["branchId"], {})
@Entity("users", { schema: "inopack" })
export class Users {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "first_name", length: 255 })
  firstName: string;

  @Column("varchar", { name: "last_name", length: 255 })
  lastName: string;

  @Column("varchar", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("varchar", { name: "password", length: 60 })
  password: string;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("varchar", { name: "remember_token", nullable: true, length: 100 })
  rememberToken: string | null;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", { name: "role_id", nullable: true, unsigned: true })
  roleId: number | null;

  @Column("varchar", { name: "fullname", length: 255 })
  fullname: string;

  @Column("int", { name: "branch_id", nullable: true, unsigned: true })
  branchId: number | null;

  @ManyToOne(() => Branches, (branches) => branches.users, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "branch_id", referencedColumnName: "id" }])
  branch: Branches;

  @ManyToOne(() => Roles, (roles) => roles.users, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "role_id", referencedColumnName: "id" }])
  role: Roles;
}
