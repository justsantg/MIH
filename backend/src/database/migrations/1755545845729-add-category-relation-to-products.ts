import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCategoryRelationToProducts1755545845729
  implements MigrationInterface {
  name = 'AddCategoryRelationToProducts1755545845729';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // 0. Crear índice único para name en categories
    await queryRunner.query(
      `CREATE UNIQUE INDEX IF NOT EXISTS "IDX_categories_name_unique" ON "categories" ("name")`
    );

    // 1. Crear la columna como NULL
    await queryRunner.query(
      `ALTER TABLE "products" ADD "categoryId" uuid`
    );

    // 2. Crear la categoría "General" si no existe
    await queryRunner.query(`
      INSERT INTO "categories" (id, name, description, "createdAt", "updatedAt")
      VALUES (gen_random_uuid(), 'General', 'Categoría por defecto', NOW(), NOW())
      ON CONFLICT (name) DO NOTHING
    `);

    // 3. Asignar la categoría "General" a los productos
    await queryRunner.query(`
      UPDATE "products"
      SET "categoryId" = (
        SELECT id FROM "categories" WHERE name = 'General' LIMIT 1
      )
    `);

    // 4. Agregar la foreign key
    await queryRunner.query(
      `ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"
       FOREIGN KEY ("categoryId") REFERENCES "categories"("id")
       ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Revertir cambios
    await queryRunner.query(
      `ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`
    );
    await queryRunner.query(
      `ALTER TABLE "products" DROP COLUMN "categoryId"`
    );
    // Eliminar el índice único
    await queryRunner.query(
      `DROP INDEX IF EXISTS "IDX_categories_name_unique"`
    );
  }
}
