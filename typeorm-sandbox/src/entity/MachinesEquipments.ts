import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Equipments } from "./Equipments";
import { Machines } from "./Machines";

@Index("machines_equipments_equipment_id_foreign", ["equipmentId"], {})
@Index("machines_equipments_machine_id_foreign", ["machineId"], {})
@Entity("machines_equipments", { schema: "inopack" })
export class MachinesEquipments {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("double", { name: "max_quantity", nullable: true, precision: 22 })
  maxQuantity: number | null;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", { name: "equipment_id", nullable: true, unsigned: true })
  equipmentId: number | null;

  @Column("int", { name: "machine_id", nullable: true, unsigned: true })
  machineId: number | null;

  @Column("double", {
    name: "min_quantity",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  minQuantity: number | null;

  @ManyToOne(() => Equipments, (equipments) => equipments.machinesEquipments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "equipment_id", referencedColumnName: "id" }])
  equipment: Equipments;

  @ManyToOne(() => Machines, (machines) => machines.machinesEquipments, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "machine_id", referencedColumnName: "id" }])
  machine: Machines;
}
