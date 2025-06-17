/*
  Warnings:

  - A unique constraint covering the columns `[type,userId,productId]` on the table `Feedback` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Feedback_type_userId_productId_key" ON "Feedback"("type", "userId", "productId");
