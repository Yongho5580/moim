/*
  Warnings:

  - Made the column `endDate` on table `GatheringPost` required. This step will fail if there are existing NULL values in that column.
  - Made the column `maxParticipants` on table `GatheringPost` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_GatheringPost" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "location" TEXT NOT NULL DEFAULT '',
    "price" REAL NOT NULL,
    "photo" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'open',
    "maxParticipants" INTEGER NOT NULL,
    "endDate" DATETIME NOT NULL,
    CONSTRAINT "GatheringPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_GatheringPost" ("created_at", "description", "endDate", "id", "location", "maxParticipants", "photo", "price", "status", "title", "updated_at", "userId") SELECT "created_at", "description", "endDate", "id", "location", "maxParticipants", "photo", "price", "status", "title", "updated_at", "userId" FROM "GatheringPost";
DROP TABLE "GatheringPost";
ALTER TABLE "new_GatheringPost" RENAME TO "GatheringPost";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
