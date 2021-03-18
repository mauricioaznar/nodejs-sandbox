import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EquipmentSubcategories } from "./EquipmentSubcategories";
import { Equipments } from "./Equipments";

@Entity("equipment_categories", { schema: "inopack" })
export class EquipmentCategories {
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

  @OneToMany(
    () => EquipmentSubcategories,
    (equipmentSubcategories) => equipmentSubcategories.equipmentCategory
  )
  equipmentSubcategories: EquipmentSubcategories[];

  @OneToMany(() => Equipments, (equipments) => equipments.equipmentCategory)
  equipments: Equipments[];
}
