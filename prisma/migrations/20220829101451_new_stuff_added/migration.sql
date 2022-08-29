-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "firstName" TEXT NOT NULL DEFAULT 'firstname',
    "lastName" TEXT NOT NULL DEFAULT 'surname',
    "city" TEXT NOT NULL DEFAULT 'Tirana',
    "address" TEXT NOT NULL DEFAULT 'Rr.test',
    "postCode" TEXT NOT NULL DEFAULT '0001',
    "email" TEXT NOT NULL DEFAULT 'test@email.com',
    "phoneNumber" TEXT NOT NULL DEFAULT '067123456',
    "recieveDiscount" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
