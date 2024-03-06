-- CreateTable
CREATE TABLE "home_resources" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "subTitle" TEXT,
    "url" TEXT,
    "image" TEXT,
    "desc" TEXT,
    "module" TEXT,
    "type" TEXT,
    "icon" TEXT,

    CONSTRAINT "home_resources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "type" INTEGER NOT NULL DEFAULT 0,
    "expired" TIMESTAMP(3),
    "status" INTEGER NOT NULL DEFAULT 0,
    "phone" INTEGER NOT NULL,
    "email" TEXT,
    "unionId" TEXT,
    "openId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");
