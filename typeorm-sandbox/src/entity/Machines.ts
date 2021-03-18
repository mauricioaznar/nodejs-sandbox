import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { BranchesEquipments } from "./BranchesEquipments";
import { EquipmentTransactionItems } from "./EquipmentTransactionItems";
import { ExpenseItems } from "./ExpenseItems";
import { Branches } from "./Branches";
import { MachinesEquipments } from "./MachinesEquipments";
import { MachineType } from "./MachineType";
import { OrderProductionProducts } from "./OrderProductionProducts";
import { ProductionEvents } from "./ProductionEvents";

@Index("machines_machine_type_id_foreign", ["machineTypeId"], {})
@Index("machines_branch_id_foreign", ["branchId"], {})
@Entity("machines", { schema: "inopack" })
export class Machines {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", { name: "machine_type_id", nullable: true, unsigned: true })
  machineTypeId: number | null;

  @Column("int", { name: "branch_id", nullable: true, unsigned: true })
  branchId: number | null;

  @OneToMany(
    () => BranchesEquipments,
    (branchesEquipments) => branchesEquipments.machine
  )
  branchesEquipments: BranchesEquipments[];

  @OneToMany(
    () => EquipmentTransactionItems,
    (equipmentTransactionItems) => equipmentTransactionItems.machine
  )
  equipmentTransactionItems: EquipmentTransactionItems[];

  @OneToMany(() => ExpenseItems, (expenseItems) => expenseItems.machine)
  expenseItems: ExpenseItems[];

  @ManyToOne(() => Branches, (branches) => branches.machines, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "branch_id", referencedColumnName: "id" }])
  branch: Branches;

  @OneToMany(
    () => MachinesEquipments,
    (machinesEquipments) => machinesEquipments.machine
  )
  machinesEquipments: MachinesEquipments[];

  @ManyToOne(() => MachineType, (machineType) => machineType.machines, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "machine_type_id", referencedColumnName: "id" }])
  machineType: MachineType;

  @OneToMany(
    () => OrderProductionProducts,
    (orderProductionProducts) => orderProductionProducts.machine
  )
  orderProductionProducts: OrderProductionProducts[];

  @OneToMany(
    () => ProductionEvents,
    (productionEvents) => productionEvents.machine
  )
  productionEvents: ProductionEvents[];
}
