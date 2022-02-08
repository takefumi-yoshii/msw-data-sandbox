import { testHandler } from "@/lib/jest";
import { setupMockServer } from "@/lib/msw";
import { seed } from "@/mock/db";
import { handlers } from "@/mock/msw/handlers";
import { getHandler } from "./[id].api";

describe("/api/example/[id]", () => {
  beforeAll(() => seed());
  setupMockServer(...handlers);
  test("returns a message with the specified animal", () => {
    testHandler(getHandler, { query: { id: "cat" } }, ({ code, data }) => {
      expect(code).toBe(200);
      expect(data).toEqual(
        expect.objectContaining({
          data: [
            {
              body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
              id: "0",
              title: "Lorem ipsum",
            },
          ],
        })
      );
    });
  });
});
