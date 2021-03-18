import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EquipmentTransactionItems } from "./EquipmentTransactionItems";
import { Branches } from "./Branches";
import { EquipmentTransactionStatuses } from "./EquipmentTransactionStatuses";
import { EquipmentTransactionType } from "./EquipmentTransactionType";
import { Suppliers } from "./Suppliers";

@Index(
  "equipment_transactions_equipment_transaction_type_id_foreign",
  ["equipmentTransactionTypeId"],
  {}
)
@Index(
  "equipment_transactions_equipment_transaction_status_id_foreign",
  ["equipmentTransactionStatusId"],
  {}
)
@Index("equipment_transactions_branch_id_foreign", ["branchId"], {})
@Index("equipment_transactions_supplier_id_foreign", ["supplierId"], {})
@Index(
  "equipment_transactions_equipment_transaction_request_id_foreign",
  ["equipmentTransactionRequestId"],
  {}
)
@Entity("equipment_transactions", { schema: "inopack" })
export class EquipmentTransactions {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("date", { name: "date_emitted" })
  dateEmitted: string;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", {
    name: "equipment_transaction_type_id",
    nullable: true,
    unsigned: true,
  })
  equipmentTransactionTypeId: number | null;

  @Column("int", {
    name: "equipment_transaction_status_id",
    nullable: true,
    unsigned: true,
  })
  equipmentTransactionStatusId: number | null;

  @Column("int", { name: "branch_id", nullable: true, unsigned: true })
  branchId: number | null;

  @Column("int", { name: "supplier_id", nullable: true, unsigned: true })
  supplierId: number | null;

  @Column("int", {
    name: "equipment_transaction_request_id",
    nullable: true,
    unsigned: true,
  })
  equipmentTransactionRequestId: number | null;

  @Column("varchar", { name: "description", length: 255 })
  description: string;

  @Column("date", { name: "date_estimated_delivery", nullable: true })
  dateEstimatedDelivery: string | null;

  @OneToMany(
    () => EquipmentTransactionItems,
    (equipmentTransactionItems) =>
      equipmentTransactionItems.equipmentTransaction
  )
  equipmentTransactionItems: EquipmentTransactionItems[];

  @ManyToOne(() => Branches, (branches) => branches.equipmentTransactions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "branch_id", referencedColumnName: "id" }])
  branch: Branches;

  @ManyToOne(
    () => EquipmentTransactions,
    (equipmentTransactions) => equipmentTransactions.equipmentTransactions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "equipment_transaction_request_id", referencedColumnName: "id" },
  ])
  equipmentTransactionRequest: EquipmentTransactions;

  @OneToMany(
    () => EquipmentTransactions,
    (equipmentTransactions) => equipmentTransactions.equipmentTransactionRequest
  )
  equipmentTransactions: EquipmentTransactions[];

  @ManyToOne(
    () => EquipmentTransactionStatuses,
    (equipmentTransactionStatuses) =>
      equipmentTransactionStatuses.equipmentTransactions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "equipment_transaction_status_id", referencedColumnName: "id" },
  ])
  equipmentTransactionStatus: EquipmentTransactionStatuses;

  @ManyToOne(
    () => EquipmentTransactionType,
    (equipmentTransactionType) =>
      equipmentTransactionType.equipmentTransactions,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "equipment_transaction_type_id", referencedColumnName: "id" },
  ])
  equipmentTransactionType: EquipmentTransactionType;

  @ManyToOne(() => Suppliers, (suppliers) => suppliers.equipmentTransactions, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "supplier_id", referencedColumnName: "id" }])
  supplier: Suppliers;
}
