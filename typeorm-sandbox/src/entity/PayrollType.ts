import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Payrolls } from "./Payrolls";

@Entity("payroll_type", { schema: "inopack" })
export class PayrollType {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @OneToMany(() => Payrolls, (payrolls) => payrolls.payrollType)
  payrolls: Payrolls[];
}
