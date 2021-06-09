import { AssertionError, strictEqual } from "assert";
import { List } from "../models/List";
import { ListItem } from "../models/ListItem";

function validateType<T>(
  path: string,
  value: T,
  type: string,
  optional = false
): T {
  if (optional && value === undefined) {
    return value;
  }

  strictEqual(typeof value, type, `\`${path}\` must be a ${type}.`);

  return value;
}

function validateArray<T>(
  path: string,
  items: T[],
  validator: (item: T, pathPrefix: string) => T,
  optional = false
) {
  if (optional && items === undefined) {
    return items;
  }

  strictEqual(Array.isArray(items), true, `\`${path}\` must be an array.`);

  return items.map((item, idx) => validator(item, `${path}[${idx}].`));
}

function validateListItem(
  potentialListItem: ListItem,
  pathPrefix: string = ""
): ListItem {
  const { value, count } = potentialListItem;

  return {
    value: validateType<string>(`${pathPrefix}value`, value, "string"),
    count: validateType<number | undefined>(
      `${pathPrefix}count`,
      count,
      "number",
      true
    ),
  };
}

export function validateList(
  potentialList: List,
  pathPrefix: string = ""
): List {
  const { id, title, items } = potentialList;

  return {
    id: validateType(`${pathPrefix}id`, id, "string"),
    title: validateType(`${pathPrefix}title`, title, "string", true),
    items: validateArray(`${pathPrefix}items`, items, validateListItem),
  };
}

export function validateJson<T>(data: string): T {
  try {
    return JSON.parse(data) as T;
  } catch (error) {
    throw new AssertionError({
      message: "Body must be valid JSON.",
      actual: error.message,
      expected: "valid JSON",
    });
  }
}
