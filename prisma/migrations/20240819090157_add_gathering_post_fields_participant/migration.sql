-- CreateTable
CREATE TABLE "Participant" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "gatheringPostId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "joined_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Participant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Participant_gatheringPostId_fkey" FOREIGN KEY ("gatheringPostId") REFERENCES "GatheringPost" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

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
    "maxParticipants" INTEGER,
    "endDate" DATETIME,
    CONSTRAINT "GatheringPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_GatheringPost" ("created_at", "description", "id", "location", "photo", "price", "title", "updated_at", "userId") SELECT "created_at", "description", "id", "location", "photo", "price", "title", "updated_at", "userId" FROM "GatheringPost";
DROP TABLE "GatheringPost";
ALTER TABLE "new_GatheringPost" RENAME TO "GatheringPost";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
