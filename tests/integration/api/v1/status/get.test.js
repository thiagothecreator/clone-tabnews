test("GET to api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

  const postgresVersion = responseBody.dependencies.database.version;
  expect(postgresVersion).toEqual("16.0");

  const maxConnections = responseBody.dependencies.database.max_connections;
  expect(maxConnections).toEqual(100);

  const openedConnections =
    responseBody.dependencies.database.opened_connections;
  expect(openedConnections).toEqual(1);
});
