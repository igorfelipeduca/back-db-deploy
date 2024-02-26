# Back + DB - Deploy

## TODO List

- [ ] Start the NestJs project
- [ ] Create Dockerfile
- [ ] Create docker-compose.yml
- [ ] Create .dockerignore

## Cloud options

- [ ] Render
- [ ] Railway
- [ ] Fly.io

## Render

- [ ] Create the postgres database
- [ ] Deploy the server (via github)
- [ ] Create the environment variables
- [ ] Connecting to the database

## Railway

- [ ] Provide database
- [ ] Deploy the server (via github)
- [ ] Create the environment variables
- [ ] Connecting to the database

## Supabase

- [ ] Create the project
- [ ] Creating the database
- [ ] Creating the database tables
- [ ] Undestanding RLS
    - [ ] Creating the RLS rules
- [ ] Connecting to the database

## Start the NestJs project

```bash
nest new project-name
```

## Create Dockerfile

```Dockerfile
FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "npm", "run", "start:dev"
```

## Create docker-compose.yml

```docker-compose.yml
version: '3.5'

services:
  db:
    image: postgres
    restart: always
    environment:
      - POSTGRES_PASSWORD=postgres
    container_name: postgres
    volumes:
      - ./pgdata:/var/lib/postgresql/data
    ports:
      - '7654:7654'

  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: nest-docker-postgres
    environment:
      - PORT=${PORT}
    ports:
      - '3000:3000'
    depends_on:
      - db
    volumes:
      - ./src:/app/src

  pgadmin:
    image: dpage/pgadmin4
    restart: always
    container_name: nest-pgadmin4
    environment:
      - PGADMIN_DEFAULT_EMAIL=admin@admin.com
      - PGADMIN_DEFAULT_PASSWORD=pgadmin4
    ports:
      - '5050:80'
    depends_on:
      - db
```

## Create .dockerignore

```dockerignore
Dockerfile
.dockerignore
node_modules
npm-debug.log
dist
```

## Creating a new REST module for Users

```bash
nest g rest users
```

## Creating the user entity

```typescript user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;
}
```

## Injecting the user entity on the TypeORMModule (users.module.ts)

```typescript users.module.ts
imports: [TypeOrmModule.forFeature([UserEntity])],
```

## Creating the request DTO

```typescript request-user.dto.ts
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsBoolean()
  isActive: boolean;
}
```

## Creating the response DTO

```typescript response-user.dto.ts
import { UserEntity } from './../entities/user.entity';

export class ResponseUserDTO {
  id: number;
  firstName: string;
  lastName: string;
  isActive: boolean;

  constructor(user: Partial<UserEntity>) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.isActive = user.isActive;
  }
}
```
