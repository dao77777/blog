# Prisma

[prisma官网](https://www.prisma.io/)

## 完成prisma的安装和配置

1. **安装prisma及其cli:** `npm i prisma @prisma/client`
2. **初始化prisma相关文件:** `npx prisma init`, 生成prisma/schema.prisma文件和.env文件
3. **配置数据源:** 在.env文件中修改DATABASE_URL变量为自己的数据库url, 在prisma/schema.prisma中给出数据库的类型(mysql, postgres, sqlite等)
4. **首次同步schema到数据库&类型定义:** `npx prisma migrate dev --name init`

## 常用操作

- **部署可视化面板:** `npx studio`, 部署可视化面板, 可以在浏览器中查看数据库的结构和数据
- **仅同步类型定义:** `prisma generate`, 根据schema.prisma文件生成`@prisma/client`要用的类型定义, 会生成`PO`及`DTO`
- **同步schema到数据库&类型定义:** `prisma migrate dev --name <description about this migrate>`

## @prisma/client的使用

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
```

```prisma
model Common {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  published Boolean  @default(false) 
}

enum Role {
  USER
  ADMIN
}
```

## 整合prisma到nestjs中

在`nestjs`项目`src`文件夹中创建`prisma.service.ts`文件, 并添加以下内容
```typescript
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
```

配置完`prisma`后, 就可以使用了, 下面是使用案例
```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { User, Prisma } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({
      data,
    });
  }

  async updateUser(params: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUpdateInput;
  }): Promise<User> {
    const { where, data } = params;
    return this.prisma.user.update({
      data,
      where,
    });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
```

## 规范

关系统一表达为: @relation("<realationType>_<table1>_<table2>_<relationName>")
- relationType: m2o, o2m, o2o, m2m
- relationName: 若关系唯一, m2o对应belong, o2m对应own, o2o对应link, m2m对应has, 若关系不唯一, 则自定