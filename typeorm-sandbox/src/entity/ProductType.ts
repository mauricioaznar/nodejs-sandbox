import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Materials } from "./Materials";
import { Products } from "./Products";

@Entity("product_type", { schema: "inopack" })
export class ProductType {
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

  @OneToMany(() => Materials, (materials) => materials.productType)
  materials: Materials[];

  @OneToMany(() => Products, (products) => products.productType)
  products: Products[];
}
