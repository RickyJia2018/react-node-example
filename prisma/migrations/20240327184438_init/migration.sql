-- CreateTable
CREATE TABLE "magicrelatedcards" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "component" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "typeLine" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "magicCardId" INTEGER NOT NULL,
    "parentCardId" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "magiccards" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "scryfallId" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "FK_magicrelatedcards_magiccards_magicCardId" ON "magicrelatedcards"("magicCardId");

-- CreateIndex
CREATE INDEX "FK_magicrelatedcards_magiccards_parentCardId" ON "magicrelatedcards"("parentCardId");

-- CreateIndex
CREATE UNIQUE INDEX "UNQ_magicrelatedcards_parentCardId_magicCardId" ON "magicrelatedcards"("parentCardId", "magicCardId");
