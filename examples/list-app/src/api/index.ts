import { AssertionError, strictEqual } from "assert";
import {
  APIGatewayProxyEvent,
  APIGatewayProxyResult,
  Handler,
} from "aws-lambda";
import { v4 as uuidv4 } from "uuid";

import { List } from "../models/List";
import { emptyResponse, jsonResponse } from "./responses";
import { getList, getAllLists, saveList, deleteList } from "./storage";
import { validateJson, validateList } from "./validation";

enum HTTP_METHOD {
  POST = "POST",
  PUT = "PUT",
  GET = "GET",
  DELETE = "DELETE",
  OPTION = "OPTION",
}

export const handler: Handler<APIGatewayProxyEvent, APIGatewayProxyResult> =
  async (event) => {
    const { body, httpMethod, path } = event;
    console.log(`${httpMethod} ${path}`);

    const isRoot = Boolean(path === "/");
    const listId = path.split("/").filter(Boolean)[0];

    // Index of lists
    if (isRoot && httpMethod === HTTP_METHOD.GET) {
      const lists = await getAllLists();

      return jsonResponse(lists);
    }

    // New list
    if (!listId && body && httpMethod === HTTP_METHOD.POST) {
      try {
        const list = await saveList(
          validateList({ ...validateJson<List>(body), id: uuidv4() })
        );

        return jsonResponse(list, 201);
      } catch (error) {
        const { message, actual, expected } = error as AssertionError;

        return jsonResponse(
          `${message} Expected \`${expected}\` but got \`${actual}\`.`,
          400
        );
      }
    }

    // View list
    if (listId && httpMethod === HTTP_METHOD.GET) {
      const list = await getList(listId);

      return jsonResponse(list);
    }

    // Update list
    if (listId && body && httpMethod === HTTP_METHOD.PUT) {
      try {
        const input = validateJson<List>(body);
        strictEqual(input.id, listId, "`list.id` must match URL.");

        const list = await saveList(validateList(input));

        return jsonResponse(list);
      } catch (error) {
        const { message, actual, expected } = error as AssertionError;

        return jsonResponse(
          `${message} Expected \`${expected}\` but got \`${actual}\`.`,
          400
        );
      }
    }

    // Delete list
    if (listId && httpMethod === HTTP_METHOD.DELETE) {
      await deleteList(listId);

      return jsonResponse("Deleted", 200);
    }

    // CORS
    if (httpMethod === HTTP_METHOD.OPTION) {
      return emptyResponse(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      });
    }

    return jsonResponse("Not Found", 404);
  };
