import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ExpenseCreditNotes } from "./ExpenseCreditNotes";
import { ExpenseInvoiceComplements } from "./ExpenseInvoiceComplements";
import { ExpenseItems } from "./ExpenseItems";
import { ExpensePayments } from "./ExpensePayments";
import { ExpenseProducts } from "./ExpenseProducts";
import { Branches } from "./Branches";
import { ExpenseInvoiceCdfiUses } from "./ExpenseInvoiceCdfiUses";
import { ExpenseInvoicePaymentForms } from "./ExpenseInvoicePaymentForms";
import { ExpenseInvoicePaymentMethods } from "./ExpenseInvoicePaymentMethods";
import { ExpenseInvoiceStatuses } from "./ExpenseInvoiceStatuses";
import { ExpenseInvoiceType } from "./ExpenseInvoiceType";
import { ExpenseMoneySources } from "./ExpenseMoneySources";
import { ExpenseStatuses } from "./ExpenseStatuses";
import { ExpenseSubcategories } from "./ExpenseSubcategories";
import { ExpenseType } from "./ExpenseType";
import { Suppliers } from "./Suppliers";

@Index("expenses_expense_subcategory_id_foreign", ["expenseSubcategoryId"], {})
@Index("expenses_expense_type_id_foreign", ["expenseTypeId"], {})
@Index("expenses_expense_money_source_id_foreign", ["expenseMoneySourceId"], {})
@Index("expenses_supplier_id_foreign", ["supplierId"], {})
@Index("expenses_expense_status_id_foreign", ["expenseStatusId"], {})
@Index(
  "expenses_expense_invoice_status_id_foreign",
  ["expenseInvoiceStatusId"],
  {}
)
@Index("expenses_expense_invoice_type_id_foreign", ["expenseInvoiceTypeId"], {})
@Index(
  "expenses_expense_invoice_payment_form_id_foreign",
  ["expenseInvoicePaymentFormId"],
  {}
)
@Index(
  "expenses_expense_invoice_payment_method_id_foreign",
  ["expenseInvoicePaymentMethodId"],
  {}
)
@Index(
  "expenses_expense_invoice_cdfi_use_id_foreign",
  ["expenseInvoiceCdfiUseId"],
  {}
)
@Index("expenses_branch_id_foreign", ["branchId"], {})
@Entity("expenses", { schema: "inopack" })
export class Expenses {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("int", { name: "active", default: () => "'1'" })
  active: number;

  @Column("date", { name: "date_paid" })
  datePaid: string;

  @Column("varchar", { name: "description", length: 255 })
  description: string;

  @Column("double", { name: "subtotal", precision: 22 })
  subtotal: number;

  @Column("timestamp", { name: "created_at", nullable: true })
  createdAt: Date | null;

  @Column("timestamp", { name: "updated_at", nullable: true })
  updatedAt: Date | null;

  @Column("int", {
    name: "expense_subcategory_id",
    nullable: true,
    unsigned: true,
  })
  expenseSubcategoryId: number | null;

  @Column("int", { name: "expense_type_id", nullable: true, unsigned: true })
  expenseTypeId: number | null;

  @Column("int", {
    name: "expense_money_source_id",
    nullable: true,
    unsigned: true,
  })
  expenseMoneySourceId: number | null;

  @Column("int", { name: "branch_id", nullable: true, unsigned: true })
  branchId: number | null;

  @Column("int", { name: "supplier_id", nullable: true, unsigned: true })
  supplierId: number | null;

  @Column("varchar", { name: "invoice_code", length: 255 })
  invoiceCode: string;

  @Column("date", { name: "invoice_paid_date" })
  invoicePaidDate: string;

  @Column("double", { name: "invoice_tax_retained", precision: 8, scale: 2 })
  invoiceTaxRetained: number;

  @Column("double", { name: "tax", precision: 8, scale: 2 })
  tax: number;

  @Column("double", { name: "ieps", precision: 8, scale: 2 })
  ieps: number;

  @Column("double", { name: "invoice_isr_retained", precision: 8, scale: 2 })
  invoiceIsrRetained: number;

  @Column("int", { name: "expense_status_id", nullable: true, unsigned: true })
  expenseStatusId: number | null;

  @Column("int", {
    name: "expense_invoice_status_id",
    nullable: true,
    unsigned: true,
  })
  expenseInvoiceStatusId: number | null;

  @Column("int", {
    name: "expense_invoice_type_id",
    nullable: true,
    unsigned: true,
  })
  expenseInvoiceTypeId: number | null;

  @Column("int", {
    name: "expense_invoice_payment_form_id",
    nullable: true,
    unsigned: true,
  })
  expenseInvoicePaymentFormId: number | null;

  @Column("int", {
    name: "expense_invoice_payment_method_id",
    nullable: true,
    unsigned: true,
  })
  expenseInvoicePaymentMethodId: number | null;

  @Column("int", {
    name: "expense_invoice_cdfi_use_id",
    nullable: true,
    unsigned: true,
  })
  expenseInvoiceCdfiUseId: number | null;

  @Column("date", { name: "invoice_provision_date" })
  invoiceProvisionDate: string;

  @Column("varchar", { name: "internal_code", length: 255 })
  internalCode: string;

  @Column("varchar", { name: "comments", length: 255 })
  comments: string;

  @Column("date", { name: "date_emitted" })
  dateEmitted: string;

  @Column("date", { name: "date_refunded", nullable: true })
  dateRefunded: string | null;

  @OneToMany(
    () => ExpenseCreditNotes,
    (expenseCreditNotes) => expenseCreditNotes.expense
  )
  expenseCreditNotes: ExpenseCreditNotes[];

  @OneToMany(
    () => ExpenseInvoiceComplements,
    (expenseInvoiceComplements) => expenseInvoiceComplements.expense
  )
  expenseInvoiceComplements: ExpenseInvoiceComplements[];

  @OneToMany(() => ExpenseItems, (expenseItems) => expenseItems.expense)
  expenseItems: ExpenseItems[];

  @OneToMany(
    () => ExpensePayments,
    (expensePayments) => expensePayments.expense
  )
  expensePayments: ExpensePayments[];

  @OneToMany(
    () => ExpenseProducts,
    (expenseProducts) => expenseProducts.expense
  )
  expenseProducts: ExpenseProducts[];

  @ManyToOne(() => Branches, (branches) => branches.expenses, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "branch_id", referencedColumnName: "id" }])
  branch: Branches;

  @ManyToOne(
    () => ExpenseInvoiceCdfiUses,
    (expenseInvoiceCdfiUses) => expenseInvoiceCdfiUses.expenses,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "expense_invoice_cdfi_use_id", referencedColumnName: "id" },
  ])
  expenseInvoiceCdfiUse: ExpenseInvoiceCdfiUses;

  @ManyToOne(
    () => ExpenseInvoicePaymentForms,
    (expenseInvoicePaymentForms) => expenseInvoicePaymentForms.expenses,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "expense_invoice_payment_form_id", referencedColumnName: "id" },
  ])
  expenseInvoicePaymentForm: ExpenseInvoicePaymentForms;

  @ManyToOne(
    () => ExpenseInvoicePaymentMethods,
    (expenseInvoicePaymentMethods) => expenseInvoicePaymentMethods.expenses,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "expense_invoice_payment_method_id", referencedColumnName: "id" },
  ])
  expenseInvoicePaymentMethod: ExpenseInvoicePaymentMethods;

  @ManyToOne(
    () => ExpenseInvoiceStatuses,
    (expenseInvoiceStatuses) => expenseInvoiceStatuses.expenses,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([
    { name: "expense_invoice_status_id", referencedColumnName: "id" },
  ])
  expenseInvoiceStatus: ExpenseInvoiceStatuses;

  @ManyToOne(
    () => ExpenseInvoiceType,
    (expenseInvoiceType) => expenseInvoiceType.expenses,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "expense_invoice_type_id", referencedColumnName: "id" }])
  expenseInvoiceType: ExpenseInvoiceType;

  @ManyToOne(
    () => ExpenseMoneySources,
    (expenseMoneySources) => expenseMoneySources.expenses,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "expense_money_source_id", referencedColumnName: "id" }])
  expenseMoneySource: ExpenseMoneySources;

  @ManyToOne(
    () => ExpenseStatuses,
    (expenseStatuses) => expenseStatuses.expenses,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "expense_status_id", referencedColumnName: "id" }])
  expenseStatus: ExpenseStatuses;

  @ManyToOne(
    () => ExpenseSubcategories,
    (expenseSubcategories) => expenseSubcategories.expenses,
    { onDelete: "NO ACTION", onUpdate: "NO ACTION" }
  )
  @JoinColumn([{ name: "expense_subcategory_id", referencedColumnName: "id" }])
  expenseSubcategory: ExpenseSubcategories;

  @ManyToOne(() => ExpenseType, (expenseType) => expenseType.expenses, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "expense_type_id", referencedColumnName: "id" }])
  expenseType: ExpenseType;

  @ManyToOne(() => Suppliers, (suppliers) => suppliers.expenses, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "supplier_id", referencedColumnName: "id" }])
  supplier: Suppliers;
}
