import { testClient } from "hono/testing";
import { describe, expect, expectTypeOf, it } from "vitest";

import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from "@/api/lib/constants";
import { createHonoApp, createTestHonoApp } from "@/api/lib/create-hono-app";
import router from "@/api/routes/books/books.index";
import env from "@/env";

if (env.NODE_ENV !== "test") {
  throw new Error("NODE_ENV must be 'test'");
}

const client = testClient(createTestHonoApp(router));

describe("Books List", () => {
  // TODO: Find way to seed test database then remove it
  // beforeAll(async () => {
  //     execSync("pnpm drizzle-kit push");
  // });

  // afterAll(async () => {
  //     fs.rmSync("test.db", { force: true });
  // });

  it("post /books validates the body when creating", async () => {
    const response = await client.books.$post({
      json: {
        // Come up with a more relavant test
        // @ts-expect-error
        title: 123,
      },
    });
    // Update error handling to be relevant
    expect(response.status).toBe(422);
    if (response.status === 422) {
      const json = await response.json();
      expect(json.error.issues[0].path[0]).toBe("title");
      expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.REQUIRED);
    }
  });

  it("responds with an array of books", async () => {
    const testRouter = createTestHonoApp(router);
    const response = await testRouter.request("/books");
    const result = await response.json();
    console.log(result);
    // @ts-expect-error
    expectTypeOf(result).toBeArray();
  });

  it("responds with an array of books again", async () => {
    const client = testClient(createHonoApp().route("/", router));
    const response = await client.books.$get();
    const json = await response.json();
    expectTypeOf(json).toBeArray();
  });

  it("validates the id param", async () => {
    const client = testClient(createHonoApp().route("/", router));
    const response = await client.books[":id"].$get({
      param: {
        // @ts-expect-error
        id: "wat",
      },
    });
    expect(response.status).toBe(422);
  });

  it("validates the body when creating", async () => {
    const client = testClient(createHonoApp().route("/", router));
    const response = await client.books.$post({
      json: {
        // @ts-expect-error
        title: 123,
      },
    });
    expect(response.status).toBe(422);
  });

  //   const id = 1;
  //   const name = "Learn vitest";

  //   it("post /tasks creates a task", async () => {
  //     const response = await client.tasks.$post({
  //       json: {
  //         name,
  //         done: false,
  //       },
  //     });
  //     expect(response.status).toBe(200);
  //     if (response.status === 200) {
  //       const json = await response.json();
  //       expect(json.name).toBe(name);
  //       expect(json.done).toBe(false);
  //     }
  //   });

  //   it("get /tasks lists all tasks", async () => {
  //     const response = await client.tasks.$get();
  //     expect(response.status).toBe(200);
  //     if (response.status === 200) {
  //       const json = await response.json();
  //       expectTypeOf(json).toBeArray();
  //       expect(json.length).toBe(1);
  //     }
  //   });

  //   it("get /tasks/{id} validates the id param", async () => {
  //     const response = await client.tasks[":id"].$get({
  //       param: {
  //         // @ts-expect-error
  //         id: "wat",
  //       },
  //     });
  //     expect(response.status).toBe(422);
  //     if (response.status === 422) {
  //       const json = await response.json();
  //       expect(json.error.issues[0].path[0]).toBe("id");
  //       expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.EXPECTED_NUMBER);
  //     }
  //   });

  //   it("get /tasks/{id} returns 404 when task not found", async () => {
  //     const response = await client.tasks[":id"].$get({
  //       param: {
  //         id: 999,
  //       },
  //     });
  //     expect(response.status).toBe(404);
  //     if (response.status === 404) {
  //       const json = await response.json();
  //       expect(json.message).toBe(HttpStatusPhrases.NOT_FOUND);
  //     }
  //   });

  //   it("get /tasks/{id} gets a single task", async () => {
  //     const response = await client.tasks[":id"].$get({
  //       param: {
  //         id,
  //       },
  //     });
  //     expect(response.status).toBe(200);
  //     if (response.status === 200) {
  //       const json = await response.json();
  //       expect(json.name).toBe(name);
  //       expect(json.done).toBe(false);
  //     }
  //   });

  //   it("patch /tasks/{id} validates the body when updating", async () => {
  //     const response = await client.tasks[":id"].$patch({
  //       param: {
  //         id,
  //       },
  //       json: {
  //         name: "",
  //       },
  //     });
  //     expect(response.status).toBe(422);
  //     if (response.status === 422) {
  //       const json = await response.json();
  //       expect(json.error.issues[0].path[0]).toBe("name");
  //       expect(json.error.issues[0].code).toBe(ZodIssueCode.too_small);
  //     }
  //   });

  //   it("patch /tasks/{id} validates the id param", async () => {
  //     const response = await client.tasks[":id"].$patch({
  //       param: {
  //         // @ts-expect-error
  //         id: "wat",
  //       },
  //       json: {},
  //     });
  //     expect(response.status).toBe(422);
  //     if (response.status === 422) {
  //       const json = await response.json();
  //       expect(json.error.issues[0].path[0]).toBe("id");
  //       expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.EXPECTED_NUMBER);
  //     }
  //   });

  //   it("patch /tasks/{id} validates empty body", async () => {
  //     const response = await client.tasks[":id"].$patch({
  //       param: {
  //         id,
  //       },
  //       json: {},
  //     });
  //     expect(response.status).toBe(422);
  //     if (response.status === 422) {
  //       const json = await response.json();
  //       expect(json.error.issues[0].code).toBe(ZOD_ERROR_CODES.INVALID_UPDATES);
  //       expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.NO_UPDATES);
  //     }
  //   });

  //   it("patch /tasks/{id} updates a single property of a task", async () => {
  //     const response = await client.tasks[":id"].$patch({
  //       param: {
  //         id,
  //       },
  //       json: {
  //         done: true,
  //       },
  //     });
  //     expect(response.status).toBe(200);
  //     if (response.status === 200) {
  //       const json = await response.json();
  //       expect(json.done).toBe(true);
  //     }
  //   });

  //   it("delete /tasks/{id} validates the id when deleting", async () => {
  //     const response = await client.tasks[":id"].$delete({
  //       param: {
  //         // @ts-expect-error
  //         id: "wat",
  //       },
  //     });
  //     expect(response.status).toBe(422);
  //     if (response.status === 422) {
  //       const json = await response.json();
  //       expect(json.error.issues[0].path[0]).toBe("id");
  //       expect(json.error.issues[0].message).toBe(ZOD_ERROR_MESSAGES.EXPECTED_NUMBER);
  //     }
  //   });

  //   it("delete /tasks/{id} removes a task", async () => {
  //     const response = await client.tasks[":id"].$delete({
  //       param: {
  //         id,
  //       },
  //     });
  //     expect(response.status).toBe(204);
  //   });
});
