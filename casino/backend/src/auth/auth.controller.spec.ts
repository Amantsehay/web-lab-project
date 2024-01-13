import {
    Test,
    TestingModule,
  } from "@nestjs/testing";
  import { INestApplication } from "@nestjs/common";
  import * as request from "supertest";
  import { AppModule } from "../app.module";
  
  describe("Auth Controller E2E Test", () => {
    let app: INestApplication;
  
    beforeAll(async () => {
      const moduleFixture: TestingModule =
        await Test.createTestingModule({
          imports: [AppModule],
        }).compile();
  
      app = moduleFixture.createNestApplication();
      await app.init();
    });
  
    it("should create a new User", () => {
      return request(app.getHttpServer())
        .post("/auth/signup")
        .send({
          username: "zemen",
          password: "thug@forlife1",
          email: "zemenumekiria@gmail.com",
        })
        .expect(201);
    });
    it("should Return 400 bad request when passwords dont match", () => {
      return request(app.getHttpServer())
        .post("/signup")
        .send({
          username: "zemen",
          password: "thug@forlife1",
          email: "zemenumekiria@gmail.com",
        })
        .expect(400);
    });
    it("should Return 400 bad request when password is incorrect for login", () => {
      return request(app.getHttpServer())
        .post("/auth/login")
        .send({
          username: "zemen",
          password: "thug@forlife1",
        })
        .expect(400);
    });
  });