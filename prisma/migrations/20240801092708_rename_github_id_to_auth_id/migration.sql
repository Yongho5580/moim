/*
  Warnings:

  - You are about to drop the column `github_id` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "username" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "phone" TEXT,
    "auth_id" TEXT,
    "avatar" TEXT,
    "auth_type" TEXT NOT NULL DEFAULT 'email',
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_User" ("auth_type", "avatar", "created_at", "email", "id", "password", "phone", "updated_at", "username") SELECT "auth_type", "avatar", "created_at", "email", "id", "password", "phone", "updated_at", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
CREATE UNIQUE INDEX "User_auth_id_key" ON "User"("auth_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
