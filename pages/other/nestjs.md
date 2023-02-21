# NestJs

[NestJs官网](https://docs.nestjs.com/)

## 创建项目

### 初始化`NestJs项目`

- 安装`NestJs`的`cli`
```bash
npm i -g @nestjs/cli
```
- 新建`NestJs`项目
```bash
nest new <project-name>
```

### 整合`graphql`

- 安装`graphql`
```bash
npm i @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```
- 在`src/app.module.ts`文件中配置`graphql`
```typescript
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import * as path from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
  ],
})
export class AppModule {}
```

### `postgres`数据库的准备

- 创建`docker`的`postgres`具名数据卷
```bash
docker volume create postgres_data
```
- 启动`postgres`的`docker`容器
```bash
docker run --name postgres -e POSTGRES_PASSWORD=root -p 5432:5432 -v postgres_data:/var/lib/postgresql/data --restart=always -d -- postgres:latest
```
- 进入`postgres`的`docker`容器
```bash
docker exec -it postgres /bin/bash
```
- 在容器中进入`postgres`的`cli`
```bash
psql -U postgres
```
- 在`postgres`的`cli`中创建`mydb`数据库
```sql
create database mydb;
```

### 整合`prisma`

- 安装`prisma`
```bash
npm i prisma --save-dev
npm i @prisma/client
```
- 初始化`schema.prisma`
```bash
npx prisma init
```
- 配置`.env`文件中`DATABASE_URL`为自己的数据源地址
```bash
DATABASE_URL="postgresql://postgres:root@localhost:5432/mydb?schema=public"
```
- 在`src/prisma.service.ts`中配置`@prisma/client`
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


在`tsconfig.json`中添加`esModuleInterop`配置
```json
{
  "esModuleInterop": true
}
```
