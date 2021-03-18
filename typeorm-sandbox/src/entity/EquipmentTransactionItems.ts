import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Equipments } from "./Equipments";
import { EquipmentTransactions } from "./EquipmentTransactions";
import { Machines } from "./Machines";

@Index(
  "equipment_transaction_items_equipment_transaction_id_foreign",
  ["equipmentTransactionId"],
  {}
)
@Index("equipment_transaction_items_machine_id_foreign", ["machineId"], {})
@Index("equipment_transaction_items_equipment_id_foreign", ["equipmentId"], {})
@Entity("equipment_transaction_items", { schema: "inopack" })
export class EquipmentTransactionItems {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("double", {
    name: "quantity",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  quantity: number | null;

  @Column("double", {
    name: "unit_price",
    nullable: true,
    precision: 8,
    scale: 2,
  })
  unitPrice: number | null;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", {
    name: "equipment_transaction_id",
    nullable: true,
    unsigned: true,
  })
  equipmentTransactionId: number | null;

  @Column("int", { name: "machine_id", nullable: true, unsigned: true })
  machineId: number | null;

  @Column("int", { name: "equipment_id", nullable: true, unsigned: true })
  equipmentId: number | null;

  @ManyToOne(
    () => Equipments,
    (equipments) => equipments.equipmentTransactionItems,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "equipment_id", referencedColumnName: "id" }])
  equipment: Equipments;

  @ManyToOne(
    () => EquipmentTransactions,
    (equipmentTransactions) => equipmentTransactions.equipmentTransactionItems,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "equipment_transaction_id", referencedColumnName: "id" },
  ])
  equipmentTransaction: EquipmentTransactions;

  @ManyToOne(() => Machines, (machines) => machines.equipmentTransactionItems, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "machine_id", referencedColumnName: "id" }])
  machine: Machines;
}
