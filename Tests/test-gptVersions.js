import { Selector } from "testcafe";

const input = new Selector(".player-volume input").withAttribute(
  "name",
  "uuid"
);

fixture(`Form`).page("https://s7cn43.csb.app/");

test("form input exists", async (t) => {
  
});
